const express = require('express');
const router = express.Router();


//Routes
router.get('', (req, res) => {
    res.send('index');
});

router.get('/about', (req, res) => {
    res.render('about');
});



module.exports = router;