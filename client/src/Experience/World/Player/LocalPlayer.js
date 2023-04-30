import * as THREE from 'three'
import BasicCharacterController from "./CharacterController.js";
import ThirdPersonCamera from "./ThirdPersonCamera.js";
import Experience from "../../Experience.js";

export default class LocalPlayer {
    constructor() {
        this.id = null
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time

        this.resources = this.experience.resources
        this.resource = this.resources.items.foxModel

        this.object = new THREE.Object3D()
        this.object.add(new THREE.AxesHelper(5))
        this.object.position.set(0, 0, 0)

        this.setModel()
        this.setAnimation()
        this.setController()
        this.setThirdPersonCamera()
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

        this.object.add(this.model)
        this.scene.add(this.object);
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

    setController() {
        this.controller = new BasicCharacterController(this)
    }

    setThirdPersonCamera() {
        this.thirdPersonCamera = new ThirdPersonCamera(this.controller)
    }

    update() {
        this.controller.update()

        if (this.mixer) {
            this.mixer.update(this.time.delta / 1000)
        }

        if(this.thirdPersonCamera)
            this.thirdPersonCamera.update()
    }
}