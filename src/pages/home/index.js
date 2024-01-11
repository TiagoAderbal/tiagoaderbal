import Buttons from "../../components/buttons/buttons";
import Navbar from "../../components/navbar/navbar";
// import ButProj from "../../components/ButProj/ButProj";
import './index.css';

function Home() {
    return(
        <div className="App Home">
            <Navbar></Navbar>
            <Buttons></Buttons>
            {/* <ButProj></ButProj> */}
        </div>
    );
}

export default Home;