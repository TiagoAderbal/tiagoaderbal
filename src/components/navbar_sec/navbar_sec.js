import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./navbar_sec.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProjectList from "../ProjectList/ProjectList";

function NavbarSec() {
  return (
    <div>
      <div id="div-principal">
        <div id="div-sec">
          <Link id="link-to-home" to="/">
            <motion.img
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              src="./assets/imgs/logo.png"
              alt="logo react"
              id="logo"
            ></motion.img>
          </Link>
          <motion.img
            id="arrow"
            src="./assets/imgs/arched-arrow.svg"
          ></motion.img>
          <p id="text-nav">
            Click here <br></br> to return
          </p>
        </div>
      </div>
      <p id="text" className="pt-3">
        Explore my projects
      </p>
      <ProjectList></ProjectList>
    </div>
  );
}

export default NavbarSec;
