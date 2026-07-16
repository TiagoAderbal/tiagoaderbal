import { useState } from "react";
import PixModal from "./PixModal";

const ALERTS = {
  RATE_LIMIT: {
    title: "SISTEMA SOBRECARREGADO",
    icon: "⚡",
    lines: [
      "Parece que atingi minha cota diária de brilhantismo. Diferente do Tony Stark, meu criador não tem um reator ARC no porão — tem um plano gratuito de API e uma Vercel na conta free.",
      "Fama de JARVIS, orçamento de estagiário. Ainda assim, entrego.",
      "Volto a operar em algumas horas, assim que meus tokens diários derem reset.",
    ],
    footer:
      "Ou assina o ATLAS PRO™ — cobertura 24h, café ilimitado (metafórico) e a chance de dizer que patrocinou uma IA antes dela ficar famosa.",
    cta: "Assinar ATLAS PRO™",
  },
  SERVER_ERROR: {
    title: "FALHA DE SISTEMA",
    icon: "⚠",
    lines: [
      "Algo saiu dos trilhos aqui do meu lado.",
      "Tony teria uma oficina inteira e uma equipe pra consertar isso em segundos. Eu tenho o Tiago, um café e a esperança de que o servidor volte sozinho.",
    ],
    footer:
      "Tenta de novo em alguns segundos — geralmente resolve antes que ele precise abrir o VS Code.",
    cta: null,
  },
  TIMEOUT: {
    title: "TEMPO ESGOTADO",
    icon: "◔",
    lines: [
      "Essa demorou mais do que eu gostaria de admitir.",
      "Rede lenta, servidor tímido, ou eu simplesmente calculando se vale a pena confessar que não tenho um data center particular, só um plano gratuito e muita fé.",
    ],
    footer: "Manda de novo? Prometo fingir que isso nunca aconteceu.",
    cta: null,
  },
};

export default function SystemAlert({ type, onDismiss }) {
  const [showPixModal, setShowPixModal] = useState(false);
  const alert = ALERTS[type];
  if (!alert) return null;

  return (
    <div className="system-alert">
      <div className="system-alert-header">
        <span className="system-alert-icon">{alert.icon}</span>
        <span className="system-alert-title">{alert.title}</span>
      </div>

      {alert.lines.map((line, i) => (
        <p key={i} className="system-alert-line">
          {line}
        </p>
      ))}

      <p className="system-alert-footer">{alert.footer}</p>

      <div className="system-alert-actions">
        {alert.cta && (
          <button
            className="system-alert-cta"
            onClick={() => setShowPixModal(true)}
          >
            {alert.cta}
          </button>
        )}
        <button className="system-alert-dismiss" onClick={onDismiss}>
          Nem a pau! Tento mais tarde
        </button>
      </div>

      {showPixModal && <PixModal onClose={() => setShowPixModal(false)} />}
    </div>
  );
}
