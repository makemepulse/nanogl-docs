import Node from "nanogl-node";
import Camera from "nanogl-camera";
import Program from "nanogl/program";
import GLState from "nanogl-state/GLState";
import GLConfig from "nanogl-state/GLConfig";
import Texture2D from "nanogl/texture-2d";
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

  // --GL CONFIGS--

  const glState = GLState.get(gl);

  const cfgDefault = new GLConfig();

  const cfgDepth = new GLConfig()
    .enableDepthTest();

  const cfgFrontFace = new GLConfig()
    .enableCullface()
    .cullFace(gl.FRONT);

  const cfgBackFace = new GLConfig()
    .enableCullface()
    .cullFace(gl.BACK);

  const cfgAdditive = new GLConfig()
    .enableBlend()
    .blendFunc(gl.ONE, gl.ONE);

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

  // --NODES--

  // node for the first cube
  const node1 = new Node();
  node1.position.set([-1.5, 0, 0]);
  node1.invalidate();
  node1.updateWorldMatrix();

  // node for the second cube
  const node2 = new Node();
  node2.position.set([1.5, 0, 0]);
  node2.invalidate();
  node2.updateWorldMatrix();

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
    camera.x = Math.sin(time * 0.0005) * 10;
    camera.z = Math.cos(time * 0.0005) * 10;
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

  const renderWithCfgSetup = (setupId, node) => {
    const setup = PARAMS[setupId];

    let count = 0;

    // push configs to gl state
    if (setup.enableDepth) {
      glState.push(cfgDepth);
      count++;
    }
    if (setup.enableCullface) {
      if (setup.cullFace === 'back') {
        glState.push(cfgBackFace);
      } else {
        glState.push(cfgFrontFace);
      }
      count++;
    }
    if (setup.enableAdditiveBlend) {
      glState.push(cfgAdditive);
      count++;
    }

    if (count === 0) {
      glState.push(cfgDefault);
      count++;
    }

    // apply current gl config
    glState.apply();

    // render cube
    renderCube(node);

    // pop configs from gl state
    for (let i = 0; i < count; i++) {
      glState.pop();
    }
  }

  const render = (time = 0) => {
    if (!canRender) return;

    // set viewport size
    gl.viewport(0, 0, size.width, size.height);
    // clear buffers
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // animate the camera
    animateCamera(time);

    // update camera matrices
    camera.updateWorldMatrix();
    camera.updateViewProjectionMatrix(size.width, size.height);

    // render first cube at origin
    renderWithCfgSetup(0, node1);
    // render second cube using its node
    renderWithCfgSetup(1, node2);

    // request animation frame
    rafID = window.requestAnimationFrame(render);
  };

  setTimeout(render, 0);

  // --DEBUG--

  const BASE_PARAMS = {
    enableDepth: true,
    enableCullface: true,
    cullFace: 'back',
    enableAdditiveBlend: false,
  };

  const PARAMS = [
    {
      ...BASE_PARAMS,
    },
    {
      ...BASE_PARAMS,
    }
  ]

  const pane = new Pane({
    container: document.getElementById('debug')
  });

  const cube1 = pane.addFolder({
    title: 'First cube',
  });
  const cube2 = pane.addFolder({
    title: 'Second cube',
  });

  [cube1, cube2].forEach((folder, i) => {
    folder.addBinding(PARAMS[i], 'enableDepth');
    folder.addBinding(PARAMS[i], 'enableCullface');
    folder.addBinding(PARAMS[i], 'cullFace', {
      options: {
        back: 'back',
        front: 'front',
      }
    });
    folder.addBinding(PARAMS[i], 'enableAdditiveBlend');
  });


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