import{C as B,P as z}from"./index-099e42fb.js";import{G as T,a as S}from"./indexbuffer-5b89fc58.js";import{_ as G}from"./web-4702fa01.js";import{L as _,I as D}from"./Ibl-f425c70a.js";import{iblSh as O,iblPath as y}from"./iblData-2ac082dd.js";import{T as Y}from"./texture-2d-53b1df66.js";import{c as w,s as k,a as H,b as W}from"./vec3-33249e24.js";import{A as L}from"./common-a066d304.js";import"./arraybuffer-7f1df196.js";import"./ShaderVersion-8538814c.js";import"./Bounds-f9785a14.js";function I(){var o=new L(2);return L!=Float32Array&&(o[0]=0,o[1]=0),o}function U(o,s){var e=new L(2);return e[0]=o,e[1]=s,e}function V(o,s,e){return o[0]=s[0]-e[0],o[1]=s[1]-e[1],o}(function(){var o=I();return function(s,e,t,r,d,v){var i,c;for(e||(e=2),t||(t=0),r?c=Math.min(r*e+t,s.length):c=s.length,i=t;i<c;i+=e)o[0]=s[i],o[1]=s[i+1],d(o,o,v),s[i]=o[0],s[i+1]=o[1];return s}})();const ne=o=>{let s=!1;const e=o||document.getElementById("canvas"),t=e.getContext("webgl"),r={width:1,height:1},d=window.devicePixelRatio,v=([n])=>{const l=n.contentRect.width,m=n.contentRect.height;e.width=Math.round(l*d),e.height=Math.round(m*d),r.width=t.drawingBufferWidth,r.height=t.drawingBufferHeight},i=new ResizeObserver(v);i.observe(e);const c=T.get(t),E=new S().enableDepthTest().enableCullface().cullFace(t.BACK);c.push(E);const f=w(),a=new B(new z);a.lens.setAutoFov(35*(Math.PI/180)),a.lens.near=.01,a.lens.far=50,a.position.set([0,4,10]),a.lookAt(f);let b=!1,u=!1;const R=I(),F=n=>{if(b)console.log("Rotate",n);else if(u){const l=U(n.offsetX/100,n.offsetY/100),m=V(I(),l,R);R.set(l),a.position[0]-=m[0],a.position[1]+=m[1],f[0]-=m[0],f[1]+=m[1],a.invalidate()}};e.addEventListener("mousemove",F),e.addEventListener("contextmenu",n=>{n.preventDefault()}),e.addEventListener("mousedown",n=>{u=n.which===3,b=!u,R.set([n.offsetX/100,n.offsetY/100])}),e.addEventListener("mouseup",()=>{b=!1,u=!1}),e.addEventListener("wheel",n=>{n.preventDefault();const m=1+Math.min(Math.max(n.deltaY/100,-1),1)*.01,A=k(w(),H(w(),f,W(w(),a.position)),m);a.position.set(A),a.invalidate(),console.log(A[1])});const h=new _;h.bounds.fromMinMax([-1,-1,-1],[1,1,1]);const M=new Y(t,t.RGBA);M.clamp();const p=new D(M,O);p.iblFormat="OCTA",p.shFormat="SH9",p.hdrEncoding="RGBM";const C=new Image;C.src=y,C.onload=()=>{M.fromImage(C)},h.add(p);let g=null;G.loadGltf("/src/assets/webgl/models/suzanne/Suzanne.gltf").then(async n=>{g=n,await g.allocate(t);for(const l of g.materials)l.materialPass.setLightSetup(h);s=!0,x()});let P=null;const x=(n=0)=>{if(s){t.viewport(0,0,r.width,r.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT),c.apply(),a.updateWorldMatrix(),a.updateViewProjectionMatrix(r.width,r.height),h.prepare(t);for(const l of g.renderables)l.render(t,a,1,"color");P=window.requestAnimationFrame(x)}};return()=>{s=!1,window.cancelAnimationFrame(P),i.disconnect(),c.pop(),c.apply()}};export{ne as preview};
