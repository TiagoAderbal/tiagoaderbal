import Buttons from "../../components/buttons/buttons";
import NavbarMain from "../../components/navbar_main/navbar_main";
import ButProj from "../../components/ButProj/ButProj";
import './index.css';
import { motion } from "framer-motion";

function Home() {
    return (
        <motion.div
            className="App Home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                delay: 0.5,
                ease: "linear"
            }}
        >
            <NavbarMain></NavbarMain>
            <Buttons></Buttons>
            <ButProj></ButProj>
        </motion.div>
    );
}

export default Home;