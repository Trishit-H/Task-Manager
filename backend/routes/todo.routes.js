const express = require('express');

const {
    handleGetAllTodos,
    handleGetOneTodo,
    handleCreateTodo,
    handleDeleteTodo,
    handleUpdateTodo
} = require('../controllers/todo.controller.js');

const requireAuth = require('../middlewares/requireAuth.js');

const router = express.Router();

router.use(requireAuth);

// GET all todos
router.get('/', handleGetAllTodos);

// GET one todo
router.get('/:id', handleGetOneTodo);

// POST one todo
router.post('/addTodo', handleCreateTodo);

// DELETE todo
router.delete('/delete/:id', handleDeleteTodo);

// UPDATE todo
router.put('/update/:id', handleUpdateTodo);

module.exports = router;