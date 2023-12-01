import Light from "nanogl-pbr/lighting/Light";
import Program from "nanogl/program";
import LightType from "nanogl-pbr/lighting/LightType";
import AbstractLightModel from "nanogl-pbr/lighting/AbstractLightModel";
import { GlslCode } from "nanogl-pbr/interfaces/GlslCode";

import pbrCode from './glsl/ambient.frag'
import pbrPreCode from './glsl/ambient-pre.frag'

export class AmbientLightModel extends AbstractLightModel<AmbientLight> {
  readonly type = LightType.UNKNOWN;

  constructor(code: GlslCode = pbrCode, preCode: GlslCode = pbrPreCode) {
    super(code, preCode);
  }

  get light() {
    return this.lights[0];
  }

  addLight(l: AmbientLight) {
    if (this.lights.length > 0){
      throw new Error("AmbientLightModel support only one AmbientLight")
    }
    super.addLight(l);
  }

  genCodePerLights() {
    return this.codeTemplate({})
  }

  prepare() {}

  setup(prg: Program) {
    if (this.lights.length > 0) {
      super.setup(prg);

      prg.uLAmbientColor(this.light.color);

      this._invalid = false;
    }
  }
}

export class AmbientLight extends Light {
  _type: LightType = LightType.UNKNOWN;
  _color: Float32Array = new Float32Array([.1, .1, .1]);

  constructor() {
    super();
  }

  get color() {
    return this._color;
  }

  set color(v: ArrayLike<number>) {
    this._color.set(v);
  }
}