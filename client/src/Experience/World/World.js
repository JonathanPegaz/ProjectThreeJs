import Experience from '../Experience.js'
import Environment from './Environment.js'
import Fox from './Fox.js'
import Tree from './Tree.js'
import Flower from './Flower.js'
import Bush from "./Bush.js";
import Ocean from "./Ocean.js";
import Landscape from "./Landscape.js";
import RespawnController from "./RespawnController.js";
import InteractiveObjectController from "./InteractiveObject/InteractiveObjectController.js";
import HTMLAnnouncement from "../HTMLInterface/HTMLAnnouncement.js";
import House from "./House.js";

export default class World
{
    constructor()
    {
        // Default
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.interactiveObject = new InteractiveObjectController()
        this.htmlAnnouncement = new HTMLAnnouncement()

        //Assets
        //this.bush = new Bush()
        //this.fox = new Fox()
        this.tree = new Tree()
        this.flower = new Flower()
        this.house = new House()

        //Environment
        this.ocean = new Ocean()
        this.environment = new Environment()
        this.landscape = new Landscape()
        this.respawn = new RespawnController()
    }

    update()
    {
        this.ocean.update()
    }

    destroy() {
        this.ocean.destroy()
        this.house.destroy()
        this.tree.destroy()
        this.landscape.destroy()
        this.environment.destroy()
        this.respawn.destroy()
        this.interactiveObject.destroy()
        this.htmlAnnouncement.destroy()
    }
}