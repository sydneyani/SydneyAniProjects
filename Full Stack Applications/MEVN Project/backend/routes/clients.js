// This file stores all the API endpoints for making calls to the "clients" collection in the MongoDB database

// Import functionalities
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const app = express();
const fs = require('fs');

// Middleware for authorization. For API calls that require authorization, this middleware checks if the header of API calls have a valid security token. If no security token or invalid security token, then the API call is not made.
const authMiddleWare = require('../auth/authMiddleWare');

// importing data model schemas
const { clients, events, profilePic } = require('../models/models');
const { ObjectId } = require('mongodb');

// reading the org id from the environment variable
const org = process.env.ORG_ID;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads')); // Make sure to create an 'uploads' folder in the root of your project
  },
  filename: function (req, file, cb) {
    // Use Date.now() to prepend a unique timestamp to the original filename
    cb(null, Date.now() + '-' + file.originalname);
  }
});


const upload = multer({ storage: storage });



// API Endpoint to Get all clients
router.get('/', authMiddleWare, async (req, res) => {
  try {
    const cli = await clients.find({});
    res.json(cli);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// // API endpoint to GET single client by ID
// router.get('/id/:id', authMiddleWare, (req, res, next) => {
//   clients.findOne({ _id : req.params.id, orgs: org }, (error, data) => {
//     if (error) {
//       return next(error);
//     } else if (!data) {
//       res.status(400).send('Client not found');
//     } else {
//       res.json(data);
//     }
//   });
// });

// API endpoint to get all client details, including events registered and not registered
router.get('/details/:id', authMiddleWare, async (req, res, next) => {
  const clientId = req.params.id;
  try {
    // Find client by ID
    const client = await clients.findOne({ _id: clientId, orgs: org }).exec();
    if (!client) {
      return res.status(400).send('Client not found');
    }
 
    // Find events for which a client is signed up
    const clientEvents = await events.find({ attendees: clientId, org: org }).exec();
 
    // Find events for which a client is not signed up
    const eventsNotRegistered = await events.find({
      attendees: { $nin: [clientId] },
      org: org,
    }).exec();
 
    // Consolidate the data into one response object
    const responseData = {
      client: client,
      clientEvents: clientEvents,
      nonClientEvents: eventsNotRegistered,
    };
 
    res.json(responseData);
  } catch (error) {
    next(error);
  }
});


// API endpoint to GET entries based on search query
// Ex: '...?firstName=Bob&lastName=&searchBy=name'
router.get('/search', authMiddleWare, (req, res, next) => {
  const dbQuery = { orgs: org };
  let queryArray = [];
  let regexOptions = 'i';

  switch (req.query.searchBy) {
    case "name":
      if (req.query.firstName) {
        const firstNameRegex = new RegExp(
          `.*${req.query.firstName}.*`,
          regexOptions
        );
        queryArray.push({ firstName: { $regex: firstNameRegex } });
      }
      if (req.query.lastName) {
        const lastNameRegex = new RegExp(
          `.*${req.query.lastName}.*`,
          regexOptions
        );
        queryArray.push({ lastName: { $regex: lastNameRegex } });
      }
      break;
    case "number":
      if (req.query.phoneNumber) {
        const phoneNumberRegex = new RegExp(
          `.*${req.query.phoneNumber}.*`,
          regexOptions
        );
        queryArray.push({
          "phoneNumber.primary": { $regex: phoneNumberRegex },
        });
      }
      break;
    default:
      return res.status(400).send("invalid searchBy");
  }

  dbQuery["$and"] = queryArray;
  clients.find(dbQuery, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// POST create new client
router.post('/', authMiddleWare, (req, res, next) => {
  const newClient = req.body;
  newClient.orgs = [org];
  clients.create(newClient, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).send("New client created successfully");
    }
  });
});

// API endpoint to PUT update client
router.put("/update/:id", authMiddleWare, (req, res, next) => {
  clients.findByIdAndUpdate(req.params.id, req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      if (!data)
        res.status(400).send("Client not found.")
      else
        res.status(201).send("Client updated successfully");
    }
  });
});

// POST endpoint to upload a profile picture for a client
router.post(`/id/:id/profile-picture`, authMiddleWare, upload.single('profilePic'), (req, res, next) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const profilePicRelativePath = `../uploads/${req.file.filename}`;


  // Update the client's profilePic field in the database
  clients.findByIdAndUpdate(
    req.params.id,
    { profilePic: profilePicRelativePath },
    { new: true },
    (error, updatedClient) => {
      if (error) {
        return next(error);
      } else if (!updatedClient) {
        res.status(404).send("Client not found.");
      } else {
        // Return the updated client information
        res.json(updatedClient);
      }
    }
  );
});

// Serve the profile picture file from the uploads directory
router.get('/uploads/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, 'uploads', filename); // Adjust the path as necessary
  res.sendFile(filepath);
});

// API endpoint to hard delete client by ID, can be only be done if client is not signed up for events
router.delete("/:id", authMiddleWare, (req, res, next) => {
  clients.findOne({ _id : req.params.id, orgs: org }, (error, data) => {
    if (error) {
      return next(error);
    } else if (!data) {
      res.status(400).send("Client not found");
    } else {
      events.find({ attendees: req.params.id, org: org }, (error, data) => {
        if (error) {
          return next(error);
        } else {
          // only delete event if no client is not signed up for any event
          if (data.length === 0)
            clients.findByIdAndDelete(req.params.id, (error, data) => {
              if (error) {
                return next(error);
              } else if (!data) {
                res.status(400).send('Client not found');
              } else {
                res.status(200).send("Client deleted successfully");
              }
            });
          else 
            res.status(406).send("Client is signed up for events and can't be deleted.");
        }
      });
    }
  });
});


// API endpoint to DELETE a specific profile picture file
router.delete('/id/:id/profile-picture', authMiddleWare, async (req, res, next) => {
  const clientId = req.params.id;

  try {
    const client = await clients.findById(clientId);

    // If client does not exist or no profile picture is set, return an error
    if (!client || !client.profilePic) {
      return res.status(404).send('Client not found or no profile picture to delete');
    }

    // Construct the filepath using the filename from the client's profilePic
    const filename = client.profilePic.split('/').pop(); // Extract filename from profilePic path
    const filepath = path.join(__dirname, '../uploads', filename);

    // Check if the file exists before attempting to delete
    if (fs.existsSync(filepath)) {
      // Delete the file from the filesystem
      fs.unlink(filepath, async (error) => {
        if (error) {
          // Handle filesystem errors
          next(error);
        } else {
          // Clear the profile picture path in the client document
          client.profilePic = '';
          await client.save();
          res.status(200).send('Profile picture deleted successfully');
        }
      });
    } else {
      // The file was not found on the server, so just clear the reference
      client.profilePic = '';
      await client.save();
      res.status(200).send('Profile picture reference cleared successfully');
    }
  } catch (error) {
    // Handle any other errors
    next(error);
  }
});



// GET clients by zip code for dashboard
router.get('/byzip', (req, res, next) => {
  clients.aggregate(
    [
      {
        $match: {
          "address.zip": { $exists: true, $ne: "" }
        }
      },
      {
        $group: {
          _id: "$address.zip",
          count: { $sum: 1 }
        }
      }
    ],
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        return res.json(data);
      }
    }
  );
});



module.exports = router;
