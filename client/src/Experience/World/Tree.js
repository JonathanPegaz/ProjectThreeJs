import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Tree
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug


        // Resource
        this.resource = this.resources.items.Arbres

        this.setModel()
        //this.setAnimation()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(1, 1, 1)
        this.scene.add(this.model)
        
        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.material = new THREE.MeshToonMaterial({ // On crée le matériau du buisson
                    ...child.material,
                    //depthWrite: true,
                    depthFunc: 7,
                    type: 'MeshToonMaterial',
                    side: THREE.DoubleSide,
                })
                console.log(child.material)
                child.castShadow = true
            }
        })
    }

    destroy() 
    {
        this.scene.remove(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.material.dispose()
                child.geometry.dispose()
            }
        })
    }

}