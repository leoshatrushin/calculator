const OPERATIONS = ['+', '-', '×', '÷', '='];

let clearOnNext = false;
let errorOnOperation;
let stack;
let previousOperation;

function clear() {
    errorOnOperation = false;
    stack = [{ operation: null, value: 0 }];
    previousOperation = '=';
}
clear();

const buttons = document.querySelector('.buttons');
buttons.addEventListener('click', function (event) {
    const action = event.target.innerText;
    const display = document.querySelector('.display');
    const displayText = display.innerText;

    if (OPERATIONS.includes(action)) {
        clearOnNext = true;
        if (errorOnOperation && action !== '=') {
            clear();
            display.innerText = 'Syntax Error';
            return;
        }

        if (previousOperation == '=') {
            stack[0].value = Number.parseFloat(displayText);
        } else {
            stack.push({
                operation: previousOperation,
                value: Number.parseFloat(displayText),
            });
        }
        previousOperation = action;

        if (action === '=') {
            display.innerText = evalStack();
        } else {
            errorOnOperation = true;
        }
        return;
    } else {
        errorOnOperation = false;
    }

    if (/\d/.test(action)) {
        if (displayText === '0' || clearOnNext) {
            display.innerText = action;
            clearOnNext = false;
        } else {
            display.innerText += action;
        }
    } else if (action === 'C') {
        display.innerText = '0';
        clear();
    } else if (action === '←') {
        if (displayText.length === 1 || clearOnNext) {
            display.innerText = '0';
        } else {
            display.innerText = displayText.slice(0, -1);
        }
    }
});

function evalStack() {
    for (let i = 1; i < stack.length; i++) {
        if (stack[i].operation === '×') {
            stack[i - 1].value *= stack[i].value;
            stack.splice(i, 1);
            i--;
        } else if (stack[i].operation === '÷') {
            if (stack[i].value === 0) {
                clear();
                return 'Divide by 0 Error';
            }
            stack[i - 1].value /= stack[i].value;
            stack.splice(i, 1);
            i--;
        }
    }
    for (let i = 1; i < stack.length; i++) {
        if (stack[i].operation === '+') {
            stack[i - 1].value += stack[i].value;
            stack.splice(i, 1);
            i--;
        } else if (stack[i].operation === '-') {
            stack[i - 1].value -= stack[i].value;
            stack.splice(i, 1);
            i--;
        }
    }
    return stack[0].value;
}
