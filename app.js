var timeEl = document.querySelector(".timer");

var secondsLeft = 76;

function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
    }

  }, 1000);
}
  
  setTime();

//Up here is the timer ^^  

function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // This here will show the questions.
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // This here will show the options.
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// These are the questions, and all answers are shown after the list of possible answers in the brackets.
var questions = [
    new Question ("Luzon is the largest and most populous island in which Southeast Asian nation?", ["The Phillipines", "Malaysia", "Singapore", "Indonesia"], "The Phillipines"),
    new Question ("Who is the only man to serve two non-consecutive terms as US President, from 1885-1889 and 1893-1897?", ["Grover Cleveland", "Andrew Johnson", "Abraham Lincoln", "Milard Fillmore"], "Grover Cleveland"),
    new Question ("In which modern-day capital city was Archduke Franz Ferdinand assassinated by Gavrilo Princip in 1914, sparking the crisis that ushered in the First World War?", ["Belgrade", "Sarajevo", "Tirana", "Zagreb"], "Sarajevo"),
    new Question ("The eruption of which volcano in 1883 is commonly-cited as the loudest sound in recent human history?", ["Novarupta", "Santa Maria Volcano", "Yellowstone", "Krakatau"], "Krakatau"),
    new Question ("Which small country in the horn of Africa - whose capital has the same name - was formerly known, during the colonial period, as French Somaliland?", ["Botswana", "Djibouti", "Namibia", "Angola"], "Djibouti")
];

// This creates the quiz.
var quiz = new Quiz(questions);

// This will display the quiz.
populate();




