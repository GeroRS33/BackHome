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

import sillonSpace from "../assets/images/sillonspace.png";
import lamparaHongo from "../assets/images/lamparahongo.png";
import plantaImg from "../assets/images/planta.png";

const orderProducts = [
  {
    id: 31,
    name: "Sillón Space Age",
    category: "Sala",
    quantity: 1,
    price: "$890.000",
    image: sillonSpace,
  },
  {
    id: 33,
    name: "Lámpara Hongo",
    category: "Iluminación",
    quantity: 1,
    price: "$320.000",
    image: lamparaHongo,
  },
  {
    id: 34,
    name: "Florero Cerámica",
    category: "Decoración",
    quantity: 1,
    price: "$150.000",
    image: plantaImg,
  },
];

function ConfirmationPage() {
  return (
    <>
      <Navbar />

      <main className="confirmation-page">
        <section className="confirmation-hero">
          <div className="confirmation-check">
            <img src={compraRealizadaIcon} alt="" />
          </div>

          <div>
            <h1>¡Compra realizada! ✨</h1>
            <p>Gracias por elegir BackHome.</p>
            <p>Tu pedido fue confirmado correctamente.</p>
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
                <img src={numeroPedidoIcon} alt="" />
              </div>

              <h2>Pedido #BH-2024-007</h2>
            </header>

            <section className="order-status-grid">
              <div className="order-status-item">
                <img src={calendarioIcon} alt="" />

                <div>
                  <h3>Fecha del pedido</h3>
                  <p>12 de mayo, 2024</p>
                  <p>11:24 hs</p>
                </div>
              </div>

              <div className="order-status-item">
                <img src={estadoPedidoIcon} alt="" />

                <div>
                  <h3>Estado de pago</h3>
                  <span>Pago aprobado</span>
                </div>
              </div>

              <div className="order-status-item">
                <img src={envioIcon} alt="" />

                <div>
                  <h3>Método de envío</h3>
                  <p>Envío estándar</p>
                  <p>Entrega estimada: 16 - 20 may</p>
                </div>
              </div>
            </section>

            <section className="order-products-summary">
              <h3>Resumen de tu pedido</h3>

              <div className="confirmation-products-list">
                {orderProducts.map((product) => (
                  <article key={product.id} className="confirmation-product">
                    <img src={product.image} alt={product.name} />

                    <div>
                      <h4>{product.name}</h4>
                      <p>{product.category}</p>
                    </div>

                    <span>Cantidad: {product.quantity}</span>

                    <strong>{product.price}</strong>
                  </article>
                ))}
              </div>

              <footer className="confirmation-total">
                <span>Total pagado</span>
                <strong>$1.360.000</strong>
              </footer>
            </section>
          </article>

          <aside className="delivery-card">
            <header className="delivery-card-header">
              <div className="delivery-icon">
                <img src={ubicacionIcon} alt="" />
              </div>

              <h2>Detalles de entrega</h2>
            </header>

            <div className="delivery-info">
              <div>
                <h3>Nombre</h3>
                <p>Valentina Retro</p>
              </div>

              <div>
                <h3>Email</h3>
                <p>valentina@backhome.com</p>
              </div>

              <div>
                <h3>Dirección de envío</h3>
                <p>Calle Solís 1234, Apto. 5B</p>
                <p>Barrio Centro</p>
                <p>Montevideo, Uruguay</p>
                <p>CP 11000</p>
              </div>

              <div>
                <h3>Teléfono de contacto</h3>
                <p>+598 99 123 456</p>
              </div>
            </div>

            <article className="delivery-note">
              <div>
                <img src={disponibilidadIcon} alt="" />
              </div>

              <p>
                Te enviaremos un correo con los detalles de tu pedido y el número
                de seguimiento cuando tu compra sea despachada.
              </p>
            </article>
          </aside>
        </section>

        <section className="confirmation-actions">
          <a className="primary-confirmation-button" href="/productos">
            Seguir explorando
          </a>

          <a className="secondary-confirmation-button" href="/perfil">
            Ver mis pedidos
          </a>
        </section>
      </main>
    </>
  );
}

export default ConfirmationPage;