import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './navbar.css';
import { motion } from 'framer-motion';

function Navbar() {
    return (
        <div>
            <motion.img
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                src='./assets/imgs/logo.png' alt='logo react'>
            </motion.img><br></br><br></br>
            <p>Hello World</p>
        </div>
    );
}

export default Navbar;