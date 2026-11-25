import StreamingAnswer from "./StreamingAnswer";
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

  // Enquanto processa, quem dá o feedback visual é o ProcessLog.
  if (!answer) return null;

  return (
    <div className="terminal-output">
      <div className="answer-label">
        atlas <span>{"//"} resposta</span>
      </div>

      <StreamingAnswer
        text={answer}
        streaming={terminalState === TERMINAL.TYPING}
        infected={infected}
        onFinish={() => setTerminalState(TERMINAL.IDLE)}
      />
    </div>
  );
}
