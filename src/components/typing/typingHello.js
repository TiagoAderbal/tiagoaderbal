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
        multiText={["dev fullstack", "dev nerd", "dev javascript", "dev React", "dev marvel", "dev IA", "dev star wars", "dev node", "dev typescript", "dev php"]}
        multiTextLoop={true}
        multiTextDelay={1700}
        typeSpeed={50}
      />
    </div>
  );
}

export default TypingHello;
