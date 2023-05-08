import { Object3D, Mesh, DoubleSide, MeshToonMaterial} from 'three';
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
        this.object.position.set(0, 0, 0)
        this.object.frustumCulled = false

        this.setModel()
        this.setPhysics()
    }

    setModel() {
        this.model = this.resource.scene
        this.model.scale.set(1, 1, 1)
        this.model.traverse((child) => {
            child.frustumCulled = false
            if(child instanceof Mesh) {
                child.material = new MeshToonMaterial({ // On crée le matériau du buisson
                    ...child.material,
                    depthWrite: true,
                    type: 'MeshToonMaterial',
                    transparent: false,
                })

                child.receiveShadow = true
            }
        })

        this.object.add(this.model)
        this.scene.add(this.object)

        if(this.experience.debug.active) {
            this.debugFolder = this.experience.debug.ui.addFolder('landscape')

            // add depth material
            this.debugObject = {}
            this.debugObject.depthTest = true
            this.debugObject.depthWrite = true
            this.debugObject.depthFunc = 2

            this.debugFolder.add(this.debugObject, 'depthTest').onChange(() => {
                this.model.traverse((child) => {
                    if(child instanceof Mesh) {
                        child.material.depthTest = this.debugObject.depthTest
                    }
                })
            })

            this.debugFolder.add(this.debugObject, 'depthWrite').onChange(() => {
                this.model.traverse((child) => {
                    if(child instanceof Mesh) {
                        child.material.depthWrite = this.debugObject.depthWrite
                    }
                })
            })
            this.debugFolder.add(this.debugObject, 'depthFunc', {
                Never: 0,
                Less: 1,
                Equal: 2,
                LessEqual: 3,
                Greater: 4,
                NotEqual: 5,
                GreaterEqual: 6,
                Always: 7
            }).onChange(() => {
                this.model.traverse((child) => {
                    if(child instanceof Mesh) {
                        child.material.depthFunc = this.debugObject.depthFunc
                    }
                })
            })

            
        }
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

        this.model.traverse((child) => {
            if(child instanceof Mesh) {
                child.material.dispose()
                child.geometry.dispose()
            }
        })
    }
}