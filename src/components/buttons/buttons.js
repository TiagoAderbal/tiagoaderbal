import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './buttons.css';

function Buttons() {
    return (
        <div>
            <a className='whats' href='https://wa.me/5514998761501?text=Ol%C3%A1%2C+gostaria+de+ter+um+site.+' target='blank'><i class="bi bi-whatsapp"></i></a>
            <a className='link' href='https://www.linkedin.com/in/tiago-aderbal-francisco-b0a67217b' target='blank'><i class="bi bi-linkedin"></i></a>
            <a className='gith' href='https://github.com/TiagoAderbal' target='blank'><i class="bi bi-github"></i></a>
            <a className='insta' href='https://www.instagram.com/tiago.aderbal?igsh=ZGNjOWZkYTE3MQ==' target='blank'><i class="bi bi-instagram"></i></a>
        </div>
    );
}

export default Buttons;