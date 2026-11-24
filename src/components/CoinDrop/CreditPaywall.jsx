import { useEffect } from "react";
import { createPortal } from "react-dom";
import SystemAlert from "../AskTiago/SystemAlert";
import "../AskTiago/index.css";

export default function CreditPaywall({ onClose }) {
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  return createPortal(
    <div className="credit-paywall" role="dialog" aria-modal="true" onClick={handleBackdropClick}>
      <SystemAlert type="GALACTIC_CREDIT" onDismiss={onClose} />
    </div>,
    document.body,
  );
}
