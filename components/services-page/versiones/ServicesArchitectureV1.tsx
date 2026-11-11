"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
// VERSIÓN ANTERIOR del bloque Arquitectura (título, párrafo y lista), guardada
// mientras se revisa la nueva composición. No se usa en ninguna página.
import layout from "@/components/layout/Container.module.css";
import styles from "./ServicesArchitectureV1.module.css";

// TEXTO: provisional, se puede editar aquí directamente.
const CONTENT = {
  title: "Arquitectura",
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
// marcador. Formato vertical 4:5; recomendado 1600 × 2000 px o más.
const IMAGE = { label: "Fotografía arquitectura · 4:5", src: "", alt: "" };

export default function ServicesArchitectureV1() {
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
      aria-labelledby="arquitectura-titulo"
    >
      <div className={`${layout.container} ${styles.grid}`}>
        <div className={styles.text} data-reveal-item>
          <h2 id="arquitectura-titulo" className={styles.title}>
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
