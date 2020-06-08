import * as THREE from "three";
const loader = new THREE.TextureLoader();
const dimension = 100;
const planeGeometry = new THREE.PlaneBufferGeometry(dimension / 2, dimension);

export default (makeImage = scene => {
  const planeText = new THREE.MeshBasicMaterial({
    map: loader.load("./mike1024x512.jpg")
  });

  const plane = new THREE.Mesh(planeGeometry, planeText);
  // scene.add(plane);
  return plane;
});
