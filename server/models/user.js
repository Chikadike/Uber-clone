const mongoose = require('mongoose');
const WebSocket = require('ws');
const userSocket = new WebSocket('ws://localhost:5000');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
});

const user = mongoose.model('user', userSchema);

// When the user clicks "Request Ride"
function requestRide(pickup, destination) {
    const rideRequest = {
        type: 'requestRide',
        pickup,
        destination,
    };
    userSocket.send(JSON.stringify(rideRequest));
}

// Handle responses from the server
userSocket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'rideAccepted') {
        // Display a message to the user that their ride has been accepted
    } else if (data.type === 'rideRejected') {
        // Display a message that the ride request was rejected
    }
});

module.exports = user;