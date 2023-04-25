import * as THREE from 'three'
import Experience from "../../Experience.js";

export default class Player {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time

        this.resources = this.experience.resources
        this.resource = this.resources.items.foxModel

        this.setModel()
        this.setAnimation()

        this.player = this
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(0.02, 0.02, 0.02)
        this.scene.add(this.model)
        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })
    }

    setAnimation()
    {
        this.animations = {}

        this.mixer = new THREE.AnimationMixer(this.model)

        // action
        this.animations.idle = {
            clip: this.resource.animations[0],
            action: this.mixer.clipAction(this.resource.animations[0])
        }

        this.animations.walk = {
            clip: this.resource.animations[1],
            action: this.mixer.clipAction(this.resource.animations[1])
        }

        this.animations.run = {
            clip: this.resource.animations[2],
            action: this.mixer.clipAction(this.resource.animations[2])
        }
    }

    update()
    {
        if (this.mixer) {
            this.mixer.update(this.time.delta / 1000)
        }
    }

}