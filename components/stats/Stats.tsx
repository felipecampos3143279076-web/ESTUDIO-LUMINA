"use client";

import { useEffect, useRef } from "react";
import styles from "./Stats.module.css";

// CIFRAS: valores provisionales, se editan aquí directamente.
const STATS = [
  { value: "+5", label: "Proyectos realizados" },
  { value: "10", label: "Años de experiencia" },
  { value: "+5", label: "Espacios transformados" },
  { value: "+100", label: "Clientes satisfechos" },
];

export default function Stats() {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Si ya está a la vista al cargar, se muestra sin animar.
    if (list.getBoundingClientRect().top < innerHeight * 0.85) return;

    list.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        list.dataset.reveal = "done";
        observer.disconnect();
      },
      { threshold: 0.3 },
    );
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="cifras" className={styles.section} aria-labelledby="cifras-titulo">
      <h2 id="cifras-titulo" className={styles.srOnly}>
        Cifras del estudio
      </h2>
      <ul ref={listRef} className={styles.list}>
        {STATS.map(({ value, label }, index) => (
          <li
            key={label}
            className={styles.item}
            style={{ "--i": index } as React.CSSProperties}
          >
            <p className={styles.value}>{value}</p>
            <p className={styles.label}>{label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
