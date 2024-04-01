const express = require('express');
const router = express.Router();
const carsController = require('../controllers/carsController');

// Route to get all car
router.get('/cars', carController.getAllCars);

// Route to create a new car
router.post('/cars', carController.createCar);

// Export the router
module.exports = router;