"use strict";

// TODO:
// Get negative numbers and decimals working, both for answers and for arithNums
// Implement score keeping

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
// Number range inputs
const num1Min = document.getElementById("num1-min");
const num1Max = document.getElementById("num1-max");
const num2Min = document.getElementById("num2-min");
const num2Max = document.getElementById("num2-max");
//Number range sliders
const num1MinRange = document.getElementById("num1-min-range");
const num1MaxRange = document.getElementById("num1-max-range");
// const num2MinRange = document.getElementById("num2-min-range");
// const num2MaxRange = document.getElementById("num2-max-range");
// console.log(num1MinRange, num1MaxRange, num2MinRange, num2MaxRange);
// Decimal input
const decimal = document.getElementById("dec");
// Modal
const info = document.querySelector(".info-icon");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".close-modal");
const modalOverlay = document.querySelector(".overlay");

// GLOBAL VARIABLES --------------------

let op;
let num1;
let num2;
let solution;
let answer;
let attempts;
let answShown;

// INITIALIZATION --------------------

initialize();

function initialize() {
  // reset initial values
  answShown = false;
  attempts = 0;
  inputAnsw.value = "";
  message.textContent = "Yo";
  message.classList.add("invisible");
  // remove correct/wrong color from messageEl
  elMsg.classList.remove("msg-wrong");
  elMsg.classList.remove("msg-correct");
  elMsg.classList.remove("msg-show");
  // generate new problem
  newProblem();
}

// KEYBOARD SHORTCUTS --------------------

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") checkAnswer();
  if (e.key === "Shift") showAnswer();
  if (e.key === "Alt") newProblem();
  if (e.key === "Escape") closeModal();
});

// BTN EVENT LISTENERS --------------------

btnCheck.addEventListener("click", checkAnswer);
btnShow.addEventListener("click", showAnswer);
btnNext.addEventListener("click", initialize);

// modals events
info.addEventListener("click", function () {
  modal.classList.remove("hidden");
  modalOverlay.classList.remove("hidden");
});
modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

// FUNCTION: MAKE MESSAGE VISIBLE

function makeMsgVis() {
  message.classList.remove("invisible");
}

// FUNCTION: GENERATE NEW PROBLEM --------------------

function newProblem() {
  // store operator & number values
  op = newRandomOperator();
  num1 = newRandomNumber(num1Min.value, num1Max.value);
  num2 = newRandomNumber(num2Min.value, num2Max.value);
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
  // solves the problem
  solveProblem(op, num1, num2);
}

// FUNCTION: GENERATE RANDOM NUMBER--------------------

function newRandomNumber(min, max) {
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
  if (op === "+") solution = num0 + num1;
  if (op === "×") solution = num0 * num1;
  // removes divide by 0
  if ((op === "÷" && num0 === 0) || num1 === 0) {
    newProblem();
  }
  //   } else {
  //     probAnswer = probAnswer = Math.floor(num0 / num1);
  //   }

  //   switches bigger number to top for sub, div, mod
  if (op === "−" || op === "÷" || op === "R") {
    if (num0 < num1) {
      if (op === "−") solution = num1 - num0;
      if (op === "÷") solution = Math.floor(num1 / num0);
      if (op === "R") solution = Math.floor(num1 % num0);
      elNum1.textContent = num1;
      elNum2.textContent = num0;
    } else {
      if (op === "−") solution = num0 - num1;
      if (op === "R") solution = num0 % num1;
      if (op === "÷") {
        answer = Math.floor(num0 / num1);
      }
    }
  }
  return solution;
}

// FUNCTION: CHECK ANSWER --------------------

function checkAnswer() {
  if (answShown === false) {
    if (!inputAnsw.value) {
      elMsg.classList.remove("msg-correct");
      elMsg.classList.remove("msg-show");
      elMsg.classList.add("msg-wrong");
      message.textContent = "❌ No answer, try again";
      makeMsgVis();
    } else {
      answer = Number(inputAnsw.value);
      if (isNaN(answer) === true) {
        message.textContent = "❌ Not a valid answer, try again";
        elMsg.classList.remove("msg-correct");
        elMsg.classList.remove("msg-show");
        elMsg.classList.add("msg-wrong");
        makeMsgVis();
      } else if (answer === solution) {
        message.textContent = `👍 Correct!`;
        elMsg.classList.remove("msg-wrong");
        elMsg.classList.remove("msg-show");
        elMsg.classList.add("msg-correct");
        makeMsgVis();
      } else {
        attempts++;
        if (attempts > 1) {
          message.textContent = `Incorrect (${attempts} attempts)`;
        } else {
          message.textContent = `Incorrect (${attempts} attempt)`;
          elMsg.classList.remove("msg-correct");
          elMsg.classList.remove("msg-show");
          elMsg.classList.add("msg-wrong");
          makeMsgVis();
        }
      }
    }
  } else {
    elMsg.classList.remove("msg-correct");
    elMsg.classList.remove("msg-show");
    elMsg.classList.add("msg-wrong");
    message.textContent = "❌ You've seen the answer.";
  }
}

// FUNCTION: SHOW ANSWER --------------------

function showAnswer() {
  answShown = true;
  elMsg.classList.remove("msg-wrong");
  elMsg.classList.remove("msg-correct");
  elMsg.classList.add("msg-show");
  message.textContent = `${solution}`;
  makeMsgVis();
}

// FUNCTION: GENERATE RANDOM OPERATOR FROM CHECKED

function newRandomOperator() {
  checkCheckboxes();
  let checkedOps = [];
  if (checkAdd.checked === true) checkedOps.push("+");
  if (checkSub.checked === true) checkedOps.push("−");
  if (checkMul.checked === true) checkedOps.push("×");
  if (checkDiv.checked === true) checkedOps.push("÷");
  if (checkMod.checked === true) checkedOps.push("R");
  op = checkedOps[Math.floor(Math.random() * checkedOps.length)];
  return op;
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

// FUNCTION: CLOSE MODAL --------------------

function closeModal() {
  modal.classList.add("hidden");
  modalOverlay.classList.add("hidden");
}
