import npcList from "./npcList.js";


export default class NpcController {
    constructor() {
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
    }

}