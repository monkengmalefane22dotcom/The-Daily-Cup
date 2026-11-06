
import { useState, useEffect } from "react";
import StaffDashboard from "./pages/StaffDashboard";
import Navbar from "./components/Navbar";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);

  // Load menu items from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/menu")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load menu.");
        }
        return response.json();
      })
      .then((data) => {
        setMenuItems(data);
      })
      .catch((error) => {
        console.error("Error loading menu:", error);
      });
  }, []);

  // Load customer orders from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load orders.");
        }
        return response.json();
      })
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.error("Error loading orders:", error);
      });
  }, []);

  // Add products to cart
  function addToCart(item) {
    setCartItems((previousItems) => {
      const existingItem = previousItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        return previousItems.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        );
      }

      return [
        ...previousItems,
        { ...item, quantity: 1 },
      ];
    });
  }

  // Update product quantity
  function updateQuantity(id, change) {
    setCartItems((previousItems) =>
      previousItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // Remove product
  function removeItem(id) {
    setCartItems((previousItems) =>
      previousItems.filter((item) => item.id !== id)
    );
  }

  // Place customer order through backend
  async function placeOrder(orderDetails) {
    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not place order.");
      }

      const savedOrder = data.order;

      setOrders((previousOrders) => [
        ...previousOrders,
        savedOrder,
      ]);

      setCompletedOrder(savedOrder);
      setCartItems([]);
      setShowCheckout(false);

    } catch (error) {
      console.error("Error placing order:", error);
      alert(error.message || "Something went wrong. Please try again.");
    }
  }

  // Start a new order
  function startNewOrder() {
    setCompletedOrder(null);
    setShowCheckout(false);
  }

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div>
      <Navbar cartCount={cartCount} />

      <div style={{ padding: "15px 7%", backgroundColor: "#fffaf3" }}>
        <a
          href="#staff-dashboard"
          style={{ color: "#754c35", fontWeight: "bold" }}
        >
          Staff Dashboard
        </a>
      </div>

      <section className="hero" id="home">
        <div className="hero-content">
          <p className="hero-subtitle">
            WELCOME TO THE DAILY CUP
          </p>

          <h1>
            Your Daily Dose of
            <span> Happiness.</span>
          </h1>

          <p className="hero-description">
            Enjoy freshly brewed coffee, delicious pastries
            and refreshing drinks. Every cup is made with love.
          </p>

          <a href="#menu" className="hero-button">
            Explore Our Menu
          </a>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=900"
            alt="Freshly brewed coffee"
          />
        </div>
      </section>

      <Menu
        menuItems={menuItems}
        onAddToCart={addToCart}
      />

      {completedOrder ? (
        <OrderConfirmation
          order={
            orders.find(
              (order) =>
                order.orderNumber === completedOrder.orderNumber
            ) || completedOrder
          }
          onNewOrder={startNewOrder}
        />
      ) : showCheckout ? (
        <Checkout
          cartItems={cartItems}
          onPlaceOrder={placeOrder}
          onCancel={() => setShowCheckout(false)}
        />
      ) : (
        <Cart
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemove={removeItem}
          onCheckout={() => setShowCheckout(true)}
        />
      )}

      <section id="staff-dashboard">
        <StaffDashboard
          menuItems={menuItems}
          setMenuItems={setMenuItems}
          orders={orders}
          setOrders={setOrders}
        />
      </section>
    </div>
  );
}

export default App;
