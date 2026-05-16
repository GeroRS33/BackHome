import "./OrderDetail.css";

function OrderDetail({ order }) {
  if (!order) {
    return null;
  }

  return (
    <section className="order-detail">
      <header className="order-detail-header">
        <h3>Pedido #{order.code}</h3>
        <span>{order.status}</span>
        <p>{order.date}</p>
      </header>

      <div className="order-detail-products">
        {order.products.map((product) => (
          <article key={product.id} className="order-detail-product">
            <img src={product.image} alt={product.name} />

            <div>
              <h4>{product.name}</h4>
              <p>{product.category}</p>
              <small>Cantidad: {product.quantity}</small>
            </div>

            <strong>{product.price}</strong>
          </article>
        ))}
      </div>

      <footer className="order-detail-total">
        <span>Total</span>
        <strong>{order.total}</strong>
      </footer>
    </section>
  );
}

export default OrderDetail;