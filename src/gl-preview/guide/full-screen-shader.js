import Program from "nanogl/program";
import ArrayBuffer from "nanogl/arraybuffer";

import { useWebGL } from "@gl-preview/utils/useWebGL";

const preview = (canvasEl) => {
  const { gl, size, start } = useWebGL(canvasEl);

  // --BUFFER--

  // full-screen triangle with vec2 position and vec2 uvs
  const quadData = new Float32Array([
    -1, 3, 0, 2,
    -1, -1, 0, 0,
    3, -1, 2, 0,
  ]);
  const quad = new ArrayBuffer(gl, quadData);

  // declare aPosition attribute as vec2
  quad.attrib('aPosition', 2, gl.FLOAT);
  quad.attrib('aTexCoord', 2, gl.FLOAT);

  // --PROGRAM--

  const vertexShader = `
    attribute vec2 aPosition;
    attribute vec2 aTexCoord;

    varying vec2 vUv;

    void main(void){
      gl_Position = vec4(aPosition, 0.0, 1.0);
      vUv = aTexCoord;
    }
  `
  const fragmentShader = `
    precision lowp float;

    uniform float uTime;

    varying vec2 vUv;

    void main(void){
      // we'll make the value oscillate between 0 and 1 over time
      float blue = cos(uTime) * 0.5 + 0.5;
      gl_FragColor = vec4(vUv, blue, 1.0);
    }
  `

  const prg = new Program(gl, vertexShader, fragmentShader);

  // --RENDER--

  const render = ({ elapsedTime: time }) => {
    // setup viewport
    gl.viewport(0, 0, size.width, size.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // bind program
    prg.use();
    prg.uTime(time * 0.001);

    // link the quad buffer to the program, and draw
    quad.attribPointer(prg);
    quad.drawTriangles();
  }

  return start(render, false);
}

export {
  preview
}