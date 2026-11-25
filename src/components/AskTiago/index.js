import { useEffect, useRef, useState } from "react";
import { TERMINAL } from "./terminalStates";
import "./index.css";
import ArcTerminal from "./ArcTerminal";
import { askToTiago } from "../../services/ai";

const DEMO_COMMANDS = {
  "!ratelimit": "RATE_LIMIT",
  "!error": "SERVER_ERROR",
  "!timeout": "TIMEOUT",
};

export default function AskTiago() {
  const [opened, setOpened] = useState(true);
  const [terminalState, setTerminalState] = useState(TERMINAL.IDLE);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [errorType, setErrorType] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const requestRef = useRef(null);

  async function handleAsk() {
    if (!question.trim()) return;
    setAnswer("");
    setErrorType(null);

    const demoType = DEMO_COMMANDS[question.trim().toLowerCase()];
    if (demoType) {
      setQuestion("");
      setErrorType(demoType);
      setTerminalState(TERMINAL.ERROR);
      return;
    }

    // A requisição começa junto com a animação do log, não depois dela.
    requestRef.current = askToTiago(question);

    if (!initialized) {
      setTerminalState(TERMINAL.BOOT);
    } else {
      setTerminalState(TERMINAL.ANALYZING);
    }
  }

  useEffect(() => {
    if (terminalState !== TERMINAL.ASKING) return;

    let cancelled = false;

    async function ask() {
      const result = await (requestRef.current ?? askToTiago(question));
      if (cancelled) return;
      requestRef.current = null;

      if (result.type === "OK") {
        setAnswer(result.answer);
        setQuestion("");
        setTerminalState(TERMINAL.TYPING);
      } else {
        setErrorType(result.type);
        setQuestion("");
        setTerminalState(TERMINAL.ERROR);
      }
    }

    ask();
    return () => {
      cancelled = true;
    };
  }, [terminalState, question]);

  return (
    <ArcTerminal
      opened={opened}
      terminalState={terminalState}
      question={question}
      answer={answer}
      errorType={errorType}
      setQuestion={setQuestion}
      onOpen={() => setOpened(true)}
      onAsk={handleAsk}
      setTerminalState={setTerminalState}
      setInitialized={setInitialized}
    />
  );
}