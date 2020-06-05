import * as THREE from "three";
export default image => {
  var loader = new THREE.ImageLoader();

  // load a image resource
  loader.load(
    // resource URL
    "textures/skyboxsun25degtest.png",

    // onLoad callback
    function(image) {
      // use the image, e.g. draw part of it on a canvas
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      context.drawImage(image, 100, 100);
    },

    // onProgress callback currently not supported
    undefined,

    // onError callback
    function() {
      console.error("An error happened.");
    }
  );
};
