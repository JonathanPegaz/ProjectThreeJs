import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Experience from "./Experience.js";
import CannonUtils from "./Utils/CannonUtils.js";
import {Octree} from 'three/addons/math/Octree.js';

export default class Physics
{
    constructor()
    {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.utils = new CannonUtils()

        if(this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Physics')
            this.setupDebug()
        }

        this.setCannonPhysics()
        this.setInstance()
    }

    setCannonPhysics() {
        this.world = new CANNON.World()
        this.world.gravity.set(0, -9.82, 0)
        this.world.broadphase = new CANNON.SAPBroadphase(this.world)
        this.world.allowSleep = true

        this.objectsToUpdate = []

        // Default material
        this.defaultMaterial = new CANNON.Material('default')
        const defaultContactMaterial = new CANNON.ContactMaterial(
            this.defaultMaterial,
            this.defaultMaterial,
            {
                friction: 0.1,
                restitution: 0.7
            }
        )
        this.world.defaultContactMaterial = defaultContactMaterial
    }

    setInstance()
    {

    }

    setupDebug() {


        const debugObject = {}
        debugObject.createSphere = () =>
        {
            createSphere(
                Math.random() * 0.5,
                {
                    x: (Math.random() - 0.5) * 3,
                    y: 20,
                    z: (Math.random() - 0.5) * 3
                }
            )
        }

        this.debugFolder.add(debugObject, 'createSphere')

        const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
        const sphereMaterial = new THREE.MeshStandardMaterial({
            metalness: 0.3,
            roughness: 0.4,
            envMapIntensity: 0.5
        })

        const createSphere = (radius, position) =>
        {
            // Three.js mesh
            const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
            mesh.castShadow = true
            mesh.scale.set(radius, radius, radius)
            mesh.position.copy(position)
            this.scene.add(mesh)

            // Cannon.js body
            const shape = new CANNON.Sphere(radius)

            const body = new CANNON.Body({
                mass: 1,
                position: new CANNON.Vec3(0, 3, 0),
                shape: shape,
                material: this.defaultMaterial
            })
            body.position.copy(position)
            this.world.addBody(body)

            // Save in objects
            this.objectsToUpdate.push({ mesh, body })
        }
    }

    update()
    {
        this.world.step(1 / 60, this.time.delta * 0.001, 3)
        for(const object of this.objectsToUpdate)
        {
            object.mesh.position.copy(object.body.position)
            object.mesh.quaternion.copy(object.body.quaternion)
        }
    }
}