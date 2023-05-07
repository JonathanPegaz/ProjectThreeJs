import Pseudo from "./Pseudo.js";


export default class Hud {
    constructor() {
        this.pseudo = new Pseudo()
    }

    update() {
        this.pseudo.update()
    }
}