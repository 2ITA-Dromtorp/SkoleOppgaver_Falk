// src/App.js
import React from 'react';
import axios from 'axios';

function App() {
  const handleRequest = async (method) => {
    try {
      let response;
      if (method === 'GET') {
        response = await axios.get('http://localhost:3001/api/data');
      } else if (method === 'POST') {
        response = await axios.post('http://localhost:3001/api/data', { message: 'Hello from POST' });
      } else if (method === 'PUT') {
        response = await axios.put('http://localhost:3001/api/data/1', { message: 'Hello from PUT' });
      } else if (method === 'DELETE') {
        response = await axios.delete('http://localhost:3001/api/data/1');
      }

      console.log(response.data.message);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <nav>
        <button onClick={() => handleRequest('GET')}>Select</button>
        <button onClick={() => handleRequest('PUT')}>Update</button>
        <button onClick={() => handleRequest('POST')}>Insert</button>
        <button onClick={() => handleRequest('DELETE')}>Delete</button>
      </nav>
    </div>
  );
}

export default App;
