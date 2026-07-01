import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
  useSearchParams,
} from "react-router";

import "./CatalogPage.css";

import Navbar from "../components/Navbar/Navbar";
import TimelineSelector from "../components/TimelineSelector/TimelineSelector";
import CatalogFilters from "../components/CatalogFilters/CatalogFilters";
import ProductCard from "../components/ProductCard/ProductCard";

import { getProducts } from "../services/api";

const sortOptions = [
  {
    value: "relevantes",
    label: "Más relevantes",
  },
  {
    value: "precio-menor",
    label: "Menor precio",
  },
  {
    value: "precio-mayor",
    label: "Mayor precio",
  },
  {
    value: "nombre",
    label: "Nombre",
  },
];

function transformarProductoApi(item) {
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
    // ID único y real del backend.
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

    materialText:
      data.materiales ||
      data.material ||
      "",

    dimensionsText:
      data.dimensiones || "",

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

function CatalogPage({
  favoritos = [],
  agregarAlCarrito,
  toggleFavorito,
}) {
  const [searchParams] =
    useSearchParams();

  const initialDecade =
    Number(
      searchParams.get("decada")
    ) || 1970;

  const [productos, setProductos] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [
    errorProductos,
    setErrorProductos,
  ] = useState("");

  const [
    selectedDecade,
    setSelectedDecade,
  ] = useState(initialDecade);

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("");

  const [
    selectedMaterials,
    setSelectedMaterials,
  ] = useState([]);

  const [maxPrice, setMaxPrice] =
    useState(80000);

  const [
    sortOption,
    setSortOption,
  ] = useState("relevantes");

  const [
    isSortOpen,
    setIsSortOpen,
  ] = useState(false);

  useEffect(() => {
    async function cargarProductos() {
      try {
        setLoading(true);
        setErrorProductos("");

        const response =
          await getProducts(1, 100);

        const productosTransformados = (
          response?.items || []
        )
          .map(transformarProductoApi)
          .filter(
            (product) =>
              product.id &&
              product.name !==
                "Producto sin nombre"
          );

        setProductos(
          productosTransformados
        );
      } catch (error) {
        console.error(
          "Error cargando productos:",
          error
        );

        setErrorProductos(
          error.message ||
            "No se pudieron cargar los productos."
        );
      } finally {
        setLoading(false);
      }
    }

    cargarProductos();
  }, []);

  const handleToggleMaterial = (
    material
  ) => {
    setSelectedMaterials(
      (currentMaterials) => {
        if (
          currentMaterials.includes(
            material
          )
        ) {
          return currentMaterials.filter(
            (item) =>
              item !== material
          );
        }

        return [
          ...currentMaterials,
          material,
        ];
      }
    );
  };

  const handleSortChange = (value) => {
    setSortOption(value);
    setIsSortOpen(false);
  };

  const getProductPrice = (
    product
  ) => {
    return Number(
      product.price ||
        product.precio ||
        0
    );
  };

  const selectedSortLabel =
    sortOptions.find(
      (option) =>
        option.value === sortOption
    )?.label || "Más relevantes";

  const materialCounts = useMemo(() => {
    return productos
      .filter(
        (product) =>
          Number(product.decade) ===
          Number(selectedDecade)
      )
      .reduce((counts, product) => {
        if (!product.material) {
          return counts;
        }

        counts[product.material] =
          (counts[
            product.material
          ] || 0) + 1;

        return counts;
      }, {});
  }, [
    productos,
    selectedDecade,
  ]);

  const filteredProducts = useMemo(() => {
    const filtered =
      productos.filter(
        (product) => {
          const matchesDecade =
            Number(product.decade) ===
            Number(selectedDecade);

          const matchesCategory =
            selectedCategory
              ? product.category ===
                selectedCategory
              : true;

          const matchesMaterial =
            selectedMaterials.length ===
              0 ||
            selectedMaterials.includes(
              product.material
            );

          const matchesPrice =
            getProductPrice(
              product
            ) <= maxPrice;

          return (
            matchesDecade &&
            matchesCategory &&
            matchesMaterial &&
            matchesPrice
          );
        }
      );

    if (
      sortOption ===
      "precio-menor"
    ) {
      return [...filtered].sort(
        (a, b) =>
          getProductPrice(a) -
          getProductPrice(b)
      );
    }

    if (
      sortOption ===
      "precio-mayor"
    ) {
      return [...filtered].sort(
        (a, b) =>
          getProductPrice(b) -
          getProductPrice(a)
      );
    }

    if (sortOption === "nombre") {
      return [...filtered].sort(
        (a, b) =>
          a.name.localeCompare(
            b.name,
            "es"
          )
      );
    }

    return filtered;
  }, [
    productos,
    selectedDecade,
    selectedCategory,
    selectedMaterials,
    maxPrice,
    sortOption,
  ]);

if (loading) {
  return (
    <>
      <Navbar activePage="decadas" />

      <main className="catalog-page">
        <section className="catalog-header">
          <div className="catalog-loading-back skeleton" />

          <div className="catalog-loading-timeline">
            {Array.from({ length: 6 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="catalog-loading-year"
                >
                  <span className="skeleton catalog-loading-dot" />
                  <span className="skeleton catalog-loading-year-text" />
                </div>
              )
            )}
          </div>
        </section>

        <section className="catalog-title-row">
          <div>
            <div className="skeleton catalog-loading-title" />
            <div className="skeleton catalog-loading-subtitle" />
          </div>

          <div className="skeleton catalog-loading-sort" />
        </section>

        <section className="catalog-layout">
          <aside className="catalog-loading-filters">
            <div className="skeleton catalog-loading-filter-title" />

            {Array.from({ length: 6 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="skeleton catalog-loading-filter-row"
                />
              )
            )}
          </aside>

          <div className="catalog-grid">
            {Array.from({ length: 6 }).map(
              (_, index) => (
                <article
                  key={index}
                  className="catalog-loading-card"
                >
                  <div className="skeleton catalog-loading-image" />

                  <div className="catalog-loading-card-info">
                    <div className="skeleton catalog-loading-card-title" />
                    <div className="skeleton catalog-loading-card-text" />
                    <div className="skeleton catalog-loading-card-price" />

                    <div className="catalog-loading-card-actions">
                      <div className="skeleton catalog-loading-card-button" />
                      <div className="skeleton catalog-loading-card-button" />
                    </div>
                  </div>
                </article>
              )
            )}
          </div>
        </section>
      </main>
    </>
  );
}

  if (errorProductos) {
    return (
      <>
        <Navbar activePage="decadas" />

        <main className="catalog-page">
          <p className="catalog-empty">
            {errorProductos}
          </p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar activePage="decadas" />

      <main className="catalog-page">
        <section className="catalog-header">
          <Link
            to="/home"
            className="catalog-back-button"
          >
            <span>‹</span>
            Volver
          </Link>

          <TimelineSelector
            selectedDecade={
              selectedDecade
            }
            onSelectDecade={
              setSelectedDecade
            }
          />
        </section>

        <section className="catalog-title-row">
          <div>
            <h1>
              Resultados - Años{" "}
              {String(
                selectedDecade
              ).slice(2)}
            </h1>

            <p>
              Mostrando{" "}
              {
                filteredProducts.length
              }{" "}
              productos
            </p>
          </div>

          <div className="catalog-sort">
            <span>Ordenar por</span>

            <div className="catalog-sort-dropdown">
              <button
                type="button"
                className="catalog-sort-trigger"
                onClick={() =>
                  setIsSortOpen(
                    (currentValue) =>
                      !currentValue
                  )
                }
              >
                {selectedSortLabel}
                <span>⌄</span>
              </button>

              {isSortOpen && (
                <div className="catalog-sort-menu">
                  {sortOptions.map(
                    (option) => (
                      <button
                        key={
                          option.value
                        }
                        type="button"
                        className={
                          sortOption ===
                          option.value
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          handleSortChange(
                            option.value
                          )
                        }
                      >
                        {
                          option.label
                        }
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="catalog-layout">
          <CatalogFilters
            selectedCategory={
              selectedCategory
            }
            onSelectCategory={
              setSelectedCategory
            }
            selectedMaterials={
              selectedMaterials
            }
            onToggleMaterial={
              handleToggleMaterial
            }
            maxPrice={maxPrice}
            onChangeMaxPrice={
              setMaxPrice
            }
            materialCounts={
              materialCounts
            }
          />

          <div className="catalog-grid">
            {filteredProducts.length >
            0 ? (
              filteredProducts.map(
                (product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={favoritos.includes(
                      product.id
                    )}
                    onToggleFavorite={
                      toggleFavorito
                    }
                    onAddToCart={
                      agregarAlCarrito
                    }
                  />
                )
              )
            ) : (
              <p className="catalog-empty">
                No encontramos productos para
                estos filtros.
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default CatalogPage;