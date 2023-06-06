import Model3D from "../../../../Model3D.js";
import {CylinderGeometry, Mesh, MeshBasicMaterial, MeshToonMaterial, SphereGeometry} from "three";
import Experience from "../../../../../Experience.js";

export default class ArbreSacre extends Model3D
{
    constructor(model)
    {
        super(model)
        this.experience = new Experience()
        this.mesh = null
        this.timeToInteract = 100
    }

    setHitbox(element) {
        if (element.name !== "crystal_5_low008") return false
        this.mesh = element
        const geometry = new CylinderGeometry(2, 2, 3, 16, 16, false, 0, 6.3)
        const material = new MeshBasicMaterial({ color: 0xff0000, wireframe: true, visible: this.debug.active ?? false })
        const hitbox = new Mesh(geometry, material)
        hitbox.position.set(element.geometry.boundingSphere.center.x, element.geometry.boundingSphere.center.y-2.5, element.geometry.boundingSphere.center.z)
        return hitbox
    }

    interact(origin, mesh) {
        this.experience.localPlayer.canKick = true
        super.interact(origin, mesh, null, false)
        if (this.experience.controls.keys.down.action) {
            this.pressAction++
            mesh.marker.press(this.pressAction, this.timeToInteract)
            if (this.pressAction > this.timeToInteract) {
                this.pressAction = 0
                mesh.marker.stopPress()
                this.experience.world.Fruit_ramasse.playAnimation().then(() => {
                    this.experience.world.Fruit_ramasse.setStaticHitbox()
                })
            }
        } else {
            this.pressAction = 0
            mesh.marker.stopPress()
        }
    }

    setMaterial(child) {
        child.material = new MeshToonMaterial({
            ...child.material,
            type: 'MeshToonMaterial',
            alphaTest: 0.5,
            depthWrite: true,
            transparent: false,
        })
    }

    setPhysicsMeshs(child) {
        if (child.name.endsWith('_1') || child.name.endsWith('_2')) {
            this.physicsMeshs.push(child)
        }
    }

    destroy() {
        this.mesh = null
        this.questMarkerDisabled = null
        this.itemToCollect = null
        this.timeToInteract = null
    }
}