import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Projects from "./pages/projects";
import Blog from "./pages/blog";
import Article from "./pages/blog/article";
import Contact from "./pages/contact";
import Navbar from "./components/navbar";
import RouteSeo from "./components/RouteSeo";

function AppRoutes() {
  const [theme, setTheme] = useState(() => localStorage.getItem("portfolio-theme") || "light");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <RouteSeo />
      <Navbar theme={theme} onToggleTheme={() => setTheme((current) => current === "light" ? "dark" : "light")} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Article />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
