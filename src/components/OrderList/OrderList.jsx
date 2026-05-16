import "./OrderList.css";

function OrderList({ orders = [], selectedOrderId, onSelectOrder }) {
  return (
    <section className="order-list">
      {orders.map((order) => (
        <button
          key={order.id}
          type="button"
          className={selectedOrderId === order.id ? "active" : ""}
          onClick={() => onSelectOrder(order.id)}
        >
          <div>
            <h3>Pedido #{order.code}</h3>
            <p>{order.date}</p>
          </div>

          <strong>{order.total}</strong>

          <span className="order-status">{order.status}</span>

          <span className="order-arrow">›</span>
        </button>
      ))}

      <button type="button" className="more-orders-button">
        Ver más pedidos
      </button>
    </section>
  );
}

export default OrderList;