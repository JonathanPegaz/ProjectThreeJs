import Model3D from "../../Model3D.js";
import Experience from "../../../Experience.js";
import * as THREE from "three";
import {Mesh, MeshBasicMaterial, MeshToonMaterial, PlaneGeometry} from "three";

export default class Crystal extends Model3D
{
    constructor(model)
    {
        super(model)
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.pressAction = 0
        this.type = 'collectable'
        this.itemToCollect = 'crystal'
        this.object = new THREE.Object3D()
        //TODO: find crystal group position
        this.object.position.set(-18, 26, 41)
        this.scene.add(this.object)

        this.setMinimapIcon()
    }

    setMinimapIcon() {
        // plane for the crystal in the minimap
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
        super.interact(origin, mesh, null, false)
        if (this.experience.controls.keys.down.action) {
            this.pressAction++
            this.experience.audioController.DiggingGround.play()
            mesh.marker.press(this.pressAction, 100)
            if (this.pressAction > 100) {
                this.pressAction = 0
                mesh.marker.stopPress()
                this.experience.audioController.DiggingGround.pause()
                this.trigger('collect', [['crystal', 1]])
                this.experience.audioController.playSound('Notification')
            }
        } else {
            this.pressAction = 0
            mesh.marker.stopPress()
            this.experience.audioController.DiggingGround.pause()
        }
    }

    stopInteract(mesh) {
        super.stopInteract(mesh)
        this.pressAction = 0
    }

    destroy() {
        this.pressAction = null
        this.type = null
        this.itemToCollect = null
    }
}