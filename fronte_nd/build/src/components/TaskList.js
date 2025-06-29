import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/tasks', {
          headers: {
            "x-user-email": email
          }
        });
        setTasks(res.data);
      } catch (err) {
        console.error("Failed to load tasks", err);
      }
    };

    fetchTasks();
  }, [email]); // ✅ Fix: Only dependent on email now

  return (
    <div style={{ marginTop: '30px' }}>
      <h3 style={{ color: '#444' }}>📋 Your Tasks</h3>
      {tasks.length === 0 ? (
        <p style={{ color: 'gray' }}>No tasks available</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.map(task => (
            <li
              key={task._id}
              style={{
                background: '#f2f2f2',
                margin: '10px auto',
                padding: '15px',
                borderRadius: '10px',
                maxWidth: '500px',
                textAlign: 'left',
              }}
            >
              <strong>{task.title}</strong>
              <p>{task.description}</p>
              <small>📅 Due: {new Date(task.dueDate).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
