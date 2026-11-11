"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SiteHeader.module.css";

const NAV_LINKS = [
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/servicios", label: "Servicios" },
];

type SiteHeaderProps = {
  ref?: React.Ref<HTMLElement>;
};

// Menú del sitio: el Hero de Inicio lo integra y las páginas interiores lo usan solo.
export default function SiteHeader({ ref }: SiteHeaderProps) {
  const pathname = usePathname();
  const current = (href: string) => (href === pathname ? "page" : undefined);

  return (
    <header ref={ref} className={styles.header}>
      <Link
        href="/"
        className={styles.brand}
        aria-label="Estudio Lúmina, inicio"
        aria-current={current("/")}
      >
        <span className={styles.brandKind}>Estudio</span>
        <span className={styles.brandRule} />
        <span className={styles.brandName}>LÚMINA</span>
      </Link>
      <nav className={styles.nav} aria-label="Principal">
        <ul className={styles.navList}>
          {NAV_LINKS.map(({ href, label }) => (
            <li key={label}>
              <Link href={href} className={styles.navLink} aria-current={current(href)}>
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contacto"
              className={`${styles.navLink} ${styles.contact}`}
              aria-current={current("/contacto")}
            >
              Contacto
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
