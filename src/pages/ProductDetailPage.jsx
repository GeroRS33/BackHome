import "./ProductDetailPage.css";
import Navbar from "../components/Navbar/Navbar";
import ProductGallery from "../components/ProductGallery/ProductGallery";
import ProductSpecs from "../components/ProductSpecs/ProductSpecs";
import ProductCard from "../components/ProductCard/ProductCard";
import { productos } from "../data/products";
import precioIcon from "../assets/images/etiquetaprecio.png";
import envioIcon from "../assets/images/envio.png";
import { useLocation, useNavigate, useParams } from "react-router";

function formatPrice(value) {
  const price = typeof value === "number" ? value : Number(value) || 0;

  return `$${new Intl.NumberFormat("es-UY").format(price)}`;
}

function HeartIcon({ filled = false }) {
  return (
    <svg
      className="favorite-heart-icon"
      viewBox="0 0 32 32"
      fill={filled ? "currentColor" : "none"}
      aria-hidden="true"
    >
      <path
        d="M16 27S5 20.5 5 11.8C5 7.7 7.8 5 11.3 5C13.4 5 15.1 6.1 16 7.7C16.9 6.1 18.6 5 20.7 5C24.2 5 27 7.7 27 11.8C27 20.5 16 27 16 27Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProductDetailPage({
  favoritos = [],
  agregarAlCarrito,
  toggleFavorito,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const decadeFromUrl = searchParams.get("decada");

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
          <a href={`/productos?decada=${decadeFromUrl || product.decade}`}>
            Productos
          </a>
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
                <img src={precioIcon} alt="" />
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
                <HeartIcon filled={isFavorite} />
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