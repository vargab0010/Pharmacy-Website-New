const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');

// Add address to user
router.put('/address/add', async (req, res) => {
  const { userId, address } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.addresses.push(address);
    await user.save();

    res.json({ msg: 'Address saved successfully', addresses: user.addresses });
  } catch (err) {
    console.error('❌ Address save error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Routes for delete address
router.delete('/address/:userId/:index', async (req, res) => {
  const { userId, index } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user || !user.addresses[index]) return res.status(404).json({ error: 'Address not found' });

    user.addresses.splice(index, 1);
    await user.save();

    res.json({ msg: 'Address deleted', addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete address' });
  }
});

// Route for updating user profile
router.put('/address/update/:userId/:index', async (req, res) => {
  const { userId, index } = req.params;
  const updatedAddress = req.body;

  try {
    const user = await User.findById(userId);
    if (!user || !user.addresses[index]) return res.status(404).json({ error: 'Address not found' });

    user.addresses[index] = updatedAddress;
    await user.save();

    res.json({ msg: 'Address updated', address: updatedAddress });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update address' });
  }
});



module.exports = router;
