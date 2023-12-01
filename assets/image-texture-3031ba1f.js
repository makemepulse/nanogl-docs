import{C as R,P as M}from"./index-5809b7fb.js";import{A as y,P as O}from"./arraybuffer-1b6e50fc.js";import{G as U,a as V,I as _}from"./indexbuffer-13597e9e.js";import{T as D}from"./texture-2d-18ce519d.js";import{P as S}from"./tweakpane-24b35bd6.js";import{cubePosUvs as E,cubeIndices as L}from"./cubeGeometry-a8671df7.js";import{c as z}from"./vec3-a79e08f1.js";import"./common-a066d304.js";const K=x=>{let l=!0;const s=x||document.getElementById("canvas"),e=s.getContext("webgl"),n={width:1,height:1},g=window.devicePixelRatio,T=([a])=>{const I=a.contentRect.width,A=a.contentRect.height;s.width=Math.round(I*g),s.height=Math.round(A*g),n.width=e.drawingBufferWidth,n.height=e.drawingBufferHeight},v=new ResizeObserver(T);v.observe(s);const c=U.get(e),F=new V().enableDepthTest().enableCullface().cullFace(e.BACK);c.push(F);const w=z(),t=new R(new M);t.lens.setAutoFov(35*(Math.PI/180)),t.lens.near=.01,t.lens.far=50,t.position.set([0,4,10]),t.lookAt(w);const p=new y(e,new Float32Array(E)),m=new _(e,e.UNSIGNED_SHORT,new Uint16Array(L));p.attrib("aPosition",3,e.FLOAT),p.attrib("aTexCoord",2,e.FLOAT);const o={wrap:"repeat",uvFactorX:1,uvFactorY:1},r=new D(e);r.repeat();const u=new Image;u.src="/images/square-texture.jpg",u.onload=()=>{r.fromImage(u)};const P=`
    attribute vec3 aPosition;
    attribute vec2 aTexCoord;

    uniform mat4 uMVP;

    varying vec2 vTexCoord;

    void main(void){
      vec4 pos = vec4(aPosition, 1.0);
      gl_Position = uMVP * pos;
      vTexCoord = aTexCoord;
    }
  `,b=`
    precision highp float;

    uniform sampler2D tTex;
    uniform vec2 uUVFactor;

    varying vec2 vTexCoord;

    void main(void){
      gl_FragColor = texture2D(tTex, vTexCoord * uUVFactor);
    }
  `,i=new O(e,P,b),C=a=>{t.x=Math.sin(a*5e-4)*10,t.z=Math.cos(a*5e-4)*10,t.lookAt(w),t.invalidate()};let f=null;const h=(a=0)=>{l&&(e.viewport(0,0,n.width,n.height),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),c.apply(),C(a),t.updateWorldMatrix(),t.updateViewProjectionMatrix(n.width,n.height),i.use(),i.uMVP(t._viewProj),i.tTex(r),i.uUVFactor([o.uvFactorX,o.uvFactorY]),p.attribPointer(i),m.bind(),m.drawTriangles(),f=window.requestAnimationFrame(h))};setTimeout(h,0);const d=new S({container:document.getElementById("debug")}),B=()=>{r.bind(),o.wrap==="repeat"?r.repeat():o.wrap==="clamp"?r.clamp():o.wrap==="mirror"&&r.mirror()};return d.addBinding(o,"wrap",{options:{repeat:"repeat",clamp:"clamp",mirror:"mirror"}}).on("change",B),d.addBinding(o,"uvFactorX",{min:1,max:3}),d.addBinding(o,"uvFactorY",{min:1,max:3}),()=>{l=!1,window.cancelAnimationFrame(f),v.disconnect(),d.dispose(),i.dispose(),r.dispose(),m.dispose(),c.pop(),c.apply()}};export{K as preview};
