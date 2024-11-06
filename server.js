// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth'); // Import the authentication routes

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json()); // To parse incoming JSON requests

// Use authentication routes
app.use('/api', authRoutes);

// MongoDB connection
mongoose.connect('mongodb+srv://Anjali:anjali@cluster0.owtaj.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
