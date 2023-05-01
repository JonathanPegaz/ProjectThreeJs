import * as THREE from 'three'
import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js'
import HTMLPoints from "../HTMLInterface/HTMLPoints.js";
import Bush from "./Bush.js";
import InfoBeacon from "./InteractableObject/InfoBeacon.js";
import UndergroundSF from "./Buildings/UndergroundSF.js";
import LocalPlayer from "./Player/LocalPlayer.js";
import Ocean from "./Ocean.js";
import Landscape from "./Landscape.js";
import CustomFog from "./CustomFog.js";

export default class World
{
    constructor()
    {
        this.experience = new Experience()

        this.customFog = new CustomFog()
        this.bush = new Bush()
        //this.floor = new Floor()
        this.ocean = new Ocean()
        //this.infoBeacon = new InfoBeacon()
        //this.undergroundSF = new UndergroundSF()
        this.landscape = new Landscape()
        this.environment = new Environment()
        this.htmlPoint = new HTMLPoints()
        
    }

    update()
    {
        this.htmlPoint.update()
        this.ocean.update()
        this.customFog.update()
    }

    destroy() {
        this.htmlPoint.destroy()
        this.ocean.destroy()
        this.landscape.destroy()
        this.environment.destroy()
    }
}