const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const password= 'password123';
const saltRounds = 10;

const hash = bcrypt.hashSync(password, saltRounds);
console.log(hash);

const app = express();
const port = 3000; // Node.js default

// Use EJS as the template engine
app.set('view engine', 'ejs');

// Middleware to parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL Configuration
const connection = mysql.createConnection({
  host: "cis3368fall2023.c1eeeidrpfau.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "580091Sydney", // Use environment variables in production
  database: "cis3368falldb"
});

connection.connect(error => {
  if (error) {
    console.error('An error occurred while connecting to the DB');
    throw error;
  }
  console.log('Database connected!');
});

// Hardcoded username and hashed password (for demonstration purposes)
const users = {
  "admin": "$2y$10$o/caY2wTUV5IBykm9sXhUOH6eX.2DsQaW/kgZKHuMI9Oa74H5wZMa" // Hash of "password123"
};

// Login page route
app.get('/', (req, res) => {
  res.render('login');
});

// Login endpoint
app.get('/api/login', async (req, res) => {
    try {
      const { username, password } = req.query;
  
      // Check if the provided username exists
      if (users[username]) {
        // Compare the provided password with the stored hashed password
        const isPasswordMatch = bcrypt.compareSync(password, users[username]);
        if (isPasswordMatch) {
          console.log("Login successful");
          res.redirect('/landing'); // Redirect to the landing page on successful login
        } else {
          console.log("Invalid username or password");
          res.status(401).json({ error: "Invalid username or password" });
        }
      } else {
        console.log("Invalid username or password");
        res.status(401).json({ error: "Invalid username or password" });
      }
    } catch (e) {
      console.error(`An unexpected error occurred: ${e}`);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  });

// Landing page route
app.get('/landing', (req, res) => {
    res.render('index', {
      phoneNumber: '832-885-1233' // Replace with the actual phone number you want to display
    });
  });
  

// Error handling function
function handle_error(res, message, code = 500) {
    res.status(code).json({ "error": message });
  }
  
  // Route for managing floors
  app.get('/manage_floors', async (req, res) => {
    try {
      // Make a GET request to the /api/floors/all API
      const response = await axios.get('http://localhost:3000/api/floors/all');
  
      if (response.status === 200) { // Corrected from status_code to status
        const floors = response.data;
        res.render('manage_floors', { floors: floors });
      } else {
        handle_error(res, "Failed to fetch floor data", response.status); // Corrected from status_code to status
      }
    } catch (e) {
      console.error(`An unexpected error occurred: ${e}`);
      handle_error(res, "An unexpected error occurred");
    }
  });
  
  // API endpoints to GET all Floors
  app.get('/api/floors/all', (req, res) => {
    connection.query('SELECT * FROM floor', (error, results) => {
      if (error) {
        handle_error(res, "An unexpected error occurred");
      } else {
        res.json(results);
      }
    });
  });
  
  // API endpoint to POST for Floors
  app.post('/api/floors', (req, res) => {
    const { level, name } = req.body;
    const query = 'INSERT INTO floor (level, name) VALUES (?, ?)';
    connection.query(query, [level, name], (error, results) => {
      if (error) {
        handle_error(res, "An unexpected error occurred");
      } else {
        res.json({ "message": "Floor created successfully" });
      }
    });
  });
  
  // API endpoint to PUT for Floors
  app.put('/api/floors/update_id/:id', (req, res) => {
    const { id } = req.params;
    const { level, name } = req.body;
    const query = 'UPDATE floor SET level = ?, name = ? WHERE id = ?';
    connection.query(query, [level, name, id], (error, results) => {
      if (error) {
        handle_error(res, "An unexpected error occurred");
      } else {
        res.json({ "message": "Floor updated successfully" });
      }
    });
  });
  
  // API endpoint to DELETE for Floors
  app.delete('/api/floors/delete_id/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM floor WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        handle_error(res, "An unexpected error occurred");
      } else {
        res.json({ "message": "Floor deleted successfully" });
      }
    });
  });

// Error handling function
function handle_error(res, message, code = 500) {
    res.status(code).json({ "error": message });
  }
  
  // Route for managing rooms
  app.get('/manage_rooms', async (req, res) => {
    try {
      // Make a GET request to the /api/rooms/all API
      const response = await axios.get('http://localhost:3000/api/rooms/all');
  
      if (response.status === 200) { // Corrected from status_code to status
        const rooms = response.data;
        res.render('manage_rooms', { rooms: rooms });
      } else {
        handle_error(res, "Failed to fetch room data", response.status); // Corrected from status_code to status
      }
    } catch (e) {
      console.error(`An unexpected error occurred: ${e}`);
      handle_error(res, "An unexpected error occurred");
    }
  });
  
  // API endpoints to GET all Rooms
  app.get('/api/rooms/all', (req, res) => {
    connection.query('SELECT * FROM room', (error, results) => {
      if (error) {
        handle_error(res, "An unexpected error occurred");
      } else {
        res.json(results);
      }
    });
  });
  
  // API endpoint to POST for Rooms
  app.post('/api/rooms', (req, res) => {
    const { capacity, number, floor_id } = req.body;
    const query = 'INSERT INTO room (capacity, number, floor_id) VALUES (?, ?, ?)';
    connection.query(query, [capacity, number, floor_id], (error, results) => {
      if (error) {
        handle_error(res, "An unexpected error occurred");
      } else {
        res.json({ "message": "Room created successfully" });
      }
    });
  });
  
  // API endpoint to PUT for Rooms
  app.put('/api/rooms/update_id/:id', (req, res) => {
    const { id } = req.params;
    const { capacity, number, floor_id } = req.body;
    const query = 'UPDATE room SET capacity = ?, number = ?, floor_id = ? WHERE id = ?';
    connection.query(query, [capacity, number, floor_id, id], (error, results) => {
      if (error) {
        handle_error(res, "An unexpected error occurred");
      } else {
        res.json({ "message": "Room updated successfully" });
      }
    });
  });
  
  // API endpoint to DELETE for Rooms
  app.delete('/api/rooms/delete_id/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM room WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        handle_error(res, "An unexpected error occurred");
      } else {
        res.json({ "message": "Room deleted successfully" });
      }
    });
  });

// Route for managing occupants
app.get('/manage_occupants', async (req, res) => {
    try {
      // Make a GET request to the /api/residents/all API
      const response = await axios.get('http://localhost:3000/api/occupants/all');
  
      if (response.status === 200) {
        const occupants = response.data;
        res.render('manage_occupants', { occupants: occupants });
      } else {
        handle_error(res, "Failed to fetch occupant data", response.status);
      }
    } catch (e) {
      console.error(`An unexpected error occurred: ${e}`);
      handle_error(res, "An unexpected error occurred");
    }
  });
  
 // API endpoints to GET all Occupants
app.get('/api/occupants/all', (req, res) => {
    connection.query('SELECT * FROM occupant', (error, results) => { // Assuming your table is also named 'occupant'
      if (error) {
        handle_error(res, "An unexpected error occurred");
      } else {
        res.json(results);
      }
    });
  });
  
  
  // API endpoint to POST for Residents
  app.post('/api/occupants', (req, res) => {
    const { firstname, lastname, age, room_id } = req.body;
    const query = 'INSERT INTO occupant (firstname, lastname, age, room_id) VALUES (?, ?, ?, ?)';
    connection.query(query, [firstname, lastname, age, room_id], (error, results) => {
      if (error) {
        handle_error(res, "An unexpected error occurred");
      } else {
        res.json({ "message": "Resident created successfully" });
      }
    });
  });
  
  // API endpoint to PUT for Residents
  app.put('/api/occupants/update_id/:id', (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, age, room_id } = req.body;
    const query = 'UPDATE occupant SET firstname = ?, lastname = ?, age = ?, room_id = ? WHERE id = ?';
    connection.query(query, [firstname, lastname, age, room_id, id], (error, results) => {
      if (error) {
        handle_error(res, "An unexpected error occurred");
      } else {
        res.json({ "message": "Resident updated successfully" });
      }
    });
  });
  
  // API endpoint to DELETE for Residents
  app.delete('/api/occupants/delete_id/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM occupant WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        handle_error(res, "An unexpected error occurred");
      } else {
        res.json({ "message": "Resident deleted successfully" });
      }
    });
  });


  app.put('/delete_occupant/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM occupant WHERE id = ?';
  
    connection.query(query, [id], (error, results) => {
      if (error) {
        console.error(`An error occurred: ${error}`);
        return res.redirect('/manage_occupants?error=An error occurred while deleting the occupant');
      }
  
      res.redirect('/manage_occupants');
    });
  });
  
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
