import Buttons from "../../components/buttons/buttons";
import Navbar from "../../components/navbar/navbar";
// import ButProj from "../../components/ButProj/ButProj";
import './index.css';
import { motion } from "framer-motion";

function Home() {
    return (
        <motion.div
            className="App Home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <Navbar></Navbar>
            <Buttons></Buttons>
            {/* <ButProj></ButProj> */}
        </motion.div>
    );
}

export default Home;