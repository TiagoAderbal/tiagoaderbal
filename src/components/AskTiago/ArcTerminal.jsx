import ArcReactor from "./ArcReactor";
import StatusBar from "./StatusBar";
import ProcessLog from "./ProcessLog";
import TerminalInput from "./TerminalInput";
import TerminalOutput from "./TerminalOutput";
import InfectionBorder from "./InfectionBorder";
import CircuitInfection from "./CircuitInfection";
import { useEffect, useRef } from "react";
import { useInfectionSurge } from "../../services/hooks/useInfectionSurge";
import { TERMINAL } from "./terminalStates";

export default function ArcTerminal(props) {
  const infected = useInfectionSurge();
  const frameRef = useRef(null);

  // O surto também "contamina" a seção da página onde o terminal está.
  useEffect(() => {
    const host = frameRef.current?.parentElement?.closest("section");
    if (!host) return undefined;
    host.classList.toggle("atlas-surge", infected);
    return () => host.classList.remove("atlas-surge");
  }, [infected]);

  return (
    <div ref={frameRef} className={`terminal-frame ${infected ? "is-surging" : ""}`}>
      <CircuitInfection />
      <InfectionBorder />

      <section className={`jarvis-terminal ${props.opened ? "opened" : ""}`}>
        <ArcReactor
          terminalState={props.terminalState}
          opened={props.opened}
          onClick={props.onOpen}
          infected={infected}
        />

        <StatusBar terminalState={props.terminalState} infected={infected} />

        {props.opened && (
          <>
            <TerminalInput
              value={props.question}
              onChange={(e) => props.setQuestion(e.target.value)}
              onAsk={props.onAsk}
              disabled={
                props.terminalState === TERMINAL.BOOT ||
                props.terminalState === TERMINAL.ASKING ||
                props.terminalState === TERMINAL.ANALYZING ||
                props.terminalState === TERMINAL.TYPING
              }
            />

            <ProcessLog
              terminalState={props.terminalState}
              setTerminalState={props.setTerminalState}
              setInitialized={props.setInitialized}
            />

            <TerminalOutput
              terminalState={props.terminalState}
              answer={props.answer}
              errorType={props.errorType}
              setTerminalState={props.setTerminalState}
              infected={infected}
            />
          </>
        )}
      </section>
    </div>
  );
}
