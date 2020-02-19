function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}


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
        var element = document.getElementById("questions");
        element.innerHTML = quiz.getQuestionIndex().text;

        // This here will show the options.
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("answer" + i);
            element.innerHTML = choices[i];
            guess("button" + i, choices[i]);
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
    var element = document.getElementById("quiz-progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>JavaScript Quiz!</h1>";
    gameOverHTML += "<h2 id='score'> Your score: " + quiz.score + "</h2>";
    var element = document.getElementById("inner-box");
    element.innerHTML = gameOverHTML;
};

// These are the questions, and all correct answers are shown after the list of possible answers in the brackets.
var questions = [
    new Question ("Which best explains getSelection()?", ["Returns the VALUE of a selected OPTION", "Returns document.URL of the window in focus", "Returns the value of cursor-selected text", "Returns the VALUE of a checked radio input"], "Returns the value of cursor-selected text"),
    new Question ("Choose the client-side JavaScript object:", ["Database", "Cursor", "Client", "FileUpLoad"], "FileUpLoad"),
    new Question ("What is meant by keyword 'this' in javascript?", ["It refers to the object it belongs to", "It refers to the previous object", "It is a variable which contains value", "None of the above"], "It refers to the object it belongs to"),
    new Question ("Choose the server-side JavaScript object:", ["FileUpLoad", "Function", "File", "Date"], "File"),
    new Question ("In Javascript, what does isNaN function do?", ["Return true if the argument is not a number", "Return false if the argument is not a number", "Return true if the argument is a number", "None of the above"], "Return true if the argument is not a number")
];

// This creates the quiz.
var quiz = new Quiz(questions);

// This will display the quiz.
populate();




