import { useState } from "react";
import { FaBars, FaWhatsapp, FaXmark } from "react-icons/fa6";
import { NAVIGATION, WHATSAPP_URL } from "../data/siteContent";

export function Brand({ href = "#inicio" }) {
  return (
    <a className="brand" href={href} aria-label="Bonatto Pneus — início">
      <img
        className="brand-logo"
        src="/images/logo-transparent-v1.webp"
        alt=""
        aria-hidden="true"
      />
      <span className="brand-name">Bonatto Pneus</span>
    </a>
  );
}

export function WhatsAppLink({ className = "", children = "Pedir orçamento" }) {
  return (
    <a
      className={className}
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-magnetic
    >
      <FaWhatsapp aria-hidden="true" />
      <span>{children}</span>
    </a>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <Brand />

      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        onClick={() => setMenuOpen((current) => !current)}
      >
        {menuOpen ? <FaXmark aria-hidden="true" /> : <FaBars aria-hidden="true" />}
      </button>

      <nav
        id="main-navigation"
        className={`navigation ${menuOpen ? "is-open" : ""}`}
        aria-label="Navegação principal"
      >
        {NAVIGATION.map((item) => (
          <a
            key={item.href}
            href={item.href}
            data-nav-section={item.section}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <WhatsAppLink className="header-cta">Falar no WhatsApp</WhatsAppLink>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <Brand />
      <p>
        Tradição, segurança e performance em Caxias do Sul.
        <small>Marcas citadas pertencem aos respectivos titulares.</small>
      </p>
      <a href="#inicio">Voltar ao início</a>
    </footer>
  );
}
