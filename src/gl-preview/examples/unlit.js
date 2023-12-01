import Node from "nanogl-node";
import Camera from "nanogl-camera";
import GLState from "nanogl-state/GLState";
import GLConfig from "nanogl-state/GLConfig";
import Material from "nanogl-pbr/Material"
import TexCoord from "nanogl-pbr/TexCoord"
import Texture2D from "nanogl/texture-2d";
import UnlitPass from "nanogl-pbr/UnlitPass"
import ArrayBuffer from "nanogl/arraybuffer";
import IndexBuffer from "nanogl/indexbuffer";
import PerspectiveLens from "nanogl-camera/perspective-lens";
import { vec3 } from "gl-matrix";
import { Pane } from 'tweakpane';

import { cubePosUvs, cubeIndices } from "../utils/cubeGeometry";

const preview = (canvasEl) => {
  let canRender = true;

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

  // --GL STATE--

  const glState = GLState.get(gl);

  // --CAMERA--

  const ORIGIN = vec3.create();

  const camera = new Camera(new PerspectiveLens());
  camera.lens.setAutoFov(35.0 * (Math.PI / 180.0)); // fov is in radians
  camera.lens.near = 0.01;
  camera.lens.far = 50;
  camera.position.set([0, 4, 10]); // set camera back on z axis and up on y axis
  camera.lookAt(ORIGIN); // look at origin point

  // --CUBE--

  // simple cube with vec3 position, vec2 uvs and indices
  const cubeVBuffer = new ArrayBuffer(gl, new Float32Array(cubePosUvs));
  const cubeIBuffer = new IndexBuffer(gl, gl.UNSIGNED_SHORT, new Uint16Array(cubeIndices));

  // declare aPosition attribute as vec3
  cubeVBuffer.attrib("aPosition", 3, gl.FLOAT);
  // declare aTexCoord attribute as vec2
  cubeVBuffer.attrib("aTexCoord", 2, gl.FLOAT);

  // --NODE--

  // create a node for the cube
  const node = new Node();

  // --TEXTURE--

  // setup the texture
  const texture = new Texture2D(gl);
  texture.clamp();

  // setup the image
  const img = new Image();
  img.src = "/images/square-texture.jpg";
  // set texture data from image on load
  img.onload = () => {
    texture.fromImage(img);
  }

  // --MATERIAL--

  const PARAMS = {
    useTexture: false,
    color: { r: 1, g: 1, b: 1 },
  }

  // create material
  const material = new Material(gl);
  // setup material gl config
  material.glconfig
    .enableDepthTest()
    .enableCullface()
    .cullFace(gl.BACK);

  // create unlit pass and add it to material
  const unlitPass = new UnlitPass();
  material.addPass(unlitPass);

  // function to use color for unlit pass
  const setupColor = () => {
    // attach uniform to base color and set current color
    unlitPass.baseColor
      .attachUniform('color', 3)
      .set(PARAMS.color.r, PARAMS.color.g, PARAMS.color.b);
  }

  // function to use texture for unlit pass
  const setupTexture = () => {
    // attach sampler to base color and set texture
    unlitPass.baseColor
      .attachSampler('color', TexCoord.create('aTexCoord'))
      .set(texture);
  }

  // use color by default
  setupColor();

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

    // push material gl config
    if (material.glconfig) glState.push(material.glconfig);
    // apply current gl config
    glState.apply();

    // animate the camera
    animateCamera(time);

    // update camera matrices
    camera.updateWorldMatrix();
    camera.updateViewProjectionMatrix(size.width, size.height);

    // prepare material passes
    material.getAllPasses().forEach((pass) => {
      pass.prepare(node, camera);
    })

    // link the cube vertex buffer to the material color program,
    // bind the cube index buffer, and draw
    const prg = material.getProgram('color');
    cubeVBuffer.attribPointer(prg);
    cubeIBuffer.bind();
    cubeIBuffer.drawTriangles();

    // pop material gl config
    if (material.glconfig) glState.pop();

    // request animation frame
    rafID = window.requestAnimationFrame(render);
  };

  setTimeout(render, 0);

  // --DEBUG--

  const pane = new Pane({
    container: document.getElementById('debug')
  });

  pane.addBinding(PARAMS, 'useTexture')
    .on('change', () => {
      if (PARAMS.useTexture) {
        setupTexture();
      } else {
        setupColor();
      }
    });

  pane.addBinding(PARAMS, 'color', {
    color: { type: 'float' }
  }).on('change', () => {
    // do not set color if texture is used
    if (PARAMS.useTexture) return;
    unlitPass.baseColor.param.set(PARAMS.color.r, PARAMS.color.g, PARAMS.color.b);
  });

  // dont forget to disconnect, discard, dispose, delete things at the end, to prevent memory leaks
  const dispose = () => {
    canRender = false;
    window.cancelAnimationFrame(rafID);
    resizeObserver.disconnect();
    pane.dispose();
    texture.dispose();
    cubeIBuffer.dispose();
    glState.pop();
    glState.apply();
  }

  return dispose;
};

export { preview };