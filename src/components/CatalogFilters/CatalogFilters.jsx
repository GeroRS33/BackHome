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

const materials = [
  { name: "Madera", count: 18 },
  { name: "Cuero", count: 12 },
  { name: "Metal", count: 15 },
  { name: "Vidrio", count: 6 },
];

function CatalogFilters({
  selectedCategory,
  onSelectCategory,
  selectedMaterials,
  onToggleMaterial,
}) {
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
          <div className="price-line">
            <span></span>
            <span></span>
          </div>

          <div className="price-values">
            <p>$1.000</p>
            <p>$120.000</p>
          </div>
        </div>
      </section>

      <section className="filter-box">
        <h2>Material</h2>

        <div className="material-list">
          {materials.map((material) => (
            <label key={material.name}>
              <input
                type="checkbox"
                checked={selectedMaterials.includes(material.name)}
                onChange={() => onToggleMaterial(material.name)}
              />

              <span>{material.name}</span>
              <small>{material.count}</small>
            </label>
          ))}
        </div>

        <button className="see-more-filter" type="button">
          Ver más
        </button>
      </section>
    </aside>
  );
}

export default CatalogFilters;