// components/TeamSelection.js

import React from 'react';
import { Link } from 'react-router-dom';
import './TeamSelection.css';

function TeamSelection({ handleTeamSelect }) {
  return (
    <div className="team-selection">
      <h2>Choose Your Team</h2>
      <Link to="/game-explanation">
        <button className ="Team" onClick={() => handleTeamSelect(1)}>Team 1</button>
      </Link>
      <Link to="/game-explanation">
        <button className ="Team" onClick={() => handleTeamSelect(2)}>Team 2</button>
      </Link>
      <Link to="/game-explanation">
        <button className ="Team" onClick={() => handleTeamSelect(3)}>Team 3</button>
      </Link>
      <Link to="/vote">
        <button className="stem">Stem her!</button>
      </Link>
      {/* Add a link to the admin page route */}
      <Link to="/admin">
        <button className ="admin">Admin Page</button>
      </Link>
    </div>
  );
}

export default TeamSelection;
