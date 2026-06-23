import { Link, Navigate } from "react-router";
import "./ConfirmationPage.css";

import Navbar from "../components/Navbar/Navbar";

import compraRealizadaIcon from "../assets/images/comprarealizada.png";
import decoracionCarrito from "../assets/images/decoracioncarrito.png";
import calendarioIcon from "../assets/images/calendario.png";
import estadoPedidoIcon from "../assets/images/estadopedido.png";
import envioIcon from "../assets/images/envio.png";
import numeroPedidoIcon from "../assets/images/numeropedido.png";
import ubicacionIcon from "../assets/images/ubicacion.png";
import disponibilidadIcon from "../assets/images/disponibilidad.png";

function formatPrice(value) {
  const price =
    typeof value === "number"
      ? value
      : Number(value) || 0;

  return `$${new Intl.NumberFormat(
    "es-UY"
  ).format(price)}`;
}

function getProductPrice(product) {
  return Number(
    product.price ||
      product.precio ||
      0
  );
}

function formatShortDate(date) {
  return date.toLocaleDateString("es-UY", {
    day: "numeric",
    month: "short",
  });
}

function getEstimatedDeliveryRange(
  orderDate = new Date()
) {
  const startDate = new Date(orderDate);
  startDate.setDate(startDate.getDate() + 3);

  const endDate = new Date(orderDate);
  endDate.setDate(endDate.getDate() + 7);

  return `${formatShortDate(
    startDate
  )} - ${formatShortDate(endDate)}`;
}

function getOrderDate(ultimoPedido) {
  if (ultimoPedido?.fechaISO) {
    const isoDate = new Date(
      ultimoPedido.fechaISO
    );

    if (!Number.isNaN(isoDate.getTime())) {
      return isoDate;
    }
  }

  return new Date();
}

function getStoredLastOrder() {
  const storedOrder =
    localStorage.getItem("ultimoPedido");

  if (!storedOrder) {
    return null;
  }

  try {
    return JSON.parse(storedOrder);
  } catch {
    return null;
  }
}

function ConfirmationPage() {
  const ultimoPedido = getStoredLastOrder();

  if (!ultimoPedido) {
    return (
      <Navigate
        to="/productos"
        replace
      />
    );
  }

  const productosPedido =
    ultimoPedido.productos || [];

  const datosEntrega =
    ultimoPedido.datosEntrega || {};

  const totalPedido =
    ultimoPedido.total || 0;

  const orderDate =
    getOrderDate(ultimoPedido);

  const estimatedDelivery =
    getEstimatedDeliveryRange(orderDate);

  return (
    <>
      <Navbar activePage="carrito" />

      <main className="confirmation-page">
        <section className="confirmation-hero">
          <div className="confirmation-check">
            <img
              src={compraRealizadaIcon}
              alt=""
            />
          </div>

          <div>
            <h1>¡Compra realizada! ✨</h1>
            <p>
              Gracias por elegir BackHome.
            </p>
            <p>
              Tu pedido fue confirmado
              correctamente.
            </p>
          </div>

          <img
            className="confirmation-decoration"
            src={decoracionCarrito}
            alt=""
          />
        </section>

        <section className="confirmation-layout">
          <article className="order-confirmation-card">
            <header className="order-confirmation-header">
              <div className="order-number-icon">
                <img
                  src={numeroPedidoIcon}
                  alt=""
                />
              </div>

              <h2>
                Pedido #
                {ultimoPedido.codigo ||
                  "BH-PEDIDO"}
              </h2>
            </header>

            <section className="order-status-grid">
              <div className="order-status-item">
                <img
                  src={calendarioIcon}
                  alt=""
                />

                <div>
                  <h3>Fecha del pedido</h3>
                  <p>
                    {ultimoPedido.fecha ||
                      "Fecha no disponible"}
                  </p>
                  <p>
                    {ultimoPedido.hora || ""}
                  </p>
                </div>
              </div>

              <div className="order-status-item">
                <img
                  src={estadoPedidoIcon}
                  alt=""
                />

                <div>
                  <h3>Estado de pago</h3>
                  <span>Pago aprobado</span>
                </div>
              </div>

              <div className="order-status-item">
                <img
                  src={envioIcon}
                  alt=""
                />

                <div>
                  <h3>Método de envío</h3>
                  <p>Envío estándar</p>
                  <p>
                    Entrega estimada:{" "}
                    {estimatedDelivery}
                  </p>
                </div>
              </div>
            </section>

            <section className="order-products-summary">
              <h3>Resumen de tu pedido</h3>

              {productosPedido.length > 0 ? (
                <div className="confirmation-products-list">
                  {productosPedido.map(
                    (product, index) => {
                      const productName =
                        product.name ||
                        product.nombre ||
                        "Producto";

                      const productCategory =
                        product.category ||
                        product.categoria ||
                        "";

                      const productImage =
                        product.image ||
                        product.imagen ||
                        "";

                      const quantity =
                        product.cantidad || 1;

                      const productKey =
                        product.apiId ||
                        product.id ||
                        `${productName}-${index}`;

                      return (
                        <article
                          key={productKey}
                          className="confirmation-product"
                        >
                          {productImage && (
                            <img
                              src={productImage}
                              alt={productName}
                            />
                          )}

                          <div>
                            <h4>
                              {productName}
                            </h4>

                            <p>
                              {productCategory}
                            </p>
                          </div>

                          <span>
                            Cantidad: {quantity}
                          </span>

                          <strong>
                            {formatPrice(
                              getProductPrice(
                                product
                              ) * quantity
                            )}
                          </strong>
                        </article>
                      );
                    }
                  )}
                </div>
              ) : (
                <p className="confirmation-empty">
                  No hay productos guardados en
                  este pedido.
                </p>
              )}

              <footer className="confirmation-total">
                <span>Total pagado</span>
                <strong>
                  {formatPrice(totalPedido)}
                </strong>
              </footer>
            </section>
          </article>

          <aside className="delivery-card">
            <header className="delivery-card-header">
              <div className="delivery-icon">
                <img
                  src={ubicacionIcon}
                  alt=""
                />
              </div>

              <h2>Detalles de entrega</h2>
            </header>

            <div className="delivery-info">
              <div>
                <h3>Nombre</h3>
                <p>
                  {datosEntrega.nombre ||
                    "No disponible"}
                </p>
              </div>

              <div>
                <h3>Email</h3>
                <p>
                  {datosEntrega.email ||
                    "No disponible"}
                </p>
              </div>

              <div>
                <h3>
                  Dirección de envío
                </h3>
                <p>
                  {datosEntrega.direccion ||
                    "No disponible"}
                </p>
              </div>

              <div>
                <h3>
                  Teléfono de contacto
                </h3>
                <p>
                  {datosEntrega.telefono ||
                    "No disponible"}
                </p>
              </div>
            </div>

            <article className="delivery-note">
              <div>
                <img
                  src={disponibilidadIcon}
                  alt=""
                />
              </div>

              <p>
                Te enviaremos un correo con los
                detalles de tu pedido y el número
                de seguimiento cuando tu compra
                sea despachada.
              </p>
            </article>
          </aside>
        </section>

        <section className="confirmation-actions">
          <Link
            className="primary-confirmation-button"
            to="/productos"
          >
            Seguir explorando
          </Link>

          <Link
            className="secondary-confirmation-button"
            to="/perfil"
          >
            Ver mis pedidos
          </Link>
        </section>
      </main>
    </>
  );
}

export default ConfirmationPage;