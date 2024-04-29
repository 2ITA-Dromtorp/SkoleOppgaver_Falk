// LoginForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status

  const handleLogin = () => {
    // Handle login logic here
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          console.log("Login successful");
          setLoggedIn(true); // Update login status to true
          onLoginSuccess(data.id, username); // Notify parent component of successful login
        } else {
          alert('Invalid username or password');
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Login</h2>
      {!loggedIn && ( // Render login form only if not logged in
        <div>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button onClick={handleLogin}>Login</button>
          <Link to="/addStudent">Create User</Link> {/* Adding a link to navigate to AddStudentForm */}
        </div>
      )}
    </div>
  );
}

export default LoginForm;