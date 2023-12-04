import{B as z,P as K,m as O,a as y,F as E}from"./fetch-f973e09f.js";import{P as x,A as G}from"./arraybuffer-7f1df196.js";import{F as H}from"./fbo-645f2652.js";import{C as V,P as D}from"./index-099e42fb.js";import{G as k,a as j,I as N}from"./indexbuffer-5b89fc58.js";import{P as U}from"./tweakpane-24b35bd6.js";import{cubePosUvs as W,cubeIndices as $}from"./cubeGeometry-a8671df7.js";import{c as q}from"./vec3-33249e24.js";import"./texture-2d-53b1df66.js";import"./common-a066d304.js";var p=function(n){var o="";return o+=`precision mediump float;

uniform sampler2D tInput;

uniform vec4 uKernel[BLOOM_SAMPLES];
varying vec2 vTexCoordVP;

void main(void)
{

  vec3 color = vec3(0.0);

  for(int i=0; i<BLOOM_SAMPLES; ++i)
  {
    vec3 kernel = uKernel[i].xyz;
    color += texture2D( tInput,vTexCoordVP + kernel.xy ).xyz * kernel.z;
  }

  gl_FragColor = vec4( color, 0.0 );
  //gl_FragColor = vec4( texture2D( tInput,vTexCoord ).xyz, 0.0 );
}
`,o};p.toString=p;var X=p;p._hmrListeners=[];p.onHmr=function(n){this._hmrListeners.push(n)};p._triggerHmr=function(){for(const n of this._hmrListeners)n(this)};var g=function(n){var o="";return o+=`uniform vec3 uBloomColor;
uniform sampler2D tBloom;`,o};g.toString=g;var Q=g;g._hmrListeners=[];g.onHmr=function(n){this._hmrListeners.push(n)};g._triggerHmr=function(){for(const n of this._hmrListeners)n(this)};var f=function(n){var o="";return o+="c+= uBloomColor * texture2D(tBloom,texCoordFull).xyz;",o};f.toString=f;var Z=f;f._hmrListeners=[];f.onHmr=function(n){this._hmrListeners.push(n)};f._triggerHmr=function(){for(const n of this._hmrListeners)n(this)};const S=256;class J extends z{constructor(o,t){super(),this.color=o,this.size=t,this.bloomTextures=[],this.bloomTargets=[],this.bloomSamples=0,this.bloomKernel=null,this.prcPrg=null,this._preCode=Q(),this._code=Z()}init(){const o=this.post.gl,t=o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS),e=K.getInstance(o),r=[e.RGB16F,e.RGBA16F,e.RGB32F,e.RGBA32F,e.RGB8],a=e.getRenderableFormat(r);for(var s=0;s<2;++s){this.bloomTargets[s]=new H(o),this.bloomTargets[s].bind(),this.bloomTargets[s].attachColor(a.format,a.type,a.internal),this.bloomTargets[s].resize(S,S);var l=this.bloomTargets[s].getColor(0);l.setFilter(!0,!1,!1),l.clamp()}for(this.bloomSamples=64;this.bloomSamples+16>=t;)this.bloomSamples/=2;this.bloomKernel=new Float32Array(this.bloomSamples*4);var m=`
`;m+=`precision highp float;
`,m+=`#define BLOOM_SAMPLES ${this.bloomSamples} 
`,this.prcPrg=new x(o),this.prcPrg.compile(O(),X(),m)}resize(o,t){}release(){this.prcPrg!==null&&this.prcPrg.dispose(),this.prcPrg=null;for(var o=0;o<2;++o)this.bloomTargets[o].dispose();this.bloomTargets=[]}genCode(o,t){o.push(this._preCode),t.push(this._code)}preRender(){const o=this.prcPrg,t=this.post;this.computeKernel(),this.bloomTargets[0].bind(),this.bloomTargets[0].defaultViewport(),this.bloomTargets[0].clear(),o.use(),o.tInput(t.mainColor),o.uKernel(this.bloomKernel),t.fillScreen(o),this.transposeKernel(),this.bloomTargets[1].bind(),this.bloomTargets[1].defaultViewport(),this.bloomTargets[1].clear(),o.tInput(this.bloomTargets[0].getColor(0)),o.uKernel(this.bloomKernel),t.fillScreen(o,!0)}setupProgram(o){const t=this.color;o.uBloomColor(t[0],t[1],t[2]),o.tBloom(this.bloomTargets[1].getColor(0))}computeKernel(){const o=this.bloomKernel,t=Math.sqrt(Math.PI);for(var e=0,r=0;r<this.bloomSamples;++r){var a=r*4,s=2*r/(this.bloomSamples-1)-1,l=4*s;l=Math.exp(-l*l/2)/t,e+=l,o[a+0]=s*this.size,o[a+1]=0,o[a+2]=l,o[a+3]=0}for(r=0;r<this.bloomSamples;++r)o[4*r+2]/=e}transposeKernel(){const o=this.bloomKernel,t=this.post.renderWidth/this.post.renderHeight;for(var e=0;e<this.bloomSamples;++e){var r=e<<2;o[r+1]=o[r]*t,o[r]=0}}}const mo=n=>{let o=!0;const t=n||document.getElementById("canvas"),e=t.getContext("webgl"),r={width:1,height:1},a=window.devicePixelRatio,s=([u])=>{const I=u.contentRect.width,L=u.contentRect.height;t.width=Math.round(I*a),t.height=Math.round(L*a),r.width=e.drawingBufferWidth,r.height=e.drawingBufferHeight},l=new ResizeObserver(s);l.observe(t);const m=k.get(e),B=new j().enableDepthTest().enableCullface().cullFace(e.BACK);m.push(B);const P=q(),i=new V(new D);i.lens.setAutoFov(35*(Math.PI/180)),i.lens.near=.01,i.lens.far=50,i.position.set([0,4,10]),i.lookAt(P);const v=new G(e,new Float32Array(W)),C=new N(e,e.UNSIGNED_SHORT,new Uint16Array($));v.attrib("aPosition",3,e.FLOAT),v.attrib("aTexCoord",2,e.FLOAT);const F=`
    attribute vec3 aPosition;
    attribute vec2 aTexCoord;

    uniform mat4 uMVP;

    varying vec2 vTexCoord;

    void main(void){
      vec4 pos = vec4(aPosition, 1.0);
      gl_Position = uMVP * pos;
      vTexCoord = aTexCoord;
    }
  `,M=`
    precision highp float;

    varying vec2 vTexCoord;

    void main(void){
      vec3 color = vec3(vec2(0.5) + vTexCoord * vec2(0.5), 0.75);
      gl_FragColor = vec4(color, 1.0);
    }
  `,b=new x(e,F,M),c={bloomColor:{r:.4,g:.1,b:.5},bloomSize:.2},h=new y(e,!1);h.enabled=!0;const A=new E;h.add(A);const d=new J([c.bloomColor.r,c.bloomColor.g,c.bloomColor.b],c.bloomSize);h.add(d);const R=u=>{i.x=Math.sin(u*5e-4)*10,i.z=Math.cos(u*5e-4)*10,i.lookAt(P),i.invalidate()};let w=null;const T=(u=0)=>{o&&(m.apply(),h.preRender(r.width,r.height),h.bindColor(),R(u),i.updateWorldMatrix(),i.updateViewProjectionMatrix(r.width,r.height),b.use(),b.uMVP(i._viewProj),v.attribPointer(b),C.bind(),C.drawTriangles(),h.render(),w=window.requestAnimationFrame(T))};setTimeout(T,0);const _=new U({container:document.getElementById("debug")});return _.addBinding(c,"bloomColor",{color:{type:"float"}}).on("change",()=>{d.color[0]=c.bloomColor.r,d.color[1]=c.bloomColor.g,d.color[2]=c.bloomColor.b}),_.addBinding(c,"bloomSize",{min:0,max:1}).on("change",()=>{d.size=c.bloomSize}),()=>{o=!1,window.cancelAnimationFrame(w),l.disconnect(),_.dispose(),b.dispose(),C.dispose(),d.release(),h.dispose(),m.pop(),m.apply()}};export{mo as preview};
