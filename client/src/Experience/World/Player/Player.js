import Experience from "../../Experience.js";
import * as THREE from "three";
import {clone} from "three/examples/jsm/utils/SkeletonUtils.js";


export default class Player {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.physics = this.experience.physics
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.network = this.experience.network
        this.resource = this.resources.items.player

        this.object = new THREE.Object3D()
        this.object.position.set(0, 0, 0)

        this.setModel()
        this.setAnimation()
    }

    setModel() {
        this.model = clone(this.resource.scene.children[0])
        this.model.scale.set(0.2, 0.2, 0.2)
        this.model.position.set(0, -0.5, 0)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })

        this.object.add(this.model)
        this.scene.add(this.object);
    }

    setAnimation()
    {
        this.animations = {}
        this.resource.animations.push(this.resources.items.idle.animations[0])
        this.resource.animations.push(this.resources.items.walking.animations[0])

        this.mixer = new THREE.AnimationMixer(this.model)

        // action
        this.animations.idle = {
            clip: this.resource.animations[1],
            action: this.mixer.clipAction(this.resource.animations[1])
        }

        this.animations.walk = {
            clip: this.resource.animations[2],
            action: this.mixer.clipAction(this.resource.animations[2])
        }

        this.animations.run = {
            clip: this.resource.animations[2],
            action: this.mixer.clipAction(this.resource.animations[2])
        }
    }

    destroy() {
        this.object.traverse((child) => {
            if (child.isMesh) {
                child.geometry.dispose()
                child.material.dispose()
            }
        })

        this.mixer = null;
        this.animations = null;
        this.model = null;
        this.object = null;
    }
}