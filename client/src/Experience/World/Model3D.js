import {AnimationMixer, LoopRepeat, Mesh, MeshToonMaterial, SphereGeometry, MeshBasicMaterial, Object3D, FrontSide} from "three";
import Experience from "../Experience.js";
import InteractiveObject from "./InteractiveObject/InteractiveObject.js";
import InteractMarker from "../Interface/InteractMarker.js";
import * as THREE from "three";

export default class Model3D extends InteractiveObject{
    constructor(data) {
        super(data.isInteractive)
        this.experience = new Experience()

        this.isInteractive = data.isInteractive
        this.hasPhysics = data.hasPhysics
        this.display = data.display
        this.castShadow = data.castShadow
        this.resource = data.resource

        this.meshs = []
        this.physicsMeshs = []
        this.materials = []
        this.isAnimated = data.isAnimated
        this.setModel()
    }

    setModel() {
        const file = this.experience.resources.items[this.resource]

                // set model
                this.model = file.scene
                let interactive = false
                this.model.traverse((child) =>
                {
                    if(child instanceof Mesh)
                    {
                        this.setMaterial(child)
                        this.setPhysicsMeshs(child)
                        interactive = this.setInteraction(child)
                        this.meshs.push(child)
                    }
                    child.matrixAutoUpdate = false
                    child.matrixWorldAutoUpdate = false
                })
                if (interactive) {
                    this.add()
                }

                // set animations
                this.animations = file.animations
                if (this.animations.length > 0) {
                    this.setAnimation()
                    this.isAnimated = true
                }
            }

    setMaterial(child) {
        // check if child material name already exist in materials
        for (let i = 0; i < this.materials.length; i++) {
            if (this.materials[i].name === child.material.name) {
                child.material = this.materials[i]
                return
            }
        }

        child.material = new MeshToonMaterial({
            ...child.material,
            side: FrontSide,
            type: 'MeshToonMaterial',
        })
        this.materials.push(child.material)
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

    setInteraction(child) {
        if (!this.isInteractive) return
        const geometry = new SphereGeometry(0.5, 16, 16)
        const material = new MeshBasicMaterial({ color: 0xff00ff, wireframe: true, visible: this.debug.active ?? false })
        const hitbox = new Mesh(geometry, material)
        hitbox.position.set(child.geometry.boundingSphere.center.x, child.geometry.boundingSphere.center.y, child.geometry.boundingSphere.center.z)
        child.hitbox = hitbox
        this.scene.add(child.hitbox)
        this.name = child.name
        child.object = new Object3D()
        child.object.position.set(hitbox.position.x, hitbox.position.y, hitbox.position.z)
        this.scene.add(child.object)
        child.interacting = false
        child.marker = new InteractMarker(child)

        return true
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
        this.materials = null
        if (this.mixer)
            this.mixer = null
        this.isAnimated = null
        this.isInteractive = null
        this.experience = null
        this.name = null
    }
}