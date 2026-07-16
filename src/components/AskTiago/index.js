import { useEffect, useState } from "react";
import { TERMINAL } from "./terminalStates";
import "./index.css";
import ArcTerminal from "./ArcTerminal";
import { askToTiago } from "../../services/ai";

export default function AskTiago() {
  const [opened, setOpened] = useState(false);
  const [terminalState, setTerminalState] = useState(TERMINAL.IDLE);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [errorType, setErrorType] = useState(null);
  const [initialized, setInitialized] = useState(false);

  async function handleAsk() {
    if (!question.trim()) return;
    setAnswer("");
    setErrorType(null);
    if (!initialized) {
      setTerminalState(TERMINAL.BOOT);
    } else {
      setTerminalState(TERMINAL.ANALYZING);
    }
  }

  useEffect(() => {
    if (terminalState !== TERMINAL.ASKING) return;

    async function ask() {
      const result = await askToTiago(question);

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