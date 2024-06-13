// server.js

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ballil',
    port: 3307
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.get('/all', (req, res) => {
    const query = 'SELECT * FROM members';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        db.query('SELECT * FROM tournaments', function (terror, tresults) {
            if (terror) throw terror;
            res.status(200).send({ "members": results, "tournaments": tresults });
        });
    });
});

app.post('/api/members', (req, res) => {
    const member = req.body;
    const query = 'INSERT INTO members (name, age, sport, contact) VALUES (?, ?, ?, ?)';
    db.query(query, [member.name, member.age, member.sport, member.contact], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send({ id: result.insertId, ...member });
    });
});

// Opprett ny endpoint for å opprette turneringer
app.post('/api/tournaments', (req, res) => {
    const tournament = req.body;
    const query = 'INSERT INTO tournaments (sport, date, location) VALUES (?, ?, ?)';
    db.query(query, [tournament.sport, tournament.date, tournament.location], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send({ id: result.insertId, ...tournament });
    });
});

app.get('/api/tournaments', (req, res) => {
    const query = 'SELECT * FROM tournaments';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(results);
    });
});

app.get('/api/members', (req, res) => {
    const query = 'SELECT * FROM members';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(results);
    });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            const user = results[0];
            bcrypt.compare(password, user.password_hash, (err, result) => {
                if (result) {
                    req.session.user = user;
                    res.json({ message: 'Login successful', user, success: true, token: jwt.sign({ username }, 'dkjfbgiji37998734HLJGBHGJ87987') });
                } else {
                    res.status(401).json({ message: 'Invalid credentials' });
                }
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    const query = 'INSERT INTO users (username, password_hash) VALUES (?, ?)';
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).send(err);
        }
        db.query(query, [username, hash], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(201).send({ id: result.insertId, username });
        });
    })
});

app.get('/api/profile', (req, res) => {
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
    const token = authToken.split(' ')[1];
    jwt.verify(token, 'dkjfbgiji37998734HLJGBHGJ87987', (err, user) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized' });
        }
        res.send({ user });
    });
});


app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
