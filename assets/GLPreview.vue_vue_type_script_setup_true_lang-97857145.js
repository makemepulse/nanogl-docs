import{u as d,_ as g,a as e}from"./index-43af9a97.js";import{p as E,x as t,R as f,S as w,y as R,A as x,C as L,K as V}from"./runtime-core.esm-bundler-b2e16801.js";const O=E({__name:"GLPreview",props:{name:null,folder:null},setup(i){const r=i,{examplesNames:u}=d(),m=["guide","examples"],p=["add-movement","creating-a-scene",...u.value],s=t(),n=t(!1),l=t(null),c=()=>m.includes(r.folder),v=()=>p.includes(r.name),o=async()=>{if(!c()||!v())return;const a=await g(Object.assign({"../gl-preview/examples/circle-outline.js":()=>e(()=>import("./circle-outline-74b2439d.js"),["assets/circle-outline-74b2439d.js","assets/arraybuffer-aead3aa0.js","assets/tweakpane-24b35bd6.js","assets/vec3-e4726a20.js","assets/common-a066d304.js"]),"../gl-preview/examples/circle.js":()=>e(()=>import("./circle-2ca5ce26.js"),["assets/circle-2ca5ce26.js","assets/arraybuffer-aead3aa0.js","assets/tweakpane-24b35bd6.js","assets/vec3-e4726a20.js","assets/common-a066d304.js"]),"../gl-preview/examples/rectangle-outline.js":()=>e(()=>import("./rectangle-outline-f5a2ba22.js"),["assets/rectangle-outline-f5a2ba22.js","assets/arraybuffer-aead3aa0.js","assets/tweakpane-24b35bd6.js","assets/vec3-e4726a20.js","assets/common-a066d304.js"]),"../gl-preview/examples/rectangle.js":()=>e(()=>import("./rectangle-6d3ed5d4.js"),["assets/rectangle-6d3ed5d4.js","assets/arraybuffer-aead3aa0.js","assets/tweakpane-24b35bd6.js","assets/vec3-e4726a20.js","assets/common-a066d304.js"]),"../gl-preview/examples/triangle.js":()=>e(()=>import("./triangle-5ce9b806.js"),["assets/triangle-5ce9b806.js","assets/arraybuffer-aead3aa0.js","assets/vec3-e4726a20.js","assets/common-a066d304.js"]),"../gl-preview/examples/unlit.js":()=>e(()=>import("./unlit-ab91e302.js"),["assets/unlit-ab91e302.js","assets/arraybuffer-aead3aa0.js","assets/vec3-e4726a20.js","assets/common-a066d304.js"]),"../gl-preview/guide/add-movement.js":()=>e(()=>import("./add-movement-ab9b1892.js"),["assets/add-movement-ab9b1892.js","assets/arraybuffer-aead3aa0.js","assets/useWebGL-cc0b7991.js","assets/common-a066d304.js"]),"../gl-preview/guide/creating-a-scene.js":()=>e(()=>import("./creating-a-scene-a2881468.js"),["assets/creating-a-scene-a2881468.js","assets/arraybuffer-aead3aa0.js","assets/useWebGL-cc0b7991.js"]),"../gl-preview/utils/useWebGL.js":()=>e(()=>import("./useWebGL-cc0b7991.js"),[])}),`../gl-preview/${r.folder}/${r.name}.js`);!a.preview||!s.value||(n.value=!0,l.value=a.preview(s.value))},_=()=>{l.value&&l.value()};return f(()=>{o()}),w(()=>{_()}),R(()=>r.name,a=>{_(),o()}),(a,j)=>(x(),L("canvas",{ref_key:"canvasRef",ref:s,class:V(["w-full bg-grey-50",i.folder==="examples"?"h-full":"aspect-[4/3] my-16 rounded-md",n.value?"block":"hidden"])},null,2))}});export{O as _};
