const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Importing User model

// Handle user login
router.get('/login', (req, res) => {
    // Render the user's login page
    res.render('profile', { user: req.user });
});


router.post('/login', async (req, res) => {
    const { Username,Email, Password } = req.body;

    try {
        // Validating user credentials 
        const user = await User.findOne({ Email });
        if (!user || user.Password !== Password) {
            return res.status(401).send('Invalid credentials');
        }

        // Successful login
        // You can create a session or issue a token here
        // Redirect to the user's profile page or dashboard
        res.redirect('/profile');
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal server error');
    }
});

// Route to create a new user
router.post('/users');

// Export the router
module.exports = router;
