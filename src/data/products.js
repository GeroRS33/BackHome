import materialesIcon from "../assets/images/materiales.png";
import dimensionesIcon from "../assets/images/dimensiones.png";

const productImages = import.meta.glob(
  "../assets/images/productos/*",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

const productImage = (fileName) => {
  const cleanPath = `../assets/images/productos/${fileName}`;
  const doublePngPath = `../assets/images/productos/${fileName}.png`;

  return productImages[cleanPath] || productImages[doublePngPath] || "";
};

const gallery = (slug) => [
  productImage(`${slug}-1.png`),
  productImage(`${slug}-2.png`),
  productImage(`${slug}-3.png`),
];

const palettes = {
  1950: ["#e6d1b5", "#b7d1d9", "#dca59f", "#d1bc79", "#8a6543", "#e5e0d7"],
  1960: ["#e48632", "#e6c346", "#4e9488", "#c94f86", "#e4e1d8", "#46332c"],
  1970: ["#834716", "#d16124", "#d6a53d", "#8a8f43", "#d2b883", "#ddd0b8"],
  1980: ["#0a0a0a", "#d965a1", "#4aa9ac", "#e6cf4d", "#6c4f9c", "#e6e2da"],
  1990: ["#d2c8b4", "#9a9d82", "#8a6038", "#b8aa90", "#e6e1d9", "#5a463d"],
  2000: ["#e7e5e1", "#bcc3cc", "#97a4b4", "#77889c", "#d1bd95", "#3f3f41"],
};

export const productos = [
  // =========================
  // AÑOS 50
  // =========================
  {
    id: 11,
    name: "Butaca Pastel 50s",
    category: "Sala",
    material: "Cuero",
    decade: 1950,
    price: 38500,
    image: productImage("butaca-pastel-50s-1.png"),
    images: gallery("butaca-pastel-50s"),
    tag: "Inspiración años 50",
    colors: palettes[1950],
    description:
      "Butaca compacta de inspiración funcional con tapizado pastel y patas finas de madera.",
    specs: [
      {
        title: "Materiales",
        text: "Tapizado símil cuero, estructura interna reforzada y patas de madera maciza.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "Ancho 72 cm · Profundidad 74 cm · Alto 78 cm.",
        icon: dimensionesIcon,
      },
    ],
  },
  {
    id: 12,
    name: "Mesa Oval Fórmica 50s",
    category: "Comedor",
    material: "Madera",
    decade: 1950,
    price: 46200,
    image: productImage("mesa-oval-formica-50s-1.png"),
    images: gallery("mesa-oval-formica-50s"),
    tag: "Diseño funcional",
    colors: palettes[1950],
    description:
      "Mesa ovalada con estética de posguerra, líneas suaves y terminación cálida.",
    specs: [
      {
        title: "Materiales",
        text: "Base de madera clara y superficie con acabado tipo fórmica.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "Largo 150 cm · Ancho 90 cm · Alto 76 cm.",
        icon: dimensionesIcon,
      },
    ],
  },
  {
    id: 13,
    name: "Cama Nórdica Clara 50s",
    category: "Dormitorio",
    material: "Madera",
    decade: 1950,
    price: 58900,
    image: productImage("cama-nordica-clara-50s-1.png"),
    images: gallery("cama-nordica-clara-50s"),
    tag: "Descanso retro",
    colors: palettes[1950],
    description:
      "Cama de líneas simples y respaldo bajo, ideal para dormitorios luminosos y serenos.",
    specs: [
      {
        title: "Materiales",
        text: "Estructura en madera clara y terminación satinada.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "Ancho 150 cm · Largo 205 cm · Alto respaldo 92 cm.",
        icon: dimensionesIcon,
      },
    ],
  },
  {
    id: 14,
    name: "Lámpara Celeste Retro",
    category: "Iluminación",
    material: "Metal",
    decade: 1950,
    price: 14900,
    image: productImage("lampara-celeste-retro-1.png"),
    images: gallery("lampara-celeste-retro"),
    tag: "Luz suave",
    colors: palettes[1950],
    description:
      "Lámpara de mesa con acabado pastel y detalles cromados, perfecta para un rincón vintage.",
    specs: [
      {
        title: "Materiales",
        text: "Pantalla metálica esmaltada y base con detalles cromados.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "Alto 38 cm · Diámetro 24 cm.",
        icon: dimensionesIcon,
      },
    ],
  },
  {
    id: 15,
    name: "Jarrón Vidrio Humo 50s",
    category: "Decoración",
    material: "Vidrio",
    decade: 1950,
    price: 8900,
    image: productImage("jarron-vidrio-humo-50s-1.png"),
    images: gallery("jarron-vidrio-humo-50s"),
    tag: "Detalle decorativo",
    colors: palettes[1950],
    description:
      "Jarrón decorativo de silueta redondeada con acabado sutil y elegante.",
    specs: [
      {
        title: "Materiales",
        text: "Vidrio soplado con leve tonalidad humo.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "Alto 30 cm · Diámetro 18 cm.",
        icon: dimensionesIcon,
      },
    ],
  },
  {
    id: 16,
    name: "Alfombra Patchwork Pastel",
    category: "Textiles",
    material: "Cuero",
    decade: 1950,
    price: 22800,
    image: productImage("alfombra-patchwork-pastel-1.png"),
    images: gallery("alfombra-patchwork-pastel"),
    tag: "Textura suave",
    colors: palettes[1950],
    description:
      "Alfombra patchwork en tonos suaves que aporta calidez y un toque retro delicado.",
    specs: [
      {
        title: "Materiales",
        text: "Piezas de cuero cosidas a mano con base reforzada.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "200 cm x 140 cm.",
        icon: dimensionesIcon,
      },
    ],
  },

  // =========================
  // AÑOS 60
  // =========================
  {
    id: 21,
    name: "Sillón Pop 60s",
    category: "Sala",
    material: "Cuero",
    decade: 1960,
    price: 43900,
    image: productImage("sillon-pop-60s-1.png"),
    images: gallery("sillon-pop-60s"),
    tag: "Inspiración años 60",
    colors: palettes[1960],
    description:
      "Sillón de formas redondeadas y presencia pop, ideal para destacar un ambiente.",
    specs: [
      {
        title: "Materiales",
        text: "Tapizado símil cuero y base resistente de apoyo bajo.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "Ancho 84 cm · Profundidad 82 cm · Alto 79 cm.",
        icon: dimensionesIcon,
      },
    ],
  },
  {
    id: 22,
    name: "Aparador Teca Modular 60s",
    category: "Comedor",
    material: "Madera",
    decade: 1960,
    price: 71800,
    image: productImage("aparador-teca-modular-60s-1.png"),
    images: gallery("aparador-teca-modular-60s"),
    tag: "Mid-century moderno",
    colors: palettes[1960],
    description:
      "Aparador de teca con módulos de guardado y líneas rectas muy características de la década.",
    specs: [
      {
        title: "Materiales",
        text: "Madera de teca con terminación natural y tiradores integrados.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "Ancho 170 cm · Profundidad 46 cm · Alto 80 cm.",
        icon: dimensionesIcon,
      },
    ],
  },
  {
    id: 23,
    name: "Cama Geométrica 60s",
    category: "Dormitorio",
    material: "Madera",
    decade: 1960,
    price: 61200,
    image: productImage("cama-geometrica-60s-1.png"),
    images: gallery("cama-geometrica-60s"),
    tag: "Formas limpias",
    colors: palettes[1960],
    description:
      "Cama con respaldo geométrico y líneas modernas, pensada para dormitorios con carácter.",
    specs: [
      {
        title: "Materiales",
        text: "Estructura de madera con cabecera de diseño geométrico.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "Ancho 155 cm · Largo 205 cm · Alto respaldo 98 cm.",
        icon: dimensionesIcon,
      },
    ],
  },
  {
    id: 24,
    name: "Lámpara Arco Naranja",
    category: "Iluminación",
    material: "Metal",
    decade: 1960,
    price: 19800,
    image: productImage("lampara-arco-naranja-1.png"),
    images: gallery("lampara-arco-naranja"),
    tag: "Acento pop",
    colors: palettes[1960],
    description:
      "Lámpara de pie de inspiración sesentera con curvatura elegante y color vibrante.",
    specs: [
      {
        title: "Materiales",
        text: "Estructura metálica con acabado esmaltado y base estabilizada.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "Alto 165 cm · Diámetro base 32 cm.",
        icon: dimensionesIcon,
      },
    ],
  },
  {
    id: 25,
    name: "Espejo Solar Color Block",
    category: "Decoración",
    material: "Vidrio",
    decade: 1960,
    price: 12400,
    image: productImage("espejo-solar-color-block-1.png"),
    images: gallery("espejo-solar-color-block"),
    tag: "Decoración expresiva",
    colors: palettes[1960],
    description:
      "Espejo decorativo con composición gráfica y aire juguetón, ideal para una pared protagonista.",
    specs: [
      {
        title: "Materiales",
        text: "Superficie de vidrio espejado y marco decorativo compuesto.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "Diámetro 72 cm.",
        icon: dimensionesIcon,
      },
    ],
  },
  {
    id: 26,
    name: "Alfombra Óptica Pop",
    category: "Textiles",
    material: "Cuero",
    decade: 1960,
    price: 23900,
    image: productImage("alfombra-optica-pop-1.png"),
    images: gallery("alfombra-optica-pop"),
    tag: "Patrones vibrantes",
    colors: palettes[1960],
    description:
      "Alfombra de inspiración óptica con formas geométricas y una paleta intensa.",
    specs: [
      {
        title: "Materiales",
        text: "Patchwork de cuero en bloques de color con terminación prolija.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "190 cm x 130 cm.",
        icon: dimensionesIcon,
      },
    ],
  },

  // =========================
  // AÑOS 70
  // =========================
  {
    id: 31,
    name: "Sillón Space Age",
    category: "Sala",
    material: "Cuero",
    decade: 1970,
    price: 42000,
    image: productImage("sillon-space-age-1.png"),
    images: gallery("sillon-space-age"),
    tag: "Inspiración años 70",
    colors: palettes[1970],
    description:
      "Sillón giratorio con tapizado en tela texturizada y base metálica.",
    specs: [
      {
        title: "Materiales",
        text: "Tapizado en pana de algodón, base metálica cromada.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "Ancho 82 cm · Profundidad 85 cm · Alto 80 cm.",
        icon: dimensionesIcon,
      },
    ],
  },
  {
    id: 32,
    name: "Aparador Nogal 70s",
    category: "Comedor",
    material: "Madera",
    decade: 1970,
    price: 68000,
    image: productImage("aparador-nogal-70s-1.png"),
    images: gallery("aparador-nogal-70s"),
    tag: "Madera cálida",
    colors: palettes[1970],
    description:
      "Aparador en madera de nogal con puertas curvas y patas cónicas.",
    specs: [
      {
        title: "Materiales",
        text: "Madera de nogal con terminación satinada.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "Ancho 160 cm · Profundidad 45 cm · Alto 78 cm.",
        icon: dimensionesIcon,
      },
    ],
  },
  {
    id: 33,
    name: "Cama Baja Boho 70s",
    category: "Dormitorio",
    material: "Madera",
    decade: 1970,
    price: 63500,
    image: productImage("cama-baja-boho-70s-1.png"),
    images: gallery("cama-baja-boho-70s"),
    tag: "Descanso orgánico",
    colors: palettes[1970],
    description:
      "Cama baja de inspiración boho con madera cálida y textiles en tonos tierra.",
    specs: [
      {
        title: "Materiales",
        text: "Estructura de madera con respaldo bajo y terminación natural.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "Ancho 160 cm · Largo 210 cm · Alto respaldo 86 cm.",
        icon: dimensionesIcon,
      },
    ],
  },
  {
    id: 34,
    name: "Lámpara Hongo",
    category: "Iluminación",
    material: "Metal",
    decade: 1970,
    price: 15500,
    image: productImage("lampara-hongo-1.png"),
    images: gallery("lampara-hongo"),
    tag: "Luz ambiental",
    colors: palettes[1970],
    description:
      "Lámpara de mesa con pantalla naranja y base blanca brillante.",
    specs: [
      {
        title: "Materiales",
        text: "Pantalla metálica esmaltada y base acrílica.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "Alto 42 cm · Diámetro 28 cm.",
        icon: dimensionesIcon,
      },
    ],
  },
  {
    id: 35,
    name: "Jarrón Ámbar Orgánico",
    category: "Decoración",
    material: "Vidrio",
    decade: 1970,
    price: 9800,
    image: productImage("jarron-ambar-organico-1.png"),
    images: gallery("jarron-ambar-organico"),
    tag: "Detalle setentero",
    colors: palettes[1970],
    description:
      "Jarrón decorativo de silueta orgánica y vidrio ámbar, perfecto para un rincón cálido.",
    specs: [
      {
        title: "Materiales",
        text: "Vidrio decorativo con acabado translúcido.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "Alto 32 cm · Diámetro 18 cm.",
        icon: dimensionesIcon,
      },
    ],
  },
  {
    id: 36,
    name: "Alfombra Patchwork Tierra",
    category: "Textiles",
    material: "Cuero",
    decade: 1970,
    price: 24800,
    image: productImage("alfombra-patchwork-tierra-1.png"),
    images: gallery("alfombra-patchwork-tierra"),
    tag: "Textura cálida",
    colors: palettes[1970],
    description:
      "Alfombra patchwork de cuero en marrones, mostaza y beige con fuerte impronta setentera.",
    specs: [
      {
        title: "Materiales",
        text: "Patchwork de cuero con costuras reforzadas.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "200 cm x 140 cm.",
        icon: dimensionesIcon,
      },
    ],
  },

  // =========================
  // AÑOS 80
  // =========================
  {
    id: 41,
    name: "Sillón Memphis 80s",
    category: "Sala",
    material: "Cuero",
    decade: 1980,
    price: 47800,
    image: productImage("sillon-memphis-80s-1.png"),
    images: gallery("sillon-memphis-80s"),
    tag: "Inspiración años 80",
    colors: palettes[1980],
    description:
      "Sillón de presencia gráfica con contrastes fuertes y una personalidad atrevida.",
    specs: [
      {
        title: "Materiales",
        text: "Tapizado símil cuero y estructura de soporte reforzada.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "Ancho 86 cm · Profundidad 83 cm · Alto 82 cm.",
        icon: dimensionesIcon,
      },
    ],
  },
  {
    id: 42,
    name: "Mesa Lacada 80s",
    category: "Comedor",
    material: "Madera",
    decade: 1980,
    price: 75400,
    image: productImage("mesa-lacada-80s-1.png"),
    images: gallery("mesa-lacada-80s"),
    tag: "Impacto visual",
    colors: palettes[1980],
    description:
      "Mesa de comedor de impronta audaz, ideal para interiores con estilo expresivo.",
    specs: [
      {
        title: "Materiales",
        text: "Madera laqueada con terminación brillante.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "Largo 180 cm · Ancho 95 cm · Alto 76 cm.",
        icon: dimensionesIcon,
      },
    ],
  },
  {
    id: 43,
    name: "Cama Tubular Neón",
    category: "Dormitorio",
    material: "Metal",
    decade: 1980,
    price: 64800,
    image: productImage("cama-tubular-neon-1.png"),
    images: gallery("cama-tubular-neon"),
    tag: "Energía gráfica",
    colors: palettes[1980],
    description:
      "Cama de estructura tubular con un diseño divertido y muy representativo de los 80.",
    specs: [
      {
        title: "Materiales",
        text: "Estructura metálica pintada y terminaciones resistentes.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "Ancho 150 cm · Largo 205 cm · Alto respaldo 100 cm.",
        icon: dimensionesIcon,
      },
    ],
  },
  {
    id: 44,
    name: "Lámpara Neón Soft",
    category: "Iluminación",
    material: "Metal",
    decade: 1980,
    price: 18200,
    image: productImage("lampara-neon-soft-1.png"),
    images: gallery("lampara-neon-soft"),
    tag: "Acento vibrante",
    colors: palettes[1980],
    description:
      "Lámpara decorativa con guiños neón y silueta gráfica, ideal para sumar color.",
    specs: [
      {
        title: "Materiales",
        text: "Pantalla metálica y base de apoyo sólida.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "Alto 44 cm · Diámetro 26 cm.",
        icon: dimensionesIcon,
      },
    ],
  },
  {
    id: 45,
    name: "Espejo Geométrico 80s",
    category: "Decoración",
    material: "Vidrio",
    decade: 1980,
    price: 13600,
    image: productImage("espejo-geometrico-80s-1.png"),
    images: gallery("espejo-geometrico-80s"),
    tag: "Decoración audaz",
    colors: palettes[1980],
    description:
      "Espejo decorativo de inspiración geométrica con fuerte presencia visual.",
    specs: [
      {
        title: "Materiales",
        text: "Vidrio espejado con marco geométrico decorativo.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "Alto 78 cm · Ancho 54 cm.",
        icon: dimensionesIcon,
      },
    ],
  },
  {
    id: 46,
    name: "Alfombra Gráfica Memphis",
    category: "Textiles",
    material: "Cuero",
    decade: 1980,
    price: 25900,
    image: productImage("alfombra-grafica-memphis-1.png"),
    images: gallery("alfombra-grafica-memphis"),
    tag: "Patrón protagonista",
    colors: palettes[1980],
    description:
      "Alfombra con patrones gráficos y contrastes fuertes, perfecta para una atmósfera ochentera.",
    specs: [
      {
        title: "Materiales",
        text: "Patchwork de cuero con bloques geométricos y acabados definidos.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "200 cm x 140 cm.",
        icon: dimensionesIcon,
      },
    ],
  },

  // =========================
  // AÑOS 90
  // =========================
  {
    id: 51,
    name: "Sofá Cozy 90s",
    category: "Sala",
    material: "Cuero",
    decade: 1990,
    price: 49500,
    image: productImage("sofa-cozy-90s-1.png"),
    images: gallery("sofa-cozy-90s"),
    tag: "Inspiración años 90",
    colors: palettes[1990],
    description:
      "Sofá cómodo y envolvente, con una estética relajada y tonos neutros muy noventeros.",
    specs: [
      {
        title: "Materiales",
        text: "Tapizado símil cuero y estructura de apoyo resistente.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "Ancho 190 cm · Profundidad 92 cm · Alto 84 cm.",
        icon: dimensionesIcon,
      },
    ],
  },
  {
    id: 52,
    name: "Rack Natural 90s",
    category: "Comedor",
    material: "Madera",
    decade: 1990,
    price: 59800,
    image: productImage("rack-natural-90s-1.png"),
    images: gallery("rack-natural-90s"),
    tag: "Guardado simple",
    colors: palettes[1990],
    description:
      "Mueble de guardado en madera natural de líneas sobrias, funcional y cálido.",
    specs: [
      {
        title: "Materiales",
        text: "Madera natural con estantes internos y terminación mate.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "Ancho 155 cm · Profundidad 44 cm · Alto 76 cm.",
        icon: dimensionesIcon,
      },
    ],
  },
  {
    id: 53,
    name: "Cama Minimal Roble 90s",
    category: "Dormitorio",
    material: "Madera",
    decade: 1990,
    price: 62400,
    image: productImage("cama-minimal-roble-90s-1.png"),
    images: gallery("cama-minimal-roble-90s"),
    tag: "Calma natural",
    colors: palettes[1990],
    description:
      "Cama de roble con líneas limpias y una presencia serena, ideal para ambientes neutros.",
    specs: [
      {
        title: "Materiales",
        text: "Estructura de roble y terminación mate suave.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "Ancho 155 cm · Largo 206 cm · Alto respaldo 90 cm.",
        icon: dimensionesIcon,
      },
    ],
  },
  {
    id: 54,
    name: "Lámpara Salvia 90s",
    category: "Iluminación",
    material: "Metal",
    decade: 1990,
    price: 16100,
    image: productImage("lampara-salvia-90s-1.png"),
    images: gallery("lampara-salvia-90s"),
    tag: "Iluminación suave",
    colors: palettes[1990],
    description:
      "Lámpara en tono salvia apagado con estética simple y cálida.",
    specs: [
      {
        title: "Materiales",
        text: "Pantalla metálica esmaltada y base compacta.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "Alto 40 cm · Diámetro 24 cm.",
        icon: dimensionesIcon,
      },
    ],
  },
  {
    id: 55,
    name: "Florero Vidrio Hielo",
    category: "Decoración",
    material: "Vidrio",
    decade: 1990,
    price: 9300,
    image: productImage("florero-vidrio-hielo-1.png"),
    images: gallery("florero-vidrio-hielo"),
    tag: "Detalle sutil",
    colors: palettes[1990],
    description:
      "Florero de vidrio claro con silueta limpia, ideal para complementar espacios relajados.",
    specs: [
      {
        title: "Materiales",
        text: "Vidrio decorativo traslúcido con acabado suave.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "Alto 28 cm · Diámetro 16 cm.",
        icon: dimensionesIcon,
      },
    ],
  },
  {
    id: 56,
    name: "Tapiz Natural 90s",
    category: "Textiles",
    material: "Madera",
    decade: 1990,
    price: 17400,
    image: productImage("tapiz-natural-90s-1.png"),
    images: gallery("tapiz-natural-90s"),
    tag: "Textura relajada",
    colors: palettes[1990],
    description:
      "Tapiz decorativo en tonos crudos y tierra, perfecto para sumar textura.",
    specs: [
      {
        title: "Materiales",
        text: "Textil tejido con soporte superior de madera.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "Ancho 90 cm · Alto 120 cm.",
        icon: dimensionesIcon,
      },
    ],
  },

  // =========================
  // AÑOS 2000
  // =========================
  {
    id: 61,
    name: "Sillón Curvo 2000",
    category: "Sala",
    material: "Cuero",
    decade: 2000,
    price: 45200,
    image: productImage("sillon-curvo-2000-1.png"),
    images: gallery("sillon-curvo-2000"),
    tag: "Inspiración años 2000",
    colors: palettes[2000],
    description:
      "Sillón de curvas suaves y lenguaje minimalista, ideal para espacios contemporáneos.",
    specs: [
      {
        title: "Materiales",
        text: "Tapizado símil cuero y estructura interna reforzada.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "Ancho 86 cm · Profundidad 84 cm · Alto 81 cm.",
        icon: dimensionesIcon,
      },
    ],
  },
  {
    id: 62,
    name: "Mesa Vidrio Frost",
    category: "Comedor",
    material: "Vidrio",
    decade: 2000,
    price: 78200,
    image: productImage("mesa-vidrio-frost-1.png"),
    images: gallery("mesa-vidrio-frost"),
    tag: "Minimalismo claro",
    colors: palettes[2000],
    description:
      "Mesa de comedor con tapa de vidrio esmerilado y estética limpia y sofisticada.",
    specs: [
      {
        title: "Materiales",
        text: "Tapa de vidrio templado y base estructural de apoyo.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "Largo 180 cm · Ancho 95 cm · Alto 76 cm.",
        icon: dimensionesIcon,
      },
    ],
  },
  {
    id: 63,
    name: "Cama Plataforma 2000",
    category: "Dormitorio",
    material: "Madera",
    decade: 2000,
    price: 65900,
    image: productImage("cama-plataforma-2000-1.png"),
    images: gallery("cama-plataforma-2000"),
    tag: "Descanso contemporáneo",
    colors: palettes[2000],
    description:
      "Cama plataforma baja de líneas depuradas y presencia moderna.",
    specs: [
      {
        title: "Materiales",
        text: "Estructura de madera con terminación uniforme y diseño limpio.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "Ancho 158 cm · Largo 208 cm · Alto respaldo 88 cm.",
        icon: dimensionesIcon,
      },
    ],
  },
  {
    id: 64,
    name: "Lámpara Cromo Soft",
    category: "Iluminación",
    material: "Metal",
    decade: 2000,
    price: 17600,
    image: productImage("lampara-cromo-soft-1.png"),
    images: gallery("lampara-cromo-soft"),
    tag: "Brillo sutil",
    colors: palettes[2000],
    description:
      "Lámpara de estética tecnológica suave con acabado metálico delicado.",
    specs: [
      {
        title: "Materiales",
        text: "Estructura metálica cromada con base compacta.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "Alto 43 cm · Diámetro 25 cm.",
        icon: dimensionesIcon,
      },
    ],
  },
  {
    id: 65,
    name: "Espejo Plateado Minimal",
    category: "Decoración",
    material: "Vidrio",
    decade: 2000,
    price: 12800,
    image: productImage("espejo-plateado-minimal-1.png"),
    images: gallery("espejo-plateado-minimal"),
    tag: "Detalle limpio",
    colors: palettes[2000],
    description:
      "Espejo de lenguaje simple y marco sutil, perfecto para ambientes claros y modernos.",
    specs: [
      {
        title: "Materiales",
        text: "Vidrio espejado con terminación de marco plateado.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "Alto 80 cm · Ancho 55 cm.",
        icon: dimensionesIcon,
      },
    ],
  },
  {
    id: 66,
    name: "Alfombra Niebla 2000",
    category: "Textiles",
    material: "Cuero",
    decade: 2000,
    price: 23200,
    image: productImage("alfombra-niebla-2000-1.png"),
    images: gallery("alfombra-niebla-2000"),
    tag: "Textura minimal",
    colors: palettes[2000],
    description:
      "Alfombra de aspecto uniforme y tonos suaves, ideal para sumar calidez sin recargar.",
    specs: [
      {
        title: "Materiales",
        text: "Superficie en cuero trabajado con base reforzada.",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: "200 cm x 140 cm.",
        icon: dimensionesIcon,
      },
    ],
  },
];