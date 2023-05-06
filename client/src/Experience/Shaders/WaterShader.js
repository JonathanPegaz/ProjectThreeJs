import {Color, ShaderMaterial, UniformsLib, UniformsUtils, Vector2} from "three";

var uniforms = {
    time: {
        value: 0
    },
    threshold: {
        value: 0.1
    },
    tDudv: {
        value: null
    },
    tDepth: {
        value: null
    },
    cameraNear: {
        value: 0
    },
    cameraFar: {
        value: 0
    },
    resolution: {
        value: new Vector2()
    },
    foamColor: {
        value: new Color()
    },
    waterColor: {
        value: new Color()
    }
}

export const waterMaterial = new ShaderMaterial({
  defines: {
    DEPTH_PACKING: 0
  },
  uniforms: UniformsUtils.merge([UniformsLib["fog"], uniforms]),
    vertexShader: `
      #include <fog_pars_vertex>
      
      varying vec2 vUv;
      void main() {
        vUv = uv;
        #include <begin_vertex>
        #include <project_vertex>
        #include <fog_vertex>
      }
 
    `,


    fragmentShader: `
    #include <common>
    #include <packing>
    #include <fog_pars_fragment>
    
      varying vec2 vUv;
      uniform sampler2D tDepth;
      uniform sampler2D tDudv;
      uniform vec3 waterColor;
      uniform vec3 foamColor;
      uniform float cameraNear;
      uniform float cameraFar;
      uniform float time;
      uniform float threshold;
      uniform vec2 resolution;
      
      float getDepth( const in vec2 screenPosition ) {
          #if DEPTH_PACKING == 1
            return unpackRGBAToDepth( texture2D( tDepth, screenPosition ) );
          #else
            return texture2D( tDepth, screenPosition ).x;
          #endif
      }

      float getViewZ( const in float depth ) {
            return perspectiveDepthToViewZ( depth, cameraNear, cameraFar );
      }

      void main() {

        vec2 screenUV = gl_FragCoord.xy / resolution;

          float fragmentLinearEyeDepth = getViewZ( gl_FragCoord.z );
          float linearEyeDepth = getViewZ( getDepth( screenUV ) );
    
          float diff = saturate( fragmentLinearEyeDepth - linearEyeDepth );

          vec2 displacement = texture2D( tDudv, ( vUv * 2.0 ) - time * 0.05 ).rg;
          displacement = ( ( displacement * 2.0 ) - 1.0 ) * 1.0;
          diff += displacement.x;

          gl_FragColor.rgb = mix( foamColor, waterColor, step( threshold, diff ) );
          gl_FragColor.a = 1.0;
          
          #include <tonemapping_fragment>
          #include <encodings_fragment>
          #include <fog_fragment>
      }
    `,
    fog: true
})