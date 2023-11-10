import Node from "nanogl-node";
import Camera from "nanogl-camera";
import Program from "nanogl/program";
import ArrayBuffer from "nanogl/arraybuffer";
import PerspectiveLens from "nanogl-camera/perspective-lens";
import { mat4 } from "gl-matrix";

import { useWebGL } from "@gl-preview/utils/useWebGL";

const preview = (canvasEl) => {
  const { gl, size, start } = useWebGL(canvasEl);

  // --CAMERA--

  const camera = new Camera(new PerspectiveLens());
  camera.lens.setAutoFov(35.0 * (Math.PI / 180.0)); // fov is in radians
  camera.lens.near = .01;
  camera.lens.far = 50;
  camera.position.set([0, 0, 5]); // set camera back on z axis
  camera.lookAt([0, 0, 0]); // look at origin point

  // --BUFFER--

  // simple triangle with vec2 position
  const shapeVertices = new Float32Array([1, 0, 0, 0, 0, 1]);
  const shape = new ArrayBuffer(gl, shapeVertices);

  // declare aPosition attribute as vec2
  shape.attrib('aPosition', 2, gl.FLOAT);

  // --PROGRAM--

  const vertexShader = `
    attribute vec2 aPosition;

    uniform mat4 uMVP;

    void main(void){
      vec4 pos = vec4(aPosition, 0.0, 1.0);
      gl_Position = uMVP * pos;
    }
  `
  const fragmentShader = `
    precision lowp float;
    void main(void){
      vec3 red = vec3(1.0, 0.0, 0.0);
      gl_FragColor = vec4(red, 1.0);
    }
  `

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

    // link the shape buffer to the program, and draw
    shape.attribPointer(prg);
    shape.drawTriangles();
  }

  return start(render, true);
}

export {
  preview
}