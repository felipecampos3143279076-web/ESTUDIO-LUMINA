import Image from "next/image";
import Link from "next/link";
import layout from "@/components/layout/Container.module.css";
import ProjectReveal from "./ProjectReveal";
import styles from "./ProjectDetail.module.css";
import type { Project, ProjectImage } from "./projects";

// Plantilla única de las páginas individuales de proyecto.
// Los datos y fotografías se editan en projects.ts.
export default function ProjectDetail({ project }: { project: Project }) {
  const { name, location, main, secondary, description } = project;

  return (
    <article
      id="proyecto"
      className={`${layout.section} ${styles.page}`}
      aria-labelledby="proyecto-titulo"
    >
      <ProjectReveal rootId="proyecto" />
      <div className={layout.container}>
        <nav className={styles.breadcrumb} aria-label="Ruta de navegación">
          <Link href="/proyectos" className={styles.crumbLink}>
            Proyectos
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{name}</span>
        </nav>

        <header className={`${styles.header} ${styles.fade}`} data-reveal-item>
          <h1 id="proyecto-titulo" className={styles.title}>
            {name}
          </h1>
          <p className={styles.location}>{location}</p>
        </header>

        <Photo
          image={main}
          label={`Fotografía principal · ${name} · 16:9`}
          className={styles.main}
          sizes="(max-width: 699.98px) calc(100vw - 40px), (max-width: 1024px) calc(100vw - 80px), 82vw"
          preload
        />
        <div className={styles.secondary}>
          {secondary.map((image, index) => (
            <Photo
              key={index}
              image={image}
              label={`Fotografía complementaria ${index + 1} · 4:5`}
              className={styles.detail}
              sizes="(max-width: 699.98px) calc(100vw - 40px), 41vw"
            />
          ))}
        </div>

        <section
          className={`${styles.about} ${styles.fade}`}
          aria-labelledby="sobre-el-proyecto"
          data-reveal-item
        >
          <h2 id="sobre-el-proyecto" className={styles.aboutTitle}>
            Sobre el proyecto
          </h2>
          <div className={styles.aboutText}>
            {description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <nav
          className={`${styles.footerNav} ${styles.fade}`}
          aria-label="Navegación del proyecto"
          data-reveal-item
        >
          <Link href="/proyectos" className={styles.back}>
            <span aria-hidden="true">←</span>
            Volver a proyectos
          </Link>
          <Link href="/contacto" className={styles.button}>
            Hablemos de tu proyecto
          </Link>
        </nav>
      </div>
    </article>
  );
}

function Photo({
  image,
  label,
  className,
  sizes,
  preload = false,
}: {
  image: ProjectImage;
  label: string;
  className: string;
  sizes: string;
  preload?: boolean;
}) {
  return (
    <figure
      className={`${styles.figure} ${className}`}
      aria-hidden={image.src ? undefined : true}
      data-reveal-item
    >
      <div className={styles.frame}>
        <div className={styles.media}>
          {image.src ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              preload={preload}
              sizes={sizes}
              className={styles.photo}
            />
          ) : (
            <span className={styles.placeholder}>{label}</span>
          )}
        </div>
      </div>
    </figure>
  );
}
