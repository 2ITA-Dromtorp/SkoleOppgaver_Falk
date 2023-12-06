// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import ContactPage from './ContactPage';
import ThemeToggle from './ThemeToggle';
import { ThemeProvider, useTheme } from './ThemeContext';
import AuthForm from './AuthForm'; // Import the AuthForm component
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
            {/* Use AuthForm for registration and login */}
            <Route path="/register" element={<AuthForm endpoint="register" buttonText="Register" />} />
            <Route path="/login" element={<AuthForm endpoint="login" buttonText="Login" />} />
          </Routes>
        </Router>
      </ThemeStyler>
    </ThemeProvider>
  );
}

export default App;
