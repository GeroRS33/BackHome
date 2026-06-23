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

import { productos as productosLocales } from "../data/products";
import { getProducts } from "../services/api";

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

function createSpecs(data, localProduct) {
  if (
    Array.isArray(data.especificaciones) &&
    data.especificaciones.length > 0
  ) {
    return data.especificaciones;
  }

  if (data.materiales || data.dimensiones) {
    return [
      {
        title: "Materiales",
        text: data.materiales || "No disponible",
        icon: materialesIcon,
      },
      {
        title: "Dimensiones",
        text: data.dimensiones || "No disponible",
        icon: dimensionesIcon,
      },
    ];
  }

  return localProduct?.specs || [];
}

function transformApiProduct(item) {
  const data = item?.data || {};

  const localProduct = productosLocales.find(
    (product) =>
      Number(product.id) === Number(data.idBH)
  );

  const cloudinaryImages =
    Array.isArray(data.imagenes) &&
    data.imagenes.length > 0
      ? data.imagenes
      : [];

  const mainImage =
    data.imagen ||
    data.image ||
    localProduct?.image ||
    "";

  const productImages =
    cloudinaryImages.length > 0
      ? cloudinaryImages
      : localProduct?.images?.length
        ? localProduct.images
        : mainImage
          ? [mainImage]
          : [];

  return {
    // ID usado por las rutas y favoritos.
    id: Number(data.idBH),

    // ID real que necesita carrito y backend.
    apiId: item.id,

    idBH: Number(data.idBH),

    name:
      data.nombre ||
      localProduct?.name ||
      "Producto sin nombre",

    nombre:
      data.nombre ||
      localProduct?.name ||
      "Producto sin nombre",

    category:
      data.categoria ||
      localProduct?.category ||
      "",

    categoria:
      data.categoria ||
      localProduct?.category ||
      "",

    material:
      data.material ||
      localProduct?.material ||
      "",

    decade: Number(
      data.decada ||
        localProduct?.decade ||
        0
    ),

    decada: Number(
      data.decada ||
        localProduct?.decade ||
        0
    ),

    price: Number(
      data.precio ||
        localProduct?.price ||
        0
    ),

    precio: Number(
      data.precio ||
        localProduct?.precio ||
        0
    ),

    slug:
      data.slug ||
      localProduct?.slug ||
      "",

    tag:
      data.tag ||
      data.etiqueta ||
      localProduct?.tag ||
      "",

    description:
      data.descripcion ||
      localProduct?.description ||
      "",

    descripcion:
      data.descripcion ||
      localProduct?.description ||
      "",

    image: mainImage,
    imagen: mainImage,
    images: productImages,

    colors:
      Array.isArray(data.colores) &&
      data.colores.length > 0
        ? data.colores
        : localProduct?.colors || [],

    specs: createSpecs(data, localProduct),

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

  const searchParams = new URLSearchParams(
    location.search
  );

  const decadeFromUrl =
    searchParams.get("decada");

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorProducto, setErrorProducto] =
    useState("");

  useEffect(() => {
    async function cargarProductos() {
      try {
        setLoading(true);
        setErrorProducto("");

        const response = await getProducts(1, 100);

        const productosTransformados = (
          response?.items || []
        )
          .filter((item) => item?.data?.idBH)
          .map(transformApiProduct)
          .sort((a, b) => a.idBH - b.idBH);

        setProductos(productosTransformados);
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

    cargarProductos();
  }, []);

  const product = productos.find(
    (item) => Number(item.idBH) === Number(id)
  );

  if (loading) {
    return (
      <>
        <Navbar activePage="" />

        <main className="product-detail-page">
          <h1>Cargando producto...</h1>
        </main>
      </>
    );
  }

  if (errorProducto) {
    return (
      <>
        <Navbar activePage="" />

        <main className="product-detail-page">
          <h1>No se pudo cargar el producto</h1>
          <p>{errorProducto}</p>

          <Link to="/productos">
            Volver al catálogo
          </Link>
        </main>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar activePage="" />

        <main className="product-detail-page">
          <h1>Producto no encontrado</h1>

          <Link to="/productos">
            Volver al catálogo
          </Link>
        </main>
      </>
    );
  }

  const isFavorite = favoritos.includes(
    product.id
  );

  const relatedProducts = productos
    .filter(
      (item) =>
        item.id !== product.id &&
        item.category === product.category
    )
    .slice(0, 3);

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
              decadeFromUrl || product.decade
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

            <ProductSpecs specs={product.specs} />

            <div className="product-price-box">
              <div className="product-color-icon">
                <img src={precioIcon} alt="" />
              </div>

              <div>
                <h3>Precio</h3>

                <strong>
                  {formatPrice(
                    product.price ||
                      product.precio
                  )}
                </strong>
              </div>
            </div>

            <div className="product-actions">
              <button
                className={`save-button ${
                  isFavorite ? "active" : ""
                }`}
                type="button"
                onClick={handleSave}
              >
                <HeartIcon filled={isFavorite} />
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
              <img src={envioIcon} alt="" />

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
          <h2>Productos relacionados</h2>

          <div className="related-grid">
            {relatedProducts.map(
              (relatedProduct) => (
                <ProductCard
                  key={relatedProduct.apiId}
                  product={relatedProduct}
                  isFavorite={favoritos.includes(
                    relatedProduct.id
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