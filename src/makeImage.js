import * as THREE from "three";
import { Vector3 } from "three";
const loader = new THREE.TextureLoader();
const dimension = 100;
const planeGeometry = new THREE.PlaneBufferGeometry(dimension / 2, dimension);

export default (scene, objects, file, position, rotation = Math.PI) => {
  const planeText = new THREE.MeshBasicMaterial({
    map: loader.load(file),
    side: THREE.DoubleSide
  });

  const plane = new THREE.Mesh(planeGeometry, planeText);

  const holder = new THREE.Object3D();
  plane.rotateY(rotation);

  holder.position.x = position.x;
  holder.position.y = position.y;
  holder.position.z = position.z;
  // holder.postion.z = 0
  // plane.rotateY(Math.PI);
  holder.add(plane);
  scene.add(holder);
  objects.push(holder);
};
