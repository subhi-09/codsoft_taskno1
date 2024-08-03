const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const calculateButton = document.getElementById('calculate');
const clearButton = document.getElementById('clear');

let currentInput = '';
let firstValue = null;
let operator = null;

function updateDisplay() {
  display.value = currentInput === '' ? '0' : currentInput;
}

function handleNumberClick(number) {
  currentInput += number;
  updateDisplay();
}

function handleOperatorClick(op) {
  if (currentInput !== '') {
    if (firstValue === null) {
      firstValue = parseFloat(currentInput);
      operator = op;
      currentInput = '';
    } else {
      performCalculation();
      operator = op;
    }
  }
}

function performCalculation() {
  const secondValue = parseFloat(currentInput);
  switch (operator) {
    case '+':
      firstValue += secondValue;
      break;
    case '-':
      firstValue -= secondValue;
      break;
    case '*':
      firstValue *= secondValue;
      break;
    case '/':
      if (secondValue !== 0) {
        firstValue /= secondValue;
      } else {
        alert('Error: Division by zero');
      }
      break;
  }
  currentInput = '';
  updateDisplay();
}

function handleCalculateClick() {
  if (operator && currentInput !== '') {
    performCalculation();
    operator = null;
  }
}

function handleClearClick() {
  currentInput = '';
  firstValue = null;
  operator = null;
  updateDisplay();
}

numberButtons.forEach(button => {
  button.addEventListener('click', () => handleNumberClick(button.textContent));
});

operatorButtons.forEach(button => {
  button.addEventListener('click', () => handleOperatorClick(button.textContent));
});

calculateButton.addEventListener('click', handleCalculateClick);
clearButton.addEventListener('click', handleClearClick);
