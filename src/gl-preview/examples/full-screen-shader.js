import Program from "nanogl/program";
import ArrayBuffer from "nanogl/arraybuffer";

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
      // oscillate between 0 and 1 over time
      float blue = cos(uTime) * 0.5 + 0.5;
      gl_FragColor = vec4(vUv, blue, 1.0);
    }
  `

  const prg = new Program(gl, vertexShader, fragmentShader);

  // --RENDER--

  let rafID = null;

  const render = (time = 0) => {
    if (!canRender) return;

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
  }

  return dispose;
};

export { preview };