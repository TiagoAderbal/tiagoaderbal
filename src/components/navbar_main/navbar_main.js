import React from "react";
import "./navbar_main.css";
import { motion } from "framer-motion";
import TypingHello from "../typing/typingHello";

function NavbarMain() {
  return (
    <div className="profile-heading">
      <motion.img
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        src="/assets/imgs/profile.jpg"
        alt="Retrato de Tiago Aderbal"
        id="profile"
      ></motion.img>
      <TypingHello />
    </div>
  );
}

export default NavbarMain;
