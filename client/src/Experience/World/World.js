import * as THREE from 'three'
import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js'
import HTMLPoints from "../HTMLInterface/HTMLPoints.js";
import BasicCharacterController from "./Player/CharacterController.js";
import ThirdPersonCamera from "./Player/ThirdPersonCamera.js";
import Bush from "./Bush.js";
import InfoBeacon from "./InteractableObject/InfoBeacon.js";
import UndergroundSF from "./Buildings/UndergroundSF.js";
import LocalPlayer from "./Player/LocalPlayer.js";

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            var vertexShader = `
            #define SCALE 10.0
            
            varying vec2 vUv;
            
            uniform float uTime;
            
            float calculateSurface(float x, float z) {
                float y = 0.0;
                y += (sin(x * 1.0 / SCALE + uTime * 1.0) + sin(x * 2.3 / SCALE + uTime * 1.5) + sin(x * 3.3 / SCALE + uTime * 0.4)) / 3.0;
                y += (sin(z * 0.2 / SCALE + uTime * 1.8) + sin(z * 1.8 / SCALE + uTime * 1.8) + sin(z * 2.8 / SCALE + uTime * 0.8)) / 3.0;
                return y;
            }
            
            void main() {
                vUv = uv;
                vec3 pos = position;
                
                float strength = 1.0;
                pos.y += strength * calculateSurface(pos.x, pos.z);
                pos.y -= strength * calculateSurface(0.0, 0.0);
            
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }  
            `;
                
            var fragmentShader = `
            varying vec2 vUv;
            
            uniform sampler2D uMap;
            uniform float uTime;
            uniform vec3 uColor;
            
            void main() {
                vec2 uv = vUv * 10.0 + vec2(uTime * -0.05);
            
                uv.y += 0.01 * (sin(uv.x * 3.5 + uTime * 0.35) + sin(uv.x * 4.8 + uTime * 1.05) + sin(uv.x * 7.3 + uTime * 0.45)) / 3.0;
                uv.x += 0.12 * (sin(uv.y * 4.0 + uTime * 0.5) + sin(uv.y * 6.8 + uTime * 0.75) + sin(uv.y * 11.3 + uTime * 0.2)) / 3.0;
                uv.y += 0.12 * (sin(uv.x * 4.2 + uTime * 0.64) + sin(uv.x * 6.3 + uTime * 1.65) + sin(uv.x * 8.2 + uTime * 0.45)) / 3.0;
            
                vec4 tex1 = texture2D(uMap, uv * 1.0);
                vec4 tex2 = texture2D(uMap, uv * 1.0 + vec2(0.2));
            
                vec3 blue = uColor;
            
                gl_FragColor = vec4(blue + vec3(tex1.a * 0.9 - tex2.a * 0.02), 1.0);
            }
            `;

            this.uniforms = {
                uMap: {type: 't', value: null},
                uTime: {type: 'f', value: 0},
                uColor: {type: 'f', value: new THREE.Color('#0051da')},
            };

            this.waterTexture = this.resources.items.water
            this.waterTexture.wrapS = this.waterTexture.wrapT = THREE.REPEAT_WRAPPING
    
            this.shader = new THREE.ShaderMaterial({
                uniforms: this.uniforms,
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                side: THREE.DoubleSide,
            });

            this.shader.uniforms.uMap.value = this.waterTexture

            this.geometry = new THREE.PlaneBufferGeometry(50, 50, 20, 20);
            this.geometry.rotateX(-Math.PI / 2);

            this.mesh = new THREE.Mesh(this.geometry, this.shader)
            this.scene.add(this.mesh)

            this.bush = new Bush()
            this.infoBeacon = new InfoBeacon()
            this.undergroundSF = new UndergroundSF()
            this.player = new LocalPlayer(true)
            this.environment = new Environment()
            this.htmlPoint = new HTMLPoints()
        })
    }

    update()
    {
        if(this.player)
            this.player.update()

        if (this.htmlPoint)
            this.htmlPoint.update()

        if (this.shader)
            this.shader.uniforms.uTime.value = this.time.elapsed * 0.001

    }
}