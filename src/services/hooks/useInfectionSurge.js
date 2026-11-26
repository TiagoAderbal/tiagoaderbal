import { useEffect, useState } from "react";

const MIN_INTERVAL_MS = 10000; // 10-20s entre surtos
const MAX_EXTRA_INTERVAL_MS = 10000;
const MIN_DURATION_MS = 1200; // 1.2-2s de duração
const MAX_EXTRA_DURATION_MS = 800;

export function useInfectionSurge() {
  const [infected, setInfected] = useState(false);

  useEffect(() => {
    // Um único id para os dois timers (espera e duração do surto): o cleanup
    // cancela o que estiver pendente e a cadeia não sobrevive ao componente.
    let timeoutId;
    let active = true;

    const scheduleNextSurge = () => {
      timeoutId = setTimeout(() => {
        if (!active) return;
        setInfected(true);

        timeoutId = setTimeout(() => {
          if (!active) return;
          setInfected(false);
          scheduleNextSurge();
        }, MIN_DURATION_MS + Math.random() * MAX_EXTRA_DURATION_MS);
      }, MIN_INTERVAL_MS + Math.random() * MAX_EXTRA_INTERVAL_MS);
    };

    scheduleNextSurge();

    return () => {
      active = false;
      clearTimeout(timeoutId);
    };
  }, []);

  return infected;
}
