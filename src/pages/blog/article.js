import { Link, Navigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import articles from "../../data/articles";
import "./index.css";

export default function Article() {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);
  if (!article) return <Navigate to="/blog" replace />;

  return (
    <main className="content-page article-page">
      <Link className="back-link" to="/blog">← Voltar ao blog</Link>
      <header className="article-header">
        <div className="article-meta"><span>{article.category}</span><time dateTime={article.date}>{article.dateLabel}</time></div>
        <h1>{article.title}</h1>
        <p>{article.summary}</p>
        <span className="article-read">{article.readTime} min de leitura</span>
      </header>
      {article.cover && <img className="article-hero-image" src={article.cover} alt="" />}
      <article className="markdown-article"><ReactMarkdown>{article.content}</ReactMarkdown></article>
      {article.linkedinUrl && <a className="linkedin-original" href={article.linkedinUrl} target="_blank" rel="noreferrer">Ver publicação original no LinkedIn <span aria-hidden="true">↗</span></a>}
      <footer className="site-footer">© {new Date().getFullYear()} Tiago Aderbal</footer>
    </main>
  );
}
