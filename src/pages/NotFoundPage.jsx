import { Link, useNavigate } from "react-router";

import isotipo from "../assets/images/isotipo.png";
import "./NotFoundPage.css";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="not-found-page">
      <section className="not-found-card">
        <img
          className="not-found-logo"
          src={isotipo}
          alt="BackHome"
        />

        <p className="not-found-code">ERROR 404</p>

        <h1>Esta pieza no está en casa</h1>

        <p className="not-found-description">
          La página que buscás no existe, cambió de lugar o ya no está
          disponible.
        </p>

        <div className="not-found-actions">
          <Link
            to="/home"
            className="not-found-primary-button"
          >
            Volver al inicio
          </Link>

          <button
            type="button"
            className="not-found-secondary-button"
            onClick={() => navigate(-1)}
          >
            Volver atrás
          </button>
        </div>
      </section>

      <span className="not-found-decoration not-found-decoration-one" />
      <span className="not-found-decoration not-found-decoration-two" />
    </main>
  );
}

export default NotFoundPage;