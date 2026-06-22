import { Link } from "react-router";
import "./ProductCard.css";

function CartIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 7H9L12 21H25L28 11H11"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="14"
        cy="26"
        r="2"
        stroke="currentColor"
        strokeWidth="2.2"
      />

      <circle
        cx="24"
        cy="26"
        r="2"
        stroke="currentColor"
        strokeWidth="2.2"
      />
    </svg>
  );
}

function formatPrice(value) {
  const price =
    typeof value === "number"
      ? value
      : Number(value) || 0;

  return `$${new Intl.NumberFormat(
    "es-UY"
  ).format(price)}`;
}

function ProductCard({
  product,
  isFavorite = false,
  onToggleFavorite,
  onAddToCart,
}) {
  const handleFavoriteClick = () => {
    if (onToggleFavorite) {
      onToggleFavorite(product.id);
    }
  };

  const handleAddToCart = async () => {
    if (!onAddToCart) {
      return;
    }

    try {
      await onAddToCart(product);
    } catch (error) {
      console.error(
        "Error agregando producto al carrito:",
        error
      );
    }
  };

  const productPrice =
    product.price || product.precio || 0;

  return (
    <article className="product-card">
      {product.image ? (
        <img
          className="product-card-image"
          src={product.image}
          alt={product.name}
        />
      ) : (
        <div
          className="product-card-image"
          aria-label="Imagen no disponible"
        />
      )}

      <div className="product-card-info">
        <h3>{product.name}</h3>

        <p className="product-card-category">
          {product.category}
        </p>

        {product.description && (
          <p className="product-card-description">
            {product.description}
          </p>
        )}

        <strong>
          {formatPrice(productPrice)}
        </strong>

        <div className="product-card-actions">
          <Link
            to={`/producto/${product.id}?decada=${product.decade}`}
          >
            Ver detalle
          </Link>

          <button
            className="product-add-button"
            type="button"
            onClick={handleAddToCart}
          >
            <span>Agregar</span>

            <CartIcon className="product-add-cart-icon" />
          </button>
        </div>

        <button
          className={`product-favorite-button ${
            isFavorite ? "active" : ""
          }`}
          type="button"
          onClick={handleFavoriteClick}
          aria-label={
            isFavorite
              ? "Quitar de favoritos"
              : "Agregar a favoritos"
          }
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;