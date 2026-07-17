import { useEffect, useState } from "react";
import { TERMINAL } from "./terminalStates";
import "./index.css";
import ArcTerminal from "./ArcTerminal";
import { askToTiago } from "../../services/ai";

const DEMO_COMMANDS = {
  "!ratelimit": "RATE_LIMIT",
  "!error": "SERVER_ERROR",
  "!timeout": "TIMEOUT",
};

const PAYWALL_AT_QUESTION = 3;

export default function AskTiago() {
  const [opened, setOpened] = useState(false);
  const [terminalState, setTerminalState] = useState(TERMINAL.IDLE);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [errorType, setErrorType] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [paywallDismissed, setPaywallDismissed] = useState(false);

  const freeQuestionsLeft = Math.max(0, PAYWALL_AT_QUESTION - questionCount);
  const showPaywall = questionCount === PAYWALL_AT_QUESTION;
  const isPaywalled = showPaywall && !paywallDismissed && terminalState !== TERMINAL.TYPING;

  async function handleAsk() {
    if (!question.trim()) return;
    setAnswer("");
    setErrorType(null);
    setPaywallDismissed(false); // nova pergunta reseta o "fechei o aviso"

    const demoType = DEMO_COMMANDS[question.trim().toLowerCase()];
    if (demoType) {
      setQuestion("");
      setErrorType(demoType);
      setTerminalState(TERMINAL.ERROR);
      return;
    }

    setQuestionCount((count) => count + 1);

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
      isPaywalled={isPaywalled}
      onDismissPaywall={() => setPaywallDismissed(true)}
      freeQuestionsLeft={freeQuestionsLeft}
      setQuestion={setQuestion}
      onOpen={() => setOpened(true)}
      onAsk={handleAsk}
      setTerminalState={setTerminalState}
      setInitialized={setInitialized}
    />
  );
}