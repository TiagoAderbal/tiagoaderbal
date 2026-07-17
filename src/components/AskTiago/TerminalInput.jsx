import { useState, useRef } from "react";

const MAX_LENGTH = 50;
const COOLDOWN_MS = 3000;

export default function TerminalInput({
  value,
  onChange,
  onAsk,
  disabled = false,
  freeQuestionsLeft,
}) {
  const [error, setError] = useState(null);
  const lastSubmitRef = useRef(0);

  const trimmedValue = value.trim();
  const isEmpty = trimmedValue.length === 0;
  const isTooLong = value.length > MAX_LENGTH;

  function handleSubmit() {
    if (disabled) return;

    if (isEmpty) {
      setError("Digite uma pergunta antes de enviar.");
      return;
    }

    if (isTooLong) {
      setError(`Sua pergunta passou de ${MAX_LENGTH} caracteres.`);
      return;
    }

    const now = Date.now();
    if (now - lastSubmitRef.current < COOLDOWN_MS) {
      setError("Calma aí, uma pergunta de cada vez 🙂");
      return;
    }

    lastSubmitRef.current = now;
    setError(null);
    onAsk();
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  }

  function handleChange(e) {
    if (error) setError(null);
    onChange(e);
  }

  return (
    <div className="terminal-input-wrapper">
      <div className="terminal-input">
        <input
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about Tiago..."
          maxLength={MAX_LENGTH}
          disabled={disabled}
          aria-label="Pergunta para o ATLAS"
        />

        <button
          onClick={handleSubmit}
          disabled={disabled || isEmpty}
          aria-label="Enviar pergunta"
        >
          ◎
        </button>
      </div>

      {error && <p className="terminal-input-error">{error}</p>}
    </div>
  );
}