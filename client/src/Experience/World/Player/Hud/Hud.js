import Chat from "./Chat.js";
import QuestWindow from "./QuestWindow.js";


export default class Hud {
    constructor() {
        this.chat = new Chat()
        this.QuestWindow = new QuestWindow()
    }

    update() {
        this.chat.update()
        this.QuestWindow.update()
    }

    destroy() {
        this.chat.destroy()
    }
}