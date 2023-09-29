// src/components/Game.js

import React, { useState } from "react";
import "./App.css";
import spiller_papir from './images/spiller_papir.png'
import spiller_saks from './images/spiller_saks.png'
import spiller_stein from './images/spiller_stein.png'
import maskin_saks from './images/maskin_saks.png'
import maskin_papir from './images/maskin_papir.png'
import maskin_stein from './images/maskin_stein.png'
import maskin_ukjent from './images/maskin_ukjent.png'

const options = ["stein", "papir", "saks"];
const images = {
  maskin_stein: maskin_stein,
  maskin_papir: maskin_papir,
  maskin_saks: maskin_saks,
  maskin_ukjent: maskin_ukjent,
  spiller_stein: spiller_stein,
  spiller_papir: spiller_papir,
  spiller_saks: spiller_saks, 
};

const Game = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);

  const computerSelects = () => {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  };

  const handlePlayerChoice = (choice) => {
    const computer = computerSelects();
    setPlayerChoice(choice);
    setComputerChoice(computer);
    determineWinner(choice, computer);
  };

  const determineWinner = (player, computer) => {
    if (player === computer) {
      setResult("It's a tie!");
    } else if (
      (player === "stein" && computer === "saks") ||
      (player === "papir" && computer === "stein") ||
      (player === "saks" && computer === "papir")
    ) {
      setResult("You win!");
    } else {
      setResult("Computer wins!");
    }
  };

  return (
    <div className="game">
      <h1>Rock, Paper, Scissors</h1>
      <div className="choices">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handlePlayerChoice(option)}
            disabled={playerChoice !== null}
          >
            <img src={`/${option}.png`} alt={option} />
          </button>
        ))}
      </div>
      {playerChoice !== "ukjent" && computerChoice !== "ukjent" && (
      <div className="results">
        <p>Your choice:</p>
          <img src={images[`spiller_${playerChoice}`]} alt={playerChoice} />
        <p>Computer's choice:</p>
         <img src={images[`maskin_${computerChoice}`]} alt={computerChoice} />
        <p>{result}</p>
          <button onClick={() => window.location.reload()}>Play Again</button>
      </div>
    )}

    </div>
  );
};

export default Game;
