import * as THREE from 'three'
import Experience from "../../Experience.js";

export default class Player {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time

        this.resources = this.experience.resources
        this.resource = this.resources.items.foxModel

        this.remoteData = this.experience.remoteData
        this.remotePlayers = this.experience.remotePlayers
        this.initialisingPlayers = this.experience.initialisingPlayers

        this.setModel()
        this.setAnimation()

        this.player = this

        this.object = new THREE.Object3D()
        this.object.position.set(0, 0, 0)
        this.object.rotation.set(0, 0, 0)
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(0.02, 0.02, 0.02)
        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })

        //this.object.add(this.model)
        this.scene.add(this.model)
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

        if (this.remoteData.length > 0) {
            let found = false
            for (let data of this.remoteData) {
                if (data.id != this.id) continue
                // Found the player
                //this.
            }
        }
    }

}