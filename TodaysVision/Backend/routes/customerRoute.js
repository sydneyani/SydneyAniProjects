const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// Create a new customer
router.post('/', async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/count', async (req, res) => {
  try {
    console.log('here')

    const customer = await Customer.aggregate([
      {
        "$unwind": "$products"
      },
      {
        "$group": {
          "_id": {
            day: {
              "$dayOfMonth": "$createdAt"
            },
            "productType": "$products.type"
          },
          "count": {
            "$sum": "$products.price"
          }
        }
      }
    ]);

    const reflectiveNonReflectiveCount = await Customer.aggregate([
      {
        "$unwind": "$products"
      },
      {
        "$group": {
          "_id": {
            day: {
              "$dayOfMonth": "$createdAt",
            },
            "productType": "$products.subType"
          },
          "count": {
            "$sum": "$products.price"
          }
        }
      },
      {
        $match: {
          '_id.productType': { $exists: true, $ne: null }
        }
      }
    ]);


    const month = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0,
      13: 0,
      14: 0,
      15: 0,
      16: 0,
      17: 0,
      18: 0,
      19: 0,
      20: 0,
      21: 0,
      22: 0,
      23: 0,
      24: 0,
      25: 0,
      26: 0,
      27: 0,
      28: 0,
      29: 0,
      30: 0,
    }

    let final = {
      Accessories: { ...month },
      Glasses: { ...month },
      Contacts: { ...month },
      Reflective: { ...month },
      'Non-Reflective': { ...month }
    };

    Array.isArray(customer) && customer.forEach(el => {
      if (el?._id?.day && el._id.productType) {
        final[el._id.productType] = { ...final[el._id.productType], [el._id.day]: el?.count || 0 }
      }
    })

    Array.isArray(reflectiveNonReflectiveCount) && reflectiveNonReflectiveCount.forEach(el => {
      if (el?._id?.day && el._id.productType) {
        final[el._id.productType] = { ...final[el._id.productType], [el._id.day]: el?.count || 0 }
      }
    })

    res.json({ countsByDay: final });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

// Read a single customer by ID
router.get('/:customerId', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a customer by ID
router.put('/:customerId', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.customerId,
      req.body,
      { new: true }
    );
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a customer by ID
router.delete('/:customerId', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndRemove(req.params.customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
