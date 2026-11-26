import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const KONAMI = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
const MODIFIERS = ["Shift", "Control", "Alt", "Meta", "CapsLock"];
const DURATION_MS = 4600;

// A stack inteira convocada: cada ícone atravessa a tela numa altura e num sentido.
const SQUAD = [
  "html", "css", "js", "ts", "react", "vue", "node", "python", "php",
  "docker", "git", "github", "postman", "bootstrap", "ironman", "black", "coffee",
].map((name, index) => ({
  name,
  src: `/assets/imgs/stacks/${name}.webp`,
  top: 8 + ((index * 37) % 84),
  delay: (index % 6) * 0.16 + Math.floor(index / 6) * 0.22,
  fromLeft: index % 2 === 0,
  spin: index % 3 === 0 ? 360 : -200,
}));

function isTypingTarget(target) {
  return target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
}

export default function AvengersAssemble() {
  const [run, setRun] = useState(0);
  const progressRef = useRef(0);

  useEffect(() => {
    const onKeyDown = (event) => {
      // Shift/Ctrl/Alt sozinhos não podem zerar a sequência (ex.: Shift+B).
      if (isTypingTarget(event.target) || MODIFIERS.includes(event.key)) return;
      const key = event.key.toLowerCase();
      const expected = KONAMI[progressRef.current];

      if (key === expected) {
        progressRef.current += 1;
      } else if (key === "arrowup") {
        // "↑ ↑ ↑" ainda conta como o começo da sequência.
        progressRef.current = progressRef.current === 2 ? 2 : 1;
      } else {
        progressRef.current = 0;
      }

      if (progressRef.current === KONAMI.length) {
        progressRef.current = 0;
        setRun((current) => current + 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!run) return undefined;
    const timer = setTimeout(() => setRun(0), DURATION_MS);
    return () => clearTimeout(timer);
  }, [run]);

  if (!run) return null;

  return createPortal(
    <div className="assemble-overlay" key={run} role="status" aria-live="polite">
      <div className="assemble-flash" aria-hidden="true" />
      {SQUAD.map((member) => (
        <img
          key={member.name}
          className={`assemble-flyer ${member.fromLeft ? "from-left" : "from-right"}`}
          src={member.src}
          alt=""
          aria-hidden="true"
          style={{ "--top": `${member.top}%`, "--delay": `${member.delay}s`, "--spin": `${member.spin}deg` }}
        />
      ))}
      <div className="assemble-core">
        <img className="assemble-emblem" src="/assets/imgs/stacks/avenger.webp" alt="" aria-hidden="true" />
        <strong className="assemble-title">Avengers, assemble!</strong>
        <span className="assemble-subtitle">Stack completa convocada. Inclusive o café.</span>
      </div>
    </div>,
    document.body,
  );
}
