import "./HomePage.css";

import Navbar from "../components/Navbar/Navbar";

import fondo from "../assets/images/fondo.png";
import heartIcon from "../assets/images/corazon.png";
import tagIcon from "../assets/images/etiqueta.png";
import boxIcon from "../assets/images/disponibilidad.png";

function HomePage() {
  return (
    <>
      <Navbar />

      <main className="home-page">
        <section className="home-hero">
          <div className="home-hero-content">
            <p className="home-eyebrow">Retro living collection</p>

            <h1>
              Objetos con historia para volver a sentirte en casa.
            </h1>

            <p className="home-description">
              Descubrí muebles, lámparas y piezas seleccionadas con estética
              vintage de los 60, 70 y 80.
            </p>

            <div className="home-actions">
              <a href="/productos" className="home-primary-button">
                Ver catálogo
              </a>

              <a href="/productos" className="home-secondary-button">
                Explorar décadas
              </a>
            </div>
          </div>

          <div className="home-hero-image">
            <img src={fondo} alt="Living retro con sillón vintage" />

            <div className="home-floating-card">
              <span>Década destacada</span>
              <strong>70s</strong>
              <p>Madera, tonos cálidos y formas curvas.</p>
            </div>
          </div>
        </section>

        <section className="home-features">
          <article>
            <div className="home-feature-icon">
              <img src={heartIcon} alt="" />
            </div>
            <h3>Piezas favoritas</h3>
            <p>Guardá objetos para volver a verlos más tarde.</p>
          </article>

          <article>
            <div className="home-feature-icon">
              <img src={tagIcon} alt="" />
            </div>
            <h3>Estilo curado</h3>
            <p>Una selección pensada para hogares con identidad.</p>
          </article>

          <article>
            <div className="home-feature-icon">
              <img src={boxIcon} alt="" />
            </div>
            <h3>Disponibilidad clara</h3>
            <p>Consultá productos y armá tu lista de compra.</p>
          </article>
        </section>

        <section className="home-decades">
          <div className="home-section-heading">
            <p>Explorá por época</p>
            <h2>Elegí una década</h2>
          </div>

          <div className="decade-list">
            <button className="decade-card active">
              <span>60s</span>
              <p>Líneas simples y tonos suaves.</p>
            </button>

            <button className="decade-card">
              <span>70s</span>
              <p>Madera, naranja y estética cálida.</p>
            </button>

            <button className="decade-card">
              <span>80s</span>
              <p>Contrastes fuertes y piezas expresivas.</p>
            </button>
          </div>
        </section>

        <section className="home-products">
          <div className="home-section-heading">
            <p>Selección BackHome</p>
            <h2>Productos destacados</h2>
          </div>

          <div className="featured-grid">
            <article className="featured-product">
              <div className="featured-image">
                <img src={fondo} alt="Producto vintage destacado" />
                <button>♡</button>
              </div>
              <div className="featured-info">
                <span>Lámparas · 70s</span>
                <h3>Lámpara Amber Glow</h3>
                <p>Diseño cálido con pantalla texturada.</p>
                <strong>$ 180</strong>
              </div>
            </article>

            <article className="featured-product">
              <div className="featured-image">
                <img src={fondo} alt="Producto vintage destacado" />
                <button>♡</button>
              </div>
              <div className="featured-info">
                <span>Muebles · 60s</span>
                <h3>Sillón Mid-Century</h3>
                <p>Tapizado claro con patas de madera.</p>
                <strong>$ 420</strong>
              </div>
            </article>

            <article className="featured-product">
              <div className="featured-image">
                <img src={fondo} alt="Producto vintage destacado" />
                <button>♡</button>
              </div>
              <div className="featured-info">
                <span>Decoración · 80s</span>
                <h3>Set Ceramic Pop</h3>
                <p>Objetos decorativos con colores retro.</p>
                <strong>$ 95</strong>
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}

export default HomePage;