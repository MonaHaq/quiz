document.addEventListener("DOMContentLoaded", function () {
  var highscoresList = document.getElementById("highscores");
  var clearButton = document.getElementById("clear");

  // Load and display high scores from local storage
  var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

  // Sort the highscores by score in descending order
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  if (highscores.length > 0) {
    // Display only the highest score and initials
    var highestScore = highscores[0];
    var listItem = document.createElement("li");
    listItem.textContent = highestScore.initials + " - " + highestScore.score;
    highscoresList.appendChild(listItem);
  } else {
    highscoresList.textContent = "No high scores available.";
  }

  // Clear high scores
  clearButton.addEventListener("click", function () {
    localStorage.removeItem("highscores");
    highscoresList.innerHTML = ""; // Clear the displayed list
  });
});
