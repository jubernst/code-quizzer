var startButton = document.querySelector("#start-btn");
var title = document.querySelector("#title");
var quizBody = document.querySelector("#quiz-body");
var quizButtons = document.querySelector("#buttons");
var intro = document.querySelector("#intro");
var timerEl = document.querySelector("#timer");

const questions = ["A", "B"];

var answersAll = [
  ["a", "b", "c", "d"],
  ["e", "f", "g", "h"],
  //add answers for each question
];
var rightAnswer = [
  "a",
  "e",
  //each element is the correct answer for that question
];

var score = 0;
var timeInterval;
var timeLeft = 60;

function countdown() {
  timeInterval = setInterval(function () {
    timeLeft--;
    score = timeLeft;
    timerEl.textContent = "Time: " + timeLeft;

    if (timeLeft === 0) {
      clearInterval(timeInterval);
      endQuiz();
    }
  }, 1000);
}

function nextQuestion(x) {
  // Render the current question
  title.textContent = questions[x];

  //Render the buttons
  for (var i = 0; i < answersAll[x].length; i++) {
    var button = document.createElement("button");
    button.textContent = answersAll[x][i];

    button.addEventListener("click", function () {
      // maybe use this??? idk bro but right now all buttons are telling me WRONG
      // When this button is clicked
      // Check if this is the right answer
      if (this.textContent === rightAnswer[x]) {
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
        console.log("Wrong!");
      } // else display "Wrong!" below the questions
    });

    quizButtons.appendChild(button);
  }
}

function displayHighscores() {
  top.textContent = "Highscores";

  var storedScores = JSON.parse(localStorage.getItem("player"));

  // Create a display each recorded score as list items
  for (var i = 0; i < storedScores.length; i++) {
    var playerLi = storedScores[i];

    var li = document.createElement("li");
    li.textContent = playerLi.initials + " " + playerLi.highscore;

    quizBody.appendChild(li);
  }
}

function endQuiz() {
  //stop the timer
  if (timeLeft > 0) {
    score = timeLeft;
    clearInterval(timeInterval);
  }

  title.textContent = "All done!";
  intro.textContent = "Your score was " + score;
  quizButtons.remove(); //remove the buttons

  quizBody.textContent = "Enter your initials:";

  // create an input
  var input = document.createElement("input");
  input.setAttribute("type", "text");
  quizBody.appendChild(input);

  // create a submit button
  var submitBtn = document.createElement("button");
  submitBtn.textContent = "Submit";
  quizBody.appendChild(submitBtn);

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
