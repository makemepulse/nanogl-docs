import{C as R,P as M}from"./index-099e42fb.js";import{A as y,P as O}from"./arraybuffer-7f1df196.js";import{G as S,a as U,I as V}from"./indexbuffer-5b89fc58.js";import{T as _}from"./texture-2d-53b1df66.js";import{P as D}from"./tweakpane-24b35bd6.js";import{t as E}from"./square-texture-5de1b8a4.js";import{cubePosUvs as L,cubeIndices as z}from"./cubeGeometry-a8671df7.js";import{c as G}from"./vec3-33249e24.js";import"./common-a066d304.js";const Q=x=>{let l=!0;const s=x||document.getElementById("canvas"),e=s.getContext("webgl"),n={width:1,height:1},v=window.devicePixelRatio,T=([a])=>{const I=a.contentRect.width,A=a.contentRect.height;s.width=Math.round(I*v),s.height=Math.round(A*v),n.width=e.drawingBufferWidth,n.height=e.drawingBufferHeight},g=new ResizeObserver(T);g.observe(s);const c=S.get(e),F=new U().enableDepthTest().enableCullface().cullFace(e.BACK);c.push(F);const w=G(),t=new R(new M);t.lens.setAutoFov(35*(Math.PI/180)),t.lens.near=.01,t.lens.far=50,t.position.set([0,4,10]),t.lookAt(w);const p=new y(e,new Float32Array(L)),m=new V(e,e.UNSIGNED_SHORT,new Uint16Array(z));p.attrib("aPosition",3,e.FLOAT),p.attrib("aTexCoord",2,e.FLOAT);const o={wrap:"repeat",uvFactorX:1,uvFactorY:1},r=new _(e);r.repeat();const u=new Image;u.src=E,u.onload=()=>{r.fromImage(u)};const P=`
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
  `,i=new O(e,P,b),C=a=>{t.x=Math.sin(a*5e-4)*10,t.z=Math.cos(a*5e-4)*10,t.lookAt(w),t.invalidate()};let f=null;const h=(a=0)=>{l&&(e.viewport(0,0,n.width,n.height),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),c.apply(),C(a),t.updateWorldMatrix(),t.updateViewProjectionMatrix(n.width,n.height),i.use(),i.uMVP(t._viewProj),i.tTex(r),i.uUVFactor([o.uvFactorX,o.uvFactorY]),p.attribPointer(i),m.bind(),m.drawTriangles(),f=window.requestAnimationFrame(h))};setTimeout(h,0);const d=new D({container:document.getElementById("debug")}),B=()=>{r.bind(),o.wrap==="repeat"?r.repeat():o.wrap==="clamp"?r.clamp():o.wrap==="mirror"&&r.mirror()};return d.addBinding(o,"wrap",{options:{repeat:"repeat",clamp:"clamp",mirror:"mirror"}}).on("change",B),d.addBinding(o,"uvFactorX",{min:1,max:3}),d.addBinding(o,"uvFactorY",{min:1,max:3}),()=>{l=!1,window.cancelAnimationFrame(f),g.disconnect(),d.dispose(),i.dispose(),r.dispose(),m.dispose(),c.pop(),c.apply()}};export{Q as preview};
