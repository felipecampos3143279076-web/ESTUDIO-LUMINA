"use client";

import { useEffect } from "react";

// Activa las animaciones de entrada de la página de proyecto. No renderiza nada:
// lo visible al cargar se anima solo con CSS; lo que está por debajo, una vez
// al entrar en pantalla.
export default function ProjectReveal({ rootId }: { rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = [...root.querySelectorAll<HTMLElement>("[data-reveal-item]")].filter(
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
  }, [rootId]);

  return null;
}
