import Model3D from "../../Model3D.js";
import {AnimationMixer, CylinderGeometry, LoopRepeat, Mesh, MeshBasicMaterial, SphereGeometry} from "three";
import Experience from "../../../Experience.js";

export default class FruitRamasse extends Model3D {
    constructor(model) {
        super(model)

        this.experience = new Experience()
        this.mesh = null
        this.type = 'collectable'
        this.itemToCollect = 'fruit'
        this.timeToInteract = 100
    }

    setHitbox(element) {
        if (element.name !== "crystal_1_low002_1") return false
        this.mesh = element
        const geometry = new SphereGeometry(.8, 16, 16)
        const material = new MeshBasicMaterial({ color: 0xff0000, wireframe: true, visible: this.debug.active ?? false })
        const hitbox = new Mesh(geometry, material)
        hitbox.position.set(element.geometry.boundingSphere.center.x, element.geometry.boundingSphere.center.y, element.geometry.boundingSphere.center.z)
        return hitbox
    }

    interact(origin, mesh) {
        super.interact(origin, mesh, null, false)
        if (this.experience.controls.keys.down.action) {
            this.pressAction++
            mesh.marker.press(this.pressAction, this.timeToInteract)
            if (this.pressAction > this.timeToInteract) {
                this.pressAction = 0
                mesh.marker.stopPress()
                this.trigger('collect', [[this.itemToCollect, 1]])
            }
        } else {
            this.pressAction = 0
            mesh.marker.stopPress()
        }
    }

    destroy() {
        this.type = null
        this.itemToCollect = null
        this.timeToInteract = null
        this.mesh = null
    }
}