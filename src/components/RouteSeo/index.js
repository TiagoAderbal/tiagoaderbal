import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import articles from "../../data/articles";

const SITE_URL = "https://tiagoaderbal.vercel.app";

const DEFAULT_SEO = {
  title: "Tiago Aderbal | Dev Fullstack | React, Node.js, IA e Cibersegurança",
  description:
    "Desenvolvedor Full Stack especializado em React, Node.js, Inteligência Artificial, integrações e cibersegurança. Conheça meus projetos, experiências e o assistente de IA ATLAS.",
  type: "website",
};

const PAGE_SEO = {
  "/": DEFAULT_SEO,
  "/about": {
    title: "Sobre mim | Tiago Aderbal",
    description:
      "Conheça a trajetória de Tiago Aderbal, desenvolvedor Full Stack: do front-end ao full stack, sua forma de trabalhar e seus estudos em Inteligência Artificial e Cibersegurança.",
    type: "website",
  },
  "/projects": {
    title: "Projetos | Tiago Aderbal",
    description:
      "Produtos, experimentos e soluções desenvolvidos por Tiago Aderbal com React, Node.js, Inteligência Artificial e outras tecnologias.",
    type: "website",
  },
  "/blog": {
    title: "Blog | Tiago Aderbal",
    description:
      "Artigos de Tiago Aderbal sobre desenvolvimento de software, Inteligência Artificial e Cibersegurança.",
    type: "website",
  },
  "/contact": {
    title: "Contato | Tiago Aderbal",
    description:
      "Fale com Tiago Aderbal por WhatsApp, e-mail, LinkedIn ou GitHub. Projetos, oportunidades ou só uma boa conversa sobre tecnologia.",
    type: "website",
  },
};

const NOT_FOUND_SEO = {
  title: "404 | Página não encontrada | Tiago Aderbal",
  description: "Essa página não existe. Mas tem alguém esperando por você nela.",
  type: "website",
  noindex: true,
};

function normalizePath(pathname) {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "");
}

function resolveSeo(path) {
  const articleMatch = path.match(/^\/blog\/([^/]+)$/);
  if (articleMatch) {
    const article = articles.find((item) => item.slug === articleMatch[1]);
    if (article) {
      return { title: `${article.title} | Tiago Aderbal`, description: article.summary, type: "article" };
    }
  }
  return PAGE_SEO[path] ?? NOT_FOUND_SEO;
}

function setMetaContent(selector, content) {
  const element = document.head.querySelector(selector);
  if (element) element.setAttribute("content", content);
}

export default function RouteSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = normalizePath(pathname);
    const { title, description, type, noindex = false } = resolveSeo(path);
    const url = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;

    document.title = title;
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[property="og:url"]', url);
    setMetaContent('meta[property="og:type"]', type);
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);

    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", url);

    // A 404 não deve ser indexada; ao sair dela, o robots volta ao valor original.
    const robots = document.head.querySelector('meta[name="robots"]');
    if (robots) {
      if (!robots.dataset.original) robots.dataset.original = robots.getAttribute("content") || "index, follow";
      robots.setAttribute("content", noindex ? "noindex, follow" : robots.dataset.original);
    }
  }, [pathname]);

  return null;
}
