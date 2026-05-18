import { useParams } from "react-router";

import "./ProductDetailPage.css";

import Navbar from "../components/Navbar/Navbar";
import ProductGallery from "../components/ProductGallery/ProductGallery";
import ProductSpecs from "../components/ProductSpecs/ProductSpecs";
import ProductCard from "../components/ProductCard/ProductCard";

import { productos } from "../data/products";

import coloresIcon from "../assets/images/coloresdisponibles.png";
import envioIcon from "../assets/images/envio.png";

function ProductDetailPage({
  favoritos = [],
  agregarAlCarrito,
  toggleFavorito,
}) {
  const { id } = useParams();

  const product = productos.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <>
        <Navbar activePage="" />

        <main className="product-detail-page">
          <h1>Producto no encontrado</h1>
          <a href="/productos">Volver al catálogo</a>
        </main>
      </>
    );
  }

  const isFavorite = favoritos.includes(product.id);

  const relatedProducts = productos
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, 3);

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
          <ProductGallery
            images={product.images}
            productName={product.name}
          />

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
                Agregar al carrito
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
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
                isFavorite={favoritos.includes(relatedProduct.id)}
                onToggleFavorite={toggleFavorito}
                onAddToCart={agregarAlCarrito}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default ProductDetailPage;