import * as THREE from "three";
const loader = new THREE.TextureLoader();
const dimension = 100;
const planeGeometry = new THREE.PlaneBufferGeometry(dimension / 2, dimension);

export default scene => {
  const planeText = new THREE.MeshBasicMaterial({
    map: loader.load("./mike.png"),
    side: THREE.DoubleSide
  });

  const plane = new THREE.Mesh(planeGeometry, planeText);

  const holder = new THREE.Object3D();
  plane.rotateY(Math.PI);
  holder.position.x = 250;
  holder.position.y = 0;
  holder.position.z = 300;
  // holder.postion.z = 0
  // plane.rotateY(Math.PI);
  holder.add(plane);
  scene.add(holder);
};
