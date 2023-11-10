import Program from "nanogl/program";
import Camera from "nanogl-camera";
import PerspectiveLens from "nanogl-camera/perspective-lens";
import CircleOutline from "nanogl-primitives-2d/circle-outline";
import { vec3 } from "gl-matrix";

class OutlinedCircle {
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

    // --CIRCLE--

    // Outlined circle made with an ArrayBuffer
    this.circle = new CircleOutline(this.gl, 0.5, 32, 0.2);

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

    // link the circle buffer to the program, and draw
    this.circle.attribPointer(this.prg);
    this.circle.render();
  }
}

export default OutlinedCircle;
