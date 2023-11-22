// MainPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

function MainPage() {
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
  </ul>
</nav>

      {/* Class Signup Boxes */}
      <div className="available-classes">
        <h2>Available Classes</h2>
      </div>
      <div className="class-container">
        <div className="class-box">Norsk</div>
        <div className="class-box">Engelsk</div>
        <div className="class-box">Samfunnsfag</div>
        <div className="class-box">Naturfag</div>
        <div className="class-box">Matte</div>
        <div className="class-box">Fremmedspråk</div>
      </div>
    </div>
  );
}

export default MainPage;
