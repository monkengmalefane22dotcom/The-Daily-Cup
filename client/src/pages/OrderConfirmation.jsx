import "./OrderConfirmation.css";

function OrderConfirmation({ order, onNewOrder }) {
  return (
    <section className="confirmation-section">
      <div className="confirmation-card">
        <div className="success-icon">✓</div>

        <h2>Order Placed Successfully!</h2>

        <p>
          Thank you, {order.customerName}!
          Your order has been received by The Daily Cup.
        </p>

        <div className="order-number">
          <span>Your Order Number</span>
          <h3>{order.orderNumber}</h3>
        </div>

        <div className="confirmation-details">
          <p>
            <strong>Customer:</strong> {order.customerName}
          </p>

          <p>
            <strong>Items:</strong> {order.items.length}
          </p>

          <p>
            <strong>Order Status:</strong> {order.status}
          </p>

          <p>
            <strong>Total:</strong> M{order.total.toFixed(2)}
          </p>
        </div>

        <p className="confirmation-message">
          Your order is waiting to be prepared. Thank you for
          choosing The Daily Cup!
        </p>

        <button onClick={onNewOrder}>
          Place Another Order
        </button>
      </div>
    </section>
  );
}

export default OrderConfirmation;