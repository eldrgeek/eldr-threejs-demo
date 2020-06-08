import * as THREE from "three";
const loader = new THREE.TextureLoader();
const dimension = 100;
const planeGeometry = new THREE.PlaneBufferGeometry(dimension / 2, dimension);
var transparentMaterial = new THREE.MeshBasicMaterial({
  // color: 0xffffff,
  // envMap: reflectionCube,
  opacity: 0.0
});
export default (makeImage = (scene, head3) => {
  const planeText = new THREE.MeshBasicMaterial({
    map: loader.load("./mike.png"),
    side: THREE.DoubleSide
  });

  const plane = new THREE.Mesh(planeGeometry, planeText);
  // scene.add(plane);
  var planeHolder = head3.clone();
  planeHolder.position.x = 100;
  planeHolder.position.y = 20;
  planeHolder.position.z = -50;
  planeHolder.rotateY(Math.PI / 2);
  planeHolder.material = transparentMaterial;
  planeHolder.material.transparent = true;
  planeHolder.scale.multiplyScalar(0.3);
  // plane.position.x = 100;

  const holder = new THREE.Object3D();
  plane.rotateY(Math.PI);
  holder.position.x = 250;
  holder.position.y = 0;
  holder.position.z = 300;
  // holder.postion.z = 0
  // plane.rotateY(Math.PI);
  holder.add(plane);
  scene.add(holder);
  return plane;
});
