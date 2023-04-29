import * as THREE from 'three'
import Experience from '../Experience.js'
import * as CANNON from 'cannon-es'

export default class Terrain {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.physics = this.experience.physics

        this.resource = this.resources.items.island_lowpoly

        this.setModel()
        this.setPhysics()
    }


    setModel() {
        this.model = this.resource.scene
        this.model.scale.set(1, 1, 1)
        this.model.position.set(0, 0, 0)
        this.scene.add(this.model)

        this.model.traverse((child) => {
            if(child instanceof THREE.Mesh) {
                //child.material.wireframe = true
                child.castShadow = true
            }
        })
    }

    setPhysics() {
        const geometry = this.model.children[0].geometry;
        const shape = new CANNON.Trimesh(
            geometry.attributes.position.array,
            geometry.index.array
        )
        const body = new CANNON.Body({
            mass: 0,
        })
        body.addShape(shape)

        this.physics.world.addBody(body)
    }

}