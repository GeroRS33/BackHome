import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import "./CatalogPage.css";

import Navbar from "../components/Navbar/Navbar";
import TimelineSelector from "../components/TimelineSelector/TimelineSelector";
import CatalogFilters from "../components/CatalogFilters/CatalogFilters";
import ProductCard from "../components/ProductCard/ProductCard";

import { getProducts } from "../services/api";
import { productos as productosLocales } from "../data/products";

const sortOptions = [
  { value: "relevantes", label: "Más relevantes" },
  { value: "precio-menor", label: "Menor precio" },
  { value: "precio-mayor", label: "Mayor precio" },
  { value: "nombre", label: "Nombre" },
];

function transformarProductoApi(item) {
  const data = item?.data || {};

  const productoLocal = productosLocales.find(
    (producto) => Number(producto.id) === Number(data.idBH)
  );

  return {
    // Se mantiene el ID original de BackHome para favoritos y navegación.
    id: Number(data.idBH),

    // Este es el ID real del producto en el backend.
    apiId: item.id,

    idBH: Number(data.idBH),

    name: data.nombre || productoLocal?.name || "Producto sin nombre",
    nombre: data.nombre || productoLocal?.name || "Producto sin nombre",

    category: data.categoria || productoLocal?.category || "",
    categoria: data.categoria || productoLocal?.category || "",

    material: data.material || productoLocal?.material || "",

    decade: Number(data.decada || productoLocal?.decade || 0),
    decada: Number(data.decada || productoLocal?.decade || 0),

    price: Number(data.precio || productoLocal?.price || 0),
    precio: Number(data.precio || productoLocal?.precio || 0),

    slug: data.slug || productoLocal?.slug || "",

    tag: data.tag || productoLocal?.tag || "",

    description:
      data.descripcion || productoLocal?.description || "",

    descripcion:
      data.descripcion || productoLocal?.description || "",

    materialText:
      data.materiales ||
      productoLocal?.specs?.find(
        (spec) => spec.title === "Materiales"
      )?.text ||
      "",

    dimensionsText:
      data.dimensiones ||
      productoLocal?.specs?.find(
        (spec) => spec.title === "Dimensiones"
      )?.text ||
      "",

    // Primero usa Cloudinary y, si todavía no está, usa la imagen local.
    image:
      data.imagen ||
      data.image ||
      productoLocal?.image ||
      "",

    imagen:
      data.imagen ||
      data.image ||
      productoLocal?.image ||
      "",

    images:
      Array.isArray(data.imagenes) && data.imagenes.length > 0
        ? data.imagenes
        : productoLocal?.images || [],

    colors:
      Array.isArray(data.colores) && data.colores.length > 0
        ? data.colores
        : productoLocal?.colors || [],

    specs: productoLocal?.specs || [],

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

function CatalogPage({
  favoritos = [],
  agregarAlCarrito,
  toggleFavorito,
}) {
  const [searchParams] = useSearchParams();

  const initialDecade =
    Number(searchParams.get("decada")) || 1970;

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorProductos, setErrorProductos] = useState("");

  const [selectedDecade, setSelectedDecade] =
    useState(initialDecade);

  const [selectedCategory, setSelectedCategory] =
    useState("");

  const [selectedMaterials, setSelectedMaterials] =
    useState([]);

  const [maxPrice, setMaxPrice] = useState(80000);
  const [sortOption, setSortOption] =
    useState("relevantes");

  const [isSortOpen, setIsSortOpen] =
    useState(false);

  useEffect(() => {
    async function cargarProductos() {
      try {
        setLoading(true);
        setErrorProductos("");

        const response = await getProducts(1, 100);

        const productosTransformados = (
          response?.items || []
        )
          .filter((item) => item?.data?.idBH)
          .map(transformarProductoApi)
          .sort((a, b) => a.idBH - b.idBH);

        setProductos(productosTransformados);
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

  const handleToggleMaterial = (material) => {
    setSelectedMaterials((currentMaterials) => {
      if (currentMaterials.includes(material)) {
        return currentMaterials.filter(
          (item) => item !== material
        );
      }

      return [...currentMaterials, material];
    });
  };

  const handleSortChange = (value) => {
    setSortOption(value);
    setIsSortOpen(false);
  };

  const getProductPrice = (product) => {
    return Number(
      product.price || product.precio || 0
    );
  };

  const selectedSortLabel =
    sortOptions.find(
      (option) => option.value === sortOption
    )?.label || "Más relevantes";

  const materialCounts = useMemo(() => {
    return productos
      .filter(
        (product) =>
          product.decade === selectedDecade
      )
      .reduce((counts, product) => {
        if (!product.material) {
          return counts;
        }

        counts[product.material] =
          (counts[product.material] || 0) + 1;

        return counts;
      }, {});
  }, [productos, selectedDecade]);

  const filteredProducts = useMemo(() => {
    const filtered = productos.filter(
      (product) => {
        const matchesDecade =
          product.decade === selectedDecade;

        const matchesCategory = selectedCategory
          ? product.category === selectedCategory
          : true;

        const matchesMaterial =
          selectedMaterials.length === 0 ||
          selectedMaterials.includes(
            product.material
          );

        const matchesPrice =
          getProductPrice(product) <= maxPrice;

        return (
          matchesDecade &&
          matchesCategory &&
          matchesMaterial &&
          matchesPrice
        );
      }
    );

    if (sortOption === "precio-menor") {
      return [...filtered].sort(
        (a, b) =>
          getProductPrice(a) -
          getProductPrice(b)
      );
    }

    if (sortOption === "precio-mayor") {
      return [...filtered].sort(
        (a, b) =>
          getProductPrice(b) -
          getProductPrice(a)
      );
    }

    if (sortOption === "nombre") {
      return [...filtered].sort((a, b) =>
        a.name.localeCompare(b.name)
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
          <p className="catalog-empty">
            Cargando productos...
          </p>
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
            selectedDecade={selectedDecade}
            onSelectDecade={setSelectedDecade}
          />
        </section>

        <section className="catalog-title-row">
          <div>
            <h1>
              Resultados - Años{" "}
              {String(selectedDecade).slice(2)}
            </h1>

            <p>
              Mostrando {filteredProducts.length}{" "}
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
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={
                        sortOption === option.value
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        handleSortChange(
                          option.value
                        )
                      }
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="catalog-layout">
          <CatalogFilters
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedMaterials={selectedMaterials}
            onToggleMaterial={
              handleToggleMaterial
            }
            maxPrice={maxPrice}
            onChangeMaxPrice={setMaxPrice}
            materialCounts={materialCounts}
          />

          <div className="catalog-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.apiId}
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
              ))
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