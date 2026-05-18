import "./CatalogFilters.css";

import sofaIcon from "../../assets/images/sofa.svg";
import sillaIcon from "../../assets/images/silla.svg";
import camaIcon from "../../assets/images/cama.svg";
import lamparaIcon from "../../assets/images/lampara.svg";
import decoracionIcon from "../../assets/images/decoracion.svg";
import textilesIcon from "../../assets/images/textiles.svg";

const categories = [
  { name: "Sala", icon: sofaIcon },
  { name: "Comedor", icon: sillaIcon },
  { name: "Dormitorio", icon: camaIcon },
  { name: "Iluminación", icon: lamparaIcon },
  { name: "Decoración", icon: decoracionIcon },
  { name: "Textiles", icon: textilesIcon },
];

const materials = ["Madera", "Cuero", "Metal", "Vidrio"];

function formatPrice(value) {
  return `$${new Intl.NumberFormat("es-UY").format(value)}`;
}

function CatalogFilters({
  selectedCategory,
  onSelectCategory,
  selectedMaterials = [],
  onToggleMaterial,
  maxPrice = 80000,
  onChangeMaxPrice,
  materialCounts = {},
}) {
  const handlePriceChange = (event) => {
    if (onChangeMaxPrice) {
      onChangeMaxPrice(Number(event.target.value));
    }
  };

  return (
    <aside className="catalog-filters">
      <section className="filter-box">
        <h2>Filtrar por categoría</h2>

        <div className="category-list">
          {categories.map((category) => (
            <button
              key={category.name}
              type="button"
              className={selectedCategory === category.name ? "active" : ""}
              onClick={() => onSelectCategory(category.name)}
            >
              <img src={category.icon} alt="" />
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="filter-box">
        <h2>Rango de precio</h2>

        <div className="price-range">
          <input
            type="range"
            min="1000"
            max="80000"
            step="1000"
            value={maxPrice}
            onChange={handlePriceChange}
          />

          <div className="price-values">
            <p>$1.000</p>
            <p>{formatPrice(maxPrice)}</p>
          </div>
        </div>
      </section>

      <section className="filter-box">
        <h2>Material</h2>

        <div className="material-list">
          {materials.map((material) => (
            <label key={material}>
              <input
                type="checkbox"
                checked={selectedMaterials.includes(material)}
                onChange={() => onToggleMaterial(material)}
              />

              <span>{material}</span>
              <small>{materialCounts[material] || 0}</small>
            </label>
          ))}
        </div>
      </section>
    </aside>
  );
}

export default CatalogFilters;