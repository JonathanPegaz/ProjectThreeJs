import {ShaderMaterial, Color, DoubleSide} from 'three'

export const oceanMaterial = new ShaderMaterial({
    side: DoubleSide,
    uniforms:
        {
            uMap: {type: 't', value: null},
            uTime: {type: 'f', value: 0},
            uColor: {type: 'f', value: new Color('#0051da')},
        },
    vertexShader: `
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
    `,
    fragmentShader: `
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
        }`
})

export const oceanMaterial2 = new ShaderMaterial({
    side: DoubleSide,
    uniforms:
        {
            uMap: {type: 't', value: null},
            uTime: {type: 'f', value: 0},
            uColor: {type: 'f', value: new Color('#0051da')},
        },
    vertexShader: `
        varying vec2 vUv;
        varying vec3 viewZ;
        uniform float uTime;
        uniform float repeat;
    
        void main() {
          float time = uTime * 0.001;
          vUv = uv;
          vec3 newPos = position.xyz;
          newPos.z += 0.08*sin(time/1.8 + repeat*uv.y) + 0.08 * cos(time/2.0 + repeat*uv.x);
          viewZ = -(modelViewMatrix * vec4(newPos, 1.)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
        }
      `,
    fragmentShader: `
        varying vec2 vUv;
        varying vec3 viewZ;
        uniform vec2 resolution;
        uniform sampler2D depth_map;
        uniform sampler2D map;
        uniform float camera_near;
        uniform float camera_far;
        uniform float uTime;
        uniform float repeat;
        uniform vec3 color_foam;
        uniform vec3 color_shallow;
        uniform vec3 color_deep;
        uniform float opacity_shallow;
        uniform float opacity_deep;
        uniform float opacity_foam;
        uniform float max_depth;
    
        float readDepth( sampler2D depthSampler, vec2 coord ) {
          float fragCoordZ = texture2D( depthSampler, coord ).x;
          float viewZ = perspectiveDepthToViewZ( fragCoordZ, camera_near, camera_far );
          return viewZToOrthographicDepth( viewZ, camera_near, camera_far );
        }
    
        void main() {
          float time = uTime * 0.001;
          float distanceDark = 8.0;
          float distanceLight = 12.0;
          float max_depth = 3.0;
    
          // Depth of point on ocean surface
          float depth2 = viewZ.z;
    
          // Normalised depth of scene betweet 0 and 1
          float depth = readDepth( depth_map, (gl_FragCoord.xy/resolution.xy) );
    
          // Depth of scene in range of camera
          float depth1 = mix( camera_near, camera_far, depth);
    
          vec4 col1 = vec4( color_shallow, opacity_shallow );
          vec4 col2 = vec4( color_deep, opacity_deep );
    
          vec4 darkFoam = 1.0 - 0.2*smoothstep(distanceDark, 0.0,depth2)*texture2D(map, vUv * repeat*1.25);
          vec4 lightFoam = vec4(color_foam,1.0) * texture2D(map, vUv * repeat +
            (1.0/repeat) * vec2(sin(time*2.0+repeat*10.0*vUv.x), cos(time*2.0+repeat*10.0*vUv.y)) +
            (2.0/repeat) * vec2(sin(repeat*20.0*vUv.x), cos(repeat*20.0*vUv.y))
          ) * 0.5 * smoothstep(distanceLight, 0.0,depth2);
    
          if (depth1 - depth2 < 0.2) {
            gl_FragColor = vec4(color_foam,opacity_foam * smoothstep(0.0,0.1,depth1 - depth2));
          } else {
            vec4 depthCol;
            float transition = smoothstep(0.2 , 0.3, depth1 - depth2);
            float refracdepth_map = mix( camera_near, camera_far, readDepth( depth_map, (gl_FragCoord.xy + (10.0/(depth2*depth2))*vec2(sin(time + 30.0*repeat*vUv.x),cos(time + 30.0*repeat*vUv.y)))/resolution.xy ));
    
            depthCol = 1.5 * mix(0.5 * col1, col2, smoothstep(0.0, max_depth, refracdepth_map - depth2));
    
            // Don't ripple if the sampled texel is in front of the plane
            if (depth2 > refracdepth_map) {
              depthCol = 1.5 * mix(0.5 * col1, col2, smoothstep(0.0, max_depth, depth1 - depth2));
            }
            
            gl_FragColor = mix(vec4(color_foam,opacity_foam), depthCol * darkFoam + lightFoam, transition);
          }
      }
        `
})