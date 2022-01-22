"use strict";

// TODO:
// Get negative numbers and decimals working, both for answers and for equation numbers
// Implement score keeping -- have a new function called "Reset" which clears score keeping data & initializes

//=============================================
// ===== DOM ELEMENTS & GLOBAL VARIABLES =====
//=============================================

// HTML ELEMENTS--------------------
// Arithmetic problem numbers, operators
const elNum1 = document.getElementById("num1");
const elNum2 = document.getElementById("num2");
const elOp = document.getElementById("op");
// Problem answer input
const inputAnsw = document.getElementById("answ-input");
// Feedback message
const elMsg = document.querySelector(".arith-msg");
const message = document.getElementById("message");
// Buttons
const btnCheck = document.querySelector(".btn-check");
const btnShow = document.querySelector(".btn-show");
const btnNext = document.querySelector(".btn-next");
// Checkboxes
const checkAdd = document.getElementById("check-add");
const checkSub = document.getElementById("check-sub");
const checkMul = document.getElementById("check-mul");
const checkDiv = document.getElementById("check-div");
const checkMod = document.getElementById("check-mod");
// Number range inputs & values
const num1Min = document.getElementById("num1-min");
const num1Max = document.getElementById("num1-max");
const num2Min = document.getElementById("num2-min");
const num2Max = document.getElementById("num2-max");
// Modal
const btnInfo = document.querySelector(".info-icon");
const modal = document.querySelector(".modal");
const modalBtnClose = document.querySelector(".close-modal");
const modalOverlay = document.querySelector(".overlay");

// GLOBAL VARIABLES --------------------

let solution;
let answer;
let attempts;
let answShown;

//=============================================
// ===== EVENTS: KEYBOARD & BUTTONS =====
//=============================================

// KEYBOARD SHORTCUTS --------------------

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") checkAnswer();
  if (e.key === "Shift") showAnswer();
  if (e.key === "Alt") initialize();
  if (e.key === "Escape") closeModal();
});

// BTN EVENT LISTENERS --------------------

btnCheck.addEventListener("click", checkAnswer);
btnShow.addEventListener("click", showAnswer);
btnNext.addEventListener("click", initialize);

// modals events
btnInfo.addEventListener("click", openModal);
modalBtnClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

// INITIALIZATION --------------------

initialize();

function initialize() {
  // reset initial values
  resetInitialValues();
  // clear answer input & message el
  clearInputAnsw();
  clearMsg();
  // once inputs valid, generate new equation
  newEquation();
}

// FUNCTION: RESET INITIAL VALUES

function resetInitialValues() {
  solution = "";
  answer = "";
  attempts = 0;
  answShown = false;
}

//=============================================
// ===== GENERATE NEW EQUATION =====
//=============================================

// FUNCTION: GENERATE NEW EQUATION -------------

function newEquation() {
  // correct any invalid number range input
  correctInvalidNumInput(num1Min, num1Max);
  correctInvalidNumInput(num2Min, num2Max);
  // get & store operator & number values for equation
  const op = newRandomOperator();
  // const num1 = newRandomNumber(num1Min.value, num1Max.value);
  // const num2 = newRandomNumber(num2Min.value, num2Max.value);
  const num1 = newRandomNumber(num1Min, num1Max);
  const num2 = newRandomNumber(num2Min, num2Max);
  // display the equation
  displayEquation(op, num1, num2);
  // solve the equation
  solution = solveEquation(op, num1, num2);
}

// FUNCTION: GENERATE RANDOM OPERATOR FROM CHECKED

function newRandomOperator() {
  checkCheckboxes();
<<<<<<< HEAD
  checkRanges();
  // store operator & number values
  arithOp = getRandomOperator();
  arithNum0 = getRandomNumber(num0Min.value, num0Max.value);
  arithNum1 = getRandomNumber(num1Min.value, num1Max.value);
=======
  const checkedOps = [];
  if (checkAdd.checked === true) checkedOps.push("+");
  if (checkSub.checked === true) checkedOps.push("−");
  if (checkMul.checked === true) checkedOps.push("×");
  if (checkDiv.checked === true) checkedOps.push("÷");
  if (checkMod.checked === true) checkedOps.push("R");
  op = checkedOps[Math.floor(Math.random() * checkedOps.length)];
  return op;
}

// FUNCTION: GENERATE RANDOM NUMBER------------

function newRandomNumber(min, max) {
  const minNum = Number(Math.floor(min.value));
  const maxNum = Number(Math.floor(max.value));
  correctInvalidNumInput(minNum, maxNum);
  const rand = Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
  return rand;
}

//=============================================
// ===== CORRECT INVALID SETTINGS INPUTS =====
//=============================================

// FUNCTION: CHECK CHECKBOXES

function checkCheckboxes() {
  // if none checked, check 'add'
  if (
    checkAdd.checked === false &&
    checkSub.checked === false &&
    checkMul.checked === false &&
    checkDiv.checked === false &&
    checkMod.checked === false
  ) {
    checkAdd.checked = true;
  }
}

// FUNCTION: CORRECT INVALID NUMBER RANGE INPUTS

// Handle non-number input, decimals

// RESEARCH: WHY?? This function doesn't work if I pass in the .value, but works if I pass in the element then call the .value within the if statement. Yet I can pass in el.value for random number gen.

function correctInvalidNumInput(min, max) {
  // if min greater than max, change min to equal max
  if (min.value > max.value) min.value = max.value;
  // if values less than 0, change to 0
  if (min.value < 0) min.value = 0;
  if (max.value < 0) max.value = 0;
}

//=============================================
// ===== UI DISPLAY =====
//=============================================

// FUNCTION: DISPLAY EQUATION

function displayEquation(op, num1, num2) {
>>>>>>> develop
  // display operator & number values
  if (op === "R") {
    elOp.textContent = op;
    elOp.classList.add("small");
  } else {
    elOp.classList.remove("small");
    elOp.textContent = op;
  }
  elNum1.textContent = num1;
  elNum2.textContent = num2;
}

//=============================================
// ===== SOLUTION =====
//=============================================

// FUNCTION: SOLVE EQUATION---------------------

function solveEquation(op, num1, num2) {
  //   probAnswer = arithNum0 + arithNum1;
  //   return probAnswer;
<<<<<<< HEAD
  if (op === "+") probAnswer = num0 + num1;
  if (op === "×") probAnswer = num0 * num1;
  // removes divide by 0
  if ((op === "÷" && num0 === 0) || num1 === 0) {
    getNewProblem();
  }
  //   } else {
  //     probAnswer = probAnswer = Math.floor(num0 / num1);
  //   }

  //   switches bigger number to top for sub, div, mod
  if (op === "−" || op === "÷" || op === "R") {
    if (num0 < num1) {
      if (op === "−") probAnswer = num1 - num0;
      if (op === "÷") probAnswer = Math.floor(num1 / num0);
      if (op === "R") probAnswer = Math.floor(num1 % num0);
      arithNum0El.textContent = num1;
      arithNum1El.textContent = num0;
    } else {
      if (op === "−") probAnswer = num0 - num1;
      if (op === "R") probAnswer = num0 % num1;
      if (op === "÷") {
        probAnswer = Math.floor(num0 / num1);
      }
=======
  if (op === "+") solution = num1 + num2;
  if (op === "−") solution = num1 - num2;
  if (op === "×") solution = num1 * num2;
  if (op === "÷" || op === "R") divide(op, num1, num2);
  return solution;
}

function divide(op, num1, num2) {
  // remove divide by 0 problems by changing all "0" to "1"
  // put larger number on top no matter what?
  if (num1 === 0) num1 = 1;
  if (num2 === 0) num2 = 1;
  if (op === "÷") solution = Math.floor(num1 / num2);
  if (op === "R") solution = Math.floor(num1 % num2);
  return solution;
}

//=============================================
// ===== USER ANSWER =====
//=============================================

// FUNCTION: CHECK ANSWER ---------------------
// checks: answer hasn't been shown yet; input is valid
// passing those, compare answer to solution
// if correct; if wrong

function checkAnswer() {
  if (checkAnswShown() === false) {
    if (checkAnswValid() === true) {
      compareAnsw();
>>>>>>> develop
    }
  }
}

// FUNCTION: CHECK IF ANSWER SHOWN

function checkAnswShown() {
  if (answShown === true) {
    message.textContent = "❌ You've seen the answer.";
    setMsgWrong();
  } else {
    return false;
  }
}

// FUNCTION: CHECK IF ANSWER VALID

function checkAnswValid() {
  if (!inputAnsw.value || isNaN(inputAnsw.value) === true) {
    console.log(typeof inputAnsw.value, isNaN(inputAnsw.value));
    message.textContent = "❌ No answer, try again";
    setMsgWrong();
    makeMsgVis();
  } else {
    return true;
  }
}

// FUNCTION: COMPARE ANSWER TO SOLUTION

function compareAnsw() {
  answer = Number(inputAnsw.value);
  if (answer === solution) {
    message.textContent = `👍 Correct!`;
    setMsgCorrect();
    makeMsgVis();
  } else {
    attempts++;
    if (attempts > 1) {
      message.textContent = `Incorrect (${attempts} attempts)`;
    } else {
      message.textContent = `Incorrect (${attempts} attempt)`;
      setMsgWrong();
      makeMsgVis();
    }
  }
}

// FUNCTION: SHOW ANSWER ----------------------

function showAnswer() {
  answShown = true;
  message.textContent = `The answer is ${solution}`;
  setMsgShow();
  makeMsgVis();
}

<<<<<<< HEAD
// FUNCTION: CHECK CHECKBOXES --------------------
// If all are unchecked, 'addition' is automatically checked
=======
// FUNCTIONS: MESSAGE ELEMENT & ANSWER INPUT
>>>>>>> develop

function clearInputAnsw() {
  inputAnsw.value = "";
}

<<<<<<< HEAD
// FUNCTION: CHECK RANGES --------------------
// TODO: Make this actually work
function checkRanges() {
  if (num0Min.value > num0Max.value || num1Min.value > num1Max.value) {
    message.textContent =
      "Minimum numbers are larger than maximums. Please fix.";
  }
}

// FUNCTION: GENERATE RANDOM OPERATOR FROM CHECKED --------------------
=======
function makeMsgVis() {
  message.classList.remove("invisible");
}
function clearMsg() {
  message.textContent = "Can you solve it?";
  message.classList.add("invisible");
  elMsg.classList.remove("msg-wrong");
  elMsg.classList.remove("msg-correct");
  elMsg.classList.remove("msg-show");
}
function setMsgCorrect() {
  elMsg.classList.remove("msg-show");
  elMsg.classList.remove("msg-wrong");
  elMsg.classList.add("msg-correct");
}
function setMsgShow() {
  elMsg.classList.remove("msg-correct");
  elMsg.classList.remove("msg-wrong");
  elMsg.classList.add("msg-show");
}
function setMsgWrong() {
  elMsg.classList.remove("msg-correct");
  elMsg.classList.remove("msg-show");
  elMsg.classList.add("msg-wrong");
}
>>>>>>> develop

//=============================================
// ===== MODAL =====
//=============================================

// FUNCTION: MODAL - OPEN MODAL ---------------

function openModal() {
  modal.classList.remove("hidden");
  modalOverlay.classList.remove("hidden");
}

// FUNCTION: MODAL - CLOSE MODAL --------------

function closeModal() {
  modal.classList.add("hidden");
  modalOverlay.classList.add("hidden");
}
