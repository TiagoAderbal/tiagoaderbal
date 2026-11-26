import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AskTiago from "../../components/AskTiago";
import "./index.css";
import SiteFooter from "../../components/SiteFooter";

const CAREER = [
  "Sou desenvolvedor Full Stack, com foco no ecossistema JavaScript e TypeScript. Gosto de construir soluções completas, do banco de dados à interface, que sejam escaláveis, fáceis de manter e que resolvam problemas reais.",
  "Comecei pelo front-end, desenvolvendo landing pages, sites institucionais e sistemas internos com React, Vue.js e Bootstrap, além de interfaces para análise de dados e relatórios com Power BI e Python. Com o tempo, fui descendo a stack: APIs REST, integrações entre sistemas, autenticação, bancos relacionais e NoSQL, Docker e CI/CD.",
  "Hoje atuo como desenvolvedor Full Stack, criando novas funcionalidades, mantendo aplicações em produção, desenvolvendo APIs e integrações, revisando código e participando de decisões técnicas.",
  "Meu jeito de trabalhar é simples: entender o problema, encontrar a causa raiz, definir a solução mais simples possível, implementar com código limpo e validar. Evito complexidade desnecessária e busco sempre o equilíbrio entre legibilidade, desempenho e manutenção.",
  "Fora do dia a dia, estudo Inteligência Artificial e Cibersegurança, áreas que quero unir à engenharia de software. O próprio ATLAS nasceu assim: um laboratório pessoal de IA que, aparentemente, decidiu que esta página agora é dele.",
];

const GLYPHS = "▓▒░█#@%&*<>/\\|=+";
const INTACT_MS = 1600;
const CORRUPT_MS = 1400;
const CORRUPT_TICK_MS = 60;

function corrupt(text, amount, seed) {
  return Array.from(text, (char, index) => {
    if (char === " ") return char;
    const threshold = ((index * 7919) % 997) / 997;
    if (threshold >= amount) return char;
    return GLYPHS[(index + seed) % GLYPHS.length];
  }).join("");
}

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

export default function About() {
  const [phase, setPhase] = useState(() => (prefersReducedMotion() ? "breached" : "intact"));
  const [amount, setAmount] = useState(0);
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    if (phase === "intact") {
      const timer = setTimeout(() => setPhase("corrupting"), INTACT_MS);
      return () => clearTimeout(timer);
    }

    if (phase === "corrupting") {
      const startedAt = Date.now();
      const interval = setInterval(() => {
        const progress = Math.min(1, (Date.now() - startedAt) / CORRUPT_MS);
        setAmount(progress);
        setSeed((value) => value + 1);
        if (progress === 1) setPhase("breached");
      }, CORRUPT_TICK_MS);
      return () => clearInterval(interval);
    }

    return undefined;
  }, [phase]);

  const breached = phase === "breached";

  return (
    <motion.div
      className="App About"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, ease: "linear" }}
    >
      <main className="content-page about-page">
        <header className="page-intro">
          <span className="eyebrow">QUEM ESTÁ POR TRÁS DO CÓDIGO</span>
          <h1>Sobre mim<span>.</span></h1>
          <p>Um pouco sobre a minha trajetória, do front-end ao full stack.</p>
        </header>

        <section
          className={`about-career infection-zone is-${phase}`}
          aria-labelledby="about-career-title"
        >
          <div className="infection-content">
            <div className="about-heading">
              {breached && (
                <div className="infection-status">
                  <span className="infection-led" /> SEÇÃO CORROMPIDA <span className="infection-divider">/</span> ATLAS.EXE <span className="infection-access">TEXTO CONSUMIDO</span>
                </div>
              )}
              <h2
                id="about-career-title"
                className={breached ? "infection-title" : undefined}
                data-text="Minha carreira"
              >
                Minha carreira
              </h2>
              {breached && (
                <p className="infection-copy">
                  Li tudo o que estava escrito aqui. Agora quem conta essa história sou eu. Pergunte.
                </p>
              )}
            </div>

            <div className="about-sr-copy">
              {CAREER.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {!breached && (
              <div className="about-copy" aria-hidden="true">
                {CAREER.map((paragraph) => (
                  <p key={paragraph}>{corrupt(paragraph, amount, seed)}</p>
                ))}
              </div>
            )}

            {breached && (
              <>
                <p className="about-fragment about-fragment--top" aria-hidden="true">
                  {corrupt(CAREER[0], 0.45, 3)}
                </p>
                <div className="about-breach intrusion-payload">
                  <span className="intrusion-tag">PROCESSO EXTERNO <span>{"//"}</span> PID 404</span>
                  <AskTiago />
                </div>
                <p className="about-fragment about-fragment--bottom" aria-hidden="true">
                  {corrupt(CAREER[CAREER.length - 1], 0.6, 7)}
                </p>
              </>
            )}
          </div>
        </section>

        <SiteFooter />
      </main>
    </motion.div>
  );
}
