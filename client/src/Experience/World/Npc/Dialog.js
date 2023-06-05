import {CSS2DObject} from "three/addons/renderers/CSS2DRenderer.js";
import Experience from "../../Experience.js";


export default class Dialog {

    constructor(dialog, target) {
        this.experience = new Experience()

        this.dialog = dialog
        this.target = target
        this.currentLine = 0
        this.isStarted = false
        this.isFinished = false
    }

    start() {
        this.experience.controls.pause = true
        this.isStarted = true
        this.setHTML()
        this.setCSS2DObject()
        this.addDialog()
    }

    setHTML() {

        const htmlString = `
          <div class="dialog-content">
              <div class="dialog-chat-icon">
                <img src="icons/tchat_icon.svg" alt="tchat">  
              </div>
              <div class="message-container">
                <p id="dialog-text" class="dialog-text"></p>
              </div>
              <div class="action-container">
                <img src="icons/tchat_arrow_icon.svg" alt="next">
              </div>
          </div>
        `
        this.dialogContainer = document.createElement('div');
        this.dialogContainer.id = 'dialog-container';
        this.dialogContainer.classList.add('dialog-container');
        this.dialogContainer.innerHTML = htmlString;
    }

    setCSS2DObject() {
        this.dialogLabel = new CSS2DObject(this.dialogContainer);
        this.dialogLabel.position.set(0, 1.5, 0);
        this.target.object.add(this.dialogLabel);
    }

    addDialog() {
        const dialogText = this.dialogContainer.querySelector('#dialog-text')
        dialogText.innerHTML = ''
        dialogText.innerHTML = this.getLine()
    }

    getLine() {
        return this.dialog[this.currentLine]
    }

    nextLine() {
        if(this.currentLine < this.dialog.length - 1) {
            this.currentLine++
            this.addDialog()
        } else {
            this.isFinished = true
            this.closeDialog()
        }
    }

    closeDialog() {
        // remove dialog from scene
        this.target.object.remove(this.dialogLabel);
        this.dialogContainer = null
        this.dialogLabel = null
        this.currentLine = 0

        this.experience.controls.pause = false
    }

    destroy() {
        if (this.dialogContainer) {
            this.dialogContainer.remove();
        }
        this.height = null
        this.dialog = null
        this.target = null
        this.currentLine = null
        this.isFinished = null

        this.experience = null
    }
}