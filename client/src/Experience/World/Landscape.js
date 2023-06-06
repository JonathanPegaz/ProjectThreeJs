import {Object3D, Mesh, FrontSide, MeshToonMaterial} from 'three';
import Experience from '../Experience.js';


export default class Landscape {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resource = this.resources.items.islandHigh

        this.object = new Object3D()
        this.object.position.set(0, 0, 0)

        this.setModel()
    }

    setModel() {
        this.model = this.resource.scene
        this.model.traverse((child) => {
            child.frustumCulled = false
            if(child instanceof Mesh) {
                this.experience.physics.createTrimeshShape(child)
                child.material = new MeshToonMaterial({ // On crée le matériau du buisson
                    ...child.material,
                    side: FrontSide,
                    depthWrite: true,
                    type: 'MeshToonMaterial',
                    transparent: false,
                })
                child.receiveShadow = true
                child.castShadow = false
            }
            child.matrixAutoUpdate = false
            child.matrixWorldNeedsUpdate = false
        })
        this.object.add(this.model)
        this.scene.add(this.object)
    }

    destroy() {
        this.scene.remove(this.object)

        this.model.traverse((child) => {
            if(child instanceof Mesh) {
                child.material.map.dispose()
                child.material.dispose()
                child.geometry.dispose()
            }
        })

        // null
        this.experience = null
        this.scene = null
        this.resources = null
        this.resource = null
    }

}