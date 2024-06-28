import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './navbar_sec.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function NavbarSec() {
    return (
        <div>
            <div id='div-principal'>
                <div id='div-sec'>
                    <Link id='link-to-home' to='/'>
                        <motion.img
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            src='./assets/imgs/logo.png' 
                            alt='logo react' 
                            id='logo'>
                        </motion.img>
                    </Link>
                    <motion.img
                        id='arrow'
                        src='./assets/imgs/arched-arrow.svg'>
                    </motion.img>
                    <p id='text-nav'>Click here <br></br> to return</p>
                </div>
            </div>
            <p id='text'>Explore my projects</p>
            <div id='div_projects'>
                    <a id='link_text' href='https://aula-python-asimov.streamlit.app/' target='blank'>Data Analysis - Python - 1</a>
                    <a id='link_text' href='https://indic-python-contabil.streamlit.app/' target='blank'>Data Analysis - Python - 2</a>
            </div>
        </div>
    );
}

export default NavbarSec;