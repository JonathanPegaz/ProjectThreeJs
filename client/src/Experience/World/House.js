import Experience from '../Experience.js'
import {Mesh, MeshToonMaterial} from "three";

export default class House
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug


        // Resource
        this.resource = this.resources.items.house

        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(1, 1, 1)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof Mesh)
            {
                //this.experience.physics.createBoxShape(child)

                child.material = new MeshToonMaterial({ // On crée le matériau du buisson
                    ...child.material,
                    type: 'MeshToonMaterial',
                    transparent: false,
                })
            }
        })
    }

    destroy()
    {
        this.scene.remove(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof Mesh)
            {
                child.material.dispose()
                child.geometry.dispose()
            }
        })
    }

}