class Stack {
  constructor(size) {
    this.array = new Array(size);
    this.topIndex = -1;
  }

  isEmpty() {
    return this.topIndex == -1;
  }

  push(value) {
    this.topIndex++;
    this.array[this.topIndex] = value;
  }

  pop() {
    if (!this.isEmpty()) {
      this.topIndex--;
    }
  }
}

function parenthesisMatching(str) {
  let stack = new Stack(str.length);
  for (let i = 0; i < str.length; i++) {
    if (str[i] == "(") {
      stack.push(str[i]);
    } else if (str[i] == ")") {
      if (stack.isEmpty()) {
        return false;
      }
      stack.pop();
    }
  }
  if (stack.isEmpty()) {
    return true;
  } else {
    return false;
  }
}

function clr() {
  document.querySelector("#calculatorscreen").value = document
    .querySelector("#calculatorscreen")
    .value.slice(
      0,
      document.querySelector("#calculatorscreen").value.length - 1
    );
}
function ClickHandel(Value) {
  document.querySelector("#calculatorscreen").value += Value;
}
function Clear() {
  document.querySelector("#calculatorscreen").value = "";
}
function Calculate_Value(op, num1, num2) {
  switch (op) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "x":
      return num1 * num2;
    case "/":
      if (num2 !== 0) {
        return num1 / num2;
      } else {
        throw new Error("Cannot divide by zero");
      }
  }
}
function Handle_Bracket(Index_1, Index_2) {
  let Sliced_String = document
    .querySelector("#calculatorscreen")
    .value.slice(Index_1, Index_2 + 1);
  let Numbers = Sliced_String.split(/[\+\-\x\/\(\)]/g);

  for (let index = 0; index < Numbers.length; index++) {
    if (Numbers[index] != "") {
      Numbers[index] = Number.parseFloat(Numbers[index]);
    }
  }
  Numbers = Numbers.filter((Value) => {
    return Value != "";
  });

  let Operators = Sliced_String.split(/[\d\.\(\)]/g).filter((val) => {
    return val != "";
  });

  let Calculated_Value = Calculate_Value(Operators[0], Numbers[0], Numbers[1]);
  for (let index = 1; index < Operators.length; index++) {
    Calculated_Value = Calculate_Value(
      Operators[index],
      Calculated_Value,
      Numbers[index + 1]
    );
  }
  Sliced_String = Sliced_String.replace(Sliced_String, Calculated_Value);
  console.log(Sliced_String);
  return Sliced_String;
}
function replaceAt(string, start, end, replacement) {
  return string.substring(0, start) + replacement + string.substring(end);
}

function Calculate() {
  let Calculated_Value = 0;
  let Input_Value = document.querySelector("#calculatorscreen").value;
  if (Input_Value.includes("(")) {
    if (parenthesisMatching(Input_Value)) {
      let Index_1 = 0;
      let Index_2 = 0;
      for (let i = 0; i < Input_Value.length; i++) {
        if (Input_Value[i] == "(") {
          Index_1 = i;
        } else if (Input_Value[i] == ")") {
          Index_2 = i;
        }
      }

      Input_Value = replaceAt(
        Input_Value,
        Index_1,
        Index_2 + 1,
        Handle_Bracket(Index_1, Index_2)
      );
    }
  }
  let Numbers = Input_Value.split(/[\+\-\x\/\(\)]/g);
  for (let index = 0; index < Numbers.length; index++) {
    Numbers[index] = Number.parseFloat(Numbers[index]);
  }
  console.log(Numbers);

  let Operators = Input_Value.split(/[\d\.]/g).filter((val) => {
    return val != "";
  });
  console.log(Operators);

  Calculated_Value = Calculate_Value(Operators[0], Numbers[0], Numbers[1]);
  for (let index = 1; index < Operators.length; index++) {
    Calculated_Value = Calculate_Value(
      Operators[index],
      Calculated_Value,
      Numbers[index + 1]
    );
  }
  document.querySelector("#calculatorscreen").value = Calculated_Value;
}
