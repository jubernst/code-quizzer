var startButton = document.querySelector("#start-btn");
var title = document.querySelector("#title");
var intro = document.querySelector("#intro");
var quizBody = document.querySelector("#quiz-body");
var quizButtons = document.querySelector("#buttons");
var timerEl = document.querySelector("#timer");
var response = document.querySelector("#response");
var highscoreList = document.querySelector("#highscore-list");
var callHighscores = document.querySelector("#hs");

const questions = [
  "What does HTML stand for?",
  "What does CSS stand for?",
  "Which language came first: Java or JavaScript?",
  "What language preceded C?",
];

var answersAll = [
  [
    "Hyper Trainer Marking Language",
    "Hyper Text Marketing Language",
    "Hyper Text Markup Language",
    "Hyper Text Markup Leveler",
  ],
  [
    "Cascading Super Sheet",
    "Cascading Style Sheet",
    "Coding Style Sheet",
    "Coding Style Script",
  ],
  ["Javascript", "Java"],
  ["B", "D", "C-"],
];

var rightAnswer = [
  "Hyper Text Markup Language",
  "Cascading Style Sheet",
  "Java",
  "B",
  //each element is the correct answer for the corresponding question
];

var timeLeft = 60;
var score = 0;
var timeInterval;

// A timer that counts down
function countdown() {
  timeInterval = setInterval(function () {
    timeLeft--;
    score = timeLeft;
    timerEl.textContent = "Time: " + timeLeft;

    // If the timer reaches 0, end the quiz
    if (timeLeft === 0) {
      clearInterval(timeInterval);
      endQuiz();
    }
  }, 1000);
}

function displayHighscores() {
  title.textContent = "Highscores";
  intro.textContent = "";
  response.textContent = "";
  timerEl.textContent = "0";

  // Remove all content in the quiz body
  while (quizBody.firstChild) {
    quizBody.firstChild.remove();
  }

  // Retrieve stored players
  var storedPlayers = JSON.parse(localStorage.getItem("player"));

  // Create and display each score as list items
  // for (var i = 0; i < storedPlayers.length; i++) {
  //var playerI = storedPlayers[i];

  // Issue where only one player is stored at a time. I'm not sure how to correct this issue
  var li = document.createElement("li");
  li.textContent = storedPlayers.initials + " - " + storedPlayers.highscore;

  highscoreList.appendChild(li);
  //}
}

function nextQuestion(x) {
  // Render the current question
  title.textContent = questions[x];

  //Render the buttons
  for (var i = 0; i < answersAll[x].length; i++) {
    var button = document.createElement("button");
    button.textContent = answersAll[x][i];

    button.addEventListener("click", function () {
      // Check if the clicked button is the right answer
      if (this.textContent === rightAnswer[x]) {
        response.textContent = "Correct!";
        // Grab the number of the next question
        var nextX = x + 1;

        // If they are not on the last question, move on. Else, end the quiz
        if (nextX < questions.length) {
          // Remove the buttons
          while (quizButtons.firstChild) {
            quizButtons.removeChild(quizButtons.firstChild);
          }
          // Move on to the next question
          nextQuestion(nextX);
        } else {
          endQuiz();
        }
      } else {
        response.textContent = "Wrong!";
      } // else display "Wrong!" below the questions
    });

    quizButtons.appendChild(button);
  }
}

function endQuiz() {
  //stop the timer
  if (timeLeft > 0) {
    score = timeLeft;
    clearInterval(timeInterval);
  }

  // remove the buttons
  quizButtons.remove();
  //Remove the response text
  response.remove();

  title.textContent = "All done!";
  intro.textContent = "Your score was " + score;

  var tempText = document.createElement("a");
  tempText.textContent = "Enter your initials: ";
  quizBody.appendChild(tempText);

  // Create an input
  var input = document.createElement("input");
  input.setAttribute("type", "text");
  quizBody.appendChild(input);

  // Create a submit button
  var submitBtn = document.createElement("button");
  submitBtn.textContent = "Submit";

  submitBtn.addEventListener("click", function () {
    // Store initials and score in an object
    var player = {
      initials: input.value.trim(),
      highscore: score,
    };

    // Store player highscore
    localStorage.setItem("player", JSON.stringify(player));

    displayHighscores();
  });

  quizBody.appendChild(submitBtn);
}

// Quiz starts when the start button is clicked
startButton.addEventListener("click", function () {
  //THEN smalltext goes away
  intro.textContent = "";
  startButton.remove();

  // Start the timer
  countdown();

  // Start the quiz
  nextQuestion(0);
});

// display highscores when the link is clicked
callHighscores.addEventListener("click", function () {
  displayHighscores();
});
