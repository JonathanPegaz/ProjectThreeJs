import { Vector3, PerspectiveCamera } from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.debug = this.experience.debug
        this.control = null

        this.isOrbitControlActive = false

        this.setInstance()

        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Camera')
            this.debugFolder.add(this, 'isOrbitControlActive')
            this.debugFolder.add(this.instance, 'near').step(0.001).min(0.001).max(1000).name('near')
            this.debugFolder.add(this.instance, 'far').step(0.001).min(0.001).max(1000).name('far')

            this.debugFolder.close()
        }
    }

    setInstance()
    {
        this.instance = new PerspectiveCamera(60, this.sizes.width / this.sizes.height, 0.001, 5000)
        this.instance.position.set(-5, 6, -10)
        this.scene.add(this.instance)

        this.control = new OrbitControls(this.instance, this.canvas)
        this.control.enableDamping = true
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    get Direction() {
        return this.instance.getWorldDirection(new Vector3())
    }

    update()
    {
        if (this.isOrbitControlActive)
        {
            this.control.update()
        }
    }

    destroy() {
        this.control.dispose()
    }
}