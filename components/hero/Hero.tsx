"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import SiteHeader from "@/components/nav/SiteHeader";
import styles from "./Hero.module.css";

// FOTOGRAFÍA DEL HERO: copia el archivo en public/imagenes/ y rellena estos dos
// valores, por ejemplo src: "/imagenes/hero.jpg". Con src vacío se ve el panel gris.
const HERO_IMAGE = {
  src: "/imagenes/banner1.jpg",
  alt: "imagen 1",
};

const STACKED_BELOW = 700;
const STACKED_MENU_GAP = 64;

type HeroProps = {
  scrollLength?: number;
  customCursor?: boolean;
  imageAnchor?: "derecha" | "izquierda";
};

export default function Hero({
  scrollLength = 250,
  customCursor = true,
  imageAnchor = "derecha",
}: HeroProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    const left = leftRef.current;
    const header = headerRef.current;
    const row = rowRef.current;
    const panel = panelRef.current;
    const inner = innerRef.current;
    if (!wrap || !stage || !left || !header || !row || !panel || !inner) return;
    const cursor = cursorRef.current;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");

    let p = 0;
    let tgt = 0;
    let mx = -100;
    let my = -100;
    let cx = -100;
    let cy = -100;
    let raf = 0;
    let onScreen = true;
    let hasMouse = false;
    let cursorOn = false;
    let layoutDirty = true;

    const onScroll = () => {
      const total = wrap.offsetHeight - stage.offsetHeight;
      tgt = Math.min(1, Math.max(0, -wrap.getBoundingClientRect().top / total));
      wake();
    };

    const applyLayout = () => {
      const W = innerWidth;
      const H = stage.offsetHeight;
      const pad = W < STACKED_BELOW ? 20 : 40;
      const rowH = row.offsetHeight;

      if (W < STACKED_BELOW) {
        // Misma progresión que en escritorio, sobre el eje vertical.
        const img0 = Math.max(0, H - pad * 3 - header.offsetHeight - rowH - STACKED_MENU_GAP);
        const imgH = img0 * (1 - p);
        panel.style.width = "";
        panel.style.top = "";
        panel.style.right = "";
        panel.style.bottom = pad + "px";
        panel.style.height = imgH + "px";
        panel.style.visibility = imgH < 0.5 ? "hidden" : "visible";
        inner.style.width = "";
        inner.style.height = img0 + "px";
        left.style.top = "";
        left.style.left = "";
        left.style.right = "";
        left.style.bottom = pad + (img0 + pad) * (1 - p) + "px";
      } else {
        const img0 = W * 0.36;
        const imgW = img0 * (1 - p);
        panel.style.width = imgW + "px";
        panel.style.height = "";
        panel.style.right = pad + "px";
        panel.style.top = panel.style.bottom = pad + "px";
        panel.style.visibility = imgW < 0.5 ? "hidden" : "visible";
        inner.style.width = img0 + "px";
        inner.style.height = "";
        left.style.left = left.style.top = left.style.bottom = pad + "px";
        left.style.right = pad + (img0 + pad) * (1 - p) + "px";
      }

      row.style.transform = `translate3d(0,${-(H / 2 - pad - rowH / 2) * p}px,0)`;
    };

    const applyCursor = () => {
      if (!cursor) return;
      const rect = wrap.getBoundingClientRect();
      const inside =
        hasMouse &&
        onScreen &&
        mx >= rect.left &&
        mx <= rect.right &&
        my >= rect.top &&
        my <= rect.bottom;
      if (inside !== cursorOn) {
        cursorOn = inside;
        cursor.style.visibility = inside ? "visible" : "hidden";
        if (inside) wrap.dataset.cursor = "on";
        else delete wrap.dataset.cursor;
      }
      if (inside) cursor.style.transform = `translate3d(${cx}px,${cy}px,0)`;
    };

    const tick = () => {
      raf = 0;
      const reduce = motion.matches;
      const prev = p;
      p += (tgt - p) * (reduce ? 1 : 0.14);
      if (Math.abs(tgt - p) < 0.0005) p = tgt;
      cx += (mx - cx) * (reduce ? 1 : 0.18);
      cy += (my - cy) * (reduce ? 1 : 0.18);
      if (Math.abs(mx - cx) < 0.1) cx = mx;
      if (Math.abs(my - cy) < 0.1) cy = my;

      if (p !== prev || layoutDirty) {
        layoutDirty = false;
        applyLayout();
      }
      applyCursor();

      // El bucle se detiene en reposo; los eventos lo vuelven a activar.
      if (p !== tgt || (hasMouse && (cx !== mx || cy !== my))) wake();
    };

    function wake() {
      if (!raf && onScreen) raf = requestAnimationFrame(tick);
    }

    const invalidateLayout = () => {
      layoutDirty = true;
      wake();
    };

    const onResize = () => {
      layoutDirty = true;
      onScroll();
    };

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") {
        hasMouse = false;
        applyCursor();
        return;
      }
      mx = e.clientX;
      my = e.clientY;
      if (!hasMouse) {
        hasMouse = true;
        cx = mx;
        cy = my;
      }
      wake();
    };

    const onMouseLeave = () => {
      hasMouse = false;
      applyCursor();
    };

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) {
        onScroll();
      } else {
        cancelAnimationFrame(raf);
        raf = 0;
        // Sin animar fuera de pantalla: al volver, el estado ya es el correcto.
        p = tgt;
        applyLayout();
        applyCursor();
      }
    });
    const rowObserver = new ResizeObserver(invalidateLayout);

    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onResize);
    addEventListener("pointermove", onPointer, { passive: true });
    addEventListener("pointerdown", onPointer, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    observer.observe(wrap);
    rowObserver.observe(row);
    rowObserver.observe(header);
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onResize);
      removeEventListener("pointermove", onPointer);
      removeEventListener("pointerdown", onPointer);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      observer.disconnect();
      rowObserver.disconnect();
      delete wrap.dataset.cursor;
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={styles.wrap}
      style={{ "--scroll-length": scrollLength } as React.CSSProperties}
    >
      <div ref={stageRef} className={styles.stage}>
        <div ref={leftRef} className={styles.left}>
          <SiteHeader ref={headerRef} />
          <div ref={rowRef} className={styles.row}>
            <div>
              <h1 className={styles.title}>
                Diseñamos espacios que inspiran nuevas formas de vivir
              </h1>
              <p className={styles.subtitle}>
                Arquitectura e interiorismo pensados para transformar espacios en
                experiencias
              </p>
            </div>
            <span className={styles.scrollHint} aria-hidden="true">
              scroll
            </span>
          </div>
        </div>
        {/* Espacio de la fotografía: se configura en HERO_IMAGE, al inicio del archivo. */}
        <div
          ref={panelRef}
          className={styles.panel}
          aria-hidden={HERO_IMAGE.src ? undefined : true}
        >
          <div
            ref={innerRef}
            className={styles.inner}
            style={imageAnchor === "derecha" ? { right: 0 } : { left: 0 }}
          >
            {HERO_IMAGE.src && (
              <Image
                src={HERO_IMAGE.src}
                alt={HERO_IMAGE.alt}
                fill
                preload
                sizes="(max-width: 699.98px) calc(100vw - 40px), 36vw"
                className={styles.photo}
              />
            )}
          </div>
        </div>
        {customCursor && <div ref={cursorRef} className={styles.cursor} aria-hidden="true" />}
      </div>
    </div>
  );
}
