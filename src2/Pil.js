import React, { useState, useEffect } from 'react';
import arrowup from './images/arrow_up.png';
import arrowdown from './images/arrow_down.png';
import ConfettiExplosion from 'react-confetti-explosion';

export default function Pil() {
  const [count, setCount] = useState(5);
  const [timerRunning, setTimerRunning] = useState(false);
  const [isExploding, setIsExploding] = useState(false);

  useEffect(() => {
    let timer;

    if (timerRunning && count > 0) {
      timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    }

    
    
    if (count === 0) {
      setIsExploding(true);
    }

    return () => {
      clearInterval(timer);
    };
  }, [count, timerRunning]);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const startTimer = () => {
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  return (
    <div className='box'>
      <button className="arrow-button" onClick={handleIncrement}>
        <img src={arrowup} alt="arrow up" />
      </button>
      <p>{count} seconds</p>
      <button className="arrow-button" onClick={handleDecrement}>
        <img src={arrowdown} alt="arrow down" />
      </button>
      <button className="start-button" onClick={startTimer}>
        Start
      </button>
      <button className="stop-button" onClick={stopTimer}>
        Stop
      </button>

      {isExploding && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}>
          <ConfettiExplosion />
        </div>
      )}
    </div>
  );
}
