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
question: "1. Which of the following sorting algorithms in its typical implementation gives best performance when applied on an array which is sorted or almost sorted (maximum 1 or two elements are misplaced)? ", ///// Write the question inside double quotes
answers: {
a: "Quick Sort", ///// Write the option 1 inside double quotes
b: "Heap Sort ", ///// Write the option 2 inside double quotes
c: "Merge Sort ", ///// Write the option 3 inside double quotes
d: "Insertion Sort ", ///// Write the option 4 inside double quotes
},
correctAnswer: "d" ///// Write the correct option inside double quotes
},

{
question: "2. Consider a binary min heap containing n elements and every node having degree 2 (i.e. full binary min heap tree). What is the probability of finding the largest element at the last level? ",  ///// Write the question inside double quotes
answers: {
a: "1/2",                  ///// Write the option 1 inside double quotes
b: "1",                  ///// Write the option 2 inside double quotes
c: "1/n ", ///// Write the option 3 inside double quotes
d: "1/2^n", ///// Write the option 4 inside double quotes
},
correctAnswer: "b"                ///// Write the correct option inside double quotes
},

{
question: "3. In a max-heap, element with the greatest key is always in the which node? ",  ///// Write the question inside double quotes
answers: {
a: "Leaf node",                  ///// Write the option 1 inside double quotes
b: "First node of left sub tree",                  ///// Write the option 2 inside double quotes
c: "Root node ", ///// Write the option 3 inside double quotes
d: "First node of right sub tree ", ///// Write the option 4 inside double quotes
},
correctAnswer: "c"                ///// Write the correct option inside double quotes
},

{
question: "4. Heap can also be used as _______.",  ///// Write the question inside double quotes
answers: {
a: "Priority queue",                  ///// Write the option 1 inside double quotes
b: "Stack ",                  ///// Write the option 2 inside double quotes
c: " A decreasing order array ", ///// Write the option 3 inside double quotes
d: "None of the these ", ///// Write the option 4 inside double quotes

},
correctAnswer: "a"                ///// Write the correct option inside double quotes
},

{
question: "5. An array consist of n elements. We want to create a heap using the elements. The time complexity of inserting a heap will be in order of ________.",  ///// Write the question inside double quotes
answers: {
a: "O(n*n*logn)",                  ///// Write the option 1 inside double quotes
b: "O(n)",                  ///// Write the option 2 inside double quotes
c: "O(n*n)  ", ///// Write the option 3 inside double quotes
d: "O(n *logn *logn)", ///// Write the option 4 inside double quotes

},
correctAnswer: "b"                ///// Write the correct option inside double quotes
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
