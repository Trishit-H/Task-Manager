require('dotenv').config();

const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connection to database is successful')
    } catch (err) {
        console.log('Error connection to database:', err)
    }
};

module.exports = connectDB;