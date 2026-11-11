"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import layout from "@/components/layout/Container.module.css";
import styles from "./AboutPhilosophy.module.css";

// TEXTO: provisional, se puede editar aquí directamente.
const CONTENT = {
  title: "Nuestra filosofía",
  paragraphs: [
    "Creemos que la buena arquitectura empieza por escuchar. Cada encargo parte de entender cómo se vive, se trabaja o se comparte un espacio, para proponer soluciones que respondan con naturalidad a esas necesidades.",
    "Buscamos la claridad en lo esencial: la luz natural, la proporción, los materiales honestos y los detalles bien resueltos. Preferimos espacios serenos y duraderos a soluciones efímeras.",
  ],
};

// FOTOGRAFÍA: copia el archivo en public/imagenes/ y rellena src y alt, por
// ejemplo src: "/imagenes/sobre-nosotros-filosofia.jpg". Con src vacío se ve el
// marcador. Formato vertical 4:5; recomendado 1600 × 2000 px o más.
const IMAGE = { label: "Fotografía vertical · 4:5", src: "", alt: "" };

export default function AboutPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Cada bloque se anima una vez al entrar; si ya está a la vista al cargar, no.
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
      aria-labelledby="filosofia-titulo"
    >
      <div className={`${layout.container} ${styles.grid}`}>
        <div className={styles.text} data-reveal-item>
          <h2 id="filosofia-titulo" className={styles.title}>
            {CONTENT.title}
          </h2>
          {CONTENT.paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
        <figure
          className={styles.figure}
          data-reveal-item
          aria-hidden={IMAGE.src ? undefined : true}
        >
          <div className={styles.frame}>
            <div className={styles.media}>
              {IMAGE.src ? (
                <Image
                  src={IMAGE.src}
                  alt={IMAGE.alt}
                  fill
                  sizes="(max-width: 699.98px) calc(100vw - 40px), (max-width: 1024px) 42vw, 34vw"
                  className={styles.photo}
                />
              ) : (
                <span className={styles.placeholder}>{IMAGE.label}</span>
              )}
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
