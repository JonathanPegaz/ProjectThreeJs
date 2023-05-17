import npcList from "./npcList.js";
import Icons from "../../Interface/Icons.js";


export default class NpcController {
    constructor() {
        this.npcs = npcList

        this.list = {}
        this.createNpc()
    }

    createNpc() {
        this.npcs.forEach(npc => {
            const npcModel = new npc.type(npc)
            if(npcModel.dialog.length > 0) {
                npcModel.speakIcon = new Icons(npcModel, 'speak')
            }
            this.store(npcModel)
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
        for (const [key, value] of Object.entries(this.list)) {
            const intersects = raycaster.intersectObject(value.hitbox);
            if (intersects.length > 0) {
                value.interact();
            }
        }
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