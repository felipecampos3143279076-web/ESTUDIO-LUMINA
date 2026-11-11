"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import styles from "./AboutSummary.module.css";

// TEXTO DE LA SECCIÓN: provisional, se puede editar aquí directamente.
const CONTENT = {
  title: "Arquitectura que nace de la luz y de la forma de habitar",
  description:
    "Somos un estudio de arquitectura e interiorismo. Acompañamos cada proyecto desde la primera idea hasta el último detalle, para crear espacios serenos, funcionales y pensados para quienes los viven.",
  link: {
    label: "Conoce nuestro estudio",
    href: "/sobre-nosotros",
  },
};

// FOTOGRAFÍAS: copia los archivos en public/imagenes/ y rellena src y alt,
// por ejemplo src: "/imagenes/sobre-nosotros-1.jpg". Con src vacío se ve el
// marcador gris. Formato vertical 3:4; recomendado 1200 × 1600 px o más.
const IMAGES = [
  { label: "Imagen 1", src: "/imagenes/sobrenosotros1.jpg"
    , alt: "" },
  { label: "Imagen 2", src: "/imagenes/sobrenosotros2.jpg"
    , alt: "" },
];

export default function AboutSummary() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Si ya está a la vista al cargar, se muestra sin animar.
    if (reduce || section.getBoundingClientRect().top < innerHeight * 0.85) return;

    section.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        section.dataset.reveal = "done";
        observer.disconnect();
      },
      { threshold: 0.2 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sobre-nosotros"
      className={styles.section}
      aria-labelledby="sobre-nosotros-titulo"
    >
      <div className={styles.text}>
        <h2 id="sobre-nosotros-titulo" className={styles.title}>
          {CONTENT.title}
        </h2>
        <p className={styles.description}>{CONTENT.description}</p>
        <Link href={CONTENT.link.href} className={styles.link}>
          {CONTENT.link.label}
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        </Link>
      </div>
      <div className={styles.gallery}>
        {IMAGES.map(({ label, src, alt }) => (
          <figure key={label} className={styles.figure} aria-hidden={src ? undefined : true}>
            <div className={styles.media}>
              {src ? (
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(max-width: 699.98px) calc(50vw - 26px), (max-width: 1024px) calc(50vw - 56px), 27vw"
                  className={styles.photo}
                />
              ) : (
                <span className={styles.placeholder}>{label}</span>
              )}
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
