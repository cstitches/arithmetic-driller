"use strict";

// TODO:
// Get negative numbers and decimals working, both for answers and for arithNums
// Implement score keeping

// HTML ELEMENTS--------------------
// Arithmetic problem numbers, operators
const arithNum0El = document.getElementById("prob--num-0");
const arithNum1El = document.getElementById("prob--num-1");
const arithOpEl = document.getElementById("prob--op");
// Problem answer input
const answerInput = document.getElementById("answ-input");
// Feedback message
const messageEl = document.querySelector(".msg-sect");
const message = document.getElementById("message");
// Buttons
const btnCheck = document.getElementById("btn-check");
const btnShow = document.getElementById("btn-show");
const btnNext = document.getElementById("btn-next");
// Checkboxes
const checkAdd = document.getElementById("check-add");
const checkSub = document.getElementById("check-sub");
const checkMul = document.getElementById("check-mul");
const checkDiv = document.getElementById("check-div");
const checkMod = document.getElementById("check-mod");
// Number range inputs
const num0Min = document.getElementById("number--0-min");
const num0Max = document.getElementById("number--0-max");
const num1Min = document.getElementById("number--1-min");
const num1Max = document.getElementById("number--1-max");
// Decimal input
const decimal = document.getElementById("dec");
// Modal
const info = document.querySelector(".info-icon");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".close-modal");
const modalOverlay = document.querySelector(".overlay");

// GLOBAL VARIABLES --------------------

let arithOp;
let arithNum0;
let arithNum1;
let probAnswer;
let userAnswer;
let attempts;
let isShown;

// INITIALIZATION --------------------

getNewProblem();

function initialize() {
  // reset initial values
  isShown = false;
  attempts = 0;
  answerInput.value = "";
  message.textContent = "Enter your answer above";
  // remove correct/wrong color from messageEl
  messageEl.classList.remove("msg-wrong");
  messageEl.classList.remove("msg-correct");
}

// KEYBOARD SHORTCUTS --------------------

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") checkAnswer();
  if (e.key === "Shift") showAnswer();
  if (e.key === "Alt") getNewProblem();
  if (e.key === "Escape") closeModal();
});

// BTN EVENT LISTENERS --------------------

btnCheck.addEventListener("click", checkAnswer);
btnShow.addEventListener("click", showAnswer);
btnNext.addEventListener("click", getNewProblem);

// modals events
info.addEventListener("click", function () {
  modal.classList.remove("hidden");
  modalOverlay.classList.remove("hidden");
});
modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

// FUNCTION: GENERATE NEW PROBLEM --------------------

function getNewProblem() {
  initialize();
  checkCheckboxes();
  // store operator & number values
  arithOp = getRandomOperator();
  arithNum0 = getRandomNumber(num0Min.value, num0Max.value);
  arithNum1 = getRandomNumber(num1Min.value, num1Max.value);
  // display operator & number values
  if (arithOp === "R") {
    arithOpEl.textContent = arithOp;
    arithOpEl.classList.add("small");
  } else {
    arithOpEl.classList.remove("small");
    arithOpEl.textContent = arithOp;
  }
  arithNum0El.textContent = arithNum0;
  arithNum1El.textContent = arithNum1;
  // solves the problem
  solveProblem(arithOp, arithNum0, arithNum1);
}

// FUNCTION: GENERATE RANDOM NUMBER--------------------

function getRandomNumber(min, max) {
  // FIX: Trying to control negative min values
  //   min = Number(min);
  //   max = Number(min);
  //   console.log(min, max);
  //   if (min < 0) {
  //     min === 0;
  //   }
  //   if (max > 1000000) max === 1000000;
  //   console.log(min, max);
  let rand = Math.floor(Math.random() * (max - min + 1) + min);
  return rand;
}

// FUNCTION: SOLVE PROBLEM--------------------

function solveProblem(op, num0, num1) {
  //   probAnswer = arithNum0 + arithNum1;
  //   return probAnswer;
  if (op === "+") probAnswer = num0 + num1;
  if (op === "×") probAnswer = num0 * num1;
  // removes divide by 0
  if ((op === "÷" && num0 === 0) || num1 === 0) {
    console.log(num0, num1);
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
    }
  }
  return probAnswer;
}

// FUNCTION: CHECK ANSWER --------------------

function checkAnswer() {
  if (isShown === false) {
    if (!answerInput.value) {
      message.textContent = "No answer, try again";
      messageEl.classList.add("msg-wrong");
    } else {
      userAnswer = Number(answerInput.value);
      if (isNaN(userAnswer) === true) {
        message.textContent = "Not a valid answer, try again";
        messageEl.classList.add("msg-wrong");
      } else if (userAnswer === probAnswer) {
        message.textContent = `Correct! The answer is ${probAnswer}`;
        messageEl.classList.remove("msg-wrong");
        messageEl.classList.add("msg-correct");
      } else {
        attempts++;
        if (attempts > 1) {
          message.textContent = `Wrong, try again! ${attempts} attempts`;
        } else {
          message.textContent = `Wrong, try again! ${attempts} attempt`;
          messageEl.classList.add("msg-wrong");
        }
      }
    }
  } else {
    message.textContent = "You've seen the answer. Choose NEXT!";
    messageEl.classList.add("msg-wrong");
  }
}

// FUNCTION: SHOW ANSWER --------------------

function showAnswer() {
  isShown = true;
  message.textContent = `The answer is: ${probAnswer}`;
  messageEl.classList.remove("msg-wrong");
  messageEl.classList.add("msg-correct");
}

// FUNCTION: CHECK CHECKBOXES
// If all are unchecked, 'addition' is automatically checked

function checkCheckboxes() {
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

// FUNCTION: GENERATE RANDOM OPERATOR FROM CHECKED

function getRandomOperator() {
  let checkedOps = [];
  if (checkAdd.checked === true) checkedOps.push("+");
  if (checkSub.checked === true) checkedOps.push("−");
  if (checkMul.checked === true) checkedOps.push("×");
  if (checkDiv.checked === true) checkedOps.push("÷");
  if (checkMod.checked === true) checkedOps.push("R");
  arithOp = checkedOps[Math.floor(Math.random() * checkedOps.length)];
  return arithOp;
}

// FUNCTION: CLOSE MODAL --------------------

function closeModal() {
  modal.classList.add("hidden");
  modalOverlay.classList.add("hidden");
}
