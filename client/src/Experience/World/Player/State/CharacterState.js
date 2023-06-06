import Experience from "../../../Experience.js";

export default class State {
    constructor(parent) {
        this._parent = parent;
        this.experience = new Experience();
    }

    Enter() {}
    Exit() {}
    Update() {}
}