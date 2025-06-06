const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Cart = require('../models/cart');


// Add to cart - improved version
router.post('/add', async (req, res) => {
  const { userId, productId, quantity = 1 } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: 'Invalid IDs provided' });
  }

  try {
    let cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart) {
      cart = new Cart({ 
        userId, 
        items: [{ productId, quantity }] 
      });
    } else {
      const existingItem = cart.items.find(item => 
        item.productId._id.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    const populatedCart = await Cart.findById(cart._id).populate('items.productId');
    res.status(200).json({ 
      message: 'Product added to cart', 
      cart: populatedCart 
    });
  } catch (err) {
    console.error('Add to cart error:', err);
    res.status(500).json({ error: 'Server error while adding to cart' });
  }
});

// Get cart - improved version
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId })
      .populate({
        path: 'items.productId',
        model: 'Product'
      });

    if (!cart) {
      return res.json({ items: [] }); // Return empty cart if not found
    }

    res.json(cart);
  } catch (err) {
    console.error('Error loading cart:', err);
    res.status(500).json({ error: 'Server error loading cart' });
  }
});


module.exports = router;
