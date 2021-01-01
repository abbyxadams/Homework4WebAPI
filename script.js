// Var for questions 
var questions = [
  {
      title: "What did we cover in the first 2 weeks of class?",
      choices: ["html & CSS ", "Web APIs", "computer science", "Advanced Javascript"],
      answer: "html & CSS"
  },
  {
      title: "What is Abby's favorite thing to learn about?",
      choices: ["Javascript", "MySQL", "Computer Science", "Git"],
      answer: "MySQL"
  },
  {
      title: "What is git used for",
      choices: ["Collaboritive work", "Github", "Version Control", "All of the above"],
      answer: "All of the above"
  },
  {
      title: "What was Jonathon's advice for being successful in this class?",
      choices: ["Always be coding", "Don't ask questions", "Reading is more imprtant than doing", "parenthesis"],
      answer: "Always be coding"
  },
  {
      title: "What is a hackathon?",
      choices: ["A sandwich", "A programming language", "tool for beginners", "A competition"],
      answer: "A competition"
  },

];




// Variables
var score = 0;
var questionIndex = 0;
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");
var timer = document.querySelector("#startTime");
var currentTime = document.querySelector("#currentTime");



var secondsLeft = 106;

var holdInterval = 0;

var penalty = 15;

var ulCreate = document.createElement("ul");

// Timer Display 
timer.addEventListener("click", function () {
    // set to zero
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

