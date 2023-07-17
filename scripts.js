const OPERATIONS = ['+', '-', '×', '÷', '='];

let inputtingFirstOperand;
let inputtingNewOperand;
let firstOperand;
let operation;
let secondOperand;

function clear() {
    inputtingFirstOperand = true;
    inputtingNewOperand = true;
    firstOperand = 0;
    operation = null;
    secondOperand = 0;
}
clear();

function updateFirstOperand(displayText) {
    if (displayText == 'Error') {
        firstOperand = null;
    } else {
        firstOperand = Number.parseFloat(displayText);
    }
}

const buttons = document.querySelector('.buttons');
buttons.addEventListener('click', function (event) {
    const action = event.target.innerText;
    const display = document.querySelector('.display');
    const displayText = display.innerText;

    if (OPERATIONS.includes(action)) {
        if (inputtingFirstOperand) {
            updateFirstOperand(displayText);
        } else {
            secondOperand = Number.parseFloat(displayText);
        }

        executeLastOperation = !inputtingFirstOperand && !inputtingNewOperand;
        if (action === '=' || executeLastOperation) {
            updateFirstOperand(handleOperation(display));
        }

        if (action === '=') {
            inputtingFirstOperand = true;
        } else {
            operation = action;
            inputtingFirstOperand = false;
        }

        inputtingNewOperand = true;
        return;
    } else if (/\d/.test(action)) {
        if (inputtingNewOperand || displayText === '0') {
            display.innerText = action;
            inputtingNewOperand = false;
        } else {
            display.innerText += action;
        }
    } else if (action === 'C') {
        display.innerText = '0';
        clear();
    } else if (action === '←') {
        if (displayText.length === 1 || inputtingNewOperand) {
            display.innerText = '0';
        } else {
            display.innerText = displayText.slice(0, -1);
        }
    }
});

function handleOperation(display) {
    let result;
    if (firstOperand === null) {
        clear();
        result = 'Error';
    } else if (operation === '+') {
        result = firstOperand + secondOperand;
    } else if (operation === '-') {
        result = firstOperand - secondOperand;
    } else if (operation === '×') {
        result = firstOperand * secondOperand;
    } else if (operation === '÷') {
        if (secondOperand === 0) {
            clear();
            result = 'Error';
        } else {
            result = firstOperand / secondOperand;
        }
    } else {
        result = firstOperand;
    }
    display.innerText = result;
    return result;
}
