// App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import ContactPage from './ContactPage'
import ThemeToggle from './ThemeToggle'; // Import the ThemeToggle component
import { ThemeProvider, useTheme } from './ThemeContext'; // Import the ThemeProvider
import './CSS/App.css';

function ThemeStyler({ children }) {
  const { isDarkTheme, toggleTheme } = useTheme();
  return (
    <div id="zesty-ahh-container" className={`theme-${isDarkTheme ? "dark" : "light"}`}>
      {children}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ThemeStyler>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/classes" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Router>
      </ThemeStyler>
    </ThemeProvider>
  );
}

export default App;
