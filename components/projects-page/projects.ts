// PROYECTOS: datos compartidos por /proyectos y las páginas individuales.
// Los tres primeros coinciden con «Proyectos destacados» de Inicio.
//
// FOTOGRAFÍAS: copia cada archivo en public/imagenes/ y rellena su src, por
// ejemplo src: "/imagenes/house-principal.jpg". Con src vacío se ve el marcador.
//   card:      tarjeta de /proyectos, vertical 3:4 (1200 × 1600 px o más).
//   main:      fotografía principal, horizontal 16:9 (2400 × 1350 px o más).
//   secondary: dos fotografías complementarias, verticales 4:5 (1600 × 2000 px o más).
//
// DESCRIPCIÓN: texto provisional; sustitúyelo por la información real del proyecto.

export type ProjectImage = { src: string; alt: string };

export type Project = {
  slug: string;
  name: string;
  location: string;
  card: ProjectImage;
  main: ProjectImage;
  secondary: [ProjectImage, ProjectImage];
  description: string[];
};

const empty = (): ProjectImage => ({ src: "", alt: "" });

const PENDING_DESCRIPTION = [
  "Texto provisional. Aquí irá una presentación breve del proyecto: el lugar, el encargo y la idea que guía la propuesta.",
  "Puedes añadir uno o varios párrafos, describiendo las decisiones principales de diseño y la experiencia que se buscaba crear.",
];

export const PROJECTS: Project[] = [
  {
    slug: "house",
    name: "House",
    location: "Copenhague, Dinamarca",
    card: { src: "/imagenes/house.jpg", alt: "" }, // misma foto que en Inicio
    main: empty(),
    secondary: [empty(), empty()],
    description: PENDING_DESCRIPTION,
  },
  {
    slug: "via-57-west",
    name: "VIA 57 West",
    location: "Nueva York, Estados Unidos",
    card: { src: "/imagenes/via57west.jpg", alt: "" }, // misma foto que en Inicio
    main: empty(),
    secondary: [empty(), empty()],
    description: PENDING_DESCRIPTION,
  },
  {
    slug: "copenhill",
    name: "CopenHill",
    location: "Copenhague, Dinamarca",
    card: { src: "/imagenes/copenhill.jpg", alt: "" }, // misma foto que en Inicio
    main: empty(),
    secondary: [empty(), empty()],
    description: PENDING_DESCRIPTION,
  },
  {
    slug: "torre-de-bacata",
    name: "Torre de Bacatá",
    location: "Bogotá, Colombia",
    card: empty(),
    main: empty(),
    secondary: [empty(), empty()],
    description: PENDING_DESCRIPTION,
  },
  {
    slug: "museo-moderno-de-medellin",
    name: "Museo Moderno de Medellín",
    location: "Medellín, Colombia",
    card: empty(),
    main: empty(),
    secondary: [empty(), empty()],
    description: PENDING_DESCRIPTION,
  },
];

export const projectHref = (slug: string) => `/proyectos/${slug}`;
