import "./ProductCard.css";

import carritoIcon from "../../assets/images/carrito.png";

function formatPrice(value) {
  const price = typeof value === "number" ? value : Number(value) || 0;

  return `$${new Intl.NumberFormat("es-UY").format(price)}`;
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

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const productPrice = product.price || product.precio;

  return (
    <article className="product-card">
      <img
        className="product-card-image"
        src={product.image}
        alt={product.name}
      />

      <div className="product-card-info">
        <h3>{product.name}</h3>

        <p className="product-card-category">{product.category}</p>

        {product.description && (
          <p className="product-card-description">{product.description}</p>
        )}

        {productPrice && <strong>{formatPrice(productPrice)}</strong>}

        <div className="product-card-actions">
          <a href={`/producto/${product.id}`}>Ver detalle</a>

          <button
            className="product-add-button"
            type="button"
            onClick={handleAddToCart}
          >
            <span>Agregar</span>
            <img src={carritoIcon} alt="" />
          </button>

          <button
            className={`product-favorite-button ${
              isFavorite ? "active" : ""
            }`}
            type="button"
            onClick={handleFavoriteClick}
            aria-label={
              isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"
            }
          >
            {isFavorite ? "♥" : "♡"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;