require('dotenv').config();

const path = require('path');
const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server});



//Store connected clients (drivers and passengers)
 const clients = new Map();
wss.on('connection', (ws) => {
  console.log('Client connected');
  // Extract user type (driver or passenger) from query parameters
 const userType = ws.upgradeReq.url.includes('driver') ? 'driver' : 'passenger';

  // Store the WebSocket connection in the clients map
  clients.set(ws, userType);

   //Handle messages from clients
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

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

//const userRoutes = require('./server/routes/userRoutes');
//const driverRoutes = require('./server/routes/driverRoutes');
//const carRoutes = require('./server/routes/carRoutes');

//app.use('/users', userRoutes);
//app.use('/drivers', driverRoutes);
///app.use('/cars', carRoutes);

// API endpoint to handle ride requests
app.post('/api/request-ride', async (req, res) => {
  try {
    const { location, destination } = req.body;

    // rides data
    const rideData = {
      location,
      destination,
      timestamp: new Date(),
    };

    // Store the ride data in MongoDB
    await db.collection('rides').insertOne(rideData);

    // Find available drivers
    const availableDrivers = await findAvailableDrivers(location);

    // Respond with success message and available drivers
    res.status(200).json({
      message: 'Ride request successful!',
      availableDrivers,
    });
  } catch (error) {
    console.error('Error processing ride request:', error);
    res.status(500).json({ error: 'Internal server error' });
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