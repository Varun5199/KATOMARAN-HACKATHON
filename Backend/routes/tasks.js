const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Middleware to extract user email from header
function getUserEmail(req, res, next) {
  const email = req.headers['x-user-email'];
  if (!email) return res.status(401).json({ message: "Unauthorized: Email missing" });
  req.userEmail = email;
  next();
}

// GET tasks (created by or shared with the user)
router.get('/', getUserEmail, async (req, res) => {
  try {
    const tasks = await Task.find({
      $or: [
        { createdBy: req.userEmail },
        { sharedWith: req.userEmail }
      ]
    }).sort({ dueDate: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create task
router.post('/', getUserEmail, async (req, res) => {
  const { title, description, dueDate, status, sharedWith } = req.body;

  const task = new Task({
    title,
    description,
    dueDate,
    status: status || 'pending',
    createdBy: req.userEmail,
    sharedWith: sharedWith || []
  });

  try {
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
