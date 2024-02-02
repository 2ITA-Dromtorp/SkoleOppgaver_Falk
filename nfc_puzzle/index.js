let questions;
let currentQuestion
fetchQuestion();
// index.js
let currentQuestionIndex = 0; // Define it globally at the top of your index.js file
// Add event listener to the submit button
document.getElementById('submit').addEventListener('click', submitAnswer);

function updateQuestion() {
    currentQuestion = questions[currentQuestionIndex];
    updateQuestionCounter(currentQuestionIndex + 1);
    document.getElementById('question-container').innerHTML = `<p>${currentQuestion.question}</p>`;
    updateQuestionCounter(data.id);
}

// Function to fetch a question from the server
function fetchQuestion() {
    fetch('/question')
        .then(response => response.json())
        .then(data => {
            questions = data;
            updateQuestion();
        })
        .catch(error => console.error('Error fetching question:', error));
}

// Function to handle answer submission
//index.js
// Function to handle answer submission
// Function to handle answer submission
function submitAnswer() {
    const answer = document.getElementById('answer').value;

    fetch('/answer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: currentQuestionIndex + 1, answer }) // Update the question ID accordingly
    })
        .then(response => response.json())
        .then(data => {
            if (data.correct) {
                if (currentQuestionIndex === questions.length - 1) {
                    document.querySelector("#completion-popup > .message").innerText = "omg du fikk alle riktig jeg vet at du brukte chatgpt din jævel😡😡😡😡🍌"
                    document.getElementById("completion-popup").style.display = "block";
                } else {
                    console.log("falk er et lite barn som like andre små barn");
                }
                currentQuestionIndex += 1;
                updateQuestion()
            } else {
                document.querySelector("#completion-popup > .message").innerText = "elsk deg selv😍😍🤯🤯🤯😘😘💕💕😁😁❤️❤️😎😎"
                document.getElementById("completion-popup").style.display = "block";
            }
        })
        .catch(error => console.error('Error submitting answer:', error));
}


// Function to update the question counter
function updateQuestionCounter(questionId) {
    const questionCounter = document.getElementById('question-counter');
    questionCounter.textContent = `Question ${questionId}`;
}

// Fetch the first question when the page loads



function restartQuiz() {
    window.location.reload();
}