import{B as R,a as y,F}from"./fetch-17b3f59c.js";import{C as I,P as L}from"./index-5809b7fb.js";import{A as z,P as H}from"./arraybuffer-1b6e50fc.js";import{G as O,a as G,I as j}from"./indexbuffer-13597e9e.js";import{P as E}from"./tweakpane-24b35bd6.js";import{cubePosUvs as W,cubeIndices as D}from"./cubeGeometry-a8671df7.js";import{c as N}from"./vec3-a79e08f1.js";import"./fbo-469d6df9.js";import"./texture-2d-18ce519d.js";import"./common-a066d304.js";var v=function(r){var t="";return t+=`uniform vec4 uVignette;
uniform vec4 uVignetteAspect;`,t};v.toString=v;var U=v;v._hmrListeners=[];v.onHmr=function(r){this._hmrListeners.push(r)};v._triggerHmr=function(){for(const r of this._hmrListeners)r(this)};var u=function(r){var t="";return t+=`
{
  vec2 pPos=texCoordFull*uVignetteAspect.xy-uVignetteAspect.zw;

  vec3 ramp=clamp(vec3(1.0,1.0,1.0)-uVignette.xyz*dot(pPos,pPos),0.0,1.0);
  vec3 ramp5=ramp*ramp;

  ramp5*=ramp;

  c*=mix(ramp,ramp5,uVignette.w);
}`,t};u.toString=u;var k=u;u._hmrListeners=[];u.onHmr=function(r){this._hmrListeners.push(r)};u._triggerHmr=function(){for(const r of this._hmrListeners)r(this)};class q extends R{constructor(t,n,e){super(),this.color=t,this.curve=e,this.strength=n,this._preCode=U(),this._code=k()}genCode(t,n){t.push(this._preCode),n.push(this._code)}setupProgram(t){const n=this.color,e=this.strength,s=this.post.renderWidth,g=this.post.renderHeight,h=Math.max(s,g);t.uVignetteAspect(s/h,g/h,.5*s/h,.5*g/h),t.uVignette(2*(1-n[0])*e,2*(1-n[1])*e,2*(1-n[2])*e,this.curve)}init(){}release(){}preRender(){}resize(t,n){}}const re=r=>{let t=!0;const n=r||document.getElementById("canvas"),e=n.getContext("webgl"),s={width:1,height:1},g=window.devicePixelRatio,h=([d])=>{const T=d.contentRect.width,M=d.contentRect.height;n.width=Math.round(T*g),n.height=Math.round(M*g),s.width=e.drawingBufferWidth,s.height=e.drawingBufferHeight},C=new ResizeObserver(h);C.observe(n);const p=O.get(e),A=new G().enableDepthTest().enableCullface().cullFace(e.BACK);p.push(A);const b=N(),i=new I(new L);i.lens.setAutoFov(35*(Math.PI/180)),i.lens.near=.01,i.lens.far=50,i.position.set([0,4,10]),i.lookAt(b);const f=new z(e,new Float32Array(W)),w=new j(e,e.UNSIGNED_SHORT,new Uint16Array(D));f.attrib("aPosition",3,e.FLOAT),f.attrib("aTexCoord",2,e.FLOAT);const B=`
    attribute vec3 aPosition;
    attribute vec2 aTexCoord;

    uniform mat4 uMVP;

    varying vec2 vTexCoord;

    void main(void){
      vec4 pos = vec4(aPosition, 1.0);
      gl_Position = uMVP * pos;
      vTexCoord = aTexCoord;
    }
  `,V=`
    precision highp float;

    varying vec2 vTexCoord;

    void main(void){
      vec3 color = vec3(vec2(0.5) + vTexCoord * vec2(0.5), 0.75);
      gl_FragColor = vec4(color, 1.0);
    }
  `,l=new H(e,B,V),o={vignetteColor:{r:0,g:0,b:0},vignetteStrength:1,vignetteCurve:.8},a=new y(e,!1);a.enabled=!0;const x=new F;a.add(x);const c=new q([o.vignetteColor.r,o.vignetteColor.g,o.vignetteColor.b],o.vignetteStrength,o.vignetteCurve);a.add(c);const S=d=>{i.x=Math.sin(d*5e-4)*10,i.z=Math.cos(d*5e-4)*10,i.lookAt(b),i.invalidate()};let P=null;const _=(d=0)=>{t&&(e.clearColor(.28,.28,.28,1),p.apply(),a.preRender(s.width,s.height),a.bindColor(),S(d),i.updateWorldMatrix(),i.updateViewProjectionMatrix(s.width,s.height),l.use(),l.uMVP(i._viewProj),f.attribPointer(l),w.bind(),w.drawTriangles(),a.render(),P=window.requestAnimationFrame(_))};setTimeout(_,0);const m=new E({container:document.getElementById("debug")});return m.addBinding(o,"vignetteColor",{color:{type:"float"}}).on("change",()=>{c.color[0]=o.vignetteColor.r,c.color[1]=o.vignetteColor.g,c.color[2]=o.vignetteColor.b}),m.addBinding(o,"vignetteStrength",{min:0,max:1}).on("change",()=>{c.strength=o.vignetteStrength}),m.addBinding(o,"vignetteCurve",{min:0,max:1}).on("change",()=>{c.curve=o.vignetteCurve}),()=>{t=!1,window.cancelAnimationFrame(P),C.disconnect(),m.dispose(),l.dispose(),w.dispose(),x.release(),c.release(),a.dispose(),p.pop(),p.apply()}};export{re as preview};
