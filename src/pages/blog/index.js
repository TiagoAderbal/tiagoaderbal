import { useState } from "react";
import { Link } from "react-router-dom";
import articles from "../../data/articles";
import "./index.css";
import SiteFooter from "../../components/SiteFooter";

export default function Blog() {
  const [category, setCategory] = useState("Todas");
  const categories = ["Todas", ...new Set(articles.map((article) => article.category))];
  const visibleArticles = articles.filter((article) => category === "Todas" || article.category === category);

  return (
    <main className="content-page blog-page">
      <header className="page-intro blog-intro">
        <span className="eyebrow">IDEIAS, CÓDIGO E APRENDIZADOS</span>
        <h1>Blog<span>.</span></h1>
        <p>Artigos que publico no LinkedIn, reunidos aqui para leitura completa. Aproveita e já deixa aquele engajamento maroto no LinkedIn!</p>
      </header>

      <section className="blog-tools" aria-label="Filtrar artigos">
        <div className="category-filters" aria-label="Filtrar por categoria">
          {categories.map((item) => (
            <button key={item} className={category === item ? "selected" : ""} onClick={() => setCategory(item)} type="button">{item}</button>
          ))}
        </div>
      </section>

      {visibleArticles.length ? (
        <section className="article-grid" aria-label="Artigos">
          {visibleArticles.map((article, index) => (
            <article className="article-card" key={article.slug}>
              <Link className="article-card-link" to={`/blog/${article.slug}`}>
                {article.cover ? (
                  <img
                    className="article-cover"
                    src={article.coverThumb ?? article.cover}
                    alt=""
                    width="880"
                    height="495"
                    // a primeira linha de cards já aparece na tela; o resto carrega ao rolar
                    loading={index < 3 ? "eager" : "lazy"}
                    decoding="async"
                  />
                ) : (
                  <div className="article-cover article-cover-placeholder"><span>{article.category}</span></div>
                )}
                <div className="article-card-content">
                  <div className="article-meta"><span>{article.category}</span><time dateTime={article.date}>{article.dateLabel}</time></div>
                  <h2>{article.title}</h2>
                  <p>{article.summary}</p>
                  <span className="article-read">{article.readTime} min de leitura <span aria-hidden="true">↗</span></span>
                </div>
              </Link>
            </article>
          ))}
        </section>
      ) : (
        <section className="blog-empty">
          <span className="empty-mark">✳</span>
          <h2>{articles.length ? "Nenhum artigo encontrado" : "Ainda estou trazendo os artigos para cá."}</h2>
          <p>{articles.length ? "Tente outro termo ou categoria." : "Enquanto isso, acompanhe minhas publicações diretamente no LinkedIn."}</p>
          {!articles.length && <a className="text-link" href="https://www.linkedin.com/in/tiago-aderbal" target="_blank" rel="noreferrer">Abrir meu LinkedIn <span aria-hidden="true">↗</span></a>}
        </section>
      )}
      <SiteFooter />
    </main>
  );
}
