// LoginPopup.js
import React from 'react';
import PropTypes from 'prop-types';
import './CSS/LoginPopup.css'; // Import the CSS file for styling

function LoginPopup({ onClose }) {
  return (
    <div className="login-popup">
      <span className="close-button" onClick={onClose}>&times;</span>
      <h2>Login</h2>
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

LoginPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LoginPopup;
