import { useMemo, useState } from "react";

import "./HomePage.css";

import Navbar from "../components/Navbar/Navbar";
import TimelineSelector from "../components/TimelineSelector/TimelineSelector";
import ProductCard from "../components/ProductCard/ProductCard";
import Palette from "../components/Palette/Palette";

import heroImage from "../assets/images/fondohome.png";
import searchIcon from "../assets/images/buscar.png";
import ubicacionIcon from "../assets/images/ubicacion.png";

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
      description: "Butaca retro de líneas suaves y madera clara.",
      price: 620000,
      precio: 620000,
      image: sillonSpace,
    },
    {
      id: 12,
      name: "Aparador Vintage Claro",
      category: "Almacenaje",
      description: "Aparador compacto con estética de los años cincuenta.",
      price: 980000,
      precio: 980000,
      image: aparadorNogal,
    },
    {
      id: 13,
      name: "Lámpara Dome",
      category: "Iluminación",
      description: "Lámpara cálida con silueta clásica de mesa.",
      price: 240000,
      precio: 240000,
      image: lamparaHongo,
    },
  ],
  1960: [
    {
      id: 21,
      name: "Sillón Mid Century",
      category: "Sillones",
      description: "Sillón bajo de inspiración moderna y cómoda.",
      price: 760000,
      precio: 760000,
      image: sillonSpace,
    },
    {
      id: 22,
      name: "Aparador Línea 60s",
      category: "Almacenaje",
      description: "Madera cálida y proporciones simples.",
      price: 1180000,
      precio: 1180000,
      image: aparadorNogal,
    },
    {
      id: 23,
      name: "Lámpara Soft Glow",
      category: "Iluminación",
      description: "Luz ambiental para espacios retro modernos.",
      price: 280000,
      precio: 280000,
      image: lamparaHongo,
    },
  ],
  1970: [
    {
      id: 31,
      name: "Sillón Space Age",
      category: "Sillones",
      description: "Sillón giratorio con tapizado en tela texturizada.",
      price: 890000,
      precio: 890000,
      image: sillonSpace,
    },
    {
      id: 32,
      name: "Aparador Nogal 70s",
      category: "Almacenaje",
      description: "Aparador de nogal con puertas curvas.",
      price: 1250000,
      precio: 1250000,
      image: aparadorNogal,
    },
    {
      id: 33,
      name: "Lámpara Hongo",
      category: "Iluminación",
      description: "Lámpara naranja con luz cálida ambiental.",
      price: 320000,
      precio: 320000,
      image: lamparaHongo,
    },
  ],
  1980: [
    {
      id: 41,
      name: "Sillón Lounge 80s",
      category: "Sillones",
      description: "Sillón expresivo con presencia fuerte.",
      price: 740000,
      precio: 740000,
      image: sillonSpace,
    },
    {
      id: 42,
      name: "Aparador Dark Wood",
      category: "Almacenaje",
      description: "Mueble oscuro con estética ochentera.",
      price: 1100000,
      precio: 1100000,
      image: aparadorNogal,
    },
    {
      id: 43,
      name: "Lámpara Pop Orange",
      category: "Iluminación",
      description: "Lámpara protagonista de color intenso.",
      price: 290000,
      precio: 290000,
      image: lamparaHongo,
    },
  ],
  1990: [
    {
      id: 51,
      name: "Sillón Cozy Retro",
      category: "Sillones",
      description: "Sillón cómodo de tonos neutros y cálidos.",
      price: 690000,
      precio: 690000,
      image: sillonSpace,
    },
    {
      id: 52,
      name: "Aparador Natural",
      category: "Almacenaje",
      description: "Aparador simple de madera natural.",
      price: 960000,
      precio: 960000,
      image: aparadorNogal,
    },
    {
      id: 53,
      name: "Lámpara Mesa Cálida",
      category: "Iluminación",
      description: "Iluminación suave para espacios relajados.",
      price: 260000,
      precio: 260000,
      image: lamparaHongo,
    },
  ],
  2000: [
    {
      id: 61,
      name: "Sillón Neo Retro",
      category: "Sillones",
      description: "Sillón claro con detalles modernos.",
      price: 720000,
      precio: 720000,
      image: sillonSpace,
    },
    {
      id: 62,
      name: "Aparador Curvo Moderno",
      category: "Almacenaje",
      description: "Aparador minimalista con líneas limpias.",
      price: 1050000,
      precio: 1050000,
      image: aparadorNogal,
    },
    {
      id: 63,
      name: "Lámpara Mushroom 2000",
      category: "Iluminación",
      description: "Lámpara tipo mushroom con acabado brillante.",
      price: 350000,
      precio: 350000,
      image: lamparaHongo,
    },
  ],
};

function HomePage({
  favoritos = [],
  agregarAlCarrito,
  toggleFavorito,
}) {
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
      <Navbar activePage="inicio" />

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
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favoritos.includes(product.id)}
                  onToggleFavorite={toggleFavorito}
                  onAddToCart={agregarAlCarrito}
                />
              ))
            ) : (
              <p className="no-products-message">
                No encontramos productos para esa búsqueda en esta década.
              </p>
            )}
          </div>
        </section>

        <section className="home-map-section">
          <div className="home-map-info">
            <p className="section-eyebrow">Nuestro espacio</p>

            <h2>Encontrá inspiración cerca de casa</h2>

            <p>
              BackHome prepara un espacio físico para descubrir piezas retro,
              coordinar retiros y conocer nuevas colecciones.
            </p>

            <div className="home-map-address">
              <img src={ubicacionIcon} alt="" />
              <span>Montevideo, Uruguay</span>
            </div>
          </div>

          <div className="home-map-placeholder">
            <div className="map-grid"></div>

            <div className="map-pin">
              <img src={ubicacionIcon} alt="" />
            </div>

            <div className="map-card">
              <strong>Mapa próximamente</strong>
              <span>Espacio reservado para ubicación</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default HomePage;