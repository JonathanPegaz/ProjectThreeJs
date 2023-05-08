import * as THREE from 'three'
import BasicCharacterController from "./CharacterController.js";
import ThirdPersonCamera from "./ThirdPersonCamera.js";
import Experience from "../../Experience.js";
import * as CANNON from "cannon-es";
import Pseudo from "./Hud/Pseudo.js";

export default class LocalPlayer {
    constructor() {
        this.id = null
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.physics = this.experience.physics
        this.network = this.experience.network

        this.resources = this.experience.resources
        this.resource = this.resources.items.foxModel

        this.object = new THREE.Object3D()
        this.object.position.set(-80, 20, 22)

        this.pseudo = new Pseudo(this, this.experience.mainscreen.pseudo)

        this.setModel()
        this.setAnimation()
        this.setController()
        this.setThirdPersonCamera()
        this.setPhysics()
        this.setNetwork()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(0.006, 0.006, 0.006)
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

    setPhysics() {

        const shape = new CANNON.Sphere(1); // dimensions de la boîte
        this.body = new CANNON.Body({
            shape: shape,
            mass: 1,
            material: this.physics.defaultMaterial,
            position: new CANNON.Vec3(-80, 20, 22),
            fixedRotation: true,
        })

        this.physics.world.addBody(this.body)

        this.physics.objectsToUpdate.push({
            mesh: this.object,
            body: this.body
        })
    }

    setNetwork() {
        this.network.setSocket()

        this.network.socket.emit('init', {
            model:"foxModel",
            //colour: this.colour,
            pseudo: this.pseudo.text,
            x: this.controller.Position.x,
            y: this.controller.Position.y,
            z: this.controller.Position.z,
            h: this.controller.Rotation.y,
            pb: this.controller.Rotation.x
        })
    }

    update() {
        this.controller.update()

        this.body.position.copy(this.object.position)
        this.body.quaternion.copy(this.object.quaternion)

        this.pseudo.update()

        if (this.mixer) {
            this.mixer.update(this.time.delta / 1000)
        }

        if(this.thirdPersonCamera)
            this.thirdPersonCamera.update()

        if(this.network.socket)
            this.network.socket.emit('update', {
                pseudo: this.pseudo.text,
                x: this.controller.Position.x,
                y: this.controller.Position.y,
                z: this.controller.Position.z,
                h: this.controller.Rotation.y,
                pb: this.controller.Rotation.x,
                action: this.controller.stateMachine._currentState.Name
            })
    }

    destroy() {
        this.thirdPersonCamera.destroy()
        this.controller.destroy()

        this.scene.remove(this.object)
        this.physics.world.removeBody(this.body)

        this.object.traverse((child) => {
            if (child.isMesh) {
                child.geometry.dispose()
                child.material.dispose()
            }
        })

        this.scene.remove(this.object)

        this.object = null
        this.model = null
        this.mixer = null
        this.animations = null
        this.controller = null
        this.thirdPersonCamera = null
        this.body = null

        this.experience = null
        this.scene = null
        this.time = null
        this.physics = null
        this.resources = null
        this.resource = null
    }
}