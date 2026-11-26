import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// Quanto tempo a pessoa precisa ficar parada no rodapé para "ganhar" a cena extra.
const WAIT_MS = 3000;

function PostCreditsScene({ onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return createPortal(
    <div className="post-credits" role="dialog" aria-modal="true" aria-labelledby="post-credits-title" onClick={onClose}>
      <div className="post-credits-screen" onClick={(event) => event.stopPropagation()}>
        <span className="post-credits-kicker" id="post-credits-title">CENA PÓS-CRÉDITOS</span>
        <img className="post-credits-logo" src="/assets/imgs/stacks/marvel.webp" alt="" aria-hidden="true" />
        <p className="post-credits-text">
          Você ficou até o fim dos créditos. Respeito. O Tiago faz o mesmo com log de erro: lê até a última linha,
          porque é sempre lá que está a pista do próximo bug.
        </p>
        <strong className="post-credits-return">Tiago Aderbal retornará.</strong>
        <button ref={closeRef} className="post-credits-close" type="button" onClick={onClose}>
          Acender as luzes da sala
        </button>
      </div>
    </div>,
    document.body,
  );
}

export default function SiteFooter() {
  const footerRef = useRef(null);
  const playedRef = useRef(false);
  const [showScene, setShowScene] = useState(false);
  const closeScene = useCallback(() => setShowScene(false), []);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer || !("IntersectionObserver" in window)) return undefined;

    let timer;
    const observer = new IntersectionObserver(
      ([entry]) => {
        clearTimeout(timer);
        if (!entry.isIntersecting || playedRef.current) return;
        timer = setTimeout(() => {
          // Só conta para quem rolou até aqui; página curta não tem "fim dos créditos".
          if (window.scrollY < 80) return;
          playedRef.current = true;
          setShowScene(true);
        }, WAIT_MS);
      },
      { threshold: 0.9 },
    );

    observer.observe(footer);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <footer ref={footerRef} className="site-footer">
        © {new Date().getFullYear()} Tiago Aderbal
      </footer>
      {showScene && <PostCreditsScene onClose={closeScene} />}
    </>
  );
}
