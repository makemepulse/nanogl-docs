import{u as E,a as c,b as e}from"./index-d0e0859e.js";import{p as g,x as s,R as w,S as R,y as x,A as D,C as L,K as V}from"./runtime-core.esm-bundler-b2e16801.js";const P=g({__name:"GLPreview",props:{name:null,folder:null},setup(l){const r=l,{examplesNames:m}=E(),u=["guide","examples"],n=["add-movement","creating-a-scene","full-screen-shader",...m.value],i=s(),o=s(!1),t=s(null),v=()=>u.includes(r.folder),d=()=>n.includes(r.name),a=async()=>{if(!v()||!d())return;const _=await c(Object.assign({"../gl-preview/examples/bloom.js":()=>e(()=>import("./bloom-9a3aad10.js"),["assets/bloom-9a3aad10.js","assets/fetch-17b3f59c.js","assets/arraybuffer-1b6e50fc.js","assets/fbo-469d6df9.js","assets/texture-2d-18ce519d.js","assets/index-5809b7fb.js","assets/indexbuffer-13597e9e.js","assets/tweakpane-24b35bd6.js","assets/cubeGeometry-a8671df7.js","assets/vec3-a79e08f1.js","assets/common-a066d304.js"]),"../gl-preview/examples/camera-types.js":()=>e(()=>import("./camera-types-26d04b6c.js"),["assets/camera-types-26d04b6c.js","assets/index-5809b7fb.js","assets/arraybuffer-1b6e50fc.js","assets/indexbuffer-13597e9e.js","assets/tweakpane-24b35bd6.js","assets/cubeGeometry-a8671df7.js","assets/vec3-a79e08f1.js","assets/common-a066d304.js","assets/mat4-2d297a36.js"]),"../gl-preview/examples/circle-outline.js":()=>e(()=>import("./circle-outline-711f25ab.js"),["assets/circle-outline-711f25ab.js","assets/index-5809b7fb.js","assets/arraybuffer-1b6e50fc.js","assets/tweakpane-24b35bd6.js","assets/vec3-a79e08f1.js","assets/common-a066d304.js"]),"../gl-preview/examples/circle.js":()=>e(()=>import("./circle-80457234.js"),["assets/circle-80457234.js","assets/index-5809b7fb.js","assets/arraybuffer-1b6e50fc.js","assets/tweakpane-24b35bd6.js","assets/vec3-a79e08f1.js","assets/common-a066d304.js"]),"../gl-preview/examples/dof.js":()=>e(()=>import("./dof-979d9b50.js"),["assets/dof-979d9b50.js","assets/arraybuffer-1b6e50fc.js","assets/fbo-469d6df9.js","assets/texture-2d-18ce519d.js","assets/fetch-17b3f59c.js","assets/vec3-a79e08f1.js","assets/common-a066d304.js","assets/index-5809b7fb.js","assets/indexbuffer-13597e9e.js","assets/tweakpane-24b35bd6.js","assets/cubeGeometry-a8671df7.js","assets/mat4-2d297a36.js"]),"../gl-preview/examples/fbo-texture.js":()=>e(()=>import("./fbo-texture-92fcc904.js"),["assets/fbo-texture-92fcc904.js","assets/fbo-469d6df9.js","assets/texture-2d-18ce519d.js","assets/arraybuffer-1b6e50fc.js","assets/index-5809b7fb.js","assets/indexbuffer-13597e9e.js","assets/tweakpane-24b35bd6.js","assets/cubeGeometry-a8671df7.js","assets/vec3-a79e08f1.js","assets/common-a066d304.js"]),"../gl-preview/examples/full-screen-shader.js":()=>e(()=>import("./full-screen-shader-b6a8da97.js"),["assets/full-screen-shader-b6a8da97.js","assets/arraybuffer-1b6e50fc.js"]),"../gl-preview/examples/gl-state.js":()=>e(()=>import("./gl-state-7740d7b6.js"),["assets/gl-state-7740d7b6.js","assets/index-5809b7fb.js","assets/arraybuffer-1b6e50fc.js","assets/indexbuffer-13597e9e.js","assets/tweakpane-24b35bd6.js","assets/cubeGeometry-a8671df7.js","assets/vec3-a79e08f1.js","assets/common-a066d304.js","assets/mat4-2d297a36.js"]),"../gl-preview/examples/grain.js":()=>e(()=>import("./grain-54c8b362.js"),["assets/grain-54c8b362.js","assets/fetch-17b3f59c.js","assets/arraybuffer-1b6e50fc.js","assets/fbo-469d6df9.js","assets/texture-2d-18ce519d.js","assets/index-5809b7fb.js","assets/indexbuffer-13597e9e.js","assets/tweakpane-24b35bd6.js","assets/cubeGeometry-a8671df7.js","assets/vec3-a79e08f1.js","assets/common-a066d304.js"]),"../gl-preview/examples/image-texture.js":()=>e(()=>import("./image-texture-4fa20e96.js"),["assets/image-texture-4fa20e96.js","assets/index-5809b7fb.js","assets/arraybuffer-1b6e50fc.js","assets/indexbuffer-13597e9e.js","assets/texture-2d-18ce519d.js","assets/tweakpane-24b35bd6.js","assets/square-texture-5de1b8a4.js","assets/cubeGeometry-a8671df7.js","assets/vec3-a79e08f1.js","assets/common-a066d304.js"]),"../gl-preview/examples/node-nesting.js":()=>e(()=>import("./node-nesting-922eb55c.js"),["assets/node-nesting-922eb55c.js","assets/index-5809b7fb.js","assets/arraybuffer-1b6e50fc.js","assets/indexbuffer-13597e9e.js","assets/cubeGeometry-a8671df7.js","assets/vec3-a79e08f1.js","assets/common-a066d304.js","assets/mat4-2d297a36.js"]),"../gl-preview/examples/rectangle-outline.js":()=>e(()=>import("./rectangle-outline-616d597e.js"),["assets/rectangle-outline-616d597e.js","assets/index-5809b7fb.js","assets/arraybuffer-1b6e50fc.js","assets/tweakpane-24b35bd6.js","assets/vec3-a79e08f1.js","assets/common-a066d304.js"]),"../gl-preview/examples/rectangle.js":()=>e(()=>import("./rectangle-660af1d6.js"),["assets/rectangle-660af1d6.js","assets/arraybuffer-1b6e50fc.js","assets/index-5809b7fb.js","assets/tweakpane-24b35bd6.js","assets/vec3-a79e08f1.js","assets/common-a066d304.js"]),"../gl-preview/examples/standard-metalness.js":()=>e(()=>import("./standard-metalness-eb109886.js"),["assets/standard-metalness-eb109886.js","assets/StandardPass-d78f4231.js","assets/ShaderPrecision-ccb03460.js","assets/indexbuffer-13597e9e.js","assets/arraybuffer-1b6e50fc.js","assets/index-5809b7fb.js","assets/texture-2d-18ce519d.js","assets/tweakpane-24b35bd6.js","assets/square-texture-5de1b8a4.js","assets/iblData-2ac082dd.js","assets/cubeGeometry-a8671df7.js","assets/vec3-a79e08f1.js","assets/common-a066d304.js"]),"../gl-preview/examples/standard-specular.js":()=>e(()=>import("./standard-specular-b53424fe.js"),["assets/standard-specular-b53424fe.js","assets/StandardPass-d78f4231.js","assets/ShaderPrecision-ccb03460.js","assets/indexbuffer-13597e9e.js","assets/arraybuffer-1b6e50fc.js","assets/index-5809b7fb.js","assets/texture-2d-18ce519d.js","assets/tweakpane-24b35bd6.js","assets/square-texture-5de1b8a4.js","assets/iblData-2ac082dd.js","assets/cubeGeometry-a8671df7.js","assets/vec3-a79e08f1.js","assets/common-a066d304.js"]),"../gl-preview/examples/triangle.js":()=>e(()=>import("./triangle-2ddba1af.js"),["assets/triangle-2ddba1af.js","assets/index-5809b7fb.js","assets/arraybuffer-1b6e50fc.js","assets/vec3-a79e08f1.js","assets/common-a066d304.js"]),"../gl-preview/examples/unlit.js":()=>e(()=>import("./unlit-00a9713b.js"),["assets/unlit-00a9713b.js","assets/index-5809b7fb.js","assets/indexbuffer-13597e9e.js","assets/arraybuffer-1b6e50fc.js","assets/ShaderPrecision-ccb03460.js","assets/texture-2d-18ce519d.js","assets/tweakpane-24b35bd6.js","assets/square-texture-5de1b8a4.js","assets/cubeGeometry-a8671df7.js","assets/vec3-a79e08f1.js","assets/common-a066d304.js"]),"../gl-preview/examples/video-texture.js":()=>e(()=>import("./video-texture-289bfc40.js"),["assets/video-texture-289bfc40.js","assets/index-5809b7fb.js","assets/arraybuffer-1b6e50fc.js","assets/indexbuffer-13597e9e.js","assets/texture-2d-18ce519d.js","assets/cubeGeometry-a8671df7.js","assets/vec3-a79e08f1.js","assets/common-a066d304.js","assets/mat4-2d297a36.js"]),"../gl-preview/examples/vignette.js":()=>e(()=>import("./vignette-cd0efb2f.js"),["assets/vignette-cd0efb2f.js","assets/fetch-17b3f59c.js","assets/arraybuffer-1b6e50fc.js","assets/fbo-469d6df9.js","assets/texture-2d-18ce519d.js","assets/index-5809b7fb.js","assets/indexbuffer-13597e9e.js","assets/tweakpane-24b35bd6.js","assets/cubeGeometry-a8671df7.js","assets/vec3-a79e08f1.js","assets/common-a066d304.js"]),"../gl-preview/guide/add-movement.js":()=>e(()=>import("./add-movement-8bc829fa.js"),["assets/add-movement-8bc829fa.js","assets/index-5809b7fb.js","assets/arraybuffer-1b6e50fc.js","assets/useWebGL-cc0b7991.js","assets/mat4-2d297a36.js","assets/common-a066d304.js"]),"../gl-preview/guide/creating-a-scene.js":()=>e(()=>import("./creating-a-scene-f9ae7a29.js"),["assets/creating-a-scene-f9ae7a29.js","assets/index-5809b7fb.js","assets/arraybuffer-1b6e50fc.js","assets/useWebGL-cc0b7991.js"]),"../gl-preview/guide/full-screen-shader.js":()=>e(()=>import("./full-screen-shader-c8ea2169.js"),["assets/full-screen-shader-c8ea2169.js","assets/arraybuffer-1b6e50fc.js","assets/useWebGL-cc0b7991.js"]),"../gl-preview/utils/cubeGeometry.js":()=>e(()=>import("./cubeGeometry-a8671df7.js"),[]),"../gl-preview/utils/iblData.js":()=>e(()=>import("./iblData-2ac082dd.js"),[]),"../gl-preview/utils/useWebGL.js":()=>e(()=>import("./useWebGL-cc0b7991.js"),[])}),`../gl-preview/${r.folder}/${r.name}.js`);!_.preview||!i.value||(o.value=!0,t.value=_.preview(i.value))},p=()=>{t.value&&t.value()};return w(()=>{a()}),R(()=>{p()}),x(()=>r.name,_=>{p(),a()}),(_,j)=>(D(),L("canvas",{ref_key:"canvasRef",ref:i,class:V(["w-full bg-grey-50",l.folder==="examples"?"h-full":"aspect-[4/3] my-16 rounded-md",o.value?"block":"hidden"])},null,2))}});export{P as _};
