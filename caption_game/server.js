// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Define a route handler for the root path
app.get('/', (req, res) => {
    res.send('Hello, this is the root of the server!');
});


// Initial array of captions
let captions = [
    { team: 1, captions: [] },
    { team: 2, captions: [] },
    { team: 3, captions: [] },
];

// Endpoint to fetch captions
app.get('/captions', (req, res) => {
    // Send the captions back to the client
    res.json(captions);
});

app.post("/vote-caption", (req, res) => {
    const { caption, team } = req.body
    captions.find(a => a.team === team).captions[caption].votes++
    res.status(200).send("OK!")
})

// Endpoint for submitting captions
app.post('/submit-caption', (req, res) => {
    console.log("womp womp womp womp", req.body)
    const { team, caption } = req.body;
    console.log('Received caption:', caption);
    // Add the received caption to the captions array
    console.log("neger", captions, team)
    captions.find(a => a.team === team).captions.push({
        caption: caption,
        votes: 0,
    });
    // Send back a success message
    res.status(200).json({ message: 'Caption submitted successfully' });
});

// Middleware for handling preflight requests
app.options('*', cors());

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
