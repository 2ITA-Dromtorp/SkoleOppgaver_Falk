// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

app.get('/api/data', (req, res) => {
  // Handle GET request logic here
  res.json({ message: 'GET request handled' });
});

app.post('/api/data', (req, res) => {
  // Handle POST request logic here
  const data = req.body;
  res.json({ message: 'POST request handled', data });
});

app.put('/api/data/:id', (req, res) => {
  // Handle PUT request logic here
  const id = req.params.id;
  const data = req.body;
  res.json({ message: `PUT request handled for id ${id}`, data });
});

app.delete('/api/data/:id', (req, res) => {
  // Handle DELETE request logic here
  const id = req.params.id;
  res.json({ message: `DELETE request handled for id ${id}` });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
