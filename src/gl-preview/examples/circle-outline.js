import Program from "nanogl/program";
import Camera from "nanogl-camera";
import PerspectiveLens from "nanogl-camera/perspective-lens";
import CircleOutline from "nanogl-primitives-2d/circle-outline";
import { vec3 } from "gl-matrix";
import { Pane } from 'tweakpane';

// TODO: remove this
import ShaderA from "nanogl-pbr/glsl/templates/standard/ibl-pre-sh.vert"
import ShaderB from "nanogl-pbr/glsl/templates/standard/ibl.frag"
import UnlitPass from "nanogl-pbr/UnlitPass"

console.log( "Test shader import 1", ShaderA() )
console.log( "Test shader import 2", ShaderB() )
console.log( "test import UnlitPass", (new UnlitPass())._shaderSource.frag )
// ==================

const preview = (canvasEl) => {

  
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

  // --CIRCLE--

  const PARAMS = {
    radius: 0.5,
    segments: 32,
    thickness: 0.2,
  };

  // Circle outline made with an ArrayBuffer
  let circle = new CircleOutline(gl, PARAMS.radius, PARAMS.segments, PARAMS.thickness);

  // --PROGRAM--

  const vertexShader = `
    attribute vec2 aPosition;
    attribute float aSide;

    uniform mat4 uMVP;

    varying float vSide;

    void main(void){
      vec4 pos = vec4(aPosition, 0.0, 1.0);
      gl_Position = uMVP * pos;
      vSide = aSide;
    }
  `;
  const fragmentShader = `
    precision lowp float;

    varying float vSide;

    void main(void){
      vec3 color = vec3(0.0, vSide, 0.0);
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const prg = new Program(gl, vertexShader, fragmentShader);

  // --RENDER--

  const render = () => {
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

    // link the circle buffer to the program, and draw
    circle.attribPointer(prg);
    circle.render();
  };

  // --DEBUG--

  const pane = new Pane({
    container: document.getElementById('debug')
  });

  const recreateGeometry = () => {
    circle.dispose();
    circle = null;
    circle = new CircleOutline(gl, PARAMS.radius, PARAMS.segments, PARAMS.thickness);
    render();
  }

  pane.addBinding(PARAMS, 'radius', {
    min: 0.1,
    max: 1,
  }).on('change', recreateGeometry);
  pane.addBinding(PARAMS, 'segments', {
    min: 1,
    max: 50,
    step: 1,
  }).on('change', recreateGeometry);
  pane.addBinding(PARAMS, 'thickness', {
    min: 0,
    max: 1,
  }).on('change', recreateGeometry);

  // dont forget to disconnect, discard, dispose, delete things at the end, to prevent memory leaks
  const dispose = () => {
    resizeObserver.disconnect();
    pane.dispose();
  }

  return dispose;
};

export { preview };