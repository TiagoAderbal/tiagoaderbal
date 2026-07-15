import { useEffect, useState } from "react";
import TypeWriter from "./TypeWriter";
import { TERMINAL } from "./terminalStates";

const messages = [
  "Analyzing request...",
  "Searching memory...",
  "Reading GitHub...",
  "Compiling response...",
];

export default function AnalyzeSequence({
  terminalState,

  setTerminalState,
}) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (terminalState !== TERMINAL.ANALYZING) {
      setStep(0);
    }
  }, [terminalState]);

  if (terminalState !== TERMINAL.ANALYZING) return null;

  function next() {
    if (step === messages.length - 1) {
      setTerminalState(TERMINAL.ASKING);

      return;
    }

    setTimeout(() => {
      setStep((old) => old + 1);
    }, 200);
  }

  return (
    <div className="boot-sequence">
      <TypeWriter text={"> " + messages[step]} speed={12} onFinish={next} />
    </div>
  );
}
