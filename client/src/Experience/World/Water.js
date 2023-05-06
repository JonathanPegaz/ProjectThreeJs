import Experience from '../Experience.js';
import {
    PlaneBufferGeometry,
    RepeatWrapping,
    Mesh,
    AxesHelper,
    WebGLRenderTarget,
    NearestFilter,
    MeshDepthMaterial, RGBADepthPacking, NoBlending
} from "three";
import {waterMaterial} from "../Shaders/WaterShader.js";
import {waterMaterial2} from "../Shaders/WaterShader2.js";


export default class Water {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;



        this.params = {
            foamColor: 0xffffff,
            waterColor: 0x14c6a5,
            threshold: 0.1
        }

        if (this.experience.debug.active) {
            this.gui = this.experience.debug.ui
            this.guiFolder = this.gui.addFolder('Water')
            this.guiFolder.open()
            this.guiFolder.addColor(this.params, 'foamColor')
            this.guiFolder.addColor(this.params, 'waterColor')
            this.guiFolder.add(this.params, 'threshold').min(0).max(1).step(0.01)
        }


        this.setGeometry();
        this.setTextures();
        this.setRenderTarget();
        this.setMaterial();
    }

    setGeometry() {
        this.geometry = new PlaneBufferGeometry(100, 100)
        this.geometry.rotateX(-Math.PI / 2)
    }

    setTextures() {
        this.dudvMap = this.resources.items.noise
        this.dudvMap.wrapS = this.dudvMap.wrapT = RepeatWrapping
    }

    setRenderTarget() {
        this.renderTarget = new WebGLRenderTarget(this.experience.sizes.width, this.experience.sizes.height)
        this.renderTarget.texture.magFilter = this.renderTarget.texture.minFilter = NearestFilter
        this.renderTarget.texture.generateMipmaps = false
        this.renderTarget.stencilBuffer = false
    }

    setMaterial() {
        this.waterMaterial = waterMaterial2

        /*this.waterMaterial.uniforms.cameraNear.value = 0.1
        this.waterMaterial.uniforms.cameraFar.value = 100
        this.waterMaterial.uniforms.resolution.value.set(this.experience.sizes.width, this.experience.sizes.height)

        this.waterMaterial.uniforms.tDudv.value = this.dudvMap
        this.waterMaterial.uniforms.tDepth.value = this.renderTarget.texture*/

        this.waterMaterial.uniforms.noiseTexture.value = this.dudvMap


        this.mesh = new Mesh(this.geometry, this.waterMaterial)
        this.mesh.position.set(0, -5, 0)

        // add Axeshelpers
        this.mesh.add(new AxesHelper(50))

        this.scene.add(this.mesh)
        console.log(this.mesh)
    }

    update() {
        if (this.waterMaterial)
            this.waterMaterial.uniforms.time.value = this.experience.time.elapsed * 0.001
/*            this.waterMaterial.uniforms.threshold.value = this.params.threshold
            this.waterMaterial.uniforms.foamColor.value.set(this.params.foamColor)*/
            this.waterMaterial.uniforms.waterColor.value.set(this.params.waterColor)
    }
}