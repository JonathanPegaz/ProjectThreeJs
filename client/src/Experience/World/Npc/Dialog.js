import {CSS2DObject} from "three/addons/renderers/CSS2DRenderer.js";
import {Box3} from "three";
import Experience from "../../Experience.js";


export default class Dialog {

    constructor(dialog, target) {
        this.experience = new Experience()

        this.dialog = dialog
        this.target = target
        this.currentLine = 0
        this.isFinished = false
    }

    start() {
        this.experience.controls.pause = true

        this.setHTML()
        this.setCSS2DObject()
        this.addDialog()

        this.experience.controls.on('actionDown', () => {

        })
    }

    setHTML() {
        this.dialogContainer = document.createElement('div');
        this.dialogContainer.id = 'dialog-container';
        this.dialogContainer.classList.add('dialog-container');


        this.dialogText = document.createElement('p');
        this.dialogText.id = 'dialog-text';
        this.dialogText.classList.add('dialog-text');

        this.dialogContainer.appendChild(this.dialogText);
    }

    setCSS2DObject() {
        this.dialogLabel = new CSS2DObject(this.dialogContainer);

        const box = new Box3().setFromObject(this.target.object)
        const height = box.max.y - box.min.y

        this.dialogLabel.position.set(0, height + 0.01, 0);
        this.target.object.add(this.dialogLabel);
    }

    addDialog() {
        this.dialogText.innerHTML = ''
        this.dialogText.innerHTML = this.getLine()
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
        // remove the dialog container
        this.dialogContainer.remove();
        this.dialogContainer = null
        this.dialogLabel = null
        this.currentLine = 0
        this.experience.controls.pause = false
    }

    getLine() {
        return this.dialog[this.currentLine]
    }

    destroy() {
        this.dialogContainer.remove();
        this.dialog = null
        this.target = null
        this.currentLine = null
        this.isFinished = null

        this.experience = null
    }
}