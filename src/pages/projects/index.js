import React, { useEffect, useState } from "react";
import NavbarSec from "../../components/navbar_sec/navbar_sec";
import ProjectList from "../../components/ProjectList/ProjectList";
import "./index.css";
import { motion } from "framer-motion";

function Projects() {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setShowImage(true);
      } else {
        setShowImage(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.div
      className="App Projects"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, ease: "linear" }}
    >
      <NavbarSec />
      <ProjectList />
      {showImage && (
        <img src="./assets/imgs/droid.png" alt="droid" id="fixed-bottom" />
      )}
    </motion.div>
  );
}

export default Projects;
