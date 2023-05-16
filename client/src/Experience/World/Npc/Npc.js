import {BoxGeometry, Mesh, MeshBasicMaterial, Object3D} from "three";
import Experience from "../../Experience.js";


export default class Npc {
    constructor() {
        this.experience = new Experience()

        this.object = new Object3D()
        this.setModel()
    }

    setModel() {
        // create a cube and add it to the scene
        const geometry = new BoxGeometry(1, 1, 1)
        const material = new MeshBasicMaterial({color: 0xff0000})
        const cube = new Mesh(geometry, material)
        this.object.add(cube)
        this.experience.scene.add(this.object)

        this.object.position.set(-84, 15.5, -17)
    }

    update() {

    }

    destroy() {
        this.experience.scene.remove(this.object)

        // Dispose
        this.object.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose()
                child.material.dispose()
            }
        })
    }
}