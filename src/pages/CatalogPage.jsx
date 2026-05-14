import { useMemo, useState } from "react";

import "./CatalogPage.css";

import Navbar from "../components/Navbar/Navbar";
import TimelineSelector from "../components/TimelineSelector/TimelineSelector";
import CatalogFilters from "../components/CatalogFilters/CatalogFilters";
import ProductCard from "../components/ProductCard/ProductCard";

import sillonSpace from "../assets/images/sillonspace.png";
import aparadorNogal from "../assets/images/aparadornogal.png";
import lamparaHongo from "../assets/images/lamparahongo.png";

const products = [
  {
    id: 31,
    name: "Sillón Space Age",
    category: "Sala",
    material: "Cuero",
    decade: 1970,
    price: "$21.000",
    image: sillonSpace,
    description: "Sillón giratorio con tapizado en tela texturizada y base metálica.",
  },
  {
    id: 32,
    name: "Aparador Nogal 70s",
    category: "Comedor",
    material: "Madera",
    decade: 1970,
    price: "$78.000",
    image: aparadorNogal,
    description: "Aparador en madera de nogal con puertas curvas y patas cónicas.",
  },
  {
    id: 33,
    name: "Lámpara Hongo",
    category: "Iluminación",
    material: "Metal",
    decade: 1970,
    price: "$18.000",
    image: lamparaHongo,
    description: "Lámpara de mesa con pantalla naranja y base blanca brillante.",
  },
  {
    id: 41,
    name: "Sillón Lounge 80s",
    category: "Sala",
    material: "Cuero",
    decade: 1980,
    price: "$29.000",
    image: sillonSpace,
    description: "Sillón bajo con líneas envolventes y estética retro ochentera.",
  },
  {
    id: 51,
    name: "Aparador Natural",
    category: "Comedor",
    material: "Madera",
    decade: 1990,
    price: "$64.000",
    image: aparadorNogal,
    description: "Mueble de guardado en madera cálida para espacios simples.",
  },
  {
    id: 61,
    name: "Lámpara Mushroom 2000",
    category: "Iluminación",
    material: "Vidrio",
    decade: 2000,
    price: "$24.000",
    image: lamparaHongo,
    description: "Lámpara reinterpretada con curvas suaves y brillo cálido.",
  },
];

function CatalogPage({ favoritos = [], toggleFavorito }) {
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
    return products.filter((product) => {
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