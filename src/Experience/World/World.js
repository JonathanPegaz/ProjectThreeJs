import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js'
import HTMLPoints from "../HTMLInterface/HTMLPoints.js";
import BasicCharacterController from "./Player/CharacterController.js";
import ThirdPersonCamera from "./Player/ThirdPersonCamera.js";
import Bush from "./Bush.js";
import InfoBeacon from "./InteractableObject/InfoBeacon.js";
import UndergroundSF from "./Buildings/UndergroundSF.js";

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            //this.floor = new Floor()
            this.infoBeacon = new InfoBeacon()
            this.undergroundSF = new UndergroundSF()
            //this.floor = new Floor()
            this.bush = new Bush(1000)
            this.player = new BasicCharacterController()
            this.thirdPersonCamera = new ThirdPersonCamera(this.player)
            this.environment = new Environment()
            this.htmlPoint = new HTMLPoints()
        })
    }

    update()
    {
        if(this.player)
            this.player.update()

        if(this.thirdPersonCamera)
            this.thirdPersonCamera.update()

        if (this.htmlPoint)
            this.htmlPoint.update()
    }
}