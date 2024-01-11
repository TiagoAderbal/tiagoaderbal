import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Projects from "./pages/projects";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home /> }></Route>
                <Route path="/projects" element={ <Projects></Projects> }></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;