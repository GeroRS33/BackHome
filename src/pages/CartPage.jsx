import { Link } from "react-router";

import "./CartPage.css";

import Navbar from "../components/Navbar/Navbar";
import CartItem from "../components/CartItem/CartItem";
import CartSummary from "../components/CartSummary/CartSummary";

import disponibilidadIcon from "../assets/images/disponibilidad.png";

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

function CartPage({
  carrito = [],
  carritoCargando = false,
  carritoError = "",
  eliminarDelCarrito,
  modificarCantidad,
  total = 0,
}) {
  const itemCount = carrito.reduce(
    (acc, item) =>
      acc + (Number(item.cantidad) || 1),
    0
  );

  const handleRemove = (productId) => {
    if (eliminarDelCarrito) {
      eliminarDelCarrito(productId);
    }
  };

  const handleChangeQuantity = (
    productId,
    quantity
  ) => {
    if (modificarCantidad) {
      modificarCantidad(
        productId,
        quantity
      );
    }
  };

  return (
    <>
      <Navbar activePage="carrito" />

      <main className="cart-page">
        <section className="cart-header">
          <h1>
            Mi carrito{" "}
            <CartIcon className="cart-title-icon" />
          </h1>

          <p>
            Revisa tus piezas seleccionadas
            antes de finalizar tu compra.
          </p>
        </section>

        {carritoCargando ? (
          <section className="cart-layout">
            <div className="cart-left">
              <div className="cart-items">
                {Array.from({
                  length: 3,
                }).map((_, index) => (
                  <article
                    key={index}
                    className="cart-loading-item"
                  >
                    <div className="skeleton cart-loading-image" />

                    <div className="cart-loading-info">
                      <div className="skeleton cart-loading-title" />

                      <div className="skeleton cart-loading-category" />

                      <div className="skeleton cart-loading-price" />

                      <div className="cart-loading-bottom">
                        <div className="skeleton cart-loading-quantity" />

                        <div className="skeleton cart-loading-remove" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <article className="cart-loading-shipping">
                <div className="skeleton cart-loading-shipping-icon" />

                <div>
                  <div className="skeleton cart-loading-shipping-title" />
                  <div className="skeleton cart-loading-shipping-text" />
                </div>
              </article>
            </div>

            <aside className="cart-loading-summary">
              <div className="skeleton cart-loading-summary-title" />

              <div className="cart-loading-summary-lines">
                <div className="skeleton cart-loading-summary-line" />
                <div className="skeleton cart-loading-summary-line" />
                <div className="skeleton cart-loading-summary-line" />
              </div>

              <div className="skeleton cart-loading-summary-total" />

              <div className="skeleton cart-loading-summary-button" />
            </aside>
          </section>
        ) : carritoError ? (
          <section className="cart-empty">
            <h2>
              No pudimos cargar tu carrito
            </h2>

            <p>{carritoError}</p>

            <Link to="/productos">
              Volver al catálogo
            </Link>
          </section>
        ) : carrito.length > 0 ? (
          <section className="cart-layout">
            <div className="cart-left">
              <div className="cart-items">
                {carrito.map(
                  (product) => (
                    <CartItem
                      key={product.id}
                      product={product}
                      onRemove={
                        handleRemove
                      }
                      onChangeQuantity={
                        handleChangeQuantity
                      }
                    />
                  )
                )}
              </div>

              <article className="cart-shipping-box">
                <div className="cart-shipping-icon">
                  <img
                    src={
                      disponibilidadIcon
                    }
                    alt=""
                  />
                </div>

                <div>
                  <h3>
                    Envío gratis a todo Uruguay
                  </h3>

                  <p>
                    Recibí tus piezas retro
                    en la puerta de tu casa.
                  </p>
                </div>
              </article>
            </div>

            <CartSummary
              total={total}
              itemCount={itemCount}
            />
          </section>
        ) : (
          <section className="cart-empty">
            <div className="cart-empty-icon">
              <CartIcon className="cart-empty-svg" />
            </div>

            <h2>
              Tu carrito está vacío
            </h2>

            <p>
              Agregá piezas retro desde el
              catálogo para verlas acá antes
              de finalizar tu compra.
            </p>

            <Link to="/productos">
              Seguir comprando
            </Link>
          </section>
        )}
      </main>
    </>
  );
}

export default CartPage;