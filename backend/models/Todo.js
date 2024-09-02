const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    deadline: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Todo = mongoose.model('todos', todoSchema);

module.exports = Todo;