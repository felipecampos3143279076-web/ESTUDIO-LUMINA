"use client";

import { useEffect, useRef } from "react";
import styles from "./Contact.module.css";

// DATOS DE CONTACTO: rellena los campos vacíos cuando estén definidos.
// whatsapp: solo dígitos con indicativo de país, por ejemplo "57XXXXXXXXXX".
const CONTACT = {
  title: "Hablemos de tu próximo proyecto",
  text: "Cuéntanos qué espacio quieres transformar. Te acompañamos desde la primera conversación hasta la entrega.",
  whatsapp: "",
  whatsappMessage: "Hola, quiero hablar sobre un proyecto con Estudio Lúmina.",
  phone: "",
  email: "",
  address: "Carrera sexta #45-53, barrio Restrepo, Ibagué, Tolima, Colombia",
  // Opcional: enlace de Google Maps > Compartir > Insertar un mapa (solo el valor
  // de src). Muestra el marcador exacto; vacío, el mapa se busca por la dirección.
  mapEmbedUrl: "",
};

// Sin clave de API: si no hay mapEmbedUrl, se usa la búsqueda por dirección.
const MAP_SRC =
  CONTACT.mapEmbedUrl ||
  `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3977.8553211184244!2d-75.21159559641876!3d4.4380243650419064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sco!4v1793980235525!5m2!1ses-419!2sco" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>`;

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Si ya está a la vista al cargar, se muestra sin animar.
    if (section.getBoundingClientRect().top < innerHeight * 0.85) return;

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

  const whatsappHref = CONTACT.whatsapp
    ? `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`
    : "";

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className={styles.section}
      aria-labelledby="contacto-titulo"
    >
      <div className={styles.layout}>
        <div className={`${styles.intro} ${styles.reveal}`}>
          <h2 id="contacto-titulo" className={styles.title}>
            {CONTACT.title}
          </h2>
          <p className={styles.text}>{CONTACT.text}</p>
        </div>

        <div className={`${styles.actions} ${styles.reveal}`}>
          {whatsappHref ? (
            <a
              href={whatsappHref}
              className={styles.button}
              target="_blank"
              rel="noopener noreferrer"
            >
              Hablemos por WhatsApp
            </a>
          ) : (
            <span className={styles.button} aria-disabled="true">
              Hablemos por WhatsApp
            </span>
          )}
          <dl className={styles.details}>
            <div className={styles.card}>
              <dt className={styles.term}>
                <PhoneIcon />
                Teléfono
              </dt>
              <dd className={styles.value}>
                {CONTACT.phone ? (
                  <a href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`} className={styles.link}>
                    {CONTACT.phone}
                  </a>
                ) : (
                  <span className={styles.pending}>+57 3506881636</span>
                )}
              </dd>
            </div>
            <div className={styles.card}>
              <dt className={styles.term}>
                <MailIcon />
                Correo
              </dt>
              <dd className={styles.value}>
                {CONTACT.email ? (
                  <a href={`mailto:${CONTACT.email}`} className={styles.link}>
                    {CONTACT.email}
                  </a>
                ) : (
                  <span className={styles.pending}>felipecampos3143279076@gmail.com</span>
                )}
              </dd>
            </div>
          </dl>
        </div>

        <div className={`${styles.map} ${styles.reveal}`}>
          <p className={styles.mapLabel} aria-hidden="true">
            Encuéntranos
          </p>
          <div className={styles.mapFrame}>
            <iframe
              src={MAP_SRC}
              title={`Mapa de ubicación: ${CONTACT.address}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        <address className={`${styles.address} ${styles.card} ${styles.reveal}`}>
          <span className={styles.term}>
            <PinIcon />
            Dirección
          </span>
          <span className={styles.value}>{CONTACT.address}</span>
        </address>
      </div>
    </section>
  );
}

// Iconos de línea, pequeños y decorativos.
function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function PhoneIcon() {
  return (
    <Icon>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </Icon>
  );
}

function MailIcon() {
  return (
    <Icon>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </Icon>
  );
}

function PinIcon() {
  return (
    <Icon>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </Icon>
  );
}
