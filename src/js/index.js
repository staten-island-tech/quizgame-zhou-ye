import { questions } from "./questions";

// DEFINING QUIZ CONSTRUCTOR FUNCTION
function Quiz(questions) {
  // array of questions
  this.questions = questions;
  // tracks which question you're on, starting with the first question
  this.currentQuestion = 0; //before first question, there is a question index of 0
  this.score = 0; // score keeper
}
Quiz.prototype.getCurrentQuestion = function () {
  return this.questions[this.currentQuestion];
}; // ??
Quiz.prototype.checkAnswer = function (answer) {
  if (this.getCurrentQuestion().isCorrect(answer)) {
    this.score++; // ++ -> adds 1 point if selected choice is correct
  }
  this.currentQuestion++; // get ready for next question
}; // checks if quiz end is reached
Quiz.prototype.reachesEnd = function () {
  // returns true only after last question
  return this.currentQuestion >= this.questions.length;
}; // checks if the question index number you're on reaches beyond the actual length of the quiz

// QUIZ GAME
const QuizGame = {
  populateIdWithHTML: function (id, content) {
    const element = document.getElementById(id); // gets element from html by its specific id
    element.innerHTML = content; //fills in the element html with the content
  }, //populate = adding record to a database
  showNextQuestion: function () {
    if (quiz.reachesEnd()) {
      this.showResults();
    } else {
      this.showQuestion();
      this.showChoices();
      this.showProgress();
      this.showScore();
    }
  }, // if the quiz has ended (question index >= length of questions), then show the results --> otherwise, continue displaying questions
  showQuestion: function () {
    this.populateIdWithHTML("question", quiz.getCurrentQuestion().text);
  }, //display question: uses text string (from question) to fill in the element with the id "question" in the html file
  showChoices: function () {
    let choices = quiz.getCurrentQuestion().choices;
    // loop through each choice and display on page
    choices.forEach((choice) => {
      let choiceId = "choice" + x; //refers to html ids: "choice0", "choice1", etc
      let choiceText = choices[x]; //connects choice text to its number
      this.populateIdWithHTML(choiceId, choiceText);
      this.checkAnswer(choiceId, choiceText);
    });
  }, //use let because it is a variable that changes depending on what choices the user picks
  checkAnswer: function (id, guess) {
    const button = document.getElementById(id); //goes to html and grabs elements with the id of button
    button.onclick = function () {
      quiz.checkAnswer(guess);
      QuizGame.showNextQuestion();
    }; // (checks if answer is correct) when user clicks -> gets the element with the id of a specific choice -> this is marked as the "guess" and runs through checkAnswer and adds a point if it's correct -> displays next question
  },
  showScore: function () {
    const scoreText = "your score: " + quiz.score;
    this.populateIdWithHTML("score", scoreText); //how BR appears on the game
  }, // (affects bottom right) score display changes whenever a correct answer is chosen
  showProgress: function () {
    const questionNumber = quiz.currentQuestion + 1; //adds 1 everytime you move onto the next question
    const totalQuestions = quiz.questions.length; //quiz questions length is always 5
    const progressText = "question " + questionNumber + " of " + totalQuestions; //how BL appears on the game
    this.populateIdWithHTML("progress", progressText); // uses progress text string (from above) to fill in the element with the id "progress" in the html file
  }, // (affects bottom left) progress display changes whenever the next question is displayed

  showResults: function () {
    const grade = quiz.score / quiz.questions.length; //divides the # questions answered correctly by the number of questions (2 correct answers/5 total questions = grade of 0.4 )
    let results = "<h2>"; //results text show up where h2 is on html
    if (grade >= 0.8) {
      results += "You're a real Seagull - Cawcaw!"; //+= concatenates the string with let results above
    } else if (grade < 0.8 && grade > 0.5) {
      results += "You are half-seagull";
    } else {
      results += "You are incompetent smh";
    }
    results += "</h2><h3>Your score is: " + quiz.score + "</h3>"; //final score display shown where h3 is on html
    results += '<button id="reset">Click me to redeem yourself</button>'; //reset button underneath (where id "button" is located on html)
    this.populateIdWithHTML("quiz", results); //uses results text string (from above) to fill in the element with the id "quiz" in the html file
    this.resetQuiz(); //resets quiz
  },
  resetQuiz: function () {
    const resetButton = document.getElementById("reset");
    // reload quiz to start from beginning
    resetButton.onclick = function () {
      window.location.reload();
    }; // when reset button is clicked on, the window reloads (refresh button)
  },
};

// CREATES QUIZ AND SHOWS FIRST QUESTION
const quiz = new Quiz(questions);
console.log(QuizGame.showNextQuestion());
//QuizGame.showNextQuestion();
