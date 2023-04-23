import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Bush
{
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resource = this.resources.items.bush
        this.setModel()
    }

    setModel() {
        for (let i = 0; i < 1000; i++) {
            const angle = Math.random() * Math.PI * 2 // Random angle
            const radius = Math.random() * 1000     // Random radius

            const x = Math.cos(angle) * radius        // Get the x position using cosinus
            const z = Math.sin(angle) * radius        // Get the z position using sinus

            this.model = this.resource.scene.clone()
            this.model.scale.set(0.2, 0.2, 0.2)
            this.model.position.set(x, 0.2, z)
            // Rotation
            this.model.rotation.y = (Math.random() - 0.5) * 0.4
            this.scene.add(this.model)
            this.model.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true
                }
            })
        }
    }
}