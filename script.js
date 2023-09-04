const mainAns = document.getElementById('mainAns');
const prevAns = document.getElementById('prevAns');

let currentInput = '';
let previousInput = '';
let currentOperator = '';

function updateDisplay() {
    mainAns.innerText = currentInput || previousInput || '0';
    prevAns.innerText = previousInput + (currentOperator || '') + (currentInput || '');
}

function calculate() {
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    switch (currentOperator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if (num2 === 0) {
                return 'Division by zero is not allowed';
            }
            return num1 / num2;
        default:
            return num2; // If no operator, return the current number
    }
}

const inputButtons = document.querySelectorAll('.inputButton');
inputButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const buttonText = button.innerText;

        if (/\d/.test(buttonText)) {
            currentInput += buttonText;
        } else if (buttonText === '.' && !currentInput.includes('.')) {
            currentInput += buttonText;
        } else if (buttonText === 'AC') {
            currentInput = '';
            previousInput = '';
            currentOperator = '';
        } else if (buttonText === 'DEL') {
            currentInput = currentInput.slice(0, -1);
        } else if (/\+|-|\*|\//.test(buttonText)) {
            if (currentInput !== '') {
                previousInput = currentInput;
                currentInput = '';
                currentOperator = buttonText;
            }
        } else if (buttonText === '=') {
            if (previousInput !== '' && currentInput !== '' && currentOperator !== '') {
                const result = calculate();
                currentInput = result.toString();                 
                previousInput = '';
                currentOperator = '';
            }
        }

        updateDisplay();
    });

    button.addEventListener('mouseover', () => {
        button.style.backgroundColor = "#46B2E0";
    }, false);

    button.addEventListener('mouseout', () => {
        button.style.backgroundColor = ""; // Reset to the default background color
    }, false);
});
