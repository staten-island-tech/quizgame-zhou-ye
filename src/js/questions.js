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
      "A Tech alumni",
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

// DEFINING QUESTION CONSTRUCTOR FUNCTION
function Question(text, choices, answer) {
  //property definitions
  this.text = text; // "string"
  this.choices = choices; // [array]
  this.answer = answer; // "string"
} //this. is used for property and method definitions with constructor functions
Question.prototype.isCorrect = function (
  choice //first method definition
) {
  return this.answer === choice;
}; // returns true if the choice matches the correct answer

export { questions };
