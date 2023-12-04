import{P as F,A as v,a as T}from"./arraybuffer-7f1df196.js";import{F as m}from"./fbo-645f2652.js";function R(r){return r.texStorage3D!==void 0}class c{constructor(e){this.gl=e,this.EXT_texture_float=e.getExtension("OES_texture_float"),this.EXT_texture_half_float=e.getExtension("OES_texture_half_float"),this.EXT_texture_half_float_linear=e.getExtension("OES_texture_half_float_linear"),this.EXT_texture_float_linear=e.getExtension("OES_texture_float_linear"),this.EXT_color_buffer_float=e.getExtension("EXT_color_buffer_float"),this.EXT_color_buffer_half_float=e.getExtension("EXT_color_buffer_half_float"),this.WEBGL_depth_texture=e.getExtension("WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture");const i=e,t=e;t.HALF_FLOAT===void 0&&this.EXT_texture_half_float&&(i.HALF_FLOAT=this.EXT_texture_half_float.HALF_FLOAT_OES),t.UNSIGNED_INT_24_8===void 0&&this.WEBGL_depth_texture&&(i.UNSIGNED_INT_24_8=34042),this._availables={},this._renderables={},this.RGB8=a(e.RGB,t.RGB,t.UNSIGNED_BYTE),this.RGBA8=a(e.RGBA,t.RGBA,t.UNSIGNED_BYTE),this.RGB32F=a(e.RGB,t.RGB32F,t.FLOAT),this.RGBA32F=a(e.RGBA,t.RGBA32F,t.FLOAT),this.RGB16F=a(e.RGB,t.RGB16F,t.HALF_FLOAT),this.RGBA16F=a(e.RGBA,t.RGBA16F,t.HALF_FLOAT),this.A2B10G10R10=a(e.RGBA,t.RGB10_A2,t.UNSIGNED_INT_2_10_10_10_REV)}static getInstance(e){const i=e;var t=i.__pf;return t===void 0&&(i.__pf=t=new c(e)),t}dispose(){this.EXT_texture_float=null,this.EXT_texture_half_float=null,this.EXT_texture_half_float_linear=null,this.EXT_texture_float_linear=null,this.EXT_color_buffer_float=null,this.EXT_color_buffer_half_float=null;const e=this.gl;e.__pf===this&&delete e.__pf}hasDepthTexture(){return R(this.gl)?this.isAvailable(this.gl.DEPTH_COMPONENT,this.gl.UNSIGNED_INT,this.gl.DEPTH_COMPONENT24):this.isAvailable(this.gl.DEPTH_COMPONENT,this.gl.UNSIGNED_INT,this.gl.DEPTH_COMPONENT)}isAvailable(e,i,t){if(e===void 0||i===void 0)return!1;t===void 0&&(t=e);var n=p(e,i,t);return this._availables[n]===void 0&&(this._availables[n]=this._testAvailable(e,i,t)),this._availables[n]}isRenderable(e,i,t){if(e===void 0||i===void 0)return!1;t===void 0&&(t=e);const n=p(e,i,t);if(this._renderables[n]===void 0){const s=this.isAvailable(e,i,t);this._renderables[n]=s&&this._testRenderable(e,i,t)}return this._renderables[n]}getRenderableFormat(e){for(var i=0;i<e.length;i++){var t=e[i];if(this.isRenderable(t.format,t.type,t.internal))return t}return null}_testAvailable(e,i,t){const n=this.gl;n.getError();const s=n.createTexture();return n.bindTexture(n.TEXTURE_2D,s),n.texImage2D(n.TEXTURE_2D,0,t,4,4,0,e,i,null),n.deleteTexture(s),n.getError()===0}_testRenderable(e,i,t){const n=this.gl,s=n.createTexture();n.bindTexture(n.TEXTURE_2D,s),n.texImage2D(n.TEXTURE_2D,0,t,4,4,0,e,i,null);const h=n.createFramebuffer();n.bindFramebuffer(n.FRAMEBUFFER,h),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,s,0);const o=n.checkFramebufferStatus(n.FRAMEBUFFER)===n.FRAMEBUFFER_COMPLETE;return n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindTexture(n.TEXTURE_2D,null),n.deleteTexture(s),n.deleteFramebuffer(h),o}}function a(r,e,i){return{format:r,internal:e,type:i}}function p(r,e,i){return r^e<<8^i<<16}var f=function(r){var e="";return e+=`

#if __VERSION__ == 300
  #define IN in
  out vec4 FragColor;
  #define texture2D(a,b) texture( a, b )
#else
  #define IN varying
  #define FragColor gl_FragColor
#endif

uniform sampler2D tInput;
IN vec2 vTexCoordVP;
IN vec2 vTexCoordFull;

#if NEED_DEPTH
  uniform sampler2D tDepth;
#endif


#if TEXTURE_DEPTH
  float FETCH_DEPTH( sampler2D t, vec2 uvs ){
    return texture2D(t,uvs).x;
  }
#else
  
  highp float decodeDepthRGB(highp vec3 rgb){
    return(rgb.x+rgb.y*(1.0/255.0))+rgb.z*(1.0/65025.0);
  }

  float FETCH_DEPTH( sampler2D t, vec2 uvs ){
    return decodeDepthRGB( texture2D(t,uvs).xyz );
  }
#endif



vec3 sRGB( vec3 c )
{
  return c * ( c * ( c*0.305306011 + vec3(0.682171111) ) + vec3(0.012522878) );
}

float luminance( vec3 c )
{
  return dot( c, vec3(0.3,0.59,0.11) );
}



`+r.precode+`


void main(void){
  vec3 c;

  vec2 texCoordVP   = vTexCoordVP;
  vec2 texCoordFull = vTexCoordFull;


  #if NEED_DEPTH
    float sceneDepth = FETCH_DEPTH( tDepth, texCoordVP );
  #endif

  `+r.code+`

  FragColor.xyz=c;
  FragColor.w=1.0;

}`,e};f.toString=f;var D=f;f._hmrListeners=[];f.onHmr=function(r){this._hmrListeners.push(r)};f._triggerHmr=function(){for(const r of this._hmrListeners)r(this)};var l=function(r){var e="";return e+=`precision highp float;

#if __VERSION__ == 300
  #define IN in
  #define OUT out
#else
  #define IN attribute
  #define OUT varying
#endif


IN vec2 aTexCoord0;

OUT vec2 vTexCoordVP;
OUT vec2 vTexCoordFull;

uniform vec2 uViewportScale;

void main(void)
{
  vTexCoordVP   = aTexCoord0 * uViewportScale;
  vTexCoordFull = aTexCoord0;

  gl_Position.xy = 2.0 * aTexCoord0-vec2(1.0,1.0);
  gl_Position.zw = vec2(0.0,1.0);
}
`,e};l.toString=l;var A=l;l._hmrListeners=[];l.onHmr=function(r){this._hmrListeners.push(r)};l._triggerHmr=function(){for(const r of this._hmrListeners)r(this)};var E;(function(r){r[r.NONE=0]="NONE",r[r.DEPTH=2]="DEPTH",r[r.LINEAR=4]="LINEAR"})(E||(E={}));class B{constructor(){this.post=null,this._flags=0}_init(e){this.post!==e&&(this.post=e,this.init())}}class H{constructor(e,i=!1){this.gl=e,this._effects=[],this._flags=0,this._shaderInvalid=!0,this.renderWidth=1,this.renderHeight=1,this.bufferWidth=1,this.bufferHeight=1,this.enabled=!0,this.mipmap=i,this.float_texture_ext=e.getExtension("OES_texture_float"),this.halfFloat=e.getExtension("OES_texture_half_float"),this.float_texture_ext_l=e.getExtension("OES_texture_half_float_linear"),this.halfFloat_l=e.getExtension("OES_texture_float_linear"),this.color_buffer_float=e.getExtension("EXT_color_buffer_float"),this.hasDepthTexture=c.getInstance(e).hasDepthTexture(),this.mainFbo=this.genFbo(),this.mainColor=this.mainFbo.getColor(0),this.mipmap&&(this.mainColor.bind(),e.generateMipmap(e.TEXTURE_2D),e.getError()&&(this.mipmap=!1,this.mainFbo.dispose(),this.mainFbo=this.genFbo(),this.mainColor=this.mainFbo.getColor(0))),this.mainColor.setFilter(!1,this.mipmap,!1),this.prg=new F(e);const t=new Float32Array([0,0,1,0,0,1,1,1]);this.fsPlane=new v(e,t),this.fsPlane.attrib("aTexCoord0",2,e.FLOAT)}dispose(){this.mainFbo.dispose(),this.fsPlane.dispose(),this.prg.dispose()}_needDepth(){return(this._flags&E.DEPTH)!==0}_needLinear(){return(this._flags&E.LINEAR)!==0}genFbo(){const e=this.gl,i=c.getInstance(e),t=e.getContextAttributes(),n=[i.RGB16F,i.RGBA16F,i.RGB32F,i.RGBA32F,i.RGB8];T(e);const s=i.getRenderableFormat(n),h=new m(e);h.bind(),h.attachColor(s.format,s.type,s.internal),h.attachDepth(t.depth,t.stencil,this.hasDepthTexture),h.resize(4,4);const o=h.getColor(0);if(o.bind(),o.clamp(),this.hasDepthTexture){const u=h.getDepth();u.bind(),u.clamp(),u.setFilter(!1,!1,!1)}return h}add(e){this._effects.indexOf(e)===-1&&(this._effects.push(e),e._init(this),e.resize(this.renderWidth,this.renderHeight),this._flags|=e._flags,this._shaderInvalid=!0)}remove(e){const i=this._effects.indexOf(e);if(i>-1&&(this._effects.splice(i,1),e.release(),e.post=null,this._shaderInvalid=!0,e._flags!==0)){this._flags=0;for(var t=0;t<this._effects.length;t++)this._flags|=e._flags}}resize(e,i){this.bufferWidth=e,this.bufferHeight=i,this.mainFbo.resize(this.bufferWidth,this.bufferHeight);for(var t=0;t<this._effects.length;t++)this._effects[t].resize(e,i)}preRender(e,i){if(this.renderWidth=e,this.renderHeight=i,this.enabled){const t=this.mipmap?b(e):e,n=this.mipmap?b(i):i;(this.bufferWidth!==t||this.bufferHeight!==n)&&this.resize(t,n)}}needDepthPass(){return this.enabled&&this._needDepth()&&!this.hasDepthTexture}bindColor(){const e=this.gl;this.enabled?this.mainFbo.bind():e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,this.renderWidth,this.renderHeight),this.mainFbo.clear()}render(e){if(!this.enabled)return;const i=this.gl;this.mainColor.bind(),this.mipmap&&i.generateMipmap(i.TEXTURE_2D);for(var t=0;t<this._effects.length;t++)this._effects[t].preRender();e!==void 0?(e.resize(this.renderWidth,this.renderHeight),e.bind()):i.bindFramebuffer(i.FRAMEBUFFER,null),i.viewport(0,0,this.renderWidth,this.renderHeight),i.clearColor(0,0,0,1),i.clear(i.COLOR_BUFFER_BIT|i.DEPTH_BUFFER_BIT),this._shaderInvalid&&this.buildProgram(),this.prg.use();for(var t=0;t<this._effects.length;t++)this._effects[t].setupProgram(this.prg);if(this.prg.tInput(this.mainColor),this._needDepth())if(this.hasDepthTexture)this.prg.tDepth(this.mainFbo.getDepth());else throw"no depth texture";this.fillScreen(this.prg)}fillScreen(e,i=!1){i===!0?e.uViewportScale(1,1):e.uViewportScale(this.renderWidth/this.bufferWidth,this.renderHeight/this.bufferHeight),this.fsPlane.attribPointer(e),this.fsPlane.drawTriangleStrip()}buildProgram(){for(var e=[],i=[],t=this._effects,n=0;n<t.length;n++)t[n].genCode(i,e);const s=e.join(`
`),h=i.join(`
`);var o=D({code:s,precode:h}),u=A(),x=this._needDepth()&&this.hasDepthTexture,d="";T(this.gl)&&(d+=`#version 300 es
`),d+=`precision highp float;
`,d+="#define NEED_DEPTH "+ +this._needDepth()+`
`,d+="#define TEXTURE_DEPTH "+ +x+`
`,this.prg.compile(u,o,d),this._shaderInvalid=!1,this.mainColor.bind(),this.mainColor.setFilter(this._needLinear(),this.mipmap,!1)}}const g=4096;function b(r){for(var e=1;e<r;)e<<=1;return e>g&&(e=g),e}var _=function(r){var e="";return e+=`
c = texture2D(tInput,texCoordVP).xyz;`,e};_.toString=_;var C=_;_._hmrListeners=[];_.onHmr=function(r){this._hmrListeners.push(r)};_._triggerHmr=function(){for(const r of this._hmrListeners)r(this)};class O extends B{constructor(){super(),this._code=C()}genCode(e,i){i.push(this._code)}init(){}release(){}preRender(){}setupProgram(e){}resize(e,i){}}export{B,E,O as F,c as P,H as a,A as m};
