import Buttons from "../../components/buttons/buttons";
import NavbarMain from "../../components/navbar_main/navbar_main";
import ButProj from "../../components/ButProj/ButProj";
import "./index.css";
import { motion } from "framer-motion";

function Home() {
  return (
    <motion.div
      className="App Home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: 0.5,
        ease: "linear",
      }}
    >
      <NavbarMain></NavbarMain>
      <div className="container">
        <p className="pb-3 text-center fs-3">
          Turning ideas into digital reality. 💡
        </p>
        <div className="card p-4" style={{ marginBottom: "4rem" }}>
          <p className="text-center fs-5">
            I work in web development, creating websites, landing pages, and
            applications using Vue, React, React Native, HTML5, CSS3,
            JavaScript, TypeScript, and Bootstrap. Occasionally, I venture into
            backend development with PHP, Python, and MySQL. I have experience
            in JSON manipulation, consuming REST APIs, and using HTTP protocols.
          </p>
        </div>
      </div>
      <Buttons></Buttons>
      <ButProj></ButProj>
    </motion.div>
  );
}

export default Home;
