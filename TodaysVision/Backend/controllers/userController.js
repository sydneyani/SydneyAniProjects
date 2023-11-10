const User = require('../models/User');

const UserController = {
  // function to add new user in db
    addUser: async (req, res) => {
        try {
            const user = new User(req.body);
            await user.save();
            res.json(user);
          } catch (err) {
            res.status(400).json({ error: err.message });
          }
    },
    // function to get all the users in the db
    getAllUsers: async (req, res) => {
        try {
          const user = await User.find();
          res.json(user);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
    },
    // function that finds a specific user using _id
    getUser: async (req, res) => {
        try {
          const user = await User.find({_id:req.params.userID});
          res.json(user);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
    },
    // function that deletes user using _id
    deleteUser:  async (req, res) => {
        try {
          const user = await User.findByIdAndRemove(req.params.userID);
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
          res.json({ message: 'User deleted' });
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      },
      // update exisitng user using _id
      updateUser: async (req, res) => {
        try {
          const user = await User.findByIdAndUpdate(
            req.params.userID,
            req.body,
            { new: true }
          );
          if (!user) {
            return res.status(404).json({ error: 'user not found' });
          }
          res.json(user);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      }

}



module.exports = UserController;
