import{C as N,P as D,N as E}from"./index-5809b7fb.js";import{G as y,I as z}from"./indexbuffer-13597e9e.js";import{a as G,b as U,S as W,c as j,F as A,I as p,d as L,e as F,E as q,A as k,M as K,T as $}from"./ShaderPrecision-ccb03460.js";import{T as J}from"./texture-2d-18ce519d.js";import{A as Q}from"./arraybuffer-1b6e50fc.js";import{P as X}from"./tweakpane-24b35bd6.js";import{t as Y}from"./square-texture-5de1b8a4.js";import{cubePosUvs as Z,cubeIndices as nn}from"./cubeGeometry-a8671df7.js";import{c as en}from"./vec3-a79e08f1.js";import"./common-a066d304.js";var d=function(o){var a="";return a+=`#pragma SLOT version

#pragma SLOT definitions


#ifndef hasNormals
  #define hasNormals 0
#endif 
#ifndef hasTangents
  #define hasTangents 0
#endif 

#if hasTangents && !hasNormals 
  #pragma error tan but no nrm
  error
#endif

#pragma SLOT precision

`+require("nanogl-pbr/glsl/includes/glsl-compat.vert")()+`

#pragma SLOT pv


IN vec3 aPosition;


// uniform mat4 uMVP;
uniform mat4 uWorldMatrix;
uniform mat4 uVP;




struct VertexData {
  highp vec3 position;
  highp vec3 worldPos;
  #if hasNormals
    vec3 normal;
  #endif
  #if hasTangents
    vec3 tangent;
  #endif
  mat4 worldMatrix;
};


void InitVertexData( out VertexData vertex ){

  vertex.position = aPosition;
  #if hasNormals
    vertex.normal = vec3(0.0);
  #endif
  #if hasTangents
    vertex.tangent = vec3(0.0);
  #endif

  vertex.worldMatrix = uWorldMatrix;
   
}


void main( void ){

  #pragma SLOT v

  VertexData vertex;
  InitVertexData( vertex );

  #pragma SLOT vertex_warp

  vec4 worldPos = vertex.worldMatrix * vec4( vertex.position, 1.0 );
  vertex.worldPos.xyz = worldPos.xyz / worldPos.w;

  #pragma SLOT vertex_warp_world

  gl_Position     = uVP * vec4( vertex.worldPos, 1.0 );
  
  #pragma SLOT postv
}`,a};d.toString=d;var an=d;d._hmrListeners=[];d.onHmr=function(o){this._hmrListeners.push(o)};d._triggerHmr=function(){for(const o of this._hmrListeners)o(this)};var c=function(o){var a="";return a+=`#pragma SLOT version

#pragma SLOT definitions

#pragma SLOT precision

`+require("./includes/glsl-compat.frag")()+`

#pragma SLOT pf



// MATH
// =========
#define saturate(x) clamp( x, 0.0, 1.0 )
#define sdot( a, b ) saturate( dot(a,b) )



//                MAIN
// ===================

void main( void ){

  #pragma SLOT f

 vec3 _baseColor = vec3(1.0);
  #if HAS_baseColor
    _baseColor *= baseColor();
  #endif
  #if HAS_baseColorFactor
    _baseColor *= baseColorFactor();
  #endif



  //
  #ifdef HAS_vertexColor
  #if HAS_vertexColor
    _baseColor *= vertexColor();
  #endif
  #endif

  FragColor.xyz = _baseColor;
 

  float _alpha = 1.0;
  #if HAS_alpha
    _alpha *= alpha();
  #endif
  #if HAS_alphaFactor
    _alpha *= alphaFactor();
  #endif


  #if alphaMode( MASK )
    if( _alpha < alphaCutoff() ) discard;
    FragColor.a = 1.0;
  #elif alphaMode( BLEND )
    FragColor.a = _alpha;
  #else
    FragColor.a = 1.0;
  #endif


  #pragma SLOT postf_linear
  #pragma SLOT postf

}`,a};c.toString=c;var on=c;c._hmrListeners=[];c.onHmr=function(o){this._hmrListeners.push(o)};c._triggerHmr=function(){for(const o of this._hmrListeners)o(this)};const O=G.create(),I="unlit";class tn extends U{constructor(a="unlit-pass"){super({uid:I,vert:an(),frag:on()});const e=this.inputs;e.add(this.version=new W("100")),e.add(this.precision=new j("highp")),e.add(this.shaderid=new A("id_"+I,!0)),e.add(this.baseColor=new p("baseColor",3,L.FRAGMENT,F.SRGB)),e.add(this.baseColorFactor=new p("baseColorFactor",3,L.FRAGMENT,F.SRGB)),e.add(this.alpha=new p("alpha",1)),e.add(this.alphaFactor=new p("alphaFactor",1)),e.add(this.alphaCutoff=new p("alphaCutoff",1)),e.add(this.alphaMode=new q("alphaMode",k)),e.add(this.doubleSided=new A("doubleSided",!1))}setLightSetup(a){}prepare(a,e,n){a.uMVP&&(n.modelViewProjectionMatrix(O,e._wmatrix),a.uMVP(O)),a.uWorldMatrix&&a.uWorldMatrix(e._wmatrix),a.uVP&&a.uVP(n._viewProj)}}const vn=o=>{let a=!0;const e=o||document.getElementById("canvas"),n=e.getContext("webgl"),l={width:1,height:1},_=window.devicePixelRatio,B=([s])=>{const x=s.contentRect.width,T=s.contentRect.height;e.width=Math.round(x*_),e.height=Math.round(T*_),l.width=n.drawingBufferWidth,l.height=n.drawingBufferHeight},b=new ResizeObserver(B);b.observe(e);const f=y.get(n),S=en(),t=new N(new D);t.lens.setAutoFov(35*(Math.PI/180)),t.lens.near=.01,t.lens.far=50,t.position.set([0,4,10]),t.lookAt(S);const m=new Q(n,new Float32Array(Z)),g=new z(n,n.UNSIGNED_SHORT,new Uint16Array(nn));m.attrib("aPosition",3,n.FLOAT),m.attrib("aTexCoord",2,n.FLOAT);const R=new E,h=new J(n);h.clamp();const v=new Image;v.src=Y,v.onload=()=>{h.fromImage(v)};const r={useTexture:!1,color:{r:1,g:1,b:1}},i=new K(n);i.glconfig.enableDepthTest().enableCullface().cullFace(n.BACK);const u=new tn;i.addPass(u);const C=()=>{u.baseColor.attachUniform("color",3).set(r.color.r,r.color.g,r.color.b)},V=()=>{u.baseColor.attachSampler("color",$.create("aTexCoord")).set(h)};C();const H=s=>{t.x=Math.sin(s*5e-4)*10,t.z=Math.cos(s*5e-4)*10,t.lookAt(S),t.invalidate()};let P=null;const M=(s=0)=>{if(!a)return;n.viewport(0,0,l.width,l.height),n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT|n.DEPTH_BUFFER_BIT),i.glconfig&&f.push(i.glconfig),f.apply(),H(s),t.updateWorldMatrix(),t.updateViewProjectionMatrix(l.width,l.height),i.getAllPasses().forEach(T=>{T.prepare(R,t)});const x=i.getProgram("color");m.attribPointer(x),g.bind(),g.drawTriangles(),i.glconfig&&f.pop(),P=window.requestAnimationFrame(M)};setTimeout(M,0);const w=new X({container:document.getElementById("debug")});return w.addBinding(r,"useTexture").on("change",()=>{r.useTexture?V():C()}),w.addBinding(r,"color",{color:{type:"float"}}).on("change",()=>{r.useTexture||u.baseColor.param.set(r.color.r,r.color.g,r.color.b)}),()=>{a=!1,window.cancelAnimationFrame(P),b.disconnect(),w.dispose(),h.dispose(),g.dispose(),f.pop(),f.apply()}};export{vn as preview};
