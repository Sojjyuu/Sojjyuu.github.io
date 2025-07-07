// Calculator functionality
let currentInput = '';
let operator = '';
let previousInput = '';
let shouldResetDisplay = false;

const display = document.getElementById('display');

/**
 * Updates the calculator display
 * @param {string} value - The value to display
 */
function updateDisplay(value) {
  display.value = value;
}

/**
 * Handles number input
 * @param {string} num - The number to input
 */
function inputNumber(num) {
  if (shouldResetDisplay) {
    currentInput = '';
    shouldResetDisplay = false;
  }
  
  currentInput += num;
  updateDisplay(currentInput);
}

/**
 * Handles decimal point input
 */
function inputDecimal() {
  if (shouldResetDisplay) {
    currentInput = '0';
    shouldResetDisplay = false;
  }
  
  if (currentInput === '') {
    currentInput = '0';
  }
  
  if (!currentInput.includes('.')) {
    currentInput += '.';
    updateDisplay(currentInput);
  }
}

/**
 * Handles operator input
 * @param {string} op - The operator to input (+, -, *, /)
 */
function inputOperator(op) {
  if (currentInput === '' && previousInput === '') return;
  
  if (previousInput !== '' && currentInput !== '' && operator !== '') {
    calculate();
  }
  
  operator = op;
  previousInput = currentInput || previousInput;
  currentInput = '';
  shouldResetDisplay = true;
  updateDisplay(previousInput + ' ' + (op === '*' ? '×' : op) + ' ');
}

/**
 * Performs the calculation
 */
function calculate() {
  if (previousInput === '' || currentInput === '' || operator === '') return;
  
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  let result;
  
  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      if (current === 0) {
        updateDisplay('Error: Cannot divide by zero');
        resetCalculator();
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }
  
  // Format result to avoid floating point precision issues
  result = Math.round(result * 1000000000) / 1000000000;
  
  updateDisplay(result.toString());
  currentInput = result.toString();
  previousInput = '';
  operator = '';
  shouldResetDisplay = true;
}

/**
 * Clears the calculator completely
 */
function clearCalculator() {
  resetCalculator();
  updateDisplay('');
}

/**
 * Resets calculator variables
 */
function resetCalculator() {
  currentInput = '';
  previousInput = '';
  operator = '';
  shouldResetDisplay = false;
}

/**
 * Deletes the last entered digit
 */
function deleteLast() {
  if (currentInput.length > 0) {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
  }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
  const key = event.key;
  
  if (key >= '0' && key <= '9') {
    inputNumber(key);
  } else if (key === '.') {
    inputDecimal();
  } else if (key === '+' || key === '-') {
    inputOperator(key);
  } else if (key === '*') {
    inputOperator('*');
  } else if (key === '/') {
    event.preventDefault();
    inputOperator('/');
  } else if (key === 'Enter' || key === '=') {
    event.preventDefault();
    calculate();
  } else if (key === 'Escape' || key === 'c' || key === 'C') {
    clearCalculator();
  } else if (key === 'Backspace') {
    deleteLast();
  }
});

// Add interactive animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 100);
    });
  });
});

// Initialize display
updateDisplay('');