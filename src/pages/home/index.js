import Buttons from "../../components/buttons/buttons";
import NavbarMain from "../../components/navbar_main/navbar_main";
import ButProj from "../../components/ButProj/ButProj";
import "./index.css";
import { motion } from "framer-motion";
import Stacks from "../../components/Stacks/Stacks";
import AskTiago from "../../components/AskTiago";

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
      <AskTiago></AskTiago>
      {/* <div className="container">
        <p className="pb-3 text-center fs-3">
          Turning ideas into digital reality. 💡
        </p>
        <div className="card p-4 pb-3" style={{ marginBottom: "4rem" }}>
          <p className="text-center fs-5">
            Desenvolvedor Fullstack focado na construção de experiências digitais escaláveis e na resolução de desafios complexos em ambientes de produção de alto tráfego.<br></br><br></br>

            Atualmente atuo no Estadão como parte de uma equipe responsável pelo desenvolvimento de novos produtos e interfaces, resolução de incidentes críticos e suporte a áreas estratégicas. Minha experiência abrange desenvolvimento frontend e backend utilizando React, Vue.js, Node.js, NestJS, JavaScript e TypeScript, além de integrações com APIs REST, Salesforce Personalization e Salesforce Marketing Cloud. Também trabalho com experiências de personalização, fluxos transacionais, campanhas promocionais, modais web e interfaces escaláveis com foco em performance, manutenibilidade e experiência do usuário.<br></br><br></br>

            Além da engenharia de software, estou constantemente expandindo meus conhecimentos em cibersegurança, com ênfase em engenharia social, fundamentos de resposta a incidentes, análise de redes e conscientização em segurança da informação.

          </p>
        </div>
      </div> */}
      <ButProj></ButProj>
      <Stacks></Stacks>
    </motion.div>
  );
}

export default Home;
