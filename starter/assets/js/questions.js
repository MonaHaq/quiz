const questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choices: ["<script>", "<js>", "<javascript>", "<scripting>"],
    answer: "<script>",
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    choices: [
      "Both the <head> and <body> sections are correct",
      "The <body> section",
      "The <head> section",
    ],
    answer: "Both the <head> and <body> sections are correct",
  },
  {
    question: "How do you create a function in JavaScript?",
    choices: [
      "function=myFunction()",
      "function myFunction()",
      "function: myFunction()",
    ],
    answer: "function=myFunction()",
  },
];

const startButton = document.getElementById("start");
const timerElement = document.getElementById("time");
const questionTitle = document.getElementById("question-title");
const choicesElement = document.getElementById("choices");

let currentQuestionIndex = 0;
let timeLeft = 76;
let timerInterval;

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  startButton.style.display = "none";
  document.getElementById("start-screen").classList.add("hide");
  document.getElementById("questions").classList.remove("hide");
  startTimer();
  showQuestion();
}

function startTimer() {
  timerInterval = setInterval(function () {
    timeLeft--;
    timerElement.textContent = "Time: " + timeLeft;

    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

function showQuestion() {
  if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    questionTitle.textContent = currentQuestion.question;
    choicesElement.innerHTML = "";

    for (let i = 0; i < currentQuestion.choices.length; i++) {
      const choiceButton = document.createElement("button");
      choiceButton.textContent = currentQuestion.choices[i];
      choiceButton.addEventListener("click", checkAnswer);
      choicesElement.appendChild(choiceButton);
    }
  } else {
    endQuiz();
  }
}

function checkAnswer(event) {
  const selectedAnswer = event.target.textContent;
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedAnswer === currentQuestion.answer) {
    // Handle correct answer logic here
  } else {
    timeLeft -= 10;
  }

  currentQuestionIndex++;
  showQuestion();
}

function endQuiz() {
  clearInterval(timerInterval);
  timerElement.textContent = "Time: 0";
  document.getElementById("questions").classList.add("hide");
  document.getElementById("end-screen").classList.remove("hide");
  document.getElementById("final-score").textContent = timeLeft;
}
