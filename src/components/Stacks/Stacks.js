import React, { useState } from "react";
import "./Stacks.css";

import { motion } from "framer-motion";

const Stacks = () => {
  const [showImgStar, setShowImgStar] = useState(false);
  const [showImgIron, setShowImgIron] = useState(false);
  const [showImgAssass, setShowImgAssass] = useState(false);
  const [showImgMandal, setShowImgMandal] = useState(false);
  const [showImgPool, setShowImgPool] = useState(false);
  const [showImgBlack, setShowImgBlack] = useState(false);
  const [showImgMeme, setShowImgMeme] = useState(false);

  return (
    <div className="container mb-5">
      <h2>My Stacks</h2>
      <h4 id="text-nav">PS.: passe o mouse sobre os ícones, e já aviso que no celular não funciona. se ficou curioso, usa o computador. valeu, tamo junto...</h4>
      <div className="row d-flex justify-content-center">
        {/* Primeira linha */}
        <div className="col-3">
          <motion.img
            src={showImgMeme ? "./assets/imgs/stacks/x-men.png" : "./assets/imgs/stacks/html.png"}
            alt="Lang 1"
            className="img-fluid"
            id="lang"
            whileHover={{ scale: 1.2, rotate: -3 }}
            transition={{ duration: 0.2 }}
            onHoverStart={() => setShowImgMeme(true)}
            onHoverEnd={() => setShowImgMeme(false)}
          />
        </div>
        <div className="col-3">
          <motion.img
            src={
              showImgMandal
                ? "./assets/imgs/stacks/mandalor.png"
                : "./assets/imgs/stacks/css.png"
            }
            alt="Lang 2"
            className="img-fluid"
            id="lang"
            whileHover={{ scale: 1.2, rotate: -3 }}
            transition={{ duration: 0.2 }}
            onHoverStart={() => setShowImgMandal(true)}
            onHoverEnd={() => setShowImgMandal(false)}
          />
        </div>
        <div className="col-3">
          <motion.img
            src="./assets/imgs/stacks/js.png"
            alt="Lang 3"
            className="img-fluid"
            id="lang"
            whileHover={{ scale: 1.2, rotate: -3 }}
            transition={{ duration: 0.2 }}
          />
        </div>
        <div className="col-3">
          <motion.img
            src={
              showImgStar
                ? "./assets/imgs/stacks/star.png"
                : "./assets/imgs/stacks/github.png"
            }
            alt="Lang 4"
            className="img-fluid"
            id="lang"
            whileHover={{ scale: 1.2, rotate: -3 }}
            transition={{ duration: 0.2 }}
            onHoverStart={() => setShowImgStar(true)}
            onHoverEnd={() => setShowImgStar(false)}
          />
        </div>

        {/* Segunda linha */}
        <div className="col-3">
          <motion.img
            src="./assets/imgs/stacks/ts.png"
            alt="Lang 5"
            className="img-fluid"
            id="lang"
            whileHover={{ scale: 1.2, rotate: -3 }}
            transition={{ duration: 0.2 }}
          />
        </div>
        <div className="col-3">
          <motion.img
            src={
              showImgIron
                ? "./assets/imgs/stacks/ironman.png"
                : "./assets/imgs/stacks/git.png"
            }
            alt="Lang 7"
            className="img-fluid"
            id="lang"
            whileHover={{ scale: 1.2, rotate: -3 }}
            transition={{ duration: 0.2 }}
            onHoverStart={() => setShowImgIron(true)}
            onHoverEnd={() => setShowImgIron(false)}
          />
        </div>
        <div className="col-3">
          <motion.img
            src="./assets/imgs/stacks/vue.png"
            alt="Lang 6"
            className="img-fluid"
            id="lang"
            whileHover={{ scale: 1.2, rotate: -3 }}
            transition={{ duration: 0.2 }}
          />
        </div>
        <div className="col-3">
          <motion.img
            src={
              showImgAssass
                ? "./assets/imgs/stacks/assassins.png"
                : "./assets/imgs/stacks/react.png"
            }
            alt="Lang 8"
            className="img-fluid"
            id="lang"
            whileHover={{ scale: 1.2, rotate: -3 }}
            transition={{ duration: 0.2 }}
            onHoverStart={() => setShowImgAssass(true)}
            onHoverEnd={() => setShowImgAssass(false)}
          />
        </div>

        {/* Terceira linha */}
        <div className="col-3">
          <motion.img
            src="./assets/imgs/stacks/bootstrap.png"
            alt="Lang 9"
            className="img-fluid"
            id="lang"
            whileHover={{ scale: 1.2, rotate: -3 }}
            transition={{ duration: 0.2 }}
          />
        </div>
        <div className="col-3">
          <motion.img
            src="./assets/imgs/stacks/postman.png"
            alt="Lang 10"
            className="img-fluid"
            id="lang"
            whileHover={{ scale: 1.2, rotate: -3 }}
            transition={{ duration: 0.2 }}
          />
        </div>
        <div className="col-3">
          <motion.img
            src="./assets/imgs/stacks/php1.png"
            alt="Lang 11"
            className="img-fluid"
            id="lang"
            whileHover={{ scale: 1.2, rotate: -3 }}
            transition={{ duration: 0.2 }}
          />
        </div>
        <div className="col-3">
          <motion.img
            src={
              showImgPool
                ? "./assets/imgs/stacks/deadpool.png"
                : "./assets/imgs/stacks/python.png"
            }
            alt="Lang 12"
            className="img-fluid"
            id="lang"
            whileHover={{ scale: 1.2, rotate: -3 }}
            transition={{ duration: 0.2 }}
            onHoverStart={() => setShowImgPool(true)}
            onHoverEnd={() => setShowImgPool(false)}
          />
        </div>

        {/* Quarta linha */}

        {/* Quinta linha com dois elementos */}
        <div className="col-4">
          <motion.img
            src={
              showImgBlack
                ? "./assets/imgs/stacks/black.png"
                : "./assets/imgs/stacks/docker.png"
            }
            alt="Lang 12"
            className="img-fluid"
            id="lang"
            whileHover={{ scale: 1.2, rotate: -3 }}
            transition={{ duration: 0.2 }}
            onHoverStart={() => setShowImgBlack(true)}
            onHoverEnd={() => setShowImgBlack(false)}
          />
        </div>
        <div className="col-4 d-flex justify-content-center">
          <motion.img
            src="./assets/imgs/stacks/coffee.png"
            alt="Lang 13"
            className="img-fluid"
            id="lang"
            whileHover={{ scale: 1.2, rotate: -3 }}
            transition={{ duration: 0.2 }}
          />
          <p
            id="text-nav"
            className="pb-0 mb-0"
            style={{ transform: "rotate(12deg)", marginTop: "5rem" }}
          >
            Cafézim
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stacks;
