import * as THREE from "three";
const loader = new THREE.TextureLoader();
const planeGeometry = new THREE.PlaneBufferGeometry(100, 100);

export default (makePlane = scene => {
  const planeText = new THREE.MeshBasicMaterial({
    map: loader.load("./mike1024x512.jpg")
  });

  const plane = new THREE.Mesh(planeGeometry, planeText);
  plane.material.side = THREE.DoubleSide;

  plane.rotateY(Math.PI / 2);
  scene.add(plane);
});
