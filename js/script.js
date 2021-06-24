// Global variables.
var display = document.getElementById('display')
var operating01 = 0
var operating02 = 0
var operator = ''
var currentOperator = ''
var operating01Entered = false
var operating02Entered = false
var operatorEntered = false
var total = 0
var mapCodeOperators = {
    '=': '=',
    'Enter': '=',
    '+': '+',
    '-': '-',
    '*': '*',
    '/': '/',
    '%': '%',
    'square-root': 'square-root'
}

// Function to reset the global vars
// associated to the last operation and the current result.
function resetOperationVariables() {
    operating01 = 0
    operating02 = 0
    operator = ''
    currentOperator = ''
    operating01Entered = false
    operating02Entered = false
    operatorEntered = false
    total = 0
}

// Function to reset the display.
function resetDisplay() {
    display.value = '0'
}

// Function to delete the last character of the display.
function deleteLastCharacterFromDisplay() {
    let textDisplay = display.value
    if (textDisplay != '0') {
        let lengthDisplay = textDisplay.length
        if (lengthDisplay == 1) {
            resetDisplay()
        } else {
            display.value = textDisplay.substr(0, lengthDisplay - 1)
        }
    }
}

// Function to add a new character to the display.
function addCharacterToDisplay(key) {
    let textDisplay = display.value
    if ((key != '.') || (key == '.' && textDisplay.indexOf('.') == -1)) {
        if ((key != '.') && (textDisplay == '0')) {
            display.value = ''
        }
        display.value += ((typeof key != 'string') ? key.toString() : key)
    }
}

// Function to assign the operator according to the entered key.
function setOperatorFromCode(key) {
    return mapCodeOperators[key]
}

// Function to apply a operation to 2 given numbers.
function operate(number01, number02, operation) {
    let result = 0

    // Perform the given operation.
    if (operation == '+') {
        result = number01 + number02
    } else if (operation == '-') {
        result = number01 - number02
    } else if (operation == '*') {
        result = number01 * number02
    } else if (operation == '/') {
        result = number01 / number02
    } else if (operation == '%') {
        // TODO Implement the percentage operation.
    } else if (operation == 'square-root') {
        // TODO Implement the square root operation.
    }

    // Return the calculated result.
    return result
}

// Function to take actions about the display, using the given value.
function actionsForDisplay(value) {
    // If the operatorEntered var is true, reset the display.
    if (operatorEntered) {
        resetDisplay()
    }

    // Set that an operator has not been entered.
    operatorEntered = false

    // Add the entered character to the display.
    addCharacterToDisplay(value)
}

// Function to take actions about controls, using the given value.
function actionsForControls(value) {
    // If the entered key is 'Delete'.
    if (value == 'Delete') {
        // Reset the operation variables.
        resetOperationVariables()

        // Reset the display.
        resetDisplay()
    }

    // If the entered key is 'Backspace'.
    if (value == 'Backspace') {
        // Delete the last character from the display.
        deleteLastCharacterFromDisplay()
    }
}

// Function to take actions about operators, using the given value.
function actionsForOperators(value) {
    // Store the entered operator
    currentOperator = setOperatorFromCode(value)

    console.log('currentOperator = ' + currentOperator);
    console.log('operator = ' + operator);
    console.log('operatorEntered = ' + operatorEntered);

    // If the 1st. operand has not yet been entered,
    // then store the value entered in the display in the operating01 var.
    if (!operating01Entered) {
        operating01 = Number(display.value)
        operating01Entered = true
        operator = currentOperator
    } else {
        // If this operand has already been entered,
        // then evaluate if the operation is performed.

        // If the current entered operator is '=',
        // then redo the previous operation with the second operand previously entered. 
        // if (currentOperator == '=') {
        //     operating02Entered = true
        // } else {
        if (!operatorEntered) {
            // If not, then if it has been entered a new value in the display,
            // then store it as the 2nd. operand, that is, in the operating02 var.
            operating02 = Number(display.value)
            operating02Entered = true
        }
        // }
    }

    console.log('operating02Entered = ' + operating02Entered);

    // If the 2nd. operand has been entered, then perform the indicated operation.
    if (operating02Entered) {
        console.log('operating01 = ' + operating01);
        console.log('operating02 = ' + operating02);

        // Operate the operatings with the operator.
        total = operate(operating01, operating02, operator)

        console.log('total = ' + total);

        // Update the display value.
        display.value = total

        // Assign the current total to the 1st. operating.
        operating01 = total

        // Reset that the 2nd. operating has not been entered for a next operation.
        operating02Entered = false
    }

    // Store the current operator as the next operator to use,
    // if it's not the '=' operator.
    // if (currentOperator != '=') {
    operator = currentOperator
    operatorEntered = true
    // }
}

// Actions to take when the user press a key.
document.addEventListener('keydown', function (event) {
    // KEYS ARRAYS.
    // Display keys array.
    let arrayDisplayKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']

    // Operators keys array.
    let arrayOperatorsKeys = ['+', '-', '*', '/', '%', '=', 'Enter']

    // Control keys array.
    let arrayControlKeys = ['Delete', 'Backspace']

    // Input keys array.
    let arrayInputKeys = [...arrayDisplayKeys, ...arrayOperatorsKeys, ...arrayControlKeys]

    // Read the pressed key.
    let enteredKey = event.key

    // Check if the pressed key belongs to the arrayInputKeys.
    if (arrayInputKeys.includes(enteredKey)) {
        // Check if the pressed key is a number or character to show on the display.
        if (arrayDisplayKeys.includes(enteredKey)) {
            actionsForDisplay(enteredKey)
        }

        // Check if the pressed key is a control key.
        if (arrayControlKeys.includes(enteredKey)) {
            actionsForControls(enteredKey)
        }

        // Check if the pressed key is a operator key.
        if (arrayOperatorsKeys.includes(enteredKey)) {
            actionsForOperators(enteredKey)
        }
    }
});