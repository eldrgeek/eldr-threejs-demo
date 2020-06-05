import * as THREE from "three";
import React from "react";
import Character from "./characteranimation";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";
//https://github.com/mrdoob/three.js/blob/master/examples/misc_controls_transform.html
export default () => {
  var container, stats;

  var camera, scene, renderer;

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
    camera.position.z = -100;

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
    var objLoader = new OBJLoader();

    objLoader.setPath("https://threejs.org/examples/models/obj/walt/");
    var head3;
    objLoader.load("WaltHead.obj", function(object) {
      var head = object.children[0];

      head.scale.multiplyScalar(5);
      head.position.y = -500;
      head.material = cubeMaterial1;

      var head2 = head.clone();
      head2.position.x = -900;
      head2.material = cubeMaterial2;

      head3 = head.clone();
      head3.position.x = 900;
      head3.material = cubeMaterial3;
      let historyIndex = -1;
      var geo = new THREE.PlaneBufferGeometry(20, 20, 8, 8);
      var mat = new THREE.MeshBasicMaterial({
        color: 0x000000,
        side: THREE.DoubleSide
      });
      var plane = new THREE.Mesh(geo, mat);
      // plane.position.x =
      scene.add(plane);
      const history = [];
      // scene.add(head);
      window.addEventListener("keydown", function(event) {
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
          case 190: // .
            history.push(head3.matrix);
            historyIndex = history.length;
            console.log("dot", historyIndex, history);
            break;
          case 37: // left arrow
            head3.position.y -= 10;
            // if (historyIndex >= 0) {
            //   console.log("left");
            //   historyIndex--;
            //   head3.matrix.y = (history[historyIndex].y);
            //   render();
            // }
            break;
          case 39: // right arrow
            //  head3.translateY(10)
            head3.position.fromArray([900, -500, 700]);
            // if (historyIndex < history.length) {
            //   console.log("right");

            //   head3.applyMatrix4(history[historyIndex]);
            //   historyIndex++;
            // }
            break;
          default:
            break;
        }
      });
      scene.add(/* head, head2,*/ head3);
      var control = new TransformControls(camera, renderer.domElement);
      control.addEventListener("change", () => {
        render();
        console.log("pos", head3.position);
      });

      control.attach(head3);
      scene.add(control);
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
