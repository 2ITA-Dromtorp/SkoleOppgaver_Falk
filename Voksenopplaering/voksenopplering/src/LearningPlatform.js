// LearningPlatform.js
import React, { useState } from 'react';
import './LearningPlatform.css'; // Import the CSS file for styling

function LearningPlatform({ onLogin }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [classConfirmed, setClassConfirmed] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
    onLogin(); // Call the onLogin function passed as a prop
  };

  const handleConfirmClass = () => {
    setClassConfirmed(true);
  };

  return (
    <div>
      <h1>Welcome to Adult Learning Platform</h1>
      {loggedIn ? (
        <div>
          <p>You are logged in!</p>
          {!classConfirmed ? (
            <button className="confirm-button" onClick={handleConfirmClass}>
              Confirm Class
            </button>
          ) : (
            <p>Class Confirmed! You are ready to learn.</p>
          )}
        </div>
      ) : (
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      )}
    </div>
  );
}

export default LearningPlatform;
