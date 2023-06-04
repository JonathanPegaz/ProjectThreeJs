import { Vector3, PerspectiveCamera } from 'three'
import Experience from "../Experience.js";

export default class Minimap
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.player = this.experience.localPlayer

        this.setInstance()
    }

    setInstance()
    {
        this.instance = new PerspectiveCamera(90, this.sizes.width / this.sizes.height, 1, 100)
        this.instance.position.set(this.player.object.position.x, 32, this.player.object.position.z)
        this.instance.lookAt(this.player.object.position)
        this.instance.rotation.z = Math.PI
        this.player.object.add(this.instance)
        this.instance.layers.enable(2)
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {

    }

    destroy() {

    }
}