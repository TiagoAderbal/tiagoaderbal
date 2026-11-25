import NavbarMain from "../../components/navbar_main/navbar_main";
import "./index.css";
import { motion } from "framer-motion";
import AskTiago from "../../components/AskTiago";
import { useEffect, useRef, useState } from "react";

function shuffledIndexes(length) {
  const indexes = Array.from({ length }, (_, index) => index);
  for (let i = indexes.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }
  return indexes;
}

function TiagoUtilities() {
  const [activeTool, setActiveTool] = useState(null);
  const [randomIndex, setRandomIndex] = useState(0);
  const [popoverAnchor, setPopoverAnchor] = useState({ top: 0, left: 0 });
  const dockRef = useRef(null);
  const factBagRef = useRef([]);
  const lastFactRef = useRef(null);
  const randomFacts = [
    { title: "Palmeiras", text: "Avanti, Palestra! Em dia de jogo do Verdão, nenhum deploy é aprovado. Coração não anda bem." },
    { title: "Marvel", text: "Tiago fica até o fim dos créditos esperando a cena extra. Faz o mesmo com os logs de erro." },
    { title: "X-Men", text: "Mutação detectada: transformar café em código. O Professor Xavier ainda não respondeu o e-mail." },
    { title: "Vingadores", text: "Tiago, assemble! Mas só depois do code review." },
    { title: "Star Wars", text: "Que a Força esteja com você. O deploy é por sua conta." },
    { title: "React", text: "Esse easter egg também é um componente. Renderizou duas vezes só pra garantir." },
    { title: "TypeScript", text: "Curiosidade tipada como string. Nenhum any foi ferido." },
    { title: "Node.js", text: "A pasta node_modules deste site pesa mais que o resto do universo observável." },
    { title: "Café", text: "A dependência mais antiga e menos documentada do projeto." },
    { title: "Git", text: "git commit -m \"ajustes\": a mensagem mais honesta e menos útil da história." },
    { title: "Sexta-feira", text: "Deploy na sexta só com o Doutor Estranho confirmando que existe um futuro em que dá certo." },
    { title: "Bug", text: "Não é bug. É uma feature que ainda não foi documentada." },
    { title: "Stack Overflow", text: "Antes da IA, o Tiago já programava em dupla: com um post de 2011 no Stack Overflow." },
    { title: "CSS", text: "Centralizar a div: resolvido. Entender por que funcionou: em andamento." },
    { title: "Reuniões", text: "Essa reunião poderia ter sido um e-mail. Esse e-mail poderia ter sido um commit." },
    { title: "Regex", text: "Tiago resolveu um problema com regex. Agora ele tem dois problemas." },
    { title: "Thanos", text: "Se o Thanos estalasse os dedos neste código, metade dos meus problemas sumiriam. Seria um favor." },
    { title: "Mestre Yoda", text: "Funcionar ou não funcionar. Não existe \"na minha máquina funciona\"." },
    { title: "Darth Vader", text: "Eu sou seu pai. E de todas as branches abandonadas deste repositório." },
    { title: "ATLAS", text: "Esta curiosidade foi escrita por um humano. O ATLAS discorda e pediu crédito." },
    { title: "Vercel", text: "Hospedado no plano gratuito. Se cair, culpe o orçamento, não o código." },
    { title: "Cibersegurança", text: "Senha123 continua não sendo uma senha forte, mesmo com um ! no final." },
    { title: "Homem de Ferro", text: "Tony Stark montou uma armadura numa caverna. Tiago às vezes não consegue rodar o projeto depois do npm install." },
    { title: "Documentação", text: "A documentação está sempre atualizada. Na cabeça de quem escreveu o código." },
  ];
  const selectedFact = randomFacts[randomIndex];

  const drawFactIndex = () => {
    if (factBagRef.current.length === 0) {
      const bag = shuffledIndexes(randomFacts.length);
      if (bag.length > 1 && bag[bag.length - 1] === lastFactRef.current) {
        [bag[0], bag[bag.length - 1]] = [bag[bag.length - 1], bag[0]];
      }
      factBagRef.current = bag;
    }
    const next = factBagRef.current.pop();
    lastFactRef.current = next;
    return next;
  };

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
      setRandomIndex(drawFactIndex());
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
        <button type="button" className={`dock-button ${activeTool === "bugs" ? "is-active" : ""}`} aria-label="Bugs conhecidos" aria-pressed={activeTool === "bugs"} onClick={(event) => activateTool("bugs", event)}><svg className="dock-svg bug-glyph" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 10a4 4 0 0 1 8 0v4a4 4 0 0 1-8 0z" /><path d="M12 10v8M9.5 6.5 8 4.5M14.5 6.5 16 4.5M8 12H4.5M19.5 12H16M8 16l-3 2M16 16l3 2M8 9 5 7.5M16 9l3-1.5" /></svg></button>
        <button type="button" className={`dock-button ${activeTool === "deploy" ? "is-active" : ""}`} aria-label="Último deploy" aria-pressed={activeTool === "deploy"} onClick={(event) => activateTool("deploy", event)}><svg className="dock-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 15 6.5 12.5C8 8.5 11.5 4 18.5 3.5 18 10.5 13.5 14 9.5 15.5z" /><path d="M6.5 12.5H4L6 9.5h4M11.5 17.5V20l3-2v-4" /><path d="M5.5 16c-1.4 1.4-2 4.5-2 4.5s3.1-.6 4.5-2" /><circle cx="14.5" cy="8.5" r="1.4" /></svg></button>
        <button type="button" className={`dock-button ${activeTool === "stacks" ? "is-active" : ""}`} aria-label="Ver ferramentas" aria-pressed={activeTool === "stacks"} onClick={(event) => activateTool("stacks", event)}><span className="dock-glyph stack-glyph">&lt;/&gt;</span></button>
        <button type="button" className={`dock-button ${activeTool === "random" ? "is-active" : ""}`} aria-label="Curiosidade aleatória" aria-pressed={activeTool === "random"} onClick={(event) => activateTool("random", event)}><span className="dock-glyph random-glyph">?</span></button>
      </div>
      {activeTool && (
        <div className="dock-popover" role="status" aria-live="polite">
          {activeTool === "coffee" && <><span className="popover-kicker">SISTEMA DE SUPORTE</span><strong className="coffee-readout"><img className="coffee-popover-icon" src="/assets/imgs/stacks/coffee.png" alt="" aria-hidden="true" /> Café: 87%</strong><p>Operacional por mais uma reunião e meia.</p></>}
          {activeTool === "build" && <><span className="popover-kicker">STATUS DO BUILD</span><strong><span className="build-led" /> Na minha máquina funciona</strong></>}
          {activeTool === "bugs" && <><span className="popover-kicker">MONITOR DE BUGS</span><strong>3 bugs conhecidos</strong><p>Os desconhecidos estão em produção, se divertindo.</p></>}
          {activeTool === "deploy" && <><span className="popover-kicker">ÚLTIMO DEPLOY</span><strong>Há 2 horas</strong><p>Nada pegou fogo. Ainda.</p></>}
          {activeTool === "stacks" &&<><span className="popover-kicker">FERRAMENTAS CARREGADAS</span><div className="stack-chips">{["React", "Next.js", "Vue.js", "JavaScript", "TypeScript", "Node.js", "Express", "NestJS", "PHP", "Python", "PostgreSQL", "MySQL", "Docker", "Kubernetes", "ArgoCD", "GCP", "Salesforce Marketing Cloud", "Claude Code", "Cibersegurança", "Inteligência Artificial"].map((stack) => <span key={stack}>{stack}</span>)}</div></>}
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
            <span className="intrusion-tag">PROCESSO EXTERNO <span>{'//'}</span> PID 404</span>
            <AskTiago />
          </div>
        </div>
      </section>
      <footer className="site-footer">© {new Date().getFullYear()} Tiago Aderbal</footer>
    </motion.div>
  );
}

export default Home;
