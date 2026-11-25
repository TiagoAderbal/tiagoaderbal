import { useEffect, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}=+*^?#01";

function scramble(text, progress) {
  const revealed = Math.floor(text.length * progress);
  let out = text.slice(0, revealed);

  for (let i = revealed; i < text.length; i++) {
    out += text[i] === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
  }

  return out;
}

// Revela o texto da esquerda pra direita, "descriptografando" os caracteres.
// Como a fonte é monoespaçada e o comprimento não muda, não há salto de layout.
export default function ScrambleText({ text, duration = 260 }) {
  const [output, setOutput] = useState(() => scramble(text, 0));

  useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setOutput(text);
      return;
    }

    const start = performance.now();
    let frame;

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      setOutput(scramble(text, progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [text, duration]);

  return (
    <>
      <span aria-hidden="true">{output}</span>
      <span className="atlas-sr-only">{text}</span>
    </>
  );
}
