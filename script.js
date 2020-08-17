let number = "",
  num1 = "",
  num2 = "",
  operator = "",
  total = "",
  aux = "",
  arrOperator = [];

$(document).ready(() => {
  $("button").on("click", function (e) {
    let btn = e.target.innerHTML.trim();
    handleInput(btn);
    aux = btn;
  });
});

function handleInput(input) {
  let isDecimal = input == ".";

  if (isNegative(input)) {
    handleDigits(input * -1);
  } else if (isNumber(input) || isDecimal) {
    handleDigits(input);
  } else if (input == "Clear") {
    clear();
  } else if (isOperator(input)) {
    handleOperations(input);
  } else {
    handleNumber(number);
    handleOperator(input);
  }
}

function handleOperations(input) {
  arrOperator.push(input);
  if (num1 < 0 || number < 0 || num2 < 0) {
    handleNumber(number);
    handleOperator(arrOperator[arrOperator.length - 2]);
  } else {
    handleNumber(number);
    handleOperator(input);
  }
  number = "";
  displayButton(input);
}

function handleDigits(input) {
  let beginWithZero = number[0] == 0 && input == "0";
  let includeDot = number.includes(".") && input == ".";

  if (beginWithZero || includeDot) {
    displayButton(number);
  } else {
    number += input;
    displayButton(number);
  }
}

function clear() {
  (num1 = ""), (num2 = ""), (operator = ""), (total = ""), (number = "");
  displayButton(0);
}

function isOperator(num) {
  return num === "+" || num === "-" || num === "/" || num === "*";
}

function isNumber(num) {
  return !isNaN(num);
}

function isNegative(num) {
  return (
    (aux === "-" && isNumber(num) && arrOperator.length > 1) ||
    (aux === "" && isNumber(num) && arrOperator[0] === "-")
  );
}

function handleNumber(num) {
  if (num1 === "") {
    num1 = num;
  } else {
    num2 = num;
  }
  displayButton(num);
}

function handleOperator(ope) {
  if (operator === "") {
    operator = ope.trim();
  } else if (num2 !== "") {
    handleTotal();
    operator = ope.trim();
  }

  if (ope != "-") {
    operator = ope.trim();
  }
  console.log(arrOperator, num1, num2);
}

function handleTotal() {
  switch (operator) {
    case "+":
      total = +num1 + +num2;
      displayButton(total);
      break;
    case "-":
      total = +num1 - +num2;
      displayButton(total);
      break;
    case "/":
      if (num1 == 0) {
        total = 0;
      } else {
        total = +num1 / +num2;
      }
      displayButton(total);
      break;
    case "*":
      total = +num1 * +num2;
      displayButton(total);
      break;
  }
  updateVariables();
}

function displayButton(btn) {
  $("#display").text(btn);
}

function updateVariables() {
  num1 = total;
  num2 = "";
  arrOperator = [];
}
