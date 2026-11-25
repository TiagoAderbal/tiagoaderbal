import { useState } from "react";
import CreditPaywall from "./CreditPaywall";
import { useCoinCycle } from "./useCoinCycle";
import "./index.css";

/**
 * Moedinha do ATLAS PRO™.
 * - padrão: cai embaixo do botão de tema, na navbar.
 * - `inline`: ocupa o lugar de `children` (ex.: o ponto verde de um título) enquanto está visível.
 */
export default function CoinDrop({ active, suppressed = false, inline = false, children }) {
  const dropped = useCoinCycle(active, inline ? "inline" : "nav");
  const [paywallOpen, setPaywallOpen] = useState(false);

  const visible = dropped && !suppressed;

  const coin = (
    <button
      className={`coin-drop ${inline ? "coin-drop--inline" : ""} ${visible ? "is-visible" : ""}`}
      type="button"
      onClick={() => setPaywallOpen(true)}
      aria-label="Moedinha ATLAS PRO™"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <span className="coin">
        <span className="coin-face">$</span>
      </span>
    </button>
  );

  return (
    <>
      {inline ? (
        <span className={`coin-slot ${visible ? "has-coin" : ""}`}>
          <span className="coin-slot-mark">{children}</span>
          {coin}
        </span>
      ) : (
        coin
      )}
      {paywallOpen && <CreditPaywall onClose={() => setPaywallOpen(false)} />}
    </>
  );
}
