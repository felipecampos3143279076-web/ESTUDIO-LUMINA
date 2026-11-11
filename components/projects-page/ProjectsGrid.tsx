"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import layout from "@/components/layout/Container.module.css";
import styles from "./ProjectsGrid.module.css";
// Datos y fotografías de las tarjetas (campo card): ver projects.ts.
import { PROJECTS, projectHref } from "./projects";

export default function ProjectsGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Cada tarjeta se anima una vez al entrar; si ya está a la vista al cargar, no.
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
      aria-labelledby="proyectos-titulo"
    >
      <div className={layout.container}>
        <h1 id="proyectos-titulo" className={styles.title}>
          Proyectos
        </h1>
        <ul className={styles.grid}>
          {PROJECTS.map(({ slug, name, location, card: image }, index) => {
            const card = (
              <>
                <div className={styles.figure}>
                  <div className={styles.frame}>
                    <div className={styles.media}>
                      <div className={styles.zoom}>
                        {image.src ? (
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(max-width: 699.98px) calc(100vw - 40px), (max-width: 1024px) calc(50vw - 56px), 27vw"
                            className={styles.photo}
                          />
                        ) : (
                          <span className={styles.placeholder} aria-hidden="true">
                            Imagen · {name}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.meta}>
                  <h2 className={styles.name}>
                    {name}
                    <span className={styles.arrow} aria-hidden="true">
                      →
                    </span>
                  </h2>
                  <p className={styles.location}>{location}</p>
                </div>
              </>
            );
            return (
              <li
                key={name}
                className={styles.item}
                data-reveal-item
                style={{ "--i": index % 3 } as React.CSSProperties}
              >
                <Link href={projectHref(slug)} className={`${styles.card} ${styles.linked}`}>
                  {card}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
