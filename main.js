import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

window.addEventListener("load", function () {
  const scene = new THREE.Scene();

  const light = new THREE.PointLight(0xffffff, 1000);
  light.position.set(2.5, 7.5, 15);
  scene.add(light);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0.8, 1.4, 1.0);

  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
    alpha: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setSize(200, 200);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.target.set(0, 1, 0);

  var mixer;
  var modelReady = false;

  var loader = new FBXLoader();
  loader.load("/HipHopDancing.fbx", function (object) {
    object.scale.set(0.007, 0.007, 0.007);
    object.position.set(0, 0, 0);

    mixer = new THREE.AnimationMixer(object);
    var action = mixer.clipAction(object.animations[0]);
    action.play();

    scene.add(object);

    modelReady = true;
  });

  var clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);

    if (modelReady) mixer.update(clock.getDelta());

    renderer.render(scene, camera);
  }

  animate();
});
