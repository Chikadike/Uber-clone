require('dotenv').config();

const express = require('express');
const paath = require('path');
const WebSocket = require('ws');
const http = require('http');
const mongoose = require('mongoose');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server});

// Store connected clients (drivers and passengers)
const clients = new Map();

wss.on('connection', (ws) => {
  // Extract user type (driver or passenger) from query parameters
  const userType = ws.upgradeReq.url.includes('driver') ? 'driver' : 'passenger';

  // Store the WebSocket connection in the clients map
  clients.set(ws, userType);

  // Handle messages from clients
  ws.on('message', (message) =>{
    console.log(`Received from ${userType}: ${message}`);
  // Broadcast the message to other connected clients
  broadcastMessage(message, ws);
});

// Handle WebSocket disconnections
ws.on('close', () => {
  clients.delete(ws); // Remove the disconnected client
  console.log(`${userType} disconnected`);
});
});

// Broadcast a message to all connected clients except the sender
function broadcastMessage(message, sender) {
clients.forEach((userType, client) => {
  if (client !== sender) {
    client.send(message);
  }
  });
}

const dbName = 'project0';
const Mongoclient = require('mongodb').Mongoclient;



mongoose.connect('mongodb+srv://dikechika87:Okanumee1987.@cluster0.p3sheud.mongodb.net/?retryWrites=true&w=majority',
{useNewUrlParser: true, useUnifiedTopology:true,
});

DB_STRING('mongodb+srv://dikechika87:Okanumee1987.@cluster0.oxdey6v.mongodb.net/<dbname>?retryWrites=true&w=majority'),


// API route to get all cars
//app.get('/api/cars', async (req, res) => {
//    try {
  //    const cars = await Car.find();
    //  res.json(cars);
    //} catch (error) {
      //res.status(500).json({ error: 'Error fetching cars' });
    //}
//});

// API endpoint to handle ride requests
app.post('/api/request-ride', async (req, res) => {
    // Extract location and destination from the request body
    // Store in MongoDB and find available drivers
    // ...
  });

  app.post('/api/drivers/register', async (req, res) => {
    try {
      const newDriver = new Driver({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        licenseNumber: req.body.licenseNumber,
        vehicleInfo: req.body.vehicleInfo,
        isApproved: false, // Initially not approved
        isAvailable: false // Initially not available
      });
      await newDriver.save();
      res.status(201).json({ message: 'Driver registered successfully, pending approval.' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
   
  

const PORT = 5000 || process.env.PORT
   
//Serve static files from the 'public1' directory
app.use(express.static('public1'));

//Route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public1/index.html'));
});

//Route for the about page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public1/about.html'));
});

//Route for the login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public1/login.html'));
});

//Route for the uber eats page
app.get('/food', (req, res) => {
    res.sendFile(path.join(__dirname, 'public1/food.html'));
});

// Start the server
app.listen(PORT, ()=> {
    console.log(`App listening on port ${PORT}`);
});