import {WebGLRenderer, sRGBEncoding, CineonToneMapping, PCFSoftShadowMap, NoToneMapping, LinearToneMapping, ReinhardToneMapping, ACESFilmicToneMapping} from 'three'
import Experience from './Experience.js'
import {CSS2DRenderer} from "three/addons/renderers/CSS2DRenderer.js";

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
        this.setLabelRenderer()
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

    setLabelRenderer() {
        this.labelRenderer = new CSS2DRenderer();
        this.labelRenderer.setSize(this.sizes.width, this.sizes.height);
        this.labelRenderer.domElement.style.position = 'absolute';
        this.labelRenderer.domElement.style.top = '0px';

        document.body.appendChild(this.labelRenderer.domElement);
    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))

        this.labelRenderer.setSize(this.sizes.width, this.sizes.height);
    }

    update()
    {
        this.instance.render(this.scene, this.camera.instance)
        this.labelRenderer.render(this.scene, this.camera.instance);
    }

    destroy() {
        this.instance.dispose()

        // null
        this.instance = null
        this.labelRenderer = null
        this.experience = null
        this.canvas = null
        this.sizes = null
        this.scene = null
        this.camera = null
    }
}