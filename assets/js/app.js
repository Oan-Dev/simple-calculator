class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement 
        this.clear()
    }
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1) //  return 1 nouveau tableau en le number de l'index situé à droite vers la sortie (-1)
    }
    appendNumber(number) { // when user select number
        if( number === '.' && this.currentOperand.includes('.')) return 
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation) { // when user select operation
        if(this.currentOperand === '') return
        if(this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+' : computation = prev + current
            break
            case '-' : computation = prev - current
            break
            case '*' : computation = prev * current
            break
            case '/' : computation = prev / current
            break
            default:
            return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''

    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        const floatNumber = parseFloat(number)
        let integerDisplay 
        if(isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits : 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits} `
        }else  {
            return integerDisplay
        }
        // if (isNaN(floatNumber)) return ''
        // return floatNumber.toLocaleString('en')
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand) // first display in current display
        if(this.operation != null) {
            // When user select operrator => display above on previous display
          this.previousOperandTextElement.innerText = 
               ` ${this.getDisplayNumber(this.previousOperand) } ${this.operation}`
        }else {
           this.previousOperandTextElement.innerText = ''
        }
    }
}

const numberButtons= document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButtons = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement= document.querySelector('[data-previous-operand]');
const currentOperandTextElement= document.querySelector('[data-current-operand]');


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

 /**
 Loop for each operation with the addEventListener. 
 Chaque addEventListener entraine une fonction associée 
 pour effectuer le calcul 
 
 */

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => { 
    calculator.compute()
    calculator.updateDisplay()
})


allClearButton.addEventListener('click', button => { 
    calculator.clear()
    calculator.updateDisplay()
})

deleteButtons.addEventListener('click', button => { 
    calculator.delete()
    calculator.updateDisplay()
})

