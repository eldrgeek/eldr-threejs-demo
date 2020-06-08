import * as THREE from "three";
import React from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";
//https://github.com/mrdoob/three.js/blob/master/examples/misc_controls_transform.html

import makeImage from "./makeImage";
import makeVideo from "./makeVideo";

export default () => {
  var container, plane;

  var camera,
    scene,
    renderer,
    control,
    objects = [],
    objectsIndex = 0;

  var pointLight;

  init();
  animate();

  function init() {
    container = document.getElementById("sanders");

    if (!container) {
      container = document.createElement("div");
      container.setAttribute("id", "sanders");
      document.body.appendChild(container);
    }
    camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      5000
    );
    camera.position.z = -1;

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
      color: 0x555555,
      envMap: reflectionCube,
      combine: THREE.MixOperation,
      reflectivity: 0.3
    });

    //models
    var objLoader = new OBJLoader();

    objLoader.setPath("https://threejs.org/examples/models/obj/walt/");
    objLoader.load("WaltHead.obj", function(object) {
      var head = object.children[0];

      head.scale.multiplyScalar(4);
      head.position.y = -100;

      head.position.x = 100;
      head.position.z = 1000;
      head.rotateY(Math.PI);
      head.material = cubeMaterial3;
      var geo = new THREE.PlaneBufferGeometry(100, 100, 8, 8);
      var mat = new THREE.MeshBasicMaterial({
        color: 0x000000,
        side: THREE.DoubleSide
      });
      plane = new THREE.Mesh(geo, mat);
      plane.rotateY(Math.PI / 2);

      scene.add(head);

      control.attach(head);
      scene.add(control);
      objects.push(head);
      // scene.add(head);
      window.addEventListener("keydown", function(event) {
        console.log("key", event.keyCode);
        switch (event.keyCode) {
          case 87: // W
            control.setMode("translate");
            break;
          case 69: // E
            control.setMode("rotate");
            console.log("Rotate");
            break;
          case 82: // R
            control.setMode("scale");
            break;
          case 83: // S
            objectsIndex++;
            if (objectsIndex >= objects.length) objectsIndex = 0;
            control.attach(objects[objectsIndex]);
            break;
          case 190: // .
            let r = objects[objectsIndex].rotation;
            const inRadians = n => Math.round(n / Math.PI);
            console.log(
              "dot",
              objects[objectsIndex].position,
              "xR",
              inRadians(r._x),
              "yR",
              inRadians(r._y),
              "zR",
              inRadians(r._z)
            );
            break;
          case 37: // left arrow
            head.position.y -= 10;
            break;
          case 39: // right arrow
            //  head.translateY(10)
            head.position.fromArray([900, -500, 700]);

            break;
          default:
            break;
        }
      });
      makeImage(scene, objects);
      makeVideo(scene, objects);
    });
    //renderer
    if (!window.saveRenderer) {
      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);

      renderer.setSize(window.innerWidth, window.innerHeight);
      if (!container.firstChild) container.appendChild(renderer.domElement);
      window.saveRenderer = renderer;
    } else {
      renderer = window.saveRenderer;
    }
    control = new TransformControls(camera, renderer.domElement);
    control.addEventListener("change", () => {
      render();
    });
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
    //  Character(scene,renderer,camera)
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  // if (window.theInterval) clearInterval(window.theInterval);
  // window.theInterval = setInterval(() => {
  //   // console.clear()
  //   // console.log("campos", camera.position);
  //   // console.log("planepos", plane.position);
  //   console.log("headpos", head.parent);
  //   console.log("meshpos", mesh.parent);
  // }, 5000);
  function animate() {
    try {
      render();
    } catch (e) {
      console.log("error");
    }
    requestAnimationFrame(animate);
  }

  function render() {
    renderer.render(scene, camera);
    // stats.update();
  }
  return <div>Cubedemo</div>;
};
