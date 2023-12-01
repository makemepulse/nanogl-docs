import{C as L,P as V,N as F}from"./index-5809b7fb.js";import{A as G,P as N}from"./arraybuffer-1b6e50fc.js";import{G as U,a as z,I as D}from"./indexbuffer-13597e9e.js";import{cubePosUvs as H,cubeIndices as W}from"./cubeGeometry-a8671df7.js";import{c as j}from"./vec3-a79e08f1.js";import{c as k}from"./mat4-2d297a36.js";import"./common-a066d304.js";const ee=R=>{let m=!0;const c=R||document.getElementById("canvas"),e=c.getContext("webgl"),n={width:1,height:1},w=window.devicePixelRatio,_=([t])=>{const a=t.contentRect.width,r=t.contentRect.height;c.width=Math.round(a*w),c.height=Math.round(r*w),n.width=e.drawingBufferWidth,n.height=e.drawingBufferHeight},u=new ResizeObserver(_);u.observe(c);const d=U.get(e),y=new z().enableDepthTest().enableCullface().cullFace(e.BACK);d.push(y);const h=j(),o=new L(new V);o.lens.setAutoFov(35*(Math.PI/180)),o.lens.near=.01,o.lens.far=50,o.position.set([0,4,10]),o.lookAt(h);const f=new G(e,new Float32Array(H)),p=new D(e,e.UNSIGNED_SHORT,new Uint16Array(W));f.attrib("aPosition",3,e.FLOAT),f.attrib("aTexCoord",2,e.FLOAT);const E=`
    attribute vec3 aPosition;
    attribute vec2 aTexCoord;

    uniform mat4 uMVP;

    varying vec2 vTexCoord;

    void main(void){
      vec4 pos = vec4(aPosition, 1.0);
      gl_Position = uMVP * pos;
      vTexCoord = aTexCoord;
    }
  `,O=`
    precision highp float;

    varying vec2 vTexCoord;

    void main(void){
      vec3 color = vec3(vec2(0.5) + vTexCoord * vec2(0.5), 0.75);
      gl_FragColor = vec4(color, 1.0);
    }
  `,l=new N(e,E,O),g=(t,a,r,M=!1)=>{for(let v=0;v<a;v++){const s=new F,I=v/a*Math.PI*2,A=Math.cos(I)*r,B=Math.sin(I)*r;M?s.position.set([A,B,0]):s.position.set([A,0,B]),s.setScale(.5),s.lookAt(h),t.add(s)}},i=new F;i.position.set(h),i.setScale(.5),g(i,5,5),i._children.forEach(t=>{g(t,3,4,!0)});const x=(t,a=!1)=>{a?t.rotateZ(.008):t.rotateY(-.008),t._children.forEach((r,M)=>{x(r,!0)})},S=()=>{x(i),i.invalidate(),i.updateWorldMatrix()};let P=null;const b=k(),C=t=>{o.modelViewProjectionMatrix(b,t._wmatrix),l.use(),l.uMVP(b),f.attribPointer(l),p.bind(),p.drawTriangles(),t._children.forEach(a=>{C(a)})},T=(t=0)=>{m&&(e.viewport(0,0,n.width,n.height),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),d.apply(),S(),o.updateWorldMatrix(),o.updateViewProjectionMatrix(n.width,n.height),C(i),P=window.requestAnimationFrame(T))};return setTimeout(T,0),()=>{m=!1,window.cancelAnimationFrame(P),u.disconnect(),l.dispose(),p.dispose(),d.pop(),d.apply()}};export{ee as preview};
