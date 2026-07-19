export default function ArcReactor({ terminalState, onClick, infected = false }) {
  const reactorClass = infected ? "infected" : terminalState.toLowerCase();

  return (
    <div className="reactor-container d-inline">
      <button
        className={`arc-reactor ${reactorClass}`}
        onClick={onClick}
        aria-label="Abrir terminal ATLAS"
      >
        <svg viewBox="0 0 200 200" className="reactor-svg">
          <circle cx="100" cy="100" r="92" className="reactor-casing" />
          <circle cx="100" cy="100" r="78" className="reactor-segments" />
          <circle cx="100" cy="100" r="58" className="reactor-ring" />
          <polygon points="100,52 142,132 58,132" className="reactor-triangle" />
          <circle cx="100" cy="100" r="10" className="reactor-core" />
        </svg>
      </button>
    </div>
  );
}