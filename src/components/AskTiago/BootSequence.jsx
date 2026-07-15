import { useEffect, useState } from "react";
import loadingMessages from "../../data/LoadingMessages";
import { TERMINAL } from "./terminalStates";
import TypeWriter from "./TypeWriter";

export default function BootSequence({
  terminalState,
  setTerminalState,
  setInitialized,
}) {
  const [step, setStep] = useState(0);

  const [finished, setFinished] = useState([]);

  useEffect(() => {
    if (terminalState !== TERMINAL.BOOT) {
      setStep(0);

      setFinished([]);
    }
  }, [terminalState]);

  if (terminalState !== TERMINAL.BOOT) return null;

  function next() {
    setFinished((old) => [...old, step]);

    if (step === loadingMessages.length - 1) {
      setTimeout(() => {
        setInitialized(true);
        setTerminalState(TERMINAL.ASKING);
      }, 300);

      return;
    }

    setTimeout(() => {
      setStep((old) => old + 1);
    }, 250);
  }

  return (
    <div className="boot-sequence">
      {finished.map((index) => (
        <div key={index} className="boot-line">
          <span className="boot-command">
            {">"} {loadingMessages[index]}
          </span>

          <span className="boot-success">✓ OK</span>
        </div>
      ))}

      <div className="boot-line">
        <TypeWriter
          text={"> " + loadingMessages[step]}
          speed={10}
          onFinish={next}
        />
      </div>
    </div>
  );
}
