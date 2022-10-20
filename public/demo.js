/**
 * Adopted from https://threejs.org/examples/webgl_read_float_buffer.html
 */
import * as THREE from "three";

import Stats from "three/addons/libs/stats.module.js";

const container = document.getElementById("container");

const rtTexture = new THREE.WebGLRenderTarget(1, 1, {
  type: THREE.FloatType,
});

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(1);
renderer.setSize(1, 1);

container.append(renderer.domElement);

const stats = new Stats();
container.append(stats.dom);

animate();

function animate() {
  requestAnimationFrame(animate);
  render();
  stats.update();
}

function render() {
  renderer.clear();
  renderer.setRenderTarget(rtTexture);
  renderer.setRenderTarget(null);
  renderer.readRenderTargetPixels(rtTexture, 0, 0, 0, 0, new Float32Array(0));
}
