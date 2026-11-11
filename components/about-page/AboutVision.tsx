"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import layout from "@/components/layout/Container.module.css";
import styles from "./AboutVision.module.css";

// TEXTO: provisional, se puede editar aquí directamente.
const CONTENT = {
  eyebrow: "Nuestra visión",
  title: "Creemos en una arquitectura que trasciende el espacio y mejora la forma de vivir",
  text: "Aspiramos a crear lugares que acompañen a las personas durante años: espacios que se adapten a su vida cotidiana, que envejezcan con dignidad y que mantengan una relación respetuosa con su entorno.",
};

// FOTOGRAFÍA: copia el archivo en public/imagenes/ y rellena src y alt, por
// ejemplo src: "/imagenes/sobre-nosotros-vision.jpg". Con src vacío se ve el
// marcador. Formato vertical 4:5; recomendado 1600 × 2000 px o más.
const IMAGE = { label: "Fotografía vertical · 4:5", src: "", alt: "" };

export default function AboutVision() {
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
      aria-labelledby="vision-titulo"
    >
      <div className={`${layout.container} ${styles.grid}`}>
        {/* En el código el texto va primero (orden de lectura y móvil). */}
        <div className={styles.text} data-reveal-item>
          <p className={styles.eyebrow}>{CONTENT.eyebrow}</p>
          <h2 id="vision-titulo" className={styles.title}>
            {CONTENT.title}
          </h2>
          <p className={styles.paragraph}>{CONTENT.text}</p>
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
                  sizes="(max-width: 699.98px) calc(100vw - 40px), 41vw"
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
