import React, { useState } from 'react';

const AuthForm = ({ endpoint, buttonText }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log(`${endpoint} successful`);
        // Handle successful login or registration
      } else {
        console.error(`${endpoint} failed`);
        // Handle failed login or registration
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>{endpoint === 'register' ? 'Register' : 'Login'}</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleAuth}>{buttonText}</button>
    </div>
  );
};

export default AuthForm;
