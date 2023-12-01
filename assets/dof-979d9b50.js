import{b as N,P,i as te,A as ne}from"./arraybuffer-1b6e50fc.js";import{F as re}from"./fbo-469d6df9.js";import{B as oe,E as $,m as ie,a as se,F as ae}from"./fetch-17b3f59c.js";import{c as j,t as A}from"./vec3-a79e08f1.js";import{C as ce,P as le,N as he}from"./index-5809b7fb.js";import{G as ue,a as fe,I as de}from"./indexbuffer-13597e9e.js";import{P as pe}from"./tweakpane-24b35bd6.js";import{cubePosUvs as me,cubeIndices as ve}from"./cubeGeometry-a8671df7.js";import{c as ge}from"./mat4-2d297a36.js";import"./texture-2d-18ce519d.js";import"./common-a066d304.js";let De=0;class be{constructor(e){this._uid=De++,this.gl=e,this.id=e.createSampler(),this.setFilter(!0)}bind(e){this.gl.bindSampler(e,this.id)}dispose(){this.gl.deleteSampler(this.id)}setFilter(e=!1,t=!1,r=!1){const o=this.gl;o.samplerParameteri(this.id,o.TEXTURE_MAG_FILTER,N(!!e,!1,!1)),o.samplerParameteri(this.id,o.TEXTURE_MIN_FILTER,N(!!e,!!t,!!r))}repeat(){this.wrap(this.gl.REPEAT)}clamp(){this.wrap(this.gl.CLAMP_TO_EDGE)}mirror(){this.wrap(this.gl.MIRRORED_REPEAT)}wrap(e){const t=this.gl;t.samplerParameteri(this.id,t.TEXTURE_WRAP_S,e),t.samplerParameteri(this.id,t.TEXTURE_WRAP_T,e)}}var C=function(n){var e="";return e+=`precision mediump float;

uniform sampler2D tInput;
uniform sampler2D tDepth;

uniform vec2 uDofEq;
// uniform vec3 uDofFarEq;
uniform highp vec2 uInvTargetSize;

varying vec2 tcColor0;
varying vec2 tcColor1;
varying vec2 tcDepth0;
varying vec2 tcDepth1;
varying vec2 tcDepth2;
varying vec2 tcDepth3;


vec4 saturate( vec4 v ){
  return clamp( v, 0.0, 1.0 );
}

vec4 getDofCoC( vec4 depth ){
  // return max(
  //   saturate( uDofEq.x    * depth + uDofEq.y    ),
  //   saturate( uDofFarEq.x * depth + uDofFarEq.y )
  // );
  

  return saturate( uDofEq.x    * depth + uDofEq.y    );

  // clamp depth 1 = coco 0
    //* step( vec4(.001), vec4(1.0)-depth );
}

void main(void)
{

  vec3 color;
  vec4 depth;
  vec4 coc;

  vec2 rowDelta;

  rowDelta = vec2( 0.0, 2.0 * uInvTargetSize.y );
  // Use bilinear filtering to average 4 color samples for free.

  color  = texture2D( tInput, tcColor0            ).rgb;
  color += texture2D( tInput, tcColor1            ).rgb;
  color += texture2D( tInput, tcColor0 + rowDelta ).rgb;
  color += texture2D( tInput, tcColor1 + rowDelta ).rgb;
  color /= 4.0;

  // Process 4 samples at a time to use vector hardware efficiently.
   // The CoC will be 1 if the depth is negative, so use "min" to pick
   // between "sceneCoc" and "viewCoc".
  depth.x = texture2D( tDepth, tcDepth0            ).r;
  depth.y = texture2D( tDepth, tcDepth1            ).r;
  depth.z = texture2D( tDepth, tcDepth2            ).r;
  depth.w = texture2D( tDepth, tcDepth3            ).r;

  coc = getDofCoC( depth );


  rowDelta = vec2( 0.0, -2.0 * uInvTargetSize.y );
  depth.x = texture2D( tDepth, tcDepth0 + rowDelta ).r;
  depth.y = texture2D( tDepth, tcDepth1 + rowDelta ).r;
  depth.z = texture2D( tDepth, tcDepth2 + rowDelta ).r;
  depth.w = texture2D( tDepth, tcDepth3 + rowDelta ).r;

  coc = max( coc, getDofCoC( depth ) );


  rowDelta = vec2( 0.0, 2.0 * uInvTargetSize.y );
  depth.x = texture2D( tDepth, tcDepth0 + rowDelta ).r;
  depth.y = texture2D( tDepth, tcDepth1 + rowDelta ).r;
  depth.z = texture2D( tDepth, tcDepth2 + rowDelta ).r;
  depth.w = texture2D( tDepth, tcDepth3 + rowDelta ).r;

  coc = max( coc, getDofCoC( depth ) );


  rowDelta = vec2( 0.0, 4.0 * uInvTargetSize.y );
  depth.x = texture2D( tDepth, tcDepth0 + rowDelta ).r;
  depth.y = texture2D( tDepth, tcDepth1 + rowDelta ).r;
  depth.z = texture2D( tDepth, tcDepth2 + rowDelta ).r;
  depth.w = texture2D( tDepth, tcDepth3 + rowDelta ).r;

  coc = max( coc, getDofCoC( depth ) );


  float maxCoc = max( max( coc.x, coc.y ), max( coc.z, coc.w ) );
  gl_FragColor = vec4( color, maxCoc );

}
`,e};C.toString=C;var xe=C;C._hmrListeners=[];C.onHmr=function(n){this._hmrListeners.push(n)};C._triggerHmr=function(){for(const n of this._hmrListeners)n(this)};var _=function(n){var e="";return e+=`
precision highp float;

uniform vec2 uInvTargetSize;
uniform vec2 uViewportScale;

attribute vec2 aTexCoord0;

varying vec2 tcColor0;
varying vec2 tcColor1;
varying vec2 tcDepth0;
varying vec2 tcDepth1;
varying vec2 tcDepth2;
varying vec2 tcDepth3;


void main(void)
{
  vec2 tc = aTexCoord0 * uViewportScale;

  tcColor0 = tc + vec2( -0.5, -0.5 ) * uInvTargetSize;
  tcColor1 = tc + vec2( +1.5, -0.5 ) * uInvTargetSize;
  tcDepth0 = tc + vec2( -2.5, -0.5 ) * uInvTargetSize;
  tcDepth1 = tc + vec2( -0.5, -0.5 ) * uInvTargetSize;
  tcDepth2 = tc + vec2( +1.5, -0.5 ) * uInvTargetSize;
  tcDepth3 = tc + vec2( +3.5, -0.5 ) * uInvTargetSize;

  gl_Position.xy = 2.0 * aTexCoord0-vec2(1.0,1.0);
  gl_Position.zw = vec2(0.0,1.0);
}
`,e};_.toString=_;var Ce=_;_._hmrListeners=[];_.onHmr=function(n){this._hmrListeners.push(n)};_._triggerHmr=function(){for(const n of this._hmrListeners)n(this)};var w=function(n){var e="";return e+=`precision mediump float;

uniform sampler2D tInput;

uniform vec3 uKernel[BLUR_SAMPLES];
varying vec2 vTexCoordVP;

void main(void)
{

  vec4 color = vec4( 0.0 );

  for(int i=0; i<BLUR_SAMPLES; ++i)
  {
    vec3 kernel = uKernel[i];
    color += texture2D( tInput, vTexCoordVP + kernel.xy ) * kernel.z;
  }

  gl_FragColor = color;

}
`,e};w.toString=w;var _e=w;w._hmrListeners=[];w.onHmr=function(n){this._hmrListeners.push(n)};w._triggerHmr=function(){for(const n of this._hmrListeners)n(this)};var S=function(n){var e="";return e+=`precision mediump float;

uniform sampler2D tDownsample;
uniform sampler2D tBlurred;

varying vec2 vTexCoord;

void main(void)
{

  vec4 shrunk  = texture2D( tDownsample, vTexCoord );
  vec4 blurred = texture2D( tBlurred   , vTexCoord );

  float coc = 2.0 * max( blurred.a, shrunk.a ) - shrunk.a;

  gl_FragColor = vec4( shrunk.rgb, coc );

}
`,e};S.toString=S;var we=S;S._hmrListeners=[];S.onHmr=function(n){this._hmrListeners.push(n)};S._triggerHmr=function(){for(const n of this._hmrListeners)n(this)};var T=function(n){var e="";return e+=`
precision highp float;

uniform vec2 uViewportScale;

attribute vec2 aTexCoord0;

varying vec2 vTexCoord;


void main(void)
{
  vTexCoord = aTexCoord0 * uViewportScale;
  gl_Position.xy = 2.0 * aTexCoord0-vec2(1.0,1.0);
  gl_Position.zw = vec2(0.0,1.0);
}
`,e};T.toString=T;var Se=T;T._hmrListeners=[];T.onHmr=function(n){this._hmrListeners.push(n)};T._triggerHmr=function(){for(const n of this._hmrListeners)n(this)};var E=function(n){var e="";return e+=`precision mediump float;

uniform sampler2D tCoc;

varying vec4 vTexCoord;

void main(void)
{

  vec4 color;

  color  = texture2D( tCoc, vTexCoord.xz );
  color += texture2D( tCoc, vTexCoord.yz );
  color += texture2D( tCoc, vTexCoord.xw );
  color += texture2D( tCoc, vTexCoord.yw );

  gl_FragColor = color / 4.0;

}
`,e};E.toString=E;var Te=E;E._hmrListeners=[];E.onHmr=function(n){this._hmrListeners.push(n)};E._triggerHmr=function(){for(const n of this._hmrListeners)n(this)};var F=function(n){var e="";return e+=`
precision highp float;


attribute vec2 aTexCoord0;

uniform vec2 uInvTargetSize;
uniform vec2 uViewportScale;

varying vec4 vTexCoord;


void main(void)
{

  const vec4 halfPixel = vec4( -0.5, 0.5, -0.5, 0.5 );

  vec2 texCoords = aTexCoord0 * uViewportScale;
  vTexCoord = texCoords.xxyy + halfPixel * uInvTargetSize.xxyy;

  gl_Position.xy = 2.0 * aTexCoord0-vec2(1.0,1.0);
  gl_Position.zw = vec2(0.0,1.0);

}
`,e};F.toString=F;var Ee=F;F._hmrListeners=[];F.onHmr=function(n){this._hmrListeners.push(n)};F._triggerHmr=function(){for(const n of this._hmrListeners)n(this)};var B=function(n){var e="";return e+=`
uniform sampler2D tDofMedBlur;
uniform sampler2D tDofBlur;
uniform vec2      uDofInvTargetSize;

uniform vec4      uDofLerpScale;
uniform vec4      uDofLerpBias;
uniform vec3      uDofEqFar;


vec3 GetSmallBlurSample( vec2 texCoords )
{
  vec3 sum;
  const float weight = 4.0 / 17.0;
  sum  = weight * texture2D( tInput, texCoords + vec2(+0.5, -1.5)*uDofInvTargetSize ).rgb;
  sum += weight * texture2D( tInput, texCoords + vec2(-1.5, -0.5)*uDofInvTargetSize ).rgb;
  sum += weight * texture2D( tInput, texCoords + vec2(-0.5, +1.5)*uDofInvTargetSize ).rgb;
  sum += weight * texture2D( tInput, texCoords + vec2(+1.5, +0.5)*uDofInvTargetSize ).rgb;
  return sum;
}


float GetSmallBlurDepth( vec2 texCoords )
{
  float sum;
  const float weight = 4.0 / 17.0;
  sum  = weight * FETCH_DEPTH( tDepth, texCoords + vec2(+0.5, -1.5) * 2.0 *uDofInvTargetSize );
  sum += weight * FETCH_DEPTH( tDepth, texCoords + vec2(-1.5, -0.5) * 2.0 *uDofInvTargetSize );
  sum += weight * FETCH_DEPTH( tDepth, texCoords + vec2(-0.5, +1.5) * 2.0 *uDofInvTargetSize );
  sum += weight * FETCH_DEPTH( tDepth, texCoords + vec2(+1.5, +0.5) * 2.0 *uDofInvTargetSize );
  return sum;
}



void InterpolateDof( inout vec3 c, mediump vec3 small, mediump vec3 med, mediump vec3 large, mediump float coc )
{
  mediump vec4  weights;
  mediump vec3  color;
  mediump float alpha;


  // Efficiently calculate the cross-blend weights for each sample.
   // Let the unblurred sample to small blur fade happen over distance
   // d0, the small to medium blur over distance d1, and the medium to
   // large blur over distance d2, where d0 + d1 + d2 = 1.
   // dofLerpScale = float4( -1 / d0, -1 / d1, -1 / d2, 1 / d2 );
   // dofLerpBias = float4( 1, (1 – d2) / d1, 1 / d2, (d2 – 1) / d2 );

  weights = clamp( coc * uDofLerpScale + uDofLerpBias, 0.0, 1.0 );
  weights.yz = min( weights.yz, 1.0 - weights.xy );

  // Unblurred sample with weight "weights.x" done by alpha blending
  color = weights.y * small + weights.z * med + weights.w * large;
  alpha = 1.0 - dot( weights.yzw, vec3( 16.0 / 17.0, 1.0, 1.0 ) );

  c = c*alpha + color;

}`,e};B.toString=B;var Fe=B;B._hmrListeners=[];B.onHmr=function(n){this._hmrListeners.push(n)};B._triggerHmr=function(){for(const n of this._hmrListeners)n(this)};var z=function(n){var e="";return e+=`// uniform sampler2D tDofMedBlur;
// uniform sampler2D tDofBlur;
// uniform vec2      uDofInvTargetSize;

{
  mediump vec3 small;
  mediump vec4 med;
  mediump vec3 large;
  mediump float nearCoc;
  mediump float farCoc;
  mediump float coc;

  small   = GetSmallBlurSample( texCoordVP ) + c*(1.0/17.0);

  
  med     = texture2D( tDofMedBlur, texCoordVP );
  large   = texture2D( tDofBlur   , texCoordVP ).rgb;
  nearCoc = med.a;// * 0.000001;

  // if ( sceneDepth > .999999 )
  // {
  //   coc = nearCoc; // We don't want to blur the sky.
  // }
  // else
  // {


    // dofEqFar.x and dofEqFar.y specify the linear ramp to convert
   // to depth for the distant out-of-focus region.
   // dofEqFar.z is the ratio of the far to the near blur radius.
  farCoc = clamp( uDofEqFar.x * sceneDepth + uDofEqFar.y, 0.0, 1.0 );
  coc = max( nearCoc, farCoc * uDofEqFar.z );
  // coc = nearCoc * step( 0.1, farCoc );

  sceneDepth = GetSmallBlurDepth( texCoordVP ) + sceneDepth*(1.0/17.0);
  if ( sceneDepth > .999999 )
  {
     coc = nearCoc; // We don't want to blur the sky.
  }


  // }
  // vec3 bak = c;
  InterpolateDof( c, small, med.rgb, large, coc );
  // c.rgb = c.rgb * 0.00000001 + coc;
  // c *= 0.000001;
  // c += large.rgb;

}

`,e};z.toString=z;var Be=z;z._hmrListeners=[];z.onHmr=function(n){this._hmrListeners.push(n)};z._triggerHmr=function(){for(const n of this._hmrListeners)n(this)};const V=new Float32Array(2),c=j(),p=j(),m=4;class ze extends oe{constructor(e){super(),this._flags=$.DEPTH|$.LINEAR,this.camera=e,this._available=!0,this.focus=1.3,this.focusRange=0,this.far=4,this.near=1,this.farBlur=.5,this.d0=.2,this.d1=.2,this.blurSamples=2,this.blurKernel=new Float32Array((this.blurSamples*2+1)*3),this.fboDS=null,this.fboBlurV=null,this.fboBlurH=null,this.fboCoc=null,this.fboMed=null,this.prgDS=null,this.prgBlur=null,this.prgCoc=null,this.prgMed=null,this.depthSampler=null,this._preCode=Fe(),this._code=Be()}genFbo(){const e=this.post.gl,t=new re(e);t.bind();const r=t.attachColor(e.RGBA).target;return r.bind(),r.setFilter(!0,!1,!1),r.clamp(),t}init(){const e=this.post.gl;if(this._available=this.post.hasDepthTexture,!!this._available){this.fboDS=this.genFbo(),this.fboCoc=this.genFbo(),this.fboMed=this.genFbo(),this.fboBlurH=this.genFbo(),this.fboBlurV=this.genFbo(),this.prgDS=new P(e),this.prgDS.compile(Ce(),xe()),this.prgCoc=new P(e),this.prgCoc.compile(Se(),we()),this.prgMed=new P(e),this.prgMed.compile(Ee(),Te());var t=`
`;t+=`precision highp float;
`,t+="#define BLUR_SAMPLES "+(this.blurSamples*2+1)+`
`,this.prgBlur=new P(e),this.prgBlur.compile(ie(),_e(),t),te(e)&&(this.depthSampler=new be(e),e.samplerParameteri(this.depthSampler.id,e.TEXTURE_COMPARE_MODE,e.NONE))}}resize(){if(!this._available)return;const e=this.post.bufferWidth/m,t=this.post.bufferHeight/m;e>1&&t>1&&(this.fboDS.resize(e,t),this.fboCoc.resize(e,t),this.fboMed.resize(e,t),this.fboBlurH.resize(e,t),this.fboBlurV.resize(e,t))}release(){this._available&&(this.fboDS.dispose(),this.prgDS.dispose(),this.prgMed.dispose(),this.fboDS.dispose(),this.fboCoc.dispose(),this.fboMed.dispose(),this.fboBlurH.dispose(),this.fboBlurV.dispose())}genCode(e,t){e.push(this._preCode),t.push(this._code)}getNearEq(){var e=this.camera.lens.getProjection();p[2]=-this.focus+this.focusRange/2,A(c,p,e);var t=c[2];p[2]=-this.near,A(c,p,e);var r=c[2];return V[0]=1/(r-t),V[1]=1-V[0]*r,V}getFarEq(){var e=this.camera.lens.getProjection();p[2]=-this.focus-this.focusRange/2,A(c,p,e);var t=c[2];p[2]=-this.far,A(c,p,e);var r=c[2];return c[0]=1/(r-t),c[1]=1-c[0]*r,c[2]=this.farBlur,c}preRender(){if(!this._available)return;var e,t;const r=this.post,o=r.gl;o.viewport(0,0,r.renderWidth/m,r.renderHeight/m),t=this.prgDS,e=this.fboDS,o.bindFramebuffer(o.FRAMEBUFFER,e.fbo),e.clear(),t.use(),r.mainColor.bind(0),t.tInput(0),r.mainFbo.getDepth().bind(1),t.tDepth(1),t.uDofEq(this.getNearEq()),t.uInvTargetSize(1/r.bufferWidth,1/r.bufferHeight),r.fillScreen(this.prgDS),t=this.prgBlur,t.use(),this.computeKernel(!0),e=this.fboBlurH,o.bindFramebuffer(o.FRAMEBUFFER,e.fbo),e.clear(),t.tInput(this.fboDS.getColor(0)),t.uKernel(this.blurKernel),r.fillScreen(t),this.computeKernel(!1),e=this.fboBlurV,o.bindFramebuffer(o.FRAMEBUFFER,e.fbo),e.clear(),t.tInput(this.fboBlurH.getColor(0)),t.uKernel(this.blurKernel),r.fillScreen(t),t=this.prgCoc,e=this.fboCoc,o.bindFramebuffer(o.FRAMEBUFFER,e.fbo),e.clear(),t.use(),t.tDownsample(this.fboDS.getColor(0)),t.tBlurred(this.fboBlurV.getColor(0)),r.fillScreen(t),t=this.prgMed,e=this.fboMed,o.bindFramebuffer(o.FRAMEBUFFER,e.fbo),e.clear(),t.use(),t.tCoc(this.fboCoc.getColor(0)),t.uInvTargetSize(m/r.bufferWidth,m/r.bufferHeight),r.fillScreen(t)}setupProgram(e){if(!this._available)return;e.tDofMedBlur(this.fboMed.getColor(0)),e.tDofBlur(this.fboBlurV.getColor(0)),e.uDofInvTargetSize(1/this.post.bufferWidth,1/this.post.bufferHeight);const t=this.d0,r=this.d1,o=1-(t+r);e.uDofLerpScale(-1/t,-1/r,-1/o,1/o),e.uDofLerpBias(1,(1-o)/r,1/o,(o-1)/o),e.uDofEqFar(this.getFarEq())}computeKernel(e){const t=this.post.bufferWidth/m,r=this.post.bufferHeight/m,o=this.blurSamples*2+1,I=e?t:r,q=e?r:t,R=.5/I,h=this.blurKernel,U=e?0:1,L=e?1:0;for(var s=0,l=0;l<o;++l){var v=l*3,y=2*l/(o-1)-1,d=3*y;d=Math.exp(-d*d/2),s+=d,h[v+U]=R+2*this.blurSamples*y/I,h[v+L]=(s%2===0?.5:-.5)/q,h[v+2]=d}for(l=0;l<o;++l)h[3*l+2]/=s}}const We=n=>{let e=!0;const t=n||document.getElementById("canvas"),r=t.getContext("webgl",{antialias:!0}),o={width:1,height:1},I=window.devicePixelRatio,q=([a])=>{const f=a.contentRect.width,x=a.contentRect.height;t.width=Math.round(f*I),t.height=Math.round(x*I),o.width=r.drawingBufferWidth,o.height=r.drawingBufferHeight},R=new ResizeObserver(q);R.observe(t);const h=ue.get(r),U=new fe().enableDepthTest().enableCullface().cullFace(r.BACK);h.push(U);const L=j(),s=new ce(new le);s.lens.setAutoFov(35*(Math.PI/180)),s.lens.near=.01,s.lens.far=50,s.position.set([0,4,15]),s.lookAt(L);const l=new ne(r,new Float32Array(me)),v=new de(r,r.UNSIGNED_SHORT,new Uint16Array(ve));l.attrib("aPosition",3,r.FLOAT),l.attrib("aTexCoord",2,r.FLOAT);const y=[],d=4,W=3,M=3,X=(d-1)*M*.5,Z=(W-1)*M*.5;for(let a=0;a<d;a++)for(let f=0;f<W;f++){const x=new he;x.position.set([a*M-X,0,f*M-Z]),x.invalidate(),x.updateWorldMatrix(),y.push(x)}const J=`
    attribute vec3 aPosition;
    attribute vec2 aTexCoord;

    uniform mat4 uMVP;

    varying vec2 vTexCoord;

    void main(void){
      vec4 pos = vec4(aPosition, 1.0);
      gl_Position = uMVP * pos;
      vTexCoord = aTexCoord;
    }
  `,Q=`
    precision highp float;

    varying vec2 vTexCoord;

    void main(void){
      vec3 color = vec3(vec2(0.5) + vTexCoord * vec2(0.5), 0.75);
      gl_FragColor = vec4(color, 1.0);
    }
  `,H=new P(r,J,Q),i={near:10,far:40,focus:25,focusRange:3,d0:.2,d1:.2},g=new se(r,!1);g.enabled=!0;const k=new ae;g.add(k);const u=new ze(s);u.near=i.near,u.far=i.far,u.focus=i.focus,u.focusRange=i.focusRange,u.d0=i.d0,u.d1=i.d1,g.add(u);const Y=a=>{s.x=Math.sin(a*5e-4)*15,s.z=Math.cos(a*5e-4)*15,s.lookAt(L),s.invalidate()};let O=null;const G=ge(),ee=a=>{s.modelViewProjectionMatrix(G,a._wmatrix),H.use(),H.uMVP(G),l.attribPointer(H),v.bind(),v.drawTriangles()},K=(a=0)=>{e&&(r.clearColor(.28,.28,.28,1),h.apply(),g.preRender(o.width,o.height),g.bindColor(),Y(a),s.updateWorldMatrix(),s.updateViewProjectionMatrix(o.width,o.height),y.forEach(f=>{ee(f)}),g.render(),O=window.requestAnimationFrame(K))};setTimeout(K,0);const D=new pe({container:document.getElementById("debug")}),b=(a,f)=>{u[a]=f};return D.addBinding(i,"near",{min:0,max:50,step:1}).on("change",()=>b("near",i.near)),D.addBinding(i,"far",{min:10,max:80,step:1}).on("change",()=>b("far",i.far)),D.addBinding(i,"focus",{min:0,max:80,step:1}).on("change",()=>b("focus",i.focus)),D.addBinding(i,"focusRange",{min:1,max:40,step:.5}).on("change",()=>b("focusRange",i.focusRange)),D.addBinding(i,"d0",{min:0,max:.4,step:.01}).on("change",()=>b("d0",i.d0)),D.addBinding(i,"d1",{min:0,max:.8,step:.05}).on("change",()=>b("d1",i.d1)),()=>{e=!1,window.cancelAnimationFrame(O),R.disconnect(),D.dispose(),H.dispose(),v.dispose(),k.release(),u.release(),g.dispose(),h.pop(),h.apply()}};export{We as preview};
