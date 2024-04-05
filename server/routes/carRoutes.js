const express = require('express');
const router = express.Router();
const cars = require('../models/car');

// Route to get all car
router.get('/api/cars', async (req, res) => {
    try {
      const cars = await Car.find();
      res.json(cars);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching cars' });
    }
});

// Route to create a new car
router.post('/cars', async (req, res) => {
    try {
      const newCar = new Car(req.body);
      await newCar.save();
      res.status(201).json(newCar);
    } catch (error) {
      res.status(500).json({ error: 'Error creating a new car' });
    }
  });


// Export the router
module.exports = router;