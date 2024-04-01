const mongoose = require('mongoose');

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
  // Add other necessary fields
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;