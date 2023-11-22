// SignupPage.js
import React, { useState, useEffect } from 'react';
import './SignupPage.css';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [popups, setPopups] = useState([]);
  let navigate = useNavigate();

  const handleClassSelection = (subject) => {
    setSelectedClass(subject);
  };

  const handleSignup = () => {
    const newPopup = {
      id: Date.now(), // Unique identifier for each popup
      class: selectedClass,
    };

    setPopups([...popups, newPopup]);

    // Automatically close the popup after 5 seconds
    setTimeout(() => {
      setPopups(popups.filter((popup) => popup.id !== newPopup.id));
    }, 5000);
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo" onClick={() => navigate('/')}>
          Voksenopplæring
        </div>
        <div className="nav-button" onClick={() => navigate('/')}>
          Back to Homepage
        </div>
      </nav>

      <div className="signup-content">
        <h1>Signup for Classes</h1>
        <p>Select a class to sign up:</p>
        <button className="class-button" onClick={() => handleClassSelection('Norsk')}>Norsk</button>
        <button className="class-button" onClick={() => handleClassSelection('Engelsk')}>Engelsk</button>
        <button className="class-button" onClick={() => handleClassSelection('samfunnsfag')}>Samfunnsfag</button>
        <button className="class-button" onClick={() => handleClassSelection('naturfag')}>Naturfag</button>
        <button className="class-button" onClick={() => handleClassSelection('matte')}>Matte</button>
        <button className="class-button" onClick={() => handleClassSelection('Fremmedspråk')}>Fremmedspråk</button>

        {selectedClass && (
          <div>
            <p>Selected class: {selectedClass}</p>
            <button className="signup-button" onClick={handleSignup}>
              Signup
            </button>
          </div>
        )}

        {/* Render popups */}
        {popups.map((popup) => (
          <div key={popup.id} className="confirmation-popup">
            <p>You have successfully signed up for {popup.class} class!</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SignupPage;
