import Experience from "../Experience.js";
import {Box3, Sprite, SpriteMaterial} from "three";


export default class Icons {
    constructor(target, source) {
        this.experience = new Experience()
        this.target = target
        this.source = this.experience.resources.items.exclamationMark
        this.setObject()
    }

    setObject() {
        console.log(this.source)
        this.material = new SpriteMaterial({map: this.source, transparent: false, depthWrite: true, alphaTest: 0.5})
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

    visible(isVisible) {
        this.object.visible = isVisible
    }

    destroy() {
        this.target.object.remove(this.object)

        // dispose
        this.object.material.map.dispose()
        this.object.material.dispose()
        this.object.geometry.dispose()

        // null
        this.object = null
        this.material = null
        this.source = null
        this.target = null
    }
}