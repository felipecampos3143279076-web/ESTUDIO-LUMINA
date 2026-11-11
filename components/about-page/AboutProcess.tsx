"use client";

import { useEffect, useRef } from "react";
import layout from "@/components/layout/Container.module.css";
import styles from "./AboutProcess.module.css";

// TEXTO: provisional, se puede editar aquí directamente.
const CONTENT = {
  eyebrow: "Nuestra forma de trabajar",
  title: "Cada proyecto tiene su propio proceso",
  steps: [
    {
      name: "Escuchar",
      text: "Conocemos a las personas, el lugar y sus necesidades antes de proponer cualquier idea.",
    },
    {
      name: "Diseñar",
      text: "Traducimos lo aprendido en una propuesta clara de espacios, luz y materiales.",
    },
    {
      name: "Desarrollar",
      text: "Definimos cada detalle técnico y coordinamos el proyecto para que sea viable.",
    },
    {
      name: "Materializar",
      text: "Acompañamos la obra hasta que el espacio queda listo para ser habitado.",
    },
  ],
};

export default function AboutProcess() {
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
      aria-labelledby="proceso-titulo"
    >
      <div className={layout.container}>
        <div className={styles.header} data-reveal-item>
          <p className={styles.eyebrow}>{CONTENT.eyebrow}</p>
          <h2 id="proceso-titulo" className={styles.title}>
            {CONTENT.title}
          </h2>
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
