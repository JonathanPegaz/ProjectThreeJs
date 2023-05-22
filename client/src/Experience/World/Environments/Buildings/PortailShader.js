import Model3D from "../../Model3D.js";
import {
    AdditiveBlending,
    BufferAttribute,
    BufferGeometry,
    Color,
    DoubleSide,
    MeshToonMaterial,
    Points,
    ShaderMaterial
} from "three";
import portalVertexShader from "../../../Shaders/portal/vertex.glsl";
import portalFragmentShader from "../../../Shaders/portal/fragment.glsl";
import firefliesVertexShader from "../../../Shaders/fireflies/vertex.glsl";
import firefliesFragmentShader from "../../../Shaders/fireflies/fragment.glsl";


export default class PortailShader extends Model3D
{
    constructor(model)
    {
        super(model)
    }

    setMaterial(child) {
        this.shaderMaterial =  new ShaderMaterial({
            side: DoubleSide,
            uniforms:
                {
                    uTime: { value: 0 },
                    uColorStart: { value: new Color('#cbc8c8') },
                    uColorEnd: { value: new Color('#6a6a71') }
                },
            vertexShader: portalVertexShader,
            fragmentShader: portalFragmentShader,
        })
        child.material = this.shaderMaterial

        // Fireflies
        const firefliesGeometry = new BufferGeometry()
        const firefliesCount = 30
        const positionArray = new Float32Array(firefliesCount * 3)
        const scaleArray = new Float32Array(firefliesCount)

        for(let i = 0; i < firefliesCount; i++)
        {
            positionArray[i * 3 + 0] = child.position.x + (Math.random() - 0.5) * 4
            positionArray[i * 3 + 1] = child.position.y + Math.random() * 1.5
            positionArray[i * 3 + 2] = child.position.z + (Math.random() - 0.5) * 4

            scaleArray[i] = Math.random()
        }

        firefliesGeometry.setAttribute('position', new BufferAttribute(positionArray, 3))
        firefliesGeometry.setAttribute('aScale', new BufferAttribute(scaleArray, 1))

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
            transparent: true,
            blending: AdditiveBlending,
            depthWrite: false
        })
        this.experience.scene.add(new Points(firefliesGeometry, this.firefliesMaterial))
    }
}