import {
    AnimationMixer,
    BoxGeometry,
    FrontSide,
    Mesh,
    MeshBasicMaterial,
    MeshToonMaterial,
    Object3D, PlaneGeometry,
    SphereGeometry
} from "three";
import Experience from "../../Experience.js";
import Dialog from "./Dialog.js";
import {clone} from "three/examples/jsm/utils/SkeletonUtils.js";
import Pseudo from "../../Interface/Pseudo.js";
import Icons from "../../Interface/Icons.js";
import EventEmitter from "../../Utils/EventEmitter.js";
import QuestMarker from "../../Interface/QuestMarker.js";
import * as CANNON from "cannon-es";
import {gsap} from "gsap";

export default class Npc extends EventEmitter{
    constructor(data) {
        super()
        this.experience = new Experience()
        this.physics = this.experience.physics
        this.resources = this.experience.resources

        this.animations_type = data.animations_type

        this.id = data.id
        this.object = new Object3D()
        this.object.position.set(data.position.x, data.position.y, data.position.z)
        this.object.rotation.set(data.rotation.x, data.rotation.y, data.rotation.z)

        this.canInteract = false
        this.isPlayerInteracting = false

        this.hitbox = null

        this.icon = new Icons(this, '')

        this.setModel()
        this.setAnimation()
        this.setPhysics()
        this.setHitbox()
        this.name = new Pseudo(this, data.name, false)
        this.setDialog(data.dialog)
        this.setQuest(data.quest)
        this.travelIndex = 0
        this.setTravelPoint(data.travelPoints)
        this.marker = new QuestMarker(this, 0.0)
    }

    setModel() {
        this.model = clone(this.resources.items[`${this.animations_type}_idle`].scene)
        this.model.scale.set(0.175, 0.175, 0.175)
        this.model.position.set(0, -0.6, 0)

        this.model.traverse((child) =>
        {
            if(child instanceof Mesh)
            {
                child.castShadow = false
                child.material = new MeshToonMaterial({
                    ...child.material,
                    side: FrontSide,
                    type: 'MeshToonMaterial',
                })
            }
        })

        this.object.add(this.model)
        // Fake shadow
        const shadowgeo = new PlaneGeometry( 1, 1 );
        const shadowmat = new MeshBasicMaterial( {
            map: this.resources.items.roundshadow, transparent: true, depthWrite: false} );
        const shadow = new Mesh( shadowgeo, shadowmat );
        shadow.renderOrder = -1;
        shadow.rotation.x = - Math.PI / 2;
        shadow.position.y = -0.55;
        this.object.add( shadow );

        this.experience.scene.add(this.object)
    }

    setAnimation()
    {
        this.animations = {}

        this.mixer = new AnimationMixer(this.model)

        // action
        this.animations.idle = {
            clip: this.resources.items[`${this.animations_type}_idle`].animations[0],
            action: this.mixer.clipAction(this.resources.items[`${this.animations_type}_idle`].animations[0])
        }

        this.animations.walk = {
            clip: this.resources.items[`${this.animations_type}_walking`].animations[0],
            action: this.mixer.clipAction(this.resources.items[`${this.animations_type}_walking`].animations[0])
        }

        this.animations.run = {
            clip: this.resources.items[`${this.animations_type}_walking`].animations[0],
            action: this.mixer.clipAction(this.resources.items[`${this.animations_type}_walking`].animations[0])
        }

        // start idle animation at random time
        this.animations.idle.action.time = Math.random() * this.animations.idle.action.getClip().duration
        this.animations.idle.action.play()
    }

    setPhysics() {

        const shape = new CANNON.Sphere(0.6); // dimensions de la boîte
        this.body = new CANNON.Body({
            shape: shape,
            mass: 100,
            position: new CANNON.Vec3(this.object.position.x, this.object.position.y, this.object.position.z),
            // position: new CANNON.Vec3(53, 14, -68),
            fixedRotation: true,
        })

        this.physics.world.addBody(this.body)

        this.physics.objectsToUpdate.push({
            mesh: this.object,
            body: this.body
        })
    }

    setHitbox() {
        const geometry = new BoxGeometry(1.5, 2, 1.5)
        const material = new MeshBasicMaterial({color: 0xff00ff, wireframe: true, visible: this.experience.debug.active ?? false})
        this.hitbox = new Mesh(geometry, material)
        this.object.add(this.hitbox)
    }

    setDialog(dialog) {
        if (dialog.length === 0) {
            return;
        }
        this.dialog = new Dialog(dialog, this)
        this.icon.change('commentaires-64')
        this.experience.controls.on('actionDown', () => {
            if (!this.canInteract)
                return;

            this.trigger(`talk`, [this.id])
            
            if (!this.dialog.isStarted) {
                this.isPlayerInteracting = true
                this.dialog.start()
                this.icon.visible(false)
                if (this.anim) {
                    this.anim.pause()
                    this.setBodyRotation(
                        this.experience.localPlayer.object.position.x - this.object.position.x,
                        this.experience.localPlayer.object.position.z - this.object.position.z)
                }

                return;
            }

            this.dialog.nextLine()

            if (this.dialog.isFinished) {
                this.isPlayerInteracting = false
                this.dialog.isFinished = false
                this.dialog.isStarted = false

                if (this.quest) {
                    this.experience.world.quest.add(this.quest.id)
                    this.endDialog = this.quest.endDialog
                    this.experience.world.quest.on('completed', () => {
                        this.icon.change('commentaires-64')
                        this.experience.world.quest.off('completed')
                        this.dialog.dialog = this.endDialog
                    })
                    this.quest = null
                }

                if (this.anim) {
                    this.anim.resume()
                    this.setBodyRotation(
                        this.travelPoints[this.travelIndex].x - this.body.position.x,
                        this.travelPoints[this.travelIndex].z - this.body.position.z)
                }


                this.icon.visible(true)
                return;
            }
        })
    }

    setQuest(quest) {
        if (!quest)
            return;

        this.quest = quest
        this.icon.change('exclamation-mark-100')
    }

    setTravelPoint(travelPoints) {
        if (!travelPoints)
            return;

        this.travelPoints = travelPoints
        this.setBodyRotation(
            this.travelPoints[this.travelIndex].x - this.body.position.x,
            this.travelPoints[this.travelIndex].z - this.body.position.z)

        this.anim = gsap.to(this.body.position, {
            duration: 10,
            x: travelPoints[this.travelIndex].x,
            z: travelPoints[this.travelIndex].z,
            onComplete: () => {
                this.travelIndex++
                if (this.travelIndex >= this.travelPoints.length) {
                    this.travelIndex = 0
                }
                gsap.delayedCall(1, () => {
                    this.setTravelPoint(this.travelPoints)
                })
            },
        })
    }

    setBodyRotation(x, z) {
        const rotation = Math.atan2(
            x, z
        )
        this.body.quaternion.setFromEuler(0, rotation, 0, 'XYZ')
    }

    interact(value) {
        this.canInteract = value
    }

    update() {
        this.mixer.update(this.experience.time.delta / 1000)
        this.name.update()
        this.icon.update()

        if (!this.experience.controls)
            return;

        if(!this.canInteract){
            return;
        }

        if (!this.isPlayerInteracting) {
            return;
        }

    }

    destroy() {
        if (this.icon)
            this.icon.destroy()

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