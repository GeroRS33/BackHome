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
      <circle cx="14" cy="26" r="2" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="24" cy="26" r="2" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  );
}

function CartPage({
  carrito = [],
  eliminarDelCarrito,
  modificarCantidad,
  vaciarCarrito,
  total = 0,
}) {
  const itemCount = carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0);

  const handleRemove = (productId) => {
    if (eliminarDelCarrito) {
      eliminarDelCarrito(productId);
    }
  };

  const handleChangeQuantity = (productId, quantity) => {
    if (modificarCantidad) {
      modificarCantidad(productId, quantity);
    }
  };

  return (
    <>
      <Navbar activePage="carrito" />

      <main className="cart-page">
        <section className="cart-header">
          <h1>
            Mi carrito <CartIcon className="cart-title-icon" />
          </h1>

          <p>Revisa tus piezas seleccionadas antes de finalizar tu compra.</p>
        </section>

        {carrito.length > 0 ? (
          <section className="cart-layout">
            <div className="cart-left">
              <div className="cart-items">
                {carrito.map((product) => (
                  <CartItem
                    key={product.id}
                    product={product}
                    onRemove={handleRemove}
                    onChangeQuantity={handleChangeQuantity}
                  />
                ))}
              </div>

              <article className="cart-shipping-box">
                <div className="cart-shipping-icon">
                  <img src={disponibilidadIcon} alt="" />
                </div>

                <div>
                  <h3>Envío gratis a todo Uruguay</h3>
                  <p>Recibí tus piezas retro en la puerta de tu casa.</p>
                </div>
              </article>
            </div>

            <CartSummary total={total} itemCount={itemCount} />
          </section>
        ) : (
          <section className="cart-empty">
            <div className="cart-empty-icon">
              <CartIcon className="cart-empty-svg" />
            </div>

            <h2>Tu carrito está vacío</h2>

            <p>
              Agregá piezas retro desde el catálogo para verlas acá antes de
              finalizar tu compra.
            </p>

            <a href="/productos">Seguir comprando</a>
          </section>
        )}
      </main>
    </>
  );
}

export default CartPage;