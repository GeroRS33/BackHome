import sillonSpace from "../assets/images/sillonspace.png";
import aparadorNogal from "../assets/images/aparadornogal.png";
import lamparaHongo from "../assets/images/lamparahongo.png";

import sofa1 from "../assets/images/sofa1.png";
import sofa2 from "../assets/images/sofa2.png";
import sofa3 from "../assets/images/sofa3.png";

import materialesIcon from "../assets/images/materiales.png";
import dimensionesIcon from "../assets/images/dimensiones.png";

export const productos = [
  {
    id: 31,
    name: "Sillón Space Age",
    category: "Sala",
    material: "Cuero",
    decade: 1970,
    price: 21000,
    image: sillonSpace,
    images: [sofa1, sofa2, sofa3],
    tag: "Inspiración años 70",
    colors: ["#c64f05", "#d89a27", "#8a8b42", "#5a3215", "#d9c7aa"],
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
    price: 78000,
    image: aparadorNogal,
    images: [aparadorNogal],
    tag: "Madera cálida",
    colors: ["#5a3215", "#d9c7aa"],
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
    name: "Lámpara Hongo",
    category: "Iluminación",
    material: "Metal",
    decade: 1970,
    price: 18000,
    image: lamparaHongo,
    images: [lamparaHongo],
    tag: "Luz ambiental",
    colors: ["#c64f05", "#f4e2c1"],
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
    id: 41,
    name: "Sillón Lounge 80s",
    category: "Sala",
    material: "Cuero",
    decade: 1980,
    price: 29000,
    image: sillonSpace,
    images: [sillonSpace],
    tag: "Estética ochentera",
    colors: ["#3b2a24", "#c64f05"],
    description:
      "Sillón bajo con líneas envolventes y estética retro ochentera.",
    specs: [],
  },
  {
    id: 51,
    name: "Aparador Natural",
    category: "Comedor",
    material: "Madera",
    decade: 1990,
    price: 64000,
    image: aparadorNogal,
    images: [aparadorNogal],
    tag: "Diseño simple",
    colors: ["#5a3215", "#d9c7aa"],
    description:
      "Mueble de guardado en madera cálida para espacios simples.",
    specs: [],
  },
  {
    id: 61,
    name: "Lámpara Mushroom 2000",
    category: "Iluminación",
    material: "Vidrio",
    decade: 2000,
    price: 24000,
    image: lamparaHongo,
    images: [lamparaHongo],
    tag: "Curvas suaves",
    colors: ["#f4e2c1", "#d89a27"],
    description:
      "Lámpara reinterpretada con curvas suaves y brillo cálido.",
    specs: [],
  },
];