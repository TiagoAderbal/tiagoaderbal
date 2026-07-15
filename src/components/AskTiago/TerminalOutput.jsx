import TypeWriter from "./TypeWriter";
import { TERMINAL } from "./terminalStates";

export default function TerminalOutput({
  terminalState,
  answer,
  setTerminalState,
  infected = false,
}) {
  if (terminalState === TERMINAL.ASKING && !answer) {
    return (
      <div className="terminal-output">
        <span className="thinking-dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </div>
    );
  }

  if (!answer) return null;

  return (
    <div className="terminal-output">
      {terminalState === TERMINAL.TYPING ? (
        <TypeWriter
          text={answer}
          speed={18}
          infected={infected}
          onFinish={() => setTerminalState(TERMINAL.IDLE)}
        />
      ) : (
        <div
          className={
            infected ? "typewriter glitch-text corrupting" : "typewriter"
          }
          data-text={answer}
        >
          {answer}
        </div>
      )}
    </div>
  );
}
