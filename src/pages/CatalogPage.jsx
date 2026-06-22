import { useEffect, useMemo, useState } from "react";
import "./CatalogPage.css";

import Navbar from "../components/Navbar/Navbar";
import TimelineSelector from "../components/TimelineSelector/TimelineSelector";
import CatalogFilters from "../components/CatalogFilters/CatalogFilters";
import ProductCard from "../components/ProductCard/ProductCard";

const API_URL = "https://creacionaplicaciones.onrender.com/api/productos?limit=100";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YTFmNjY5OWNiZTFmNzg3ZTljNTY0NmEiLCJlbWFpbCI6ImRpZWdvY2Fib3RAZ21haWwuY29tIiwicHJvamVjdEtleSI6ImJhY2tob21lLXJldHJvIiwiaWF0IjoxNzgyMTU1OTQ1LCJleHAiOjE3ODI3NjA3NDV9.23zSxA_Kyh8Xt2N2TjhPjHnG2kPif_D9gXcKc-vgKsM";

const sortOptions = [
  { value: "relevantes", label: "Más relevantes" },
  { value: "precio-menor", label: "Menor precio" },
  { value: "precio-mayor", label: "Mayor precio" },
  { value: "nombre", label: "Nombre" },
];

function CatalogPage({ favoritos = [], agregarAlCarrito, toggleFavorito }) {
  const initialDecade =
    Number(new URLSearchParams(window.location.search).get("decada")) || 1970;

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDecade, setSelectedDecade] = useState(initialDecade);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [maxPrice, setMaxPrice] = useState(80000);
  const [sortOption, setSortOption] = useState("relevantes");
  const [isSortOpen, setIsSortOpen] = useState(false);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: {
            "x-project-key": "backhome-retro",
            Authorization: `Bearer ${TOKEN}`,
          },
        });

        const data = await response.json();

        const productosTransformados = data.items
          .filter((item) => item.data?.idBH)
          .map((item) => ({
            id: item.data.idBH,
            apiId: item.id,
            idBH: item.data.idBH,
            name: item.data.nombre,
            category: item.data.categoria,
            material: item.data.material,
            decade: item.data.decada,
            price: item.data.precio,
            precio: item.data.precio,
            slug: item.data.slug,
            tag: item.data.tag,
            description: item.data.descripcion,
            materialText: item.data.materiales,
            dimensionsText: item.data.dimensiones,
            image: "",
            images: [],
          }))
          .sort((a, b) => a.idBH - b.idBH);

        setProductos(productosTransformados);
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  const handleToggleMaterial = (material) => {
    setSelectedMaterials((currentMaterials) => {
      if (currentMaterials.includes(material)) {
        return currentMaterials.filter((item) => item !== material);
      }

      return [...currentMaterials, material];
    });
  };

  const handleSortChange = (value) => {
    setSortOption(value);
    setIsSortOpen(false);
  };

  const getProductPrice = (product) => {
    return Number(product.price || product.precio || 0);
  };

  const selectedSortLabel =
    sortOptions.find((option) => option.value === sortOption)?.label ||
    "Más relevantes";

  const materialCounts = useMemo(() => {
    return productos
      .filter((product) => product.decade === selectedDecade)
      .reduce((counts, product) => {
        counts[product.material] = (counts[product.material] || 0) + 1;
        return counts;
      }, {});
  }, [productos, selectedDecade]);

  const filteredProducts = useMemo(() => {
    const filtered = productos.filter((product) => {
      const matchesDecade = product.decade === selectedDecade;

      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true;

      const matchesMaterial =
        selectedMaterials.length === 0 ||
        selectedMaterials.includes(product.material);

      const matchesPrice = getProductPrice(product) <= maxPrice;

      return matchesDecade && matchesCategory && matchesMaterial && matchesPrice;
    });

    if (sortOption === "precio-menor") {
      return [...filtered].sort(
        (a, b) => getProductPrice(a) - getProductPrice(b)
      );
    }

    if (sortOption === "precio-mayor") {
      return [...filtered].sort(
        (a, b) => getProductPrice(b) - getProductPrice(a)
      );
    }

    if (sortOption === "nombre") {
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
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
          <p className="catalog-empty">Cargando productos...</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar activePage="decadas" />

      <main className="catalog-page">
        <section className="catalog-header">
          <a href="/home" className="catalog-back-button">
            <span>‹</span>
            Volver
          </a>

          <TimelineSelector
            selectedDecade={selectedDecade}
            onSelectDecade={setSelectedDecade}
          />
        </section>

        <section className="catalog-title-row">
          <div>
            <h1>Resultados - Años {String(selectedDecade).slice(2)}</h1>
            <p>Mostrando {filteredProducts.length} productos</p>
          </div>

          <div className="catalog-sort">
            <span>Ordenar por</span>

            <div className="catalog-sort-dropdown">
              <button
                type="button"
                className="catalog-sort-trigger"
                onClick={() => setIsSortOpen(!isSortOpen)}
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
                      className={sortOption === option.value ? "active" : ""}
                      onClick={() => handleSortChange(option.value)}
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
            onToggleMaterial={handleToggleMaterial}
            maxPrice={maxPrice}
            onChangeMaxPrice={setMaxPrice}
            materialCounts={materialCounts}
          />

          <div className="catalog-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favoritos.includes(product.id)}
                  onToggleFavorite={toggleFavorito}
                  onAddToCart={agregarAlCarrito}
                />
              ))
            ) : (
              <p className="catalog-empty">
                No encontramos productos para estos filtros.
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default CatalogPage;