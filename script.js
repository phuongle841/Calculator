let numberButtons = document.querySelectorAll(".button.number");
let upperLine = document.querySelector(".upperLine");
console.log();

let state = 1;
// state 1: variableA
// state 2: operator
// state 3: variableB
// state 4: Ans -> state1
//  Ans -> state2
let upperLineStack = {
  variableA: 0,
  operator: "+",
  variableB: 0,
};
let lowerLineStack = {
  Ans: "0",
};
let variableA, variableB, operator;

let operatorClass = {
  add: function (variableA, variableB) {
    return variableA + variableB;
  },
  subtract: function (variableA, variableB) {
    return variableA - variableB;
  },
  multiply: function (variableA, variableB) {
    return variableA * variableB;
  },
  divide: function (variableA, variableB) {
    return variableA / variableB;
  },
};
function operate(variableA, variableB, operator) {
  return operatorClass[operator](variableA, variableB);
}
let test = operate(3, 7, "add");
console.log(test);

function SetUpperLine(string) {
  upperLine.textContent = string;
}
function addDecimal(variableA, variableB) {
  console.log(variableA, variableB);
  return variableA * 10 + variableB;
}
function stringUpperLine(upperLineStack) {
  let result = `${upperLineStack.variableA} ${upperLineStack.operator} ${upperLineStack.variableB}`;
  return result;
}

numberButtons.forEach((numberButton) => {
  numberButton.addEventListener("click", function () {
    let currentVariable = upperLineStack.variableA;
    let variable = Number(numberButton.dataset.number);
    let output = addDecimal(currentVariable, variable);
    upperLineStack.variableA = output;
    SetUpperLine(output);
  });
});
