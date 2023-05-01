import { PerspectiveCamera } from 'three'
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

        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Camera')
            this.debugFolder.add(this, 'isOrbitControlActive')
            this.debugFolder.close()
        }

        this.setInstance()
    }

    setInstance()
    {
        this.instance = new PerspectiveCamera(60, this.sizes.width / this.sizes.height, 1, 5000)
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