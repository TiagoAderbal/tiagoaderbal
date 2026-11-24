import { useState } from "react";
import { motion } from "framer-motion";
import projects from "../../data/projects.json";
import "../blog/index.css";
import "./index.css";

export default function Projects() {
  const [category, setCategory] = useState("Todos");
  const categories = ["Todos", ...new Set(projects.map((project) => project.category))];
  const visibleProjects = projects.filter((project) => category === "Todos" || project.category === category);

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

        <section className="blog-tools" aria-label="Filtrar projetos">
          <div className="category-filters" aria-label="Filtrar por categoria">
            {categories.map((item) => (
              <button key={item} className={category === item ? "selected" : ""} onClick={() => setCategory(item)} type="button">{item}</button>
            ))}
          </div>
        </section>

        <section className="article-grid" aria-label="Projetos">
          {visibleProjects.map((project) => (
            <article className="article-card project-card" key={project.name}>
              <img className="article-cover project-cover" src={project.image} alt="" />
              <div className="article-card-content">
                <div className="article-meta"><span>{project.category}</span></div>
                <h2>{project.name}</h2>
                <p>{project.description}</p>
                <div className="project-stack">
                  {project.stack.map((tech) => <span key={tech}>{tech}</span>)}
                </div>
                <div className="project-links">
                  {project.url && <a href={project.url} target="_blank" rel="noreferrer">Ver projeto <span aria-hidden="true">↗</span></a>}
                  {project.github && <a href={project.github} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>}
                </div>
              </div>
            </article>
          ))}
        </section>

        <footer className="site-footer">© {new Date().getFullYear()} Tiago Aderbal</footer>
      </main>
    </motion.div>
  );
}
