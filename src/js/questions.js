// DEFINING QUESTION CONSTRUCTOR FUNCTION
///object constructor functions are like a blueprint to create multiple "object types" (objects of the same type) --> creating questions of the same type
function Question(text, choices, answer) {
  //property definitions
  this.text = text; // "string"
  this.choices = choices; // [array]
  this.answer = answer; // "string"
} //this. (keyword) is used for property and method definitions with constructor functions; for constructor functions ".this" is a substitute for a new object (becomes the new object when the new object is created)
Question.prototype.isCorrect = function (choice) {
  //first method definition added to constructor function; adding methods to an object contructor must be done inside the constructor function
  return this.answer === choice;
}; // returns true if the choice matches the correct answer

// MAKE QUESTIONS (creating 5 object instances)
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

export { questions };
