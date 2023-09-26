import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      secretNumber: this.generateRandomNumber(0, 50),
      guess: '',
      message: '',
    };
  }

  generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  handleGuessChange = (event) => {
    this.setState({ guess: event.target.value });
  };

  handleGuessSubmit = () => {
    const { secretNumber, guess } = this.state;

    if (guess === '') {
      this.setState({ message: 'Skriv inn et tall.' });
    } else {
      const guessNumber = parseInt(guess, 10);

      if (guessNumber === secretNumber) {
        this.setState({ message: 'Gratulerer! Du har gjettet riktig.' });
      } else if (guessNumber < secretNumber) {
        this.setState({ message: 'Tallet er for lavt. Prøv igjen.' });
      } else {
        this.setState({ message: 'Tallet er for høyt. Prøv igjen.' });
      }
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Number Guessing Game</h1>
        <p>Jeg tenker på et tall mellom 0 og 50. Gjett tallet:</p>
        <input
          type="number"
          value={this.state.guess}
          onChange={this.handleGuessChange}
        />
        <button onClick={this.handleGuessSubmit}>Gjett</button>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default App;
