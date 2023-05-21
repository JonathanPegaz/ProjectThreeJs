import {BoxGeometry, Mesh, MeshBasicMaterial, Object3D, SphereGeometry} from "three";
import Experience from "../../Experience.js";
import HTMLDialog from "../../HTMLInterface/HTMLDialog.js";
import Dialog from "./Dialog.js";


export default class Npc {
    constructor(data) {
        this.experience = new Experience()

        this.id = data.id
        this.name = data.name
        this.dialog = new Dialog(data.dialog, this)

        this.canInteract = false

        this.object = new Object3D()
        this.object.position.set(data.position.x, data.position.y, data.position.z)
        this.object.rotation.set(data.rotation.x, data.rotation.y, data.rotation.z)

        this.speakIcon = null

        this.isPlayerInteracting = false

        this.hitbox = null

        this.setModel()
        this.setHitbox()
    }

    setModel() {
        // create a cube and add it to the scene
        const geometry = new BoxGeometry(1, 1, 1)
        const material = new MeshBasicMaterial({color: 0x00ff00})
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
        if (!this.experience.controls)
            return;

        if(!this.canInteract){
            if (this.speakIcon) {
                this.speakIcon.visible(false)
            }
            return;
        }

        if (!this.isPlayerInteracting) {
            // display npc name
            if (this.speakIcon && !this.dialog.isFinished) {
                this.speakIcon.visible(true)
                this.speakIcon.update()
            }

            // player press E
            if (this.experience.controls.keys.down.action) {
                if (!this.dialog.isFinished) {
                    this.isPlayerInteracting = true
                    this.dialog.start()
                }
            }

            this.canInteract = false
            return;
        }

        if (this.experience.controls.keys.down.action && this.isPlayerInteracting) {
            if (!this.dialog.isFinished) {
                this.dialog.nextLine()
            } else {
                if (this.speakIcon)
                    this.speakIcon.destroy()
                this.speakIcon = null
                this.isPlayerInteracting = false
                this.canInteract = false
            }
        }
    }

    destroy() {
        if (this.speakIcon)
            this.speakIcon.destroy()

        this.experience.scene.remove(this.object)

        // Dispose
        this.object.traverse((child) => {
            if (child instanceof Mesh) {
                child.geometry.dispose()
                child.material.dispose()
            }
        })

        // null
        this.id = null
        this.object = null
        this.experience = null
        this.name = null
        this.dialog = null
        this.hitbox = null
    }
}