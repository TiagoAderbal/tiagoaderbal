import { useEffect, useState } from "react";
import CreditPaywall from "./CreditPaywall";
import "./index.css";

const DROP_COUNT = 15;
const FIRST_DROP_DELAY_MS = 1200;
const VISIBLE_MS = 3000;
const HIDDEN_MS = 8000;

let completedDrops = 0;

export default function CoinDrop({ active, suppressed = false }) {
  const [dropped, setDropped] = useState(false);
  const [paywallOpen, setPaywallOpen] = useState(false);

  useEffect(() => {
    if (!active || completedDrops >= DROP_COUNT) return undefined;

    let timer;
    const drop = () => {
      setDropped(true);
      timer = setTimeout(() => {
        setDropped(false);
        completedDrops += 1;
        if (completedDrops < DROP_COUNT) timer = setTimeout(drop, HIDDEN_MS);
      }, VISIBLE_MS);
    };

    timer = setTimeout(drop, FIRST_DROP_DELAY_MS);
    return () => {
      clearTimeout(timer);
      setDropped(false);
    };
  }, [active]);

  const visible = dropped && !suppressed;

  return (
    <>
      <button
        className={`coin-drop ${visible ? "is-visible" : ""}`}
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
      {paywallOpen && <CreditPaywall onClose={() => setPaywallOpen(false)} />}
    </>
  );
}
