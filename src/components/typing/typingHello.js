import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./typing-hello.css";
import TyperWriterEffect from "react-typewriter-effect";

function TypingHello() {
  return (
    <div className="typing-line">
      <span className="typing-prefix">I'm Tiago Aderbal &&</span>
      <TyperWriterEffect
        id="typer"
        startDelay={400}
        cursorColor="black"
        multiText={[
          "fullstack dev",
          "node & react dev",
          "vibe coder",
          "ops... AI engineer",
          "Ctrl+Z enthusiast",
          "problem solver",
          "caffeinated nerd",
        ]}
        multiTextLoop={true}
        multiTextDelay={1700}
        typeSpeed={50}
      />
    </div>
  );
}

export default TypingHello;
