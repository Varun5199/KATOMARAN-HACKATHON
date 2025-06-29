const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: Date,
  status: {
    type: String,
    enum: ['in progress', 'completed', 'pending'],
    default: 'pending'
  },
  createdBy: { type: String, required: true },
  sharedWith: [{ type: String }] // array of emails
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
