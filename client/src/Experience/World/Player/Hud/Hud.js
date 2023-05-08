import Chat from "./Chat.js";


export default class Hud {
    constructor() {
        this.chat = new Chat()

    }

    update() {
        this.chat.update()
    }
}