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

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time

        // Wait for resources
        this.resources.on('ready', () =>
        {
            this.bush = new Bush()
            this.ocean = new Ocean()
            this.infoBeacon = new InfoBeacon()
            this.undergroundSF = new UndergroundSF()
            this.player = new LocalPlayer(true)
            this.environment = new Environment()
            this.htmlPoint = new HTMLPoints()
        })
    }

    update()
    {
        if(this.player)
            this.player.update()

        if (this.htmlPoint)
            this.htmlPoint.update()

        if (this.ocean)
            this.ocean.update()
    }
}