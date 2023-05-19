import Environment from './Environment.js'
import Flower from './Flower.js'
import Ocean from "./Ocean.js";
import Landscape from "./Landscape.js";
import RespawnController from "./RespawnController.js";
import InteractiveObjectController from "./InteractiveObject/InteractiveObjectController.js";
import HTMLAnnouncement from "../HTMLInterface/HTMLAnnouncement.js";
import NpcController from "./Npc/NpcController.js";
import Experience from "../Experience.js";
import { assets } from './Environments/assets.js';

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Special
        this.interactiveObject = new InteractiveObjectController()
        this.npc = new NpcController()
        this.htmlAnnouncement = new HTMLAnnouncement()

        for (let asset of assets)
        {
            this[asset.resource] = new asset.type(this.resources.items[asset.resource])
            if (asset.hasPhysics) {
                this[asset.resource].physicsMeshs.forEach((mesh) => {
                    this.experience.physics.createTrimeshShape(mesh)
                })
            }
            // remove physics meshs
            this[asset.resource].physicsMeshs = []
            this.scene.add(this[asset.resource].model)
        }

        this.flower = new Flower()
        this.ocean = new Ocean()
        this.environment = new Environment()
        this.landscape = new Landscape()
        this.respawn = new RespawnController()
    }

    update()
    {
        this.ocean.update()
        this.npc.update()
    }

    destroy() {

        this.experience = null
        this.scene = null
        this.resources = null

        // Assets
        for (let asset of assets)
        {
            this.scene.remove(this[asset.resource].model)
            this[asset.resource].destroy()
            this[asset.resource] = null
        }

        // Special
        this.interactiveObject.destroy()
        this.interactiveObject = null
        this.htmlAnnouncement.destroy()
        this.htmlAnnouncement = null
        this.npc.destroy()
        this.npc = null

        this.flower.destroy()
        this.flower = null

        this.ocean.destroy()
        this.ocean = null
        this.environment.destroy()
        this.environment = null
        this.landscape.destroy()
        this.landscape = null
        this.respawn.destroy()
        this.respawn = null
    }
}