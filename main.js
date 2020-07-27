function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0){
        alert('Wait. That\'s illegal.');
        return 0;
    }
    return a / b;
}

const numberButtons = Array.from(document.querySelectorAll('.number'));
const displayBottom = document.querySelector('#display-bottom');
const displayTop = document.querySelector('#display-top');
const deleteButton = document.querySelector('#del');
// const addButton = document.querySelector('#add');
// const subtractButton = document.querySelector('#subtract');
// const multiplyButton = document.querySelector('#multiply');
// const divideButton = document.querySelector('#divide');
const arithmeticButtons = Array.from(document.querySelectorAll('.arithmetic'));
const equalButton = document.querySelector('#equal');
const clearButton = document.querySelector('#clear');

numberButtons.forEach(button => button.addEventListener('click', addToDisplay));
arithmeticButtons.forEach(button => button.addEventListener('click', addOperator));
deleteButton.addEventListener('click', deleteFromDisplay);
equalButton.addEventListener('click', operate);
clearButton.addEventListener('click', clearScreen);

function addToDisplay() {
    displayBottom.innerText += this.innerText;
}

function deleteFromDisplay() {
    let displayTextTop = displayBottom.innerText;
    if (displayTextTop.length > 0) {
        displayBottom.innerText = displayTextTop.slice(0, displayTextTop.length - 1);
    }
}

function addOperator() {
    let displayTextTop = displayBottom.innerText;
    let lastChar = displayTextTop[displayTextTop.length - 1];
    // let regex = new RegExp('^\d');
    // console.log(displayTextTop[displayTextTop.length - 1]);
    // console.log(regex.test(displayTextTop[displayTextTop.length - 1]));
    if (lastChar === '+' || lastChar === '-' || lastChar === '/' || lastChar === 'x'){
        deleteFromDisplay();
    }
    displayBottom.innerText += " " + this.innerText;
    moveToTop();
    deacivateButtons();
}

function moveToTop() {
    displayTop.innerText = displayBottom.innerText;
    displayBottom.innerText = '';
}

function deacivateButtons() {
    arithmeticButtons.forEach(button => button.removeEventListener('click', addOperator));
}
function activateButtons() {
    arithmeticButtons.forEach(button => button.addEventListener('click', addOperator));
}
function operate() {
    let displayTextTop = displayTop.innerText;
    let firstNumberString = displayTextTop.slice(0, displayTextTop.length - 2);
    let firstNumber = Number(firstNumberString);

    let operator = displayTextTop.slice(displayTextTop.length - 1);

    let secondNumberString = displayBottom.innerText;
    let secondNumber = Number(secondNumberString);

    let result = 0;
    switch(operator) {
        case '+':
            result = add(firstNumber, secondNumber);
            break;
        case '-':
            result = subtract(firstNumber, secondNumber);
            break;
        case 'x':
            result = multiply(firstNumber, secondNumber);
            break;
        case '/':
            result = divide(firstNumber, secondNumber);
            break;
    }
    displayResult(result);
    activateButtons();
}

function displayResult(result) {
    displayBottom.innerText = result;
    displayTop.innerText = result;
}

function clearScreen() {
    displayBottom.innerText = '';
    displayTop.innerText = '';
    activateButtons();
}