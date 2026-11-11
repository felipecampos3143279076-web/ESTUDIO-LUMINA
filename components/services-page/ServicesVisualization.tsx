"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import layout from "@/components/layout/Container.module.css";
import styles from "./ServicesVisualization.module.css";

// TEXTO: provisional, se puede editar aquí directamente.
const CONTENT = {
  title: "Visualización arquitectónica",
  text: "Convertimos las ideas en imágenes antes de construirlas. Con modelos y renders cuidados, cada proyecto se puede recorrer, comprender y ajustar desde las primeras fases, para tomar decisiones con claridad y comunicar la propuesta con precisión.",
  services: [
    "Modelado 3D",
    "Renders interiores",
    "Renders exteriores",
    "Presentación visual de proyectos",
  ],
};

// FOTOGRAFÍA: copia el archivo en public/imagenes/ y rellena src y alt, por
// ejemplo src: "/imagenes/servicios-visualizacion.jpg". Con src vacío se ve el
// marcador. Formato vertical 4:5 (4:3 en móvil); recomendado 1600 × 2000 px o más.
const IMAGE = { label: "Fotografía visualización · 4:5", src: "", alt: "" };

export default function ServicesVisualization() {
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
      aria-labelledby="visualizacion-titulo"
    >
      <div className={`${layout.container} ${styles.grid}`}>
        <div className={styles.text} data-reveal-item>
          <h2 id="visualizacion-titulo" className={styles.title}>
            {CONTENT.title}
          </h2>
          <p className={styles.paragraph}>{CONTENT.text}</p>
          <ul className={styles.list}>
            {CONTENT.services.map((service) => (
              <li key={service} className={styles.item}>
                {service}
              </li>
            ))}
          </ul>
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
                  sizes="(max-width: 699.98px) calc(100vw - 40px), (max-width: 1024px) 46vw, 34vw"
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
