// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './CSS/App.css';
import MainPage from './MainPage';
import SignupPage from './SignupPage';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/classes" element={<SignupPage />} />
            <Route path="/" element={<MainPage />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
