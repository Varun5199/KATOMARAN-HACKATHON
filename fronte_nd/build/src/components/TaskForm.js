import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pending');
  const [sharedEmail, setSharedEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const email = localStorage.getItem("email");

      const res = await axios.post('http://localhost:5000/api/tasks', {
        title,
        description: desc,
        dueDate,
        status,
        sharedWith: sharedEmail ? [sharedEmail] : []
      }, {
        headers: {
          "x-user-email": email
        }
      });

      onTaskCreated(res.data);
      setTitle('');
      setDesc('');
      setDueDate('');
      setStatus('pending');
      setSharedEmail('');
    } catch (err) {
      console.error("Task creation failed", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h3>Create Task</h3>
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required /><br />
      <textarea placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} required /><br />
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required /><br />
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="in progress">In Progress</option>
        <option value="completed">Completed</option>
      </select><br />
      <input type="email" placeholder="Share with (email)" value={sharedEmail} onChange={e => setSharedEmail(e.target.value)} /><br />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
