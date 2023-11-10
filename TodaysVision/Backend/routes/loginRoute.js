const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();

// routes using prefix "/login"
router.post('/',  (req, res) =>  loginController.login(req,res)); 

// Handle GET requests to '/login'
router.get('/', (req, res) => {
    // You can add your logic here. For now, it will just send a response.
    res.send('GET request to the login page');
});

module.exports = router;
