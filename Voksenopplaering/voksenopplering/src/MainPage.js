//MainPage.js
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginPopup from './LoginPopup';
import ClassPopup from './ClassPopup';
import './CSS/MainPage.css';
import json from './db.js';
import ThemeToggle from './ThemeToggle'; // Import the ThemeToggle component
import { useTheme } from './ThemeContext'; // Import the useTheme hook
import image1 from './Pictures/grunnleggendedatakunnskap.png';
import image2 from './Pictures/Norsk.png';
import image3 from './Pictures/matoghelse.png';
import image4 from './Pictures/gym.png';

function MainPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [loggedInUsername, setLoggedInUsername] = useState('');
  const [userSignedClasses, setUserSignedClasses] = useState([]);
  const { isDarkTheme, toggleTheme } = useTheme(); // Use the theme state and toggleTheme function


  const handleClassClick = (classTitle) => {
    // Check if the user is already signed up for a class of the same subject
    if (userSignedClasses.some(className => className.includes(classTitle))) {
    } else {
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

  return (
    <div>

      <nav className="main-nav">
        <div className={isDarkTheme ? 'dark-theme' : 'light-theme'}> {/* Apply theme-based class */}
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
        </div>
        <toggleTheme />

      </nav>

      {/* Class Signup Boxes */}
      <div className="available-classes">
      <button onClick={() => {
                toggleTheme();
              }}>
                dark/light
              </button>
        <h2>Available Classes</h2>
      </div>
      <div className="class-container">
        <div className="class-box" onClick={() => handleClassClick('grunnleggende datakunnskap')}>
          <img src={image1} alt="Grunnleggende datakunnskap" />
          <div className="Class-info-box">
            <h2>Datakunnskap</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at luctus arcu. Pellentesque eu nisl sed
              justo laoreet porta sit amet et risus. Suspendisse sit amet egestas orci. Maecenas consequat, elit in
              tincidunt tristique, augue nunc lacinia nunc, vel aliquet ex urna ut purus. Donec accumsan, augue nec
              tincidunt porttitor, sem ante tincidunt tortor, a sodales erat massa ut ligula. Ut ac felis ac diam ornare
              hendrerit. Nullam lacinia ultricies ex, quis eleifend justo maximus id.
            </p>
            {userSignedClasses.includes("grunnleggende datakunnskap") && (<>
              <p className='du-meldt-på'>
                du melde på ja!!!!1
              </p>
              <button onClick={() => {
                setUserSignedClasses(prevState => {
                  return prevState.splice(prevState.indexOf("grunnleggende datakunnskap"), 1);
                })
              }}>Meld av
              </button>
            </>)}
          </div>
        </div>
        <div className="class-box" onClick={() => handleClassClick('norsk')}>
          <img src={image2} alt="Norsk" />
          <div className="Class-info-box">
            <h2>Norsk</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at luctus arcu. Pellentesque eu nisl sed
              justo laoreet porta sit amet et risus. Suspendisse sit amet egestas orci. Maecenas consequat, elit in
              tincidunt tristique, augue nunc lacinia nunc, vel aliquet ex urna ut purus. Donec accumsan, augue nec
              tincidunt porttitor, sem ante tincidunt tortor, a sodales erat massa ut ligula. Ut ac felis ac diam ornare
              hendrerit. Nullam lacinia ultricies ex, quis eleifend justo maximus id.
            </p>
            {userSignedClasses.includes("norsk") && (<>
              <p className='du-meldt-på'>
                du melde på ja!!!!1
              </p>
              <button onClick={() => {
                setUserSignedClasses(prevState => {
                  return prevState.splice(prevState.indexOf("norsk"), 1);
                })
              }}>Meld deg på!
                meld AV
              </button>
            </>)}
          </div>
        </div>
        <div className="class-box" onClick={() => handleClassClick('Mat og Helse')}>
          <img src={image3} alt="Mat og Helse" />
          <div className="Class-info-box">
            <h2>Mat og Helse</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at luctus arcu. Pellentesque eu nisl sed
              justo laoreet porta sit amet et risus. Suspendisse sit amet egestas orci. Maecenas consequat, elit in
              tincidunt tristique, augue nunc lacinia nunc, vel aliquet ex urna ut purus. Donec accumsan, augue nec
              tincidunt porttitor, sem ante tincidunt tortor, a sodales erat massa ut ligula. Ut ac felis ac diam ornare
              hendrerit. Nullam lacinia ultricies ex, quis eleifend justo maximus id.
            </p>
            {userSignedClasses.includes("Mat og helse") && (<>
              <p className='du-meldt-på'>
                du melde på ja!!!!1
              </p>
              <button onClick={() => {
                setUserSignedClasses(prevState => {
                  return prevState.splice(prevState.indexOf("Mat og helse"), 1);
                })
              }}>Meld deg på!
                meld AV
              </button>
            </>)}
          </div>
        </div>
        <div className="class-box" onClick={() => handleClassClick('Kroppsøving')}>
          <img src={image4} alt="kroppsøving" />
          <div className="Class-info-box">
            <h2>Kroppsøving</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at luctus arcu. Pellentesque eu nisl sed
              justo laoreet porta sit amet et risus. Suspendisse sit amet egestas orci. Maecenas consequat, elit in
              tincidunt tristique, augue nunc lacinia nunc, vel aliquet ex urna ut purus. Donec accumsan, augue nec
              tincidunt porttitor, sem ante tincidunt tortor, a sodales erat massa ut ligula. Ut ac felis ac diam ornare
              hendrerit. Nullam lacinia ultricies ex, quis eleifend justo maximus id.
            </p>
            {userSignedClasses.includes("Kroppsøving") && (<>
              <p className='du-meldt-på'>
                du melde på ja!!!!1
              </p>
              <button onClick={() => {
                setUserSignedClasses(prevState => {
                  return prevState.splice(prevState.indexOf("Kroppsøving"), 1);
                })
              }}>Meld deg på!
                meld AV
              </button>
            </>)}
          </div>
        </div>
      </div>

      {showLogin && <LoginPopup onClose={() => setShowLogin(false)} onLogin={handleLogin} />}
      {
        showPopup && <ClassPopup classTitle={selectedClass} onClose={closePopup} onSignUp={() => {
          // Update the user's signedClasses
          setUserSignedClasses([...userSignedClasses, selectedClass]);

        }} />
      }
    </div >

  );
}

export default MainPage;
