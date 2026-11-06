
import { useState } from "react";
import "./Checkout.css";

function Checkout({ cartItems, onPlaceOrder, onCancel }) {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function handleSubmit(e) {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const order = {
      customerName,
      phone,
      notes,
      items: cartItems,
      total,
    };

    onPlaceOrder(order);
  }

  return (
    <section className="checkout-section">
      <div className="checkout-heading">
        <p>ALMOST THERE</p>
        <h2>Complete Your Order</h2>
        <span>Just a few details before we prepare your order.</span>
      </div>

      <div className="checkout-container">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h3>Customer Details</h3>

          <label>Full Name *</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter your full name"
            required
            minLength={2}
          />

          <label>Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
          />

          <label>Additional Instructions</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any special requests?"
            rows="4"
          />

          <button
            type="submit"
            className="place-order-button"
            disabled={cartItems.length === 0}
          >
            Place Order
          </button>

          <button
            type="button"
            className="back-button"
            onClick={onCancel}
          >
            Back to Cart
          </button>
        </form>

        <div className="checkout-summary">
          <h3>Your Order</h3>

          {cartItems.map((item) => (
            <div className="checkout-item" key={item.id}>
              <span>
                {item.name} × {item.quantity}
              </span>

              <strong>
                M{(item.price * item.quantity).toFixed(2)}
              </strong>
            </div>
          ))}

          <div className="checkout-total">
            <span>Total Amount</span>
            <strong>M{total.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
