import { useMemo, useState } from "react";

import "./HomePage.css";

import Navbar from "../components/Navbar/Navbar";
import TimelineSelector from "../components/TimelineSelector/TimelineSelector";
import ProductCard from "../components/ProductCard/ProductCard";
import Palette from "../components/Palette/Palette";

import heroImage from "../assets/images/fondohome.png";
import searchIcon from "../assets/images/buscar.png";

import sillonSpace from "../assets/images/sillonspace.png";
import aparadorNogal from "../assets/images/aparadornogal.png";
import lamparaHongo from "../assets/images/lamparahongo.png";

import lamparaIcon from "../assets/images/lampara.png";
import lineasIcon from "../assets/images/lineas.png";
import plantaIcon from "../assets/images/planta.png";

const decadesInfo = {
  1950: {
    title: "Años 50",
    description:
      "Pasteles suaves, madera clara, detalles cromados y una estética optimista marcada por el diseño funcional de posguerra.",
    palette: ["#F4D6B8", "#B7D7D8", "#F2A7A0", "#D9C27E", "#8B5E3C", "#EFE6D8"],
  },
  1960: {
    title: "Años 60",
    description:
      "Colores pop, formas geométricas, contrastes fuertes y una mezcla entre modernidad espacial y diseño gráfico expresivo.",
    palette: ["#F27A1A", "#F2C230", "#2F8F83", "#D9487D", "#F4EFE3", "#3B2A24"],
  },
  1970: {
    title: "Años 70",
    description:
      "Colores tierra, formas orgánicas y mucho carácter. Descubre lo mejor del diseño setentero.",
    palette: ["#71380F", "#D85105", "#D89A27", "#7F873C", "#D4AE73", "#E5D6BD"],
  },
  1980: {
    title: "Años 80",
    description:
      "Tonos intensos, contrastes gráficos, negro brillante, acentos neón y una estética más expresiva y atrevida.",
    palette: ["#111111", "#F25CA2", "#00A6A6", "#F2D230", "#6A4C93", "#F4F1E8"],
  },
  1990: {
    title: "Años 90",
    description:
      "Neutros cálidos, verdes apagados, madera natural y una sensibilidad más simple, cómoda y relajada.",
    palette: ["#D8C7B0", "#8A8F73", "#7A4E2D", "#B8A58A", "#EFE8DC", "#4A3A32"],
  },
  2000: {
    title: "Años 2000",
    description:
      "Minimalismo claro, plateados, blancos cálidos, vidrio, líneas limpias y acentos tecnológicos suaves.",
    palette: ["#F1EEE8", "#C9CED3", "#8D9AA5", "#6F7F8F", "#D7B98E", "#3A3A3A"],
  },
};

const productsByDecade = {
  1950: [
    {
      id: 11,
      name: "Butaca Classic 50s",
      category: "Sillones",
      image: sillonSpace,
    },
    {
      id: 12,
      name: "Aparador Vintage Claro",
      category: "Almacenaje",
      image: aparadorNogal,
    },
    {
      id: 13,
      name: "Lámpara Dome",
      category: "Iluminación",
      image: lamparaHongo,
    },
  ],
  1960: [
    {
      id: 21,
      name: "Sillón Mid Century",
      category: "Sillones",
      image: sillonSpace,
    },
    {
      id: 22,
      name: "Aparador Línea 60s",
      category: "Almacenaje",
      image: aparadorNogal,
    },
    {
      id: 23,
      name: "Lámpara Soft Glow",
      category: "Iluminación",
      image: lamparaHongo,
    },
  ],
  1970: [
    {
      id: 31,
      name: "Sillón Space Age",
      category: "Sillones",
      image: sillonSpace,
    },
    {
      id: 32,
      name: "Aparador Nogal 70s",
      category: "Almacenaje",
      image: aparadorNogal,
    },
    {
      id: 33,
      name: "Lámpara Hongo",
      category: "Iluminación",
      image: lamparaHongo,
    },
  ],
  1980: [
    {
      id: 41,
      name: "Sillón Lounge 80s",
      category: "Sillones",
      image: sillonSpace,
    },
    {
      id: 42,
      name: "Aparador Dark Wood",
      category: "Almacenaje",
      image: aparadorNogal,
    },
    {
      id: 43,
      name: "Lámpara Pop Orange",
      category: "Iluminación",
      image: lamparaHongo,
    },
  ],
  1990: [
    {
      id: 51,
      name: "Sillón Cozy Retro",
      category: "Sillones",
      image: sillonSpace,
    },
    {
      id: 52,
      name: "Aparador Natural",
      category: "Almacenaje",
      image: aparadorNogal,
    },
    {
      id: 53,
      name: "Lámpara Mesa Cálida",
      category: "Iluminación",
      image: lamparaHongo,
    },
  ],
  2000: [
    {
      id: 61,
      name: "Sillón Neo Retro",
      category: "Sillones",
      image: sillonSpace,
    },
    {
      id: 62,
      name: "Aparador Curvo Moderno",
      category: "Almacenaje",
      image: aparadorNogal,
    },
    {
      id: 63,
      name: "Lámpara Mushroom 2000",
      category: "Iluminación",
      image: lamparaHongo,
    },
  ],
};

function HomePage() {
  const [selectedDecade, setSelectedDecade] = useState(1970);
  const [searchTerm, setSearchTerm] = useState("");

  const decadeInfo = decadesInfo[selectedDecade];
  const decadeProducts = productsByDecade[selectedDecade];

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();

    if (!normalizedSearch) {
      return decadeProducts;
    }

    return decadeProducts.filter((product) => {
      return (
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch) ||
        String(selectedDecade).includes(normalizedSearch)
      );
    });
  }, [searchTerm, selectedDecade, decadeProducts]);

  return (
    <>
      <Navbar />

      <main className="home-page">
        <section className="home-hero">
          <div className="home-hero-bg">
            <img src={heroImage} alt="Living retro con muebles vintage" />
          </div>

          <div className="home-hero-overlay"></div>

          <div className="home-hero-content">
            <h1>Diseña tu hogar viajando por el tiempo</h1>

            <p>
              Explora muebles, decoración e inspiración retro por década y
              encuentra piezas únicas para tu estilo.
            </p>

            <div className="home-search">
              <img src={searchIcon} alt="" />
              <input
                type="text"
                placeholder="Buscar por producto, estilo o década..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>

            <TimelineSelector
              selectedDecade={selectedDecade}
              onSelectDecade={setSelectedDecade}
            />
          </div>
        </section>

        <section className="selected-decade">
          <div className="selected-info">
            <p className="section-eyebrow">Década seleccionada</p>

            <h2>{decadeInfo.title}</h2>

            <p className="selected-description">{decadeInfo.description}</p>

            <Palette colors={decadeInfo.palette} />

            <a href="/productos" className="selected-link">
              Ver inspiración de los {String(selectedDecade).slice(2)}
              <span>›</span>
            </a>

            <img className="selected-lamp" src={lamparaIcon} alt="" />
            <img className="selected-lines" src={lineasIcon} alt="" />
            <img className="selected-plant" src={plantaIcon} alt="" />
          </div>

          <div className="selected-products">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="no-products-message">
                No encontramos productos para esa búsqueda en esta década.
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default HomePage;