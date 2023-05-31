import Model3D from "../../Model3D.js";
import Experience from "../../../Experience.js";
import QuestMarker from "../../../Interface/QuestMarker.js";
import * as THREE from "three";
import {Mesh, MeshBasicMaterial, MeshStandardMaterial, MeshToonMaterial, PlaneGeometry} from "three";

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
        this.itemToCollect = 'crystal'
        this.object = new THREE.Object3D()
        //TODO: find crystal group position
        this.object.position.set(-18, 26, 41)
        this.scene.add(this.object)

        this.marker = new QuestMarker(this, -3)

        this.setMinimapIcon()
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

    setMaterial(child) {
        child.material = new MeshToonMaterial({
            ...child.material,
            type: 'MeshToonMaterial',
            emissiveColor: 0xffffff,
            emissiveIntensity: 20,
            emissiveMap: child.material.map,
        })
    }

    interact(origin, mesh) {
        mesh.interacting = true
        mesh.marker.mark()
        console.log(this.experience.world.interactiveObject.list)
        if (this.input.keys.down.action) {
            this.pressAction++
            mesh.marker.press(this.pressAction, 200)
            if (this.pressAction > 200) {
                this.pressAction = 0
                mesh.marker.stopPress()
                console.log('collect')
                this.trigger('collect', ['crystal'])
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