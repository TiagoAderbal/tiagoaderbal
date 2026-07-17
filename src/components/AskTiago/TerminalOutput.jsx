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
  isPaywalled = false,
  onDismissPaywall,
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

  // Feedback visual enquanto aguarda a resposta da API
  if (
    (terminalState === TERMINAL.ASKING ||
      terminalState === TERMINAL.ANALYZING) &&
    !answer
  ) {
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
        <>
          <div
            className={`markdown-output ${infected ? "infected" : ""} ${isPaywalled ? "paywall-blurred" : ""}`}
          >
            <ReactMarkdown>{answer}</ReactMarkdown>
          </div>

          {isPaywalled && (
            <SystemAlert type="PAYWALL" onDismiss={onDismissPaywall} />
          )}
        </>
      )}
    </div>
  );
}
