const allQuestions = [
  {
    Question: "What is Tims Name?",
    Choices: ["Tim", "Tony", "Travis"],
    correctAnswer: "Tim",
  },
  {
    Question: "Where is Tim From?",
    Choices: ["Austin", "Manassas", "DC"],
    correctAnswer: "Manassas",
  },
  {
    Question: "What is Moo Moo's name?",
    Choices: ["Moo", "Moo Moo", "Katharine"],
    correctAnswer: "Moo Moo",
  },
];
// everything is based on counter. Same button for everything.
//get quiz Question gets the question then adds the userData
//

// 1 button to start quiz
// 2 button to set quiz data

var userScore = [];
var count = 0;
var answer = allQuestions[count].Answer;

$(document).ready(function () {
  nextQuestion(); // run next Question

  $("#prev").on("click", function () {
    storeChoice();
    count--;
    nextQuestion();
    if (count === 0) {
      $("#prev").addClass("hidden");
    }
  });

  $("#next").on("click", function () {
    if ($("input:checked").val() === undefined) {
      $(".alert-warning").removeClass("hidden");
    } else {
      $(".alert-warning").addClass("hidden");
      storeChoice();
      if (count < allQuestions.length - 1) {
        count++;

        nextQuestion();
        if (count > 0) {
          $("#prev").removeClass("hidden");
        }
      } else {
        displayScore();
      }
    }
  });
});

function storeChoice() {
  // must be redone for back button
  if ($("input:checked").val() === undefined) {
    return;
  } else {
    userScore[count] = $("input:checked").val();
  }
}

// does not MODIFY COUNT!! //
function nextQuestion() {
  var question = allQuestions[count].Question;
  var choices = allQuestions[count].Choices;

  // variable to pass into fade below
  var a = choices.map(function (val) {
    return `<input type="radio" name="choice" id="radio" value="${val}"><label for="radio">${val}</label><br>`;
  });

  // fade out old form inputs fade in new
  $(".form-group").fadeOut(500, function () {
    $(this).html(a).fadeIn(200);
  });
  // fade out old form inputs fade in new
  $(".question").fadeOut(500, function () {
    $(this).text(question).fadeIn(200);
  });

  // retrieve previously checked item for navigation
  $("input[value=" + userScore[count] + "]").prop("checked", true);
}

// does not modify count!!
function displayScore() {
  $(".question").text("Your quiz results are below");
  $("#next").addClass("hidden");
  $("#prev").addClass("hidden");
  $("#start").removeClass("hidden");
  $(".form-group").html("");

  for (i = 0; i < userScore.length; i++) {
    const correct = allQuestions[i].correctAnswer;
    const choice = userScore[i];

    if (correct === choice) {
      $(".results").append(`<p value="Answer${i}">${choice}: Correct!</p>`);
    } else {
      $(".results").append(`<p value="Answer${i}">${choice}: False!</p>`);
    }
  }
}

$("#start").on("click", function () {
  userScore = [];
  count = 0;
  $(this).addClass("hidden");
  $("#next").removeClass("hidden");
  $(".results").html("");
  nextQuestion();
});
