import React from "react";
import "./Stacks.css";

const Stacks = () => {
  return (
    <div className="container mb-5">
      <h2>My Stacks</h2>
      <div className="row d-flex justify-content-center">
        {/* Primeira linha */}
        <div className="col-3">
          <img
            src="./assets/imgs/stacks/html.png"
            alt="Lang 1"
            className="img-fluid"
            id="lang"
          />
        </div>
        <div className="col-3">
          <img
            src="./assets/imgs/stacks/css.png"
            alt="Lang 2"
            className="img-fluid"
            id="lang"
          />
        </div>
        <div className="col-3">
          <img
            src="./assets/imgs/stacks/js.png"
            alt="Lang 3"
            className="img-fluid"
            id="lang"
          />
        </div>
        <div className="col-3">
          <img
            src="./assets/imgs/stacks/star.png"
            alt="Lang 4"
            className="img-fluid"
            id="lang"
          />
        </div>

        {/* Segunda linha */}
        <div className="col-3">
          <img
            src="./assets/imgs/stacks/ts.png"
            alt="Lang 5"
            className="img-fluid"
            id="lang"
          />
        </div>
        <div className="col-3">
          <img
            src="./assets/imgs/stacks/vue.png"
            alt="Lang 7"
            className="img-fluid"
            id="lang"
          />
        </div>
        <div className="col-3">
          <img
            src="./assets/imgs/stacks/ironman.png"
            alt="Lang 6"
            className="img-fluid"
            id="lang"
          />
        </div>
        <div className="col-3">
          <img
            src="./assets/imgs/stacks/react.png"
            alt="Lang 8"
            className="img-fluid"
            id="lang"
          />
        </div>

        {/* Terceira linha */}
        <div className="col-3">
          <img
            src="./assets/imgs/stacks/bootstrap.png"
            alt="Lang 9"
            className="img-fluid"
            id="lang"
          />
        </div>
        <div className="col-3">
          <img
            src="./assets/imgs/stacks/avenger.png"
            alt="Lang 10"
            className="img-fluid"
            id="lang"
          />
        </div>
        <div className="col-3">
          <img
            src="./assets/imgs/stacks/php.png"
            alt="Lang 11"
            className="img-fluid"
            id="lang"
          />
        </div>
        <div className="col-3">
          <img
            src="./assets/imgs/stacks/python.png"
            alt="Lang 12"
            className="img-fluid"
            id="lang"
          />
        </div>

        {/* Quarta linha com um único elemento */}
        <div className="col-3 d-flex">
          <img
            src="./assets/imgs/stacks/coffee.png"
            alt="Lang 13"
            className="img-fluid"
            id="lang"
          />
          <img
            id="arrow"
            src="./assets/imgs/arched-arrow.svg"
            alt="arrow"
            className="me-2 mt-5"
          />
          <p
            id="text-nav"
            style={{ transform: "rotate(15deg)", marginTop: "4rem" }}
          >
            This is not Java
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stacks;
