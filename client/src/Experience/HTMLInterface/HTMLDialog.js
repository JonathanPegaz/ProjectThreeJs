

export default class HTMLDialog {
    constructor() {
        this.dialogContainer = document.createElement('div');
        this.dialogContainer.id = 'dialog-container';
        this.dialogContainer.classList.add('dialog-container');
    }

    open(dialog) {
        this.clearDialog();

        for (let i = 0; i < dialog.length; i++) {
            const paragraph = document.createElement('p');
            paragraph.textContent = dialog[i];
        }

        this.dialogContainer.style.display = 'block';
    }

    clearDialog() {
        while (this.dialogContainer.firstChild) {
            this.dialogContainer.removeChild(this.dialogContainer.firstChild);
        }
    }

    close() {
        this.clearDialog();
        this.dialogContainer.style.display = 'none';
    }

    destroy() {
        this.clearDialog();
        this.dialogContainer.remove();
    }
}