import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './firebase';

// ✅ Correct import paths (case-sensitive and folder must match)
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedInUser = result.user;
      setUser(loggedInUser);
      localStorage.setItem("email", loggedInUser.email);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial", textAlign: "center" }}>
      <h1>📝 Todo Task Manager</h1>

      {user ? (
        <>
          <p>Welcome, {user.displayName}</p>
          <img src={user.photoURL} alt="Profile" width={80} style={{ borderRadius: "50%" }} />
          <TaskForm onTaskCreated={() => window.location.reload()} />
          <TaskList />
        </>
      ) : (
        <button onClick={handleLogin} style={{ padding: "10px 20px", fontSize: "16px" }}>
          Sign in with Google
        </button>
      )}
    </div>
  );
}

export default App;
