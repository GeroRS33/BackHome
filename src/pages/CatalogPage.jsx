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

  const handleToggleMaterial = (material) => {
    setSelectedMaterials((currentMaterials) => {
      if (currentMaterials.includes(material)) {
        return currentMaterials.filter((item) => item !== material);
      }

      return [...currentMaterials, material];
    });
  };

  const filteredProducts = useMemo(() => {
    return productos.filter((product) => {
      const matchesDecade = product.decade === selectedDecade;
      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true;
      const matchesMaterial =
        selectedMaterials.length === 0 ||
        selectedMaterials.includes(product.material);

      return matchesDecade && matchesCategory && matchesMaterial;
    });
  }, [selectedDecade, selectedCategory, selectedMaterials]);

  return (
    <>
      <Navbar activePage="decadas" />

      <main className="catalog-page">
        <section className="catalog-header">
          <a className="back-button" href="/">
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
            <strong>Más relevantes</strong>
            <button type="button">⌄</button>
          </div>
        </section>

        <section className="catalog-layout">
          <CatalogFilters
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedMaterials={selectedMaterials}
            onToggleMaterial={handleToggleMaterial}
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