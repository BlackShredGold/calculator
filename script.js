// Arithmetic and variable init
let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;
let posToNeg = (number) => -number;
let percent = (number) => number / 10;

let number1 = 0;
let number2 = 0;
let result = 0;
let currentOperator;
let evaluate = false;
let flushDisplay = false;

const display = document.getElementById('display');
const currentNumber = document.createTextNode('');

function assignOperands() {
    if (number1 === 0) {
        number1 = parseFloat(currentNumber.textContent);
    }
    else {
        number2 = parseFloat(currentNumber.textContent);
    }
}

function operate(a, operator, b) {
    switch(operator) {
        case '+':
            return add(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case 'x':
            return multiply(a, b);
            break;
        case '÷':
            return divide(a, b);
            break;
        default:
            return 'ERROR';
    }
}

// Button functionality
function clearAll() {
    currentNumber.textContent = '';
    number1 = 0;
    number2 = 0;
    result = 0;
    flushDisplay = false;
}

function plusMinusButton() {
    let number = document.getElementById('display').textContent;
    if (!isNaN(currentNumber.textContent)) {
        currentNumber.textContent = posToNeg(number);
        display.appendChild(currentNumber);
    }
}

function percentButton() {
    let number = document.getElementById('display').textContent;
    if (!isNaN(currentNumber.textContent)) {
        currentNumber.textContent = percent(number)
        if (currentNumber.textContent.length > 9) {
            currentNumber.textContent = percent(number).toFixed(7);
        }
        display.appendChild(currentNumber);
    
    }
}

function equalsButton() {
    number2 = parseFloat(currentNumber.textContent);
    if (operate(number1, currentOperator, number2).toString().length > 9) {
        currentNumber.textContent = operate(number1, currentOperator, number2).toFixed(7);
    }
    else {
        currentNumber.textContent = operate(number1, currentOperator, number2);
    }
    result = parseFloat(currentNumber.textContent);
    number1 = result;
    evaluate = false;
}

const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');

//Checks to see if previously stored info should persist on screen 
function shouldClear() {
    if (isNaN(parseFloat(currentNumber.textContent))) {
        currentNumber.textContent = '';
    }
}

function shouldAssignToNumber() {
    if (!isNaN(parseFloat(currentNumber.textContent))) {
        number1 = parseFloat(currentNumber.textContent);
    }
}

//------------------------------------------------

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
    if (!(currentNumber.textContent.length > 9)) {
            if (flushDisplay === true) {
                currentNumber.textContent = '';
                flushDisplay = false;
                evaluate = true;
            }
            shouldClear();
            currentNumber.textContent += button.value;
            display.appendChild(currentNumber);
        }
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (evaluate === true) {
            equalsButton(); 
            currentOperator = button.value;
            flushDisplay = true;
        }
        else {
            currentOperator = button.value;
            shouldAssignToNumber();
            currentNumber.textContent = '';
            currentNumber.textContent = button.value;
            evaluate = true;
        }
        console.log("evaluate:" + evaluate);
        console.log("flushDisplay:" + flushDisplay)
    });
});