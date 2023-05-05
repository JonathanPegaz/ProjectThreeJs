import * as THREE from 'three'
import Experience from '../Experience.js'
import { gsap } from 'gsap'

export default class Bush
{
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.debug = this.experience.debug

        this.resource = this.resources.items.bush
        this.geometry = this.resource.scene.children[0].geometry // On récupère la géométrie du buisson

        this.material = new THREE.MeshLambertMaterial({ // On crée le matériau du buisson
            ...this.resource.scene.children[0].material,
            type: 'MeshLambertMaterial',
         })

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Bush')
            this.debugObject = {}

            this.debugObject.fadein = () => {
                gsap.to(this.material, { duration: 2, opacity: 1 });
                this.instancedMesh.visible = true
            }
            this.debugObject.fadeout = () => {
                gsap.to(this.material, { duration: 2, opacity: 0 });
                this.instancedMesh.visible = false
            }

            this.debugFolder.add(this.debugObject, 'fadein')
            this.debugFolder.add(this.debugObject, 'fadeout')

        }

         this.instancedMesh = null // On initialise l'InstancedMesh
         this.setModel2()
    }

    setModel() {
        const count = 1000 // Nombre d'instances à créer
        const dummy = new THREE.Object3D() // Un objet temporaire pour stocker les transformations
        const positions = [] // Tableaux pour stocker les positions, rotations et échelles
        const rotations = []
        const scales = []

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2 // Random angle
            const radius = Math.random() * 100 // Random radius

            const x = Math.cos(angle) * radius // Get the x position using cosinus
            const z = Math.sin(angle) * radius // Get the z position using sinus

            positions.push(x, 0.2, z) // On ajoute la position, la rotation et l'échelle à leurs tableaux respectifs
            rotations.push(0, Math.random() * Math.PI * 2, 0)
            scales.push(0.12, 0.12, 0.12)
        }

        // On crée l'InstancedMesh
        this.instancedMesh = new THREE.InstancedMesh(this.geometry, this.material, count)
        this.instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage) // On définit l'usage à DynamicDrawUsage

        for (let i = 0; i < count; i++) {
            dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]) // On applique les transformations sur l'objet temporaire
            dummy.rotation.set(rotations[i * 3], rotations[i * 3 + 1], rotations[i * 3 + 2])
            dummy.scale.set(scales[i * 3], scales[i * 3 + 1], scales[i * 3 + 2])
            dummy.updateMatrix() // On met à jour la matrice de transformation de l'objet temporaire
            this.instancedMesh.setMatrixAt(i, dummy.matrix) // On définit la matrice d'instance avec la matrice de transformation de l'objet temporaire
        }

        this.scene.add(this.instancedMesh)
        this.instancedMesh.castShadow = true // On active les ombres pour l'InstancedMesh
    }

    setModel2() {
        // create 1000 bushes
        const count = 10000
        for (let i = 0; i < count; i++) {
            const mesh = new THREE.Mesh(this.geometry, this.material)
            mesh.position.x = (Math.random() - 0.5) * 100
            mesh.position.z = (Math.random() - 0.5) * 100
            mesh.rotation.y = Math.random() * Math.PI * 2
            mesh.scale.set(0.12, 0.12, 0.12)
            this.scene.add(mesh)
        }
    }
}