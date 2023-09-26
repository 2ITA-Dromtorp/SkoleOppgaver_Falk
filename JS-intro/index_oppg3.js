import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');

  const checkNationality = () => {
    const lowercaseInput = inputValue.toLowerCase();

    if (lowercaseInput === 'hei') {
      setResult('Du er norsk.');
    } else if (lowercaseInput === 'hej') {
      setResult('Du er svensk.');
    } else if (lowercaseInput === 'hello') {
      setResult('Du er engelsk.');
    } else {
      setResult('Du er verken norsk eller svensk eller engelsk.');
    }
  };

  return (
    <div className="App">
      <h1>Er du norsk eller svensk?</h1>
      <p>Skriv inn hvordan du sier hei  på ditt språk:</p>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={checkNationality}>Sjekk</button>
      <p>{result}</p>
    </div>
  );
}

export default App;
