import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./ButProj.css";
import { Link } from "react-router-dom";

function ButProj() {
  return (
    <div className="container pe-5 ps-5">
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ marginBottom: "5rem" }}
      >
        <Link className="button_projects" to="/projects">
          MEUS PROJETOS
        </Link>
        <img
          id="arrow"
          src="./assets/imgs/arched-arrow.svg"
          alt="arrow"
          className="mt-4"
        />
        <p
          id="text-nav"
          style={{ transform: "rotate(15deg)" }}
          className="mt-2"
        >
          Clique aqui
        </p>
      </div>
    </div>
  );
}

export default ButProj;
