import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./ButProj.css";
import { Link } from "react-router-dom";

function ButProj() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ marginBottom: "5rem" }}>
      <Link className="button_projects me-2" to="/projects">
        MEUS PROJETOS
      </Link>
      <img
        id="arrow"
        src="./assets/imgs/arched-arrow.svg"
        alt="arrow"
        className="me-2 mt-4"
      />
      <p id="text-nav" style={{ transform: "rotate(15deg)" }} className="mt-2">
        Clique aqui
      </p>
    </div>
  );
}

export default ButProj;
