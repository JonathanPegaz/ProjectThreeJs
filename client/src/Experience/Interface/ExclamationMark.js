import { CSS2DObject} from "three/addons/renderers/CSS2DRenderer.js";
import Experience from "../Experience.js";
import {Box3, Sprite, SpriteMaterial} from "three";


export default class ExclamationMark {
    constructor(target) {
        this.target = target

        this.experience = new Experience()
        this.setObject()
    }

    setObject() {
        this.exclamationMark = this.experience.resources.items.exclamationMark
        this.material = new SpriteMaterial({map: this.exclamationMark, transparent: false, depthWrite: true, alphaTest: 0.5})
        this.object = new Sprite(this.material)

        // get height of the target
        const box = new Box3().setFromObject(this.target.object)
        const height = box.max.y - box.min.y

        // set position
        this.object.position.set(0, height + 1, 0)
        this.target.object.add(this.object)

    }

    update() {
        // look at the camera
        this.object.lookAt(this.experience.camera.instance.position)
    }

    destroy() {
        this.target.object.remove(this.object)

        this.object.material.dispose()
        this.object.geometry.dispose()

        // null
        this.object = null
        this.material = null
        this.exclamationMark = null
        this.target = null
    }
}