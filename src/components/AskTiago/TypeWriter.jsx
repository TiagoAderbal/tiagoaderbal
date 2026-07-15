import { useEffect, useRef, useState } from "react";

export default function TypeWriter({ text, speed = 10, onFinish, infected = false }) {
  const [display, setDisplay] = useState("");
  const [glitchTail, setGlitchTail] = useState(null);

  const onFinishRef = useRef(onFinish);
  const infectedRef = useRef(infected);

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  useEffect(() => {
    infectedRef.current = infected;
  }, [infected]);

  useEffect(() => {
    setDisplay("");
    setGlitchTail(null);

    let i = 0;

    const timer = setInterval(() => {
      i++;

      const nextText = text.slice(0, i);
      setDisplay(nextText);

      if (infectedRef.current && Math.random() < 0.12) {
        const tailLength = Math.min(3, nextText.length);
        const tail = nextText.slice(-tailLength);

        setGlitchTail(tail);
        setTimeout(() => setGlitchTail(null), 90);
      }

      if (i >= text.length) {
        clearInterval(timer);

        onFinishRef.current?.();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]); // <- só reinicia quando o TEXTO ou a VELOCIDADE mudam de verdade

  const head = glitchTail ? display.slice(0, -glitchTail.length) : display;

  return (
    <>
      {head}

      {glitchTail && (
        <span className="glitch-text corrupting" data-text={glitchTail}>
          {glitchTail}
        </span>
      )}

      <span className="cursor">▋</span>
    </>
  );
}