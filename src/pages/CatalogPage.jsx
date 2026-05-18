import { useMemo, useState } from "react";

import "./CatalogPage.css";

import Navbar from "../components/Navbar/Navbar";
import TimelineSelector from "../components/TimelineSelector/TimelineSelector";
import CatalogFilters from "../components/CatalogFilters/CatalogFilters";
import ProductCard from "../components/ProductCard/ProductCard";

import { productos } from "../data/products";

function CatalogPage({
  favoritos = [],
  agregarAlCarrito,
  toggleFavorito,
}) {
  const [selectedDecade, setSelectedDecade] = useState(1970);
  const [selectedCategory, setSelectedCategory] = useState("Sala");
  const [selectedMaterials, setSelectedMaterials] = useState([]);
const [maxPrice, setMaxPrice] = useState(80000);
  const [sortOption, setSortOption] = useState("relevantes");

  const handleToggleMaterial = (material) => {
    setSelectedMaterials((currentMaterials) => {
      if (currentMaterials.includes(material)) {
        return currentMaterials.filter((item) => item !== material);
      }

      return [...currentMaterials, material];
    });
  };

  const getProductPrice = (product) => {
    return Number(product.price || product.precio || 0);
  };

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
  }, [selectedDecade, selectedCategory, selectedMaterials, maxPrice, sortOption]);

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

          <label className="catalog-sort">
            <span>Ordenar por</span>

            <select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
            >
              <option value="relevantes">Más relevantes</option>
              <option value="precio-menor">Menor precio</option>
              <option value="precio-mayor">Mayor precio</option>
              <option value="nombre">Nombre</option>
            </select>
          </label>
        </section>

        <section className="catalog-layout">
          <CatalogFilters
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedMaterials={selectedMaterials}
            onToggleMaterial={handleToggleMaterial}
            maxPrice={maxPrice}
            onChangeMaxPrice={setMaxPrice}
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