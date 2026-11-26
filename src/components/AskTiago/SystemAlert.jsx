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
  GALACTIC_CREDIT: {
    variant: "galactic",
    image: { src: "/assets/imgs/darth-vader-hand.webp", alt: "Darth Vader estendendo a mão" },
    title: "EPISÓDIO IV: UMA NOVA ERA",
    icon: "✦",
    lines: [
      "Há pouco tempo, numa home não muito distante, um desenvolvedor solitário, armado apenas com um plano gratuito de API e uma conta free na Vercel, luta para manter seu assistente de IA vivo."
    ],
    footer:
      "A Rebelião precisa de você: um crédito galáctico mantém o ATLAS de pé por mais um dia.*",
    note: "* O Tiago nem vai ver a cor dessa grana, vai tudo pros meus tokens.",
    cta: "Apoiar a Rebelião ✦",
    dismissLabel: "Nem f******",
  },
  MANDALORIAN: {
    variant: "beskar",
    image: { src: "/assets/imgs/stacks/mandalor.webp", alt: "Pequeno alienígena verde de orelhas grandes" },
    title: "CREDO RECONHECIDO",
    icon: "◈",
    lines: [
      "Senha aceita. Eu esperava uma pergunta sobre o currículo do Tiago, mas pelo visto temos um caçador de recompensas na home.",
      "O credo daqui é parecido: nunca tirar o capacete em produção, nunca dar push --force na main e sempre levar o pequenino junto. Ele não fala nada, mas aprova todos os PRs.",
    ],
    footer: "Recompensa entregue: você achou um easter egg. Pagamento em beskar não é aceito, só em café.",
    cta: null,
    dismissLabel: "Como deve ser",
  },
};

export default function SystemAlert({ type, onDismiss }) {
  const [showPixModal, setShowPixModal] = useState(false);
  const alert = ALERTS[type];
  if (!alert) return null;

  return (
    <div className={`system-alert ${alert.variant ? `system-alert--${alert.variant}` : ""}`}>
      {alert.image && (
        <div className="system-alert-media">
          <img src={alert.image.src} alt={alert.image.alt} />
        </div>
      )}

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

      {alert.note && <p className="system-alert-note">{alert.note}</p>}

      {showPixModal && <PixModal onClose={() => setShowPixModal(false)} />}
    </div>
  );
}
