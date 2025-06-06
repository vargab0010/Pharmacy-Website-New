const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/Order');
const Cart = require('../models/cart');
const Product = require('../models/product');

router.post('/place', async (req, res) => {
  const { userId } = req.body;

  try {
    // Get the full cart with populated products
    const cart = await Cart.findOne({ userId })
      .populate('items.productId');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Calculate total
    const total = cart.items.reduce((sum, item) => {
      return sum + (item.productId.price * item.quantity);
    }, 0);

    // Prepare order items
    const orderItems = cart.items.map(item => ({
      productId: item.productId._id,
      quantity: item.quantity
    }));

    // Create order
    const newOrder = new Order({
      userId,
      items: orderItems,
      total
    });

    await newOrder.save();
    
    // Clear cart
    await Cart.findOneAndUpdate(
      { userId },
      { $set: { items: [] } },
      { new: true }
    );

    // Populate the order details before sending response
    const populatedOrder = await Order.findById(newOrder._id)
      .populate('items.productId');

    res.status(201).json({ 
      message: 'Order placed successfully', 
      order: populatedOrder 
    });
  } catch (err) {
    console.error('Order placement error:', err);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

router.post('/direct', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    // Get product details
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // Create order
    const newOrder = new Order({
      userId,
      items: [{ productId, quantity }],
      total: product.price * quantity,
      isDirectPurchase: true
    });

    await newOrder.save();
    
    // Populate the order details before sending response
    const populatedOrder = await Order.findById(newOrder._id)
      .populate('items.productId');

    res.status(201).json({ 
      message: 'Order placed successfully', 
      order: populatedOrder 
    });
  } catch (err) {
    console.error('Direct order error:', err);
    res.status(500).json({ error: 'Failed to place order' });
  }
});



// Add this new route to get orders for a user
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId })
      .populate('items.productId')
      .sort({ createdAt: -1 }); // Sort by most recent first

    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Failed to load orders' });
  }
});

// Add this route to get a specific order by ID
router.get('/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId)
      .populate('items.productId');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    console.error('Error fetching order:', err);
    res.status(500).json({ error: 'Failed to load order details' });
  }
});





module.exports = router;