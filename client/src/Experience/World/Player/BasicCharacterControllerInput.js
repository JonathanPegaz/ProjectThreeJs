export default class BasicCharacterControllerInput {
    constructor() {
        this._Init();
    }

    _Init() {
        this._keys = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            space: false,
            shift: false,
        };
        document.addEventListener('keydown', (e) => this._onKeyDown(e), false);
        document.addEventListener('keyup', (e) => this._onKeyUp(e), false);
    }

    _onKeyDown(event) {
        switch (event.keyCode) {
            case 90: // z
                this._keys.forward = true;
                break;
            case 81: // q
                this._keys.left = true;
                break;
            case 83: // s
                this._keys.backward = true;
                break;
            case 68: // d
                this._keys.right = true;
                break;
            /*case 32: // SPACE
                this._keys.space = true;
                break;*/
            case 16: // SHIFT
                this._keys.shift = true;
                break;
        }
    }

    _onKeyUp(event) {
        switch(event.keyCode) {
            case 90: // z
                this._keys.forward = false;
                break;
            case 81: // q
                this._keys.left = false;
                break;
            case 83: // s
                this._keys.backward = false;
                break;
            case 68: // d
                this._keys.right = false;
                break;
            /*case 32: // SPACE
                this._keys.space = false;
                break;*/
            case 16: // SHIFT
                this._keys.shift = false;
                break;
        }
    }

    destroy() {
        document.removeEventListener('keydown', (e) => this._onKeyDown(e), false);
        document.removeEventListener('keyup', (e) => this._onKeyUp(e), false);

        this._keys = null;
    }
}
