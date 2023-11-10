const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();

// routes using prefix "/login"
router.post('/',  (req, res) =>  loginController.login(req,res)); 

module.exports = router;
