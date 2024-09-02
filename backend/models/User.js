// Import necessary modules
const mongoose = require('mongoose');
const validator = require('validator');

// Define the user schema
const userSchema = new mongoose.Schema({
    // Username field
    username: {
        type: String,
        trim: true,
        required: true
    },
    // Email field
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        // Custom validator to check if the email is valid
        validate: {
            validator: function (value) {
                return validator.isEmail(value)
            },
            // Error message for invalid email
            message: props => `${props.value} is not a valid email address`
        },
        required: true
    },
    // Password field
    password: {
        type: String,
        trim: true,
        required: true
    }
});

// Create the User model from the schema
const User = mongoose.model('users', userSchema);

// Export the User model
module.exports = User;
