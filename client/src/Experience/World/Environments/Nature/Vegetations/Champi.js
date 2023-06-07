import Model3D from "../../../Model3D.js";
import {FrontSide, Mesh, MeshToonMaterial} from "three";
import Experience from "../../../../Experience.js";
import * as THREE from "three";
import QuestMarker from "../../../../Interface/QuestMarker.js";

export default class Champi extends Model3D
{
    constructor(model)
    {
        super(model)
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.input = this.experience.controls
        this.pressAction = 0
        this.type = 'collectable'
        this.itemToCollect = 'mushroom'
        this.object = new THREE.Object3D()
        //TODO: find mushroom group position
        this.object.position.set(32, 16, -32)
        this.scene.add(this.object)

        this.marker = new QuestMarker(this, 0)
    }

    interact(origin, mesh) {
        mesh.interacting = true
        mesh.marker.mark()
        if (this.input.keys.down.action) {
            this.pressAction++
            this.experience.audioController.DiggingGround.play()
            mesh.marker.press(this.pressAction, 200)
            if (this.pressAction > 200) {
                this.pressAction = 0
                mesh.marker.stopPress()
                this.experience.audioController.DiggingGround.pause()
                this.trigger('collect', [['mushroom', 1]])
                this.experience.audioController.playSound('Notification')
            }
        } else {
            this.pressAction = 0
            mesh.marker.stopPress()
            this.experience.audioController.DiggingGround.pause()
        }
    }

    stopInteract(mesh) {
        super.stopInteract()
        this.pressAction = 0
        mesh.interacting = false
        mesh.marker.unmark()
    }

    destroy() {
        this.input = null
        this.pressAction = null
        this.type = null
        this.itemToCollect = null
        if (this.marker)
            this.marker.destroy()
        this.marker = null
    }
}
