import Experience from '../Experience.js'
import {AdditiveBlending, BufferAttribute, BufferGeometry, Color, Points, ShaderMaterial} from "three";


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
                    uSize: { value: 100 },
                    uColor: { value: new Color('#ffffff') },
                },
            vertexShader: `uniform float uTime;
                        uniform float uPixelRatio;
                        uniform float uSize;
                        
                        attribute float aScale;
                        
                        void main()
                        {
                            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                            modelPosition.y += sin(uTime + modelPosition.x * 100.0) * aScale * 0.2;
                        
                            vec4 viewPosition = viewMatrix * modelPosition;
                            vec4 projectionPosition = projectionMatrix * viewPosition;
                        
                            gl_Position = projectionPosition;
                            
                            gl_PointSize = uSize * aScale * uPixelRatio;
                            gl_PointSize *= (1.0 / - viewPosition.z);
                        }`,
            fragmentShader: `
                            uniform vec3 uColor;
                            void main()
                            {
                                float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
                                float strength = 0.05 / distanceToCenter - 0.1;
                            
                                gl_FragColor = vec4(uColor, strength);
                            }`,
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