let numberButtons = document.querySelectorAll(".button.number");
let functionButtons = document.querySelectorAll(".button.operator");
let upperLine = document.querySelector(".upperLine");
let lowerLine = document.querySelector(".lowerLine");
let equalButton = document.querySelector(".button.equal");
let clearButton = document.querySelector(".button.clear");

let max = Number.MAX_SAFE_INTEGER;
let min = Number.MIN_SAFE_INTEGER;

let state = {
  variableA: true,
  operate: false,
  variableB: false,
};
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
  operatorSign: "",
  variableB: "",
};
let lowerLineStack = {
  answer: "",
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
function addDecimal(variableA, variableB) {
  let variable = variableA * 10 + +variableB;
  return variable;
}
function refreshUpperLine() {
  let result = `${upperLineStack.variableA} ${upperLineStack.operatorSign} ${upperLineStack.variableB}`;
  upperLine.textContent = result;
}
function refreshLowerLine() {
  let result = `${lowerLineStack.answer}`;
  lowerLine.textContent = result;
}
function checkLimitInput(input) {
  return input < max / 2 && input > min / 2;
}
function state1(numberButton) {
  let currentVariable = upperLineStack.variableA;
  if (isNaN(currentVariable)) {
    currentVariable = "";
  }
  let variable = Number(numberButton.dataset.number);
  let output = addDecimal(currentVariable, variable);
  if (checkLimitInput(output)) {
    upperLineStack.variableA = output;
    refreshUpperLine();
  }
}
function state2(functionButton) {
  let operate = functionButton.dataset.function;
  let operator = functionButton.textContent;
  if (operate in operatorClass) {
    upperLineStack.operator = operate;
    upperLineStack.operatorSign = operator;
    refreshUpperLine();
  }
}
function state3(numberButton) {
  let currentVariable = upperLineStack.variableB;
  let variable = Number(numberButton.dataset.number);
  let output = addDecimal(currentVariable, variable);
  if (checkLimitInput(output)) {
    upperLineStack.variableB = output;
    refreshUpperLine();
  }
}
function checkBeforeState4() {
  if (upperLineStack.operate == "") {
    return false;
  }
  if (upperLineStack.variableA == "") {
    return false;
  }
  if (upperLineStack.variableB == "") {
    return false;
  }
  return true;
}
function state4(equalButton) {
  if (checkBeforeState4()) {
    let variableA = upperLineStack.variableA;
    let variableB = upperLineStack.variableB;
    let operator = upperLineStack.operator;
    let answer = operate(variableA, variableB, operator);
    lowerLineStack.answer = parseFloat(answer.toFixed(3));
    refreshLowerLine();
    changeStateVariableA();
    upperLineStack.variableA = lowerLineStack.answer;
    upperLineStack.variableB = "";
  }
}

function clearScreenAndState() {
  upperLineStack.variableA = "Enter a number";
  upperLineStack.variableB = "";
  upperLineStack.operator = "";
  upperLineStack.operatorSign = "";
  lowerLineStack.answer = "0";
  changeStateVariableA();
  refreshUpperLine();
  refreshLowerLine();
}
function changeStateOperate() {
  state.variableA = false;
  state.variableB = false;
  state.operate = true;
}
function changeStateVariableA() {
  state.variableA = true;
  state.variableB = false;
  state.operate = false;
}
function changeStateVariableB() {
  state.variableA = false;
  state.variableB = true;
  state.operate = false;
}

console.table(state);
numberButtons.forEach((numberButton) => {
  numberButton.addEventListener("click", function () {
    if (state.variableA == true) {
      state1(this);
    }
  });
});
functionButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    if (state.variableB == true) {
      state4(this);
    }
    if (state.operate == true) {
      state2(this);
    }
    if (state.variableA == true) {
      changeStateOperate();
      state2(this);
    }
  });
});
numberButtons.forEach((numberButton) => {
  numberButton.addEventListener("click", function () {
    if (state.variableB == true) {
      state3(this);
    }
    if (state.operate == true) {
      changeStateVariableB();
      state3(this);
    }
  });
});

equalButton.addEventListener("click", function (equalButton) {
  // state 4
  if (state.variableB == true) {
    state4(this);
  }
});

clearButton.addEventListener("click", function () {
  clearScreenAndState();
});
