import { Example } from "@examples/utils/example";
import { useWebGL } from "@examples/utils/useWebGL";
import Rect from 'nanogl-primitives-2d/rect';
import Program from 'nanogl/program';
import GLState from 'nanogl-state/GLState';

class SimpleQuad extends Example {
  constructor() {
    super();
    ({ 
      canvas: this.canvas,
      gl: this.gl,
      stop: this.stop
    } = useWebGL(this));

    this.quad = new Rect(this.gl, -0.5, -0.5, 1, 1);

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
    this.quad.attribPointer(this.prg);
    this.cfg.apply();
    this.quad.render();
  }

  dispose() {
    this.stop();
  }
}

export default SimpleQuad;
