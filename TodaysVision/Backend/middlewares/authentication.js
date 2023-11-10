const jwt = require('jsonwebtoken');
require('dotenv').config();


// Middleware function to authenticate token
const authenticateToken = (req, res, next) => {
    var token = req.headers['authorization'] ;
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    token = token.split(" ")[1];

    jwt.verify(token, process.env.SECRETKEY, (err, user) => {
        if (err) {
            console.log(err.message)
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = user;

        next();
    });
  };
  

  module.exports=authenticateToken;