import * as THREE from 'three'
import BasicCharacterController from "./CharacterController.js";
import ThirdPersonCamera from "./ThirdPersonCamera.js";
import Experience from "../../Experience.js";
import * as CANNON from "cannon-es";
import {ConvexGeometry} from "three/addons/geometries/ConvexGeometry.js";
import {Vector3} from "three";

export default class LocalPlayer {
    constructor() {
        this.id = null
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.physics = this.experience.physics

        this.resources = this.experience.resources
        this.resource = this.resources.items.foxModel

        this.object = new THREE.Object3D()
        this.object.add(new THREE.AxesHelper(5))
        this.object.position.set(-80, 20, 22)

        this.pseudo = 'Xx__PussySlayer__xX'

        this.setModel()
        this.setAnimation()
        this.setController()
        this.setThirdPersonCamera()
        this.setPhysics()
        this.setPseudo()
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

    setPseudo() {
        this.followText = document.createElement('div');
        this.followText.id = 'follow-text';
        this.followText.style.cssText= `
        position: absolute;
        color: white;
        background: #00000077;
        line-height: 40px;
        border: 1px solid #ffffff77;
        z-index: 100;
        font-family: Arial;
        font-weight: bold;
        font-size: 14px;
        padding: 0 10px;`

        document.body.appendChild(this.followText);

        this.followText.innerHTML = this.pseudo;

        this.boxPosition = new THREE.Vector3();
        this.boxPositionOffset = new THREE.Vector3();
        this.y_axis = new Vector3(0, 2, 0);

    }

    update() {
        this.controller.update()

        this.body.position.copy(this.object.position)
        this.body.quaternion.copy(this.object.quaternion)

        if (this.mixer) {
            this.mixer.update(this.time.delta / 1000)
        }

        if(this.thirdPersonCamera)
            this.thirdPersonCamera.update()

        // update pseudo
        this.boxPositionOffset.copy(this.object.position)
        this.boxPositionOffset.sub(this.thirdPersonCamera._currentPosition)
        this.boxPositionOffset.normalize();
        this.boxPositionOffset.applyAxisAngle(this.y_axis, - Math.PI / 2)
        this.boxPositionOffset.multiplyScalar(0.5)
        this.boxPositionOffset.y = 3

        this.boxPosition.setFromMatrixPosition( this.object.matrixWorld )
        this.boxPosition.add(this.boxPositionOffset)
        this.boxPosition.project(this.thirdPersonCamera.camera.instance)

        const rect = this.experience.canvas.getBoundingClientRect()
        const widthHalf = this.experience.sizes.width / 2, heightHalf = this.experience.sizes.height / 2
        this.boxPosition.x = rect.left + widthHalf - ( this.boxPosition.x * widthHalf )
        this.boxPosition.y = rect.top - ( this.boxPosition.y * heightHalf ) + heightHalf

        this.followText.style.top = `${this.boxPosition.y}px`
        this.followText.style.left = `${this.boxPosition.x}px`
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