"use client";

import { useEffect, useRef } from "react";
import layout from "@/components/layout/Container.module.css";
import styles from "./ServicesCta.module.css";

// TEXTO: el párrafo es provisional; se puede editar aquí directamente.
// whatsapp: debe ser el mismo número que en components/contact/Contact.tsx
// (Inicio), que todavía está vacío. Solo dígitos con indicativo de país, por
// ejemplo "57XXXXXXXXXX". Mientras esté vacío, el botón se muestra inactivo.
const CONTENT = {
  title: "Tu próximo proyecto comienza con una conversación",
  text: "Cuéntanos tus ideas, el espacio que imaginas y lo que esperas de él. Te escuchamos y te orientamos sobre el mejor camino para hacerlo realidad.",
  whatsapp: "",
  whatsappMessage: "Hola, quiero hablar sobre un proyecto con Estudio Lúmina.",
};

export default function ServicesCta() {
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
      aria-labelledby="servicios-invitacion-titulo"
    >
      <div className={`${layout.container} ${styles.panel}`}>
        <div className={styles.content}>
          <h2 id="servicios-invitacion-titulo" className={styles.title}>
            {CONTENT.title}
          </h2>
          <p className={styles.text}>{CONTENT.text}</p>
          {whatsappHref ? (
            <a
              href={whatsappHref}
              className={styles.button}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hablemos de tu proyecto por WhatsApp (se abre en una pestaña nueva)"
            >
              Hablemos de tu proyecto
            </a>
          ) : (
            <span className={styles.button} aria-disabled="true">
              Hablemos de tu proyecto
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
