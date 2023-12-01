import{C as R,P as M,N as y}from"./index-5809b7fb.js";import{A as _,P as D}from"./arraybuffer-1b6e50fc.js";import{G as L,a as O,I as E}from"./indexbuffer-13597e9e.js";import{T as N}from"./texture-2d-18ce519d.js";import{cubePosUvs as S,cubeIndices as W}from"./cubeGeometry-a8671df7.js";import{c as G}from"./vec3-a79e08f1.js";import{c as U}from"./mat4-2d297a36.js";import"./common-a066d304.js";const J=T=>{let p=!0;const c=T||document.getElementById("canvas"),e=c.getContext("webgl"),r={width:1,height:1},m=window.devicePixelRatio,P=([a])=>{const B=a.contentRect.width,F=a.contentRect.height;c.width=Math.round(B*m),c.height=Math.round(F*m),r.width=e.drawingBufferWidth,r.height=e.drawingBufferHeight},v=new ResizeObserver(P);v.observe(c);const d=L.get(e),b=new O().enableDepthTest().enableCullface().cullFace(e.BACK);d.push(b);const f=G(),o=new R(new M);o.lens.setAutoFov(35*(Math.PI/180)),o.lens.near=.01,o.lens.far=50,o.position.set([0,4,10]),o.lookAt(f);const l=new _(e,new Float32Array(S)),u=new E(e,e.UNSIGNED_SHORT,new Uint16Array(W));l.attrib("aPosition",3,e.FLOAT),l.attrib("aTexCoord",2,e.FLOAT);const i=new y;i.position.set(f);const n=new N(e);n.clamp(),n.fromData(16,16,null),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0);const t=document.createElement("video");t.src="/videos/video-sample.mp4",t.loop=!0,t.muted=!0,t.setAttribute("playsinline","true"),t.play();let h=!1;t.oncanplay=()=>{const a=t.videoWidth/t.videoHeight;i.scale.set([a,1,a]),i.invalidate(),i.updateWorldMatrix(),h=!0};const C=`
    attribute vec3 aPosition;
    attribute vec2 aTexCoord;

    uniform mat4 uMVP;

    varying vec2 vTexCoord;

    void main(void){
      vec4 pos = vec4(aPosition, 1.0);
      gl_Position = uMVP * pos;
      vTexCoord = aTexCoord;
    }
  `,I=`
    precision highp float;

    uniform sampler2D tTex;

    varying vec2 vTexCoord;

    void main(void){
      gl_FragColor = texture2D(tTex, vTexCoord);
    }
  `,s=new D(e,C,I),A=()=>{i.rotateY(-.008),i.invalidate(),i.updateWorldMatrix()};let w=null;const g=U(),x=(a=0)=>{p&&(e.viewport(0,0,r.width,r.height),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),d.apply(),A(),o.updateWorldMatrix(),o.updateViewProjectionMatrix(r.width,r.height),o.modelViewProjectionMatrix(g,i._wmatrix),h&&n.fromImage(t),s.use(),s.uMVP(g),s.tTex(n),l.attribPointer(s),u.bind(),u.drawTriangles(),w=window.requestAnimationFrame(x))};return setTimeout(x,0),()=>{p=!1,window.cancelAnimationFrame(w),v.disconnect(),s.dispose(),n.dispose(),u.dispose(),d.pop(),d.apply()}};export{J as preview};
