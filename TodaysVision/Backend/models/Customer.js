const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ['Glasses', 'Contacts', 'Accessories'],
  },
  glassesBrand: {
    type: String,
    required: function () {
      return this.type === 'Glasses';
    }
  },
  contactsBrand: {
    type: String,
    required: function () {
      return this.type === 'Contacts';
    }
  },
  accessoryType: {
    type: [String],
    validate: {
      validator: function(v) {
        if(this.type === 'Accessories'){
        return Array.isArray(this.accessoryType) && this.accessoryType.length > 0; 
        }
        return true
      },
      message: props => `Type is not a valid!`
  }
  },
  subType: {
    type: String,
    required: function () {
      return this.type === 'Accessories';
    }
  }
  // reference: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Product',
  //   required: true,
  // },
});

// Define the order schema
const orderSchema = new mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  datetime: {
    type: Date,
    default: Date.now,
  },
  products: [productSchema], // Array of products
});

// Define the customer schema
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      },
      message: 'Invalid email address format.',
    },
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  birthday: {
    type: Date,
  },
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [productSchema], // Array of products as orders is not defined
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
