import {Mesh, MeshToonMaterial} from "three";

export default class Model3D {
    constructor(model) {
        this.model = model.scene
        this.meshs = []
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
                this.meshs.push(child)
            }
        })
        this.model.matrixAutoUpdate = false
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
                child.geometry.dispose()
                // Loop through the material properties
                for(const key in child.material)
                {
                    const value = child.material[key]
                    // Test if there is a dispose function
                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
                child.material.dispose()
            }
        })

        // null
        this.model = null
        this.physicsMeshs = null
        this.meshs = null
    }
}