import * as THREE from 'three';
export const sunShader = {
    uniforms: {
        "tDiffuse": { value: null },
        "sunPosition": { value: new THREE.Vector2(0.5, 0.5) },
        "sunIntensity": { value: 1.0 },
        "sunScale": { value: 0.5 }, // Default value for the sun scale
        "resolution": { value: new THREE.Vector2(0.5, 0.5) } // Default value for the sun scale

      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
      uniform sampler2D tDiffuse;
      uniform vec2 sunPosition;
      uniform float sunIntensity;
      uniform float sunScale; // Use this to adjust the size of the sun
      uniform vec2 resolution; // Pass the canvas resolution
      varying vec2 vUv;
      
      void main() {
          vec4 texel = texture2D(tDiffuse, vUv);
          
          // Calculate aspect ratio corrected coordinates
          vec2 aspectCorrectedUV = vec2(vUv.x, vUv.y * resolution.x / resolution.y);
          vec2 aspectCorrectedSunPos = vec2(sunPosition.x, sunPosition.y * resolution.x / resolution.y);
      
          // Sunlight effect
          float d = distance(aspectCorrectedUV, aspectCorrectedSunPos) / sunScale;
          float glowFactor = smoothstep(0.5 - sunScale, 0.5, 1.0 - d);
          vec3 sunGlow = sunIntensity * vec3(1.0, 0.9, 0.7) * glowFactor;
      
          // Combine the ambient starlight, sun glow, and the scene color
          vec3 color = vec3(0.05, 0.05, 0.1) + sunGlow + texel.rgb;
      
          // Output the final color
          gl_FragColor = vec4(color, texel.a);
      }
`
    };
  

  