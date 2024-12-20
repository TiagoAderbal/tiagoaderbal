import Buttons from "../../components/buttons/buttons";
import NavbarMain from "../../components/navbar_main/navbar_main";
import ButProj from "../../components/ButProj/ButProj";
import "./index.css";
import { motion } from "framer-motion";
import Stacks from "../../components/Stacks/Stacks";

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
      <Buttons></Buttons>
      <div className="container">
        <p className="pb-3 text-center fs-3">
          Turning ideas into digital reality. 💡
        </p>
        <div className="card p-4 pb-3" style={{ marginBottom: "4rem" }}>
          <p className="text-center fs-5">
            Trabalho com desenvolvimento de softwares criando sites, landing
            pages e aplicativos usando Vue, React, React Native, HTML5, CSS3,
            JavaScript, TypeScript e Bootstrap. De vez em quando me aventuro no
            back usando PHP, NodeJS, Python e MySQL. Tenho experiência com manipulação de
            JSON, consumo de APIs REST e uso de protocolos HTTP.
          </p>
        </div>
      </div>
      <ButProj></ButProj>
      <Stacks></Stacks>
    </motion.div>
  );
}

export default Home;
