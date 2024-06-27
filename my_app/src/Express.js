const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tasks_db'
});

// GET all tasks
app.get('/tasks', (req, res) => {
  connection.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching tasks' });
    }
    res.json(results);
  });
});

// GET a specific task
app.get('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  connection.query('SELECT * FROM tasks WHERE id = ?', [taskId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching task' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(results[0]);
  });
});

// Create a new task
app.post('/tasks', (req, res) => {
  const { title, description, status } = req.body;
  connection.query('INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)', [title, description, status], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error creating task' });
    }
    res.status(201).json({ id: results.insertId, title, description, status });
  });
});

// Update a task
app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const { title, description, status } = req.body;
  connection.query('UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?', [title, description, status, taskId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error updating task' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ id: taskId, title, description, status });
  });
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  connection.query('DELETE FROM tasks WHERE id = ?', [taskId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error deleting task' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(204).end();
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});