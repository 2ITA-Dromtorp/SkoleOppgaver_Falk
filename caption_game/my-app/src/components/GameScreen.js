// components/GameScreen.js

import React, { useState } from 'react';
import './GameScreen.css';
import pig from "./img/bigblackoilypig.png"

function GameScreen({ selectedTeam }) {
  const [caption, setCaption] = useState('');

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleSubmitCaption = () => {
    console.log(caption, selectedTeam)
    fetch('http://localhost:5000/submit-caption', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ caption: caption, team: selectedTeam }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Caption submitted successfully');
          // Optionally, you can perform additional actions after successful submission
        } else {
          console.error('Failed to submit caption');
        }
      })
      .catch((error) => {
        console.error('Error submitting caption:', error);
      });
  };

  return (
    <div className = "GameScreen_container">
      <h2>Game Screen</h2>
      <p>Team {selectedTeam}</p>
        <div className = "GameScreen_img">
          <img src= {pig} alt="Game Image" />
        </div>
        <div className = "GameScreen_caption">
          <input
            type="text"
            placeholder="Enter your caption"
            value={caption}
            onChange={handleCaptionChange}/>
          <button onClick={handleSubmitCaption}>Submit Caption</button>
        </div>
    </div>
  );
}

export default GameScreen;
