import { useNavigate, useParams } from "react-router";

import "./ProductDetailPage.css";

import Navbar from "../components/Navbar/Navbar";
import ProductGallery from "../components/ProductGallery/ProductGallery";
import ProductSpecs from "../components/ProductSpecs/ProductSpecs";
import ProductCard from "../components/ProductCard/ProductCard";

import { productos } from "../data/products";

import coloresIcon from "../assets/images/coloresdisponibles.png";
import envioIcon from "../assets/images/envio.png";

function formatPrice(value) {
  const price = typeof value === "number" ? value : Number(value) || 0;

  return `$${new Intl.NumberFormat("es-UY").format(price)}`;
}


function ProductDetailPage({
  favoritos = [],
  agregarAlCarrito,
  toggleFavorito,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

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
    .filter(
      (item) => item.id !== product.id && item.category === product.category
    )
    .slice(0, 3);

  const handleSave = () => {
    if (toggleFavorito) {
      toggleFavorito(product.id);
    }
  };

  const handleComprar = () => {
    if (agregarAlCarrito) {
      agregarAlCarrito(product);
    }

    navigate("/carrito");
  };

  return (
    <>
      <Navbar activePage="" />

      <main className="product-detail-page">
        <div className="product-breadcrumb">
          <a href="/home">Inicio</a>
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

            <div className="product-price-box">
              <div className="product-color-icon">
                <img src={coloresIcon} alt="" />
              </div>

              <div>
                <h3>Precio</h3>
                <strong>{formatPrice(product.price || product.precio)}</strong>
              </div>
            </div>

            <div className="product-actions">
              <button
                className={`save-button ${isFavorite ? "active" : ""}`}
                type="button"
                onClick={handleSave}
              >
                <span>{isFavorite ? "♥️" : "♡"}</span>
                Guardar
              </button>

              <button
                className="availability-button"
                type="button"
                onClick={handleComprar}
              >
                Comprar
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