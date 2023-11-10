import Program from "nanogl/program";
import ArrayBuffer from "nanogl/arraybuffer";
import Camera from "nanogl-camera";
import PerspectiveLens from "nanogl-camera/perspective-lens";
import { vec3 } from "gl-matrix";

class Triangle {
  constructor() {
    // --CANVAS & CONTEXT--

    const canvas = document.getElementById("canvas");
    this.gl = canvas.getContext("webgl");

    // --SIZING--

    this.size = {
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
      this.size.width = this.gl.drawingBufferWidth;
      this.size.height = this.gl.drawingBufferHeight;

      // re-render scene to update viewport size
      this.render();
    };

    // use ResizeObserver to handle canvas resize
    this.resizeObserver = new ResizeObserver(handleResize);
    this.resizeObserver.observe(canvas);


    // --CAMERA--

    this.camera = new Camera(new PerspectiveLens());
    this.camera.lens.setAutoFov(35.0 * (Math.PI / 180.0)); // fov is in radians
    this.camera.lens.near = 0.01;
    this.camera.lens.far = 50;
    this.camera.position.set([0, 0, 5]); // set camera back on z axis
    this.camera.lookAt(vec3.create()); // look at origin point

    // --BUFFER--

    // simple triangle with vec2 position
    const shapeVertices = new Float32Array([1, 0, 0, 0, 0, 1]);
    this.shape = new ArrayBuffer(this.gl, shapeVertices);

    // declare aPosition attribute as vec2
    this.shape.attrib("aPosition", 2, this.gl.FLOAT);

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

    this.prg = new Program(this.gl, vertexShader, fragmentShader);

    this.render();
  }

  render() {
    // set viewport size
    this.gl.viewport(0, 0, this.size.width, this.size.height);
    // clear viewport
    this.gl.clearColor(0.5, 0.5, 0.5, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    // update camera matrices
    this.camera.updateWorldMatrix();
    this.camera.updateViewProjectionMatrix(this.size.width, this.size.height);

    // bind program
    this.prg.use();
    // update program uniforms
    this.prg.uMVP(this.camera._viewProj);

    // link the shape buffer to the program, and draw
    this.shape.attribPointer(this.prg);
    this.shape.drawTriangles();
  }
}

export default Triangle;
