const OPERATORS = ['+', '-', '×', '÷', '='];
const display = document.querySelector('.display');

let inputtingFirstOperand;
let inputtingNewOperand;
let firstOperand;
let operator;
let secondOperand;
let buffer;

function clear() {
    inputtingFirstOperand = true;
    inputtingNewOperand = true;
    firstOperand = 0;
    operator = null;
    secondOperand = 0;
    buffer = '0';
}
clear();

function updateFirstOperand(value) {
    if (value == 'Error') {
        firstOperand = null;
    } else {
        firstOperand = Number.parseFloat(value);
    }
}

document.querySelector('.buttons').addEventListener('click', function(event) {
    buttonClick(event.target.innerText);
    rerender();
});

function buttonClick(action) {
    switch (action) {
        case 'C':
            clear();
            break;
        case '←':
            backspaceClick();
            break;
        default:
            if (OPERATORS.includes(action)) {
                operatorClick(action);
            } else if (/\d/.test(action)) {
                digitClick(action);
            }
    }
}

function operatorClick(action) {
    if (inputtingFirstOperand) {
        updateFirstOperand(buffer);
    } else {
        secondOperand = Number.parseFloat(buffer);
    }

    executeLastOperation = !inputtingFirstOperand && !inputtingNewOperand;
    if (action === '=' || executeLastOperation) {
        updateFirstOperand(handleOperation(display));
    }

    if (action === '=') {
        inputtingFirstOperand = true;
    } else {
        operator = action;
        inputtingFirstOperand = false;
    }

    inputtingNewOperand = true;
}

function digitClick(digit) {
    if (inputtingNewOperand || buffer === '0') {
        buffer = digit;
        inputtingNewOperand = false;
    } else {
        buffer = buffer + digit;
    }
}

function backspaceClick() {
    if (buffer.length === 1 || inputtingNewOperand) {
        buffer = '0';
    } else {
        buffer = buffer.slice(0, -1);
    }
}

function handleOperation() {
    if (firstOperand === null) {
        clear();
        buffer = 'Error';
    } else {
        switch (operator) {
            case null:
                buffer = '' + firstOperand;
                break;
            case '+':
                buffer = '' + firstOperand + secondOperand;
                break;
            case '-':
                buffer = '' + firstOperand - secondOperand;
                break;
            case '×':
                buffer = '' + firstOperand * secondOperand;
                break;
            case '÷':
                if (secondOperand === 0) {
                    clear();
                    buffer = 'Error';
                } else {
                    buffer = '' + firstOperand / secondOperand;
                }
                break;
        }
    }
    return buffer;
}

function rerender() {
    display.innerText = buffer;
}
