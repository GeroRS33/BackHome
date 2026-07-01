import { useEffect, useState } from "react";

import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router";

import "./ProductDetailPage.css";

import Navbar from "../components/Navbar/Navbar";
import ProductGallery from "../components/ProductGallery/ProductGallery";
import ProductSpecs from "../components/ProductSpecs/ProductSpecs";
import ProductCard from "../components/ProductCard/ProductCard";

import {
  getProductById,
  getProducts,
} from "../services/api";

import precioIcon from "../assets/images/etiquetaprecio.png";
import envioIcon from "../assets/images/envio.png";
import materialesIcon from "../assets/images/materiales.png";
import dimensionesIcon from "../assets/images/dimensiones.png";

function formatPrice(value) {
  const price =
    typeof value === "number"
      ? value
      : Number(value) || 0;

  return `$${new Intl.NumberFormat("es-UY").format(price)}`;
}

function HeartIcon({ filled = false }) {
  return (
    <svg
      className="favorite-heart-icon"
      viewBox="0 0 32 32"
      fill={filled ? "currentColor" : "none"}
      aria-hidden="true"
    >
      <path
        d="M16 27S5 20.5 5 11.8C5 7.7 7.8 5 11.3 5C13.4 5 15.1 6.1 16 7.7C16.9 6.1 18.6 5 20.7 5C24.2 5 27 7.7 27 11.8C27 20.5 16 27 16 27Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function createSpecs(data) {
  if (
    Array.isArray(data.especificaciones) &&
    data.especificaciones.length > 0
  ) {
    return data.especificaciones;
  }

  const specs = [];

  if (data.materiales || data.material) {
    specs.push({
      title: "Materiales",
      text:
        data.materiales ||
        data.material ||
        "No disponible",
      icon: materialesIcon,
    });
  }

  if (data.dimensiones) {
    specs.push({
      title: "Dimensiones",
      text: data.dimensiones,
      icon: dimensionesIcon,
    });
  }

  return specs;
}

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

  const productImages =
    images.length > 0
      ? images
      : mainImage
        ? [mainImage]
        : [];

  return {
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

    tag:
      data.tag ||
      data.etiqueta ||
      "",

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
    images: productImages,

    colors: Array.isArray(
      data.colores
    )
      ? data.colores
      : [],

    specs: createSpecs(data),

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

function ProductDetailPage({
  favoritos = [],
  agregarAlCarrito,
  toggleFavorito,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams =
    new URLSearchParams(location.search);

  const decadeFromUrl =
    searchParams.get("decada");

  const [product, setProduct] =
    useState(null);

  const [
    relatedProducts,
    setRelatedProducts,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [
    errorProducto,
    setErrorProducto,
  ] = useState("");

  useEffect(() => {
    async function cargarProducto() {
      try {
        setLoading(true);
        setErrorProducto("");

        const productResponse =
          await getProductById(id);

        const productItem =
          productResponse?.item ||
          productResponse?.product ||
          productResponse;

        const productoTransformado =
          transformApiProduct(productItem);

        setProduct(productoTransformado);

        const productsResponse =
          await getProducts(1, 100);

        const productosTransformados = (
          productsResponse?.items || []
        )
          .map(transformApiProduct)
          .filter(
            (item) =>
              String(item.id) !==
                String(
                  productoTransformado.id
                ) &&
              item.category ===
                productoTransformado.category
          )
          .slice(0, 3);

        setRelatedProducts(
          productosTransformados
        );
      } catch (error) {
        console.error(
          "Error cargando el producto:",
          error
        );

        setErrorProducto(
          error.message ||
            "No se pudo cargar el producto."
        );
      } finally {
        setLoading(false);
      }
    }

    cargarProducto();
  }, [id]);

if (loading) {
  return (
    <>
      <Navbar activePage="" />

      <main className="product-detail-page">
        <div className="product-breadcrumb product-breadcrumb-loading">
          <span className="skeleton skeleton-text skeleton-small" />
          <span>›</span>
          <span className="skeleton skeleton-text skeleton-medium" />
          <span>›</span>
          <span className="skeleton skeleton-text skeleton-large" />
        </div>

        <section className="product-detail-main product-detail-loading">
          <div className="product-loading-gallery">
            <div className="skeleton product-loading-main-image" />

            <div className="product-loading-thumbnails">
              <div className="skeleton product-loading-thumbnail" />
              <div className="skeleton product-loading-thumbnail" />
              <div className="skeleton product-loading-thumbnail" />
            </div>
          </div>

          <section className="product-detail-info">
            <div className="skeleton skeleton-text skeleton-tag" />

            <div className="skeleton skeleton-text skeleton-title" />

            <div className="product-loading-description">
              <div className="skeleton skeleton-text" />
              <div className="skeleton skeleton-text" />
              <div className="skeleton skeleton-text skeleton-description-short" />
            </div>

            <div className="product-loading-specs">
              <div className="skeleton product-loading-spec" />
              <div className="skeleton product-loading-spec" />
            </div>

            <div className="skeleton product-loading-price" />

            <div className="product-loading-actions">
              <div className="skeleton product-loading-button" />
              <div className="skeleton product-loading-button" />
            </div>
          </section>
        </section>
      </main>
    </>
  );
}

  if (errorProducto || !product) {
    return (
      <>
        <Navbar activePage="" />

        <main className="product-detail-page">
          <h1>
            Producto no encontrado
          </h1>

          {errorProducto && (
            <p>{errorProducto}</p>
          )}

          <Link to="/productos">
            Volver al catálogo
          </Link>
        </main>
      </>
    );
  }

  const isFavorite = favoritos.some(
    (favoriteId) =>
      String(favoriteId) ===
      String(product.id)
  );

  const handleSave = () => {
    if (toggleFavorito) {
      toggleFavorito(product.id);
    }
  };

  const handleComprar = async () => {
    if (!agregarAlCarrito) {
      return;
    }

    try {
      await agregarAlCarrito(product);
      navigate("/carrito");
    } catch (error) {
      console.error(
        "Error agregando el producto:",
        error
      );
    }
  };

  return (
    <>
      <Navbar activePage="" />

      <main className="product-detail-page">
        <div className="product-breadcrumb">
          <Link to="/home">Inicio</Link>

          <span>›</span>

          <Link
            to={`/productos?decada=${
              decadeFromUrl ||
              product.decade
            }`}
          >
            Productos
          </Link>

          <span>›</span>

          <p>{product.name}</p>
        </div>

        <section className="product-detail-main">
          <ProductGallery
            images={product.images}
            productName={product.name}
          />

          <section className="product-detail-info">
            {product.tag && (
              <p className="product-tag">
                {product.tag}
              </p>
            )}

            <h1>{product.name}</h1>

            <p className="product-description">
              {product.description}
            </p>

            <ProductSpecs
              specs={product.specs}
            />

            <div className="product-price-box">
              <div className="product-color-icon">
                <img
                  src={precioIcon}
                  alt=""
                />
              </div>

              <div>
                <h3>Precio</h3>

                <strong>
                  {formatPrice(
                    product.price
                  )}
                </strong>
              </div>
            </div>

            <div className="product-actions">
              <button
                className={`save-button ${
                  isFavorite
                    ? "active"
                    : ""
                }`}
                type="button"
                onClick={handleSave}
              >
                <HeartIcon
                  filled={isFavorite}
                />
                Guardar
              </button>

              <button
                className="availability-button"
                type="button"
                onClick={handleComprar}
              >
                Comprar
              </button>
            </div>

            <div className="product-shipping">
              <img
                src={envioIcon}
                alt=""
              />

              <span>
                Envíos a todo el país
              </span>

              <i>•</i>

              <span>
                Armado no incluido
              </span>
            </div>
          </section>
        </section>

        <section className="related-section">
          <h2>
            Productos relacionados
          </h2>

          <div className="related-grid">
            {relatedProducts.map(
              (relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={
                    relatedProduct
                  }
                  isFavorite={favoritos.some(
                    (favoriteId) =>
                      String(
                        favoriteId
                      ) ===
                      String(
                        relatedProduct.id
                      )
                  )}
                  onToggleFavorite={
                    toggleFavorito
                  }
                  onAddToCart={
                    agregarAlCarrito
                  }
                />
              )
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default ProductDetailPage;