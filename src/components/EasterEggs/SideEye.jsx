import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const EVENT_NAME = "tiago:side-eye";
const VISIBLE_MS = 3600;

/** Chama o macaco de qualquer lugar do site. */
export function triggerSideEye(message) {
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: message }));
}

function isDevToolsShortcut(event) {
  const key = event.key.toLowerCase();
  if (event.key === "F12") return true;
  if (event.ctrlKey && event.shiftKey && ["i", "j", "c"].includes(key)) return true;
  return event.metaKey && event.altKey && ["i", "j", "c"].includes(key);
}

export default function SideEye() {
  const [message, setMessage] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const show = (text) => {
      clearTimeout(timerRef.current);
      setMessage(text);
      timerRef.current = setTimeout(() => setMessage(null), VISIBLE_MS);
    };

    // Não bloqueia nada: o menu e o DevTools abrem normalmente, o macaco só observa.
    const onContextMenu = () => show("Botão direito, é? Tô de olho em você.");
    const onKeyDown = (event) => {
      if (isDevToolsShortcut(event)) show("Abrindo o DevTools? Vai lá, o console tem recado pra você.");
    };
    const onTrigger = (event) => show(event.detail);

    document.addEventListener("contextmenu", onContextMenu);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(EVENT_NAME, onTrigger);
    return () => {
      clearTimeout(timerRef.current);
      document.removeEventListener("contextmenu", onContextMenu);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(EVENT_NAME, onTrigger);
    };
  }, []);

  return createPortal(
    <div className={`side-eye ${message ? "is-peeking" : ""}`} aria-hidden={!message}>
      {message && (
        <p className="side-eye-bubble" role="status">
          {message}
        </p>
      )}
      <img className="side-eye-monkey" src="/assets/imgs/stacks/meme.webp" alt="" aria-hidden="true" />
    </div>,
    document.body,
  );
}
