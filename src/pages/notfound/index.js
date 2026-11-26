import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./index.css";

// Cada clique na máscara troca a fala. A última se repete para sempre.
const QUIPS = [
  "Ei! Isso aqui é a minha cara, não um botão.",
  "Clica de novo e eu chamo o Tiago. Ele tá ocupado centralizando uma div desde 2019.",
  "Tá bom, tá bom. Toma um 404 extra de brinde: 404.",
  "Sério que você ainda tá clicando? O blog tem conteúdo melhor que eu. Mentira, não tem. Mas vai lá.",
];

export default function NotFound() {
  const { pathname } = useLocation();
  const [quip, setQuip] = useState(-1);
  const [censored, setCensored] = useState(true);
  const [poke, setPoke] = useState(0);

  const pokeMask = () => {
    setQuip((current) => Math.min(current + 1, QUIPS.length - 1));
    setPoke((current) => current + 1);
  };

  return (
    <main className="nf-page">
      <div className="nf-halftone" aria-hidden="true" />

      <section className="nf-panel">
        <div className="nf-art">
          <span className="nf-code" aria-hidden="true">404</span>
          <button
            key={poke}
            type="button"
            className={`nf-mask ${poke ? "is-poked" : ""}`}
            onClick={pokeMask}
            aria-label="Cutucar o mercenário"
          >
            <img src="/assets/imgs/stacks/deadpool.webp" alt="" />
          </button>
          <p className="nf-balloon nf-balloon--art" aria-live="polite">
            {quip < 0 ? "Pode clicar na máscara. Eu deixo. Uma vez." : QUIPS[quip]}
          </p>
        </div>

        <div className="nf-copy">
          <span className="nf-kicker">ERRO 404 · QUARTA PAREDE: QUEBRADA</span>
          <p className="nf-balloon">Ei, você aí do outro lado da tela. É, você mesmo.</p>
          <h1>
            Que{" "}
            <button
              type="button"
              className={`nf-censor ${censored ? "" : "is-revealed"}`}
              onClick={() => setCensored((current) => !current)}
              aria-label={censored ? "Palavra censurada. Clique por sua conta e risco." : "Censurar de novo"}
            >
              {censored ? "p#@%*" : "[CENSURADO PELO RH]"}
            </button>{" "}
            você veio fazer aqui?
          </h1>
          <p className="nf-text">
            Você digitou <code>{pathname}</code> com toda a confiança do mundo, e essa página não existe. Ou existia,
            até o Tiago apagar num commit chamado &quot;ajustes&quot;. Eu avisei pra ele não fazer deploy na sexta.
          </p>

          <aside className="nf-caption">
            <strong>Nota do roteirista:</strong> o mercenário foi contratado com orçamento zero. Pagamos em chimichangas
            e promessas de spin-off.
          </aside>

          <div className="nf-actions">
            <Link className="nf-button nf-button--primary" to="/">
              Me tira daqui
            </Link>
            <Link className="nf-button" to="/projects">
              Ver os projetos (são melhores que esta página)
            </Link>
          </div>

          <small className="nf-fineprint">
            Nenhum servidor foi ferido na produção desta página. Só o ego do desenvolvedor.
          </small>
        </div>
      </section>
    </main>
  );
}
