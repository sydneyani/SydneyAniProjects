const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authentication');

const router = express.Router();

// routes using prefix "/users"
router.get('/', authenticateToken, (req, res) =>  userController.getAllUsers(req,res)); // get all users
router.get('/:userID',authenticateToken,  (req, res) =>  userController.getUser(req,res)); // get a specific user
router.post('/',  (req, res) =>  userController.addUser(req,res)); // create new user
router.delete('/:userID',authenticateToken,  (req, res) =>  userController.deleteUser(req,res)); // delete a user
router.put('/:userID',authenticateToken,  (req, res) =>  userController.updateUser(req,res)); // update a user

module.exports = router;
