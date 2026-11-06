
import { useState } from "react";
import "./Menu.css";

function Menu({ menuItems, onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Coffee",
    "Tea",
    "Pastries",
    "Other Drinks",
  ];

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter(
          (item) => item.category === selectedCategory
        );

  // Only show products that are available
  const availableItems = filteredItems.filter(
    (item) => item.available !== false
  );

  return (
    <section className="menu-section" id="menu">
      <div className="menu-heading">
        <p>OUR SELECTION</p>
        <h2>Explore Our Menu</h2>
        <span>
          Discover your favourite drinks and freshly baked treats.
        </span>
      </div>

      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category}
            className={
              selectedCategory === category ? "active" : ""
            }
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {availableItems.length > 0 ? (
          availableItems.map((item) => (
            <div className="menu-card" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="menu-card-content">
                <p className="menu-category">
                  {item.category}
                </p>

                <h3>{item.name}</h3>

                <p className="menu-description">
                  {item.description}
                </p>

                <div className="menu-card-bottom">
                  <strong>
                    M{Number(item.price).toFixed(2)}
                  </strong>

                  <button onClick={() => onAddToCart(item)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available in this category.</p>
        )}
      </div>
    </section>
  );
}

export default Menu;
