let numberButtons = document.querySelectorAll(".button.number");
let functionButtons = document.querySelectorAll(".button.operator");
let upperLine = document.querySelector(".upperLine");
let lowerLine = document.querySelector(".lowerLine");


let max = Number.MAX_SAFE_INTEGER;
let min = Number.MIN_SAFE_INTEGER;

let state = 1;
// state 1: variableA
// state 2: operator
// state 3: variableB
// state 4: Ans -> state1
//          Ans -> state2

// C => reset state
// "=" => state 4
let upperLineStack = {
  variableA: "",
  operator: "",
  variableB: "",
};
let lowerLineStack = {
  Ans: "",
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
  operate: function (variableA, variableB, operator) {
    return operatorClass[operator](variableA, variableB);
  },
};

function addDecimal(variableA, variableB) {
  let variable = variableA * 10 + +variableB;
  console.log(variable);
  return variable;
}
function refreshUpperLine() {
  let result = `${upperLineStack.variableA} ${upperLineStack.operator} ${upperLineStack.variableB}`;
  upperLine.textContent = result;
}
function refreshLowerLine() {
  let result = `${upperLineStack.result}`;
  upperLine.textContent = result;
}
function state1(numberButton) {
  let currentVariable = upperLineStack.variableA;
  let variable = Number(numberButton.dataset.number);
  let output = addDecimal(currentVariable, variable);
  upperLineStack.variableA = output;
  refreshUpperLine();
}
function state2(functionButton) {
  let operate = functionButton.dataset.function;
  let operator = functionButton.textContent;
  if (operate in operatorClass) {
    upperLineStack.operator = operator;
    refreshUpperLine();
  }
}
function state3(numberButton) {
  let currentVariable = upperLineStack.variableB;
  let variable = Number(numberButton.dataset.number);
  let output = addDecimal(currentVariable, variable);
  upperLineStack.variableB = output;
  refreshUpperLine();
}

functionButtons.forEach((button) => {
  button.addEventListener("click", function () {
    if (state == 1 || state == 2) {
      state2(this);
      state = 3;
    }
  });
});

numberButtons.forEach((numberButton) => {
  numberButton.addEventListener("click", function () {
    if (state == 1) {
      state1(this);
    }
    if (state == 3) {
      state3(this);
    }
  });
});

function setup() {
  //
}
