import {Color, ShaderMaterial, Vector2} from "three";

export const waterMaterial2 = new ShaderMaterial({
    uniforms: {
        time: { value: 0.0 },
        resolution: { value: new Vector2() },
        noiseTexture: { value: null },
        waterColor: {
            value: new Color()
        }
    },
    vertexShader: `
    varying vec2 vUv;

        void main() {
          vUv = uv;
          vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
          gl_Position = projectionMatrix * mvPosition;
        }
    `,
    fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        uniform sampler2D noiseTexture;
        uniform vec3 waterColor;
        
        void main() {
          vec2 uv = gl_FragCoord.xy / resolution.xy;
          vec2 p = -1.0 + 2.0 * uv;
          p.x *= resolution.x / resolution.y;
        
          // Water noise
          float noise = 0.0;
          float scale = 1.0;
          for (int i = 0; i < 4; i++) {
            vec2 r = vec2(cos(time * 0.1), sin(time * 0.1)) * scale;
            vec2 uv = p * scale + r;
            float n = texture2D( noiseTexture, uv ).x;
            noise += n * (1.0 / scale);
            scale *= 2.0;
          }
        
          // Water distortion
          p += vec2(noise * 0.1, noise * 0.05);
        
          // Water surface
          float surface = 0.0;
          surface += smoothstep(0.0, 0.1, abs(noise));
          surface += smoothstep(0.2, 0.3, abs(noise));
          surface = 1.0 - surface;
        
          // Final color
          vec3 color = mix(waterColor, vec3(1.0), surface);
        
          gl_FragColor = vec4(color, 1.0);
        }
    `
})