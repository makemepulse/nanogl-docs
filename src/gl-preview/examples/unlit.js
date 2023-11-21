import Program from "nanogl/program";
import ArrayBuffer from "nanogl/arraybuffer";
import Camera from "nanogl-camera";
import PerspectiveLens from "nanogl-camera/perspective-lens";
import { vec3 } from "gl-matrix";
// import UnlitPass from "nanogl-pbr/UnlitPass";
// import GltfLoader from "nanogl-gltf/lib/io/GltfLoader";
// import { WebImpl } from "nanogl-gltf/lib/io/web";
// import vShader from "./test.vert";

const preview = (canvasEl) => {
  console.log(vShader);
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

  // --BUFFER--

  // simple triangle with vec2 position
  const shapeVertices = new Float32Array([1, 0, 0, 0, 0, 1]);
  const shape = new ArrayBuffer(gl, shapeVertices);

  // declare aPosition attribute as vec2
  shape.attrib("aPosition", 2, gl.FLOAT);

  // --PROGRAM--

  const vertexShader = `
    attribute vec2 aPosition;

    uniform mat4 uMVP;

    void main(void){
      vec4 pos = vec4(aPosition, 0.0, 1.0);
      gl_Position = uMVP * pos;
    }
  `;

  const fragmentShader = `
    precision lowp float;
    void main(void){
      vec3 red = vec3(1.0, 0.0, 0.0);
      gl_FragColor = vec4(red, 1.0);
    }
  `;

  const prg = new Program(gl, vertexShader, fragmentShader);

  
  // const unlitPass = new UnlitPass();
  // unlitPass.glconfig.enableDepthTest().enableCullface();

  // const gltfLoader = new GltfLoader('assets/webgl/models/room.glb', new WebImpl());
  // console.log(gltfLoader);


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

    // link the shape buffer to the program, and draw
    shape.attribPointer(prg);
    shape.drawTriangles();
  };

  // dont forget to disconnect, discard, dispose, delete things at the end, to prevent memory leaks
  const dispose = () => {
    resizeObserver.disconnect();
  }

  return dispose;
};

export { preview };