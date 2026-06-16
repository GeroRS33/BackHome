import { useMemo, useState } from "react";
import "./HomePage.css";
import Navbar from "../components/Navbar/Navbar";
import TimelineSelector from "../components/TimelineSelector/TimelineSelector";
import ProductCard from "../components/ProductCard/ProductCard";
import Palette from "../components/Palette/Palette";
import heroImage from "../assets/images/fondohome.png";
import searchIcon from "../assets/images/buscar.png";
import ubicacionIcon from "../assets/images/ubicacion.png";
import lamparaIcon from "../assets/images/lampara.png";
import lineasIcon from "../assets/images/lineas.png";
import plantaIcon from "../assets/images/planta.png";
import { productos } from "../data/products";
import BackHomeMap from "../components/BackHomeMap/BackHomeMap";

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

function HomePage({
  favoritos = [],
  agregarAlCarrito,
  toggleFavorito,
}) {
  const [selectedDecade, setSelectedDecade] = useState(1970);
  const [searchTerm, setSearchTerm] = useState("");

  const decadeInfo = decadesInfo[selectedDecade];

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();

    const decadeProducts = productos.filter(
      (product) => product.decade === selectedDecade
    );

    if (!normalizedSearch) {
      return decadeProducts.slice(0, 3);
    }

    return decadeProducts
      .filter((product) => {
        return (
          product.name.toLowerCase().includes(normalizedSearch) ||
          product.category.toLowerCase().includes(normalizedSearch) ||
          product.material.toLowerCase().includes(normalizedSearch) ||
          product.description.toLowerCase().includes(normalizedSearch) ||
          String(selectedDecade).includes(normalizedSearch)
        );
      })
      .slice(0, 3);
  }, [searchTerm, selectedDecade]);

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

            <a href={`/productos?decada=${selectedDecade}`} className="selected-link">
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

          <BackHomeMap />
        </section>
      </main>
    </>
  );
}

export default HomePage;