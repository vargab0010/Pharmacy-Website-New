const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product.js');

// Get all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Get products by category
router.get('/category/:category', async (req, res) => {
  const products = await Product.find({ category: req.params.category });
  res.json(products);

});
// Get products by age group
router.get('/age/:group', async (req, res) => {
  try {
    const products = await Product.find({ ageGroup: req.params.group });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});





module.exports = router;
