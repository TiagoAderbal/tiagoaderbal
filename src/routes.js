import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Projects from "./pages/projects";
import Blog from "./pages/blog";
import Article from "./pages/blog/article";
import Contact from "./pages/contact";
import NotFound from "./pages/notfound";
import Navbar from "./components/navbar";
import RouteSeo from "./components/RouteSeo";
import EasterEggs from "./components/EasterEggs";

const THEME_KEY = "portfolio-theme";

// Com o armazenamento bloqueado (modo privado, cookies desativados), o acesso lança
// erro; sem o try/catch o React quebraria e a página ficaria em branco.
function readStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY) || "light";
  } catch {
    return "light";
  }
}

function storeTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Sem armazenamento o tema só não é lembrado na próxima visita.
  }
}

function AppRoutes() {
  const [theme, setTheme] = useState(readStoredTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    storeTheme(theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <RouteSeo />
      <EasterEggs />
      <Navbar theme={theme} onToggleTheme={() => setTheme((current) => current === "light" ? "dark" : "light")} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Article />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
