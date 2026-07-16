import ReactMarkdown from "react-markdown";
import TypeWriter from "./TypeWriter";
import { TERMINAL } from "./terminalStates";

export default function TerminalOutput({
  terminalState,
  answer,
  setTerminalState,
  infected = false,
}) {
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
