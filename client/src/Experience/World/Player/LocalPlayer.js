import * as THREE from 'three'
import BasicCharacterController from "./CharacterController.js";
import ThirdPersonCamera from "./ThirdPersonCamera.js";
import Experience from "../../Experience.js";
import * as CANNON from 'cannon-es'
import {ConvexGeometry} from "three/addons/geometries/ConvexGeometry.js";
import CannonUtils from "../../Utils/CannonUtils.js";

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
        this.object.position.set(0, 17, 0)

        this.setModel()
        this.setAnimation()
        this.setController()
        this.setThirdPersonCamera()
        this.setPhysics()
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

    setPhysics() {
        const geometry = this.model.children[0].children[0].geometry;

        const position = geometry.attributes.position.array
        const points = []
        for (let i = 0; i < position.length; i += 3) {
            points.push(
                new THREE.Vector3(position[i], position[i + 1], position[i + 2])
            )
        }
        console.log(points)
        const convexGeometry = new ConvexGeometry(points)
        const convexHull = new THREE.Mesh(
            convexGeometry,
            new THREE.MeshBasicMaterial({
                color: 0x00ff00,
                wireframe: true,
            })
        )
        convexHull.scale.set(0.02, 0.02, 0.02)
        console.log('fox', convexGeometry)
        this.object.add(convexHull)

        const shape = CannonUtils.createTrimesh(convexHull.geometry)
        const body = new CANNON.Body({mass: 1})
        body.addShape(shape)
        body.position.set(0, 17, 0)
        this.physics.world.addBody(body)
        /*this.physics.objectsToUpdate.push({
            mesh: this.object,
            body: body
        })*/
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