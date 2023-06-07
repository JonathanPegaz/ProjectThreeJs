import Model3D from "../../Model3D.js";
import {
    BoxGeometry,
    CircleGeometry,
    Color,
    DoubleSide, Mesh, MeshBasicMaterial, PointLight,
    ShaderMaterial
} from "three";
import * as THREE from "three";
import QuestMarker from "../../../Interface/QuestMarker.js";
import InteractMarker from "../../../Interface/InteractMarker.js";
import Dialog from "../../Npc/Dialog.js";

export default class PortailShader extends Model3D
{
    constructor(model)
    {
        super(model)
    }

    setModel() {
        this.debugObject = {
            portalColorStart: '#ffffff',
            portalColorEnd: '#21b4d6'
        }
        this.isShader = true
         // create rounded plane and a texture

        const geometry = new CircleGeometry( 1.31, 32 )
        const portalShader = new ShaderMaterial({
            side: DoubleSide,
            uniforms:
                {
                    uTime: { value: 0 },
                    uColorStart: { value: new Color(this.debugObject.portalColorStart) },
                    uColorEnd: { value: new Color(this.debugObject.portalColorEnd) }
                },
            vertexShader: `
            varying vec2 vUv;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    vUv = uv;
}`,
            fragmentShader: `
            uniform float uTime;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;

varying vec2 vUv;

//    Classic Perlin 3D Noise 
//    by Stefan Gustavson
//
vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

float cnoise(vec3 P)
{
    vec3 Pi0 = floor(P); // Integer part for indexing
    vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 

    return 2.2 * n_xyz;
}

void main()
{
    // Displace the UV
    vec2 displacedUv = vUv + cnoise(vec3(vUv * 5.0, uTime * 0.1));

    // Perlin noise
    float strength = cnoise(vec3(displacedUv * 5.0, uTime * 0.2));

    // Outer glow
    float outerGlow = distance(vUv, vec2(0.5)) * 5.0 - 1.4;
    strength += outerGlow;

    // Apply cool step
    strength += step(- 0.2, strength) * 0.8;

    // // Clamp the value from 0 to 1
    // strength = clamp(strength, 0.0, 1.0);

    // Final color
    vec3 color = mix(uColorStart, uColorEnd, strength);

    gl_FragColor = vec4(color, 1.0);
}`,
        })

        this.model = new Mesh(geometry, portalShader)
        this.model.position.set(52.5230598449707, 14.867735862731934, -71.97135925292969)
        this.model.rotation.set(0, Math.PI/11, 0)
        this.model.scale.set(1, 1, 1)
        this.model.castShadow = true
        this.setPhysicsMeshs(this.model)
        this.model.visible = false

        this.portailpointLight = new PointLight(0x21b4d6, 20, 10)
        this.portailpointLight.position.set(52.52305, 14.867, -71.9713)
        this.portailpointLight.visible = false
        this.experience.scene.add(this.portailpointLight)

        if(this.experience.debug.active)
        {
            this.debugFolder = this.experience.debug.ui.addFolder('portal')
            this.debugFolder.addColor(this.debugObject, 'portalColorStart').onChange(() =>
            {
                portalShader.uniforms.uColorStart.value.set(this.debugObject.portalColorStart)
            })
            this.debugFolder.addColor(this.debugObject, 'portalColorEnd').onChange(() =>
            {
                portalShader.uniforms.uColorEnd.value.set(this.debugObject.portalColorEnd)
            })
        }

        this.relativeId = 1
        this.name = "PortalShader"
        this.model.object = new THREE.Object3D()
        this.model.object.position.set(52.52305, 14.867, -71.9713)
        this.experience.scene.add(this.model.object)
        this.model.marker = new InteractMarker(this.model, 0)
        this.meshs.push(this.model)
        this.setHitbox()
        this.add()

        this.setDialog()
    }

    setHitbox() {
        const geometry = new BoxGeometry(3, 3, .5)
        const material = new MeshBasicMaterial({ color: 0xff0000, wireframe: true, visible: this.debug.active ?? false })
        this.model.hitbox = new Mesh(geometry, material)
        this.model.hitbox.position.set(0,0,0)
        this.model.object.add(this.model.hitbox)
    }

    interact(origin, mesh) {
        super.interact(origin, mesh, null, false)
    }

    setDialog() {
        const data = [
            'WHOOOOOSSSHHH'
        ]

        this.dialog = new Dialog(data, this.model)
        this.experience.controls.on('actionDown', () => {
            if (!this.isInteracting) return

            if (!this.dialog.isStarted) {
                this.isPlayerInteracting = true
                this.dialog.start()

                return;
            }

            this.dialog.nextLine()

            if (this.dialog.isFinished) {
                this.isPlayerInteracting = false
                this.dialog.isFinished = false
                this.dialog.isStarted = false

                this.trigger(`talk`, [this.relativeId])

                return;
            }
        })
    }

    destroy() {
        this.dialog.destroy()
        this.dialog = null
        this.model = null
    }

}