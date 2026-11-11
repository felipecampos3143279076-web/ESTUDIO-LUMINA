import Link from "next/link";
import styles from "./Footer.module.css";

// DATOS DEL FOOTER: rellena los campos vacíos cuando estén definidos.
// whatsapp: solo dígitos con indicativo de país, por ejemplo "57XXXXXXXXXX".
// Son los mismos datos que CONTACT en components/contact/Contact.tsx.
const CONTACT = {
  whatsapp: "",
  email: "",
  location: "Ibagué, Colombia",
};

// ENLACES LEGALES: añade la ruta de cada página cuando exista.
// Con href vacío se muestra el texto sin enlace.
const LEGAL_LINKS = [
  { label: "Política de privacidad", href: "" },
  { label: "Política de tratamiento de datos personales", href: "" },
  { label: "Términos y condiciones", href: "" },
  { label: "Política de cookies", href: "" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.columns}>
          <div className={styles.identity}>
            <p className={styles.brand}>ESTUDIO LÚMINA</p>
            <p className={styles.description}>
              Arquitectura y diseño interior. Creamos espacios que inspiran, conectan y
              perduran.
            </p>
          </div>

          <div>
            <h2 className={styles.heading}>Contacto</h2>
            <dl className={styles.list}>
              <div>
                <dt className={styles.term}>WhatsApp</dt>
                <dd className={styles.item}>
                  {CONTACT.whatsapp ? (
                    <a
                      href={`https://wa.me/${CONTACT.whatsapp}`}
                      className={styles.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +{CONTACT.whatsapp}
                    </a>
                  ) : (
                    <span className={styles.pending}>Por definir</span>
                  )}
                </dd>
              </div>
              <div>
                <dt className={styles.term}>Correo</dt>
                <dd className={styles.item}>
                  {CONTACT.email ? (
                    <a href={`mailto:${CONTACT.email}`} className={styles.link}>
                      {CONTACT.email}
                    </a>
                  ) : (
                    <span className={styles.pending}>Por definir</span>
                  )}
                </dd>
              </div>
              <div>
                <dt className={styles.term}>Ubicación</dt>
                <dd className={`${styles.item} ${styles.muted}`}>{CONTACT.location}</dd>
              </div>
            </dl>
          </div>

          <nav aria-labelledby="footer-legal">
            <h2 id="footer-legal" className={styles.heading}>
              Legal
            </h2>
            <ul className={styles.legal}>
              {LEGAL_LINKS.map(({ label, href }) => (
                <li key={label} className={styles.item}>
                  {href ? (
                    <Link href={href} className={styles.link}>
                      {label}
                    </Link>
                  ) : (
                    <span className={styles.pending}>{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p>© 2026 Estudio Lúmina.</p>
          <p>Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
