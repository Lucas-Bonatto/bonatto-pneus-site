import { useEffect, useRef, useState } from "react";
import {
  FaBars,
  FaBuilding,
  FaEnvelope,
  FaInstagram,
  FaLocationDot,
  FaPhone,
  FaWhatsapp,
  FaXmark,
} from "react-icons/fa6";
import "@fontsource/big-shoulders-display/latin-600";
import "@fontsource/big-shoulders-display/latin-700";
import "@fontsource/big-shoulders-display/latin-800";
import "@fontsource/big-shoulders-display/latin-900";
import "@fontsource/sora/latin-400.css";
import "@fontsource/sora/latin-500.css";
import "@fontsource/sora/latin-600.css";
import "@fontsource/sora/latin-700.css";
import "@fontsource/sora/latin-800.css";

const WHATSAPP_URL = `https://wa.me/5554999783838?text=${encodeURIComponent(
  "Olá! Vim pelo site da Bonatto Pneus e gostaria de solicitar um orçamento.",
)}`;

const NAVIGATION = [
  { label: "Início", href: "#inicio", section: "inicio" },
  { label: "Serviços", href: "#servicos", section: "servicos" },
  { label: "A empresa", href: "#empresa", section: "empresa" },
  { label: "Contato", href: "#contato", section: "contato" },
];

const SERVICES = [
  {
    id: "pneus",
    number: "01",
    eyebrow: "Segurança começa no contato",
    title: "Aderência para ir além.",
    description:
      "Linha completa para carros de passeio, SUVs e utilitários, com orientação para escolher a medida e o perfil certos para a sua rotina.",
    details: ["Passeio", "SUV", "Utilitário", "Calibragem"],
    image: "/images/sections/tires.webp",
    alt: "Profissional inspecionando a banda de rodagem de um pneu novo",
    align: "right",
  },
  {
    id: "rodas",
    number: "02",
    eyebrow: "Estilo com precisão",
    title: "Rodas que transformam presença.",
    description:
      "Modelos para diferentes projetos e estilos, combinando acabamento, encaixe correto e equilíbrio para dirigir com personalidade.",
    details: ["Liga leve", "Esportivas", "Balanceamento", "Montagem"],
    image: "/images/sections/wheels.webp",
    alt: "Roda esportiva escura com iluminação azul e âmbar",
    align: "left",
  },
  {
    id: "suspensao",
    number: "03",
    eyebrow: "Controle em cada resposta",
    title: "Controle total.\nResposta imediata.",
    description:
      "Diagnóstico e manutenção dos sistemas que mantêm o veículo estável, confortável e pronto para responder quando você mais precisa.",
    details: ["Amortecedores", "Molas", "Pastilhas", "Discos"],
    image: "/images/sections/suspension-brakes.webp",
    alt: "Conjunto automotivo de suspensão e freio em destaque",
    align: "right",
  },
  {
    id: "oleo",
    number: "04",
    eyebrow: "Proteção que circula",
    title: "O cuidado que mantém tudo em movimento.",
    description:
      "Troca de óleo e filtros com atenção à especificação do seu veículo, ajudando o motor a trabalhar limpo, protegido e eficiente.",
    details: ["Óleo do motor", "Filtro de óleo", "Filtro de ar", "Revisão de níveis"],
    image: "/images/sections/oil-change.webp",
    alt: "Óleo novo sendo colocado em um motor automotivo",
    align: "left",
  },
  {
    id: "eletrica",
    number: "05",
    eyebrow: "Tecnologia para o seu carro",
    title: "Tecnologia que liga, protege e conecta.",
    description:
      "Instalação, revisão e integração de acessórios elétricos com organização e acabamento profissional.",
    details: [
      "Alarmes",
      "Interfaces",
      "Lâmpadas",
      "Baterias",
      "Antifurto",
      "Rádio",
      "Alto-falantes",
    ],
    image: "/images/sections/electrical.webp",
    alt: "Componentes de elétrica automotiva organizados sobre bancada escura",
    align: "right",
  },
  {
    id: "peliculas",
    number: "06",
    eyebrow: "Conforto e proteção",
    title: "Películas que cuidam de quem está dentro.",
    description:
      "Aplicação precisa para mais conforto térmico, privacidade e proteção, com acabamento limpo que valoriza o veículo.",
    details: ["Conforto térmico", "Proteção UV", "Privacidade", "Acabamento preciso"],
    image: "/images/sections/window-film.webp",
    alt: "Profissional aplicando película em vidro automotivo",
    align: "left",
  },
];

function usePageMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reveals = [...document.querySelectorAll("[data-reveal]")];
    const scenes = [...document.querySelectorAll("[data-scene]")];
    const sections = [...document.querySelectorAll("[data-section]")];
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    reveals.forEach((element) => revealObserver.observe(element));

    let frameId = 0;

    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pageProgress = scrollable > 0 ? window.scrollY / scrollable : 0;
      root.style.setProperty("--page-progress", pageProgress.toFixed(4));

      if (!reduceMotion) {
        scenes.forEach((scene) => {
          const rect = scene.getBoundingClientRect();
          const travel = rect.height + window.innerHeight;
          const progress = Math.min(
            1,
            Math.max(0, (window.innerHeight - rect.top) / travel),
          );
          scene.style.setProperty("--scene-progress", progress.toFixed(4));
        });
      }

      let currentSection = sections[0]?.id ?? "inicio";
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= window.innerHeight * 0.45) {
          currentSection = section.id;
        }
      });
      root.dataset.activeSection = currentSection;
      root.dataset.scrolled = window.scrollY > 24 ? "true" : "false";
      root.dataset.floating =
        window.scrollY > window.innerHeight * 0.72 ? "true" : "false";
      frameId = 0;
    };

    const requestUpdate = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.cancelAnimationFrame(frameId);
    };
  }, []);
}

function useMagneticButtons() {
  useEffect(() => {
    const buttons = [...document.querySelectorAll("[data-magnetic]")];
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      return undefined;
    }

    const cleanups = buttons.map((button) => {
      const move = (event) => {
        const bounds = button.getBoundingClientRect();
        const x = (event.clientX - bounds.left - bounds.width / 2) * 0.12;
        const y = (event.clientY - bounds.top - bounds.height / 2) * 0.16;
        button.style.setProperty("--magnetic-x", `${x.toFixed(2)}px`);
        button.style.setProperty("--magnetic-y", `${y.toFixed(2)}px`);
      };
      const reset = () => {
        button.style.setProperty("--magnetic-x", "0px");
        button.style.setProperty("--magnetic-y", "0px");
      };

      button.addEventListener("pointermove", move);
      button.addEventListener("pointerleave", reset);

      return () => {
        button.removeEventListener("pointermove", move);
        button.removeEventListener("pointerleave", reset);
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);
}

function Brand({ href = "#inicio" }) {
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

function WhatsAppLink({ className = "", children = "Pedir orçamento" }) {
  return (
    <a
      className={className}
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      data-magnetic
    >
      <FaWhatsapp aria-hidden="true" />
      <span>{children}</span>
    </a>
  );
}

function Header() {
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

function ServiceMarquee() {
  const labels = [
    "Pneus",
    "Rodas",
    "Suspensão",
    "Freios",
    "Troca de óleo",
    "Elétrica",
    "Películas",
  ];

  return (
    <div className="service-marquee" aria-label={`Serviços: ${labels.join(", ")}`}>
      {[0, 1].map((copy) => (
        <div className="marquee-track" aria-hidden={copy === 1} key={copy}>
          {labels.map((label) => (
            <span key={`${copy}-${label}`}>
              {label}
              <i aria-hidden="true" />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

function Hero() {
  const heroRef = useRef(null);

  const handlePointerMove = (event) => {
    if (!heroRef.current) return;
    const bounds = heroRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    heroRef.current.style.setProperty("--hero-x", x.toFixed(3));
    heroRef.current.style.setProperty("--hero-y", y.toFixed(3));
  };

  return (
    <section
      className="hero"
      id="inicio"
      data-section
      ref={heroRef}
      onPointerMove={handlePointerMove}
    >
      <img
        className="hero-image"
        src="/images/sections/hero-wheel.webp"
        alt="Pneu com roda esportiva envolvido por partículas azuis e âmbar"
        fetchPriority="high"
      />
      <div className="hero-shade" aria-hidden="true" />

      <div className="hero-content" data-reveal>
        <p className="eyebrow">40 anos em movimento</p>
        <h1>
          <span>Força para</span>
          <span>ir mais longe.</span>
        </h1>
        <p className="hero-description">
          Pneus, rodas e serviços automotivos completos em
          <strong> Caxias do Sul.</strong>
        </p>

        <div className="hero-actions">
          <WhatsAppLink className="button button-primary" />
          <a className="button button-secondary" href="#servicos" data-magnetic>
            Explorar serviços
          </a>
        </div>

        <a className="scroll-cue" href="#servicos">
          Role para explorar
        </a>
      </div>

      <ServiceMarquee />
    </section>
  );
}

function ServiceScene({ service }) {
  return (
    <section
      className={`service-scene scene-${service.align}`}
      id={service.id}
      data-scene
      aria-labelledby={`${service.id}-title`}
    >
      <div className="scene-sticky">
        <img
          className="scene-image"
          src={service.image}
          alt={service.alt}
          loading="lazy"
          decoding="async"
        />
        <div className="scene-shade" aria-hidden="true" />

        <div className="scene-number" aria-hidden="true">
          {service.number}
        </div>

        <div className="scene-content" data-reveal>
          <p className="eyebrow">{service.eyebrow}</p>
          <h2
            id={`${service.id}-title`}
            className={service.title.includes("\n") ? "has-fixed-lines" : undefined}
            aria-label={service.title.replace("\n", " ")}
          >
            {service.title.split("\n").map((line) => (
              <span className="service-title-line" key={line}>
                {line}
              </span>
            ))}
          </h2>
          <p>{service.description}</p>

          <ul className="service-details" aria-label={`Inclui ${service.details.join(", ")}`}>
            {service.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>

          <WhatsAppLink className="scene-link">
            Orçar este serviço
          </WhatsAppLink>
        </div>
      </div>
    </section>
  );
}

function ServicesIntro() {
  return (
    <section className="services-intro" id="servicos" data-section>
      <div className="section-kicker" data-reveal>
        <span>Serviços Bonatto</span>
      </div>
      <div className="services-intro-copy" data-reveal>
        <h2>
          <span>Tudo que o seu carro precisa.</span>
          <span>No melhor lugar.</span>
        </h2>
        <p>Cuidamos do seu carro para você e por você.</p>
      </div>
    </section>
  );
}

function Company() {
  return (
    <section className="company" id="empresa" data-section>
      <div className="company-rule" aria-hidden="true" />
      <div className="company-years" data-reveal>
        <strong>40</strong>
        <span>anos</span>
      </div>
      <div className="company-copy" data-reveal>
        <p className="eyebrow">Experiência que segue em frente</p>
        <h2>Confiança construída quilômetro por quilômetro.</h2>
        <p>
          A Bonatto Pneus une tradição, atendimento próximo e soluções completas
          para quem quer dirigir com segurança, sem complicação e sem perder tempo.
        </p>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact" id="contato" data-section>
      <div className="contact-heading" data-reveal>
        <p className="eyebrow">Seu carro está pronto para o próximo caminho?</p>
        <h2>Vamos conversar.</h2>
        <WhatsAppLink className="button button-primary contact-cta">
          Solicitar orçamento
        </WhatsAppLink>
      </div>

      <address className="contact-list" data-reveal>
        <a
          href="https://www.google.com/maps/search/?api=1&query=R.%20Min.%20Toledo%2C%20315%2C%20S%C3%A3o%20Pelegrino%2C%20Caxias%20do%20Sul%2C%20RS"
          target="_blank"
          rel="noreferrer"
        >
          <FaLocationDot aria-hidden="true" />
          <span>
            <small>Onde estamos</small>
            R. Min. Toledo, 315, São Pelegrino
          </span>
        </a>
        <a href="tel:+555432244444">
          <FaPhone aria-hidden="true" />
          <span>
            <small>Telefone</small>
            (54) 3224-4444
          </span>
        </a>
        <a href="mailto:bonatto@bonattopneus.com.br">
          <FaEnvelope aria-hidden="true" />
          <span>
            <small>E-mail</small>
            bonatto@bonattopneus.com.br
          </span>
        </a>
        <a
          href="https://www.instagram.com/bonattopneus/"
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram aria-hidden="true" />
          <span>
            <small>Instagram</small>
            @bonattopneus
          </span>
        </a>
        <div className="contact-item">
          <FaBuilding aria-hidden="true" />
          <span>
            <small>CNPJ</small>
            93.339.828/0001-50
          </span>
        </div>
      </address>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <Brand />
      <p>Tradição, segurança e performance em Caxias do Sul.</p>
      <a href="#inicio">Voltar ao início</a>
    </footer>
  );
}

function NotFoundPage() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Página não encontrada | Bonatto Pneus";

    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>

      <main className="not-found" id="conteudo">
        <img
          className="not-found-image"
          src="/images/sections/hero-wheel.webp"
          alt=""
          aria-hidden="true"
        />
        <div className="not-found-shade" aria-hidden="true" />

        <div className="not-found-brand">
          <Brand href="/" />
        </div>

        <div className="not-found-code" aria-hidden="true">
          404
        </div>

        <div className="not-found-content" data-reveal>
          <p className="eyebrow">Página não encontrada</p>
          <h1>
            Esta rota saiu
            <span>do caminho.</span>
          </h1>
          <p>
            O endereço pode ter mudado, mas a Bonatto Pneus continua pronta para
            levar você mais longe.
          </p>
          <a className="button button-primary" href="/" data-magnetic>
            Voltar para o início
          </a>
        </div>
      </main>

      <WhatsAppLink className="floating-whatsapp not-found-whatsapp">
        WhatsApp
      </WhatsAppLink>
    </>
  );
}

export function App() {
  usePageMotion();
  useMagneticButtons();

  const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
  const isHomePage = currentPath === "/" || currentPath === "/index.html";

  if (!isHomePage) {
    return <NotFoundPage />;
  }

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <div className="scroll-progress" aria-hidden="true" />
      <Header />
      <main id="conteudo">
        <Hero />
        <ServicesIntro />
        {SERVICES.map((service) => (
          <ServiceScene service={service} key={service.id} />
        ))}
        <Company />
        <Contact />
      </main>
      <Footer />
      <WhatsAppLink className="floating-whatsapp">
        WhatsApp
      </WhatsAppLink>
    </>
  );
}
