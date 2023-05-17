import {BoxGeometry, Mesh, MeshBasicMaterial, Object3D} from "three";
import Experience from "../../Experience.js";
import Icons from "../../Interface/Icons.js";


export default class Npc {
    constructor(data) {
        this.experience = new Experience()

        this.id = data.id
        this.name = data.name
        this.dialog = data.dialog

        this.canInteract = false

        this.object = new Object3D()
        this.object.position.set(data.position.x, data.position.y, data.position.z)
        this.object.rotation.set(data.rotation.x, data.rotation.y, data.rotation.z)

        if (this.dialog.length > 0) {
            // create a speak icon
            console.log('create speak icon')
            this.speakIcon = new Icons(this, 'exclamationMark')
            //this.speakIcon.visible(true)
        }

        this.hitbox = null

        this.setModel()
        this.setHitbox()
    }

    setModel() {
        // create a cube and add it to the scene
        const geometry = new BoxGeometry(1, 1, 1)
        const material = new MeshBasicMaterial({color: 0xff0000})
        const cube = new Mesh(geometry, material)
        this.object.add(cube)
        this.experience.scene.add(this.object)
    }

    setHitbox() {
        const geometry = new BoxGeometry(1, 1, 1)
        const material = new MeshBasicMaterial({color: 0xff00ff, wireframe: true, visible: this.experience.debug.active ?? false})
        this.hitbox = new Mesh(geometry, material)
        this.hitbox.position.set(this.object.position.x, this.object.position.y, this.object.position.z)
        this.experience.scene.add(this.hitbox)
    }

    interact() {
        this.canInteract = true
    }

    update() {
        if (this.canInteract) {
            // display npc name

            this.canInteract = false
            // this.experience.world.htmlDialog.open(this.dialog)
        }
    }

    destroy() {
        this.experience.scene.remove(this.object)

        // null
        this.object = null
        this.experience = null
        this.name = null
        this.dialog = null

        if (this.speakIcon)
            this.speakIcon.destroy()

        // Dispose
        this.object.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose()
                child.material.dispose()
            }
        })
    }
}