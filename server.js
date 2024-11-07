const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors({
    origin: 'https://anjali-password-reset.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

app.use(bodyParser.json());

app.use('/api', authRoutes);

mongoose.connect('mongodb+srv://Anjali:anjali@cluster0.owtaj.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
