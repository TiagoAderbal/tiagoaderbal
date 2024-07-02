import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './typing-hello.css';
import TyperWriterEffect from 'react-typewriter-effect';

function TypingHello() {
    
    return (
        <TyperWriterEffect
            id="typer"
            startDelay={400}
            cursorColor="black"
            text="&lt;Hello World/&gt;"
            typeSpeed={100}
        />
    );
}

export default TypingHello;