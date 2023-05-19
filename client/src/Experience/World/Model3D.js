import {DoubleSide, Mesh, MeshToonMaterial} from "three";

export default class Model3D {
    constructor(model) {
        this.model = model.scene
        this.physicsMeshs = []
        this.setModel()
    }

    setModel() {
        this.model.traverse((child) =>
        {
            if(child instanceof Mesh)
            {
                this.setMaterial(child)
                this.setPhysicsMeshs(child)
            }
        })
    }

    setMaterial(child) {
        child.material = new MeshToonMaterial({
            ...child.material,
            type: 'MeshToonMaterial',
        })
    }

    setPhysicsMeshs(child) {
        this.physicsMeshs.push(child)
    }

    destroy() {
        this.model.traverse((child) =>
        {
            if(child instanceof Mesh)
            {
                child.material.map.dispose()
                child.material.dispose()
                child.geometry.dispose()
            }
        })

        // null
        this.model = null
        this.physicsMeshs = null
    }
}