// MainPage.js
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './LoginPopup'; // Import the Login component
import ClassPopup from './ClassPopup'; // Import the ClassPopup component
import './CSS/MainPage.css';

function MainPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');

  const handleClassClick = (classTitle) => {
    setSelectedClass(classTitle);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedClass('');
  };

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
          <div className="class-box" onClick={() => handleClassClick('grunnleggende datakunnskap')}>
            <img src="path/to/image1.jpg" alt="Grunnleggende datakunnskap" />
            <p>Class Description 1</p>
          </div>
          <div className="class-box" onClick={() => handleClassClick('norsk')}>
            <img src="path/to/image2.jpg" alt="Norsk" />
            <p>Class Description 2</p>
          </div>
          <div className="class-box" onClick={() => handleClassClick('Mat og Helse')}>
            <img src="path/to/image3.jpg" alt="Mat og Helse" />
            <p>Class Description 3</p>
          </div>
          <div className="class-box" onClick={() => handleClassClick('Kroppsøving')}>
            <img src="path/to/image4.jpg" alt="kroppsøving" />
            <p>Class Description 4</p>
          </div>
        </div>


      {showLogin && <Login onClose={() => setShowLogin(false)} />}
      {showPopup && <ClassPopup classTitle={selectedClass} onClose={closePopup} />}
    </div>
  );
}

export default MainPage;
