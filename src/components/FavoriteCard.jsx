import "./FavoriteCard.css";

import favoritoIcon from "../../assets/images/favorito.png";

function formatPrice(price) {
  if (typeof price === "number") {
    return `$${new Intl.NumberFormat("es-UY").format(price)}`;
  }

  return price || "$0";
}

function FavoriteCard({ product, onRemove }) {
  return (
    <article className="favorite-card">
      <button
        type="button"
        className="favorite-card-remove"
        onClick={onRemove}
        aria-label={`Quitar ${product.name} de favoritos`}
      >
        ×
      </button>

      <img
        className="favorite-card-image"
        src={product.image}
        alt={product.name}
      />

      <div className="favorite-card-info">
        <h3>{product.name}</h3>

        <p className="favorite-card-category">{product.category}</p>

        <p className="favorite-card-price">{formatPrice(product.price)}</p>

        <div className="favorite-card-actions">
          <a href={`/producto/${product.id}`}>Ver detalle</a>

          <button
            type="button"
            className="favorite-card-heart"
            onClick={onRemove}
            aria-label={`Quitar ${product.name} de favoritos`}
          >
            <img src={favoritoIcon} alt="" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default FavoriteCard;