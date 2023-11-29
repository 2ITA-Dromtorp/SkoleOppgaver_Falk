//LoginPopup.js
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './CSS/LoginPopup.css';
import json from './db.js';
import { AuthContext } from './AuthContext.js';

function LoginPopup({ onClose, onLogin }) {
  const [isLoggedIn, noe, noe2, setLoggedIn] = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    try {
      // Check if the entered username and password match any user in the database
      const matchingUser = json.users.find(
        (user) => user.username === username && user.password === password
      );

      if (matchingUser) {
        setLoggedIn(true);
        onLogin(username); // Notify the parent component about the login
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const handleLogout = () => {
    // Handle the logout logic
    setLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="login-popup">
      <div className="popup-content">
        {/* Close button */}
        <button className="close-button" onClick={onClose}>
          &times;
        </button>

        {/* Login/logout button */}
        {isLoggedIn ? (
          <>
            <p>Welcome, {username}!</p>
            <button className="login-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button className="login-button" onClick={handleLogin}>
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

LoginPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default LoginPopup;
