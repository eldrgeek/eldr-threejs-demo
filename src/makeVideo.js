import * as THREE from "three";
export default (scene, objects) => {
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
      map: videoTexture,
      side: THREE.DoubleSide
    });
    var videoPane = new THREE.Mesh(geometry, material);

    videoPane.rotateY(Math.PI);

    // holder.position.z = 100
    const holder = new THREE.Object3D();
    videoPane.position.x = 8;
    holder.position.y = 0;
    holder.position.z = -239;
    holder.add(videoPane);
    scene.add(holder);
    objects.push(holder);
  });
  return;
};
