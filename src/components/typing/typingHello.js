import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./typing-hello.css";
import TyperWriterEffect from "react-typewriter-effect";

function TypingHello() {
  return (
    <div>
      <TyperWriterEffect
        id="typer"
        startDelay={400}
        cursorColor="black"
        text="Olá, sou Tiago Aderbal && dev frontend!"
        typeSpeed={50}
      />
    </div>
  );
}

export default TypingHello;
