"use client";

import { useEffect, useRef } from "react";
import layout from "@/components/layout/Container.module.css";
import styles from "./ServicesProcess.module.css";

// TEXTO: la introducción es provisional; se puede editar aquí directamente.
const CONTENT = {
  title: "Un proceso pensado para cada proyecto",
  intro:
    "Cada encargo es distinto, pero todos comparten un mismo método: escuchar con atención, pensar con calma y resolver con precisión. Así avanzamos paso a paso, con decisiones claras y compartidas.",
  steps: [
    {
      name: "Escuchar",
      text: "Conocemos las necesidades, ideas y expectativas del cliente.",
    },
    {
      name: "Conceptualizar",
      text: "Definimos el concepto y la dirección del proyecto.",
    },
    {
      name: "Diseñar",
      text: "Desarrollamos las propuestas arquitectónicas y de diseño.",
    },
    {
      name: "Desarrollar",
      text: "Damos forma a los detalles y desarrollamos la propuesta del proyecto.",
    },
  ],
};

export default function ServicesProcess() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Cada elemento se anima una vez al entrar; si ya está a la vista al cargar, no.
    const items = [...section.querySelectorAll<HTMLElement>("[data-reveal-item]")].filter(
      (item) => item.getBoundingClientRect().top >= innerHeight * 0.85,
    );
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.reveal = "done";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 },
    );
    for (const item of items) {
      item.dataset.reveal = "pending";
      observer.observe(item);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${layout.section} ${styles.section}`}
      aria-labelledby="servicios-proceso-titulo"
    >
      <div className={layout.container}>
        <div className={styles.header} data-reveal-item>
          <h2 id="servicios-proceso-titulo" className={styles.title}>
            {CONTENT.title}
          </h2>
          <p className={styles.intro}>{CONTENT.intro}</p>
        </div>
        <ol className={styles.steps}>
          {CONTENT.steps.map(({ name, text }, index) => (
            <li
              key={name}
              className={styles.step}
              data-reveal-item
              style={{ "--i": index } as React.CSSProperties}
            >
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.name}>{name}</h3>
              <p className={styles.text}>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
