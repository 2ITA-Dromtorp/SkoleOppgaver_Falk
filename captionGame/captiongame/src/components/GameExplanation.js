// components/GameExplanation.js

import React from 'react';
import { Link } from 'react-router-dom';
import './GameExplanation.css';

function GameExplanation() {
  return (
    <div className = "GameExplanation_container">
      <h2>Game Explanation</h2>
      <p>Explain the rules of the game here.</p>
      <Link to="/game-screen">
        <button>Start Game</button>
      </Link>
    </div>
  );
}

export default GameExplanation;
