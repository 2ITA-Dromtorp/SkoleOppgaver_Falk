// login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Register from './register';

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
                    localStorage.setItem('token', data.token);
                    window.location.href = '/';
                } else {
                    alert('Invalid username or password');
                }
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            {!loggedIn && ( // Render login form only if not logged in
                <div className="login-form-container">
                    <div className="login-form-fields">
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className="login-form-buttons">
                        <button className="login-login-button" onClick={handleLogin}>Login</button>
                        <button className="register-button"><Link to="/Register">Create User</Link> </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LoginForm;