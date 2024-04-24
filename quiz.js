// Get the necessary elements
const quizForm = document.getElementById('quiz-form');
const quizQuestion = document.getElementById('quiz-question');
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-button');
const scores = document.getElementById('scores');
const resetButton = document.getElementById('reset-button');

// Function to generate random addition math questions
function generateMathQuestions() {
    const mathQuestions = [];

    for (let i = 0; i < 10; i++) {
        const num1 = Math.floor(Math.random() * 100);
        const num2 = Math.floor(Math.random() * 100);
        const answer = num1 + num2;

        const question = num1 + ' + ' + num2 + ' = ?';

        mathQuestions[i]= { question, answer };
    }

    return mathQuestions;
}

let mathQuestions = generateMathQuestions();
let currentQuestionIndex = 0;
let score = 0;

// Function to display the current question
function displayQuestion() {
    quizQuestion.textContent = mathQuestions[currentQuestionIndex].question;
}

// Function to check the answer and update the score
function checkAnswer() {
    const userAnswer = answerInput.value;
    const correctAnswer = mathQuestions[currentQuestionIndex].answer;

    if (userAnswer === correctAnswer.toString()) {
        score++;
    }

    answerInput.value = '';
    currentQuestionIndex++;

    if (currentQuestionIndex < mathQuestions.length) {
        displayQuestion();
    } else {
        // Quiz is finished, display the final score
        scores.textContent = `Your final score is: ${score} out of 10`;
        submitButton.disabled = true;
    }
}

// Event listener for form submission
quizForm.addEventListener('submit', function (event) {
    event.preventDefault();
    checkAnswer();
});

// Event listener for reset button
resetButton.addEventListener('click', function () {
    mathQuestions = generateMathQuestions();
    currentQuestionIndex = 0;
    score = 0;
    scores.textContent = '';
    submitButton.disabled = false;
    displayQuestion();
});

// Display the first question
displayQuestion();