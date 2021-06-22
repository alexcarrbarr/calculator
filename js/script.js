var visor = document.getElementById('visor')

function resetVisor() {
    visor.value = '0'
}

function deleteLastCharacterVisor() {
    let textVisor = visor.value
    if (textVisor != '0') {
        let lengthVisor = textVisor.length
        if (lengthVisor == 1) {
            resetVisor()
        } else {
            visor.value = textVisor.substr(0, lengthVisor - 1)
        }
    }
}

function addToVisor(key) {
    let textVisor = visor.value
    if ((key != '.') || (key == '.' && textVisor.indexOf('.') == -1)) {
        if ((key != '.') && (textVisor == '0')) {
            visor.value = ''
        }
        visor.value += ((typeof key != 'string') ? key.toString() : key)
    }
}

document.addEventListener('keydown', function (event) {
    // console.log(event);
    let arrayVisorKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
    let arrayOperatorKeys = ['+', '-', '*', '/', '%']
    let arrayControlKeys = ['Delete', 'Backspace']
    let arrayInputKeys = [...arrayVisorKeys, ...arrayOperatorKeys, ...arrayControlKeys]
    let enteredKey = event.key
    if (arrayInputKeys.includes(enteredKey)) {
        if (arrayVisorKeys.includes(enteredKey)) {
            addToVisor(enteredKey)
        }
        if (arrayControlKeys.includes(enteredKey)) {
            if (enteredKey == 'Delete') {
                resetVisor()
            }
            if (enteredKey == 'Backspace') {
                deleteLastCharacterVisor()
            }
        }
        if (arrayOperatorKeys.includes(enteredKey)) {

        }
    }
});