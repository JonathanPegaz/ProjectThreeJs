import BasicCharacterController from "./CharacterController.js";
import ThirdPersonCamera from "./ThirdPersonCamera.js";
import * as CANNON from "cannon-es";
import Pseudo from "../../Interface/Pseudo.js";
import Player from "./Player.js";

export default class LocalPlayer extends Player {
    constructor(isParrain = false) {
        super(isParrain)
        this.id = null

        this.pseudo = new Pseudo(this, this.experience.mainscreen.pseudo)

        this.canKick = false
        this.setController()
        this.setThirdPersonCamera()
        this.setPhysics()
        this.setNetwork()

        // add real time position in debug mode
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('LocalPlayer')
            this.debugObject = {}
            this.debugObject.position = {}
            this.debugObject.position.x = this.object.position.x
            this.debugObject.position.y = this.object.position.y
            this.debugObject.position.z = this.object.position.z
            this.debugFolder.add(this.debugObject.position, 'x').name('PositionX').listen()
            this.debugFolder.add(this.debugObject.position, 'y').name('PositionY').listen()
            this.debugFolder.add(this.debugObject.position, 'z').name('PositionZ').listen()
        }
    }

    setController() {
        this.controller = new BasicCharacterController(this)
    }

    setThirdPersonCamera() {
        this.thirdPersonCamera = new ThirdPersonCamera(this.controller)
    }

    setPhysics() {

        const shape = new CANNON.Sphere(0.4); // dimensions de la boîte
        this.body = new CANNON.Body({
            shape: shape,
            mass: 1,
            allowSleep: false,
            position: new CANNON.Vec3(-96.1349, 15.562, -16.916),
            //position: new CANNON.Vec3(48, 14, -40), //FOREST
            //position: new CANNON.Vec3(57, 15, -56), //PARTY
            //position: new CANNON.Vec3(-27, 20, 47), //CRYSTAL
            //position: new CANNON.Vec3(13, 14, -10), //TREE
            //position: new CANNON.Vec3(32, 14, -32), //MUSHROOM
            position: new CANNON.Vec3(57, 15, -56), //PORTAL
            //position: new CANNON.Vec3(-85, 18, 22), //RUIN 1
            fixedRotation: true,
        })

        // Rotate the body so that the x-axis faces in the direction of v
        this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 2);

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
            isParrain: this.isParrain
        })
    }

    update() {
        this.controller.update()

        // update debug position
        if (this.debug.active) {
            this.debugObject.position.x = this.object.position.x
            this.debugObject.position.y = this.object.position.y
            this.debugObject.position.z = this.object.position.z
        }

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
                action: this.controller.stateMachine._currentState.Name,
                isParrain: this.isParrain
            })
    }

    destroy() {
        this.thirdPersonCamera.destroy()
        this.controller.destroy()

        // destroy debug
        if (this.debug.active) {
            this.debugObject = null
        }

        this.pseudo.destroy()

        this.scene.remove(this.object)
        this.physics.world.removeBody(this.body)

        this.id = null
        this.controller = null
        this.thirdPersonCamera = null

        super.destroy()
    }
}