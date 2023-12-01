import{C as S,P as U,O as D,N as j}from"./index-5809b7fb.js";import{A as k,P as q}from"./arraybuffer-1b6e50fc.js";import{G as K,a as $,I as J}from"./indexbuffer-13597e9e.js";import{P as Q}from"./tweakpane-24b35bd6.js";import{cubePosUvs as X,cubeIndices as Y}from"./cubeGeometry-a8671df7.js";import{c as Z}from"./vec3-a79e08f1.js";import{c as ee}from"./mat4-2d297a36.js";import"./common-a066d304.js";const le=O=>{let b=!0;const p=O||document.getElementById("canvas"),t=p.getContext("webgl"),o={width:1,height:1,canvasWidth:1,canvasHeight:1},C=window.devicePixelRatio,y=([e])=>{const n=e.contentRect.width,a=e.contentRect.height;p.width=Math.round(n*C),p.height=Math.round(a*C),o.width=t.drawingBufferWidth,o.height=t.drawingBufferHeight,o.canvasWidth=n,o.canvasHeight=a,f()},P=new ResizeObserver(y);P.observe(p);const h=K.get(t),H=new $().enableDepthTest().enableCullface().cullFace(t.BACK);h.push(H);const s={camera:"perspective",distance:20,perspective:{fov:35},ortho:{boundsScale:5}},g=Z(),i=new S(new U);i.lens.near=.01,i.lens.far=50,i.lookAt(g);const c=new S(new D);c.lens.near=.01,c.lens.far=50,c.lookAt(g);const z=()=>{i.lens.setAutoFov(s.perspective.fov*(Math.PI/180))},f=()=>{const e=Math.max(o.canvasHeight/o.canvasWidth,1),n=Math.max(o.canvasWidth/o.canvasHeight,1),a=s.ortho.boundsScale;c.lens.setBound(-a*n,a*n,-a*e,a*e)};f();let r=i;const w=new k(t,new Float32Array(X)),x=new J(t,t.UNSIGNED_SHORT,new Uint16Array(Y));w.attrib("aPosition",3,t.FLOAT),w.attrib("aTexCoord",2,t.FLOAT);const B=[],F=4,M=3,v=3,W=(F-1)*v*.5,_=(M-1)*v*.5;for(let e=0;e<F;e++)for(let n=0;n<M;n++){const a=new j;a.position.set([e*v-W,0,n*v-_]),a.invalidate(),a.updateWorldMatrix(),B.push(a)}const E=`
    attribute vec3 aPosition;
    attribute vec2 aTexCoord;

    uniform mat4 uMVP;

    varying vec2 vTexCoord;

    void main(void){
      vec4 pos = vec4(aPosition, 1.0);
      gl_Position = uMVP * pos;
      vTexCoord = aTexCoord;
    }
  `,L=`
    precision highp float;

    varying vec2 vTexCoord;

    void main(void){
      vec3 color = vec3(vec2(0.5) + vTexCoord * vec2(0.5), 0.75);
      gl_FragColor = vec4(color, 1.0);
    }
  `,m=new q(t,E,L),G=e=>{r.x=Math.sin(e*5e-4)*s.distance,r.z=Math.cos(e*5e-4)*s.distance,r.y=s.distance*.4,r.lookAt(g),r.invalidate()};let T=null;const A=ee(),V=e=>{r.modelViewProjectionMatrix(A,e._wmatrix),m.use(),m.uMVP(A),w.attribPointer(m),x.bind(),x.drawTriangles()},R=(e=0)=>{b&&(t.viewport(0,0,o.width,o.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT),h.apply(),G(e),r.updateWorldMatrix(),r.updateViewProjectionMatrix(o.width,o.height),B.forEach(n=>{V(n)}),T=window.requestAnimationFrame(R))};setTimeout(R,0);const u=new Q({container:document.getElementById("debug")}),I=u.addFolder({title:"Global"}),d=u.addFolder({title:"Perspective camera",disabled:!1,expanded:!0}),l=u.addFolder({title:"Orthographic camera",disabled:!0,expanded:!1}),N=()=>{s.camera==="orthographic"?(r=c,l.disabled=!1,l.expanded=!0,d.disabled=!0,d.expanded=!1):(r=i,l.disabled=!0,l.expanded=!1,d.disabled=!1,d.expanded=!0)};return I.addBinding(s,"camera",{options:{perspective:"perspective",orthographic:"orthographic"}}).on("change",N),I.addBinding(s,"distance",{min:5,max:40,step:1}),l.addBinding(s.ortho,"boundsScale",{min:3,max:10,step:.5}).on("change",f),d.addBinding(s.perspective,"fov",{min:15,max:90,step:5}).on("change",z),()=>{b=!1,window.cancelAnimationFrame(T),P.disconnect(),u.dispose(),m.dispose(),x.dispose(),h.pop(),h.apply()}};export{le as preview};
