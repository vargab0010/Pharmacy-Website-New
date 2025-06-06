const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  imageUrl: String,
  stock: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    enum: ['medicine', 'medical'],
    required: true
  },
  ageGroup: {
  type: String,
  enum: ['kids', 'adults', 'seniors', 'general'],
  required: true
}

});

module.exports = mongoose.model('Product', productSchema);
