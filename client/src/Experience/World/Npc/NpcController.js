import npcList from "./npcList.js";


export default class NpcController {
    constructor() {
        this.npcs = npcList

        this.npcs_list = []

        this.createNpc()
    }

    createNpc() {
        this.npcs.forEach(npc => {
            const npcModel = new npc.type(npc)
            this.npcs_list.push(npcModel)
        })
    }

    update() {
        this.npcs_list.forEach(npc => {
            npc.update()
        })
    }

    destroy() {
        this.npcs_list.forEach(npc => {
            npc.destroy()
        })
    }

}