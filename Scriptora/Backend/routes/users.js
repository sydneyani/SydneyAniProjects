// This file contains all API endpoints for interacting with the "users" collection in the MongoDB database
const express = require('express');
const router = express.Router();
// import bcrypt for comparing password to hashed password
const bcrypt = require('bcrypt');
// import JWT (JSON Web Token) to create a web token to the user after a successful login - allows user to make API calls
const jwt = require('jsonwebtoken');

// import users data model schema
const { users, FriendRequest } = require('../models/models');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this uploads directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// const org = process.env.ORG_ID;

// API endpoint to handle login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await users.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const payload = {
      name: user.name,
      role: user.role
    };

    // token expires in 30 days. This is not best security practice but still demonstrates how JWT work
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ token });
  } catch (err) {
    res.status(500).send('Server error');
  }
});
// API endpoint to handle user registration
router.post('/signup', async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  try {
    // Check if username or email already exists
    let user = await users.findOne({ $or: [{ username }] });
    if (user) {
      return res.status(400).json({ message: 'Username exists' });
    }

    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance
    user = new users({
      username,
      password: hashedPassword,
      role: 'viewer', // default role, or based on your logic
    });

    // Save the user to the database
    await user.save();

    // Create a payload for the JWT
    const payload = {
      name: user.username,
      role: user.role
    };

    // Sign the JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });

    // Send back the token
    res.json({ token });
  } catch (err) {
    console.error(err.message); // Log the error to the console
    res.status(500).send('Server error: ' + err.message); // Send the error message in the response
  }
});

// Endpoint to upload profile picture
router.post('/uploadProfilePic', upload.single('profilePic'), async (req, res) => {
  const userId = req.body.userId; // Make sure you send userId from the client
  const profilePic = req.file.filename;
  
  try {
    await users.findByIdAndUpdate(userId, { profilePic });
    res.status(200).json({ message: 'Profile picture updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile picture', error });
  }
});



module.exports = router;
