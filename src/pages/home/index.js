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
            Sou desenvolvedor fullstack com foco no ecossistema JavaScript/TypeScript.
            No front-end, trabalho com React, Next e Vue, além de dominar ferramentas de CSS (Bootstrap e Tailwind).
            No back-end tenho experiência com Node, Express, Nest, além de conhecimentos em Python e PHP. Tenho experiência com bancos relacionais (MySQL, PostgreSQL)
            e não relacionais (MongoDB), além de dominar Docker e Git. Meu objetivo é criar soluções completas,
            aplicando boas práticas e pensamento crítico para resolver problemas na raiz.
          </p>
        </div>
      </div>
      <ButProj></ButProj>
      <Stacks></Stacks>
    </motion.div>
  );
}

export default Home;
