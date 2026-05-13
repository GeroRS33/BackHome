import "./ProductCard.css";

import favoriteIcon from "../../assets/images/favorito.png";

function HomeProductCard({ product }) {
  return (
    <article className="home-product-card">
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
  );
}

export default HomeProductCard;