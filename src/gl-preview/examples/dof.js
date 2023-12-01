import Dof from "nanogl-post/effects/dof";
import Node from "nanogl-node";
import Post from "nanogl-post";
import Fetch from "nanogl-post/effects/fetch";
import Camera from "nanogl-camera";
import Program from "nanogl/program";
import GLState from "nanogl-state/GLState";
import GLConfig from "nanogl-state/GLConfig";
import ArrayBuffer from "nanogl/arraybuffer";
import IndexBuffer from "nanogl/indexbuffer";
import PerspectiveLens from "nanogl-camera/perspective-lens";
import { Pane } from 'tweakpane';
import { vec3, mat4 } from "gl-matrix";

import { cubePosUvs, cubeIndices } from "../utils/cubeGeometry";

const preview = (canvasEl) => {
  let canRender = true;

  // --CANVAS & CONTEXT--

  const canvas = canvasEl || document.getElementById("canvas");
  const gl = canvas.getContext("webgl", { antialias: true });

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

  // --GL CONFIGS--

  const glState = GLState.get(gl);

  const cfg = new GLConfig()
    .enableDepthTest()
    .enableCullface()
    .cullFace(gl.BACK);

  glState.push(cfg);

  // --CAMERAS--

  const ORIGIN = vec3.create();

  // setup perspective camera
  const camera = new Camera(new PerspectiveLens());
  camera.lens.setAutoFov(35.0 * (Math.PI / 180.0)); // fov is in radians
  camera.lens.near = 0.01;
  camera.lens.far = 50;
  camera.position.set([0, 4, 15]); // set camera back on z axis and up on y axis
  camera.lookAt(ORIGIN); // look at origin point

  // --CUBE--

  // simple cube with vec3 position, vec2 uvs and indices
  const cubeVBuffer = new ArrayBuffer(gl, new Float32Array(cubePosUvs));
  const cubeIBuffer = new IndexBuffer(gl, gl.UNSIGNED_SHORT, new Uint16Array(cubeIndices));

  // declare aPosition attribute as vec3
  cubeVBuffer.attrib("aPosition", 3, gl.FLOAT);
  // declare aTexCoord attribute as vec2
  cubeVBuffer.attrib("aTexCoord", 2, gl.FLOAT);

  // --NODES--

  const nodes = [];
  const nodeRows = 4;
  const nodeCols = 3;
  const nodeSize = 3;
  const nodeRowHalfSize = (nodeRows - 1) * nodeSize * 0.5;
  const nodeColHalfSize = (nodeCols - 1) * nodeSize * 0.5;

  // create a nodeRows x nodeCols grid of nodes
  for (let i = 0; i < nodeRows; i++) {
    for (let j = 0; j < nodeCols; j++) {
      const node = new Node();
      node.position.set([i * nodeSize - nodeRowHalfSize, 0, j * nodeSize - nodeColHalfSize]);
      node.invalidate();
      node.updateWorldMatrix();
      nodes.push(node);
    }
  }

  // --PROGRAM--

  const vertexShader = `
    attribute vec3 aPosition;
    attribute vec2 aTexCoord;

    uniform mat4 uMVP;

    varying vec2 vTexCoord;

    void main(void){
      vec4 pos = vec4(aPosition, 1.0);
      gl_Position = uMVP * pos;
      vTexCoord = aTexCoord;
    }
  `;
  const fragmentShader = `
    precision highp float;

    varying vec2 vTexCoord;

    void main(void){
      vec3 color = vec3(vec2(0.5) + vTexCoord * vec2(0.5), 0.75);
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const prg = new Program(gl, vertexShader, fragmentShader);

  // --POST-PROCESSING--

  const PARAMS = {
    near: 10,
    far: 40,
    focus: 25,
    focusRange: 3,
    d0: 0.2,
    d1: 0.2,
  }

  // create post-process manager
  const post = new Post(gl, false);
  post.enabled = true;

  // add fetch effect to get the scene color
  const fetch = new Fetch();
  post.add(fetch);

  // add depth of field effect
  const dof = new Dof(camera);
  // set near depth
  dof.near = PARAMS.near;
  // set far depth
  dof.far = PARAMS.far;
  // set focus depth
  dof.focus = PARAMS.focus;
  // set focus range
  dof.focusRange = PARAMS.focusRange;
  // set distance where the fade from the unblurred sample to the small blur happens
  dof.d0 = PARAMS.d0;
  // set distance where the fade from the the small blur to the medium blur happens
  dof.d1 = PARAMS.d1;
  post.add(dof);

  // --CAMERA ANIMATION--

  const animateCamera = (time) => {
    // rotate camera around origin
    camera.x = Math.sin(time * 0.0005) * 15;
    camera.z = Math.cos(time * 0.0005) * 15;
    // look at origin
    camera.lookAt(ORIGIN);
    // invalidate camera matrices
    camera.invalidate();
  }

  // --RENDER--

  let rafID = null;

  const M4 = mat4.create();

  // render cube
  const renderCube = (cubeNode) => {
    // get model view projection matrix from camera with cube node world matrix
    camera.modelViewProjectionMatrix(M4, cubeNode._wmatrix);

    // bind program
    prg.use();
    // update program uniforms
    prg.uMVP(M4);

    // link the cube vertex buffer to the program,
    // bind the cube index buffer, and draw
    cubeVBuffer.attribPointer(prg);
    cubeIBuffer.bind();
    cubeIBuffer.drawTriangles();
  }

  const render = (time = 0) => {
    if (!canRender) return;

    // set clear color
    gl.clearColor(0.28, 0.28, 0.28, 1.);
    // apply current gl config
    glState.apply();

    // pre render and bind post-process fbo
    post.preRender(size.width, size.height);
    post.bindColor();

    // animate the camera
    animateCamera(time);

    // update camera matrices
    camera.updateWorldMatrix();
    camera.updateViewProjectionMatrix(size.width, size.height);

    // render every cube
    nodes.forEach((node) => {
      renderCube(node)
    })

    // render post-process
    post.render();

    // request animation frame
    rafID = window.requestAnimationFrame(render);
  };

  setTimeout(render, 0);

  // --DEBUG--

  const pane = new Pane({
    container: document.getElementById('debug')
  });

  const changeDofParam = (name, value) => {
    dof[name] = value;
  }

  pane.addBinding(PARAMS, 'near', {
    min: 0,
    max: 50,
    step: 1
  }).on('change', () => changeDofParam('near', PARAMS.near));
  pane.addBinding(PARAMS, 'far', {
    min: 10,
    max: 80,
    step: 1
  }).on('change', () => changeDofParam('far', PARAMS.far));
  pane.addBinding(PARAMS, 'focus', {
    min: 0,
    max: 80,
    step: 1
  }).on('change', () => changeDofParam('focus', PARAMS.focus));
  pane.addBinding(PARAMS, 'focusRange', {
    min: 1,
    max: 40,
    step: 0.5
  }).on('change', () => changeDofParam('focusRange', PARAMS.focusRange));
  pane.addBinding(PARAMS, 'd0', {
    min: 0,
    max: 0.4,
    step: 0.01
  }).on('change', () => changeDofParam('d0', PARAMS.d0));
  pane.addBinding(PARAMS, 'd1', {
    min: 0,
    max: 0.8,
    step: 0.05
  }).on('change', () => changeDofParam('d1', PARAMS.d1));


  // dont forget to disconnect, discard, dispose, delete things at the end, to prevent memory leaks
  const dispose = () => {
    canRender = false;
    window.cancelAnimationFrame(rafID);
    resizeObserver.disconnect();
    pane.dispose();
    prg.dispose();
    cubeIBuffer.dispose();
    fetch.release();
    dof.release();
    post.dispose();
    glState.pop();
    glState.apply();
  }

  return dispose;
};

export { preview };