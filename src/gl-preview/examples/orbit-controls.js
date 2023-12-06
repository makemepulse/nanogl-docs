import Camera from "nanogl-camera";
import GLState from "nanogl-state/GLState";
import GLConfig from "nanogl-state/GLConfig";
import PerspectiveLens from "nanogl-camera/perspective-lens";
import GltfIO from "nanogl-gltf/lib/io/web";
import { vec2, vec3 } from "gl-matrix";
import LightSetup from "nanogl-pbr/lighting/LightSetup";
import { iblPath, iblSh } from "../utils/iblData";
import Ibl from "nanogl-pbr/lighting/Ibl";
import Texture2D from "nanogl/texture-2d";

const preview = (canvasEl) => {
  let canRender = false;

  // --CANVAS & CONTEXT--

  const canvas = canvasEl || document.getElementById("canvas");
  const gl = canvas.getContext("webgl");

  // --SIZING--

  const size = {
    width: 1,
    height: 1,
  };
  const pixelRatio = window.devicePixelRatio;

  const handleResize = ([entry]) => {
    // get canvas current width & height
    const canvasWidth = entry.contentRect.width;
    const canvasHeight = entry.contentRect.height;

    // set canvas size to display size multiplied by pixel ratio
    canvas.width = Math.round(canvasWidth * pixelRatio);
    canvas.height = Math.round(canvasHeight * pixelRatio);

    // set size to actual size of the current drawing buffer
    size.width = gl.drawingBufferWidth;
    size.height = gl.drawingBufferHeight;
  };

  // use ResizeObserver to handle canvas resize
  const resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(canvas);

  // --GL CONFIG--

  const glState = GLState.get(gl);

  // enable depth test and cull face
  const cfg = new GLConfig()
    .enableDepthTest()
    .enableCullface()
    .cullFace(gl.BACK);

  // push config to gl state
  glState.push(cfg);

  // --CAMERA--

  const ORIGIN = vec3.create();

  const camera = new Camera(new PerspectiveLens());
  camera.lens.setAutoFov(35.0 * (Math.PI / 180.0)); // fov is in radians
  camera.lens.near = 0.01;
  camera.lens.far = 50;
  camera.position.set([0, 4, 10]); // set camera back on z axis
  camera.lookAt(ORIGIN); // look at origin point

  let isLeftClicking = false;
  let isRightClicking = false;
  const mouseClickedPos = vec2.create();

  const onMouseMove = (event) => {
    if (isLeftClicking) {
      console.log('Rotate', event)
    } else if (isRightClicking) {
      // console.log('Pan', event)
      const currentMousePose = vec2.fromValues(event.offsetX/100, event.offsetY/100);
      const delta = vec2.subtract(vec2.create(), currentMousePose, mouseClickedPos);
      mouseClickedPos.set(currentMousePose);
      camera.position[0] -= delta[0];
      camera.position[1] += delta[1];
      ORIGIN[0] -= delta[0];
      ORIGIN[1] += delta[1];
      camera.invalidate();
    }
    // console.log(e);
  }

  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('contextmenu', event => {
    event.preventDefault();
  });
  canvas.addEventListener('mousedown', event => {
    isRightClicking = event.which === 3;
    isLeftClicking = !isRightClicking;
    mouseClickedPos.set([event.offsetX/100, event.offsetY/100]);
  });
  canvas.addEventListener('mouseup', () => {
    isLeftClicking = false;
    isRightClicking = false;
  });
  canvas.addEventListener('wheel', event => {
    event.preventDefault();
    const zoom = Math.min(Math.max(event.deltaY/100, -1), 1);
    const normalizedZoom = 1 + zoom * 0.01;
    const newCamPos = vec3.scale(vec3.create(), vec3.subtract(vec3.create(), ORIGIN, vec3.copy(vec3.create(), camera.position)), normalizedZoom);
    // const newCamPos = vec3.subtract(vec3.create(), vec3.copy(vec3.create(), camera.position), ORIGIN);
    camera.position.set(newCamPos);
    camera.invalidate();
    console.log(newCamPos[1]);
  });

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
  GltfIO.loadGltf("../models/suzanne/Suzanne.gltf").then(async (loadedGltf) => {
    gltf = loadedGltf;

    // link gltf to gl context
    await gltf.allocate(gl);

    // set gltf material light setup
    for (const material of gltf.materials) {
      material.materialPass.setLightSetup(lightSetup);
    }

    canRender = true;

    render();
  });

  // --CAMERA ANIMATION--

  const animateCamera = (time) => {
    // rotate camera around origin
    camera.x = Math.sin(time * 0.0005) * 10;
    camera.z = Math.cos(time * 0.0005) * 10;
    // look at origin
    camera.lookAt(ORIGIN);
    // invalidate camera matrices
    camera.invalidate();
  }

  // --RENDER--

  let rafID = null;

  const render = (time = 0) => {
    if (!canRender) return;

    // set viewport size
    gl.viewport(0, 0, size.width, size.height);
    // clear buffers
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // apply current gl config
    glState.apply();

    // animate the camera
    // animateCamera(time);

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

    rafID = window.requestAnimationFrame(render);
  };

  // dont forget to disconnect, discard, dispose, delete things at the end, to prevent memory leaks
  const dispose = () => {
    canRender = false;
    window.cancelAnimationFrame(rafID);
    resizeObserver.disconnect();
    glState.pop();
    glState.apply();
  }

  return dispose;
};

export { preview };