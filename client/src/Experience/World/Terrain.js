import * as THREE from 'three'
import Experience from '../Experience.js'
import * as CANNON from 'cannon-es'
import {ConvexGeometry} from "three/addons/geometries/ConvexGeometry.js";
import CannonUtils from "../Utils/CannonUtils.js";

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

        this.object.add(this.model)
        this.scene.add(this.object)
    }

    setPhysics1() {
        // try physics with trimesh & convex polyhedron

       /* const shape = CannonUtils.createConvexPolyhedron(this.model.children[0].geometry)

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
        this.physics.world.addBody(body)*/
    }

    setPhysics2() {
        // create Oriented Bounding Box
        console.log(this.model.children[0].geometry)


    }

}