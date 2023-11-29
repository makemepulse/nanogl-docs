import Rect from "nanogl-primitives-2d/rect";
import Camera from "nanogl-camera";
import Program from "nanogl/program";
import Texture2D from "nanogl/texture-2d";
import PerspectiveLens from "nanogl-camera/perspective-lens";
import { vec3 } from "gl-matrix";

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

  // --CAMERA--

  const camera = new Camera(new PerspectiveLens());
  camera.lens.setAutoFov(35.0 * (Math.PI / 180.0)); // fov is in radians
  camera.lens.near = 0.01;
  camera.lens.far = 50;
  camera.position.set([0, 0, 5]); // set camera back on z axis
  camera.lookAt(vec3.create()); // look at origin point

  // --RECTANGLE--

  // simple Rectangle made of 2 triangles in an ArrayBuffer
  let rect = new Rect(gl, -0.75, -0.5, 1.5, 1);

  // --TEXTURE--

  // setup the texture
  const texture = new Texture2D(gl);
  // texture is clamped because video is not power of 2
  texture.clamp();
  // setup empty texture
  texture.fromData(16,16, null);
  // flip the texture vertically
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

  let videoReady = false;

  // setup video
  const video = document.createElement('video');
  video.src = "/videos/video-sample.mp4";
  video.loop = true;
  video.muted = true;
  video.setAttribute('playsinline', 'true');
  video.play();

  // set video ready flag when video can play
  video.oncanplay = () => {
    videoReady = true;
  }

  // --PROGRAM--

  const vertexShader = `
    attribute vec2 aPosition;
    attribute vec2 aTexCoord;

    uniform mat4 uMVP;

    varying vec2 vTexCoord;

    void main(void){
      vec4 pos = vec4(aPosition, 0.0, 1.0);
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

  // --RENDER--

  let rafID = null;

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

    // update texture with video if ready
    if (videoReady) {
      texture.fromImage(video);
    }

    // bind program
    prg.use();
    // update program uniforms
    prg.uMVP(camera._viewProj);
    prg.tTex(texture);

    // link the rectangle buffer to the program, and draw
    rect.attribPointer(prg);
    rect.render();

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
  }

  return dispose;
};

export { preview };