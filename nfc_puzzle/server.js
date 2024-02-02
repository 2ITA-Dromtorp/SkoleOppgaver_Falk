//server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Define your puzzle questions and answers
const questions = [
    { id: 1, question: "What is the capital of France?", answer: "Paris" },
    { id: 2, question: "What is the largest ocean on Earth?", answer: "Pacific" },
    // Add more questions here
];

// Current question index to keep track of the user's progress
let currentQuestionIndex = 0;

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to serve a specific question
app.get('/question', (req, res) => {
    res.status(200).json(questions);
    //🍌
});

// Route to check answer
// Route to check answer
app.post('/answer', express.json(), (req, res) => {
    // Receive answer from client and check if it's correct
    const { id, answer } = req.body;
    const question = questions.find(q => q.id === id);
    if (!question) {
        res.status(404).json({ error: 'Question not found' });
    } else {
        const isCorrect = question.answer.toLowerCase() === answer.toLowerCase(); // Make comparison case-insensitive
        if (isCorrect) {
            // If the answer is correct, increment the question index
            currentQuestionIndex++;
            // Check if the next question exists
            if (currentQuestionIndex < questions.length) {
                res.json({ correct: true, nextQuestionId: questions[currentQuestionIndex].id });
            } else {
                res.json({ correct: true, nextQuestionId: null }); // No more questions
            }
        } else {
            res.json({ correct: false });
        }
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
