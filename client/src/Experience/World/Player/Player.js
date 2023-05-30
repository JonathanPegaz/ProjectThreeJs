import Experience from "../../Experience.js";
import {clone} from "three/examples/jsm/utils/SkeletonUtils.js";
import {AnimationMixer, FrontSide, Mesh, MeshToonMaterial, Object3D} from "three";


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

        this.object = new Object3D()
        this.object.position.set(0, 0, 0)

        this.setModel()
        this.setAnimation()
    }

    setAnimation()
    {
        this.animations = {}
        this.resource.animations.push(this.resources.items.player_idle.animations[0])
        this.resource.animations.push(this.resources.items.player_walking.animations[0])
        this.resource.animations.push(this.resources.items.player_picking.animations[0])
        this.resource.animations.push(this.resources.items.player_crouching.animations[0])

        this.mixer = new AnimationMixer(this.model)

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

        this.animations.pick = {
            clip: this.resource.animations[3],
            action: this.mixer.clipAction(this.resource.animations[3])
        }

        this.animations.crouch = {
            clip: this.resource.animations[4],
            action: this.mixer.clipAction(this.resource.animations[4])
        }
    }

    setModel() {
        this.model = clone(this.resource.scene.children[0])
        this.model.scale.set(0.175, 0.175, 0.175)
        this.model.position.set(0, -0.5, 0)

        this.model.traverse((child) =>
        {
            if(child instanceof Mesh)
            {
                child.castShadow = true
                child.material = new MeshToonMaterial({
                    ...child.material,
                    side: FrontSide,
                    type: 'MeshToonMaterial',
                })
            }
        })

        this.object.add(this.model)
        this.scene.add(this.object);
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