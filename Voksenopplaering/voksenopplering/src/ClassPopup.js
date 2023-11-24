// ClassPopup.js
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './CSS/ClassPopup.css'; // Import the CSS file for styling
import image1 from './Pictures/grunnleggendedatakunnskap.png'
import image2 from './Pictures/Norsk.png'
import image3 from './Pictures/gym.png'
import image4 from './Pictures/matoghelse.png'

function ClassPopup({ classTitle, onClose }) {
  // Reference to the popup content div
  const popupContentRef = useRef(null);

  // Close the popup if clicked outside of it
  const handleOutsideClick = (event) => {
    if (popupContentRef.current && !popupContentRef.current.contains(event.target)) {
      onClose();
    }
  };

  // Add event listener to close on outside click
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  // Define class information dynamically based on the selected class
  const classInfo = {
    'grunnleggende datakunnskap': {
      image: image1,
      header: 'Grunnleggende Datakunnskap',
      description: 'Your description for Grunnleggende Datakunnskap.',
      link: '/classes',
    },
    'norsk': {
      image: image2,
      header: 'Norsk',
      description: 'Your description for Norsk.',
      link: '/classes',
    },
    'Mat og Helse': {
      image: image3,
      header: 'Mat og Helse',
      description: 'Your description for Mat og Helse.',
      link: '/classes',
    },
    'Kroppsøving': {
      image: image4,
      header: 'Kroppsøving',
      description: 'Your description for Kroppsøving.',
      link: '/classes',
    },
  };

  const currentClassInfo = classInfo[classTitle];

  return (
    <div className="class-popup">
      <div className="popup-content" ref={popupContentRef}>
        {/* Close button */}
        <button className="close-button" onClick={onClose}>
          X
        </button>

        {/* Class information */}
        <div className="class-info">
          <img src={currentClassInfo.image} alt="Class" className="class-image" />
          <h2>{currentClassInfo.header}</h2>
          <p>{currentClassInfo.description}</p>
          <a href={currentClassInfo.link}>Go to Classes</a>
        </div>
      </div>
    </div>
  );
}

ClassPopup.propTypes = {
  classTitle: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ClassPopup;
