import Rect from "nanogl-primitives-2d/rect";
import Camera from "nanogl-camera";
import Program from "nanogl/program";
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

  const PARAMS = {
    position: { x: -0.5, y: -0.5 },
    width: 1,
    height: 1,
  };

  // simple Rectangle made of 2 triangles in an ArrayBuffer
  let rect = new Rect(gl, PARAMS.position.x, PARAMS.position.y, PARAMS.width, PARAMS.height);

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
    precision lowp float;

    varying vec2 vTexCoord;

    void main(void){
      vec3 color = vec3(vTexCoord, 0.0);
      gl_FragColor = vec4(color, 1.0);
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

    // link the rectangle buffer to the program, and draw
    rect.attribPointer(prg);
    rect.render();
  };

  // --DEBUG--

  const pane = new Pane({
    container: document.getElementById('debug')
  });

  const recreateGeometry = () => {
    rect.dispose();
    rect = null;
    rect = new Rect(gl, PARAMS.position.x, PARAMS.position.y, PARAMS.width, PARAMS.height);
    render();
  }

  pane.addBinding(PARAMS, 'position', {
    min: -1.5,
    max: 0.5,
  }).on('change', recreateGeometry);
  pane.addBinding(PARAMS, 'width', {
    min: 0.1,
    max: 2,
  }).on('change', recreateGeometry);
  pane.addBinding(PARAMS, 'height', {
    min: 0.1,
    max: 2,
  }).on('change', recreateGeometry);

  // dont forget to disconnect, discard, dispose, delete things at the end, to prevent memory leaks
  const dispose = () => {
    canRender = false;
    resizeObserver.disconnect();
    pane.dispose();
    prg.dispose();
  }

  return dispose;
};

export { preview };