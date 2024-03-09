/* eslint-disable prettier/prettier */
// This file contains the data models of the collections in the MongoDB database

//Import functionalities
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  profilePic: { type: String, default: '' }, // Add this line to include the profile picture
});

const friendRequestSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});


// collection for clients
const clientDataSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId()
    },
    firstName: {
      type: String,
      required: true
    },
    middleName: {
      type: String
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    profilePic: {
      type: String,
      default: ''
    },
    phoneNumber: {
      primary: {
        type: String,
        required: true
      },
      alternate: {
        type: String
      }
    },
    address: {
      line1: {
        type: String
      },
      line2: {
        type: String
      },
      city: {
        type: String,
        required: true
      },
      county: {
        type: String
      },
      zip: {
        type: String
      }
    },
  },
  {
    collection: 'clients'
  }
);

// collection for events
const eventDataSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId()
    },
    name: {
      type: String,
      required: true
    },
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'services'
      }
    ],
    date: {
      type: Date,
      required: true
    },
    address: {
      line1: {
        type: String
      },
      line2: {
        type: String
      },
      city: {
        type: String
      },
      county: {
        type: String
      },
      zip: {
        type: String
      }
    },
    description: {
      type: String
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clients'
      }
    ]
  },
  {
    collection: 'events'
  }
);

// collection for services
const serviceDataSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId()
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    status: {
      type: String
    },
  },
  {
    collection: 'services'
  }
);



// create models from mongoose schemas
const clients = mongoose.model('clients', clientDataSchema);
const users = mongoose.model('users', userSchema);
const events = mongoose.model('events', eventDataSchema);
const services = mongoose.model('services', serviceDataSchema);
const FriendRequest = mongoose.model('FriendRequest', friendRequestSchema);

// package the models in an object to export
module.exports = { clients, events, users, services, FriendRequest };