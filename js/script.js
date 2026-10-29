let currentInput = '0';
let previousInput = '';
let operator = null;

const currentScreen = document.getElementById('current-op');
const previousScreen = document.getElementById('previous-op');

function updateScreen() {
  currentScreen.innerText = currentInput;
  if (operator !== null) {
    previousScreen.innerText = `${previousInput} ${getOperatorSymbol(operator)}`;
  } else {
    previousScreen.innerText = '';
  }
}

function appendNumber(number) {
  if (number === '.' && currentInput.includes('.')) return;
  if (currentInput === '0' && number !== '.') {
    currentInput = number;
  } else {
    currentInput += number;
  }
  updateScreen();
}

function appendOperator(op) {
  if (currentInput === '' && op !== '-') return;
  
  if (previousInput !== '') {
    calculate();
  }
  
  operator = op;
  previousInput = currentInput;
  currentInput = '0';
  updateScreen();
}

function calculate() {
  let computation;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '/':
      computation = current === 0 ? 'Error' : prev / current;
      break;
    case '%':
      computation = (prev * current) / 100;
      break;
    default:
      return;
  }

  currentInput = computation.toString();
  operator = null;
  previousInput = '';
  updateScreen();
}

function clearAll() {
  currentInput = '0';
  previousInput = '';
  operator = null;
  updateScreen();
}

function deleteDigit() {
  if (currentInput.length === 1 || currentInput === 'Error') {
    currentInput = '0';
  } else {
    currentInput = currentInput.slice(0, -1);
  }
  updateScreen();
}

function getOperatorSymbol(op) {
  switch (op) {
    case '*': return '×';
    case '/': return '÷';
    default: return op;
  }
}