import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Link } from "react-router";

import "./FavoritesPage.css";

import Navbar from "../components/Navbar/Navbar";
import FavoriteCard from "../components/FavoriteCard/FavoriteCard";

import corazonIcon from "../assets/images/corazon.png";

import { getProducts } from "../services/api";

function transformApiProduct(item) {
  const data = item?.data || {};

  const images = Array.isArray(
    data.imagenes
  )
    ? data.imagenes.filter(Boolean)
    : [];

  const mainImage =
    data.imagen ||
    data.image ||
    images[0] ||
    "";

  return {
    // ID real del backend.
    id: item.id,

    name:
      data.nombre ||
      data.name ||
      "Producto sin nombre",

    nombre:
      data.nombre ||
      data.name ||
      "Producto sin nombre",

    category:
      data.categoria ||
      data.category ||
      "",

    categoria:
      data.categoria ||
      data.category ||
      "",

    material:
      data.material || "",

    decade: Number(
      data.decada ||
        data.decade ||
        0
    ),

    decada: Number(
      data.decada ||
        data.decade ||
        0
    ),

    price: Number(
      data.precio ||
        data.price ||
        0
    ),

    precio: Number(
      data.precio ||
        data.price ||
        0
    ),

    slug: data.slug || "",

    tag: data.tag || "",

    description:
      data.descripcion ||
      data.description ||
      "",

    descripcion:
      data.descripcion ||
      data.description ||
      "",

    image: mainImage,
    imagen: mainImage,

    images,

    colors: Array.isArray(
      data.colores
    )
      ? data.colores
      : [],

    specs: Array.isArray(
      data.especificaciones
    )
      ? data.especificaciones
      : [],

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

function FavoritesPage({
  favoritos = [],
  toggleFavorito,
  vaciarFavoritos,
}) {
  const [productos, setProductos] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [
    favoritesError,
    setFavoritesError,
  ] = useState("");

  useEffect(() => {
    async function cargarProductos() {
      try {
        setLoading(true);
        setFavoritesError("");

        const response =
          await getProducts(1, 100);

        const productosApi = (
          response?.items || []
        )
          .map(transformApiProduct)
          .filter(
            (product) =>
              product.id &&
              product.name !==
                "Producto sin nombre"
          );

        setProductos(productosApi);
      } catch (error) {
        console.error(
          "Error cargando favoritos:",
          error
        );

        setFavoritesError(
          error.message ||
            "No se pudieron cargar tus favoritos."
        );
      } finally {
        setLoading(false);
      }
    }

    cargarProductos();
  }, []);

  const productosFavoritos =
    useMemo(() => {
      return productos.filter(
        (producto) =>
          favoritos.some(
            (favoriteId) =>
              String(favoriteId) ===
              String(producto.id)
          )
      );
    }, [productos, favoritos]);

  const cantidad =
    productosFavoritos.length;

  const handleRemoveFavorite = (
    productId
  ) => {
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
              Mis favoritos{" "}
              <img
                src={corazonIcon}
                alt=""
              />
            </h1>

            <p>
              Tus piezas guardadas para volver
              cuando quieras.
            </p>
          </div>

          <div className="favorites-header-actions">
            <span>
              {cantidad}{" "}
              {cantidad === 1
                ? "producto"
                : "productos"}
            </span>

            <button
              type="button"
              className="clear-favorites-button"
              onClick={
                handleClearFavorites
              }
              disabled={
                cantidad === 0 ||
                loading
              }
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

        {loading ? (
          <section className="favorites-empty">
            <div>
              <h2>
                Cargando favoritos...
              </h2>

              <p>
                Estamos trayendo tus productos
                guardados.
              </p>
            </div>
          </section>
        ) : favoritesError ? (
          <section className="favorites-empty">
            <div>
              <h2>
                No pudimos cargar tus favoritos
              </h2>

              <p>{favoritesError}</p>
            </div>
          </section>
        ) : cantidad > 0 ? (
          <section className="favorites-grid">
            {productosFavoritos.map(
              (product) => (
                <FavoriteCard
                  key={product.id}
                  product={product}
                  onRemove={() =>
                    handleRemoveFavorite(
                      product.id
                    )
                  }
                />
              )
            )}
          </section>
        ) : (
          <section className="favorites-empty">
            <div className="favorites-empty-icon">
              <img
                src={corazonIcon}
                alt=""
              />
            </div>

            <div>
              <h2>
                No guardaste favoritos todavía
              </h2>

              <p>
                Cuando marques productos como
                favoritos, van a aparecer acá.
              </p>
            </div>

            <Link to="/productos">
              Seguir explorando
            </Link>
          </section>
        )}

        <section className="favorites-footer-box">
          <div className="favorites-footer-left">
            <div className="favorites-footer-icon">
              <img
                src={corazonIcon}
                alt=""
              />
            </div>

            <div>
              <h3>
                ¿Ves algo que te encanta?
              </h3>

              <p>
                Agregá tus favoritos y
                encontralos siempre aquí.
              </p>
            </div>
          </div>

          <Link to="/productos">
            Seguir explorando
          </Link>
        </section>
      </main>
    </>
  );
}

export default FavoritesPage;