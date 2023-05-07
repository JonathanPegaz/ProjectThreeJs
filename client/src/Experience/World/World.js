import * as THREE from 'three'
import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js'
import HTMLPoints from "../HTMLInterface/HTMLPoints.js";
import Bush from "./Bush.js";
import UndergroundSF from "./Buildings/UndergroundSF.js";
import LocalPlayer from "./Player/LocalPlayer.js";
import Ocean from "./Ocean.js";
import Landscape from "./Landscape.js";
import RespawnController from "./RespawnController.js";
import InteractiveObjectController from "./InteractiveObject/InteractiveObjectController.js";

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

        //Environment
        this.ocean = new Ocean()
        this.environment = new Environment()
        this.landscape = new Landscape()
        this.respawn = new RespawnController()



        //Assets
        //this.bush = new Bush()
        //this.floor = new Floor()
        //this.undergroundSF = new UndergroundSF()
        this.htmlPoint = new HTMLPoints()
        
    }

    update()
    {
        this.htmlPoint.update()
        this.ocean.update()
    }

    destroy() {
        this.htmlPoint.destroy()
        this.ocean.destroy()
        this.landscape.destroy()
        this.environment.destroy()
        this.respawn.destroy()
        this.interactiveObject.destroy()
    }
}