const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const LoginController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // matching password
    if (password === user.password) {
      // creating token
      const token = jwt.sign({ user: user }, process.env.SECRETKEY);


      res.json({
        token: token, user: {
          name: user.name,
          role: user.role,
          email: user.email,
          id: user._id
        }
      });
    } else {
      res.status(401).json({ message: 'Invalid password' });
    }
  }
}

module.exports = LoginController;