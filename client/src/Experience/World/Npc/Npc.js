import {AnimationMixer, BoxGeometry, Mesh, MeshBasicMaterial, Object3D, SphereGeometry} from "three";
import Experience from "../../Experience.js";
import Dialog from "./Dialog.js";
import {clone} from "three/examples/jsm/utils/SkeletonUtils.js";
import Pseudo from "../../Interface/Pseudo.js";


export default class Npc {
    constructor(data) {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.resource = this.resources.items.player

        this.id = data.id

        this.object = new Object3D()
        this.object.position.set(data.position.x, data.position.y, data.position.z)
        this.object.rotation.set(data.rotation.x, data.rotation.y, data.rotation.z)

        this.canInteract = false
        this.speakIcon =  null
        this.isPlayerInteracting = false

        this.hitbox = null

        this.setModel()
        this.setAnimation()
        this.setHitbox()
        this.name = new Pseudo(this, data.name, false)
        this.setDialog(data.dialog)
    }

    setModel() {
        this.model = clone(this.resource.scene.children[0])
        this.model.scale.set(0.2, 0.2, 0.2)
        this.model.position.set(0, -0.5, 0)

        this.model.traverse((child) =>
        {
            if(child instanceof Mesh)
            {
                child.castShadow = true
            }
        })

        this.object.add(this.model)
        this.experience.scene.add(this.object)
    }

    setAnimation()
    {
        this.animations = {}

        this.mixer = new AnimationMixer(this.model)

        // action
        this.animations.idle = {
            clip: this.resources.items.idle.animations[0],
            action: this.mixer.clipAction(this.resources.items.idle.animations[0])
        }

        this.animations.walk = {
            clip: this.resources.items.walking.animations[0],
            action: this.mixer.clipAction(this.resources.items.walking.animations[0])
        }

        this.animations.run = {
            clip: this.resources.items.walking.animations[0],
            action: this.mixer.clipAction(this.resources.items.walking.animations[0])
        }

        // start idle animation at random time
        this.animations.idle.action.time = Math.random() * this.animations.idle.action.getClip().duration
        this.animations.idle.action.play()
    }

    setHitbox() {
        const geometry = new BoxGeometry(2, 1.5, 2)
        const material = new MeshBasicMaterial({color: 0xff00ff, wireframe: true, visible: this.experience.debug.active ?? false})
        this.hitbox = new Mesh(geometry, material)
        this.hitbox.position.set(this.object.position.x, this.object.position.y, this.object.position.z)
        this.experience.scene.add(this.hitbox)
    }

    setDialog(dialog) {
        this.dialog = new Dialog(dialog, this)
        this.experience.controls.on('actionDown', () => {
            if (!this.canInteract)
                return;
            
            if (!this.dialog.isStarted) {
                this.isPlayerInteracting = true
                this.dialog.start()
                this.speakIcon.visible(false)
                return;
            }

            this.dialog.nextLine()

            if (this.dialog.isFinished) {
                this.isPlayerInteracting = false
                this.dialog.isFinished = false
                this.dialog.isStarted = false
                this.speakIcon.visible(true)
                return;
            }
        })
    }

    interact(value) {
        this.canInteract = value
    }

    update() {
        this.mixer.update(this.experience.time.delta / 1000)
        this.name.update()

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
            if (this.speakIcon) {
                this.speakIcon.visible(true)
                this.speakIcon.update()
            }

            return;
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

        this.experience.scene.remove(this.hitbox)
        this.hitbox.geometry.dispose()
        this.hitbox.material.dispose()

        this.name.destroy()
        this.dialog.destroy()

        // null
        this.id = null
        this.object = null
        this.resource = null
        this.resources = null
        this.experience = null
        this.name = null
        this.dialog = null
        this.hitbox = null
    }
}