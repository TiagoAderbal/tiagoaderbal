import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './navbar_main.css';
import { motion } from 'framer-motion';
import TypingHello from '../typing/typingHello';

function NavbarMain() {
    return (
        <div>
            <motion.img
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                src='./assets/imgs/logo.png' alt='logo react'>
            </motion.img><br></br><br></br>
            {/* <p id='text-nav-main'>Hello World</p> */}
            <TypingHello></TypingHello>
        </div>
    );
}

export default NavbarMain;