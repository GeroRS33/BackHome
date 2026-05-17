import "./CartItem.css";

function TrashIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 7H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 7V5C9 4.4 9.4 4 10 4H14C14.6 4 15 4.4 15 5V7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 7L17.1 19C17 19.6 16.6 20 16 20H8C7.4 20 7 19.6 6.9 19L6 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10 11V16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14 11V16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

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
        <TrashIcon className="cart-delete-icon" />
      </button>
    </article>
  );
}

export default CartItem;