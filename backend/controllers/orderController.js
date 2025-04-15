// routes/orderRoutes.js (or wherever you're organizing your routes)
const express = require('express');
const router = express.Router();
const Order  = require('../models/Order'); // Adjust the path to your Order model



exports.createOrder = async (req, res) => {

// Create a new order
  try {
    const { buyer_email, shipping_address, payment_method } = req.body;

    if (!buyer_email || !shipping_address || !payment_method) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newOrder = await Order.create({
      buyer_email,
      shipping_address,
      payment_method,
    });

    return res.status(201).json({ order_id: newOrder.order_id });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

