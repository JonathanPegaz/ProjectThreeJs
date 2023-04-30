import * as THREE from 'three'
import Experience from '../Experience.js'
import * as CANNON from 'cannon-es'
import {ConvexGeometry} from "three/addons/geometries/ConvexGeometry.js";
import CannonUtils from "../Utils/CannonUtils.js";
import {bodyToMesh} from "../Utils/Utils.js";

export default class Terrain {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.physics = this.experience.physics

        this.resource = this.resources.items.island_lowpoly

        this.object = new THREE.Object3D()
        this.object.add(new THREE.AxesHelper(50))
        this.object.position.set(0, 0, 0)

        this.setModel()
        this.setPhysics2()
    }


    setModel() {
        this.model = this.resource.scene
        this.model.traverse((child) => {
            if(child instanceof THREE.Mesh) {
                //child.material.wireframe = true
                child.castShadow = true
            }
        })
        this.model.children[0].position.set(0, 0, 0)
        this.model.children[0].geometry.center()
        console.log(this.model.children[0])

        this.object.add(this.model)
        this.scene.add(this.object)
    }

    setPhysics1() {
        // try physics with trimesh & convex polyhedron

        const shape = CannonUtils.createCannonConvex(this.model.children[0].geometry)

        const geometry = new THREE.BufferGeometry()
        const points = []
        for (let i = 0; i < shape.vertices.length; i += 1) {
            const v = shape.vertices[i]
            points.push(new THREE.Vector3(v.x, v.y, v.z))
        }
        geometry.setFromPoints(points)

        const indices = []
        for (let i = 0; i < shape.faces.length; i++) {
            const face = shape.faces[i]
            const a = face[0]
            for (let j = 1; j < face.length - 1; j++) {
                const b = face[j]
                const c = face[j + 1]
                indices.push(a, b, c)
            }
        }
        geometry.setIndex(indices)

        const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: true,
        }))

        this.object.add(mesh)

        //const shape = CannonUtils.createTrimesh(convexHull.geometry)
        const body = new CANNON.Body({mass: 0})
        body.addShape(shape)
        this.physics.world.addBody(body)
    }

    setPhysics2() {
       /* // Récupérez le mesh correspondant au terrain
        const mesh = this.model.children[0]

        // Obtenez la matrice de modèle du terrain pour la transformation des coordonnées en y
        const matrix = mesh.matrix;

        // Récupérez les coordonnées en y de votre terrain
        const heights = mesh.geometry.attributes.position.array.filter((_, i) => i % 3 === 1);

        // Appliquez la matrice de modèle aux coordonnées en y pour les transformer en coordonnées du monde de Three.js
        const position = new THREE.Vector3();
        for (let i = 0; i < heights.length; i++) {
            position.set(0, heights[i], 0);
            position.applyMatrix4(matrix);
            heights[i] = position.y;
        }
        console.log(heights)

        const data = []
        for (let i = 0; i < 1000; i++) {
            const y = 0.5 * Math.cos(0.2 * i)
            data.push(y)
        }*/

        const terrain = this.model.children[0]

        /*// Create a matrix of height values
        const matrix = []
        const sizeX = 15
        const sizeZ = 15
        for (let i = 0; i < sizeX; i++) {
            matrix.push([])
            for (let j = 0; j < sizeZ; j++) {
                if (i === 0 || i === sizeX - 1 || j === 0 || j === sizeZ - 1) {
                    const height = 3
                    matrix[i].push(height)
                    continue
                }

                const height = Math.cos((i / sizeX) * Math.PI * 2) * Math.cos((j / sizeZ) * Math.PI * 2) + 2
                matrix[i].push(height)
            }
        }*/

       /* console.log(matrix)

        // Create the heightfield
        const heightfieldShape = new CANNON.Heightfield(matrix, {
            elementSize: 1,
        })


        // Créez un corps physique pour le terrain et ajoutez le `Heightfield`
        const terrainBody = new CANNON.Body({
            mass: 0, // Le terrain est statique, donc sa masse est de 0
            shape: heightfieldShape,
        });

        // Ajoutez le corps physique du terrain à votre monde Cannon.js
        this.physics.world.addBody(terrainBody)

        const mesh = bodyToMesh(terrainBody, new THREE.MeshLambertMaterial({
            color: 0xdddddd
        }))
        mesh.rotation.x = -Math.PI / 2
        console.log(mesh)
        // enable shadows on every object
        mesh.traverse((child) => {
        })

        this.scene.add(mesh)*/
    }

}