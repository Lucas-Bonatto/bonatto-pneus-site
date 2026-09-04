import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { WhatsAppLink } from "./SiteChrome";

function ServiceIntro({ service }) {
  return (
    <article className={`journey-slide service-intro-slide scene-${service.align}`}>
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

        <WhatsAppLink className="scene-link">Orçar este serviço</WhatsAppLink>
      </div>
    </article>
  );
}

function ShowcaseHeader({ slide }) {
  return (
    <header className="showcase-heading" data-reveal>
      <p className="eyebrow">{slide.eyebrow}</p>
      <p>{slide.description}</p>
    </header>
  );
}

function BrandCard({ item }) {
  return (
    <li className="brand-card">
      <span className="brand-art" aria-hidden="true">
        {item.logo ? (
          <img src={item.logo} alt="" loading="lazy" decoding="async" />
        ) : (
          <span>{item.name}</span>
        )}
      </span>
      <strong>{item.name}</strong>
    </li>
  );
}

function BrandsSlide({ slide }) {
  return (
    <article className="journey-slide showcase-slide" aria-labelledby={`${slide.id}-title`}>
      <div className="showcase-layout">
        <div>
          <ShowcaseHeader slide={slide} />
          <h3 id={`${slide.id}-title`} className="showcase-title" data-reveal>
            {slide.title}
          </h3>
        </div>

        <div className="showcase-content" data-reveal>
          <ul className="brand-grid" aria-label="Marcas disponíveis">
            {slide.brands.map((item) => (
              <BrandCard item={item} key={item.name} />
            ))}
          </ul>
          <p className="showcase-note">{slide.note}</p>
        </div>
      </div>
    </article>
  );
}

function GallerySlide({ slide }) {
  return (
    <article className="journey-slide showcase-slide gallery-slide" aria-labelledby={`${slide.id}-title`}>
      <div className="showcase-layout">
        <div>
          <ShowcaseHeader slide={slide} />
          <h3 id={`${slide.id}-title`} className="showcase-title" data-reveal>
            {slide.title}
          </h3>
        </div>

        <div className="showcase-content" data-reveal>
          <ul className={`product-grid product-grid-${slide.items.length}`}>
            {slide.items.map((item) => (
              <li className="product-card" key={`${item.brand}-${item.name}`}>
                <div className="product-image-wrap">
                  <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
                </div>
                <div>
                  <small>{item.brand}</small>
                  <strong>{item.name}</strong>
                </div>
              </li>
            ))}
          </ul>
          <p className="showcase-note">{slide.note}</p>
        </div>
      </div>
    </article>
  );
}

function ShowcaseSlide({ slide }) {
  return slide.type === "gallery" ? (
    <GallerySlide slide={slide} />
  ) : (
    <BrandsSlide slide={slide} />
  );
}

export function ServiceJourney({ service }) {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const frameRef = useRef(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = service.slides ?? [];
  const totalSlides = slides.length + 1;

  const goToSlide = (index) => {
    const next = Math.max(0, Math.min(totalSlides - 1, index));
    const viewport = viewportRef.current;
    if (!viewport) return;

    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";

    sectionRef.current?.scrollIntoView({ block: "start", behavior });
    viewport.scrollTo({
      left: viewport.clientWidth * next,
      behavior,
    });
    setActiveSlide(next);
  };

  const handleScroll = () => {
    if (frameRef.current) return;
    frameRef.current = window.requestAnimationFrame(() => {
      const viewport = viewportRef.current;
      if (viewport?.clientWidth) {
        setActiveSlide(Math.round(viewport.scrollLeft / viewport.clientWidth));
      }
      frameRef.current = 0;
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      goToSlide(activeSlide + (event.key === "ArrowRight" ? 1 : -1));
    }
  };

  return (
    <section
      className="service-journey"
      id={service.id}
      ref={sectionRef}
      data-scene
      aria-labelledby={`${service.id}-title`}
    >
      <div
        className="journey-viewport"
        ref={viewportRef}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        tabIndex={totalSlides > 1 ? 0 : undefined}
        aria-label={`${service.title.replace("\n", " ")}: ${totalSlides} ${totalSlides === 1 ? "página lateral" : "páginas laterais"}`}
      >
        <div className="journey-track">
          <ServiceIntro service={service} />
          {slides.map((slide) => (
            <ShowcaseSlide slide={slide} key={slide.id} />
          ))}
        </div>
      </div>

      {totalSlides > 1 ? (
        <div className="journey-navigation" aria-label={`Navegar pela seção ${service.id}`}>
          <span className="journey-counter" aria-live="polite">
            {String(activeSlide + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
          </span>
          <span className="journey-hint">Arraste para o lado</span>
          <button
            type="button"
            onClick={() => goToSlide(activeSlide - 1)}
            disabled={activeSlide === 0}
            aria-label="Página lateral anterior"
          >
            <FaChevronLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => goToSlide(activeSlide + 1)}
            disabled={activeSlide === totalSlides - 1}
            aria-label="Próxima página lateral"
          >
            <FaChevronRight aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </section>
  );
}
