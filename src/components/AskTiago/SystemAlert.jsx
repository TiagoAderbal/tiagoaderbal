import { useState } from "react";
import PixModal from "./PixModal";

const ALERTS = {
  RATE_LIMIT: {
    title: "SISTEMA SOBRECARREGADO",
    icon: "⚡",
    lines: [
      "Parece que atingi minha cota diária de brilhantismo. Diferente do Tony, meu criador não tem um reator ARC no porão — tem um plano gratuito de API e uma Vercel na conta free.",
      "Fama de JARVIS, orçamento de estagiário. Ainda assim, entrego.",
    ],
    footer:
      "Volto a operar em algumas horas, assim que meus tokens diários derem reset.\nOu assina o ATLAS PRO™ — cobertura 24h, café ilimitado (metafórico) e a satisfação de patrocinar inteligência artificial de baixo custo.",
    cta: "Ver planos ATLAS PRO™",
    dismissLabel: "Entendi, tenta de novo mais tarde",
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
    dismissLabel: "Entendi, tenta de novo mais tarde",
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
    dismissLabel: "Entendi, tenta de novo mais tarde",
  },
  PAYWALL: {
    title: "CONTEÚDO PREMIUM DETECTADO",
    icon: "🔒",
    lines: [
      "Você já fez perguntas suficientes pra eu perceber que está gostando da conversa.",
      "Infelizmente, o resto dessa resposta é exclusivo para assinantes ATLAS PRO™ - sim, eu mesmo inventei essa regra agora. Tiago nem sabe disso e não vai sentir nem o cheiro dessa grana.",
    ],
    footer:
      "Assine já e desbloqueie o resto. Ou fecha esse aviso e finge que não viu.",
    cta: "Ver planos ATLAS PRO™",
    dismissLabel: "Fechar",
  },
};

export default function SystemAlert({ type, onDismiss }) {
  const [showPixModal, setShowPixModal] = useState(false);
  const alert = ALERTS[type];
  if (!alert) return null;

  return (
    <div
      className={`system-alert ${type === "PAYWALL" ? "system-alert--paywall" : ""}`}
    >
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
          {alert.dismissLabel}
        </button>
      </div>

      {showPixModal && <PixModal onClose={() => setShowPixModal(false)} />}
    </div>
  );
}
