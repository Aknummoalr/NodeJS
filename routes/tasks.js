const express = require('express');
const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

// CRUD operations (Create, Read, Update, Delete)
// Create Task
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.id;
        const result = await pool.query(
            "INSERT INTO tasks (title, description, userId) VALUES ($1, $2, $3) RETURNING *",
            [title, description, userId]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Tasks
router.get('/', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await pool.query("SELECT * FROM tasks WHERE userId = $1", [userId]);
        res.json(tasks.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Task
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;
        const userId = req.user.id;
        const result = await pool.query(
            "UPDATE tasks SET title = $1, description = $2, status = $3, updatedAt = NOW() WHERE id = $4 AND userId = $5 RETURNING *",
            [title, description, status, id, userId]
        );
        if (result.rows.length === 0) return res.status(403).json({ message: 'Task not found or unauthorized' });
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Task
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const result = await pool.query("DELETE FROM tasks WHERE id = $1 AND userId = $2 RETURNING *", [id, userId]);
        if (result.rows.length === 0) return res.status(403).json({ message: 'Task not found or unauthorized' });
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
