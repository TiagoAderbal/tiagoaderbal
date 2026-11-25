import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

// Velocidade mínima de "digitação" e duração máxima: respostas longas aceleram
// para nunca levarem mais que MAX_DURATION_S para aparecer por completo.
const MIN_CHARS_PER_SECOND = 90;
const MAX_DURATION_S = 7;

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

// Corta na última palavra completa, assim nenhuma palavra aparece pela metade.
function visibleSlice(text, count) {
  if (count >= text.length) return text;
  const slice = text.slice(0, count);
  const lastBreak = Math.max(slice.lastIndexOf(" "), slice.lastIndexOf("\n"));
  return lastBreak > 0 ? slice.slice(0, lastBreak) : "";
}

// Fecha marcações abertas no trecho parcial para não exibir `**` ou crases soltas.
function closeOpenMarkdown(markdown) {
  const fences = (markdown.match(/```/g) || []).length;
  if (fences % 2) return `${markdown}\n\`\`\``;

  const outsideFences = markdown.replace(/```[\s\S]*?```/g, "");
  let closed = markdown;
  if ((outsideFences.match(/`/g) || []).length % 2) closed += "`";
  if ((outsideFences.match(/\*\*/g) || []).length % 2) closed += "**";
  return closed;
}

export default function StreamingAnswer({ text, streaming, infected = false, onFinish }) {
  const [count, setCount] = useState(() => (streaming ? 0 : text.length));
  const onFinishRef = useRef(onFinish);

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  useEffect(() => {
    if (!streaming || prefersReducedMotion()) {
      setCount(text.length);
      if (streaming) onFinishRef.current?.();
      return;
    }

    const charsPerSecond = Math.max(MIN_CHARS_PER_SECOND, text.length / MAX_DURATION_S);
    const start = performance.now();
    let frame;

    setCount(0);

    const tick = (now) => {
      const next = Math.min(text.length, Math.floor(((now - start) / 1000) * charsPerSecond));
      setCount(next);

      if (next >= text.length) {
        onFinishRef.current?.();
        return;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [text, streaming]);

  const visible = useMemo(() => closeOpenMarkdown(visibleSlice(text, count)), [text, count]);
  const rendered = useMemo(() => <ReactMarkdown>{visible}</ReactMarkdown>, [visible]);

  const classes = [
    "markdown-output",
    streaming ? "is-streaming" : "",
    infected ? "infected" : "",
  ].join(" ");

  return (
    <div className={classes} aria-busy={streaming}>
      {rendered}
    </div>
  );
}
