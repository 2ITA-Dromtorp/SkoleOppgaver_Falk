const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = 5000;

mongoose.connect('mongodb://localhost:27017/your_database', { useNewUrlParser: true, useUnifiedTopology: true });
const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  password: String,
}));

app.use(express.json());

// Your authentication routes will go here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
