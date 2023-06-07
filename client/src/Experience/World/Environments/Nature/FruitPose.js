import Model3D from "../../Model3D.js";
import {Mesh, MeshBasicMaterial, SphereGeometry} from "three";
import * as THREE from "three";

export default class FruitPose extends Model3D {
    constructor(model) {
        super(model)
        this.model.visible = true
        this.timeToInteract = 100
        this.object = new THREE.Object3D()
        this.object.position.set(53.124345779418945, 13.871932029724121+3, -70.10857009887695)
        this.scene.add(this.object)

        this.id = 1
        this.experience.world.deliveryZone.push(this)
    }

    setHitbox(element) {
        if (element.name !== "crystal_1_low009_1") return false
        const geometry = new SphereGeometry(.5, 16, 16)
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
                this.model.visible = true
                this.trigger('delivery')
            }
        } else {
            this.pressAction = 0
            mesh.marker.stopPress()
        }
    }

    destroy() {
        this.timeToInteract = null
    }
}