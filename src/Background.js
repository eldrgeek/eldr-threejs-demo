import * as THREE from "three";

export default function background(scene) {
  var urls = [0, 1, 2, 3, 4, 5].map(n => `./3072_${n}.jpg`);

  var reflectionCube = new THREE.CubeTextureLoader().load(urls);
  var refractionCube = new THREE.CubeTextureLoader().load(urls);
  refractionCube.mapping = THREE.CubeRefractionMapping;

  scene.background = reflectionCube;
}
