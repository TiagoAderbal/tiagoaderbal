import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./navbar_main.css";
import { motion } from "framer-motion";
import TypingHello from "../typing/typingHello";

function NavbarMain() {
  const [showHumor, setShowHumor] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setShowHumor(true);
      } else {
        setShowHumor(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <div>
      
      {showHumor && (
        <img
          id="humor"
          src="./assets/imgs/humor.png"
          alt="humor"
          style={{
            transform: "rotate(-15deg)",
          }}
        ></img>
      )}
      <motion.img
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        src="./assets/imgs/profile.jpg"
        alt="logo react"
        id="profile"
      ></motion.img>
      <br></br>
      <br></br>
      <TypingHello></TypingHello>
    </div>
  );
}

export default NavbarMain;
