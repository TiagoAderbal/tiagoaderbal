import NavbarSec from "../../components/navbar_sec/navbar_sec";
import './index.css';
import { motion } from "framer-motion";

function Projects() {
    return(
        <motion.div 
            className="App Projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                delay: 0.2,
                ease: "linear"
            }}>

            <NavbarSec></NavbarSec>
        </motion.div>
    );
}

export default Projects;