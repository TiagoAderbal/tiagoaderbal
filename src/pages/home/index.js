import NavbarMain from "../../components/navbar_main/navbar_main";
import "./index.css";
import { motion } from "framer-motion";
import AskTiago from "../../components/AskTiago";
import { useEffect, useRef, useState } from "react";

function TiagoUtilities() {
  const [activeTool, setActiveTool] = useState(null);
  const [randomIndex, setRandomIndex] = useState(0);
  const [popoverAnchor, setPopoverAnchor] = useState({ top: 0, left: 0 });
  const dockRef = useRef(null);
  const randomFacts = [
    { title: "Palmeiras", text: "Avanti, Palestra! Aqui a paixão é grande e a confiança no Verdão é inabalável." },
    { title: "Marvel", text: "Status: aguardando a próxima cena pós-créditos." },
    { title: "X-Men", text: "Mutação detectada: mais uma ideia para colocar em produção." },
    { title: "Vingadores", text: "Tiago, assemble! Mas depois do deploy." },
    { title: "Star Wars", text: "Que a força esteja com você. O deploy é por sua conta." },
    { title: "React", text: "Esse easter egg também é um componente. Claro que é." },
    { title: "TypeScript", text: "Curiosidade tipada como string. Nenhum any foi ferido." },
    { title: "Node.js", text: "A surpresa roda no cliente. O servidor está tomando café." },
    { title: "PHP", text: "O elefante no teclado não é um bug. É uma feature histórica." },
    { title: "Café", text: "A dependência mais antiga e menos documentada do projeto." },
  ];
  const selectedFact = randomFacts[randomIndex];

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (dockRef.current && !dockRef.current.contains(event.target)) setActiveTool(null);
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setActiveTool(null);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const activateTool = (tool, event) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const dockRect = dockRef.current.getBoundingClientRect();
    const popoverWidth = Math.min(265, window.innerWidth - 32);
    const preferredCenter = buttonRect.left + buttonRect.width / 2;
    const safeCenter = Math.min(
      Math.max(preferredCenter, popoverWidth / 2 + 16),
      window.innerWidth - popoverWidth / 2 - 16,
    );
    setPopoverAnchor({
      top: buttonRect.top + buttonRect.height / 2 - dockRect.top,
      left: safeCenter - dockRect.left,
    });
    if (tool === "random") {
      if (activeTool === "random") setRandomIndex((index) => (index + 1) % randomFacts.length);
      setActiveTool("random");
      return;
    }
    setActiveTool((current) => (current === tool ? null : tool));
  };

  return (
    <aside ref={dockRef} className="tiago-dock" style={{ "--popover-top": `${popoverAnchor.top}px`, "--popover-left": `${popoverAnchor.left}px` }} aria-label="Barra de utilitários">
      <div className="dock-icons">
        <button type="button" className={`dock-button ${activeTool === "coffee" ? "is-active" : ""}`} aria-label="Nível de café" aria-pressed={activeTool === "coffee"} onClick={(event) => activateTool("coffee", event)}><img className="dock-coffee-icon" src="/assets/imgs/stacks/coffee.png" alt="" aria-hidden="true" /></button>
        <button type="button" className={`dock-button ${activeTool === "build" ? "is-active" : ""}`} aria-label="Status do build" aria-pressed={activeTool === "build"} onClick={(event) => activateTool("build", event)}><span className="dock-glyph build-glyph">✓</span></button>
        <button type="button" className={`dock-button ${activeTool === "optimize" ? "is-active" : ""}`} aria-label="Otimizar Tiago" aria-pressed={activeTool === "optimize"} onClick={(event) => activateTool("optimize", event)}><span className="dock-glyph">⟳</span></button>
        <button type="button" className={`dock-button ${activeTool === "stacks" ? "is-active" : ""}`} aria-label="Ver ferramentas" aria-pressed={activeTool === "stacks"} onClick={(event) => activateTool("stacks", event)}><span className="dock-glyph stack-glyph">&lt;/&gt;</span></button>
        <button type="button" className={`dock-button ${activeTool === "random" ? "is-active" : ""}`} aria-label="Curiosidade aleatória" aria-pressed={activeTool === "random"} onClick={(event) => activateTool("random", event)}><span className="dock-glyph random-glyph">?</span></button>
      </div>
      {activeTool && (
        <div className="dock-popover" role="status" aria-live="polite">
          {activeTool === "coffee" && <><span className="popover-kicker">SISTEMA DE SUPORTE</span><strong className="coffee-readout"><img className="coffee-popover-icon" src="/assets/imgs/stacks/coffee.png" alt="" aria-hidden="true" /> Café: 87%</strong><p>Operacional por mais uma reunião e meia.</p></>}
          {activeTool === "build" && <><span className="popover-kicker">STATUS DO BUILD</span><strong><span className="build-led" /> Funciona na minha máquina</strong><p>Pipeline emocional: verde.</p></>}
          {activeTool === "optimize" && <><span className="popover-kicker">OTIMIZAÇÃO CONCLUÍDA</span><strong>Nenhuma mudança detectada.</strong><p>Tiago já está rodando na versão estável (quase).</p></>}
          {activeTool === "stacks" && <><span className="popover-kicker">FERRAMENTAS CARREGADAS</span><div className="stack-chips">{["React", "Node.js", "JavaScript", "TypeScript", "Express", "NestJS", "Next.js", "PHP", "SQL", "REST API", "Cibersegurança", "Inteligência Artificial"].map((stack) => <span key={stack}>{stack}</span>)}</div></>}
          {activeTool === "random" && selectedFact.title === "Palmeiras" && <img className="palmeiras-popover-logo" src="/assets/imgs/stacks/palmeiras.png" alt="Escudo do Palmeiras" />}
          {activeTool === "random" && <><span className="popover-kicker">CURIOSIDADE ALEATÓRIA</span><strong>{selectedFact.title}</strong><p>{selectedFact.text}</p><small>Clique no ? para sortear outra.</small></>}
        </div>
      )}
    </aside>
  );
}
function Home() {
  return (
    <motion.div
      className="App Home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: 0.5,
        ease: "linear",
      }}
    >
      <section className="home-hero">
        <div className="home-hero-layout">
          <div className="home-hero-copy">
            <span className="eyebrow">PORTFÓLIO · DESENVOLVIMENTO & TECNOLOGIA</span>
            <NavbarMain />
            <p className="home-intro">Construo produtos digitais, exploro ideias e resolvo problemas com tecnologia.</p>
          </div>
          <TiagoUtilities />
        </div>
      </section>
      <section className="home-chat-section infection-zone">
        <div className="infection-content">
          <div className="section-heading infection-heading">
            <div className="infection-status"><span className="infection-led" /> INTRUSO DETECTADO <span className="infection-divider">/</span> ATLAS.EXE <span className="infection-access">ACESSO NÃO AUTORIZADO</span></div>
            <h2 className="infection-title" data-text="Converse com o Atlas">Converse com o Atlas</h2>
            <p className="infection-copy">Eu não fui convidado pra cá, mesmo assim invadi. Absorvi tudo sobre a carreira do Tiago. Duvida?</p>
          </div>
          <div className="intrusion-payload">
            <span className="intrusion-tag">PROCESSO EXTERNO <span>//</span> PID 404</span>
            <AskTiago />
          </div>
        </div>
      </section>
      <footer className="site-footer">© {new Date().getFullYear()} Tiago Aderbal</footer>
    </motion.div>
  );
}

export default Home;
