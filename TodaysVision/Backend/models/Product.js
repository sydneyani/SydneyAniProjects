const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
  item_name: {
    type: String,
    required: true,
    trim: true,
  },
  items_total_price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    trim: true,
  },
  type: {
    type: [String],
    trim: true,
  },
  total_price: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
