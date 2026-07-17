import { useState } from "react";
import { createPortal } from "react-dom";

const PIX_KEY = "39ef119c-f857-4def-b4bf-00508e817409";
const MERCHANT_NAME = "Tiago Aderbal";
const MERCHANT_CITY = "Sao Paulo";

export default function PixModal({ onClose }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    PIX_KEY,
  )}&bgcolor=090909&color=d7af43&qzone=2`;

  const modal = (
    <div className="pix-modal-overlay" onClick={onClose}>
      <div className="pix-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="pix-modal-close"
          onClick={onClose}
          aria-label="Fechar"
        >
          ✕
        </button>

        <div className="pix-modal-header">
          <span className="pix-modal-icon">◎</span>
          <h3>ATLAS PRO™</h3>
        </div>

        <p className="pix-modal-subtitle">
          Assine e desbloqueie... nada, na verdade. Mas a gente agradece.
        </p>

        <div className="pix-modal-qr-frame">
          <img src={qrUrl} alt="QR Code Pix" className="pix-modal-qr" />
        </div>

        <div className="pix-modal-key">
          <span>{PIX_KEY}</span>
          <button onClick={handleCopy} className="pix-modal-copy">
            {copied ? "Copiado ✓" : "Copiar"}
          </button>
        </div>

        <p className="pix-modal-footer">
          100% opcional. 0% desconto na piada. Contribuição livre, sem reembolso
          — nem o Tony Stark devolve dinheiro de P&D.
        </p>
      </div>
    </div>
  );
  return createPortal(modal, document.body);
}
