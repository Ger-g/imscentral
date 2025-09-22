// Questions
const questions = [
  {
    question: "Which of one of these items cannot be secured by IMS?",
    answers: [
      { text: "Transactions", correct: false },
      { text: "Commands", correct: false },
      { text: "Data sets", correct: false },
      { text: "Mobile applications", correct: true },
    ],
  },
  {
    question:
      "Security levels can be affected by the following IMS elements? Select all that apply.",
    answers: [
      { text: "The version of the application in use", correct: false },
      { text: "IMS JCL overrides", correct: true },
      { text: "RACF definitions", correct: true }, // true
      { text: "IMS command options", correct: true }, // true
    ],
  },
  {
    question:
      "Which of these security facilities are provided by the IMS product. Select all that apply.",
    answers: [
      { text: "SAF", correct: false },
      { text: "Encryption", correct: false },
      { text: "Parameters within the PSB generation", correct: true }, // true
      { text: "Installation exit routines", correct: true },
    ],
  },
];

const question = document.getElementById("question");
const answerBtn = document.getElementById("answer-btns");
const nextBtn = document.getElementById("next-btn");

let currQuestionIndex = 0;
let score = 0;
let submitState = "submit";

/**
 * Initializes the quiz by setting the current question index to 0,
 * resetting the score to 0, updating the submit button text to "Submit",
 * setting the submit state to "submit", and displaying the first question.
 */
function startQuiz() {
    currQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Submit";
    submitState = "submit";
    showQuestion();
}

/**
 * Gets each answer of the current question and create a checkbox button.
 */
function showQuestion() {
    resetState();
    // Get current question based on current index
    let currQuestion = questions[currQuestionIndex];
    // Update question with correct question number
    let newQuestion = currQuestionIndex + 1;
    question.innerHTML = newQuestion + "/" + questions.length + "<br/>" + currQuestion.question;

    // Button id
    let btnId = 0;
    // For each answer of current question...
    currQuestion.answers.forEach(answer => {
        // Create new button
        const btn = document.createElement("cds-checkbox");
        // Set id and increment
        btn.id = btnId;
        btnId++;
        // Populate answer text
        btn.innerHTML = answer.text;
        btn.classList.add('btn');
        // Add button to answer button div
        answerBtn.appendChild(btn);

        // Set dataset property custom attribute correct to true if answer is correct
        if (answer.correct) {
            btn.dataset.correct = answer.correct;
        }
        
        // Event listener for checkbox change
        btn.addEventListener('cds-checkbox-changed', selectButton);
    })
}

/**
 * Resets the question state by clearing all child nodes of the element with the id 'answerBtn'
 * before adding the question answers
 */
function resetState() {
    while (answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

/**
 * When button is selected, toggle 'selected' class
 */
function selectButton(e) {
  const selectedBtn = e.target;
  selectedBtn.classList.toggle('selected');
}

/**
 * When button is selected, toggle 'selected' class
 */
function showAnswer() {
    let tempScore = 0;
    let totalScore = 0;
    let incorrectAnswer = false;
    Array.from(answerBtn.children).forEach(btn => {
      // btn.classList.add('disable');
      if (btn.classList.contains('selected')) {
        if (btn.dataset.correct === "true") {
            btn.classList.add('correct');
            tempScore++;
        } else {
            btn.classList.add('incorrect');
            incorrectAnswer = true;
        }
      }

      if (btn.dataset.correct === "true") {
          btn.classList.add('correct');
          totalScore++;
      } 
      btn.disabled = true;
    });
    
    if (totalScore === tempScore && !incorrectAnswer) {
      score++;
    }
    console.log(score);
    
    submitState = "next";
}

function showScore() {
    resetState();
    question.innerHTML = "You scored " + score + " out of " + questions.length + ".";
    nextBtn.innerHTML = "Restart";
}

function handleNextBtn() {
    currQuestionIndex++;
    if (currQuestionIndex < questions.length) {
        submitState = "submit";
        nextBtn.innerHTML = "Submit";
        showQuestion();
    } else {
        submitState = "next";
        showScore();
    }
}

nextBtn.addEventListener('click', () => {
    if (submitState == "submit") {
      showAnswer();
      nextBtn.innerHTML = "Next";
      nextBtn.kind = 'secondary';
    } else if (submitState == "next") {
      nextBtn.kind = 'primary';
      if (currQuestionIndex < questions.length) {
          handleNextBtn();
      } else {
          startQuiz();
      }
    }
})

startQuiz();