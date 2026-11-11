"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import layout from "@/components/layout/Container.module.css";
import styles from "./ServicesArchitecture.module.css";

// PRUEBA VISUAL «Planta»: el bloque se dibuja como la planta de un edificio.
// La fotografía es el patio, el titular ocupa el vestíbulo y cada área es una
// estancia. Versiones anteriores en components/services-page/versiones/.

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
// marcador. Formato vertical 4:5 (4:3 en móvil); recomendado 1600 × 2000 px o más.
const IMAGE = { label: "Fotografía arquitectura · 4:5", src: "", alt: "" };

// Puerta de plano: hoja y arco de giro. Decorativa.
function Door({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M0.5 0 V31.5 A31.5 31.5 0 0 0 32 0" />
    </svg>
  );
}

export default function ServicesArchitecture() {
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
      { threshold: 0.15 },
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
      <div className={layout.container}>
        {/* Cota general sobre la planta. */}
        <span className={styles.dimension} aria-hidden="true" />

        <div className={styles.plan} data-reveal-item>
          <figure className={styles.patio}>
            <div className={styles.frame} aria-hidden={IMAGE.src ? undefined : true}>
              <div className={styles.media}>
                {IMAGE.src ? (
                  <Image
                    src={IMAGE.src}
                    alt={IMAGE.alt}
                    fill
                    sizes="(max-width: 699.98px) calc(100vw - 80px), (max-width: 1024px) 44vw, 46vw"
                    className={styles.photo}
                  />
                ) : (
                  <span className={styles.placeholder}>{IMAGE.label}</span>
                )}
              </div>
            </div>
          </figure>

          <div className={styles.hall}>
            <h2 id="arquitectura-titulo" className={styles.title}>
              {CONTENT.title}
            </h2>
            <span className={styles.rule} aria-hidden="true" />
            <p className={styles.paragraph}>{CONTENT.text}</p>
          </div>

          <ul className={styles.rooms} aria-label="Áreas del servicio">
            {CONTENT.services.map((service, index) => (
              <li
                key={service}
                className={styles.room}
                style={{ "--i": index } as React.CSSProperties}
              >
                <span className={styles.name}>{service}</span>
                {index > 0 && <Door className={styles.door} />}
                {index === CONTENT.services.length - 1 && (
                  <Door className={styles.entrance} />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
