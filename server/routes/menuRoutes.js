
const express = require("express");
const router = express.Router();
const redis = require("../config/redis");

// Initial menu items
const initialMenuItems = [
  {
    id: 1,
    name: "Cappuccino",
    category: "Coffee",
    description: "Rich espresso with steamed milk.",
    price: 35,
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600",
    available: true
  },
  {
    id: 2,
    name: "Latte",
    category: "Coffee",
    description: "Smooth coffee with steamed milk.",
    price: 40,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600",
    available: true
  },
  {
    id: 3,
    name: "Green Tea",
    category: "Tea",
    description: "Refreshing green tea.",
    price: 25,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600",
    available: true
  },
  {
    id: 4,
    name: "Chocolate Muffin",
    category: "Pastries",
    description: "Freshly baked chocolate muffin.",
    price: 30,
    image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600",
    available: true
  },
  {
    id: 5,
    name: "Croissant",
    category: "Pastries",
    description: "Fresh and buttery croissant.",
    price: 28,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600",
    available: true
  },
  {
    id: 6,
    name: "Iced Coffee",
    category: "Other Drinks",
    description: "Chilled coffee served over ice.",
    price: 38,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600",
    available: true
  }
];

const MENU_KEY = "menuItems";

// GET: Retrieve all menu items
router.get("/", async (req, res) => {
  try {
    let menuItems = await redis.get(MENU_KEY);

    if (menuItems === null) {
      menuItems = initialMenuItems;
      await redis.set(MENU_KEY, menuItems);
    }

    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Could not retrieve menu items." });
  }
});

// POST: Add a new menu item
router.post("/", async (req, res) => {
  try {
    const menuItems = await redis.get(MENU_KEY) || initialMenuItems;

    const newItem = {
      ...req.body,
      id: Date.now(),
      image: req.body.image || "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600",
      available: true
    };

    menuItems.push(newItem);

    await redis.set(MENU_KEY, menuItems);

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Could not add menu item." });
  }
});

// PUT: Update a menu item
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const menuItems = await redis.get(MENU_KEY) || initialMenuItems;

    const index = menuItems.findIndex(item => item.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    menuItems[index] = {
      ...menuItems[index],
      ...req.body,
      id
    };

    await redis.set(MENU_KEY, menuItems);

    res.json(menuItems[index]);
  } catch (error) {
    res.status(500).json({ message: "Could not update menu item." });
  }
});

// DELETE: Remove a menu item
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const menuItems = await redis.get(MENU_KEY) || initialMenuItems;

    const itemExists = menuItems.some(item => item.id === id);

    if (!itemExists) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    const updatedMenu = menuItems.filter(item => item.id !== id);

    await redis.set(MENU_KEY, updatedMenu);

    res.json({ message: "Menu item deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Could not delete menu item." });
  }
});

module.exports = router;
