import Node from "nanogl-node";
import Camera from "nanogl-camera";
import Program from "nanogl/program";
import GLState from "nanogl-state/GLState";
import GLConfig from "nanogl-state/GLConfig";
import Texture2D from "nanogl/texture-2d";
import ArrayBuffer from "nanogl/arraybuffer";
import IndexBuffer from "nanogl/indexbuffer";
import PerspectiveLens from "nanogl-camera/perspective-lens";
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
  camera.position.set([0, 0, 10]); // set camera back on z axis
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

  // make a node to be able to scale
  // the cube to fit video ratio
  const node = new Node();
  node.position.set(ORIGIN);

  // --TEXTURE--

  // setup the texture
  const texture = new Texture2D(gl);
  // texture should be clamped because video size is not power of 2
  texture.clamp();
  // setup empty texture
  texture.fromData(16,16, null);
  // flip the texture vertically
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

  // setup video
  const video = document.createElement('video');
  video.src = "/videos/video-sample.mp4";
  video.loop = true;
  video.muted = true;
  video.setAttribute('playsinline', 'true');
  video.play();

  // --VIDEO READY--

  let videoReady = false;

  video.oncanplay = () => {
    // scale the node to fit video ratio
    const ratio = video.videoWidth / video.videoHeight;
    node.scale.set([ratio, 1, ratio]);
    node.invalidate();
    node.updateWorldMatrix();

    // set video ready flag
    videoReady = true;
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

    uniform sampler2D tTex;

    varying vec2 vTexCoord;

    void main(void){
      gl_FragColor = texture2D(tTex, vTexCoord);
    }
  `;

  const prg = new Program(gl, vertexShader, fragmentShader);

  // --NODE ANIMATION--

  const animateNode = (time) => {
    // rotate node
    node.rotateY(-0.008);
    // invalidate & update node matrix
    node.invalidate();
    node.updateWorldMatrix();
  }

  // --RENDER--

  let rafID = null;
  const M4 = mat4.create();

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
    animateNode(time);

    // update camera matrices
    camera.updateWorldMatrix();
    camera.updateViewProjectionMatrix(size.width, size.height);

    // get model view projection matrix from camera with node world matrix
    camera.modelViewProjectionMatrix(M4, node._wmatrix);

    // update texture with video if ready
    if (videoReady) {
      texture.fromImage(video);
    }

    // bind program
    prg.use();
    // update program uniforms
    prg.uMVP(M4);
    prg.tTex(texture);

    // link the cube vertex buffer to the program,
    // bind the cube index buffer, and draw
    cubeVBuffer.attribPointer(prg);
    cubeIBuffer.bind();
    cubeIBuffer.drawTriangles();

    // request animation frame
    rafID = window.requestAnimationFrame(render);
  };

  setTimeout(render, 0);

  // dont forget to disconnect, discard, dispose, delete things at the end, to prevent memory leaks
  const dispose = () => {
    canRender = false;
    window.cancelAnimationFrame(rafID);
    resizeObserver.disconnect();
    prg.dispose();
    texture.dispose();
    glState.pop();
    glState.apply();
  }

  return dispose;
};

export { preview };