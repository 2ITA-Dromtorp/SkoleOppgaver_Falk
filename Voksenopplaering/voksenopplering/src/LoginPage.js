// LoginPage.js
import React from 'react';
import { useAuth } from './AuthContext';

function LoginPage() {
  const { login } = useAuth();

  const handleLogin = () => {
    // Perform login logic, and call login() when successful
    login();
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
