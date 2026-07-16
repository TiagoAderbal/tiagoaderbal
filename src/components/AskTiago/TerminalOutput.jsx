import ReactMarkdown from "react-markdown";
import TypeWriter from "./TypeWriter";
import SystemAlert from "./SystemAlert";
import { TERMINAL } from "./terminalStates";

export default function TerminalOutput({
  terminalState,
  answer,
  errorType,
  setTerminalState,
  infected = false,
}) {
  if (terminalState === TERMINAL.ERROR) {
    return (
      <div className="terminal-output">
        <SystemAlert
          type={errorType}
          onDismiss={() => setTerminalState(TERMINAL.IDLE)}
        />
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
        <div className={`markdown-output ${infected ? "infected" : ""}`}>
          <ReactMarkdown>{answer}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
