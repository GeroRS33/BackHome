import { useMemo, useState } from "react";

import "./HomePage.css";

import Navbar from "../components/Navbar/Navbar";
import TimelineSelector from "../components/TimelineSelector/TimelineSelector";

import heroImage from "../assets/images/fondohome.png";
import searchIcon from "../assets/images/buscar.png";
import favoriteIcon from "../assets/images/favorito.png";

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
      "Líneas elegantes, detalles cromados y piezas funcionales con encanto clásico.",
    palette: ["#5b2f1c", "#b75f2a", "#d6a85f", "#7f7b52", "#d9c29d", "#efe1ca"],
  },
  1960: {
    title: "Años 60",
    description:
      "Formas simples, madera clara y una estética moderna con aire optimista.",
    palette: ["#3d2b20", "#a65f2b", "#d6b36a", "#8c9364", "#c9ad82", "#eadcc3"],
  },
  1970: {
    title: "Años 70",
    description:
      "Colores tierra, formas orgánicas y mucho carácter. Descubre lo mejor del diseño setentero.",
    palette: ["#71380f", "#d85105", "#d89a27", "#7f873c", "#d4ae73", "#e5d6bd"],
  },
  1980: {
    title: "Años 80",
    description:
      "Contrastes marcados, siluetas expresivas y objetos decorativos con personalidad.",
    palette: ["#2f241f", "#c45b2c", "#d89a27", "#6f7c55", "#b98f63", "#ead8c2"],
  },
  1990: {
    title: "Años 90",
    description:
      "Comodidad, tonos neutros y piezas versátiles para espacios cálidos y simples.",
    palette: ["#3b2a24", "#7a4e2d", "#c49a62", "#8d8f72", "#d3b994", "#eee1cf"],
  },
  2000: {
    title: "Años 2000",
    description:
      "Minimalismo cálido, materiales nobles y objetos retro reinterpretados.",
    palette: ["#352821", "#8b5733", "#d1a35d", "#8a8b68", "#d8c2a2", "#f1e4d2"],
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

            <a href="/productos" className="selected-link">
              Ver inspiración de los {String(selectedDecade).slice(2)}{" "}
              <span>›</span>
            </a>

            <img className="selected-lamp" src={lamparaIcon} alt="" />
            <img className="selected-lines" src={lineasIcon} alt="" />
            <img className="selected-plant" src={plantaIcon} alt="" />
          </div>

          <div className="selected-products">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <article className="home-product-card" key={product.id}>
                  <img src={product.image} alt={product.name} />

                  <div className="home-product-info">
                    <h3>{product.name}</h3>
                    <p>{product.category}</p>

                    <div className="home-product-actions">
                      <a href={`/producto/${product.id}`}>Ver detalle</a>

                      <button type="button">
                        <img src={favoriteIcon} alt="Guardar favorito" />
                      </button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <p className="no-products-message">
                No encontramos productos para esa búsqueda en esta década.
              </p>
            )}
          </div>
        </section>

        <section className="home-explore">
          <div>
            <h2>Explora por década</h2>
            <p>Viaja por el tiempo y encuentra tu estilo.</p>
          </div>

          <div className="palette-row">
            <span>Paleta inspiracional</span>

            <div className="palette-colors">
              {decadeInfo.palette.map((color) => (
                <i key={color} style={{ backgroundColor: color }}></i>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default HomePage;