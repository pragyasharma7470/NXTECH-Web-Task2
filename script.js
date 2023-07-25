const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');
// Make an array of objects that stores question,choices of question and answer
const quiz = [{
        question: "Q. Inside which HTML element do we put the JavaScript?",
        choices: ["JavaScript", "<js>", "<script>", "<scripting>"],
        answer: "<script>"
    }

    ,
    {
        question: "Q. Where is the correct place to insert a JavaScript?",
        choices: ["The <head> section", "Both the <head> section and the <body> section are correct section", "The <body> section", "Both (a) and (c)"],
        answer: "Both the <head> section and the <body> section are correct section"
    }

    ,
    {
        question: "Q. The external JavaScript file must contain the <script> tag?",
        choices: ["False", "True", "Both (a) and (b)", "All of these"],
        answer: "False"
    }

    ,
    {
        question: "Q. How do you create a function in JavaScript?",
        choices: ["function= myFunction()", "function: myFunction()", "function myFunction()", "function.myFunction()"],
        answer: "function myFunction()"
    }

    ,
    {
        question: "Q. Which event occurs when the user clicks on a HTML element?",
        choices: ["onmouseclick", "onmouseover", "onclick", "onchange"],
        answer: "onclick"
    }

    ,
];
// Making Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerId = null;
// Arrow Function to show Questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;
    choicesBox.textContent = "";
    for (i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);
        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            } else {
                choiceDiv.classList.add('selected');
            }
        });
    }
    if (currentQuestionIndex < quiz.length) {
        startTimer();
    }
}

// Function to check answer
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        // alert("Correct Answer!");
        displayAlert("Correct Answer!");
        score++;
    } else {
        // alert("Wrong Answer!");
        displayAlert('Wrong Answer!!' + ' ' + quiz[currentQuestionIndex].answer + ' ' + 'is the correct Answer ');
    }
    timeLeft = 15;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    } else {
        showScore();
        stopTimer();
    }
}

// Function to show score  
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = ('Your Scored' + ' ' + score + ' ' + 'out of' + ' ' + quiz.length);
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}

// Function to show Alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(() => {
        alert.style.display = "none";
    }, 2000);
}

// Function  to start timer
const startTimer = () => {
    clearInterval(timerId); //Check for any exist timers
    timer.textContent = timeLeft;
    const countDown = () => {
        timeLeft--;
        timer.textContent = timeLeft;
        if (timeLeft === 0) {
            const confirmUser = confirm("Time Up!!!  Do you want to play the quiz again");
            if (confirmUser) {
                timeLeft = 15;
                startQuiz();
            } else {
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerId = setInterval(countDown, 1000);
}

// Function to stop timer{}
const stopTimer = () => {
    clearInterval(timerId);
}

// Function to shuffle question
const shuffleQuestions = () => {
    for (let i = quiz.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quiz[i],
            quiz[j]
        ] = [quiz[j],
            quiz[i]
        ];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// Function to start quiz 
const startQuiz = () => {
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestions();
}

// Adding Event Listener to Start Button 
startBtn.addEventListener('click', () => {
        startBtn.style.display = "none";
        container.style.display = "block";
        startQuiz();
    }

);
nextBtn.addEventListener('click', () => {
        const selectedChoice = document.querySelector('.choice.selected');
        if (!selectedChoice && nextBtn.textContent === "Next") {
            // alert("Select your answer");
            displayAlert("Selected your answer");
            return;
        }
        if (quizOver) {
            nextBtn.textContent = "Next";
            scoreCard.textContent = "";
            currentQuestionIndex = 0;
            quizOver = false;
            score = 0;
            startQuiz();
        } else {
            checkAnswer();
        }
    }

);