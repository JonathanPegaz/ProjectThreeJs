import {WebGLRenderer, sRGBEncoding, CineonToneMapping, PCFSoftShadowMap, NoToneMapping, LinearToneMapping, ReinhardToneMapping, ACESFilmicToneMapping} from 'three'
import Experience from './Experience.js'

export default class Renderer
{
    constructor()
    {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        this.setInstance()
    }

    setInstance()
    {
        this.instance = new WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })
        this.instance.physicallyCorrectLights = true
        this.instance.outputEncoding = sRGBEncoding
        this.instance.toneMapping = NoToneMapping
        this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = PCFSoftShadowMap
        this.instance.setClearColor('#211d20')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))

        if(this.experience.debug.active) {
            this.debugFolder = this.experience.debug.ui.addFolder('renderer')
            this.debugFolder.close()
            this.debugFolder.add(this.instance, 'toneMapping', {
                No: NoToneMapping,
                Linear: LinearToneMapping,
                Reinhard: ReinhardToneMapping,
                Cineon: CineonToneMapping,
                ACESFilmic: ACESFilmicToneMapping
            })
            this.debugFolder.add(this.instance, 'toneMappingExposure').min(0).max(10).step(0.001)
        }
    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    update()
    {
        this.instance.render(this.scene, this.camera.instance)
    }

    destroy() {
        this.instance.dispose()
    }
}