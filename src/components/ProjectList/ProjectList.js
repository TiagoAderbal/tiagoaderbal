import React, { useEffect, useState } from "react";
import projectsData from "../../data/projects.json";
import "./ProjectList.css";

import { motion } from "framer-motion";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleDemoClick = (event, url) => {
    if (!url) {
      event.preventDefault(); // Impede o recarregamento da página
    }
  };

  useEffect(() => {
    setProjects(projectsData);

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
    }, 3000); // Alterna a imagem a cada 5 segundos

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar
  }, []);

  return (
    <div className="container pt-5">
      <div className="row d-flex justify-content-around">
        {projects.map((project, index) => {
          const imageToShow =
            project.images[currentImageIndex % project.images.length];

          return (
            <div key={index} className="col-md-4 mb-5">
              <div className="card h-100">
                <div className="card-body">
                  {project.images.length > 0 && (
                    <a
                      href={project.url}
                      onClick={(event) => handleDemoClick(event, project.url)}
                      target={project.url ? "_blank" : undefined}
                      rel="noopener noreferrer"
                    >
                      <motion.img
                        src={imageToShow}
                        className="card-img-top mt-0 pt-0 pb-4"
                        alt={`${project.name} screenshot`}
                        whileHover={{ scale: 1.07 }}
                        transition={{ duration: 0.2 }}
                        style={{ zIndex: 1000 }}
                      />
                    </a>
                  )}
                  <a
                    href={project.github}
                    className="btn btn-secondary m-2 mb-3"
                    onClick={(event) => handleDemoClick(event, project.github)}
                    target={project.github ? "_blank" : undefined}
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                  <p className="card-text fs-5 pt-2">{project.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectList;
