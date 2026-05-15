import "./ProductSpecs.css";

function ProductSpecs({ specs = [] }) {
  return (
    <div className="product-specs">
      {specs.map((spec) => (
        <article className="product-spec" key={spec.title}>
          <img src={spec.icon} alt="" />

          <div>
            <h3>{spec.title}</h3>
            <p>{spec.text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export default ProductSpecs;