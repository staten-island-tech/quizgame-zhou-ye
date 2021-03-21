// QUESTION CONSTRUCTOR
function Question(text, choices, answer) {
  this.text = text; // "string"
  this.choices = choices; // [array]
  this.answer = answer; // "string"
}
Question.prototype.isCorrect = function (choice) {
  // returns TRUE if the choice matches the correct answer
  return this.answer === choice;
};

// QUIZ CONSTRUCTOR
function Quiz(questions) {
  // array of questions
  this.questions = questions;
  // tracks which question you're on, starting with the first question
  this.currentQuestionIndex = 0;
  this.score = 0; // score keeper
}
Quiz.prototype.getCurrentQuestion = function () {
  return this.questions[this.currentQuestionIndex];
};
Quiz.prototype.checkAnswer = function (answer) {
  if (this.getCurrentQuestion().isCorrect(answer)) {
    this.score++; // ++ -> adds 1 point if selected choice is correct
  }
  this.currentQuestionIndex++; // get ready for next question
};
// check if quiz end is reached
Quiz.prototype.hasEnded = function () {
  // Return TRUE only after last question
  return this.currentQuestionIndex >= this.questions.length;
}; // checks if the question index number you're on reaches beyond the actual length of the quiz

// QUIZ UI
const QuizGame = {
  displayNext: function () {
    if (quiz.hasEnded()) {
      this.showResults();
    } else {
      this.displayQuestion();
      this.displayChoices();
      this.displayProgress();
      this.displayScore();
    }
  }, // if the quiz has ended (question index >= length of questions), then show the results --> otherwise, continue displaying questions
  displayQuestion: function () {
    this.populateIdWithHTML("question", quiz.getCurrentQuestion().text);
  }, //display question: uses text string (from question) to fill in the element with the id "question" in the html file
  displayChoices: function () {
    let choices = quiz.getCurrentQuestion().choices;
    // loop through each choice and display on page
    for (let i = 0; i < choices.length; i++) {
      let choiceId = "choice" + i; //refers to html ids: "choice0", "choice1", etc
      let choiceText = choices[i]; //connects choice text to its number
      this.populateIdWithHTML(choiceId, choiceText);
      this.checkAnswerHandler(choiceId, choiceText);
    }
  },
  checkAnswerHandler: function (id, guess) {
    const button = document.getElementById(id);
    button.onclick = function () {
      quiz.checkAnswer(guess);
      QuizGame.displayNext();
    }; // (checks if answer is right) when user clicks -> gets the element with the id of a specific choice -> this is marked as the "guess" and runs through checkAnswer and adds a point if it's right -> displays next question
  },
  displayScore: function () {
    const scoreText = "score: " + quiz.score;
    this.populateIdWithHTML("score", scoreText); //how BR appears on the game
  }, // (affects bottom right) score display changes whenever a right answer is chosen
  displayProgress: function () {
    const questionNumber = quiz.currentQuestionIndex + 1; //adds 1 everytime you move onto the next question
    const totalQuestions = quiz.questions.length; //always 5
    const progressText = "question " + questionNumber + " of " + totalQuestions; //how BL appears on the game
    this.populateIdWithHTML("progress", progressText); // uses progress text string (from above) to fill in the element with the id "progress" in the html file
  }, // (affects bottom left) progress display changes whenever the next question is displayed

  showResults: function () {
    const grade = quiz.score / quiz.questions.length; //divides the # questions right by the number of questions (2 questions right/5 total questions = grade 0.4 )
    let results = "<h2>"; //results text show up where h2 is on html
    if (grade >= 0.8) {
      results += "You're a real Seagull - Cawcaw!";
    } else if (grade < 0.8 && grade > 0.5) {
      results += "You are half-seagull";
    } else {
      results += "Incompetent smh";
    }
    results += "</h2><h3>Your final score is: " + quiz.score + "</h3>"; //final score display shown where h3 is on html
    results += '<button id="reset">Click me to redeem yourself</button>'; //reset button underneath (where id "button" is located on html)
    this.populateIdWithHTML("quiz", results); //uses results text string (from above) to fill in the element with the id "quiz" in the html file
    this.resetQuizHandler(); //resets quiz
  },
  resetQuizHandler: function () {
    const resetBtn = document.getElementById("reset");
    // reload quiz to start from beginning
    resetBtn.onclick = function () {
      window.location.reload();
    }; // when reset button is clicked on, the window reloads (refresh button)
  },
  populateIdWithHTML: function (id, content) {
    const element = document.getElementById(id); // gets element from html by its specific id
    element.innerHTML = content; //fills in the element html with the content
  },
};

// Hover effect - move button down
//let hoverBtn = document.getElementByTagName('button');
//hoverBtn.onmouseover = function() {
//	this.style['margin-top'] = '25px';
//}

// CREATE QUESTIONS
const questions = [
  new Question(
    "Which girls sports team is the most iconic?",
    ["Bowling", "Track", "Golf", "Fencing", "All of the above"],
    "Bowling"
  ),
  new Question(
    "Which one of the following teachers has a middle name that starts with 'I' ?",
    ["Whalen", "Henriques", "Frusci", "Jax", "Buro"],
    "Henriques"
  ),
  new Question(
    "The last dean at Tech was also _____",
    [
      "Coach of the girl's bowling team",
      "Coach of the boy's handball team",
      "Andrew Jackson",
      "A history teacher",
      "A black belt in jiu-jitsu",
    ],
    "Coach of the girl's bowling team"
  ),
  new Question(
    "Where is the best boba near Tech?",
    [
      "Vivi's",
      "Something Sweet",
      "7/11",
      "Applebee's",
      "Staten Island doesn't have good boba",
    ],
    "Staten Island doesn't have good boba"
  ),
  new Question(
    "Why are Tech Seniors always sad?",
    [
      "Grades/Workload",
      "COVID",
      "Relationship drama",
      "The impending doom of college",
      "All of the Above",
    ],
    "All of the Above"
  ),
];

// CREATE QUIZ and DISPLAYS FIRST QUESTION
const quiz = new Quiz(questions);
QuizGame.displayNext();
