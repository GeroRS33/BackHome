import "./CartPage.css";

import Navbar from "../components/Navbar/Navbar";
import CartItem from "../components/CartItem/CartItem";
import CartSummary from "../components/CartSummary/CartSummary";

import carritoIcon from "../assets/images/carrito.png";
import disponibilidadIcon from "../assets/images/disponibilidad.png";

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
            Mi carrito <img src={carritoIcon} alt="" />
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
              <img src={carritoIcon} alt="" />
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