import BasicCharacterController from "./CharacterController.js";
import ThirdPersonCamera from "./ThirdPersonCamera.js";
import * as CANNON from "cannon-es";
import Pseudo from "./Hud/Pseudo.js";
import Player from "./Player.js";

export default class LocalPlayer extends Player {
    constructor() {
        super()
        this.id = null

        this.pseudo = new Pseudo(this, this.experience.mainscreen.pseudo)

        this.setController()
        this.setThirdPersonCamera()
        this.setPhysics()
        this.setNetwork()
    }


    setController() {
        this.controller = new BasicCharacterController(this)
    }

    setThirdPersonCamera() {
        this.thirdPersonCamera = new ThirdPersonCamera(this.controller)
    }

    setPhysics() {

        const shape = new CANNON.Sphere(0.5); // dimensions de la boîte
        this.body = new CANNON.Body({
            shape: shape,
            mass: 1,
            material: this.physics.defaultMaterial,
            position: new CANNON.Vec3(-80, 22, 22),
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
            rx: this.object.rotation.x,
            ry: this.object.rotation.y,
            rz: this.object.rotation.z,
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
                rx: this.object.rotation.x,
                ry: this.object.rotation.y,
                rz: this.object.rotation.z,
                action: this.controller.stateMachine._currentState.Name
            })
    }

    destroy() {
        this.thirdPersonCamera.destroy()
        this.controller.destroy()

        this.pseudo.destroy()

        this.scene.remove(this.object)
        this.physics.world.removeBody(this.body)

        this.controller = null
        this.thirdPersonCamera = null

        super.destroy()
    }
}