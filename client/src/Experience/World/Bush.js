import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Bush
{
    constructor(count) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resource = this.resources.items.bush2
        this.setModel()
    }

    setInstance()
    {
        this.geometry = new THREE.BufferGeometry()
        this.positions = new Float32Array(this.count * 3);
        this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));

        // Precompute the values of Math.cos(angle) and Math.sin(angle) for each angle in a lookup table
        this.cosTable = [];
        this.sinTable = [];
        for (let i = 0; i < 1000; i++) {
            const angle = Math.random() * Math.PI * 2;
            this.cosTable.push(Math.cos(angle));
            this.sinTable.push(Math.sin(angle));
        }
    }

    setModel() {
        for (let i = 0; i < 100; i++) {
            const angle = Math.random() * Math.PI * 2 // Random angle
            const radius = Math.random() * 1000     // Random radius

            const x = Math.cos(angle) * radius        // Get the x position using cosinus
            const z = Math.sin(angle) * radius        // Get the z position using sinus

            this.model = this.resource.scene.clone()
            this.model.scale.set(0.012, 0.012, 0.012)
            this.model.position.set(x, 0.2, z)
            // Rotation
            this.model.rotation.y = (Math.random() - 0.5) * 0.4
            this.scene.add(this.model)
            this.model.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.material.side = THREE.DoubleSide
                    child.castShadow = true
                }
            })
        }
    }
}