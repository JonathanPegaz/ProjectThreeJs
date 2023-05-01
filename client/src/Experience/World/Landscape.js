import { Object3D, Mesh} from 'three';
import Experience from '../Experience.js';
import * as CANNON from "cannon-es";


export default class Landscape {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.physics = this.experience.physics

        this.resource = this.resources.items.island

        this.object = new Object3D()

        this.setModel()
        this.setPhysics()
    }

    setModel() {
        this.model = this.resource.scene
        this.model.scale.set(1, 1, 1)
        this.model.children[0].position.set(0, 0, 0)
        this.model.children[0].geometry.center()
        this.model.traverse((child) => {
            if(child instanceof Mesh) {
                //child.material.wireframe = true
                child.receiveShadow = true
            }
        })
        this.object.add(this.model)
        this.scene.add(this.object)
    }

    setPhysics() {
        this.model.traverse((child) => {
            if(child instanceof Mesh) {
                const shape = this.createShape(child.geometry)
                const body = this.createBody(shape)
            }
        })
    }

    createShape(geometry) {
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
        return new CANNON.Trimesh(vertices, indices)
    }

    createBody(shape) {
        const body = new CANNON.Body({
            mass: 0,
            shape,
            material: this.physics.defaultMaterial
        })
        this.physics.world.addBody(body)
        return body
    }

    destroy() {
        this.scene.remove(this.object)
    }
}