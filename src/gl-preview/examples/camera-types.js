import Node from "nanogl-node";
import Camera from "nanogl-camera";
import Program from "nanogl/program";
import GLState from "nanogl-state/GLState";
import GLConfig from "nanogl-state/GLConfig";
import Texture2D from "nanogl/texture-2d";
import ArrayBuffer from "nanogl/arraybuffer";
import IndexBuffer from "nanogl/indexbuffer";
import PerspectiveLens from "nanogl-camera/perspective-lens";
import OrthographicLens from "nanogl-camera/ortho-lens";
import { Pane } from 'tweakpane';
import { vec3, mat4 } from "gl-matrix";

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
    canvasWidth: 1,
    canvasHeight: 1
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

    // set canvas size
    size.canvasWidth = canvasWidth;
    size.canvasHeight = canvasHeight;

    // set ortho camera bounds
    setOrthoBounds();
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

  const PARAMS = {
    camera: 'perspective',
    distance: 20.0,
    perspective: {
      fov: 35.0,
    },
    ortho: {
      boundsScale: 5.0,
    }
  }

  const ORIGIN = vec3.create();

  // setup perspective camera
  const perspectiveCamera = new Camera(new PerspectiveLens());
  perspectiveCamera.lens.near = 0.01;
  perspectiveCamera.lens.far = 50;
  perspectiveCamera.lookAt(ORIGIN); // look at origin point

  // setup orthographic camera
  const orthoCamera = new Camera(new OrthographicLens());
  orthoCamera.lens.near = 0.01;
  orthoCamera.lens.far = 50;
  orthoCamera.lookAt(ORIGIN); // look at origin point

  // set perspective camera fov
  // on params fov change
  const setPerspectiveFov = () => {
    perspectiveCamera.lens.setAutoFov(PARAMS.perspective.fov * (Math.PI / 180.0)) // fov is in radians;
  }

  // set orthographic camera bounds
  // this needs to be called on resize or on params scale change
  const setOrthoBounds = () => {
    const rx = Math.max(size.canvasHeight / size.canvasWidth, 1.0);
    const ry = Math.max(size.canvasWidth / size.canvasHeight, 1.0);
    const scale = PARAMS.ortho.boundsScale;

    orthoCamera.lens.setBound(
      -scale * ry,
      scale * ry,
      -scale * rx,
      scale * rx
    );
  }

  // setup ortho bounds on init
  setOrthoBounds();

  let currentCamera = perspectiveCamera;

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

  // --CAMERA ANIMATION--

  const animateCamera = (time) => {
    // rotate camera around origin
    currentCamera.x = Math.sin(time * 0.0005) * PARAMS.distance;
    currentCamera.z = Math.cos(time * 0.0005) * PARAMS.distance;
    currentCamera.y = PARAMS.distance * 0.4;
    // look at origin
    currentCamera.lookAt(ORIGIN);
    // invalidate camera matrices
    currentCamera.invalidate();
  }

  // --RENDER--

  let rafID = null;

  const M4 = mat4.create();

  // render cube
  const renderCube = (cubeNode) => {
    // get model view projection matrix from camera with cube node world matrix
    currentCamera.modelViewProjectionMatrix(M4, cubeNode._wmatrix);

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

    // set viewport size
    gl.viewport(0, 0, size.width, size.height);
    // clear buffers
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // apply current gl config
    glState.apply();

    // animate the camera
    animateCamera(time);

    // update camera matrices
    currentCamera.updateWorldMatrix();
    currentCamera.updateViewProjectionMatrix(size.width, size.height);

    // render every cube
    nodes.forEach((node) => {
      renderCube(node)
    })

    // request animation frame
    rafID = window.requestAnimationFrame(render);
  };

  setTimeout(render, 0);

  // --DEBUG--

  const pane = new Pane({
    container: document.getElementById('debug')
  });

  const global = pane.addFolder({
    title: 'Global'
  });
  const perspective = pane.addFolder({
    title: 'Perspective camera',
    disabled: false,
    expanded: true
  });
  const ortho = pane.addFolder({
    title: 'Orthographic camera',
    disabled: true,
    expanded: false
  });

  const updateCamera = () => {
    if (PARAMS.camera === 'orthographic') {
      currentCamera = orthoCamera;
      ortho.disabled = false;
      ortho.expanded = true;
      perspective.disabled = true;
      perspective.expanded = false;
    } else {
      currentCamera = perspectiveCamera;
      ortho.disabled = true;
      ortho.expanded = false;
      perspective.disabled = false;
      perspective.expanded = true;
    }
  }

  global.addBinding(PARAMS, 'camera', {
    options: {
      perspective: 'perspective',
      orthographic: 'orthographic'
    }
  }).on('change', updateCamera);
  global.addBinding(PARAMS, 'distance', {
    min: 5,
    max: 40,
    step: 1,
  });

  ortho.addBinding(PARAMS.ortho, 'boundsScale', {
    min: 3,
    max: 10,
    step: 0.5,
  }).on('change', setOrthoBounds);
  perspective.addBinding(PARAMS.perspective, 'fov', {
    min: 15,
    max: 90,
    step: 5,
  }).on('change', setPerspectiveFov);


  // dont forget to disconnect, discard, dispose, delete things at the end, to prevent memory leaks
  const dispose = () => {
    canRender = false;
    window.cancelAnimationFrame(rafID);
    resizeObserver.disconnect();
    pane.dispose();
    prg.dispose();
    cubeIBuffer.dispose();
    glState.pop();
    glState.apply();
  }

  return dispose;
};

export { preview };