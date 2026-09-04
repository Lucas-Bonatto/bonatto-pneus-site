import { useEffect } from "react";

export function usePageMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reveals = [...document.querySelectorAll("[data-reveal]")];
    const scenes = [...document.querySelectorAll("[data-scene]")];
    const sections = [...document.querySelectorAll("[data-section]")];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
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
          const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / travel));
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
      root.dataset.floating = window.scrollY > window.innerHeight * 0.72 ? "true" : "false";
      frameId = 0;
    };

    const requestUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(update);
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

export function useMagneticButtons() {
  useEffect(() => {
    const buttons = [...document.querySelectorAll("[data-magnetic]")];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

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
