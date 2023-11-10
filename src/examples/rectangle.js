import Program from "nanogl/program";
import Camera from "nanogl-camera";
import PerspectiveLens from "nanogl-camera/perspective-lens";
import Rect from "nanogl-primitives-2d/rect";
import { vec3 } from "gl-matrix";

class Rectangle {
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

    // --RECTANGLE--

    // simple Rectangle made of 2 triangles in an ArrayBuffer
    this.rect = new Rect(this.gl, -0.5, -0.5, 1, 1);

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

    // link the rectangle buffer to the program, and draw
    this.rect.attribPointer(this.prg);
    this.rect.render();
  }

  dispose() {
    this.resizeObserver.disconnect();
  }
}

export default Rectangle;
