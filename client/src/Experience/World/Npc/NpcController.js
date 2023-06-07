import npcList from "./npcList.js";
import Experience from "../../Experience.js";


export default class NpcController {
    constructor() {
        this.experience = new Experience()
        this.npcs = npcList

        this.list = {}
        this.createNpc()
    }

    createNpc() {
        this.npcs.forEach(npc => {
            const npcModel = new npc.type(npc)
            this.store(npcModel)
        })
    }

    deleteAllNpc () {
        this.npcs.forEach(npc => {
            this.list[npc.id].destroy()
            this.delete(npc.id)
        })
    }

    moveNpcToNightPosition() {
        this.npcs.forEach(npc => {
            this.list[npc.id].moveToNightPosition()
        })
    }

    moveNpcToDayPosition() {
        this.npcs.forEach(npc => {
            this.list[npc.id].moveToDayPosition()
        })
    }

    get(id) {
        return this.list[id]
    }

    store(object) {
        this.list[object.id] = object
    }

    delete(id) {
        delete this.list[id]
    }

    catch(raycaster) {
        let hasTrue = false
        for (const [key, value] of Object.entries(this.list)) {
            const intersects = raycaster.intersectObject(value.hitbox);
            value.canInteract = raycaster.intersectObject(value.hitbox).length > 0 || raycaster.intersectObject(value.object).length > 0
            if (value.canInteract) {
                hasTrue = true
            }
        }
        this.experience.localPlayer.isInteractingNpc = hasTrue
    }

    update() {
        for (const [key, value] of Object.entries(this.list)) {
            value.update()
        }
    }

    destroy() {
        for (const [key, value] of Object.entries(this.list)) {
            value.destroy()
        }
        this.list = null
        this.npcs = null
    }

}