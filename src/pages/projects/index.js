import React from "react";
import ProjectList from "../../components/ProjectList/ProjectList";
import "./index.css";
import { motion } from "framer-motion";

function Projects() {
  return (
    <motion.div
      className="App Projects"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, ease: "linear" }}
    >
      <main className="content-page projects-page">
        <header className="page-intro">
          <span className="eyebrow">TRABALHOS SELECIONADOS</span>
          <h1>Projetos<span>.</span></h1>
          <p>Produtos, experimentos e soluções que já saíram do papel. Nem tudo ta aqui por questões de privacidade e confidencialidade.</p>
        </header>
        <ProjectList />
        <footer className="site-footer">© {new Date().getFullYear()} Tiago Aderbal</footer>
      </main>
    </motion.div>
  );
}

export default Projects;
