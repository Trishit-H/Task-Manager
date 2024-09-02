const Todo = require('../models/Todo');

const mongoose = require('mongoose');

// get all todos
async function handleGetAllTodos(req, res) {

    const user_id = req.user._id;

    try {
        const todos = await Todo.find({ user_id }).sort({ createdAt: -1 });
        return res.status(200).json(todos)
    } catch (err) {
        console.log('Error getting todos:', err);
        return res.status(500).json({ error: 'Error getting todos' })
    }
};

// get a single todo
async function handleGetOneTodo(req, res) {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such todo' })
        };

        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).json({ error: 'No such todo' })
        };

        res.status(200).json(todo)
    } catch (err) {
        console.log('Error getting todo:', err);
        return res.status(500).json({ error: 'Error getting todo' })
    }
};

// create a new todo
async function handleCreateTodo(req, res) {
    const { title, description, deadline } = req.body;

    let emptyFields = [];

    if (!title) {
        emptyFields.push('title')
    }

    if (!description) {
        emptyFields.push('description')
    }

    if (!deadline) {
        emptyFields.push('deadline')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill out all the fields', emptyFields })
    }
    try {
        const user_id = req.user._id;

        // add to the database
        const todo = await Todo.create({ title, description, deadline, user_id });
        return res.status(201).json(todo);
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
};

// delete a work 
async function handleDeleteTodo(req, res) {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such todo' })
        };

        const todo = await Todo.findOneAndDelete({ _id: id });

        if (!todo) {
            return res.status(400).json({ error: 'No such todo' })
        }

        res.status(200).json(todo)
    } catch (err) {
        console.log('Error deleting tood:', err);
        res.status(500).json({
            msg: 'Internal server error',
            error: err.message
        })
    }
};

// update a todo
async function handleUpdateTodo(req, res) {
    const { id } = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'No such todo' })
        }

        const todo = await Todo.findOneAndUpdate({ _id: id }, {
            ...req.body
        }, { new: true })

        if (!todo) {
            return res.status(400).json({ error: 'No such todo' })
        }

        res.status(200).json(todo)
    } catch (err) {
        console.log('Error updating todo:', err);
        return res.status(500).json({
            msg: 'Internal server error',
            error: err.message
        })
    }
};

module.exports = {
    handleGetAllTodos,
    handleGetOneTodo,
    handleCreateTodo,
    handleDeleteTodo,
    handleUpdateTodo
};