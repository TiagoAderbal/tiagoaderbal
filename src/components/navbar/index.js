import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./index.css";

function ThemeIcon({ theme }) {
  const image = theme === "light" ? "/assets/imgs/darth-vader.png" : "/assets/imgs/yoda.png";
  const className = theme === "light" ? "theme-character-icon vader-icon" : "theme-character-icon yoda-icon";

  return <img className={className} src={image} alt="" aria-hidden="true" />;
}
export default function Navbar({ theme = "light", onToggleTheme = () => {} }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

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
            <NavLink to="/projects" onClick={closeMenu}>Projetos</NavLink>
            <NavLink to="/blog" onClick={closeMenu}>Blog</NavLink>
            <NavLink to="/contact" onClick={closeMenu}>Contato</NavLink>
          </div>
          <button
            className="theme-toggle"
            type="button"
            onClick={onToggleTheme}
            aria-pressed={theme === "dark"}
            aria-label={theme === "light" ? "Ativar tema escuro" : "Ativar tema claro"}
          >
            <ThemeIcon theme={theme} />
            <span className="theme-tooltip" aria-hidden="true">{theme === "light" ? "Tema escuro" : "Tema claro"}</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
