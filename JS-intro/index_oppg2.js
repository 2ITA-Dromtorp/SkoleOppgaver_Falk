import React, { useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [result, setResult] = useState('');

  const calculateArea = () => {
    const lengthValue = parseFloat(length);
    const widthValue = parseFloat(width);

    if (isNaN(lengthValue) || isNaN(widthValue)) {
      setResult("Please enter valid numbers.");
    } else {
      const rectangleArea = lengthValue * widthValue;
      const triangleArea = (lengthValue * widthValue) / 2;

      setResult(`Area of Rectangle: ${rectangleArea}, Area of Triangle: ${triangleArea}`);
    }
  };

  return (
    <div className="App">
      <h1>Area Calculator</h1>
      <div className="calculator">
        <h2>Calculate Area</h2>
        <label htmlFor="length">Length:</label>
        <input
          type="number"
          id="length"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
        <label htmlFor="width">Width:</label>
        <input
          type="number"
          id="width"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />
        <button onClick={calculateArea}>Calculate</button>
        <p id="result">{result}</p>
      </div>
    </div>
  );
}

export default App;
