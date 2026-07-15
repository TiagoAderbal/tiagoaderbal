import { TERMINAL } from "./terminalStates";

export default function StatusBar({ terminalState, infected = false }) {
  const isProcessing =
    terminalState === TERMINAL.ASKING ||
    terminalState === TERMINAL.ANALYZING ||
    terminalState === TERMINAL.TYPING;

  const statusText = infected
    ? "OUT OF SYSTEM"
    : isProcessing
      ? "PROCESSANDO"
      : "ONLINE";

  return (
    <div className="status-bar">
      <div>
        <h2
          className={infected ? "glitch-text corrupting" : "glitch-text"}
          data-text="A.T.L.A.S."
        >
          A.T.L.A.S.
        </h2>

        <span className={infected ? "compromised" : ""}>{statusText}</span>
      </div>

      <div>
        <p>AI Personal Assistant</p>
      </div>
    </div>
  );
}
