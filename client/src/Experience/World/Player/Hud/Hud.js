import Chat from "./Chat.js";
import QuestWindow from "./QuestWindow.js";
import LootWindow from "./LootWindow.js";


export default class Hud {
    constructor() {
        this.chat = new Chat()
        this.QuestWindow = new QuestWindow()
        this.lootWindow = new LootWindow()
    }

    update() {
        this.chat.update()
    }

    destroy() {
        this.chat.destroy()
    }
}