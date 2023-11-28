import{u as v,_ as g,a as e}from"./index-c251adfe.js";import{p as E,x as t,R as f,S as w,y as R,A as L,C as V,K as j}from"./runtime-core.esm-bundler-b2e16801.js";const O=E({__name:"GLPreview",props:{name:null,folder:null},setup(i){const r=i,{examplesNames:u}=v(),m=["guide","examples"],p=["add-movement","creating-a-scene","full-screen-shader",...u.value],a=t(),n=t(!1),l=t(null),c=()=>m.includes(r.folder),d=()=>p.includes(r.name),o=async()=>{if(!c()||!d())return;const s=await g(Object.assign({"../gl-preview/examples/circle-outline.js":()=>e(()=>import("./circle-outline-b051ba8b.js"),["assets/circle-outline-b051ba8b.js","assets/arraybuffer-442a5bef.js","assets/index-7870482b.js","assets/tweakpane-24b35bd6.js","assets/vec3-e4726a20.js","assets/common-a066d304.js"]),"../gl-preview/examples/circle.js":()=>e(()=>import("./circle-c66caf30.js"),["assets/circle-c66caf30.js","assets/arraybuffer-442a5bef.js","assets/index-7870482b.js","assets/tweakpane-24b35bd6.js","assets/vec3-e4726a20.js","assets/common-a066d304.js"]),"../gl-preview/examples/rectangle-outline.js":()=>e(()=>import("./rectangle-outline-e9406929.js"),["assets/rectangle-outline-e9406929.js","assets/arraybuffer-442a5bef.js","assets/index-7870482b.js","assets/tweakpane-24b35bd6.js","assets/vec3-e4726a20.js","assets/common-a066d304.js"]),"../gl-preview/examples/rectangle.js":()=>e(()=>import("./rectangle-5c261999.js"),["assets/rectangle-5c261999.js","assets/arraybuffer-442a5bef.js","assets/index-7870482b.js","assets/tweakpane-24b35bd6.js","assets/vec3-e4726a20.js","assets/common-a066d304.js"]),"../gl-preview/examples/triangle.js":()=>e(()=>import("./triangle-2a0d9901.js"),["assets/triangle-2a0d9901.js","assets/arraybuffer-442a5bef.js","assets/index-7870482b.js","assets/vec3-e4726a20.js","assets/common-a066d304.js"]),"../gl-preview/examples/unlit.js":()=>e(()=>import("./unlit-992e12da.js"),["assets/unlit-992e12da.js","assets/arraybuffer-442a5bef.js","assets/index-7870482b.js","assets/vec3-e4726a20.js","assets/common-a066d304.js"]),"../gl-preview/guide/add-movement.js":()=>e(()=>import("./add-movement-f291dc74.js"),["assets/add-movement-f291dc74.js","assets/index-7870482b.js","assets/arraybuffer-442a5bef.js","assets/useWebGL-cc0b7991.js","assets/common-a066d304.js"]),"../gl-preview/guide/creating-a-scene.js":()=>e(()=>import("./creating-a-scene-2d7c0d20.js"),["assets/creating-a-scene-2d7c0d20.js","assets/index-7870482b.js","assets/arraybuffer-442a5bef.js","assets/useWebGL-cc0b7991.js"]),"../gl-preview/guide/full-screen-shader.js":()=>e(()=>import("./full-screen-shader-924fa7e9.js"),["assets/full-screen-shader-924fa7e9.js","assets/arraybuffer-442a5bef.js","assets/useWebGL-cc0b7991.js"]),"../gl-preview/utils/useWebGL.js":()=>e(()=>import("./useWebGL-cc0b7991.js"),[])}),`../gl-preview/${r.folder}/${r.name}.js`);!s.preview||!a.value||(n.value=!0,l.value=s.preview(a.value))},_=()=>{l.value&&l.value()};return f(()=>{o()}),w(()=>{_()}),R(()=>r.name,s=>{_(),o()}),(s,x)=>(L(),V("canvas",{ref_key:"canvasRef",ref:a,class:j(["w-full bg-grey-50",i.folder==="examples"?"h-full":"aspect-[4/3] my-16 rounded-md",n.value?"block":"hidden"])},null,2))}});export{O as _};
