import * as THREE from "three";
import React from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
// import { OrbitControls } from "./jsm/controls/OrbitControls.js";
// import { OBJLoader } from "./jsm/loaders/OBJLoader.js";
export default () => {
  var container, stats;

  var camera, scene, renderer;

  var pointLight;

  init();
  animate();

  function init() {
    container = document.createElement("div");
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      5000
    );
    camera.position.z = 2000;

    //cubemap
    var path = "https://threejs.org/examples/textures/cube/SwedishRoyalCastle/";
    var format = ".jpg";
    var urls = [
      path + "px" + format,
      path + "nx" + format,
      path + "py" + format,
      path + "ny" + format,
      path + "pz" + format,
      path + "nz" + format
    ];

    path = "./";
    urls = [0, 1, 2, 3, 4, 5].map(n => `./3072_${n}.jpg`);

    var reflectionCube = new THREE.CubeTextureLoader().load(urls);
    var refractionCube = new THREE.CubeTextureLoader().load(urls);
    refractionCube.mapping = THREE.CubeRefractionMapping;

    scene = new THREE.Scene();
    scene.background = reflectionCube;

    //lights
    var ambient = new THREE.AmbientLight(0xffffff);
    scene.add(ambient);

    pointLight = new THREE.PointLight(0xffffff, 2);
    scene.add(pointLight);

    //materials
    var cubeMaterial3 = new THREE.MeshLambertMaterial({
      color: 0xff6600,
      envMap: reflectionCube,
      combine: THREE.MixOperation,
      reflectivity: 0.3
    });
    var cubeMaterial2 = new THREE.MeshLambertMaterial({
      color: 0xffee00,
      envMap: refractionCube,
      refractionRatio: 0.95
    });
    var cubeMaterial1 = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      envMap: reflectionCube
    });

    //models
    // var objLoader = new OBJLoader();

    // objLoader.setPath("models/obj/walt/");
    // objLoader.load("WaltHead.obj", function(object) {
    //   var head = object.children[0];

    //   head.scale.multiplyScalar(15);
    //   head.position.y = -500;
    //   head.material = cubeMaterial1;

    //   var head2 = head.clone();
    //   head2.position.x = -900;
    //   head2.material = cubeMaterial2;

    //   var head3 = head.clone();
    //   head3.position.x = 900;
    //   head3.material = cubeMaterial3;

    //   scene.add(head, head2, head3);
    // });

    //renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    //controls
    var controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI / 1.5;

    //stats
    // stats = new Stats();
    // container.appendChild(stats.dom);

    window.addEventListener("resize", onWindowResize, false);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    renderer.render(scene, camera);
    // stats.update();
  }
  return <div>Cubedemo</div>;
};