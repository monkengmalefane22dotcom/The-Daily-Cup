
const express = require("express");
const router = express.Router();
const redis = require("../config/redis");

const ORDERS_KEY = "orders";

// GET: Retrieve all customer orders
router.get("/", async (req, res) => {
  try {
    const orders = await redis.get(ORDERS_KEY) || [];
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Could not retrieve orders."
    });
  }
});

// POST: Place a new order
router.post("/", async (req, res) => {
  try {
    const { customerName, phone, notes, items, total } = req.body;

    if (!customerName || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Customer name and order items are required."
      });
    }

    const orders = await redis.get(ORDERS_KEY) || [];

    const newOrder = {
      orderNumber: "DC-" + Date.now(),
      customerName,
      phone: phone || "",
      notes: notes || "",
      items,
      total: Number(total),
      status: "Pending",
      date: new Date().toISOString()
    };

    orders.push(newOrder);

    await redis.set(ORDERS_KEY, orders);

    res.status(201).json({
      message: "Order placed successfully!",
      order: newOrder
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not place order."
    });
  }
});

// PUT: Update order status
router.put("/:orderNumber", async (req, res) => {
  try {
    const { orderNumber } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["Pending", "Preparing", "Ready", "Collected"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status."
      });
    }

    const orders = await redis.get(ORDERS_KEY) || [];

    const index = orders.findIndex(
      (item) => item.orderNumber === orderNumber
    );

    if (index === -1) {
      return res.status(404).json({
        message: "Order not found."
      });
    }

    orders[index].status = status;

    await redis.set(ORDERS_KEY, orders);

    res.json({
      message: "Order status updated successfully.",
      order: orders[index]
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not update order status."
    });
  }
});

module.exports = router;
