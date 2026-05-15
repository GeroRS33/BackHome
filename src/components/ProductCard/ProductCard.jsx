import "./ProductCard.css";

import favoriteIcon from "../../assets/images/favorito.png";

function ProductCard({ product, isFavorite = false, onToggleFavorite }) {
  const handleFavoriteClick = () => {
    if (onToggleFavorite) {
      onToggleFavorite(product.id);
    }
  };

  return (
    <article className="product-card">
      <img className="product-card-image" src={product.image} alt={product.name} />

      <div className="product-card-info">
        <h3>{product.name}</h3>

        <p className="product-card-category">{product.category}</p>

        {product.description && (
          <p className="product-card-description">{product.description}</p>
        )}

        {product.price && <strong>{product.price}</strong>}

        <div className="product-card-actions">
          <a href={`/producto/${product.id}`}>Ver detalle</a>

          <button
            className={isFavorite ? "active" : ""}
            type="button"
            onClick={handleFavoriteClick}
          >
            <img src={favoriteIcon} alt="Guardar favorito" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;