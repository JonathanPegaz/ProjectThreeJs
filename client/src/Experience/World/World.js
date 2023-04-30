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
import Terrain from "./Terrain.js";
import HeightfieldTerrain from "./HeightfieldTerrain.js";

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time

        
        //this.bush = new Bush()
        //this.ocean = new Ocean()
        //this.infoBeacon = new InfoBeacon()
        //this.undergroundSF = new UndergroundSF()
        //this.terrain = new Terrain()
        this.heightfieldTerrain = new HeightfieldTerrain()
        this.environment = new Environment()
        this.htmlPoint = new HTMLPoints()
        
    }

    update()
    {
        this.htmlPoint.update()
        //this.ocean.update()
    }
}