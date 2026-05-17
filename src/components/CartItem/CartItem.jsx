import "./CartItem.css";

import basureroIcon from "../../assets/images/basurero.png";

function formatPrice(value) {
  const price = typeof value === "number" ? value : Number(value) || 0;

  return `$${new Intl.NumberFormat("es-UY").format(price)}`;
}

function CartItem({ product, onRemove, onChangeQuantity }) {
  const price = product.precio || product.price || 0;
  const quantity = product.cantidad || 1;

  return (
    <article className="cart-item">
      <img className="cart-item-image" src={product.image} alt={product.name} />

      <div className="cart-item-info">
        <h3>{product.name}</h3>
        <p className="cart-item-category">{product.category}</p>

        {product.description && (
          <p className="cart-item-description">{product.description}</p>
        )}
      </div>

      <strong className="cart-item-price">{formatPrice(price)}</strong>

      <div className="cart-item-controls">
        <button
          type="button"
          onClick={() => onChangeQuantity(product.id, quantity - 1)}
          aria-label="Restar cantidad"
        >
          −
        </button>

        <span>{quantity}</span>

        <button
          type="button"
          onClick={() => onChangeQuantity(product.id, quantity + 1)}
          aria-label="Sumar cantidad"
        >
          +
        </button>
      </div>

      <button
        type="button"
        className="cart-item-delete"
        onClick={() => onRemove(product.id)}
        aria-label={`Eliminar ${product.name} del carrito`}
      >
        <img src={basureroIcon} alt="" />
      </button>
    </article>
  );
}

export default CartItem;