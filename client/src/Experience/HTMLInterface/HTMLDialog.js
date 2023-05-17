

export default class HTMLDialog {
    constructor() {
        this.dialog = null
        this.dialogBox = null
        this.dialogText = null
        this.dialogName = null
        this.dialogOptions = null
        this.dialogOption = null
        this.dialogOptionText = null
        this.dialogOptionIcon = null
        this.dialogOptionIconImage = null
        this.dialogOptionIconText = null
    }

    createDialogBox() {
        this.dialogBox = document.createElement('div')
        this.dialogBox.id = 'dialogBox'
        this.dialogBox.classList.add('dialogBox')
        document.body.appendChild(this.dialogBox)
    }
}