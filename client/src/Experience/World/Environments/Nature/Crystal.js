import Model3D from "../../Model3D.js";
import Experience from "../../../Experience.js";
import QuestMarker from "../../../Interface/QuestMarker.js";
import * as THREE from "three";
import {FrontSide, Mesh, MeshBasicMaterial, MeshStandardMaterial, MeshToonMaterial, PlaneGeometry} from "three";

export default class Crystal extends Model3D
{
    constructor(model)
    {
        super(model)
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.input = this.experience.controls
        this.pressAction = 0
        this.type = 'collectable'
        this.itemToCollect = 'diamond'
        this.object = new THREE.Object3D()
        //TODO: find crystal group position
        this.object.position.set(-18, 26, 41)
        this.scene.add(this.object)

        this.marker = new QuestMarker(this, -3)

        this.setMinimapIcon()
        this.isBloom = true
    }

    setMinimapIcon() {
        // plane for the diamond in the minimap
        const plane = new PlaneGeometry(15, 15)
        const material = new MeshBasicMaterial({
            map: this.experience.resources.items.crystal_texture,
            transparent: true,
            depthWrite: false
        })
        const mesh = new Mesh(plane, material)
        mesh.renderOrder = -1
        mesh.position.set(-17, 26, 41)
        mesh.rotation.x = - Math.PI / 2;
        mesh.layers.set(2)
        this.scene.add(mesh)
    }

    interact(origin, mesh) {
        mesh.interacting = true
        mesh.marker.mark()
        if (this.input.keys.down.action) {
            this.pressAction++
            mesh.marker.press(this.pressAction, 200)
            if (this.pressAction > 200) {
                this.pressAction = 0
                mesh.marker.stopPress()
                this.trigger('collect', ['diamond'])
            }
        } else {
            this.pressAction = 0
            mesh.marker.stopPress()
        }
    }

    stopInteract(mesh) {
        super.stopInteract()
        this.pressAction = 0
        mesh.interacting = false
        mesh.marker.unmark()
    }

    destroy() {
        this.input = null
        this.pressAction = null
        this.type = null
        this.itemToCollect = null
        if (this.marker)
            this.marker.destroy()
        this.marker = null
    }
}