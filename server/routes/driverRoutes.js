const express = require('express');
const router = express.Router();
const driver = require('../models/driver');// import driver model


// Route to create a new driver
router.post('/registerdriver', async (req, res) => {
    try {
        const { name, car } = req.body;
        const driver = new Driver({ name, car });
        await driver.save();
        res.status(201).json({ message: 'Driver registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering driver' });
    }
});


// Export the router
module.exports = router;

