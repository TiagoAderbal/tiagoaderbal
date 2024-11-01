import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './ButProj.css';
import { Link } from 'react-router-dom';

function ButProj() {
    return(
        <div>
            <Link className='button_projects' to='/projects'>MY PROJECTS</Link>
        </div>
    );
}

export default ButProj;