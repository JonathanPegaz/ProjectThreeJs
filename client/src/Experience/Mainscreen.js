import EventEmitter from "./Utils/EventEmitter.js";

export default class Mainscreen extends EventEmitter{
    constructor() {
        super()
        this.pseudo = null
    }

    showInput()
    {
        // Ajouter l'input pour rentrer le pseudo
        const inputContainer = document.createElement('div')
        inputContainer.style.position = 'absolute'
        inputContainer.style.top = '50%'
        inputContainer.style.left = '50%'
        inputContainer.style.transform = 'translate(-50%, -50%)'
        inputContainer.style.display = 'flex'
        inputContainer.style.flexDirection = 'column'
        inputContainer.style.alignItems = 'center'

        const inputLabel = document.createElement('label')
        inputLabel.innerText = 'Entrez votre pseudo :'
        inputLabel.style.marginBottom = '10px'
        inputLabel.style.fontFamily = 'Arial, sans-serif'
        inputLabel.style.fontSize = '24px'
        inputLabel.style.color = 'white'

        const inputElement = document.createElement('input')
        inputElement.type = 'text'
        inputElement.style.width = '200px'
        inputElement.style.padding = '10px'
        inputElement.style.borderRadius = '5px'
        inputElement.style.border = 'none'
        inputElement.style.background = '#555555'
        inputElement.style.color = 'white'
        inputElement.style.fontFamily = 'Arial, sans-serif'
        inputElement.style.fontSize = '18px'
        inputElement.style.textAlign = 'center'

        const submitButton = document.createElement('button')
        submitButton.type = 'submit'
        submitButton.innerText = 'Valider'
        submitButton.style.padding = '10px'
        submitButton.style.marginTop = '20px'
        submitButton.style.borderRadius = '5px'
        submitButton.style.border = 'none'
        submitButton.style.background = '#555555'
        submitButton.style.color = 'white'
        submitButton.style.fontFamily = 'Arial, sans-serif'
        submitButton.style.fontSize = '18px'
        submitButton.style.cursor = 'pointer'

        this.form = document.createElement('form')

        inputContainer.appendChild(inputLabel)
        inputContainer.appendChild(inputElement)
        inputContainer.appendChild(submitButton)
        this.form.appendChild(inputContainer)
        document.body.appendChild(this.form)

        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.pseudo = inputElement.value;
            this.trigger('pseudo-entered')
            this.destroy()
        });
    }

    destroy() {
        this.form.remove()
    }
}