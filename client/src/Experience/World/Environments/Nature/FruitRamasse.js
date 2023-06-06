import Model3D from "../../Model3D.js";
import {AnimationMixer, CylinderGeometry, LoopRepeat, Mesh, MeshBasicMaterial, SphereGeometry} from "three";
import Experience from "../../../Experience.js";
import * as THREE from "three";

export default class FruitRamasse extends Model3D {
    constructor(model) {
        super(model)

        this.experience = new Experience()
        this.mesh = null
        this.type = 'collectable'
        this.itemToCollect = 'fruit'
        this.timeToInteract = 100
        this.object = new THREE.Object3D()
        this.object.position.set(10, 17, -12)
        this.scene.add(this.object)
        this.model.visible = false
    }

    setHitbox(element) {
        if (element.name !== "crystal_1_low_002002_1") return false
        this.mesh = element
        const geometry = new SphereGeometry(.5, 16, 16)
        const material = new MeshBasicMaterial({ color: 0xff0000, wireframe: true, visible: this.debug.active ?? false })
        const hitbox = new Mesh(geometry, material)
        hitbox.position.set(element.geometry.boundingSphere.center.x, element.geometry.boundingSphere.center.y, element.geometry.boundingSphere.center.z)
        return hitbox
    }

    setStaticHitbox() {
        this.meshs.forEach((mesh) => {
            if (mesh.name === "crystal_1_low_002002_1") {
                mesh.hitbox.position.set(7.7, 13.7, -9.4)
                mesh.object.position.set(7.7, 13.7, -9.4)
                this.object.position.set(7.7, 16.5, -9.4)
            }
        })
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

    setAnimation() {
        this.mixer = new AnimationMixer(this.model)
        // disable animation loop
        this.mixer.clipAction(this.animations[0]).setLoop(LoopRepeat, 0)
    }

    async playAnimation() {
        return new Promise((resolve) => {
            this.model.visible = true
            this.mixer.clipAction(this.animations[0]).clampWhenFinished = true;
            this.mixer.clipAction(this.animations[0]).play()
            this.mixer.addEventListener('finished', function (e) {
                resolve();
            });
        });
    }

    destroy() {
        this.type = null
        this.itemToCollect = null
        this.timeToInteract = null
        this.mesh = null
    }
}