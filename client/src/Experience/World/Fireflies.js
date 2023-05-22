import * as THREE from 'three'
import Experience from '../Experience.js'
import {ShaderMaterial} from "three";
import portalVertexShader from '../shaders/portal/vertex.glsl'
import portalFragmentShader from '../shaders/portal/fragment.glsl'
import firefliesVertexShader from '../shaders/fireflies/vertex.glsl'
import firefliesFragmentShader from '../shaders/fireflies/fragment.glsl'


export default class Fireflies
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug
        /*this.debugObject = {
            portalColorStart: '#cbc8c8',
            portalColorEnd: '#6a6a71'
        }

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('portal')
            this.debugFolder.addColor(this.debugObject, 'portalColorStart').onChange(() =>
            {
                this.portal.material.uniforms.uColorStart.value.set(this.debugObject.portalColorStart)
            })
            this.debugFolder.addColor(this.debugObject, 'portalColorEnd').onChange(() =>
            {
                this.portal.material.uniforms.uColorEnd.value.set(this.debugObject.portalColorEnd)
            })
        }*/
        this.setModel()
    }

    setModel()
    {
/*        // create a plane and a texture
        const geometry = new THREE.PlaneGeometry(1, 1, 1, 1)
        const portalShader = new ShaderMaterial({
            side: THREE.DoubleSide,
            uniforms:
                {
                    uTime: { value: 0 },
                    uColorStart: { value: new THREE.Color(this.debugObject.portalColorStart) },
                    uColorEnd: { value: new THREE.Color(this.debugObject.portalColorEnd) }
                },
            vertexShader: portalVertexShader,
            fragmentShader: portalFragmentShader,
        })
        this.portal = new THREE.Mesh(geometry, portalShader)
        this.portal.position.set(-90, 17, -19)
        this.portal.scale.set(1, 1, 1)
        this.scene.add(this.portal)*/

        // Fireflies
        const firefliesGeometry = new THREE.BufferGeometry()
        const firefliesCount = 300
        const positionArray = new Float32Array(firefliesCount * 3)
        const scaleArray = new Float32Array(firefliesCount)

        for(let i = 0; i < firefliesCount; i++)
        {
            positionArray[i * 3 + 0] = 52 + (Math.random() - 0.5) * 10
            positionArray[i * 3 + 1] = 14 + Math.random() * 2
            positionArray[i * 3 + 2] = -71 + (Math.random() - 0.5) * 10

            scaleArray[i] = Math.random()
        }

        firefliesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
        firefliesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1))

        // Material
        this.firefliesMaterial = new THREE.ShaderMaterial({
            uniforms:
                {
                    uTime: { value: 0 },
                    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
                    uSize: { value: 100 }
                },
            vertexShader: firefliesVertexShader,
            fragmentShader: firefliesFragmentShader,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        })
        this.scene.add(new THREE.Points(firefliesGeometry, this.firefliesMaterial))
    }


    update()
    {
        // Update portal
        //this.portal.material.uniforms.uTime.value = this.time.elapsed * 0.001
        this.firefliesMaterial.uniforms.uTime.value = this.time.elapsed * 0.001
    }

    destroy() {

        this.experience = null
        this.scene = null
        this.time = null
        this.debug = null
        this.debugFolder = null
        this.debugObject = null

    }
}