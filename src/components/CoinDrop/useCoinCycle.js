import { useEffect, useState } from "react";

const DROP_COUNT = 15;
const FIRST_DROP_DELAY_MS = 1200;
const VISIBLE_MS = 3000;
const HIDDEN_MS = 8000;

// Cada lugar onde a moedinha aparece tem seu próprio limite de quedas por sessão.
const completedDrops = {};

export function useCoinCycle(active, key) {
  const [dropped, setDropped] = useState(false);

  useEffect(() => {
    if (!active || (completedDrops[key] || 0) >= DROP_COUNT) return undefined;

    let timer;
    const drop = () => {
      setDropped(true);
      timer = setTimeout(() => {
        setDropped(false);
        completedDrops[key] = (completedDrops[key] || 0) + 1;
        if (completedDrops[key] < DROP_COUNT) timer = setTimeout(drop, HIDDEN_MS);
      }, VISIBLE_MS);
    };

    timer = setTimeout(drop, FIRST_DROP_DELAY_MS);
    return () => {
      clearTimeout(timer);
      setDropped(false);
    };
  }, [active, key]);

  return dropped;
}
