import Experience from '../Experience.js'
import {AdditiveBlending, BufferAttribute, BufferGeometry, Points, ShaderMaterial} from "three";
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
        this.setModel()
    }

    setModel()
    {
        // Fireflies
        this.firefliesGeometry = new BufferGeometry()
        const firefliesCount = 6000
        const positionArray = new Float32Array(firefliesCount * 3)
        const scaleArray = new Float32Array(firefliesCount)

        for(let i = 0; i < firefliesCount; i++)
        {
            positionArray[i * 3 + 0] = 19 + (Math.random() - 0.5) * 245
            positionArray[i * 3 + 1] = 14 + Math.random() * 3
            positionArray[i * 3 + 2] = 12-3 + (Math.random() - 0.5) * 200

            scaleArray[i] = Math.random()
        }

        this.firefliesGeometry.setAttribute('position', new BufferAttribute(positionArray, 3))
        this.firefliesGeometry.setAttribute('aScale', new BufferAttribute(scaleArray, 1))

        // Material
        this.firefliesMaterial = new ShaderMaterial({
            uniforms:
                {
                    uTime: { value: 0 },
                    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
                    uSize: { value: 100 }
                },
            vertexShader: firefliesVertexShader,
            fragmentShader: firefliesFragmentShader,
            blending: AdditiveBlending,
            alphaTest: 0.9,
            depthWrite: false,
            transparent: false,
        })
        this.scene.add(new Points(this.firefliesGeometry, this.firefliesMaterial))
    }


    update()
    {
        // Update portal
        this.firefliesMaterial.uniforms.uTime.value = this.time.elapsed * 0.001
    }

    destroy() {

        this.firefliesGeometry.dispose()
        this.firefliesGeometry = null

        this.firefliesMaterial.dispose()
        this.firefliesMaterial = null

        this.experience = null
        this.scene = null
        this.time = null
        this.debug = null
        this.debugFolder = null
        this.debugObject = null
    }
}