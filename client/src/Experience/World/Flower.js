import Experience from '../Experience.js'
import {DynamicDrawUsage, InstancedMesh, Mesh, MeshToonMaterial, Object3D} from "three";

export default class Flower
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Resource
        this.resource = this.resources.items.flowers

        this.setModel()
        //this.setAnimation()
    }

    setModel() {
        this.model = this.resource.scene
        this.geometry = this.resource.scene.children[0].geometry
        this.material = new MeshToonMaterial({ // On crée le matériau du buisson
            ...this.resource.scene.children[0].material,
            type: 'MeshToonMaterial',
            depthWrite: true,
            transparent: false,
        })

        const count = this.model.children.length // Nombre d'enfants du modèle
        const dummy = new Object3D() // Un objet temporaire pour stocker les transformations
        const positions = [] // Tableaux pour stocker les positions, rotations et échelles
        const rotations = []
        const scales = []

        for (let i = 0; i < count; i++) {
            positions.push(this.model.children[i].position.x, this.model.children[i].position.y, this.model.children[i].position.z) // On ajoute la position, la rotation et l'échelle à leurs tableaux respectifs
            rotations.push(this.model.children[i].rotation.x, this.model.children[i].rotation.y, this.model.children[i].rotation.z)
            scales.push(this.model.children[i].scale.x, this.model.children[i].scale.y, this.model.children[i].scale.z)
        }

        // On crée l'InstancedMesh
        this.instancedMesh = new InstancedMesh(this.geometry, this.material, count)
        this.instancedMesh.instanceMatrix.setUsage(DynamicDrawUsage) // On définit l'usage à DynamicDrawUsage

        for (let i = 0; i < count; i++) {
            dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]) // On applique les transformations sur l'objet temporaire
            dummy.rotation.set(rotations[i * 3], rotations[i * 3 + 1], rotations[i * 3 + 2])
            dummy.scale.set(scales[i * 3], scales[i * 3 + 1], scales[i * 3 + 2])
            dummy.updateMatrix() // On met à jour la matrice de transformation de l'objet temporaire
            this.instancedMesh.setMatrixAt(i, dummy.matrix) // On définit la matrice d'instance avec la matrice de transformation de l'objet temporaire
        }

        this.scene.add(this.instancedMesh) // On ajoute l'InstancedMesh à la scène

    }

    destroy() {
        this.scene.remove(this.instancedMesh)

        this.model.traverse((child) =>
        {
            if(child instanceof Mesh)
            {
                child.material.dispose()
                child.geometry.dispose()
            }
        })

        this.instancedMesh.traverse((child) =>
        {
            if(child instanceof Mesh)
            {
                child.material.dispose()
                child.geometry.dispose()
            }
        })

        // null
        this.experience = null
        this.scene = null
        this.resources = null
        this.resource = null
        this.model = null
        this.instancedMesh = null

    }

}