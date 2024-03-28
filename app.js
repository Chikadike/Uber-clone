require('dotenv').config();

const express = require('express');
const paath = require('path');
const mongoose = require('mongoose');
const app = express();
const dbName = 'project0';
const Mongoclient = require('mongodb').Mongoclient;


mongoose.connect('mongodb+srv://dikechika87:Okanumee1987.@cluster0.p3sheud.mongodb.net/?retryWrites=true&w=majority',
{useNewUrlParser: true, useUnifiedTopology:true,
});

// Car schema
const carSchema = new mongoose.Schema({
    model: String,
    price: Number,
    availability: Boolean,
});
  
const Car = mongoose.model('Car', carSchema);
  
// API route to get all cars
app.get('/api/cars', async (req, res) => {
    try {
      const cars = await Car.find();
      res.json(cars);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching cars' });
    }
});
  

const PORT = 5000 || process.env.PORT
   
//Serve static files from the 'public1' directory
app.use(express.static('public1'));

//Route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public1/index.html'));
});

//Route for the about page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public1/about.html'));
});

//Route for the login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public1/login.html'));
});

//Route for the uber eats page
app.get('/food', (req, res) => {
    res.sendFile(path.join(__dirname, 'public1/food.html'));
});

// Start the server
app.listen(PORT, ()=> {
    console.log(`App listening on port ${PORT}`);
});