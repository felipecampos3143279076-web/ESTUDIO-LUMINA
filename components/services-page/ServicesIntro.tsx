"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import layout from "@/components/layout/Container.module.css";
import styles from "./ServicesIntro.module.css";

// TEXTO: provisional, se puede editar aquí directamente.
const CONTENT = {
  text: "Acompañamos cada encargo de principio a fin, desde la primera idea hasta el último detalle. Reunimos arquitectura, diseño interior y dirección de obra en un mismo proceso, con una mirada atenta a la luz, los materiales y la forma de habitar, para crear espacios coherentes, funcionales y pensados para durar.",
};

// FOTOGRAFÍA: copia el archivo en public/imagenes/ y rellena src y alt, por
// ejemplo src: "/imagenes/servicios-principal.jpg". Con src vacío se ve el
// marcador. Formato horizontal 16:9; recomendado 2400 × 1350 px o más.
const IMAGE = { label: "Fotografía principal · 16:9", src: "", alt: "" };

export default function ServicesIntro() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Lo visible al cargar se anima solo con CSS; lo que está por debajo,
    // una vez al entrar en pantalla.
    const items = [...section.querySelectorAll<HTMLElement>("[data-reveal-item]")].filter(
      (item) => item.getBoundingClientRect().top >= innerHeight * 0.9,
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
      aria-labelledby="servicios-titulo"
    >
      <div className={`${layout.container} ${styles.grid}`}>
        <h1 id="servicios-titulo" className={styles.title} data-reveal-item>
          <span className={styles.line}>Servicios que dan forma</span>{" "}
          <span className={styles.line}>a tus ideas</span>
        </h1>
        <p className={styles.text} data-reveal-item>
          {CONTENT.text}
        </p>
        <figure className={styles.figure} data-reveal-item aria-hidden={IMAGE.src ? undefined : true}>
          <div className={styles.frame}>
            <div className={styles.media}>
              {IMAGE.src ? (
                <Image
                  src={IMAGE.src}
                  alt={IMAGE.alt}
                  fill
                  preload
                  sizes="(max-width: 699.98px) calc(100vw - 40px), (max-width: 1024px) calc(100vw - 80px), 82vw"
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
