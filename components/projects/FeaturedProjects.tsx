"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import styles from "./FeaturedProjects.module.css";

// PROYECTOS: textos y rutas fijas. Las páginas de destino aún no existen.
// FOTOGRAFÍAS: copia cada archivo en public/imagenes/ y rellena su src, por
// ejemplo src: "/imagenes/proyecto-house.jpg". Con src vacío se ve el marcador
// gris. Formato vertical 3:4; recomendado 1200 × 1600 px o más. El alt puede
// quedar vacío: el nombre del proyecto ya describe el enlace.
const PROJECTS = [
  {
    name: "House",
    location: "Copenhague, Dinamarca",
    href: "/proyectos/house",
    image: { label: "Imagen · House", src: "/imagenes/house.jpg", alt: "" },
  },
  {
    name: "VIA 57 West",
    location: "Nueva York, Estados Unidos",
    href: "/proyectos/via-57-west",
    image: { label: "Imagen · VIA 57 West", src: "/imagenes/via57west.jpg", alt: "" },
  },
  {
    name: "CopenHill",
    location: "Copenhague, Dinamarca",
    href: "/proyectos/copenhill",
    image: { label: "Imagen · CopenHill", src: "/imagenes/copenhill.jpg", alt: "" },
  },
];

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Cada elemento se anima al entrar; si ya está a la vista al cargar, no.
    const items = [...section.querySelectorAll<HTMLElement>("[data-reveal-item]")].filter(
      (item) => item.getBoundingClientRect().top >= innerHeight * 0.85,
    );
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const item = entry.target as HTMLElement;
          item.dataset.reveal = "done";
          observer.unobserve(item);
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
      id="proyectos"
      className={styles.section}
      aria-labelledby="proyectos-titulo"
    >
      <div className={styles.inner}>
        <div className={styles.header} data-reveal-item>
          <h2 id="proyectos-titulo" className={styles.title}>
            Proyectos destacados
          </h2>
          <Link href="/proyectos" className={styles.all}>
            Ver todos
            <span className={styles.arrow} aria-hidden="true">
              →
            </span>
          </Link>
        </div>
        <ul className={styles.grid}>
          {PROJECTS.map(({ name, location, href, image }, index) => (
            <li key={href}>
              <Link
                href={href}
                prefetch={false}
                className={styles.card}
                data-reveal-item
                style={{ "--i": index } as React.CSSProperties}
              >
                <div className={styles.figure}>
                  <div className={styles.media}>
                    <div className={styles.zoom}>
                      {image.src ? (
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(max-width: 699.98px) calc(100vw - 40px), (max-width: 1024px) calc(33vw - 40px), 27vw"
                          className={styles.photo}
                        />
                      ) : (
                        <span className={styles.placeholder} aria-hidden="true">
                          {image.label}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.meta}>
                  <h3 className={styles.name}>
                    {name}
                    <span className={styles.cardArrow} aria-hidden="true">
                      →
                    </span>
                  </h3>
                  <p className={styles.location}>{location}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
