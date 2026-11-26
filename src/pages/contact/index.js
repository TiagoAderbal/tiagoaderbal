import CoinDrop from "../../components/CoinDrop";
import "./index.css";
import SiteFooter from "../../components/SiteFooter";

const contactOptions = [
  {
    label: "WhatsApp",
    detail: "Vamos conversar direto por aqui.",
    href: "https://wa.me/5514998761501?text=Ol%C3%A1%2C%20Tiago!",
    icon: "bi-whatsapp",
    featured: true,
    external: true,
  },
  {
    label: "E-mail",
    detail: "tiago_aderbal2011@hotmail.com",
    href: "mailto:tiago_aderbal2011@hotmail.com",
    icon: "bi-envelope",
  },
  {
    label: "LinkedIn",
    detail: "Me encontre por lá.",
    href: "https://www.linkedin.com/in/tiago-aderbal",
    icon: "bi-linkedin",
    external: true,
  },
  {
    label: "GitHub",
    detail: "Veja meus projetos e códigos.",
    href: "https://github.com/TiagoAderbal",
    icon: "bi-github",
    external: true,
  },
];

export default function Contact() {
  return (
    <main className="content-page contact-page">
      <header className="page-intro contact-intro">
        <span className="eyebrow">VAMOS TIRAR UMA IDEIA DO PAPEL?</span>
        <h1>Contato<CoinDrop active inline><span>.</span></CoinDrop></h1>
        <p>Tem um projeto, uma oportunidade ou só quer trocar uma ideia? Escolha um canal e me chama.</p>
      </header>

      <section className="contact-grid" aria-label="Canais de contato">
        {contactOptions.map((option) => (
          <a
            className={`contact-card ${option.featured ? "contact-card-featured" : ""}`}
            href={option.href}
            key={option.label}
            target={option.external ? "_blank" : undefined}
            rel={option.external ? "noreferrer" : undefined}
          >
            <span className="contact-icon"><i className={`bi ${option.icon}`} aria-hidden="true" /></span>
            <span className="contact-card-copy">
              <strong>{option.label}</strong>
              <span>{option.detail}</span>
            </span>
            <span className="contact-arrow" aria-hidden="true">↗</span>
          </a>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
