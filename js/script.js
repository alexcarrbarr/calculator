// Global variables.
var display = document.getElementById('display')
var actionOperator = false
var operating01 = ''
var operating02 = ''
var operator = ''
var total = 0

// Function to reset the global vars
// associated to the last operation and the current result.
function resetOperationVariables() {
    operating01 = ''
    operating02 = ''
    operator = '+'
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

// Function to apply a mathematical operation to 2 given numbers.
function operate(number01, number02, operation) {
    let result = 0
    // Perform the given mathematical operation.
    switch (operation) {
        case '=':
            result = operate(number01, number02, operator)
            break;
        case 'Enter':
            result = operate(number01, number02, operator)
            break;
        case '+':
            result = number01 + number02
            break;
        case '-':
            result = number01 - number02
            break;
        case '*':
            result = number01 * number02
            break;
        case '/':
            result = number01 / number02
            break;
        default:
            break;
    }
    // Return the calculated result.
    return result
}

// Actions to take when the user press a key.
document.addEventListener('keydown', function (event) {
    // console.log(event);
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
            // If the actionOperator var is true, reset the display.
            if (actionOperator) {
                resetDisplay()
            }
            // Set that an operator character has not been entered.
            actionOperator = false
            // Add the entered character to the display.
            addCharacterToDisplay(enteredKey)
        }
        // Check if the pressed key is a control key.
        if (arrayControlKeys.includes(enteredKey)) {
            // If the entered key is "Delete".
            if (enteredKey == 'Delete') {
                // Set that an operator character has not been entered.
                actionOperator = false
                // Reset the operation variables.
                resetOperationVariables()
                // Reset the display.
                resetDisplay()
            }
            // If the entered key is "Backspace".
            if (enteredKey == 'Backspace') {
                // Delete the last character from the display.
                deleteLastCharacterFromDisplay()
            }
        }
        // Check if the pressed key is a mathematical operator key.
        if (arrayOperatorsKeys.includes(enteredKey)) {
            // Read the entered value in the display as a number
            // and save into the operating01 or operating02 var.
            if (operating01 == '') {
                operating01 = Number(display.value)
            } else if (operating02 == '') {
                operating02 = Number(display.value)
            }
            // Set that an operator character has been entered.
            actionOperator = true
            // Operate the operating01 and operating02 vars according to the entered operator,
            // if the operating01 var was entered before.
            if ((operating01 != '') && (operating02 != '')) {
                total = operate(operating01, operating02, enteredKey)
                // Update the display value.
                display.value = total
                // Update some global vars according to the last operation.
                operating01 = total
                operator = enteredKey
            }
        }
    }
});