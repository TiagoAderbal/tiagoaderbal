import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import CoinDrop from "../CoinDrop";
import "./index.css";

const CREST_VISIBLE_MS = 2000;
const CREST_HIDDEN_MS = 10000;

function ThemeIcon({ theme }) {
  const image = theme === "light" ? "/assets/imgs/darth-vader.webp" : "/assets/imgs/yoda.webp";
  const className = theme === "light" ? "theme-character-icon vader-icon" : "theme-character-icon yoda-icon";

  return <img className={className} src={image} alt="" aria-hidden="true" />;
}

function useCrestCycle() {
  const [showCrest, setShowCrest] = useState(true);

  useEffect(() => {
    let timer;
    const show = () => {
      setShowCrest(true);
      timer = setTimeout(() => {
        setShowCrest(false);
        timer = setTimeout(show, CREST_HIDDEN_MS);
      }, CREST_VISIBLE_MS);
    };

    show();
    return () => clearTimeout(timer);
  }, []);

  return showCrest;
}

export default function Navbar({ theme = "light", onToggleTheme = () => {} }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const showCrest = useCrestCycle();

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Navegação principal">
        <Link className="nav-brand" to="/" onClick={closeMenu}>
          Tiago<span>.</span>
        </Link>
        <button
          className="nav-toggle"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
        <div className="nav-actions">
          <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
            <NavLink end to="/" onClick={closeMenu}>Home</NavLink>
            <NavLink to="/about" onClick={closeMenu} className="nav-infected" aria-label="Sobre mim">
              <span className="nav-glitch" data-text="Sobre mim">Sobre mim</span>
            </NavLink>
            <NavLink to="/projects" onClick={closeMenu}>Projetos</NavLink>
            <NavLink to="/blog" onClick={closeMenu}>Blog</NavLink>
            <NavLink to="/contact" onClick={closeMenu}>Contato</NavLink>
          </div>
          <div className="theme-toggle-wrap">
            <button
              className="theme-toggle"
              type="button"
              onClick={onToggleTheme}
              aria-pressed={theme === "dark"}
              aria-label={theme === "light" ? "Ativar tema escuro" : "Ativar tema claro"}
            >
              <ThemeIcon theme={theme} />
              <span className={`theme-crest ${showCrest ? "is-shown" : ""}`} aria-hidden="true">
                <img src="/assets/imgs/stacks/palmeiras.webp" alt="" />
              </span>
              <span className="theme-tooltip" aria-hidden="true">{theme === "light" ? "Dark side" : "Light side"}</span>
            </button>
            <CoinDrop active={isHome} suppressed={menuOpen} />
          </div>
        </div>
      </nav>
    </header>
  );
}
