"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import layout from "@/components/layout/Container.module.css";
import styles from "./ServicesArchitectureMonografia.module.css";

// VERSIÓN «Monografía» (no aprobada), guardada para consulta. No se usa en
// ninguna página. Composición como la doble página de un
// libro de arquitectura. La versión anterior está guardada en
// components/services-page/versiones/ServicesArchitectureV1.tsx.

// TEXTO: provisional, se puede editar aquí directamente.
const CONTENT = {
  number: "01",
  // El titular se parte en dos líneas: «Arqui–» / «tectura».
  title: ["Arqui", "tectura"],
  text: "Proyectamos edificios y espacios que dialogan con su entorno y con quienes los habitan. Cada propuesta nace del estudio del lugar, la luz y el programa, y se desarrolla con rigor técnico para llegar a una arquitectura clara, funcional y duradera.",
  services: [
    "Diseño arquitectónico",
    "Diseño de vivienda",
    "Diseño de espacios comerciales",
    "Desarrollo y planificación de proyectos",
  ],
};

// FOTOGRAFÍA: copia el archivo en public/imagenes/ y rellena src y alt, por
// ejemplo src: "/imagenes/servicios-arquitectura.jpg". Con src vacío se ve el
// marcador. Formato vertical 4:5 (4:3 en móvil); recomendado 1600 × 2000 px o más.
// caption: pie de foto opcional (por ejemplo, el nombre del proyecto). Vacío,
// solo se ve la línea de cota.
const IMAGE = { label: "Fotografía arquitectura · 4:5", src: "", alt: "", caption: "" };

export default function ServicesArchitectureMonografia() {
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
      aria-labelledby="arquitectura-titulo"
    >
      <div className={`${layout.container} ${styles.grid}`}>
        <header className={styles.head} data-reveal-item>
          <h2 id="arquitectura-titulo" className={styles.title} aria-label={CONTENT.title.join("")}>
            <span className={styles.line} aria-hidden="true">
              {CONTENT.title[0]}
            </span>
            <span className={styles.line} aria-hidden="true">
              {CONTENT.title[1]}
            </span>
          </h2>
          <span className={styles.number} aria-hidden="true">
            {CONTENT.number}
          </span>
        </header>

        <figure className={styles.figure} data-reveal-item>
          <div className={styles.frame} aria-hidden={IMAGE.src ? undefined : true}>
            <div className={styles.media}>
              {IMAGE.src ? (
                <Image
                  src={IMAGE.src}
                  alt={IMAGE.alt}
                  fill
                  sizes="(max-width: 699.98px) calc(100vw - 40px), (max-width: 1024px) 46vw, 48vw"
                  className={styles.photo}
                />
              ) : (
                <span className={styles.placeholder}>{IMAGE.label}</span>
              )}
            </div>
          </div>
          {/* Cota: línea de medida con remates, firma gráfica del bloque. */}
          <figcaption className={styles.caption}>
            <span className={styles.dimension} aria-hidden="true" />
            {IMAGE.caption && <span className={styles.captionText}>{IMAGE.caption}</span>}
          </figcaption>
        </figure>

        <div className={styles.body}>
          <p className={styles.paragraph} data-reveal-item>
            {CONTENT.text}
          </p>
          <ol className={styles.index} aria-label="Áreas del servicio">
            {CONTENT.services.map((service, index) => (
              <li
                key={service}
                className={styles.entry}
                data-reveal-item
                style={{ "--i": index } as React.CSSProperties}
              >
                <span className={styles.name}>{service}</span>
                <span className={styles.leader} aria-hidden="true" />
                <span className={styles.entryNumber} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
