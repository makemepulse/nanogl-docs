import{C as N,P as D,N as E}from"./index-099e42fb.js";import{G as y,I as z}from"./indexbuffer-5b89fc58.js";import{g as G,a as U,m as W,M as j,f as $,S as k,F as A,I as p,h as L,C as F,E as K,A as q,b as J,T as Q}from"./ShaderVersion-75aae7d1.js";import{T as X}from"./texture-2d-53b1df66.js";import{A as Y}from"./arraybuffer-7f1df196.js";import{P as Z}from"./tweakpane-24b35bd6.js";import{t as nn}from"./square-texture-da94ec58.js";import{cubePosUvs as en,cubeIndices as an}from"./cubeGeometry-a8671df7.js";import{c as tn}from"./vec3-33249e24.js";import"./common-a066d304.js";var d=function(t){var a="";return a+=`#pragma SLOT version

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

`+G()+`

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
}`,a};d.toString=d;var on=d;d._hmrListeners=[];d.onHmr=function(t){this._hmrListeners.push(t)};d._triggerHmr=function(){for(const t of this._hmrListeners)t(this)};var c=function(t){var a="";return a+=`#pragma SLOT version

#pragma SLOT definitions

#pragma SLOT precision

`+U()+`

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

}`,a};c.toString=c;var rn=c;c._hmrListeners=[];c.onHmr=function(t){this._hmrListeners.push(t)};c._triggerHmr=function(){for(const t of this._hmrListeners)t(this)};const O=W.create(),I="unlit";class sn extends j{constructor(a="unlit-pass"){super({uid:I,vert:on(),frag:rn()});const e=this.inputs;e.add(this.version=new $("100")),e.add(this.precision=new k("highp")),e.add(this.shaderid=new A("id_"+I,!0)),e.add(this.baseColor=new p("baseColor",3,L.FRAGMENT,F.SRGB)),e.add(this.baseColorFactor=new p("baseColorFactor",3,L.FRAGMENT,F.SRGB)),e.add(this.alpha=new p("alpha",1)),e.add(this.alphaFactor=new p("alphaFactor",1)),e.add(this.alphaCutoff=new p("alphaCutoff",1)),e.add(this.alphaMode=new K("alphaMode",q)),e.add(this.doubleSided=new A("doubleSided",!1))}setLightSetup(a){}prepare(a,e,n){a.uMVP&&(n.modelViewProjectionMatrix(O,e._wmatrix),a.uMVP(O)),a.uWorldMatrix&&a.uWorldMatrix(e._wmatrix),a.uVP&&a.uVP(n._viewProj)}}const xn=t=>{let a=!0;const e=t||document.getElementById("canvas"),n=e.getContext("webgl"),l={width:1,height:1},T=window.devicePixelRatio,B=([s])=>{const x=s.contentRect.width,_=s.contentRect.height;e.width=Math.round(x*T),e.height=Math.round(_*T),l.width=n.drawingBufferWidth,l.height=n.drawingBufferHeight},b=new ResizeObserver(B);b.observe(e);const f=y.get(n),S=tn(),o=new N(new D);o.lens.setAutoFov(35*(Math.PI/180)),o.lens.near=.01,o.lens.far=50,o.position.set([0,4,10]),o.lookAt(S);const m=new Y(n,new Float32Array(en)),g=new z(n,n.UNSIGNED_SHORT,new Uint16Array(an));m.attrib("aPosition",3,n.FLOAT),m.attrib("aTexCoord",2,n.FLOAT);const R=new E,h=new X(n);h.clamp();const v=new Image;v.src=nn,v.onload=()=>{h.fromImage(v)};const r={useTexture:!1,color:{r:1,g:1,b:1}},i=new J(n);i.glconfig.enableDepthTest().enableCullface().cullFace(n.BACK);const u=new sn;i.addPass(u);const C=()=>{u.baseColor.attachUniform("color",3).set(r.color.r,r.color.g,r.color.b)},V=()=>{u.baseColor.attachSampler("color",Q.create("aTexCoord")).set(h)};C();const H=s=>{o.x=Math.sin(s*5e-4)*10,o.z=Math.cos(s*5e-4)*10,o.lookAt(S),o.invalidate()};let P=null;const M=(s=0)=>{if(!a)return;n.viewport(0,0,l.width,l.height),n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT|n.DEPTH_BUFFER_BIT),i.glconfig&&f.push(i.glconfig),f.apply(),H(s),o.updateWorldMatrix(),o.updateViewProjectionMatrix(l.width,l.height),i.getAllPasses().forEach(_=>{_.prepare(R,o)});const x=i.getProgram("color");m.attribPointer(x),g.bind(),g.drawTriangles(),i.glconfig&&f.pop(),P=window.requestAnimationFrame(M)};setTimeout(M,0);const w=new Z({container:document.getElementById("debug")});return w.addBinding(r,"useTexture").on("change",()=>{r.useTexture?V():C()}),w.addBinding(r,"color",{color:{type:"float"}}).on("change",()=>{r.useTexture||u.baseColor.param.set(r.color.r,r.color.g,r.color.b)}),()=>{a=!1,window.cancelAnimationFrame(P),b.disconnect(),w.dispose(),h.dispose(),g.dispose(),f.pop(),f.apply()}};export{xn as preview};
