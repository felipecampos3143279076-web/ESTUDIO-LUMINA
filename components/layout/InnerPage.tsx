import SiteHeader from "@/components/nav/SiteHeader";
// Mismo degradado global que Inicio.
import home from "@/app/page.module.css";
import styles from "./InnerPage.module.css";

// Estructura común de las páginas interiores: menú arriba y contenido debajo.
export default function InnerPage({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <div className={styles.bar}>
        <SiteHeader />
      </div>
      <main className={`${home.main} ${styles.main}`}>{children}</main>
    </>
  );
}
