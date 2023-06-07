import Model3D from "../../Model3D.js";
import {Mesh, MeshBasicMaterial, SphereGeometry} from "three";
import Dialog from "../../Npc/Dialog.js";

export default class Ruine2 extends Model3D
{
    constructor(model)
    {
        super(model)

        this.mesh = null
        this.type = 'collectable'
        this.itemToCollect = 'mushroom'
        this.questMarkerDisabled = true

        this.id = 2
        this.experience.world.inquireZone.push(this)
    }

    setHitbox(element) {
        this.mesh = element
        const geometry = new SphereGeometry(.5, 16, 16)
        const material = new MeshBasicMaterial({ color: 0xff0000, wireframe: true, visible: this.debug.active ?? false })
        const hitbox = new Mesh(geometry, material)
        hitbox.position.set(element.geometry.boundingSphere.center.x-1, element.geometry.boundingSphere.center.y-.8, element.geometry.boundingSphere.center.z+.5)
        return hitbox
    }

    interact(origin, mesh, limit = null, zone = false) {
        super.interact(origin, mesh, limit, zone);
    }

    setDialog() {
        const data = [
            'Il faut faire un texte sur le parrain',
            'blablabla',
            "Là faut dire qu'/en récompense il y a 4990 carottes",
        ]

        this.dialog = new Dialog(data, this.mesh)
        this.experience.controls.on('actionDown', () => {
            if (!this.isInteracting) return

            this.trigger(`talk`, [this.id])

            if (!this.dialog.isStarted) {
                this.isPlayerInteracting = true
                this.dialog.start()
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

                this.trigger('collect', [['mushroom', 4990]])

                if (this.anim) {
                    this.anim.resume()
                    this.setBodyRotation(
                      this.travelPoints[this.travelIndex].x - this.body.position.x,
                      this.travelPoints[this.travelIndex].z - this.body.position.z)
                }

                return;
            }
        })
    }

    destroy() {
        if(this.dialog) this.dialog.destroy()
        this.dialog = null
        this.mesh = null
        this.questMarkerDisabled = null
        this.itemToCollect = null
        this.id = null
    }
}