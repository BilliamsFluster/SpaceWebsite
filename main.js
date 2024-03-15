import './style.css'
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import {sunShader} from './spaceShaders'




const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);

const control = new TransformControls(camera, renderer.domElement);
scene.add(control);
//control.mode = 'rotate';

// Post-processing
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const sunPass = new ShaderPass(sunShader);
sunPass.uniforms['sunPosition'].value = new THREE.Vector2(0.5, 0.5); // Center of the screen, adjust as needed
sunPass.uniforms['sunIntensity'].value = 0; // Sun's intensity, adjust as needed
sunPass.uniforms['sunScale'].value = 0;
sunPass.uniforms['resolution'].value = new THREE.Vector2(window.innerWidth, window.innerHeight);
composer.addPass(sunPass);

composer.setSize(renderer.getSize(new THREE.Vector2()).width, renderer.getSize(new THREE.Vector2()).height);

function onWindowResize() {
  // Get the new window dimensions
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Update camera aspect ratio and projection matrix
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  // Update renderer and composer sizes
  renderer.setSize(width, height);
  composer.setSize(width, height);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
   

  //sunPass.uniforms['resolution'].value.x = window.innerWidth;
  //sunPass.uniforms['resolution'].value.y = window.innerHeight;
}

// Add the event listener
window.addEventListener('resize', onWindowResize, false);

let astronaut;
let earth;
let moon;
let spaceship;
const loader = new GLTFLoader();
loader.load(
  './models/Astronaut.glb', 
  function (gltf) {
    gltf.scene.position.set(0, 0, 0); // Set position (x, y, z)
    gltf.scene.rotation.set(2.795,-0.265,2.671);
    gltf.scene.scale.set(20,20,20);
    astronaut = gltf.scene;
    scene.add(astronaut);
    gsap.from(astronaut.scale, {
  x:0,
  y:0,
  z:0,
  duration:1.1,
  
  ease: 'sine', delay: 1
})
    
  },
  undefined,
  function (error) {
    console.error(error);
  }
);
loader.load(
  './models/moon.glb', 
  function (gltf) {
    
    //gltf.scene.position.set(150,-800,2.671);
    gltf.scene.position.set(0,-40,2.671);

    gltf.scene.rotation.set(2.795,-0.265,2.671);
    gltf.scene.scale.set(20,20,20);
    moon = gltf.scene;
    scene.add(moon);
    
  },
  undefined,
  function (error) {
    console.error(error);
  }
);
loader.load(
  './models/Spaceship.glb', 
  function (gltf) {
    
    //gltf.scene.position.set(150,-800,2.671);
    gltf.scene.position.set(200,-0,-50);

    gltf.scene.rotation.set(0.39,1,-0.022);
    gltf.scene.scale.set(2,2,2);
    spaceship = gltf.scene;
    scene.add(spaceship);
    
    gsap.from(spaceship.position, {
      x:-200,
      y:0,
      z:-50,
      duration:3.1,
      scrollTrigger: {
        trigger: '.contact',
        start: "top 70%",
        end: "top 30%",
        markers: false,
        
      },
      
      ease: 'sine', delay: 1
    })
  },
  undefined,
  function (error) {
    console.error(error);
  }
);



const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x8B0000, 1);
directionalLight.position.set(0, 1000, 0); // Adjust as needed
scene.add(directionalLight);

// Add a light to your scene to simulate the sun
const sunLight = new THREE.DirectionalLight(0xffffff, 1.5); // Sun-like intensity
sunLight.position.set(50, 50, 100); // Position it to simulate the sun's direction
scene.add(sunLight);

gsap.from('.header',{duration:1, y: '-100%', ease: 'back'})
gsap.from('.footer',{duration:1.1, y: '100%', ease: 'sine'})

gsap.from('.logoBox',{duration:1.1, opacity: '0', ease: 'sine', delay: 1})
gsap.from('.navItems ',{duration:1.5, x: '100%',opacity: '0', ease: 'sine', delay: 1})
gsap.from('.navItems a',{duration:1.1, x: '100%',opacity: '0', ease: 'sine', delay: 1.2, stagger:.5})
gsap.from('.work',{duration:1.1, x: '-100%',opacity: '0', ease: 'sine', delay: 1.2, stagger:.5})


gsap.from('.portfolioImages img',{
  duration:1.1,
  opacity: '0', 
  ease: 'sine', 
  delay: 0, 
  stagger:.5,
  scrollTrigger: {
    trigger: '.portfolio',
    start: "top 70%",
    end: "top 30%",
    markers: false,
    toggleActions: "play none none reverse",
  }
});

gsap.from('.contact ',{
  duration:1.1,
  opacity: '0', 
  ease: 'sine', 
  delay: 0, 
  stagger:.5,
  scrollTrigger: {
    trigger: '.contact',
    start: "top 70%",
    end: "top 30%",
    markers: false,
    toggleActions: "play none none reverse",
  }
});







gsap.registerPlugin(ScrollTrigger);

// Select all sections and loop through them
document.querySelectorAll('.section .left').forEach(section => {
    
    gsap.to(section, {
      x: '10vw',
      duration: 2,
      
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "top 30%",
        markers: false,
        toggleActions: "play none none reverse",
      }
    });
  });


  // Select all sections and loop through them
document.querySelectorAll('.section .right').forEach(section => {
    
    gsap.to(section, {
      x: '-10vw',
      duration: 2,
      delay: 0.5,
      
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "top 30%",
        markers: false,
        toggleActions: "play none none reverse",
      }
    });
  });

  gsap.from('.footer', {
    opacity:'0',
    duration: 2,
    ease: 'sine',
    scrollTrigger: {
      trigger: '.footer',
      start: "top 100%",
      end: "top 95%",
      
      toggleActions: "play none none reverse",
    }
  });
const mouse = new THREE.Vector2();

function animate()
{
  requestAnimationFrame(animate);
  
  if(astronaut)
  {
    astronaut.rotation.x +=0.001;

  }
  if(moon)
    moon.rotation.y +=0.0001;

   

  
    composer.render();
}


animate();

control.addEventListener('change', render);

function render() {
  renderer.render(scene, camera);
  console.log(spaceship.position);
}

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  // Adjust these values according to your needs
  const factor = 0.01;
  if (astronaut) { // Assuming 'gltf' is accessible in this scope
    astronaut.position.y = scrollY * factor;
  }

  

  if(moon)
    moon.position.y = -40 + scrollY * 0.005;
  
});


window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Convert to UV coordinates (0 to 1)
  //sunPass.uniforms['sunPosition'].value.x = (mouse.x + 1) * 0.5;
  //sunPass.uniforms['sunPosition'].value.y = (mouse.y + 1) * 0.5;
});

function addStars() {
  const starGeometry = new THREE.SphereGeometry(0.1, 24, 24); // small sphere size
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const starsGroup = new THREE.Group();

    for (let i = 0; i < 10000; i++) {
        const star = new THREE.Mesh(starGeometry, starMaterial);
        const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(2000));
        
        star.position.set(x, y, z);
        starsGroup.add(star);
    }

    scene.add(starsGroup);
}
addStars();