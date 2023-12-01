import Post from "nanogl-post";
import Bloom from "nanogl-post/effects/bloom";
import Fetch from "nanogl-post/effects/fetch";
import Camera from "nanogl-camera";
import Program from "nanogl/program";
import GLState from "nanogl-state/GLState";
import GLConfig from "nanogl-state/GLConfig";
import ArrayBuffer from "nanogl/arraybuffer";
import IndexBuffer from "nanogl/indexbuffer";
import PerspectiveLens from "nanogl-camera/perspective-lens";
import { Pane } from 'tweakpane';
import { vec3 } from "gl-matrix";

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
    bloomColor: { r: .4, g: .1, b: .5 },
    bloomSize: .2,
  }

  // create post-process manager
  const post = new Post(gl, false);
  post.enabled = true;

  // add fetch effect to get the scene color
  const fetch = new Fetch();
  post.add(fetch);

  // add bloom effect
  const bloom = new Bloom(
    [PARAMS.bloomColor.r, PARAMS.bloomColor.g, PARAMS.bloomColor.b],
    PARAMS.bloomSize
  );
  post.add(bloom);

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

    // bind program
    prg.use();
    // update program uniforms
    prg.uMVP(camera._viewProj);

    // link the cube vertex buffer to the program,
    // bind the cube index buffer, and draw
    cubeVBuffer.attribPointer(prg);
    cubeIBuffer.bind();
    cubeIBuffer.drawTriangles();

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

  pane.addBinding(PARAMS, 'bloomColor', {
    color: { type: 'float' }
  }).on('change', () => {
    bloom.color[0] = PARAMS.bloomColor.r;
    bloom.color[1] = PARAMS.bloomColor.g;
    bloom.color[2] = PARAMS.bloomColor.b;
  });

  pane.addBinding(PARAMS, 'bloomSize', {
    min: 0,
    max: 1
  }).on('change', () => {
    bloom.size = PARAMS.bloomSize;
  });


  // dont forget to disconnect, discard, dispose, delete things at the end, to prevent memory leaks
  const dispose = () => {
    canRender = false;
    window.cancelAnimationFrame(rafID);
    resizeObserver.disconnect();
    pane.dispose();
    prg.dispose();
    cubeIBuffer.dispose();
    bloom.release();
    post.dispose();
    glState.pop();
    glState.apply();
  }

  return dispose;
};

export { preview };