let questions = [
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

let startButton = document.getElementById("start");
let feedbackDiv = document.getElementById("feedback");
let initialsInput = document.getElementById("initials");
let timerElement = document.getElementById("time");
let questionTitle = document.getElementById("question-title");
let choicesElement = document.getElementById("choices");
let submitButton = document.getElementById("submit");
let finalScore = document.getElementById("final-score");

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
    let currentQuestion = questions[currentQuestionIndex];
    questionTitle.textContent = currentQuestion.question;
    choicesElement.innerHTML = "";

    for (let i = 0; i < currentQuestion.choices.length; i++) {
      let choiceButton = document.createElement("button");
      choiceButton.textContent = currentQuestion.choices[i];
      choiceButton.addEventListener("click", checkAnswer);
      choicesElement.appendChild(choiceButton);
    }
  } else {
    endQuiz();
  }
}

function checkAnswer(event) {
  let selectedAnswer = event.target.textContent;
  let currentQuestion = questions[currentQuestionIndex];

  if (selectedAnswer === currentQuestion.answer) {
    showFeedback("Correct!", "correct");
  } else {
    showFeedback("Wrong!", "wrong");
    timeLeft -= 10;
  }

  currentQuestionIndex++;
  showQuestion();
}

// Function to display feedback
function showFeedback(message, className) {
  feedbackDiv.textContent = message;
  feedbackDiv.className = "feedback " + className;
  setTimeout(function () {
    feedbackDiv.className = "feedback hide";
  }, 1000);
}

function endQuiz() {
  clearInterval(timerInterval);
  timerElement.textContent = "Time: 0";
  document.getElementById("questions").classList.add("hide");
  document.getElementById("end-screen").classList.remove("hide");
  document.getElementById("final-score").textContent = timeLeft;

  //Function to handle form submission
  submitButton.addEventListener("click", function () {
    let initials = initialsInput.value.trim();
    let currentScore = Number(finalScore.innerText.trim());
    console.log("score is", currentScore);

    if (initials !== "") {
      // Save high score and initials to local storage
      var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

      if (!highscores[initials] || highscores[initials] < currentScore) {
        highscores[initials] = currentScore;
      }
      localStorage.setItem("highscores", JSON.stringify(highscores));
      // Redirect to highscores page
      window.location.href = "highscores.html";
    }
  });
}

// Add this function to clear high scores
function clearHighscores() {
  highscores.length = 0;
  localStorage.setItem("highscores", JSON.stringify(highscores));
  displayHighscores();
}
