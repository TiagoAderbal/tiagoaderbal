// Contorno "infectado" desenhado por cima da borda do terminal: uma base
// avermelhada, falhas corroídas e dois focos de infecção percorrendo a borda.
export default function InfectionBorder() {
  const rect = { x: 0, y: 0, width: "100%", height: "100%", rx: 18, ry: 18, pathLength: 100 };

  return (
    <div className="infection-border" aria-hidden="true">
      <svg className="infection-outline">
        <rect {...rect} className="outline-base" />
        <rect {...rect} className="outline-corrosion" />
        <rect {...rect} className="outline-split" />
        <rect {...rect} className="outline-crawl outline-crawl--red" />
        <rect {...rect} className="outline-crawl outline-crawl--lime" />
      </svg>
    </div>
  );
}
