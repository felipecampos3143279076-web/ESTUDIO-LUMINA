"use client";

import { useEffect, useRef } from "react";
import layout from "@/components/layout/Container.module.css";
import styles from "./AboutCta.module.css";

// TEXTO: provisional, se puede editar aquí directamente.
// whatsapp: el mismo número que en components/contact/Contact.tsx y
// components/footer/Footer.tsx; solo dígitos con indicativo, ej. "57XXXXXXXXXX".
const CONTENT = {
  title: "Todo gran espacio comienza con una idea",
  text: "Cuéntanos qué quieres construir o transformar. Conversemos sin compromiso sobre tu próximo proyecto.",
  whatsapp: "",
  whatsappMessage: "Hola, quiero hablar sobre un proyecto con Estudio Lúmina.",
};

export default function AboutCta() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Si ya está a la vista al cargar, se muestra sin animar.
    if (section.getBoundingClientRect().top < innerHeight * 0.85) return;

    section.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        section.dataset.reveal = "done";
        observer.disconnect();
      },
      { threshold: 0.3 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const whatsappHref = CONTENT.whatsapp
    ? `https://wa.me/${CONTENT.whatsapp}?text=${encodeURIComponent(CONTENT.whatsappMessage)}`
    : "";

  return (
    <section
      ref={sectionRef}
      className={`${layout.section} ${styles.section}`}
      aria-labelledby="invitacion-titulo"
    >
      <div className={`${layout.container} ${styles.panel}`}>
        <div className={styles.content}>
          <h2 id="invitacion-titulo" className={styles.title}>
            {CONTENT.title}
          </h2>
          <p className={styles.text}>{CONTENT.text}</p>
          {whatsappHref ? (
            <a
              href={whatsappHref}
              className={styles.button}
              target="_blank"
              rel="noopener noreferrer"
            >
              Hablemos por WhatsApp
            </a>
          ) : (
            <span className={styles.button} aria-disabled="true">
              Hablemos por WhatsApp
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
