import { Object3D, Mesh, DoubleSide, MeshToonMaterial} from 'three';
import Experience from '../Experience.js';


export default class Landscape {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resource = this.resources.items.islandHigh

        this.object = new Object3D()
        this.object.position.set(0, 0, 0)
        this.object.frustumCulled = false

        this.setModel()
    }

    setModel() {
        this.model = this.resource.scene
        this.model.scale.set(1, 1, 1)
        this.model.traverse((child) => {
            child.frustumCulled = false
            if(child instanceof Mesh) {
                this.experience.physics.createTrimeshShape(child)
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