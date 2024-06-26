const express = require('express');
const router = express.Router();
const driver = require('../models/driver');// import driver model

router.get("/registerdriver", function(req, res) {
    res.sendFile(path.join(__dirname, 'public1/registerdriver.html'));
})
// Route to create a new driver
router.post('/registerdriver', async (req, res) => {
    try {
        const { name, email, phone, licencenumber } = req.body;
        const driver = new Driver({ name, email, phone, licencenumber});
        await driver.save();
        res.status(201).json({ message: 'Driver registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering driver' });
    }
});


// Export the router
module.exports = router;

