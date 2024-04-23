const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

function generateSalt() {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let salt = '';
    for (let i = 0; i < 16; i++) {
        salt += characters[Math.floor(Math.random() * characters.length)];
    }
    return salt;
}

function customHash(password, salt, iterations = 10000000) {
    let hashedString = password + salt;

    for (let i = 0; i < iterations; i++) {
        let hash = 0;
        for (let j = 0; j < hashedString.length; j++) {
            hash = (hash << 5) - hash + hashedString.charCodeAt(j);
            hash |= 0; // Convert to 32bit integer
        }
        hashedString = String(hash);
    }

    return hashedString;
}

let salt;
let hashedPassword;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.send('Velkommen til passordverifikasjonsserveren!');
});

app.post('/hash-password', (req, res) => {
    const password = req.body.password;
    salt = generateSalt();
    hashedPassword = customHash(password, salt);
    const responseMessage = `Passordet har blitt hashet og lagret som: ${hashedPassword}`;
    res.send(responseMessage);
});

app.post('/verify-password', (req, res) => {
    const inputPassword = req.body.password;
    if (customHash(inputPassword, salt) === hashedPassword) {
        res.send("Riktig passord!");
    } else {
        res.send("Feil passord!");
    }
});

app.listen(port, () => {
    console.log(`Serveren kjører på http://localhost:${port}`);
});
