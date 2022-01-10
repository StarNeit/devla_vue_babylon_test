import {
  Engine,
  Scene,
} from "@babylonjs/core";

import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

const createScene = (canvas) => {
  const engine = new Engine(canvas);
  const scene = new Scene(engine);

  //Adding a light
  const light = new BABYLON.PointLight("Omni", new BABYLON.Vector3.Zero(), scene);
  
  //Adding an Arc Rotate Camera
  const camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
  
  // Targets the camera to a particular position.
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvas, false);
  
  // Append glTF model to scene.
  BABYLON.SceneLoader.Append("", "exchange.gltf", scene, function (scene) {
    scene.createDefaultCameraOrLight(true, true, true);
    scene.activeCamera.inputs.remove(scene.activeCamera.inputs.attached.mousewheel);
    scene.activeCamera.zoomToMouseLocation = false;
    scene.activeCamera.alpha = Math.PI;
    scene.activeCamera.radius = 1000;
  });

  // Move the light with the camera
  scene.registerBeforeRender(function () {
    light.position = camera.position;
  });

  engine.runRenderLoop(() => {
    scene.render();
  });
};

export { createScene };
