import "./CartSummary.css";

import decoracionPerfil from "../../assets/images/decoracionperfil.png";

function formatPrice(value) {
  const price = typeof value === "number" ? value : Number(value) || 0;

  return `$${new Intl.NumberFormat("es-UY").format(price)}`;
}

function CartSummary({ total = 0, itemCount = 0 }) {
  return (
    <aside className="cart-summary">
      <h2>Resumen</h2>

      <div className="cart-summary-line"></div>

      <div className="cart-summary-row">
        <span>Subtotal ({itemCount} productos)</span>
        <strong>{formatPrice(total)}</strong>
      </div>

      <div className="cart-summary-row cart-summary-shipping">
        <div>
          <span>Envío</span>
          <p>Envío gratis a todo Uruguay.</p>
        </div>

        <strong>$0</strong>
      </div>

      <div className="cart-summary-line"></div>

      <div className="cart-summary-total">
        <span>Total</span>
        <strong>{formatPrice(total)}</strong>
      </div>

      <a className="checkout-button" href="/checkout">
        Continuar al checkout
      </a>

      <a className="continue-button" href="/productos">
        Seguir comprando
      </a>

      <img className="cart-summary-decoration" src={decoracionPerfil} alt="" />
    </aside>
  );
}

export default CartSummary;