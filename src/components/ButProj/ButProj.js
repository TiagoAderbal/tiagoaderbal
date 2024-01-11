import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './ButProj.css';
import { Link } from 'react-router-dom';

function ButProj() {
    return(
        <div>
            <Link to='/projects'>Click</Link>
        </div>
    );
}

export default ButProj;