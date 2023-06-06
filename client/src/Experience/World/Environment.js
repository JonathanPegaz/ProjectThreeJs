import Experience from '../Experience.js'
import {
    DirectionalLight,
    HemisphereLight,
    Mesh,
    MeshStandardMaterial,
    PlaneGeometry,
    sRGBEncoding,
    Vector3
} from "three";
import {overlayMaterial} from "../Shaders/OverlayShaders.js";
import {gsap} from "gsap";
import CristauxPortail from "./Environments/Nature/CristauxPortail.js";

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        
        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('environment')
            this.debugFolder.close()
        }

        this.isNight = false

        this.flameLights = []

        this.setSunLight()
        this.setEnvironmentMap()
        // black overlay
        this.overlayGeometry = new PlaneGeometry(2, 2, 1, 1)
        this.overlay = new Mesh(this.overlayGeometry, overlayMaterial)
        this.scene.add(this.overlay)
    }

    setSunLight()
    {
        //this.sunLight = new THREE.DirectionalLight('#001624', 4)
        //this.sunLight = new DirectionalLight('#ffee50', 4)
        this.sunLight = new DirectionalLight('#ffffff', 4)
        this.sunLight.position.set(0, 50, 30)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 300
        this.sunLight.shadow.mapSize.set(16384, 16384)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.shadow.camera.top = 100
        this.sunLight.shadow.camera.bottom = - 100
        this.sunLight.shadow.camera.left = - 100
        this.sunLight.shadow.camera.right = 100

        this.scene.add(this.sunLight)

        // add hemisphere light green and blue
        this.hemiLight = new HemisphereLight( 0xffffff, 0x444444 );
        this.hemiLight.position.set( 0, 20, 0 );
        this.scene.add( this.hemiLight );

        // Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.sunLight, 'intensity')
                .name('sunLightIntensity')
                .min(0)
                .max(10)
                .step(0.001)

            this.debugFolder
                .add(this.sunLight.position, 'x')
                .name('sunLightX')
                .min(- 5)
                .max(5)
                .step(0.001)

            this.debugFolder
                .add(this.sunLight.position, 'y')
                .name('sunLightY')
                .min(- 5)
                .max(5)
                .step(0.001)

            this.debugFolder
                .add(this.sunLight.position, 'z')
                .name('sunLightZ')
                .min(- 5)
                .max(5)
                .step(0.001)

            // color
            this.debugFolder
                .addColor(this.sunLight, 'color')
                .name('sunLightColor')
                .onChange(() =>
                {
                    this.sunLight.color.set(this.sunLight.color)
                }).listen()

            // Hemisphere color
            this.debugFolder
                .addColor(this.hemiLight, 'color')
                .name('hemiLightColor')
                .onChange(() =>
                {
                    this.hemiLight.color.set(this.hemiLight.color)
                }).listen()

            // Hemisphere ground color
            this.debugFolder
                .addColor(this.hemiLight, 'groundColor')
                .name('hemiLightGroundColor')
                .onChange(() =>
                {
                    this.hemiLight.groundColor.set(this.hemiLight.groundColor)
                }).listen()
        }
    }

    setEnvironmentMap()
    {
        this.environmentMap = {}
        this.environmentMap.intensity = 0.4
        this.environmentMap.texture = this.resources.items.skybox
        this.environmentMap.texture.encoding = sRGBEncoding

        this.scene.background = this.environmentMap.texture
        //this.scene.environment = this.environmentMap.texture

        this.environmentMap.updateMaterials = () =>
        {
            this.scene.traverse((child) =>
            {
                if(child instanceof Mesh && child.material instanceof MeshStandardMaterial)
                {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }
        this.environmentMap.updateMaterials()

        // Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.environmentMap, 'intensity')
                .name('envMapIntensity')
                .min(0)
                .max(4)
                .step(0.001)
                .onChange(this.environmentMap.updateMaterials)

            // setNight
            this.debugFolder
                .add(this, 'setNight')
                .name('setNight')

            // setDay
            this.debugFolder
                .add(this, 'setDay')
                .name('setDay')
        }
    }

    setNight() {
        this.isNight = true
        this.addOverlay()

        this.experience.npc.moveNpcToNightPosition()
        this.experience.world.Portail_shader.model.visible = true
        this.experience.world.Portail_shader.portailpointLight.visible = true
        this.experience.world.Fruit_pose.model.visible = true
        this.experience.world.Cristaux_portail.model.visible = true

        this.sunLight.color.setHex(0x001624)
        this.hemiLight.color.setHex(0x3b3b3b)

        this.environmentMap.texture = this.resources.items.skybox_night
        this.scene.background = this.environmentMap.texture
        //this.scene.environment = this.environmentMap.texture
        this.experience.scene.fog.color.setHex(0x001624)
        this.experience.world.fireflies.firefliesMaterial.uniforms.uColor.value.setHex(0xe3cf3e)
        this.experience.world.firefliesSecond.firefliesMaterial.uniforms.uColor.value.setHex(0x0021f3)

        this.flameLights.forEach(flameLight => {
            flameLight.visible = true
        })

        window.setTimeout(() => {
            this.removeOverlay()
        }, 500)
    }

    setDay() {
        this.isNight = false
        this.addOverlay()

        this.experience.npc.moveNpcToDayPosition()

        this.experience.world.Portail_shader.model.visible = false
        this.experience.world.Portail_shader.portailpointLight.visible = false
        this.experience.world.Fruit_pose.model.visible = false
        this.experience.world.Cristaux_portail.model.visible = false

        this.sunLight.color.setHex(0xffffff)
        this.hemiLight.color.setHex(0xffffff)

        this.environmentMap.texture = this.resources.items.skybox
        this.scene.background = this.environmentMap.texture
        //this.scene.environment = this.environmentMap.texture
        this.experience.scene.fog.color.setHex(0xffffff)
        this.experience.world.fireflies.firefliesMaterial.uniforms.uColor.value.setHex(0xffffff)
        this.experience.world.firefliesSecond.firefliesMaterial.uniforms.uColor.value.setHex(0xF9D016)

        this.flameLights.forEach(flameLight => {
            flameLight.visible = false
        })

        window.setTimeout(() => {
            this.removeOverlay()
        }, 500)
    }

    addOverlay() {
        // Animate overlay
        overlayMaterial.uniforms.uAlpha.value = 1
    }

    removeOverlay() {
        // Animate overlay
        gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 })
    }

    update() {

    }

    destroy() {
        this.overlay.geometry.dispose()
        this.overlay.material.dispose()
        this.scene.remove(this.overlay)
        this.overlay = null

        this.sunLight.dispose()
        this.scene.remove(this.sunLight)
        this.sunLight = null

        this.hemiLight.dispose()
        this.scene.remove(this.hemiLight)
        this.hemiLight = null

        this.environmentMap.texture.dispose()
        this.scene.background = null
        this.scene.environment = null
        this.environmentMap = null

        this.scene = null
        this.resources = null
        this.debug = null
    }
}