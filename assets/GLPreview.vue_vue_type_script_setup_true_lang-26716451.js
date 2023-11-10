import{u as v,_ as g,a as e}from"./index-3bdf8f30.js";import{p as f,x as i,R as E,S as w,y as R,A as x,C as L,K as V}from"./runtime-core.esm-bundler-b2e16801.js";const O=f({__name:"GLPreview",props:{name:{type:String,required:!0},folder:{type:String,required:!0}},setup(n){const r=n,{examplesNames:_}=v(),m=["guide","examples"],p=["add-movement","creating-a-scene",..._.value],a=i(),l=i(!1),s=i(null),c=()=>m.includes(r.folder),d=()=>p.includes(r.name),o=async()=>{if(!c()||!d())return;const t=await g(Object.assign({"../gl-preview/examples/circle.js":()=>e(()=>import("./circle-ffa74b55.js"),["assets/circle-ffa74b55.js","assets/arraybuffer-aead3aa0.js","assets/tweakpane-24b35bd6.js","assets/vec3-e4726a20.js","assets/common-a066d304.js"]),"../gl-preview/examples/outlined-circle.js":()=>e(()=>import("./outlined-circle-a308020c.js"),["assets/outlined-circle-a308020c.js","assets/arraybuffer-aead3aa0.js","assets/tweakpane-24b35bd6.js","assets/vec3-e4726a20.js","assets/common-a066d304.js"]),"../gl-preview/examples/outlined-rectangle.js":()=>e(()=>import("./outlined-rectangle-b54439d2.js"),["assets/outlined-rectangle-b54439d2.js","assets/arraybuffer-aead3aa0.js","assets/tweakpane-24b35bd6.js","assets/vec3-e4726a20.js","assets/common-a066d304.js"]),"../gl-preview/examples/rectangle.js":()=>e(()=>import("./rectangle-78b48eee.js"),["assets/rectangle-78b48eee.js","assets/arraybuffer-aead3aa0.js","assets/tweakpane-24b35bd6.js","assets/vec3-e4726a20.js","assets/common-a066d304.js"]),"../gl-preview/examples/triangle.js":()=>e(()=>import("./triangle-6238544f.js"),["assets/triangle-6238544f.js","assets/arraybuffer-aead3aa0.js","assets/vec3-e4726a20.js","assets/common-a066d304.js"]),"../gl-preview/guide/add-movement.js":()=>e(()=>import("./add-movement-ab9b1892.js"),["assets/add-movement-ab9b1892.js","assets/arraybuffer-aead3aa0.js","assets/useWebGL-cc0b7991.js","assets/common-a066d304.js"]),"../gl-preview/guide/creating-a-scene.js":()=>e(()=>import("./creating-a-scene-a2881468.js"),["assets/creating-a-scene-a2881468.js","assets/arraybuffer-aead3aa0.js","assets/useWebGL-cc0b7991.js"]),"../gl-preview/utils/useWebGL.js":()=>e(()=>import("./useWebGL-cc0b7991.js"),[])}),`../gl-preview/${r.folder}/${r.name}.js`);!t.preview||!a.value||(l.value=!0,s.value=t.preview(a.value))},u=()=>{s.value&&s.value()};return E(()=>{o()}),w(()=>{u()}),R(()=>r.name,t=>{u(),o()}),(t,j)=>(x(),L("canvas",{ref_key:"canvasRef",ref:a,class:V(["w-full bg-grey-50",n.folder==="examples"?"h-full":"aspect-[4/3] my-16 rounded-md",l.value?"block":"hidden"])},null,2))}});export{O as _};
