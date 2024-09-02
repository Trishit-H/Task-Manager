require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./connect/db');

const todoRoute = require('./routes/todo.routes.js');
const userRoute = require('./routes/user.routes.js');

// intializing express app
const app = express();

app.use(cors());

// middleware to parse json response
app.use(express.json());

// setting up port
const PORT = process.env.PORT || 5000;

// connecting to database
connectDB();

// tdod route
app.use('/api/todo', todoRoute);

// user route
app.use('/api/user', userRoute);

// starting server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
});