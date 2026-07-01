import {
  useEffect,
  useState,
} from "react";

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

function CheckIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12.5L9.2 16.5L19 7"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
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
  const [isAdding, setIsAdding] =
    useState(false);

  const [wasAdded, setWasAdded] =
    useState(false);

  useEffect(() => {
    if (!wasAdded) {
      return undefined;
    }

    const timeout =
      window.setTimeout(() => {
        setWasAdded(false);
      }, 2000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [wasAdded]);

  const handleFavoriteClick = () => {
    if (onToggleFavorite) {
      onToggleFavorite(product.id);
    }
  };

  const handleAddToCart = async () => {
    if (!onAddToCart || isAdding) {
      return;
    }

    try {
      setIsAdding(true);
      setWasAdded(false);

      await onAddToCart(product);

      setWasAdded(true);
    } catch (error) {
      console.error(
        "Error agregando producto al carrito:",
        error
      );
    } finally {
      setIsAdding(false);
    }
  };

  const productPrice =
    product.price ||
    product.precio ||
    0;

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
            className={`product-add-button ${wasAdded ? "added" : ""
              }`}
            type="button"
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            <span>Agregar</span>

            {wasAdded ? (
              <CheckIcon className="product-add-check-icon" />
            ) : (
              <CartIcon className="product-add-cart-icon" />
            )}
          </button>
        </div>

        <button
          className={`product-favorite-button ${isFavorite ? "active" : ""
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