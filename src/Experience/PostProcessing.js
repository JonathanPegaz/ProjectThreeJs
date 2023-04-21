import * as THREE from 'three'
import Experience from './Experience.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js'
import {TintShader} from "./Shaders/PostProcessingShaders.js";
import {DotScreenPass} from "three/addons/postprocessing/DotScreenPass.js";
import {GammaCorrectionShader} from "three/addons/shaders/GammaCorrectionShader.js";
import {SMAAPass} from "three/addons/postprocessing/SMAAPass.js";
import {UnrealBloomPass} from "three/addons/postprocessing/UnrealBloomPass.js";

export default class PostProcessing
{
    constructor()
    {
        this.experience = new Experience()
        this.renderer = this.experience.renderer
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.sizes = this.experience.sizes
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('PostProcessing')
        }

        this.setInstance()
        this.setupEffect()
    }

    setInstance()
    {
        const renderTarget = new THREE.WebGLRenderTarget(
            800,
            600,
            {
                samples: 2
            }
        )

        this.instance = new EffectComposer(this.renderer.instance, renderTarget)
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    setupEffect() {
        // Render pass
        const renderPass = new RenderPass(this.scene, this.camera.instance)
        this.instance.addPass(renderPass)

        // Dot screen pass
        const dotScreenPass = new DotScreenPass()
        dotScreenPass.enabled = false
        this.instance.addPass(dotScreenPass)

        // Glitch pass
        const glitchPass = new GlitchPass()
        glitchPass.goWild = true
        glitchPass.enabled = false
        this.instance.addPass(glitchPass)

        // RGB shift pass
        const rgbShiftPass = new ShaderPass(RGBShiftShader)
        rgbShiftPass.enabled = false
        this.instance.addPass(rgbShiftPass)

        // Gamma correction pass
        const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader)
        gammaCorrectionPass.enabled = false
        this.instance.addPass(gammaCorrectionPass)

        // Antialias pass
        if(this.renderer.instance.getPixelRatio() === 1 && !this.renderer.instance.capabilities.isWebGL2)
        {
            const smaaPass = new SMAAPass()
            this.instance.addPass(smaaPass)
        }

        // Unreal bloom pass
        const unrealBloomPass = new UnrealBloomPass()
        unrealBloomPass.enabled = false
        this.instance.addPass(unrealBloomPass)
        unrealBloomPass.strength = 0.3
        unrealBloomPass.radius = 1
        unrealBloomPass.threshold = 0.6

        // Tint pass
        const tintPass = new ShaderPass(TintShader)
        tintPass.material.uniforms.uTint.value = new THREE.Vector3()
        tintPass.enabled = false
        this.instance.addPass(tintPass)

        // Debug
        if(this.debug.active)
        {
            // Dot screen Debug
            this.debugFolderDotScreen = this.debugFolder.addFolder('DotScreen')
            this.debugFolderDotScreen.add(dotScreenPass, 'enabled').name('enabled')
            this.debugFolderDotScreen.add(dotScreenPass.uniforms.scale, 'value').min(0).max(10).step(0.001).name('scale')
            this.debugFolderDotScreen.add(dotScreenPass.uniforms.angle, 'value').min(0).max(10).step(0.001).name('angle')

            // Glitch Debug
            this.debugFolderGlitch = this.debugFolder.addFolder('Glitch')
            this.debugFolderGlitch.add(glitchPass, 'enabled').name('enabled')
            this.debugFolderGlitch.add(glitchPass, 'goWild').name('goWild')

            // RGB shift Debug
            this.debugFolderRGBShift = this.debugFolder.addFolder('RGBShift')
            this.debugFolderRGBShift.add(rgbShiftPass, 'enabled').name('enabled')
            this.debugFolderRGBShift.add(rgbShiftPass.material.uniforms.amount, 'value').min(0).max(1).step(0.001).name('amount')

            // Gamma correction Debug
            this.debugFolderGammaCorrection = this.debugFolder.addFolder('GammaCorrection')
            this.debugFolderGammaCorrection.add(gammaCorrectionPass, 'enabled').name('enabled')

            // Unreal bloom Debug
            this.debugFolderUnrealBloom = this.debugFolder.addFolder('UnrealBloom')
            this.debugFolderUnrealBloom.add(unrealBloomPass, 'enabled').name('enabled')
            this.debugFolderUnrealBloom.add(unrealBloomPass, 'strength').min(0).max(1).step(0.001).name('strength')
            this.debugFolderUnrealBloom.add(unrealBloomPass, 'radius').min(0).max(2).step(0.001).name('radius')
            this.debugFolderUnrealBloom.add(unrealBloomPass, 'threshold').min(0).max(1).step(0.001).name('threshold')

            // Tint Debug
            this.debugFolderTint = this.debugFolder.addFolder('Tint')
            this.debugFolderTint.add(tintPass, 'enabled').name('enabled')
            this.debugFolderTint.add(tintPass.material.uniforms.uTint.value, 'x').min(- 1).max(1).step(0.001).name('red')
            this.debugFolderTint.add(tintPass.material.uniforms.uTint.value, 'y').min(- 1).max(1).step(0.001).name('green')
            this.debugFolderTint.add(tintPass.material.uniforms.uTint.value, 'z').min(- 1).max(1).step(0.001).name('blue')


        }

    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    update()
    {
        this.instance.render()
    }
}