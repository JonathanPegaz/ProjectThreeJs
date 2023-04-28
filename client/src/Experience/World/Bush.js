import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Bush
{
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resource = this.resources.items.tree
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
            this.model.scale.set(2, 2, 2)
            this.model.position.set(x, -2, z)
            // Rotation
            this.model.rotation.y = (Math.random() - 0.5) * 0.4
            this.scene.add(this.model)
            this.gradientMap = this.resources.items.onetone
            this.gradientMap.minFilter = THREE.NearestFilter
            this.gradientMap.magFilter = THREE.NearestFilter
            this.model.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    
                    console.log(this.gradientMap)
                    child.material = new THREE.MeshToonMaterial({...child.material, type: 'MeshToonMaterial', gradientMap: this.gradientMap})
                    console.log(child.material)
                    //child.material.side = THREE.DoubleSide
                    //child.castShadow = true
                }
            })
        }
    }
}