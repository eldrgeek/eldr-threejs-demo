import * as THREE from "three";
export default scene => {
  navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
    // const videoSettings = stream.getVideoTracks()[0].getSettings();
    let video = document.createElement("video");
    Object.assign(video, {
      srcObject: stream,
      width: 200,
      //height: videoSettings.height,
      //width: videoSettings.width,
      style: "position:fixed; top: 0; left: 0;display:none",
      autoplay: true
    });
    // document.body.appendChild(video);

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;

    const dim = 100;
    var geometry = new THREE.PlaneBufferGeometry(dim, dim);
    var material = new THREE.MeshBasicMaterial({
      map: videoTexture
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = 100;

    mesh.rotateY(Math.PI);

    // holder.position.z = 100
    const holder = new THREE.Object3D();
    holder.position.x = 200;
    holder.position.z = 300;
    holder.add(mesh);
    scene.add(holder);
  });
  return;
};
