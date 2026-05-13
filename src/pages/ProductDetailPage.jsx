import "./ProductDetailPage.css";

import Navbar from "../components/Navbar/Navbar";
import ProductGallery from "../components/ProductGallery/ProductGallery";
import ProductSpecs from "../components/ProductSpecs/ProductSpecs";
import ProductCard from "../components/ProductCard/ProductCard";

import sofa1 from "../assets/images/sofa1.png";
import sofa2 from "../assets/images/sofa2.png";
import sofa3 from "../assets/images/sofa3.png";

import aparadorNogal from "../assets/images/aparadornogal.png";
import lamparaHongo from "../assets/images/lamparahongo.png";
import sillonSpace from "../assets/images/sillonspace.png";

import materialesIcon from "../assets/images/materiales.png";
import dimensionesIcon from "../assets/images/dimensiones.png";
import coloresIcon from "../assets/images/coloresdisponibles.png";
import envioIcon from "../assets/images/envio.png";

const product = {
  id: 31,
  name: "Sillón Space Age",
  tag: "Inspiración años 70",
  description:
    "Un ícono del diseño retro que combina curvas envolventes y comodidad excepcional. Perfecto para darle personalidad y calidez a cualquier espacio.",
  images: [sofa1, sofa2, sofa3],
  colors: ["#c64f05", "#d89a27", "#8a8b42", "#5a3215", "#d9c7aa"],
  specs: [
    {
      title: "Materiales",
      text: "Tapizado en pana de algodón, base metálica cromada.",
      icon: materialesIcon,
    },
    {
      title: "Dimensiones",
      text: "Ancho 82 cm · Profundidad 85 cm · Alto 80 cm. Altura del asiento 42 cm.",
      icon: dimensionesIcon,
    },
  ],
};

const relatedProducts = [
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
  {
    id: 34,
    name: "Mesa Ratona Orbital",
    category: "Sala",
    image: sillonSpace,
  },
];

function ProductDetailPage({
  favoritos = [],
  agregarAlCarrito,
  toggleFavorito,
}) {
  const isFavorite = favoritos.includes(product.id);

  const handleSave = () => {
    if (toggleFavorito) {
      toggleFavorito(product.id);
    }
  };

  const handleAvailability = () => {
    if (agregarAlCarrito) {
      agregarAlCarrito(product);
    }
  };

  return (
    <>
      <Navbar activePage="" />

      <main className="product-detail-page">
        <div className="product-breadcrumb">
          <a href="/">Inicio</a>
          <span>›</span>
          <a href="/productos">Productos</a>
          <span>›</span>
          <p>{product.name}</p>
        </div>

        <section className="product-detail-main">
          <ProductGallery images={product.images} productName={product.name} />

          <section className="product-detail-info">
            <p className="product-tag">{product.tag}</p>

            <h1>{product.name}</h1>

            <p className="product-description">{product.description}</p>

            <ProductSpecs specs={product.specs} />

            <div className="product-colors">
              <div className="product-color-icon">
                <img src={coloresIcon} alt="" />
              </div>

              <div>
                <h3>Colores disponibles</h3>

                <div className="product-color-list">
                  {product.colors.map((color) => (
                    <span
                      key={color}
                      style={{ backgroundColor: color }}
                    ></span>
                  ))}
                </div>
              </div>
            </div>

            <div className="product-actions">
              <button
                className={`save-button ${isFavorite ? "active" : ""}`}
                type="button"
                onClick={handleSave}
              >
                <span>{isFavorite ? "♥" : "♡"}</span>
                Guardar
              </button>

              <button
                className="availability-button"
                type="button"
                onClick={handleAvailability}
              >
                Consultar disponibilidad
              </button>
            </div>

            <div className="product-shipping">
              <img src={envioIcon} alt="" />
              <span>Envíos a todo el país</span>
              <i>•</i>
              <span>Armado no incluido</span>
            </div>
          </section>
        </section>

        <section className="related-section">
          <h2>Productos relacionados</h2>

          <div className="related-grid">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default ProductDetailPage;