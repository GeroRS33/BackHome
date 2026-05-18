import "./FavoritesPage.css";

import Navbar from "../components/Navbar/Navbar";
import FavoriteCard from "../components/FavoriteCard/FavoriteCard";

import { productos } from "../data/products";

import corazonIcon from "../assets/images/corazon.png";

function FavoritesPage({ favoritos = [], toggleFavorito, vaciarFavoritos }) {
  const productosFavoritos = productos.filter((producto) =>
    favoritos.includes(producto.id)
  );

  const cantidad = productosFavoritos.length;

  const handleRemoveFavorite = (productId) => {
    if (toggleFavorito) {
      toggleFavorito(productId);
    }
  };

  const handleClearFavorites = () => {
    if (vaciarFavoritos) {
      vaciarFavoritos();
    }
  };

  return (
    <>
      <Navbar activePage="favoritos" />

      <main className="favorites-page">
        <section className="favorites-header">
          <div>
            <h1>
              Mis favoritos <img src={corazonIcon} alt="" />
            </h1>

            <p>Tus piezas guardadas para volver cuando quieras.</p>
          </div>

          <div className="favorites-header-actions">
            <span>
              {cantidad} {cantidad === 1 ? "producto" : "productos"}
            </span>

            <button
              type="button"
              className="clear-favorites-button"
              onClick={handleClearFavorites}
              disabled={cantidad === 0}
            >
              <svg
                className="clear-favorites-icon"
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
              Limpiar favoritos
            </button>
          </div>
        </section>

        {cantidad > 0 ? (
          <section className="favorites-grid">
            {productosFavoritos.map((product) => (
              <FavoriteCard
                key={product.id}
                product={product}
                onRemove={() => handleRemoveFavorite(product.id)}
              />
            ))}
          </section>
        ) : (
          <section className="favorites-empty">
            <div className="favorites-empty-icon">
              <img src={corazonIcon} alt="" />
            </div>

            <div>
              <h2>No guardaste favoritos todavía</h2>
              <p>
                Cuando marques productos como favoritos, van a aparecer acá.
              </p>
            </div>

            <a href="/productos">Seguir explorando</a>
          </section>
        )}

        <section className="favorites-footer-box">
          <div className="favorites-footer-left">
            <div className="favorites-footer-icon">
              <img src={corazonIcon} alt="" />
            </div>

            <div>
              <h3>¿Ves algo que te encanta?</h3>
              <p>Agregá tus favoritos y encontralos siempre aquí.</p>
            </div>
          </div>

          <a href="/productos">Seguir explorando</a>
        </section>
      </main>
    </>
  );
}

export default FavoritesPage;