const http = require("http");
const express = require("express")

const questions = [
    {
        id: 1,
        question: "What is the capital of France?",
        answer: "paris",
        wrongAnswers: ["nigeria", "oslo", "pakistan"],
    },
    {
        id: 2,
        question: "What is the largest ocean on Earth?",
        answer:"pacific",
        wrongAnswers: ["black sea", "lake", "atlantic"],
    },
    // Add more questions here
];

const app = express();

app.get("/questions", (req, res) => {
    res.status(200).json(questions);
})

app.listen(process.env.PORT || 80, () => {
    console.log("heisann sveisann");
})