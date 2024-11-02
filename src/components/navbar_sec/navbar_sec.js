import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./navbar_sec.css";
import { Link } from "react-router-dom";

function NavbarSec() {
  return (
    <div>
      <div id="div-principal">
        <div id="div-sec">
          <Link id="link-to-home" to="/">
            <p id="text-nav">
              Click here <br></br> to return
            </p>
          </Link>
        </div>
      </div>
      <p id="text" className="pt-3">
        Explore my projects
      </p>
    </div>
  );
}

export default NavbarSec;
