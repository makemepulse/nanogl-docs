import{C as z,P as G,N as M}from"./index-5809b7fb.js";import{A as U,P as H}from"./arraybuffer-1b6e50fc.js";import{G as j,a as d,I as q}from"./indexbuffer-13597e9e.js";import{P as K}from"./tweakpane-24b35bd6.js";import{cubePosUvs as $,cubeIndices as J}from"./cubeGeometry-a8671df7.js";import{c as Q}from"./vec3-a79e08f1.js";import{c as X}from"./mat4-2d297a36.js";import"./common-a066d304.js";const re=R=>{let b=!0;const l=R||document.getElementById("canvas"),e=l.getContext("webgl"),i={width:1,height:1},w=window.devicePixelRatio,I=([t])=>{const a=t.contentRect.width,c=t.contentRect.height;l.width=Math.round(a*w),l.height=Math.round(c*w),i.width=e.drawingBufferWidth,i.height=e.drawingBufferHeight},m=new ResizeObserver(I);m.observe(l);const o=j.get(e),O=new d,S=new d().enableDepthTest(),E=new d().enableCullface().cullFace(e.FRONT),D=new d().enableCullface().cullFace(e.BACK),_=new d().enableBlend().blendFunc(e.ONE,e.ONE),F=Q(),n=new z(new G);n.lens.setAutoFov(35*(Math.PI/180)),n.lens.near=.01,n.lens.far=50,n.position.set([0,4,10]),n.lookAt(F);const h=new U(e,new Float32Array($)),v=new q(e,e.UNSIGNED_SHORT,new Uint16Array(J));h.attrib("aPosition",3,e.FLOAT),h.attrib("aTexCoord",2,e.FLOAT);const u=new M;u.position.set([-1.5,0,0]),u.invalidate(),u.updateWorldMatrix();const p=new M;p.position.set([1.5,0,0]),p.invalidate(),p.updateWorldMatrix();const y=`
    attribute vec3 aPosition;
    attribute vec2 aTexCoord;

    uniform mat4 uMVP;

    varying vec2 vTexCoord;

    void main(void){
      vec4 pos = vec4(aPosition, 1.0);
      gl_Position = uMVP * pos;
      vTexCoord = aTexCoord;
    }
  `,N=`
    precision highp float;

    varying vec2 vTexCoord;

    void main(void){
      vec3 color = vec3(vec2(0.5) + vTexCoord * vec2(0.5), 0.75);
      gl_FragColor = vec4(color, 1.0);
    }
  `,f=new H(e,y,N),k=t=>{n.x=Math.sin(t*5e-4)*10,n.z=Math.cos(t*5e-4)*10,n.lookAt(F),n.invalidate()};let B=null;const C=X(),L=t=>{n.modelViewProjectionMatrix(C,t._wmatrix),f.use(),f.uMVP(C),h.attribPointer(f),v.bind(),v.drawTriangles()},P=(t,a)=>{const c=s[t];let r=0;c.enableDepth&&(o.push(S),r++),c.enableCullface&&(c.cullFace==="back"?o.push(D):o.push(E),r++),c.enableAdditiveBlend&&(o.push(_),r++),r===0&&(o.push(O),r++),o.apply(),L(a);for(let T=0;T<r;T++)o.pop()},A=(t=0)=>{b&&(e.viewport(0,0,i.width,i.height),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),k(t),n.updateWorldMatrix(),n.updateViewProjectionMatrix(i.width,i.height),P(0,u),P(1,p),B=window.requestAnimationFrame(A))};setTimeout(A,0);const x={enableDepth:!0,enableCullface:!0,cullFace:"back",enableAdditiveBlend:!1},s=[{...x},{...x}],g=new K({container:document.getElementById("debug")}),V=g.addFolder({title:"First cube"}),W=g.addFolder({title:"Second cube"});return[V,W].forEach((t,a)=>{t.addBinding(s[a],"enableDepth"),t.addBinding(s[a],"enableCullface"),t.addBinding(s[a],"cullFace",{options:{back:"back",front:"front"}}),t.addBinding(s[a],"enableAdditiveBlend")}),()=>{b=!1,window.cancelAnimationFrame(B),m.disconnect(),g.dispose(),f.dispose(),v.dispose(),o.pop(),o.apply()}};export{re as preview};
