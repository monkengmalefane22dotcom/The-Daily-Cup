import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import StaffDashboard from "./pages/StaffDashboard";
import Navbar from "./components/Navbar";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);

  // Load menu items from backend
  useEffect(() => {
    fetch(`${API_URL}/api/menu`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load menu.");
        }
        return response.json();
      })
      .then((data) => setMenuItems(data))
      .catch((error) => console.error("Error loading menu:", error));
  }, []);

  // Load customer orders from backend
  useEffect(() => {
    fetch(`${API_URL}/api/orders`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load orders.");
        }
        return response.json();
      })
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error loading orders:", error));
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
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...previousItems, { ...item, quantity: 1 }];
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
      const response = await fetch(`${API_URL}/api/orders`, {
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

      setOrders((previousOrders) => [...previousOrders, savedOrder]);
      setCompletedOrder(savedOrder);
      setCartItems([]);
      setShowCheckout(false);
      navigate("/cart");
    } catch (error) {
      console.error("Error placing order:", error);
      alert(error.message || "Something went wrong. Please try again.");
    }
  }

  // Start a new order
  function startNewOrder() {
    setCompletedOrder(null);
    setShowCheckout(false);
    navigate("/menu");
  }

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div>
      <Navbar cartCount={cartCount} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/menu"
          element={
            <Menu
              menuItems={menuItems}
              onAddToCart={addToCart}
            />
          }
        />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route
          path="/cart"
          element={
            completedOrder ? (
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
            )
          }
        />

        <Route
          path="/staff-dashboard"
          element={
            <StaffDashboard
              menuItems={menuItems}
              setMenuItems={setMenuItems}
              orders={orders}
              setOrders={setOrders}
            />
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;