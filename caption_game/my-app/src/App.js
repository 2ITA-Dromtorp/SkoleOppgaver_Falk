// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import 'Routes' and 'Route'
import TeamSelection from './components/TeamSelection.js';
import GameExplanation from './components/GameExplanation.js';
import GameScreen from './components/GameScreen.js';
import AdminPage from './components/AdminPage.js';
import Vote from './components/Vote.js';

function App() {
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleTeamSelect = (teamNumber) => {
    setSelectedTeam(teamNumber);
  };

  return (
    <Router>
      <Routes> {/* Wrap routes with <Routes> */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/" element={<TeamSelection handleTeamSelect={handleTeamSelect} />} />
        <Route path="/game-explanation" element={<GameExplanation />} />
        <Route path="/game-screen" element={<GameScreen selectedTeam={selectedTeam} />} />
        <Route path="/vote" element={<Vote />} />
      </Routes>
    </Router>
  );
}

export default App;
