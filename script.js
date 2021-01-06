// Var for questions 
var questions = [
  {
      title: "What did we cover in the first 2 weeks of class?",
      multiChoice: ["html & CSS ", "Web APIs", "computer science", "Advanced Javascript"],
      answer: "html & CSS"
  },
  {
      title: "What is Abby's favorite thing to learn about?",
      multiChoice: ["Javascript", "MySQL", "Computer Science", "Git"],
      answer: "MySQL"
  },
  {
      title: "What is git used for",
      multiChoice: ["Collaboritive work", "Github", "Version Control", "All of the above"],
      answer: "All of the above"
  },
  {
      title: "What was Jonathon's advice for being successful in this class?",
      multiChoice: ["Always be coding", "Don't ask questions", "Reading is more imprtant than doing", "parenthesis"],
      answer: "Always be coding"
  },
  {
      title: "What is a hackathon?",
      multiChoice: ["A sandwich", "A programming language", "tool for beginners", "A competition"],
      answer: "A competition"
  },

];




// Start Time
let secondsLeft = 76;

//Timer Display 
let timer = document.getElementById("timer");

//High Score
let scoresDiv = document.getElementById("scores-div");

let buttonsDiv = document.getElementById("buttons")

let viewScoresBtn = document.getElementById("view-scores")

//Start Button
let startButton = document.getElementById("start-button");
startButton.addEventListener("click", setTime);


var questionDiv = document.getElementById("question-div");

let results = document.getElementById("results");

// Choices Div 
var choices = document.getElementById("choices");


// High Scores
let emptyArray = [];

// Local Storage
let storedArray = JSON.parse(window.localStorage.getItem("highScores"));


var questionCount = 0;


let score = 0


function setTime() {
  displayQuestions();
  let timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = "";
    timer.textContent = "Time: " + secondsLeft;
    if (secondsLeft <= 0 || questionCount === questions.length) {
      clearInterval(timerInterval);
      captureUserScore();
    } 
  }, 1000);
}

function displayQuestions() {
  removeEls(startButton);

  if (questionCount < questions.length) {
    questionDiv.innerHTML = questions[questionCount].title;
    choices.textContent = "";

    for (let i = 0; i < questions[questionCount].multiChoice.length; i++) {
      let el = document.createElement("button");
      el.innerText = questions[questionCount].multiChoice[i];
      el.setAttribute("data-id", i);
      el.addEventListener("click", function (event) {
        event.stopPropagation();

        if (el.innerText === questions[questionCount].answer) {
          score += secondsLeft;
        } else {
          score -= 10;
          secondsLeft = secondsLeft - 15;
        }
        
        questionDiv.innerHTML = "";

        if (questionCount === questions.length) {
          return;
        } else {
          questionCount++;
          displayQuestions();
        }
      });
      choices.append(el);
    }
  }
}


function captureUserScore() {
  timer.remove();
  choices.textContent = "";

  let initialsInput = document.createElement("input");
  let postScoreBtn = document.createElement("input");

  results.innerHTML = `Great Job! You scored ${score} points! Enter your initials here: `;
  initialsInput.setAttribute("type", "text");
  postScoreBtn.setAttribute("type", "button");
  postScoreBtn.setAttribute("value", "Keep My Score!");
  postScoreBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let scoresArray = defineScoresArray(storedArray, emptyArray);

    let initials = initialsInput.value;
    let userAndScore = {
      initials: initials,
      score: score,
    };

    scoresArray.push(userAndScore);
    saveScores(scoresArray);
    displayAllScores();
    clearScoresBtn();
    goBackBtn();
    viewScoresBtn.remove();
  });
  results.append(initialsInput);
  results.append(postScoreBtn);
}

const saveScores = (array) => {
  window.localStorage.setItem("highScores", JSON.stringify(array));
}

const defineScoresArray = (arr1, arr2) => {
  if(arr1 !== null) {
    return arr1
  } else {
    return arr2
  }
}

const removeEls = (...els) => {
  for (let el of els) el.remove();
}

function displayAllScores() {
  removeEls(timer, startButton, results);
  let scoresArray = defineScoresArray(storedArray, emptyArray);

  scoresArray.forEach(obj => {
    let initials = obj.initials;
    let storedScore = obj.score;
    let resultsP = document.createElement("p");
    resultsP.innerText = `${initials}: ${storedScore}`;
    scoresDiv.append(resultsP);
  });
}

function viewScores() {
  viewScoresBtn.addEventListener("click", function(event) {
    event.preventDefault();
    removeEls(timer, startButton);
    displayAllScores();
    removeEls(viewScoresBtn);
    clearScoresBtn();
    goBackBtn();
  });
}

function clearScoresBtn() {    
  let clearBtn = document.createElement("input");
  clearBtn.setAttribute("type", "button");
  clearBtn.setAttribute("value", "Clear Scores");
  clearBtn.addEventListener("click", function(event){
    event.preventDefault();
    removeEls(scoresDiv);
    window.localStorage.removeItem("highScores");
  })
  scoresDiv.append(clearBtn)
}

function goBackBtn() {
  let backBtn = document.createElement("input");
  backBtn.setAttribute("type", "button");
  backBtn.setAttribute("value", "Go Back");
  backBtn.addEventListener("click", function(event){
    event.preventDefault();
    window.location.reload();
  })
  buttonsDiv.append(backBtn)
}


viewScores();