// SignupPage.js
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './CSS/SignupPage.css'; // Import your SignupPage CSS file
import LoginPopup from './LoginPopup';
import ClassPopup from './ClassPopup';
import {AuthContext} from "./AuthContext"
import image1 from './Pictures/grunnleggendedatakunnskap.png';
import image2 from './Pictures/Norsk.png';
import image3 from './Pictures/matoghelse.png';
import image4 from './Pictures/gym.png';

function SignupPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [loggedInUsername, setLoggedInUsername] = useState('');
  const [userSignedClasses, setUserSignedClasses] = useState([]);
  const {0: isLoggedIn} = useContext(AuthContext)

  const handleClassClick = (classTitle) => {
    // Check if the user is already signed up for a class of the same subject
    if (userSignedClasses.some(className => className.includes(classTitle))) {
      alert('You are already signed up for a class of this subject.');
    } else {
      // Update the user's signedClasses
      setUserSignedClasses([...userSignedClasses, classTitle]);

      // Show the popup
      setSelectedClass(classTitle);
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedClass('');
  };

  const handleLogin = (username) => {
    setLoggedInUsername(username);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setLoggedInUsername('');
    setUserSignedClasses([]);
  };

  // Navigation Bar JSX
  const navBar = (
    <nav className="main-nav">
      <ul className="main-nav-list">
        <li>
          <Link to="/" className="home-button">
            Home
          </Link>
        </li>
        <li>
          <Link to="/classes" className="class-button">
            Classes
          </Link>
        </li>
        <li>
          <Link to="/contact" className="contact-button">
            Contact
          </Link>
        </li>
        <li>
          <button className="login-button" onClick={() => setShowLogin(true)}>
            {loggedInUsername ? loggedInUsername : 'Login'}
          </button>
        </li>
      </ul>
    </nav>
  );

  return (
    <div>
      {navBar}

      {/* Class Signup Boxes */}
      {isLoggedIn ? (<>
        <div className="available-classes">
        <h2>Available Classes</h2>
      </div>
      <div className="zesty-class-container">
        <div className="zesty-class-box" >
          <img src={image1} alt="Grunnleggende datakunnskap" />
          <div className="Class-info-box">
            <h2>Datakunnskap</h2>
            <table>
              <tbody>
                <tr>
                  <th>Tid:</th>
                  <th>Sted:</th>
                </tr>
                <tr>
                  <td>i morra</td>
                  <td>hos falk</td>
                </tr>
                <tr>
                  <td>2 dager</td>
                  <td>hos din mor</td>
                </tr>
                <tr>
                  <td>3 dager</td>
                  <td>hos din far</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="zesty-class-box" >
          <img src={image2} alt="Norsk" />
          <div className="Class-info-box">
            <h2>Norsk</h2>
            <table>
              <tbody>
                <tr>
                  <th>Tid:</th>
                  <th>Sted:</th>
                </tr>
                <tr>
                  <td>i morra</td>
                  <td>hos falk</td>
                </tr>
                <tr>
                  <td>2 dager</td>
                  <td>hos din mor</td>
                </tr>
                <tr>
                  <td>3 dager</td>
                  <td>hos din far</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="zesty-class-box">
          <img src={image3} alt="Mat og Helse" />
          <div className="Class-info-box">
            <h2>Mat og Helse</h2>
            <table>
              <tbody>
                <tr>
                  <th>Tid:</th>
                  <th>Sted:</th>
                </tr>
                <tr>
                  <td>i morra</td>
                  <td>hos falk</td>
                </tr>
                <tr>
                  <td>2 dager</td>
                  <td>hos din mor</td>
                </tr>
                <tr>
                  <td>3 dager</td>
                  <td>hos din far</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="zesty-class-box">
          <img src={image4} alt="kroppsøving" />
          <div className="Class-info-box">
            <h2>Kroppsøving</h2>
            <table>
              <tbody>
                <tr>
                  <th>Tid:</th>
                  <th>Sted:</th>
                </tr>
                <tr>
                  <td>i morra</td>
                  <td>hos falk</td>
                </tr>
                <tr>
                  <td>2 dager</td>
                  <td>hos din mor</td>
                </tr>
                <tr>
                  <td>3 dager</td>
                  <td>hos din far</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </>) : (
        <p>
          logg in din akustiske guitar 🎸🎸🎸
        </p>
      )}

      {showLogin && <LoginPopup onClose={() => setShowLogin(false)} onLogin={handleLogin} />}
    </div>
  );
}

export default SignupPage;
