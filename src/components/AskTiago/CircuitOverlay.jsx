function CircuitCorner({ rotate = 0 }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className="circuit-corner"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path d="M 0 30 H 40 V 60 H 70 V 40" className="circuit-trace" />
      <path d="M 20 0 V 20 H 50 V 50" className="circuit-trace" />
      <circle cx="70" cy="40" r="3" className="circuit-node" />
      <circle cx="50" cy="50" r="3" className="circuit-node" />
    </svg>
  );
}

export default function CircuitOverlay({ infected = false }) {
  return (
    <div className={`circuit-overlay ${infected ? "infected" : ""}`}>
      <CircuitCorner rotate={0} />
      <CircuitCorner rotate={90} />
      <CircuitCorner rotate={270} />
      <CircuitCorner rotate={180} />
    </div>
  );
}