import Fbo from "nanogl/fbo";
import Rect from "nanogl-primitives-2d/rect";
import Circle from "nanogl-primitives-2d/circle";
import Camera from "nanogl-camera";
import Program from "nanogl/program";
import ArrayBuffer from "nanogl/arraybuffer";
import PerspectiveLens from "nanogl-camera/perspective-lens";
import { vec3 } from "gl-matrix";
import { Pane } from 'tweakpane';

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

    // re-render scene to update viewport size
    render();
  };

  // use ResizeObserver to handle canvas resize
  const resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(canvas);

  // --FBO--

  const fboSize = {
    width: 512,
    height: 512,
  };

  const PARAMS = {
    wrap: 'repeat',
    uvFactorX: 1,
    uvFactorY: 1,
  };

  const fbo = new Fbo(gl);
  // attach color to fbo
  fbo.attachColor();
  // setup color texture
  const colorTex = fbo.getColorTexture();
  colorTex.bind();
  colorTex.setFormat(gl.RGBA);
  colorTex.repeat();
  // set fbo size
  fbo.resize(fboSize.width, fboSize.height);

  // --CAMERA (FOR FBO RENDER)--

  const ORIGIN = vec3.create();

  const fboCamera = new Camera(new PerspectiveLens());
  fboCamera.lens.setAutoFov(35.0 * (Math.PI / 180.0)); // fov is in radians
  fboCamera.lens.near = 0.01;
  fboCamera.lens.far = 50;
  fboCamera.position.set([0, 3, 5]); // set camera back on z axis and up on y axis
  fboCamera.lookAt(ORIGIN); // look at origin point

  // --CAMERA (FOR NORMAL RENDER)--

  const camera = new Camera(new PerspectiveLens());
  camera.lens.setAutoFov(35.0 * (Math.PI / 180.0)); // fov is in radians
  camera.lens.near = 0.01;
  camera.lens.far = 50;
  camera.position.set([0, 0, 5]); // set camera back on z axis
  camera.lookAt(ORIGIN); // look at origin point

  // --CIRCLE (FOR FBO RENDER)--

  const circle = new Circle(gl, 1, 32);

  // --RECT (FOR NORMAL RENDER)--

  const rect = new Rect(gl, -0.75, -0.75, 1.5, 1.5);

  // --PROGRAM (FOR FBO CIRCLE)--

  const fboVertexShader = `
    attribute vec2 aPosition;

    uniform mat4 uMVP;

    void main(void){
      vec4 pos = vec4(aPosition, 0.0, 1.0);
      gl_Position = uMVP * pos;
    }
  `;

  const fboFragmentShader = `
    precision lowp float;
    void main(void){
      vec3 color = vec3(0.5, 0., 0.5);
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const fboPrg = new Program(gl, fboVertexShader, fboFragmentShader);

  // --PROGRAM (FOR NORMAL RECTANGLE)--

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
    uniform vec2 uUVFactor;

    varying vec2 vTexCoord;

    void main(void){
      vec4 background = vec4(0.65, 0.45, 0.65, 1.0);
      vec4 foreground = texture2D(tTex, vTexCoord * uUVFactor);
      gl_FragColor = mix(background, foreground, foreground.a);
    }
  `;

  const prg = new Program(gl, vertexShader, fragmentShader);

  // --CAMERA ANIMATION (FOR FBO RENDER)--

  const animateFboCamera = (time) => {
    // rotate camera around origin
    fboCamera.x = Math.sin(time * 0.001) * 5;
    fboCamera.z = Math.cos(time * 0.001) * 5;
    // look at origin
    fboCamera.lookAt(ORIGIN);
    // invalidate camera matrices
    fboCamera.invalidate();
  }

  // --CAMERA ANIMATION (FOR NORMAL RENDER)--

  const animateCamera = (time) => {
    // rotate camera around origin (small arc oscillation)
    const pos = Math.cos(time * 0.0008) * (Math.PI * 0.1);
    camera.x = Math.sin(pos) * 5;
    camera.z = Math.cos(pos) * 5;
    // look at origin
    camera.lookAt(ORIGIN);
    // invalidate camera matrices
    camera.invalidate();
  }

  // --RENDER--

  let rafID = null;

  // FBO render
  const fboRender = (time) => {
    // bind fbo
    fbo.bind();
    // set viewport size
    fbo.defaultViewport();
    // clear all buffers
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // animate camera
    animateFboCamera(time);

    // update camera matrices
    fboCamera.updateWorldMatrix();
    fboCamera.updateViewProjectionMatrix(fboSize.width, fboSize.height);

    // bind program
    fboPrg.use();
    // update program uniforms
    fboPrg.uMVP(fboCamera._viewProj);

    // link the circle to the program, and draw
    circle.attribPointer(fboPrg);
    circle.render();
  }

  // normal render
  const normalRender = (time) => {
    // unbind fbo
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    // set viewport size
    gl.viewport(0, 0, size.width, size.height);
    // clear viewport
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // animate camera
    animateCamera(time);

    // update camera matrices
    camera.updateWorldMatrix();
    camera.updateViewProjectionMatrix(size.width, size.height);

    // bind program
    prg.use();
    // update program uniforms
    prg.uMVP(camera._viewProj);
    prg.tTex(fbo.getColorTexture());
    prg.uUVFactor([PARAMS.uvFactorX, PARAMS.uvFactorY]);

    // link the rectange to the program, and draw
    rect.attribPointer(prg);
    rect.render();
  }

  const render = (time = 0) => {
    if (!canRender) return;

    fboRender(time);
    normalRender(time);

    // request animation frame
    rafID = window.requestAnimationFrame(render);
  };

  setTimeout(render, 0);

  // --DEBUG--

  const pane = new Pane({
    container: document.getElementById('debug')
  });

  const updateTexture = () => {
    const colorTex = fbo.getColorTexture();
    // update texture wrap mode
    colorTex.bind();

    if (PARAMS.wrap === 'repeat') {
      colorTex.repeat();
    } else if (PARAMS.wrap === 'clamp') {
      colorTex.clamp();
    } else if (PARAMS.wrap === 'mirror') {
      colorTex.mirror();
    }
  }

  pane.addBinding(PARAMS, 'wrap', {
    options: {
      repeat: 'repeat',
      clamp: 'clamp',
      mirror: 'mirror',
    }
  }).on('change', updateTexture);
  pane.addBinding(PARAMS, 'uvFactorX', {
    min: 1,
    max: 3
  });
  pane.addBinding(PARAMS, 'uvFactorY', {
    min: 1,
    max: 3
  });

  // dont forget to disconnect, discard, dispose, delete things at the end, to prevent memory leaks
  const dispose = () => {
    canRender = false;
    window.cancelAnimationFrame(rafID);
    resizeObserver.disconnect();
    pane.dispose();
    prg.dispose();
    fboPrg.dispose();
    fbo.dispose();
  }

  return dispose;
};

export { preview };