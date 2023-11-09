import { Example } from "@examples/utils/example";
import { useWebGL } from "@examples/utils/useWebGL";
import CircleOutline from 'nanogl-primitives-2d/circle-outline';
import Program from 'nanogl/program';
import GLState from 'nanogl-state/GLState';

class OutlinedCircle extends Example {
  constructor() {
    super();
    ({ 
      canvas: this.canvas,
      gl: this.gl,
      stop: this.stop
    } = useWebGL(this));

    this.circle = new CircleOutline(this.gl, 0.5, 10, 0.05);

    this.vertCode =
      "attribute vec2 aPosition;" +
      "attribute vec2 aTexCoord;" +
      "uniform float uTime;" +
      "varying vec2 vTexCoord;" +
      "varying float vTime;" +
      "void main(void){" +
      " gl_Position = vec4(aPosition, 0.0, 1.0);" +
      " vTexCoord = aTexCoord;" +
      " vTime = uTime;" +
      "}"
    this.fragCode =
      "varying lowp vec2 vTexCoord;" +
      "varying lowp float vTime;" +
      "void main(void){" +
      " gl_FragColor = vec4(vTexCoord, sin(vTime) * .5 + .5, 1.0);" +
      "}"
    
    this.prg = new Program(this.gl, this.vertCode, this.fragCode);

    this.cfg = GLState.get(this.gl).config()
      .enableCullface(false)
      .enableDepthTest(false)
      .depthMask(false)
  }

  update({ elapsedTime }) {
    // this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.clearColor(0.5, 0.5, 0.5, 0.9);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    this.prg.use();
    this.prg.uTime(elapsedTime * .001);
    this.circle.attribPointer(this.prg);
    this.cfg.apply();
    this.circle.render();
  }

  dispose() {
    this.stop();
  }
}

export default OutlinedCircle;
