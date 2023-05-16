import {BoxGeometry, Mesh, MeshBasicMaterial, Object3D} from "three";
import Experience from "../../Experience.js";


export default class Npc {
    constructor(data) {
        this.experience = new Experience()

        this.name = data.name

        this.dialog = data.dialog

        this.object = new Object3D()
        this.object.position.set(data.position.x, data.position.y, data.position.z)
        this.object.rotation.set(data.rotation.x, data.rotation.y, data.rotation.z)

        this.setModel()
    }

    setModel() {
        // create a cube and add it to the scene
        const geometry = new BoxGeometry(1, 1, 1)
        const material = new MeshBasicMaterial({color: 0xff0000})
        const cube = new Mesh(geometry, material)
        this.object.add(cube)
        this.experience.scene.add(this.object)
    }

    catch() {
        console.log(this.name)
    }

    update() {

    }

    destroy() {
        this.experience.scene.remove(this.object)

        // null
        this.object = null
        this.experience = null
        this.name = null
        this.dialog = null

        // Dispose
        this.object.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose()
                child.material.dispose()
            }
        })
    }
}