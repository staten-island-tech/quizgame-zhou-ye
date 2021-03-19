// QUESTION CONSTRUCTOR
function Question(text, choices, answer) {
  this.text = text; // string
  this.choices = choices; // array
  this.answer = answer; // string
}
Question.prototype.isCorrect = function (choice) {
  // Return TRUE if choice matches correct answer
  return this.answer === choice;
};

// QUIZ CONSTRUCTOR
function Quiz(questions) {
  // Array of questions
  this.questions = questions;
  // Track which question you're on, starting with the first question
  this.currentQuestionIndex = 0;
  this.score = 0; // Score keeper
}
Quiz.prototype.getCurrentQuestion = function () {
  return this.questions[this.currentQuestionIndex];
};
Quiz.prototype.checkAnswer = function (answer) {
  if (this.getCurrentQuestion().isCorrect(answer)) {
    this.score++; // Add 1 point if correct
  }
  this.currentQuestionIndex++; // Get ready for next question
};
// Check if quiz end is reached
Quiz.prototype.hasEnded = function () {
  // Return TRUE only after last question
  return this.currentQuestionIndex >= this.questions.length;
};

// QUIZ UI
const QuizUI = {
  displayNext: function () {
    if (quiz.hasEnded()) {
      this.showResults();
    } else {
      this.displayQuestion();
      this.displayChoices();
      this.displayProgress();
      this.displayScore();
    }
  },
  displayQuestion: function () {
    this.populateIdWithHTML("question", quiz.getCurrentQuestion().text);
  },
  displayChoices: function () {
    let choices = quiz.getCurrentQuestion().choices;
    // Loop through each choice and display on page
    for (var i = 0; i < choices.length; i++) {
      let choiceId = "choice" + i;
      let choiceText = choices[i];
      this.populateIdWithHTML(choiceId, choiceText);
      this.checkAnswerHandler(choiceId, choiceText);
    }
  },
  checkAnswerHandler: function (id, guess) {
    const button = document.getElementById(id);
    button.onclick = function () {
      quiz.checkAnswer(guess);
      QuizUI.displayNext();
    };
  },
  displayScore: function () {
    const scoreText = "Score: " + quiz.score;
    this.populateIdWithHTML("score", scoreText);
  },
  displayProgress: function () {
    const questionNumber = quiz.currentQuestionIndex + 1;
    const totalQuestions = quiz.questions.length;
    const progressText = "Question " + questionNumber + " of " + totalQuestions;
    this.populateIdWithHTML("progress", progressText);
  },
  showResults: function () {
    const grade = quiz.score / quiz.questions.length;
    let results = "<h2>";
    if (grade >= 0.8) {
      results += "You're a real Seagull - Cawcaw!";
    } else if (grade < 0.8 && grade > 0.5) {
      results += "You are half-seagull";
    } else {
      results += "Incompetent smh";
    }
    results += "</h2><h3>Your final score is: " + quiz.score + "</h3>";
    results += '<button id="reset">Try Again?</button>';
    this.populateIdWithHTML("quiz", results);
    this.resetQuizHandler();
  },
  resetQuizHandler: function () {
    const resetBtn = document.getElementById("reset");
    // Reload quiz to start from beginning
    resetBtn.onclick = function () {
      window.location.reload(false);
    };
  },
  populateIdWithHTML: function (id, content) {
    const element = document.getElementById(id);
    element.innerHTML = content;
  },
};

// Hover effect - move button down
//var hoverBtn = document.getElementByTagName('button');
//hoverBtn.onmouseover = function() {
//	this.style['margin-top'] = '25px';
//}

// CREATE QUESTIONS
const questions = [
  new Question(
    "Which girls sports team is the most iconic?",
    ["Bowling", "Track", "Golf"],
    "Bowling"
  ),
  new Question(
    "Which one of the following bald teachers has a middle name that starts with 'I' ?",
    ["Whalen", "Henriques", "Frusci"],
    "Henriques"
  ),
  new Question(
    "The last dean at Tech was also the _____",
    [
      "Coach of the girl's bowling team",
      "Coach of the boy's handball team",
      "Andrew Jackson",
    ],
    "Coach of the girl's bowling team"
  ),
  new Question(
    "Where is the best boba near Tech?",
    ["Vivi's", "Something Sweet", "Staten Island doesn't have good boba"],
    "Staten Island doesn't have good boba"
  ),
  new Question(
    "Why are Tech kids always stressed?",
    ["Grades", "Workload", "Relationship drama"],
    "Grades"
  ),
];
// CREATE QUIZ & DISPLAY FIRST QUESTION
const quiz = new Quiz(questions);
QuizUI.displayNext();
