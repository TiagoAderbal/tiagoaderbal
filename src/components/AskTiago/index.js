import { useEffect, useState } from "react";
import { TERMINAL } from "./terminalStates";
import "./index.css";
import "./animations.css";
import ArcTerminal from "./ArcTerminal";
import { askToTiago } from "../../services/ai";

export default function AskTiago() {

  const [opened, setOpened] = useState(false);
  const [terminalState, setTerminalState] = useState(TERMINAL.IDLE);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [initialized, setInitialized] = useState(false);

  async function handleAsk() {
    if (!question.trim()) return;
    setAnswer("");
    if (!initialized) {
      setTerminalState(TERMINAL.BOOT);
    } else {
      setTerminalState(TERMINAL.ANALYZING);
    }
  }

  useEffect(() => {
    if (
      terminalState !== TERMINAL.ASKING
    ) return;
    async function ask() {
      try {
        const response = await askToTiago(question);
        setAnswer(response);
        setQuestion("");
        setTerminalState(TERMINAL.TYPING);
      } catch {
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
      setQuestion={setQuestion}
      onOpen={() => setOpened(true)}
      onAsk={handleAsk}
      setTerminalState={setTerminalState}
      setInitialized={setInitialized}
    />
  );
}