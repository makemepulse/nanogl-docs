import Camera from "nanogl-camera";
import PerspectiveLens from "nanogl-camera/perspective-lens";
import GltfIO from "nanogl-gltf/lib/io/web";

import { useWebGL } from "@gl-preview/utils/useWebGL";
import LightSetup from "nanogl-pbr/lighting/LightSetup";
import Texture2D from "nanogl/texture-2d";
import Ibl from "nanogl-pbr/lighting/Ibl";
import { iblPath, iblSh } from "../utils/iblData";

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

  // --LIGHTING--

  // create light setup
  const lightSetup = new LightSetup();
  lightSetup.bounds.fromMinMax([-1,-1,-1],[1,1,1]);

  // create iblTexture
  const iblTexture = new Texture2D(gl, gl.RGBA);
  iblTexture.clamp();

  // create ibl light
  const ibl = new Ibl(iblTexture, iblSh);
  ibl.iblFormat = 'OCTA';
  ibl.shFormat = 'SH9';
  ibl.hdrEncoding = 'RGBM';

  // setup the image for the ibl texture
  const iblImg = new Image();
  iblImg.src = iblPath;
  // set texture data from image on load
  iblImg.onload = () => {
    iblTexture.fromImage(iblImg);
  }

  // add ibl to light setup
  lightSetup.add(ibl);
  
  // --GLTF--

  let gltf = null;

  // load gltf from url
  GltfIO.loadGltf(new URL('../../../models/suzanne/Suzanne.gltf', import.meta.url).href).then(async (loadedGltf) => {
    gltf = loadedGltf;

    // link gltf to gl context
    await gltf.allocate(gl);

    // set gltf material light setup
    for (const material of gltf.materials) {
      material.materialPass.setLightSetup(lightSetup);
    }

    canRender = true;
  });

  // --RENDER--

  const animate = () => {
    // get gltf root node
    const node = gltf.root;
    // rotate around X axis a little bit at each frame
    node.rotateY(0.01);
    // update world matrix
    node.updateWorldMatrix();
  }

  const render = () => {
    if (!canRender) return;

    animate();

    // set viewport size
    gl.viewport(0, 0, size.width, size.height);
    // clear viewport
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // update camera matrices
    camera.updateWorldMatrix();
    camera.updateViewProjectionMatrix(size.width, size.height);

    // prepare light setup
    lightSetup.prepare(gl);
    
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
