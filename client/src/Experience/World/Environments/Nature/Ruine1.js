import Model3D from "../../Model3D.js";
import {Mesh, MeshBasicMaterial, SphereGeometry} from "three";
import Dialog from "../../Npc/Dialog.js";
import Experience from "../../../Experience.js";

export default class Ruine1 extends Model3D
{
    constructor(model)
    {
        super(model)

        this.experience = new Experience()
        this.mesh = null
        this.type = 'collectable'
        this.itemToCollect = 'carrot'
        this.questMarkerDisabled = true

        this.inquireId = 1
        this.experience.world.inquireZone.push(this)
    }

    setHitbox(element) {
        this.mesh = element
        const geometry = new SphereGeometry(.5, 16, 16)
        const material = new MeshBasicMaterial({ color: 0xff0000, wireframe: true, visible: this.debug.active ?? false })
        const hitbox = new Mesh(geometry, material)
        hitbox.position.set(element.geometry.boundingSphere.center.x-.3, element.geometry.boundingSphere.center.y-.8, element.geometry.boundingSphere.center.z+1)
        return hitbox
    }

    interact(origin, mesh, limit = null, zone = false) {
        super.interact(origin, mesh, limit, zone);
    }

    setDialog() {
        const data = [
            "Un parrain sera toujours à votre disposition pour vous aider dans votre aventure.",
            "Vous pourrez à votre tour parrainer des initiés en fonction de votre quantité de Kooma.",
            "Soyez bienveillant, cette relation vous permettra sûrement de développer un lien fort avec votre parrain ou vos filleuls.",
            "Pour vous aider, voici une petite récompense."
        ]

        this.dialog = new Dialog(data, this.mesh)
        this.experience.controls.on('actionDown', () => {
            if (!this.isInteracting) return

            if (!this.dialog.isStarted) {
                this.isPlayerInteracting = true
                this.dialog.start()

                return;
            }

            this.dialog.nextLine()

            if (this.dialog.isFinished) {
                this.isPlayerInteracting = false
                this.dialog.isFinished = false
                this.dialog.isStarted = false

                this.trigger('collect', [['carrot', 4995]])
                this.trigger('inquire', [this.inquireId])

                return;
            }
        })
    }

    destroy() {
        if (this.dialog) this.dialog.destroy()
        this.dialog = null
        this.mesh = null
        this.questMarkerDisabled = null
        this.itemToCollect = null
        this.inquireId = null
    }
}