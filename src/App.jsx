import { useEffect } from "react";
import "@fontsource/big-shoulders-display/latin-600";
import "@fontsource/big-shoulders-display/latin-700";
import "@fontsource/big-shoulders-display/latin-800";
import "@fontsource/big-shoulders-display/latin-900";
import "@fontsource/sora/latin-400.css";
import "@fontsource/sora/latin-500.css";
import "@fontsource/sora/latin-600.css";
import "@fontsource/sora/latin-700.css";
import "@fontsource/sora/latin-800.css";
import { Contact, Company, Hero, PricingAndPayments, ServicesIntro } from "./components/PageSections";
import { ServiceJourney } from "./components/ServiceJourney";
import { Brand, Footer, Header, WhatsAppLink } from "./components/SiteChrome";
import { SERVICES } from "./data/siteContent";
import { useMagneticButtons, usePageMotion } from "./hooks/usePageMotion";

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
      <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
      <main className="not-found" id="conteudo">
        <img className="not-found-image" src="/images/sections/hero-wheel.webp" alt="" aria-hidden="true" />
        <div className="not-found-shade" aria-hidden="true" />
        <div className="not-found-brand"><Brand href="/" /></div>
        <div className="not-found-code" aria-hidden="true">404</div>
        <div className="not-found-content" data-reveal>
          <p className="eyebrow">Página não encontrada</p>
          <h1>Esta rota saiu<span>do caminho.</span></h1>
          <p>
            O endereço pode ter mudado, mas a Bonatto Pneus continua pronta para levar
            você mais longe.
          </p>
          <a className="button button-primary" href="/" data-magnetic>Voltar para o início</a>
        </div>
      </main>
      <WhatsAppLink className="floating-whatsapp not-found-whatsapp">WhatsApp</WhatsAppLink>
    </>
  );
}

export function App() {
  usePageMotion();
  useMagneticButtons();

  const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
  const isHomePage = currentPath === "/" || currentPath === "/index.html";

  if (!isHomePage) return <NotFoundPage />;

  return (
    <>
      <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
      <div className="scroll-progress" aria-hidden="true" />
      <Header />
      <main id="conteudo">
        <Hero />
        <ServicesIntro />
        {SERVICES.map((service) => (
          <ServiceJourney service={service} key={service.id} />
        ))}
        <PricingAndPayments />
        <Company />
        <Contact />
      </main>
      <Footer />
      <WhatsAppLink className="floating-whatsapp">WhatsApp</WhatsAppLink>
    </>
  );
}
