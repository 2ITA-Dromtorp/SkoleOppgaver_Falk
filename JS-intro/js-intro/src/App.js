// src/components/Game.js

import React, { useState } from "react";

const options = ["rock", "paper", "scissors"];

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
      (player === "rock" && computer === "scissors") ||
      (player === "paper" && computer === "rock") ||
      (player === "scissors" && computer === "paper")
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
            {option}
          </button>
        ))}
      </div>
      {playerChoice && computerChoice && (
        <div className="results">
          <p>Your choice: {playerChoice}</p>
          <p>Computer's choice: {computerChoice}</p>
          <p>{result}</p>
          <button onClick={() => window.location.reload()}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default Game;
