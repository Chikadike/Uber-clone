const mongoose = require('mongoose');
const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const Socket = new WebSocket("ws://localhost:5000");

const driverSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  licenseNumber: String,

  vehicleInfo: {
    make: String,
    model: String,
    year: Number
  },
  isApproved: Boolean,
  isAvailable: Boolean

});

const Driver = mongoose.model('driver', driverSchema);

// When a driver receives a ride request
Socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'newRideRequest') {
    const { pickup, destination, rideId } = data; 

        console.log(`New ride request received!`);
        console.log(`Pickup location: ${pickup}`);
        console.log(`Destination: ${destination}`); 
        
    const modal = document.createElement('div');
    modal.innerHTML = `
        <h3>Ride Request</h3>
        <p>Pickup: ${pickup}</p>
        <p>Destination: ${destination}</p>
        <button onclick="acceptRide('${rideId}')">Accept</button>
        <button onclick="rejectRide('${rideId}')">Reject</button>
        `;
// Append the modal to the DOM 
    document.body.appendChild(modal);
      }
  });
  
  // Function to handle driver response (accept or reject)
  function respondToRideRequest(rideId, accepted) {
      const response = {
          type: 'driverResponse',
          rideId,
          accepted,
      };
      Socket.send(JSON.stringify(response));
  }

// When the driver responds (accepts or rejects)
function respondToRideRequest(rideId, accepted) {
    const response = {
        type: 'driverResponse',
        rideId, 
        accepted,
    };
    Socket.send(JSON.stringify(response));
}

module.exports = Driver;