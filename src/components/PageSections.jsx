import { useRef } from "react";
import {
  FaBuilding,
  FaCreditCard,
  FaEnvelope,
  FaInstagram,
  FaLocationDot,
  FaPhone,
} from "react-icons/fa6";
import { SERVICE_LABELS, SERVICE_PRICES } from "../data/siteContent";
import { WhatsAppLink } from "./SiteChrome";

function ServiceMarquee() {
  return (
    <div className="service-marquee" aria-label={`Serviços: ${SERVICE_LABELS.join(", ")}`}>
      {[0, 1].map((copy) => (
        <div className="marquee-track" aria-hidden={copy === 1} key={copy}>
          {SERVICE_LABELS.map((label) => (
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

export function Hero() {
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

export function ServicesIntro() {
  return (
    <section className="services-intro" id="servicos" data-section>
      <div className="section-kicker" data-reveal>
        <span>Serviços Bonatto</span>
        <span>Deslize as seções para descobrir mais</span>
      </div>
      <div className="services-intro-copy" data-reveal>
        <h2>
          <span>Tudo que o seu carro precisa.</span>
          <span>No melhor lugar.</span>
        </h2>
        <p>
          Cuidamos do seu carro para você e por você, com marcas, modelos e condições
          apresentados de forma simples.
        </p>
      </div>
    </section>
  );
}

export function PricingAndPayments() {
  return (
    <section className="pricing" id="balanceamento" data-section>
      <div className="pricing-heading" data-reveal>
        <p className="eyebrow">Balanceamento e geometria</p>
        <h2>Seu carro alinhado. Seu caminho mais seguro.</h2>
        <p>
          Valores claros para veículos leves, SUVs, camionetes, vans e utilitários.
        </p>
      </div>

      <div className="price-grid" data-reveal>
        {SERVICE_PRICES.map((price) => (
          <article className="price-card" key={price.vehicle}>
            <h3>{price.vehicle}</h3>
            <dl>
              <div>
                <dt>Balanceamento</dt>
                <dd>{price.balance}</dd>
              </div>
              <div>
                <dt>Geometria</dt>
                <dd>{price.alignment}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <p className="pricing-note" data-reveal>
        Para SUVs, camionetes, vans e utilitários, estes serviços podem ser parcelados
        em até 3x. Consulte condições no atendimento.
      </p>

      <div className="payment-panel" data-reveal>
        <header>
          <p className="eyebrow">Formas de pagamento</p>
          <h3>Condições para facilitar o seu cuidado.</h3>
        </header>
        <div className="payment-options">
          <article>
            <FaCreditCard aria-hidden="true" />
            <div>
              <strong>Cartão de crédito</strong>
              <p>
                Parcelamento em até 18x. Entre em contato para consultar taxas e
                condições disponíveis.
              </p>
            </div>
          </article>
          <article>
            <FaBuilding aria-hidden="true" />
            <div>
              <strong>Empresas com CNPJ</strong>
              <p>
                Mediante cadastro e consulta, parcelamento em até 3x no boleto.
              </p>
            </div>
          </article>
        </div>
        <WhatsAppLink className="button button-primary payment-cta">
          Consultar condições
        </WhatsAppLink>
      </div>
    </section>
  );
}

export function Company() {
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
          A Bonatto Pneus une tradição, atendimento próximo e soluções completas para
          quem quer dirigir com segurança, sem complicação e sem perder tempo.
        </p>
      </div>
    </section>
  );
}

export function Contact() {
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
          rel="noopener noreferrer"
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
          rel="noopener noreferrer"
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
