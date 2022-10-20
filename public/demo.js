/**
 * Adopted from https://threejs.org/examples/webgl_read_float_buffer.html
 */
import * as THREE from "three";

import Stats from "three/addons/libs/stats.module.js";

let container, stats;

let cameraRTT, sceneRTT, sceneScreen, renderer;

let mouseX = 0,
  mouseY = 0;

const targetWidth = 480;
const targetHeight = 480;

const windowHalfX = /* window.innerWidth */ targetWidth / 2;
const windowHalfY = /* window.innerHeight */ targetHeight / 2;

let rtTexture;

init();
animate();

function init() {
  container = document.getElementById("container");

  cameraRTT = new THREE.OrthographicCamera(
    /* window.innerWidth */ targetWidth / -2,
    /* window.innerWidth */ targetWidth / 2,
    /* window.innerHeight */ targetHeight / 2,
    /* window.innerHeight */ targetHeight / -2,
    -10000,
    10000
  );
  cameraRTT.position.z = 100;

  //

  sceneRTT = new THREE.Scene();
  sceneScreen = new THREE.Scene();

  rtTexture = new THREE.WebGLRenderTarget(
    /* window.innerWidth */ targetWidth,
    /* window.innerHeight */ targetHeight,
    {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
    }
  );

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(
    /* window.innerWidth */ targetWidth,
    /* window.innerHeight */ targetHeight
  );
  renderer.autoClear = false;

  container.appendChild(renderer.domElement);

  stats = new Stats();
  container.appendChild(stats.dom);
}

function animate() {
  requestAnimationFrame(animate);

  render();
  stats.update();
}

function render() {
  renderer.clear();

  // Render first scene into texture

  renderer.setRenderTarget(rtTexture);
  renderer.clear();
  renderer.render(sceneRTT, cameraRTT);

  // Render full sc reen quad with generated texture

  renderer.setRenderTarget(null);
  renderer.render(sceneScreen, cameraRTT);

  const read = new Float32Array(4);
  renderer.readRenderTargetPixels(
    rtTexture,
    windowHalfX + mouseX,
    windowHalfY - mouseY,
    1,
    1,
    read
  );
}
