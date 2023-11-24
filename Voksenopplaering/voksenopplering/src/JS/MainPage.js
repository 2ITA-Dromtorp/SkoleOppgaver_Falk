// MainPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../LoginPopup'; // Import the Login component
import './CSS/MainPage.css';

function MainPage() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="main-nav">
        <ul className="main-nav-list">
          <li>
            <Link to="/" className="home-button">Home</Link>
          </li>
          <li>
            <Link to="/classes" className="class-button">Classes</Link>
          </li>
          <li>
            <Link to="/contact" className="contact-button">Contact</Link>
          </li>
          <li>
            <button className="login-button" onClick={() => setShowLogin(true)}>Login</button>
          </li>
        </ul>
      </nav>

      {/* Class Signup Boxes */}
      <div className="available-classes">
        <h2>Available Classes</h2>
      </div>
      <div className="class-container">
        <div className="class-box">grunnleggende datakunnskap</div>
        <div className="class-box">norsk</div>
        <div className="class-box">Mat og Helse</div>
        <div className="class-box">Kroppsøvning</div>
      </div>

      {/* Render the Login component when showLogin is true */}
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </div>
  );
}

export default MainPage;
