import "./Cart.css";

function Cart({ cartItems, onUpdateQuantity, onRemove, onCheckout }) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="cart-section" id="cart">
      <div className="cart-heading">
        <p>YOUR SELECTION</p>
        <h2>Shopping Cart</h2>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <span>🛒</span>
          <h3>Your cart is empty</h3>
          <p>Add something delicious from our menu!</p>
          <a href="#menu">Explore Menu</a>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>M{item.price.toFixed(2)} each</p>

                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, -1)
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-item-actions">
                  <strong>
                    M{(item.price * item.quantity).toFixed(2)}
                  </strong>

                  <button
                    className="remove-button"
                    onClick={() => onRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Subtotal</span>
              <strong>M{total.toFixed(2)}</strong>
            </div>

            <div className="summary-row">
              <span>Total</span>
              <strong>M{total.toFixed(2)}</strong>
            </div>

            <button
  className="checkout-button"
  onClick={onCheckout}
>
  Proceed to Checkout
</button>

            <a href="#menu">Continue Shopping</a>
          </div>
        </div>
      )}
    </section>
  );
}

export default Cart;