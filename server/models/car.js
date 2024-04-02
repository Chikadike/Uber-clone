const mongoose = require('mongoose');
const WebSocket = require('ws');
const driverSocket = new WebSocket('ws://localhost:5000');

// Car schema
const carSchema = new mongoose.Schema({
    model: String,
    price: Number,
    availability: Boolean,
  });
  
  const Car = mongoose.model('Car', carSchema);

  module.exports = Car;