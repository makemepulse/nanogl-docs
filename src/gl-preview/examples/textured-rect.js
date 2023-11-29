import Rect from "nanogl-primitives-2d/rect";
import Camera from "nanogl-camera";
import Program from "nanogl/program";
import Texture2D from "nanogl/texture-2d";
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

  // --CAMERA--

  const camera = new Camera(new PerspectiveLens());
  camera.lens.setAutoFov(35.0 * (Math.PI / 180.0)); // fov is in radians
  camera.lens.near = 0.01;
  camera.lens.far = 50;
  camera.position.set([0, 0, 5]); // set camera back on z axis
  camera.lookAt(vec3.create()); // look at origin point

  // --RECTANGLE--

  // simple Rectangle made of 2 triangles in an ArrayBuffer
  let rect = new Rect(gl, -0.5, -0.5, 1, 1);

  // --TEXTURE--

  const PARAMS = {
    wrap: 'repeat',
    uvFactorX: 1,
    uvFactorY: 1,
  };

  // setup the texture
  const texture = new Texture2D(gl);
  // image needs size to be a power of 2 for repeat to work
  texture.repeat();

  // setup the image
  const img = new Image();
  img.src = "/images/square-texture.jpg";
  // set texture data from image on load
  img.onload = () => {
    texture.fromImage(img);
    // re-render scene to update texture
    render();
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
    uniform vec2 uUVFactor;

    varying vec2 vTexCoord;

    void main(void){
      gl_FragColor = texture2D(tTex, vTexCoord * uUVFactor);
    }
  `;

  const prg = new Program(gl, vertexShader, fragmentShader);

  // --RENDER--

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

    // bind program
    prg.use();
    // update program uniforms
    prg.uMVP(camera._viewProj);
    prg.tTex(texture);
    prg.uUVFactor([PARAMS.uvFactorX, PARAMS.uvFactorY]);

    // link the rectangle buffer to the program, and draw
    rect.attribPointer(prg);
    rect.render();
  };

  // --DEBUG--

  const pane = new Pane({
    container: document.getElementById('debug')
  });

  const updateTexture = () => {
    // update texture wrap mode
    texture.bind();

    if (PARAMS.wrap === 'repeat') {
      texture.repeat();
    } else if (PARAMS.wrap === 'clamp') {
      texture.clamp();
    } else if (PARAMS.wrap === 'mirror') {
      texture.mirror();
    }

    // update render
    render();
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
  }).on('change', render);
  pane.addBinding(PARAMS, 'uvFactorY', {
    min: 1,
    max: 3
  }).on('change', render);

  // dont forget to disconnect, discard, dispose, delete things at the end, to prevent memory leaks
  const dispose = () => {
    canRender = false;
    resizeObserver.disconnect();
    pane.dispose();
    prg.dispose();
    texture.dispose();
  }

  return dispose;
};

export { preview };