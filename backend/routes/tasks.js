const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// Create task
router.post('/', auth, async (req, res) => {
  const { title, description, status } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });
  try {
    const task = new Task({ title, description, status: status || 'pending', createdBy: req.user.id });
    await task.save();
    return res.status(201).json(task);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Get tasks (user: own tasks, admin: all tasks) with pagination & optional search
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, q } = req.query;
    const filter = {};
    if (req.user.role !== 'admin') filter.createdBy = req.user.id;
    if (q) filter.title = { $regex: q, $options: 'i' };
    const tasks = await Task.find(filter)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await Task.countDocuments(filter);
    return res.json({ tasks, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Get single task
router.get('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('createdBy', 'name email');
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (req.user.role !== 'admin' && task.createdBy._id.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    return res.json(task);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Update task
router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (req.user.role !== 'admin' && task.createdBy.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    const { title, description, status } = req.body;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    await task.save();
    return res.json(task);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (req.user.role !== 'admin' && task.createdBy.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    await task.remove();
    return res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
