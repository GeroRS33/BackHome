import "./FavoritesPage.css";

import Navbar from "../components/Navbar/Navbar";
import FavoriteCard from "../components/FavoriteCard/FavoriteCard";

import corazonIcon from "../assets/images/corazon.png";
import basureroIcon from "../assets/images/basurero.png";

function FavoritesPage({ favoritos = [], toggleFavorito, vaciarFavoritos }) {
  const cantidad = favoritos.length;

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
              <img src={basureroIcon} alt="" />
              Limpiar favoritos
            </button>
          </div>
        </section>

        {cantidad > 0 ? (
          <section className="favorites-grid">
            {favoritos.map((product) => (
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