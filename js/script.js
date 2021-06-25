/* GLOBAL VARIABLES */

// Element HTML for display
var display = document.getElementById('display')

// operands
var operand01 = 0
var operand02 = 0

// Real operator to apply to operands
var operator = ''

// Current operator entered by user
var currentOperator = ''

// Flag for any operand entered by user
var operandEnteredByUser = false

// Flag for operand 1 entered by user
var operand01Entered = false

// Flag for operand 2 entered by user
var operand02Entered = false

// Flag for operator entered by user
var operatorEntered = false

// Cumulative total of previous operations
var total = 0

// Display keys array
var arrayDisplayKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']

// Operators keys array
var arrayOperatorsKeys = ['+', '-', '*', '/', '%']

// Calculation keys array
var arrayCalculationKeys = ['=', 'Enter']

// Control keys array
var arrayControlKeys = ['Delete', 'Backspace']

// Input keys array
var arrayInputKeys = [...arrayDisplayKeys, ...arrayOperatorsKeys, ...arrayCalculationKeys, ...arrayControlKeys]

// Map for input keys and operation codes
var mapKeysCodes = {
    '+': 'plus',
    '-': 'minus',
    '*': 'times',
    '/': 'divide',
    '%': 'percentage'
}

// Map for operation codes and operations
var mapCodesOperations = {
    'plus': '+',
    'minus': '-',
    'times': '*',
    'divide': '/',
    'percentage': '%',
    'square-root': 'square-root'
}

/* FUNCTIONS */

// Function to reset the global vars
// associated to the last operation and the current result.
function resetOperationVariables() {
    operand01 = 0
    operand02 = 0
    operator = ''
    currentOperator = ''
    operandEnteredByUser = false
    operand01Entered = false
    operand02Entered = false
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

// Function to assign the operation code according to the given key.
function setCodeFromKey(key) {
    return mapKeysCodes[key]
}

// Function to assign the operation according to the operation code.
function setOperationFromCode(code) {
    return mapCodesOperations[code]
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

// Function to take actions about the display, using the given key.
function actionsForDisplay(key) {
    operandEnteredByUser = true

    // If the operatorEntered var is true, reset the display.
    if (operatorEntered) {
        resetDisplay()
    }

    // Add the entered character to the display.
    addCharacterToDisplay(key)

    // Set that an operator has not been entered.
    operatorEntered = false
}

// Function to take actions about controls, using the given key.
function actionsForControls(key) {
    operandEnteredByUser = false
    operatorEntered = false

    // If the entered key is 'Delete'.
    if (key == 'Delete') {
        // Reset the operation variables.
        resetOperationVariables()

        // Reset the display.
        resetDisplay()
    }

    // If the entered key is 'Backspace'.
    if (key == 'Backspace') {
        // Delete the last character from the display.
        deleteLastCharacterFromDisplay()
    }
}

// Function to take actions about operators, using the given code.
function actionsForOperators(code) {
    // Store the entered operator
    currentOperator = setOperationFromCode(code)

    if (operandEnteredByUser) {
        // If the 1st. operanting has not yet been entered, then
        // store the value entered in the display in the operand01 var.
        if (!operand01Entered) {
            operand01 = Number(display.value)
            operand01Entered = true
            operator = currentOperator
        } else {
            // If not, then if the 2nd. operanting has not yet been entered, then
            // store the value entered in the display in the operand02 var.
            operand02 = Number(display.value)
            operand02Entered = true
        }
    }

    // If the 1st. and 2nd. operand have been entered by the user, then
    // perform the calculation with the entered operation.
    if (operandEnteredByUser && operand01Entered && operand02Entered) {
        // Operate the operands with the operator.
        total = operate(operand01, operand02, operator)

        // Update the display value.
        display.value = total

        // Assign the current total to the 1st. operand.
        operand01 = total
        operand01Entered = true
    }

    // Store the current operator as the next operator to use
    operator = currentOperator

    operandEnteredByUser = false
    operatorEntered = true
}

// Function to take actions about perform the calculation.
function actionsForCalculate() {
    if (operandEnteredByUser) {
        // If the 1st. operanting has not yet been entered, then
        // store the value entered in the display in the operand01 var.
        if (!operand01Entered) {
            operand01 = Number(display.value)
            operand01Entered = true
            operator = currentOperator
        } else {
            // If not, then if the 2nd. operanting has not yet been entered, then
            // store the value entered in the display in the operand02 var.
            operand02 = Number(display.value)
            operand02Entered = true
        }
    }

    // If the 1st. operand has been entered, then
    // perform the calculation with the entered operation.
    if (operand01Entered && operand02Entered) {
        // Operate the operands with the operator.
        total = operate(operand01, operand02, operator)

        // Update the display value.
        display.value = total

        // Assign the current total to the 1st. operand.
        operand01 = total
        operand01Entered = true
    }

    operandEnteredByUser = false
}

/* EVENTS */

// Actions to take when the user press a key.
document.addEventListener('keydown', function (event) {
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

        // Check if the pressed key is an operator key.
        if (arrayOperatorsKeys.includes(enteredKey)) {
            // Map the entered key to the corresponding operation code.
            let enteredCode = setCodeFromKey(enteredKey)
            actionsForOperators(enteredCode)
        }

        // Check if the pressed key is an calculation key.
        if (arrayCalculationKeys.includes(enteredKey)) {
            actionsForCalculate()
        }
    }
});