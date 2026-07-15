import ArcReactor from "./ArcReactor";
import StatusBar from "./StatusBar";
import BootSequence from "./BootSequence";
import TerminalInput from "./TerminalInput";
import TerminalOutput from "./TerminalOutput";
import AnalyzeSequence from "./AnalyzeSequence";
import CircuitOverlay from "./CircuitOverlay";
import { useInfectionSurge } from "../../services/hooks/useInfectionSurge";
import { TERMINAL } from "./terminalStates";

export default function ArcTerminal(props) {
  const infected = useInfectionSurge();

  return (
    <div className="terminal-frame">
      <CircuitOverlay infected={infected} />

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
            <BootSequence
              terminalState={props.terminalState}
              setTerminalState={props.setTerminalState}
              setInitialized={props.setInitialized}
            />

            <AnalyzeSequence
              terminalState={props.terminalState}
              setTerminalState={props.setTerminalState}
            />

            <TerminalInput
              value={props.question}
              onChange={(e) => props.setQuestion(e.target.value)}
              onAsk={props.onAsk}
              disabled={
                props.terminalState === TERMINAL.ASKING ||
                props.terminalState === TERMINAL.ANALYZING ||
                props.terminalState === TERMINAL.TYPING
              }
            />

            <TerminalOutput
              terminalState={props.terminalState}
              answer={props.answer}
              setTerminalState={props.setTerminalState}
              infected={infected}
            />
          </>
        )}
      </section>
    </div>
  );
}
