import { useState } from "react";
import "./StaffDashboard.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
function StaffDashboard({
  menuItems,
  setMenuItems,
  orders,
  setOrders,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Coffee",
    description: "",
    price: "",
    image: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function resetForm() {
    setEditingId(null);
    setFormData({
      name: "",
      category: "Coffee",
      description: "",
      price: "",
      image: "",
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const product = {
      ...formData,
      price: Number(formData.price),
    };

    try {
      let response;

      if (editingId !== null) {
        response = await fetch(
         `${API_URL}/api/menu/${editingId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
          }
        );
      } else {
        response = await fetch(`${API_URL}/api/menu`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        });
      }

      if (!response.ok) {
        throw new Error("Could not save product.");
      }

      const savedProduct = await response.json();

      if (editingId !== null) {
        setMenuItems((previousItems) =>
          previousItems.map((item) =>
            item.id === editingId ? savedProduct : item
          )
        );
      } else {
        setMenuItems((previousItems) => [
          ...previousItems,
          savedProduct,
        ]);
      }

      resetForm();
      alert("Product saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Could not save product. Check that the backend is running.");
    }
  }

  function editItem(item) {
    setFormData({
      name: item.name,
      category: item.category,
      description: item.description,
      price: item.price,
      image: item.image || "",
    });

    setEditingId(item.id);
    setShowMenu(true);
  }

  async function deleteItem(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
      `${API_URL}/api/menu/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Could not delete product.");
      }

      setMenuItems((previousItems) =>
        previousItems.filter((item) => item.id !== id)
      );

      alert("Product deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Could not delete product.");
    }
  }

  async function toggleAvailability(item) {
    try {
      const response = await fetch(
        `${API_URL}/api/menu/${item.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            available: !item.available,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Could not update availability.");
      }

      const updatedItem = await response.json();

      setMenuItems((previousItems) =>
        previousItems.map((product) =>
          product.id === item.id ? updatedItem : product
        )
      );
    } catch (error) {
      console.error(error);
      alert("Could not update product availability.");
    }
  }

 async function updateOrderStatus(orderNumber, newStatus) {
  try {
    const response = await fetch(
     `${API_URL}/api/orders/${orderNumber}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not update order status.");
    }

    setOrders((previousOrders) =>
      previousOrders.map((order) =>
        order.orderNumber === orderNumber ? data.order : order
      )
    );
  } catch (error) {
    console.error("Error updating order status:", error);
    alert(error.message);
  }
}

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const today = new Date().toDateString();

  const todaySales = orders
    .filter(
      (order) =>
        order.status === "Collected" &&
        new Date(order.date).toDateString() === today
    )
    .reduce((total, order) => total + Number(order.total), 0);

  return (
    <section className="staff-dashboard">
      <div className="staff-heading">
        <div>
          <p>THE DAILY CUP</p>
          <h1>Staff Dashboard</h1>
          <span>Manage your coffee shop operations.</span>
        </div>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total Orders</h3>
          <p>{orders.length}</p>
        </div>

        <div className="dashboard-card">
          <h3>Pending Orders</h3>
          <p>{pendingOrders}</p>
        </div>

        <div className="dashboard-card">
          <h3>Menu Items</h3>
          <p>{menuItems.length}</p>
        </div>

        <div className="dashboard-card">
          <h3>Today's Sales</h3>
          <p>M{todaySales.toFixed(2)}</p>
        </div>
      </div>

      <div className="staff-sections">
        <div className="staff-section">
          <h2>Menu Management</h2>
          <p>Add, update, delete and manage menu items.</p>
          <button onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? "Close Menu Management" : "Manage Menu"}
          </button>
        </div>

        <div className="staff-section">
          <h2>Order Management</h2>
          <p>View customer orders and update their status.</p>
          <button onClick={() => setShowOrders(!showOrders)}>
            {showOrders ? "Close Order Management" : "Manage Orders"}
          </button>
        </div>
      </div>

      {showMenu && (
        <div className="menu-management">
          <h2>
            {editingId !== null ? "Edit Product" : "Add New Product"}
          </h2>

          <form onSubmit={handleSubmit} className="product-form">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Coffee">Coffee</option>
              <option value="Tea">Tea</option>
              <option value="Pastries">Pastries</option>
              <option value="Other Drinks">Other Drinks</option>
            </select>

            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />

            <label>Price (M)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0.01"
              step="0.01"
              required
            />

            <label>Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />

            <button type="submit">
              {editingId !== null ? "Save Changes" : "Add Product"}
            </button>

            {editingId !== null && (
              <button type="button" onClick={resetForm}>
                Cancel Edit
              </button>
            )}
          </form>

          <h2>Existing Menu Items</h2>

          <div className="managed-products">
            {menuItems.map((item) => (
              <div className="managed-product" key={item.id}>
                <div>
                  <h3>{item.name}</h3>
                  <p>
                    {item.category} | M{Number(item.price).toFixed(2)}
                  </p>
                  <p>
                    Availability: {item.available ? "Available" : "Unavailable"}
                  </p>
                </div>

                <div className="product-actions">
                  <button onClick={() => editItem(item)}>Edit</button>

                  <button onClick={() => toggleAvailability(item)}>
                    {item.available ? "Mark Unavailable" : "Mark Available"}
                  </button>

                  <button onClick={() => deleteItem(item.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showOrders && (
        <div className="order-management">
          <h2>Customer Orders</h2>

          {orders.length === 0 ? (
            <p>No customer orders have been placed yet.</p>
          ) : (
            orders.map((order) => (
              <div className="managed-order" key={order.orderNumber}>
                <h3>{order.orderNumber}</h3>

                <p><strong>Customer:</strong> {order.customerName}</p>
                <p><strong>Phone:</strong> {order.phone || "Not provided"}</p>
                <p><strong>Products:</strong></p>

                <ul>
                  {order.items.map((item, index) => (
                    <li key={item.id ?? index}>
                      {item.name} × {item.quantity}
                    </li>
                  ))}
                </ul>

                <p>
                  <strong>Instructions:</strong>{" "}
                  {order.notes || "No additional instructions"}
                </p>

                <p>
                  <strong>Total:</strong> M{Number(order.total).toFixed(2)}
                </p>

                <label>Update Order Status:</label>

                <select
                  value={order.status}
                  onChange={(e) =>
                    updateOrderStatus(order.orderNumber, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Ready">Ready</option>
                  <option value="Collected">Collected</option>
                </select>

                <p>
                  <strong>Current Status:</strong> {order.status}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}

export default StaffDashboard;
