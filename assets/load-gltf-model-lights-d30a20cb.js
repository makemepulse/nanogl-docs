import{C as u,P as h}from"./index-099e42fb.js";import{_ as g}from"./web-4702fa01.js";import{useWebGL as w}from"./useWebGL-cc0b7991.js";import{L as b,I as x}from"./Ibl-f425c70a.js";import{T as I}from"./texture-2d-53b1df66.js";import{iblSh as M,iblPath as L}from"./iblData-c6519b13.js";import"./ShaderVersion-8538814c.js";import"./indexbuffer-5b89fc58.js";import"./arraybuffer-7f1df196.js";import"./Bounds-f9785a14.js";const z=c=>{const{gl:e,size:a,start:p}=w(c);let m=!1;const t=new u(new h);t.lens.setAutoFov(35*(Math.PI/180)),t.lens.near=.01,t.lens.far=50,t.position.set([0,0,5]),t.lookAt([0,0,0]);const n=new b;n.bounds.fromMinMax([-1,-1,-1],[1,1,1]);const s=new I(e,e.RGBA);s.clamp();const i=new x(s,M);i.iblFormat="OCTA",i.shFormat="SH9",i.hdrEncoding="RGBM";const l=new Image;l.src=L,l.onload=()=>{s.fromImage(l)},n.add(i);let o=null;g.loadGltf("../../..//models/suzanne/Suzanne.gltf").then(async r=>{o=r,await o.allocate(e);for(const f of o.materials)f.materialPass.setLightSetup(n);m=!0});const d=()=>{const r=o.root;r.rotateY(.01),r.updateWorldMatrix()};return p(()=>{if(m){d(),e.viewport(0,0,a.width,a.height),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),t.updateWorldMatrix(),t.updateViewProjectionMatrix(a.width,a.height),n.prepare(e);for(const r of o.renderables)r.render(e,t,1,"color")}},!1)};export{z as preview};
