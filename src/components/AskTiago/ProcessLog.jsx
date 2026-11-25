import { useEffect, useState } from "react";
import ScrambleText from "./ScrambleText";
import { TERMINAL } from "./terminalStates";
import {
  BOOT_SEQUENCE,
  ANALYZE_SEQUENCE,
  PENDING_LINE,
} from "../../data/LoadingMessages";

const LINE_MS = {
  [TERMINAL.BOOT]: 380,
  [TERMINAL.ANALYZING]: 320,
};

function LogLine({ line, active }) {
  const classes = [
    "log-line",
    active ? "is-active" : "is-done",
    line.tone ? `log-line--${line.tone}` : "",
  ].join(" ");

  return (
    <li className={classes}>
      <span className="log-caret" aria-hidden="true">›</span>
      <span className="log-text">
        <ScrambleText text={line.text} />
      </span>
      <span className="log-leader" aria-hidden="true" />
      <span className="log-status">
        {active ? <span className="log-spinner" aria-hidden="true" /> : line.status}
      </span>
    </li>
  );
}

// Log de processo exibido entre a pergunta e a resposta.
// BOOT (1ª pergunta) e ANALYZING (demais) mostram suas linhas uma a uma;
// em ASKING o log continua visível com uma linha pendente até a resposta chegar.
export default function ProcessLog({ terminalState, setTerminalState, setInitialized }) {
  const [script, setScript] = useState(null);
  const [done, setDone] = useState(0);

  const running =
    terminalState === TERMINAL.BOOT || terminalState === TERMINAL.ANALYZING;
  const waiting = terminalState === TERMINAL.ASKING;

  useEffect(() => {
    if (terminalState === TERMINAL.BOOT) {
      setScript({ mode: TERMINAL.BOOT, lines: BOOT_SEQUENCE });
      setDone(0);
    } else if (terminalState === TERMINAL.ANALYZING) {
      setScript({ mode: TERMINAL.ANALYZING, lines: ANALYZE_SEQUENCE });
      setDone(0);
    } else if (terminalState !== TERMINAL.ASKING) {
      setScript(null);
      setDone(0);
    }
  }, [terminalState]);

  useEffect(() => {
    if (!running || !script || script.mode !== terminalState) return;

    if (done >= script.lines.length) {
      const timer = setTimeout(() => {
        if (terminalState === TERMINAL.BOOT) setInitialized(true);
        setTerminalState(TERMINAL.ASKING);
      }, 160);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => setDone((value) => value + 1), LINE_MS[terminalState]);
    return () => clearTimeout(timer);
  }, [running, script, done, terminalState, setTerminalState, setInitialized]);

  if (!script || !(running || waiting)) return null;

  const total = script.lines.length;
  const completed = Math.min(done, total);
  const visible = script.lines.slice(0, Math.min(done + 1, total));
  const progress = Math.round((completed / total) * 100);

  return (
    <div className="process-log" role="status" aria-live="polite">
      <div className="process-log-header">
        <span>atlas.exe</span>
        <span className="process-log-tag">
          {script.mode === TERMINAL.BOOT ? "infiltração" : "consulta"}
        </span>
        <span className="process-log-count">
          {completed}/{total}
        </span>
      </div>

      <ol className="process-log-lines">
        {visible.map((line, index) => (
          <LogLine key={line.text} line={line} active={running && index === done} />
        ))}
        {waiting && <LogLine line={PENDING_LINE} active />}
      </ol>

      <div className={`process-log-bar ${waiting ? "is-waiting" : ""}`}>
        <span style={waiting ? undefined : { width: `${progress}%` }} />
      </div>
    </div>
  );
}
