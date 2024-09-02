// Import necessary modules
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Function to generate a jwt token
function generateToken(_id) {
    return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '3d' })
}

// Function to register a new user
async function handleUserSignup(req, res) {

    const { username, email, password } = req.body;

    try {

        //check if all fields are filled
        if (!username || !email | !password) {
            return res.status(400).json({ error: 'Please fill out all fields.' })
        }

        // Check if email already exists
        const checkEmail = await User.findOne({ email: email });
        if (checkEmail) {
            return res.status(409).json({ error: 'Email already exists' });
        };

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        // Create a new user
        const newSignup = await User.create(req.body);
        console.log('New user created:', newSignup);

        // Generate a token
        const token = generateToken(newSignup._id);

        res.status(200).json({ username, email, token })

    } catch (err) {
        console.log('Error creating new signup:', err);
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
};

// Function for user login
async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;

        //check if data is entered by the user
        if (!email || !password) {
            return res.status(400).json({
                error: 'Please fill out all credentials'
            })
        }

        // Check if email exists
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                error: 'Invalid email'
            })
        };

        // If email exists, then check password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                error: 'Invalid password'
            });
        };

        // If credentials are correct, then generate a token
        const token = generateToken(user._id);
        console.log('Generated token:', token);

        res.status(200).json({ username: user.username, email, token });
    } catch (err) {
        console.log('Error during login:', err);
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
};

// Export the functions
module.exports = {
    handleUserSignup,
    handleUserLogin
};
