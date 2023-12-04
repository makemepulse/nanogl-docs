import Camera from "nanogl-camera";
import PerspectiveLens from "nanogl-camera/perspective-lens";
import GltfIO from "nanogl-gltf/lib/io/web";

import { useWebGL } from "@gl-preview/utils/useWebGL";

const preview = (canvasEl) => {
  const { gl, size, start } = useWebGL(canvasEl);

  let canRender = false;

  // --CAMERA--

  const camera = new Camera(new PerspectiveLens());
  camera.lens.setAutoFov(35.0 * (Math.PI / 180.0)); // fov is in radians
  camera.lens.near = .01;
  camera.lens.far = 50;
  camera.position.set([0, 0, 5]); // set camera back on z axis
  camera.lookAt([0, 0, 0]); // look at origin point
  
  // --GLTF--

  let gltf = null;

  // load gltf from url
  GltfIO.loadGltf("/src/assets/webgl/models/suzanne/Suzanne.gltf").then(async (loadedGltf) => {
    gltf = loadedGltf;

    // link gltf to gl context
    await gltf.allocate(gl);

    canRender = true;
  });

  // --RENDER--

  const render = () => {
    if (!canRender) return;

    // set viewport size
    gl.viewport(0, 0, size.width, size.height);
    // clear viewport
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // update camera matrices
    camera.updateWorldMatrix();
    camera.updateViewProjectionMatrix(size.width, size.height);
    
    // render all gltf renderables (MeshRenderer)
    for (const renderable of gltf.renderables) {
      // render each renderable by passing the gl context, the camera, the mask id (1 is Opaque), and the pass id ('color' by default)
      renderable.render(gl, camera, 1, 'color');
    }
  }

  return start(render, false);
}

export {
  preview
};
