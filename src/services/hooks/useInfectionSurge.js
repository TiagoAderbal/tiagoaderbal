import { useEffect, useState } from "react";

export function useInfectionSurge() {
  const [infected, setInfected] = useState(false);

  useEffect(() => {
    let timeoutId;

    const scheduleNextSurge = () => {
      const delay = 10000 + Math.random() * 10000; // 15-25s entre surtos

      timeoutId = setTimeout(() => {
        setInfected(true);

        const duration = 1200 + Math.random() * 800; // 1.2-2s de duração
        setTimeout(() => {
          setInfected(false);
          scheduleNextSurge();
        }, duration);
      }, delay);
    };

    scheduleNextSurge();

    return () => clearTimeout(timeoutId);
  }, []);

  return infected;
}