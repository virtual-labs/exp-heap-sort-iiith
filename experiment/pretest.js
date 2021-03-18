/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////

(function() {
function buildQuiz() {
// we'll need a place to store the HTML output
const output = [];

// for each question...
myQuestions.forEach((currentQuestion, questionNumber) => {
// we'll want to store the list of answer choices
const answers = [];

// and for each available answer...
for (letter in currentQuestion.answers) {
// ...add an HTML radio button
answers.push(
`<label>
<input type="radio" name="question${questionNumber}" value="${letter}">
${letter} :
${currentQuestion.answers[letter]}
</label>`
);
}

// add this question and its answers to the output
output.push(
`<div class="question"> ${currentQuestion.question} </div>
<div class="answers"> ${answers.join("")} </div>`
);
});

// finally combine our output list into one string of HTML and put it on the page
quizContainer.innerHTML = output.join("");
}

function showResults() {
// gather answer containers from our quiz
const answerContainers = quizContainer.querySelectorAll(".answers");
answerContainers.forEach(e => e.style.color = "black");

// keep track of user's answers
let numCorrect = 0;

// for each question...
myQuestions.forEach((currentQuestion, questionNumber) => {
// find selected answer
const answerContainer = answerContainers[questionNumber];
const selector = `input[name=question${questionNumber}]:checked`;
const userAnswer = (answerContainer.querySelector(selector) || {}).value;

// if answer is correct
if (userAnswer === currentQuestion.correctAnswer) {
// add to the number of correct answers
numCorrect++;

// color the answers green
//answerContainers[questionNumber].style.color = "lightgreen";
} else {
// if answer is wrong or blank
// color the answers red
answerContainers[questionNumber].style.color = "red";
}
});

// show number of correct answers out of total
resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");


/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the above code ////////////////////////

/////////////////////////////////////////////////////////////////////////////






/////////////// Write the MCQ below in the exactly same described format ///////////////


const myQuestions = [{
question: "1. The array 5, 4, 1, 2, 3 is sorted in ascending order. Which option provides the correctly sorted array? ", ///// Write the question inside double quotes
answers: {
a: "1, 2, 3, 4, 5 ", ///// Write the option 1 inside double quotes
b: "5, 4, 3, 2, 1", ///// Write the option 2 inside double quotes
c: "1, 1, 2, 2, 3, 3, 4, 4, 5, 5 ", ///// Write the option 2 inside double quotes
d: "Depends on which data structure is used ", ///// Write the option 2 inside double quotes
},
correctAnswer: "a" ///// Write the correct option inside double quotes
},

{
question: "2. Which of the following statements is correct?",  ///// Write the question inside double quotes
answers: {
a: " Log210 is smaller than log310 ",                  ///// Write the option 1 inside double quotes
b: " Loge 2 is the same as Log2 e ",                  ///// Write the option 2 inside double quotes
c: "Log216 is the same as sqrt (16) ", ///// Write the option 3 inside double quotes
d: "Log1010 is larger than Log2 2 ", ///// Write the option 4 inside double quotes
},
correctAnswer: "c"                ///// Write the correct option inside double quotes
},

{
question: "3. Which of the following is true about Binary Trees?",  ///// Write the question inside double quotes
answers: {
a: "Every binary tree is either complete or full",                  ///// Write the option 1 inside double quotes
b: "Every complete binary tree is also a full binary tree ",                  ///// Write the option 2 inside double quotes
c: " Every full binary tree is also a complete binary tree ", ///// Write the option 3 inside double quotes
d: "No binary tree is both complete and full", ///// Write the option 4 inside double quotes
e: "None of the above ", ///// Write the option 4 inside double quotes
},
correctAnswer: "c"                ///// Write the correct option inside double quotes
},
{
question: "4. Level of a node is distance from root to that node. For example, level of root is 1 and levels of left and right children of root is 2. The maximum number of nodes on level i of a binary tree is In the following answers, the operator '^' indicates power. ",  ///// Write the question inside double quotes
answers: {
a: "2^(i-1)",                  ///// Write the option 1 inside double quotes
b: "2^i ",                  ///// Write the option 2 inside double quotes
c: "2^(i+1) ", ///// Write the option 3 inside double quotes
d: "2^[(i+1)/2] ", ///// Write the option 4 inside double quotes
},
correctAnswer: "a"                ///// Write the correct option inside double quotes
},

];




/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////


// display quiz right away
buildQuiz();

// on submit, show results
submitButton.addEventListener("click", showResults);
})();


/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the above code ////////////////////////

/////////////////////////////////////////////////////////////////////////////
