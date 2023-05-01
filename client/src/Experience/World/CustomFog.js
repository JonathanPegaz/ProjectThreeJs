import {_NOISE_GLSL } from "../Shaders/GLSL/Noise.js";
import {FogExp2, Mesh, ShaderChunk} from "three";
import Experience from "../Experience.js";


export default class CustomFog {
    constructor() {

        this.experience = new Experience()

        ShaderChunk.fog_fragment = `
            #ifdef USE_FOG
              vec3 fogOrigin = cameraPosition;
              vec3 fogDirection = normalize(vWorldPosition - fogOrigin);
              float fogDepth = distance(vWorldPosition, fogOrigin);
        
              // f(p) = fbm( p + fbm( p ) )
              vec3 noiseSampleCoord = vWorldPosition * 0.00025 + vec3(
                  0.0, 0.0, fogTime * 0.025);
              float noiseSample = FBM(noiseSampleCoord + FBM(noiseSampleCoord)) * 0.5 + 0.5;
              fogDepth *= mix(noiseSample, 1.0, saturate((fogDepth - 5000.0) / 5000.0));
              fogDepth *= fogDepth;
        
              float heightFactor = 0.05;
              float fogFactor = heightFactor * exp(-fogOrigin.y * fogDensity) * (
                  1.0 - exp(-fogDepth * fogDirection.y * fogDensity)) / fogDirection.y;
              fogFactor = saturate(fogFactor);
        
              gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
            #endif`;

        ShaderChunk.fog_pars_fragment = _NOISE_GLSL + `
            #ifdef USE_FOG
              uniform float fogTime;
              uniform vec3 fogColor;
              varying vec3 vWorldPosition;
              #ifdef FOG_EXP2
                uniform float fogDensity;
              #else
                uniform float fogNear;
                uniform float fogFar;
              #endif
            #endif`;

        ShaderChunk.fog_vertex = `
            #ifdef USE_FOG
              vWorldPosition = worldPosition.xyz;
            #endif`;

        ShaderChunk.fog_pars_vertex = `
            #ifdef USE_FOG
              varying vec3 vWorldPosition;
            #endif`;

        this.shaders_ = [];

        this.ModifyShader_ = (s) => {
            this.shaders_.push(s);
            s.uniforms.fogTime = {value: 0.0};
        }

        this.experience.scene.fog = new FogExp2(0xDFE9F3, 0.0000005);
    }

    update() {
        this.shaders_.forEach((s) => {
            s.uniforms.fogTime.value = this.experience.time.elapsed * 0.001;
        });
    }

}