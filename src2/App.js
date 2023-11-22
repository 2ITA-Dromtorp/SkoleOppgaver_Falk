import React, { useState } from 'react';
import './App.css';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function App() {
  const initialNames = [
    'Martin', 'Mathias', 'Kevin', 'Andreas',
    'Falk', 'Sander', 'Ylva', 'Vanessa', 'Chen',
    'Fridtjof', 'Luz'
  ];

  const [names, setNames] = useState(initialNames);

  const handleRandomize = () => {
    setNames(shuffleArray([...names]));
  };

  return (
    <div className='container'>

      <div className='learer'>
        <div className='person'>
          Lærer
        </div>
      </div>

      <div className='forste_rad'>
        {names.slice(0, 4).map((name, index) => (
          <div key={index} className='person'>
            {name}
          </div>
        ))}
      </div>

      <div className='andre_rad'>
        {names.slice(4, 9).map((name, index) => (
          <div key={index} className='person'>
            {name}
          </div>
        ))}
      </div>

      <div className='tredje_rad'>
        {names.slice(9).map((name, index) => (
          <div key={index} className='person'>
            {name}
          </div>
        ))}
      </div>

      <button onClick={handleRandomize}>Randomize Names</button>
    </div>
  );
}

export default App;
