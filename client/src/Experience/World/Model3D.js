import {AnimationMixer, LoopRepeat, Mesh, MeshToonMaterial} from "three";
import Experience from "../Experience.js";

export default class Model3D {
    constructor(data) {
        this.experience = new Experience()

        this.hasPhysics = data.hasPhysics
        this.display = data.display
        this.castShadow = data.castShadow
        this.resource = data.resource

        this.meshs = []
        this.physicsMeshs = []
        this.isAnimated = data.isAnimated
        this.setModel()
    }

    setModel() {
        const file = this.experience.resources.items[this.resource]

        // set model
        this.model = file.scene
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

        // set animations
        this.animations = file.animations
        if (this.animations.length > 0) {
            this.setAnimation()
            this.isAnimated = true
        }
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

    setAnimation() {
        this.mixer = new AnimationMixer(this.model)
        for (let i = 0; i < this.animations.length; i++) {
            this.mixer.clipAction(this.animations[i]).loop = LoopRepeat
            this.mixer.clipAction(this.animations[i]).play()
        }
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
        this.hasPhysics = null
        this.display = null
        this.castShadow = null
        this.resource = null
        this.model = null
        this.physicsMeshs = null
        this.meshs = null
        this.animations = null
        if (this.mixer)
            this.mixer = null
        this.isAnimated = null

        this.experience = null
    }
}