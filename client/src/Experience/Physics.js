import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Experience from "./Experience.js";
import CannonDebugger from 'cannon-es-debugger'
import {Mesh} from "three";
import { threeToCannon, ShapeType } from 'three-to-cannon';

export default class Physics
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug

        this.world = new CANNON.World()
        this.world.gravity.set(0, -29.82, 0)
        this.world.broadphase = new CANNON.SAPBroadphase(this.world)

        this.objectsToUpdate = []

        this.setInstance()

        if(this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Physics')
            this.debugFolder.close()

            this.debugObject = {}
            this.debugObject.debugger = true

            this.debugFolder.add(this.debugObject, 'debugger')

            this.debugger = new CannonDebugger(this.scene, this.world, {
                onUpdate: (body, mesh) => {
                    mesh.visible = this.debugObject.debugger
                }
            })

            this.setupDebug()
        }
    }

    setInstance()
    {
        // Default material
        this.defaultMaterial = new CANNON.Material('default')
        this.defaultContactMaterial = new CANNON.ContactMaterial(
            this.defaultMaterial,
            this.defaultMaterial,
            {
                friction: 0.1,
                restitution: 0.1
            }
        )
        this.world.defaultContactMaterial = this.defaultContactMaterial
    }

    setupDebug() {

        this.debugObject.createSphere = () =>
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

        this.debugFolder.add(this.debugObject, 'createSphere')

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

    createBoxShape(mesh) {
        const result = threeToCannon(mesh, {type: ShapeType.BOX});
        const body = new CANNON.Body({mass: 0, material: this.defaultMaterial})
        body.addShape(result.shape, result.offset, result.orientation)
        this.world.addBody(body)
    }
    createTrimeshShape(mesh) {
        const geometry = mesh.geometry
        const vertices = []
        geometry.attributes.position.array.forEach((vertex, index) => {
            if (index % 3 === 0) {
                vertices.push(vertex, geometry.attributes.position.array[index + 1], geometry.attributes.position.array[index + 2])
            }
        })
        const indices = []
        for (let i = 0; i < geometry.index.array.length; i += 3) {
            indices.push(geometry.index.array[i], geometry.index.array[i + 1], geometry.index.array[i + 2])
        }

        const body = this.createBody(new CANNON.Trimesh(vertices, indices))
        this.world.addBody(body)
    }

    createBody(shape) {
        const body = new CANNON.Body({
            mass: 0,
            shape,
            material: this.defaultMaterial
        })
        return body
    }

    update()
    {
        if (this.debug.active)
            this.debugger.update()

        this.world.step(1 / 60, this.time.delta * 0.001, 3)
        for(const object of this.objectsToUpdate)
        {
            object.mesh.position.copy(object.body.position)
            object.mesh.quaternion.copy(object.body.quaternion)
        }
    }

    destroy() {

        // remove all bodies
        for (const object of this.objectsToUpdate) {
            this.world.removeBody(object.body)
        }

        this.world.destroy()
    }
}