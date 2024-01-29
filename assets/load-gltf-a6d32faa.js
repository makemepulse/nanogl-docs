import{_ as u}from"./GLPreview.vue_vue_type_script_setup_true_lang-82be6a82.js";import{_ as r}from"./UICallout.vue_vue_type_script_setup_true_lang-751fca1f.js";import{b as c}from"./route-block-83d24a4e.js";import{A as k,K as d,H as n,I as t,M as s,Q as l,P as a,G as m}from"./runtime-core.esm-bundler-6b582627.js";import"./index-6ace8b64.js";const g={class:"markdown-body"},b={class:"content-wrapper"},h=l('<h1 id="load-a-gltf-model" tabindex="-1">Load a GLTF model</h1><p>Often, using 2D primitives won’t be enough, or building your own buffers will be far too complicated, and you’ll need to load <a href="https://fr.wikipedia.org/wiki/GlTF" target="_blank" rel="noopener">glTF files</a>.</p><p>We’ll start with the canvas &amp; context setup from the <a href="/guide/getting-started/add-movement">Add some movement</a> article.</p><h2 id="loading-a-file" tabindex="-1">Loading a file</h2><p>Using the nanogl-gltf loader made for web <a href="/api/nanogl-gltf/classes/GltfIO">GltfIO</a>, you can directly load a model from its URL (relative path or external web URL).</p><p>Then you have to allocate the gl context to the loaded glTF, so every textures, buffers, etc. can be linked to the GL context, ready to be rendered.</p><p>Don’t forget to call the render function only when the model is ready.</p>',7),f=n("pre",{class:"language-js"},[n("code",{class:"language-js"},[n("span",{class:"token keyword"},"import"),a(" GltfIO "),n("span",{class:"token keyword"},"from"),a(),n("span",{class:"token string"},'"nanogl-gltf/lib/io/web"'),n("span",{class:"token punctuation"},";"),a(`

`),n("span",{class:"token comment"},"// ..."),a(`

`),n("span",{class:"token keyword"},"let"),a(" gltf "),n("span",{class:"token operator"},"="),a(),n("span",{class:"token keyword"},"null"),n("span",{class:"token punctuation"},";"),a(`

`),n("span",{class:"token comment"},"// load gltf from url"),a(`
GltfIO`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"loadGltf"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"../models/suzanne/Suzanne.gltf"'),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"then"),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"async"),a(),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},"loadedGltf"),n("span",{class:"token punctuation"},")"),a(),n("span",{class:"token operator"},"=>"),a(),n("span",{class:"token punctuation"},"{"),a(`
  gltf `),n("span",{class:"token operator"},"="),a(" loadedGltf"),n("span",{class:"token punctuation"},";"),a(`

  `),n("span",{class:"token comment"},"// link gltf to gl context"),a(`
  `),n("span",{class:"token keyword"},"await"),a(" gltf"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"allocate"),n("span",{class:"token punctuation"},"("),a("gl"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`

  `),n("span",{class:"token comment"},"// render only when the gltf is loaded and allocated"),a(`
  `),n("span",{class:"token function"},"render"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"js"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1706542918780-28344"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`import GltfIO from "nanogl-gltf/lib/io/web";

// ...

let gltf = null;

// load gltf from url
GltfIO.loadGltf("../models/suzanne/Suzanne.gltf").then(async (loadedGltf) => {
  gltf = loadedGltf;

  // link gltf to gl context
  await gltf.allocate(gl);

  // render only when the gltf is loaded and allocated
  render();
});
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1706542918780-28344","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),y=n("p",null,[n("strong",null,"Note :"),a(" This is the most basic way of loading a model with nanogl-gltf, but some more complete and detailed implementations may be better suited to your project (light management, animations, adding extensions support, …). You can see one on the "),n("a",{href:"https://github.com/makemepulse/nanogl-starter",target:"_blank",rel:"noopener"},"starter"),a(".")],-1),w=n("h2",{id:"render-the-model",tabindex:"-1"},"Render the model",-1),x=n("p",null,[a("Then, to render the model, you just have to call the render function on each gltf’s renderable (they all are "),n("a",{href:"/api/nanogl-gltf/classes/MeshRenderer"},"MeshRenderer"),a(").")],-1),v=n("p",null,[a("You have to pass the GL context, the current camera, the "),n("a",{href:"/api/nanogl-gltf/interfaces/IRenderConfig"},"mask ID"),a(" (1 is the OPAQUE mask, the default one), and the pass ID (COLOR, DEPTH, custom other passes…).")],-1),_=n("pre",{class:"language-js"},[n("code",{class:"language-js"},[n("span",{class:"token keyword"},"const"),a(),n("span",{class:"token function-variable function"},"render"),a(),n("span",{class:"token operator"},"="),a(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),a(),n("span",{class:"token operator"},"=>"),a(),n("span",{class:"token punctuation"},"{"),a(`
  `),n("span",{class:"token comment"},"// ..."),a(`

  `),n("span",{class:"token comment"},"// render all gltf renderables (MeshRenderer)"),a(`
  `),n("span",{class:"token keyword"},"for"),a(),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"const"),a(" renderable "),n("span",{class:"token keyword"},"of"),a(" gltf"),n("span",{class:"token punctuation"},"."),a("renderables"),n("span",{class:"token punctuation"},")"),a(),n("span",{class:"token punctuation"},"{"),a(`
    `),n("span",{class:"token comment"},"// pass the gl context, camera, mask id, and pass id"),a(`
    renderable`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"render"),n("span",{class:"token punctuation"},"("),a("gl"),n("span",{class:"token punctuation"},","),a(" camera"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token string"},"'color'"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
  `),n("span",{class:"token punctuation"},"}"),a(`

  `),n("span",{class:"token function"},"requestAnimationFrame"),n("span",{class:"token punctuation"},"("),a("render"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
`),n("span",{class:"token punctuation"},"}"),a(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"js"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1706542918780-71155"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`const render = () => {
  // ...

  // render all gltf renderables (MeshRenderer)
  for (const renderable of gltf.renderables) {
    // pass the gl context, camera, mask id, and pass id
    renderable.render(gl, camera, 1, 'color');
  }

  requestAnimationFrame(render);
}
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1706542918780-71155","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),C=n("h2",{id:"add-lights",tabindex:"-1"},"Add lights",-1),I=n("p",null,"We still have an issue : the model appears, but totally black. And it makes sense, because we didn’t setup any lights in our scene.",-1),L=n("p",null,[a("To do so, we’ll have to create a "),n("a",{href:"/api/nanogl-pbr/classes/LightSetup"},"LightSetup"),a(" to encapsulate all our lights, and then add an "),n("a",{href:"/api/nanogl-pbr/classes/Ibl"},"Ibl"),a(" to it.")],-1),S=n("p",null,"The Ibl is created using an envMap texture and an array of Spherical Harmonics (it’s a simplified representation of how much light comes from each direction).",-1),T=n("pre",{class:"language-js"},[n("code",{class:"language-js"},[n("span",{class:"token keyword"},"import"),a(" LightSetup "),n("span",{class:"token keyword"},"from"),a(),n("span",{class:"token string"},'"nanogl-pbr/lighting/LightSetup"'),n("span",{class:"token punctuation"},";"),a(`
`),n("span",{class:"token keyword"},"import"),a(" Texture2D "),n("span",{class:"token keyword"},"from"),a(),n("span",{class:"token string"},'"nanogl/texture-2d"'),n("span",{class:"token punctuation"},";"),a(`
`),n("span",{class:"token keyword"},"import"),a(" Ibl "),n("span",{class:"token keyword"},"from"),a(),n("span",{class:"token string"},'"nanogl-pbr/lighting/Ibl"'),n("span",{class:"token punctuation"},";"),a(`
`),n("span",{class:"token keyword"},"import"),a(" iblSrc "),n("span",{class:"token keyword"},"from"),a(),n("span",{class:"token string"},'"@assets/images/ibl.rgbm.png"'),n("span",{class:"token punctuation"},";"),a(`

`),n("span",{class:"token comment"},"// ..."),a(`

`),n("span",{class:"token comment"},"// create light setup"),a(`
`),n("span",{class:"token keyword"},"const"),a(" lightSetup "),n("span",{class:"token operator"},"="),a(),n("span",{class:"token keyword"},"new"),a(),n("span",{class:"token class-name"},"LightSetup"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
lightSetup`),n("span",{class:"token punctuation"},"."),a("bounds"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"fromMinMax"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"["),n("span",{class:"token operator"},"-"),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),n("span",{class:"token operator"},"-"),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),n("span",{class:"token operator"},"-"),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),n("span",{class:"token punctuation"},"["),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`

`),n("span",{class:"token comment"},"// create iblTexture"),a(`
`),n("span",{class:"token keyword"},"const"),a(" iblTexture "),n("span",{class:"token operator"},"="),a(),n("span",{class:"token keyword"},"new"),a(),n("span",{class:"token class-name"},"Texture2D"),n("span",{class:"token punctuation"},"("),a("gl"),n("span",{class:"token punctuation"},","),a(" gl"),n("span",{class:"token punctuation"},"."),n("span",{class:"token constant"},"RGBA"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
iblTexture`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"clamp"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`

`),n("span",{class:"token comment"},"// create ibl spherical harmonics data"),a(`
`),n("span",{class:"token keyword"},"const"),a(" iblSh "),n("span",{class:"token operator"},"="),a(),n("span",{class:"token keyword"},"new"),a(),n("span",{class:"token class-name"},"Float32Array"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"["),a(`
  `),n("span",{class:"token number"},"0.224084854125977"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.213043749332428"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.283314585685730"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token comment"},"// L00, irradiance, pre-scaled base"),a(`
  `),n("span",{class:"token number"},"0.100831791758537"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.124612621963024"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.204235553741455"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token comment"},"// L1-1, irradiance, pre-scaled base"),a(`
  `),n("span",{class:"token number"},"0.107245393097401"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.083322264254093"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.076212428510189"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token comment"},"// L10, irradiance, pre-scaled base"),a(`
  `),n("span",{class:"token number"},"0.144294798374176"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.106082014739513"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.089959740638733"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token comment"},"// L11, irradiance, pre-scaled base"),a(`
  `),n("span",{class:"token number"},"0.053996223956347"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.044765342026949"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.044178668409586"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token comment"},"// L2-2, irradiance, pre-scaled base"),a(`
  `),n("span",{class:"token number"},"0.025597579777241"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.024105755612254"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.027786524966359"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token comment"},"// L2-1, irradiance, pre-scaled base"),a(`
  `),n("span",{class:"token number"},"0.004080550745130"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.002261536428705"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token operator"},"-"),n("span",{class:"token number"},"0.000168046550243"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token comment"},"// L20, irradiance, pre-scaled base"),a(`
  `),n("span",{class:"token number"},"0.091950185596943"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.066512495279312"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.055933292955160"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token comment"},"// L21, irradiance, pre-scaled base"),a(`
  `),n("span",{class:"token number"},"0.051955129951239"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.036966290324926"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.029668755829334"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token comment"},"// L22, irradiance, pre-scaled base"),a(`
`),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},")"),a(`

`),n("span",{class:"token comment"},"// create ibl light"),a(`
`),n("span",{class:"token keyword"},"const"),a(" ibl "),n("span",{class:"token operator"},"="),a(),n("span",{class:"token keyword"},"new"),a(),n("span",{class:"token class-name"},"Ibl"),n("span",{class:"token punctuation"},"("),a("iblTexture"),n("span",{class:"token punctuation"},","),a(" iblSh"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
ibl`),n("span",{class:"token punctuation"},"."),a("iblFormat "),n("span",{class:"token operator"},"="),a(),n("span",{class:"token string"},"'OCTA'"),n("span",{class:"token punctuation"},";"),a(`
ibl`),n("span",{class:"token punctuation"},"."),a("shFormat "),n("span",{class:"token operator"},"="),a(),n("span",{class:"token string"},"'SH9'"),n("span",{class:"token punctuation"},";"),a(`
ibl`),n("span",{class:"token punctuation"},"."),a("hdrEncoding "),n("span",{class:"token operator"},"="),a(),n("span",{class:"token string"},"'RGBM'"),n("span",{class:"token punctuation"},";"),a(`

`),n("span",{class:"token comment"},"// setup the image for the ibl texture"),a(`
`),n("span",{class:"token keyword"},"const"),a(" iblImg "),n("span",{class:"token operator"},"="),a(),n("span",{class:"token keyword"},"new"),a(),n("span",{class:"token class-name"},"Image"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
iblImg`),n("span",{class:"token punctuation"},"."),a("src "),n("span",{class:"token operator"},"="),a(" iblSrc"),n("span",{class:"token punctuation"},";"),a(`
`),n("span",{class:"token comment"},"// set texture data from image on load"),a(`
iblImg`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function-variable function"},"onload"),a(),n("span",{class:"token operator"},"="),a(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),a(),n("span",{class:"token operator"},"=>"),a(),n("span",{class:"token punctuation"},"{"),a(`
  iblTexture`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"fromImage"),n("span",{class:"token punctuation"},"("),a("iblImg"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
`),n("span",{class:"token punctuation"},"}"),a(`

`),n("span",{class:"token comment"},"// add ibl to light setup"),a(`
lightSetup`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"add"),n("span",{class:"token punctuation"},"("),a("ibl"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"js"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1706542918780-35874"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`import LightSetup from "nanogl-pbr/lighting/LightSetup";
import Texture2D from "nanogl/texture-2d";
import Ibl from "nanogl-pbr/lighting/Ibl";
import iblSrc from "@assets/images/ibl.rgbm.png";

// ...

// create light setup
const lightSetup = new LightSetup();
lightSetup.bounds.fromMinMax([-1,-1,-1],[1,1,1]);

// create iblTexture
const iblTexture = new Texture2D(gl, gl.RGBA);
iblTexture.clamp();

// create ibl spherical harmonics data
const iblSh = new Float32Array([
  0.224084854125977, 0.213043749332428, 0.283314585685730, // L00, irradiance, pre-scaled base
  0.100831791758537, 0.124612621963024, 0.204235553741455, // L1-1, irradiance, pre-scaled base
  0.107245393097401, 0.083322264254093, 0.076212428510189, // L10, irradiance, pre-scaled base
  0.144294798374176, 0.106082014739513, 0.089959740638733, // L11, irradiance, pre-scaled base
  0.053996223956347, 0.044765342026949, 0.044178668409586, // L2-2, irradiance, pre-scaled base
  0.025597579777241, 0.024105755612254, 0.027786524966359, // L2-1, irradiance, pre-scaled base
  0.004080550745130, 0.002261536428705, -0.000168046550243, // L20, irradiance, pre-scaled base
  0.091950185596943, 0.066512495279312, 0.055933292955160, // L21, irradiance, pre-scaled base
  0.051955129951239, 0.036966290324926, 0.029668755829334, // L22, irradiance, pre-scaled base
])

// create ibl light
const ibl = new Ibl(iblTexture, iblSh);
ibl.iblFormat = 'OCTA';
ibl.shFormat = 'SH9';
ibl.hdrEncoding = 'RGBM';

// setup the image for the ibl texture
const iblImg = new Image();
iblImg.src = iblSrc;
// set texture data from image on load
iblImg.onload = () => {
  iblTexture.fromImage(iblImg);
}

// add ibl to light setup
lightSetup.add(ibl);
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1706542918780-35874","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),A=n("p",null,"Then we need to apply this LightSetup to every material of the gltf model.",-1),G=n("pre",{class:"language-js"},[n("code",{class:"language-js"},[n("span",{class:"token comment"},"// load gltf from url"),a(`
GltfIO`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"loadGltf"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"../models/suzanne/Suzanne.gltf"'),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"then"),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"async"),a(),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},"loadedGltf"),n("span",{class:"token punctuation"},")"),a(),n("span",{class:"token operator"},"=>"),a(),n("span",{class:"token punctuation"},"{"),a(`
  `),n("span",{class:"token comment"},"// ..."),a(`

  `),n("span",{class:"token keyword"},"await"),a(" gltf"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"allocate"),n("span",{class:"token punctuation"},"("),a("gl"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`

  `),n("span",{class:"token comment"},"// apply LightSetup on every material"),a(`
  `),n("span",{class:"token keyword"},"for"),a(),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"const"),a(" material "),n("span",{class:"token keyword"},"of"),a(" gltf"),n("span",{class:"token punctuation"},"."),a("materials"),n("span",{class:"token punctuation"},")"),a(),n("span",{class:"token punctuation"},"{"),a(`
    material`),n("span",{class:"token punctuation"},"."),a("materialPass"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"setLightSetup"),n("span",{class:"token punctuation"},"("),a("lightSetup"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
  `),n("span",{class:"token punctuation"},"}"),a(`
  
  `),n("span",{class:"token comment"},"// ..."),a(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"js"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1706542918781-37704"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`// load gltf from url
GltfIO.loadGltf("../models/suzanne/Suzanne.gltf").then(async (loadedGltf) => {
  // ...

  await gltf.allocate(gl);

  // apply LightSetup on every material
  for (const material of gltf.materials) {
    material.materialPass.setLightSetup(lightSetup);
  }
  
  // ...
});
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1706542918781-37704","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),R=n("p",null,"And finally we just need to update the LightSetup before rendering the model (to apply potential position/color/intensity/… changes in lights).",-1),j=n("pre",{class:"language-js"},[n("code",{class:"language-js"},[n("span",{class:"token keyword"},"const"),a(),n("span",{class:"token function-variable function"},"render"),a(),n("span",{class:"token operator"},"="),a(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),a(),n("span",{class:"token operator"},"=>"),a(),n("span",{class:"token punctuation"},"{"),a(`
  `),n("span",{class:"token comment"},"// ..."),a(`

  `),n("span",{class:"token comment"},"// prepare light setup, before calling renderable.render()"),a(`
  lightSetup`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"prepare"),n("span",{class:"token punctuation"},"("),a("gl"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`

  `),n("span",{class:"token comment"},"// ..."),a(`
`),n("span",{class:"token punctuation"},"}"),a(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"js"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1706542918781-43234"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`const render = () => {
  // ...

  // prepare light setup, before calling renderable.render()
  lightSetup.prepare(gl);

  // ...
}
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1706542918781-43234","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),z=n("h2",{id:"add-some-movement",tabindex:"-1"},"Add some movement",-1),F=n("p",null,"Let’s rotate our Suzanne model a little bit at each frame, so we can see all sides and check our lighting setup.",-1),M=n("pre",{class:"language-js"},[n("code",{class:"language-js"},[n("span",{class:"token keyword"},"const"),a(),n("span",{class:"token function-variable function"},"animate"),a(),n("span",{class:"token operator"},"="),a(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),a(),n("span",{class:"token operator"},"=>"),a(),n("span",{class:"token punctuation"},"{"),a(`
  `),n("span",{class:"token comment"},"// get gltf root node"),a(`
  `),n("span",{class:"token keyword"},"const"),a(" node "),n("span",{class:"token operator"},"="),a(" gltf"),n("span",{class:"token punctuation"},"."),a("root"),n("span",{class:"token punctuation"},";"),a(`
  `),n("span",{class:"token comment"},"// rotate around X axis a little bit at each frame"),a(`
  node`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"rotateY"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"0.01"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
  `),n("span",{class:"token comment"},"// update world matrix"),a(`
  node`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"updateWorldMatrix"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
`),n("span",{class:"token punctuation"},"}"),a(`

`),n("span",{class:"token keyword"},"const"),a(),n("span",{class:"token function-variable function"},"render"),a(),n("span",{class:"token operator"},"="),a(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),a(),n("span",{class:"token operator"},"=>"),a(),n("span",{class:"token punctuation"},"{"),a(`
  `),n("span",{class:"token function"},"animate"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`

  `),n("span",{class:"token comment"},"// ..."),a(`
`),n("span",{class:"token punctuation"},"}"),a(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"js"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1706542918781-94545"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`const animate = () => {
  // get gltf root node
  const node = gltf.root;
  // rotate around X axis a little bit at each frame
  node.rotateY(0.01);
  // update world matrix
  node.updateWorldMatrix();
}

const render = () => {
  animate();

  // ...
}
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1706542918781-94545","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),O=n("h2",{id:"result",tabindex:"-1"},"Result",-1),E=n("p",null,"And now you have a beautiful Suzanne !",-1),N=n("h2",{id:"final-code",tabindex:"-1"},"Final code",-1),B=n("p",null,"Here is the complete code for the js file :",-1),P=n("pre",{class:"language-js"},[n("code",{class:"language-js"},[n("span",{class:"token keyword"},"import"),a(" Camera "),n("span",{class:"token keyword"},"from"),a(),n("span",{class:"token string"},'"nanogl-camera"'),n("span",{class:"token punctuation"},";"),a(`
`),n("span",{class:"token keyword"},"import"),a(" PerspectiveLens "),n("span",{class:"token keyword"},"from"),a(),n("span",{class:"token string"},'"nanogl-camera/perspective-lens"'),n("span",{class:"token punctuation"},";"),a(`
`),n("span",{class:"token keyword"},"import"),a(" GltfIO "),n("span",{class:"token keyword"},"from"),a(),n("span",{class:"token string"},'"nanogl-gltf/lib/io/web"'),n("span",{class:"token punctuation"},";"),a(`
`),n("span",{class:"token keyword"},"import"),a(" LightSetup "),n("span",{class:"token keyword"},"from"),a(),n("span",{class:"token string"},'"nanogl-pbr/lighting/LightSetup"'),n("span",{class:"token punctuation"},";"),a(`
`),n("span",{class:"token keyword"},"import"),a(" Texture2D "),n("span",{class:"token keyword"},"from"),a(),n("span",{class:"token string"},'"nanogl/texture-2d"'),n("span",{class:"token punctuation"},";"),a(`
`),n("span",{class:"token keyword"},"import"),a(" Ibl "),n("span",{class:"token keyword"},"from"),a(),n("span",{class:"token string"},'"nanogl-pbr/lighting/Ibl"'),n("span",{class:"token punctuation"},";"),a(`
`),n("span",{class:"token keyword"},"import"),a(" iblSrc "),n("span",{class:"token keyword"},"from"),a(),n("span",{class:"token string"},'"@assets/images/ibl.rgbm.png"'),n("span",{class:"token punctuation"},";"),a(`

`),n("span",{class:"token comment"},"// --CANVAS & CONTEXT--"),a(`

`),n("span",{class:"token keyword"},"const"),a(" canvas "),n("span",{class:"token operator"},"="),a(" document"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"createElement"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},"'canvas'"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
document`),n("span",{class:"token punctuation"},"."),a("body"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"appendChild"),n("span",{class:"token punctuation"},"("),a("canvas"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
`),n("span",{class:"token keyword"},"const"),a(" gl "),n("span",{class:"token operator"},"="),a(" canvas"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"getContext"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"webgl"'),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`

`),n("span",{class:"token comment"},"// --SIZING--"),a(`

`),n("span",{class:"token keyword"},"const"),a(" size "),n("span",{class:"token operator"},"="),a(),n("span",{class:"token punctuation"},"{"),a(`
  `),n("span",{class:"token literal-property property"},"width"),n("span",{class:"token operator"},":"),a(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),a(`
  `),n("span",{class:"token literal-property property"},"height"),n("span",{class:"token operator"},":"),a(),n("span",{class:"token number"},"1"),a(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},";"),a(`
`),n("span",{class:"token keyword"},"const"),a(" pixelRatio "),n("span",{class:"token operator"},"="),a(" window"),n("span",{class:"token punctuation"},"."),a("devicePixelRatio"),n("span",{class:"token punctuation"},";"),a(`

`),n("span",{class:"token keyword"},"const"),a(),n("span",{class:"token function-variable function"},"handleResize"),a(),n("span",{class:"token operator"},"="),a(),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},"entries"),n("span",{class:"token punctuation"},")"),a(),n("span",{class:"token operator"},"=>"),a(),n("span",{class:"token punctuation"},"{"),a(`
  `),n("span",{class:"token comment"},"// get canvas width & height"),a(`
  `),n("span",{class:"token keyword"},"const"),a(),n("span",{class:"token punctuation"},"{"),a(`
    `),n("span",{class:"token literal-property property"},"width"),n("span",{class:"token operator"},":"),a(" canvasWidth"),n("span",{class:"token punctuation"},","),a(`
    `),n("span",{class:"token literal-property property"},"height"),n("span",{class:"token operator"},":"),a(` canvasHeight
  `),n("span",{class:"token punctuation"},"}"),a(),n("span",{class:"token operator"},"="),a(" entries"),n("span",{class:"token punctuation"},"["),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},"."),a("contentRect"),n("span",{class:"token punctuation"},";"),a(`

  `),n("span",{class:"token comment"},"// set canvas size to display size multiplied by pixel ratio"),a(`
  canvas`),n("span",{class:"token punctuation"},"."),a("width "),n("span",{class:"token operator"},"="),a(" Math"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"round"),n("span",{class:"token punctuation"},"("),a("canvasWidth "),n("span",{class:"token operator"},"*"),a(" pixelRatio"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
  canvas`),n("span",{class:"token punctuation"},"."),a("height "),n("span",{class:"token operator"},"="),a(" Math"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"round"),n("span",{class:"token punctuation"},"("),a("canvasHeight "),n("span",{class:"token operator"},"*"),a(" pixelRatio"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`

  `),n("span",{class:"token comment"},"// set size variable to actual size of the current drawing buffer"),a(`
  size`),n("span",{class:"token punctuation"},"."),a("width "),n("span",{class:"token operator"},"="),a(" gl"),n("span",{class:"token punctuation"},"."),a("drawingBufferWidth"),n("span",{class:"token punctuation"},";"),a(`
  size`),n("span",{class:"token punctuation"},"."),a("height "),n("span",{class:"token operator"},"="),a(" gl"),n("span",{class:"token punctuation"},"."),a("drawingBufferHeight"),n("span",{class:"token punctuation"},";"),a(`
`),n("span",{class:"token punctuation"},"}"),a(`

`),n("span",{class:"token keyword"},"const"),a(" resizeObserver "),n("span",{class:"token operator"},"="),a(),n("span",{class:"token keyword"},"new"),a(),n("span",{class:"token class-name"},"ResizeObserver"),n("span",{class:"token punctuation"},"("),a("handleResize"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
resizeObserver`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"observe"),n("span",{class:"token punctuation"},"("),a("canvas"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`

`),n("span",{class:"token comment"},"// --CAMERA--"),a(`

`),n("span",{class:"token keyword"},"const"),a(" camera "),n("span",{class:"token operator"},"="),a(),n("span",{class:"token keyword"},"new"),a(),n("span",{class:"token class-name"},"Camera"),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"new"),a(),n("span",{class:"token class-name"},"PerspectiveLens"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
camera`),n("span",{class:"token punctuation"},"."),a("lens"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"setAutoFov"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"35.0"),a(),n("span",{class:"token operator"},"*"),a(),n("span",{class:"token punctuation"},"("),a("Math"),n("span",{class:"token punctuation"},"."),n("span",{class:"token constant"},"PI"),a(),n("span",{class:"token operator"},"/"),a(),n("span",{class:"token number"},"180.0"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(),n("span",{class:"token comment"},"// fov is in radians"),a(`
camera`),n("span",{class:"token punctuation"},"."),a("lens"),n("span",{class:"token punctuation"},"."),a("near "),n("span",{class:"token operator"},"="),a(),n("span",{class:"token number"},".01"),n("span",{class:"token punctuation"},";"),a(`
camera`),n("span",{class:"token punctuation"},"."),a("lens"),n("span",{class:"token punctuation"},"."),a("far "),n("span",{class:"token operator"},"="),a(),n("span",{class:"token number"},"50"),n("span",{class:"token punctuation"},";"),a(`
camera`),n("span",{class:"token punctuation"},"."),a("position"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"set"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"["),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"5"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(),n("span",{class:"token comment"},"// set camera back on z axis"),a(`
camera`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"lookAt"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"["),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(),n("span",{class:"token comment"},"// look at origin point"),a(`

`),n("span",{class:"token comment"},"// --LIGHTING--"),a(`

`),n("span",{class:"token comment"},"// create light setup"),a(`
`),n("span",{class:"token keyword"},"const"),a(" lightSetup "),n("span",{class:"token operator"},"="),a(),n("span",{class:"token keyword"},"new"),a(),n("span",{class:"token class-name"},"LightSetup"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
lightSetup`),n("span",{class:"token punctuation"},"."),a("bounds"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"fromMinMax"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"["),n("span",{class:"token operator"},"-"),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),n("span",{class:"token operator"},"-"),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),n("span",{class:"token operator"},"-"),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),n("span",{class:"token punctuation"},"["),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`

`),n("span",{class:"token comment"},"// create iblTexture"),a(`
`),n("span",{class:"token keyword"},"const"),a(" iblTexture "),n("span",{class:"token operator"},"="),a(),n("span",{class:"token keyword"},"new"),a(),n("span",{class:"token class-name"},"Texture2D"),n("span",{class:"token punctuation"},"("),a("gl"),n("span",{class:"token punctuation"},","),a(" gl"),n("span",{class:"token punctuation"},"."),n("span",{class:"token constant"},"RGBA"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
iblTexture`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"clamp"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`

`),n("span",{class:"token comment"},"// create ibl spherical harmonics data"),a(`
`),n("span",{class:"token keyword"},"const"),a(" iblSh "),n("span",{class:"token operator"},"="),a(),n("span",{class:"token keyword"},"new"),a(),n("span",{class:"token class-name"},"Float32Array"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"["),a(`
  `),n("span",{class:"token number"},"0.224084854125977"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.213043749332428"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.283314585685730"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token comment"},"// L00, irradiance, pre-scaled base"),a(`
  `),n("span",{class:"token number"},"0.100831791758537"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.124612621963024"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.204235553741455"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token comment"},"// L1-1, irradiance, pre-scaled base"),a(`
  `),n("span",{class:"token number"},"0.107245393097401"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.083322264254093"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.076212428510189"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token comment"},"// L10, irradiance, pre-scaled base"),a(`
  `),n("span",{class:"token number"},"0.144294798374176"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.106082014739513"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.089959740638733"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token comment"},"// L11, irradiance, pre-scaled base"),a(`
  `),n("span",{class:"token number"},"0.053996223956347"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.044765342026949"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.044178668409586"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token comment"},"// L2-2, irradiance, pre-scaled base"),a(`
  `),n("span",{class:"token number"},"0.025597579777241"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.024105755612254"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.027786524966359"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token comment"},"// L2-1, irradiance, pre-scaled base"),a(`
  `),n("span",{class:"token number"},"0.004080550745130"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.002261536428705"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token operator"},"-"),n("span",{class:"token number"},"0.000168046550243"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token comment"},"// L20, irradiance, pre-scaled base"),a(`
  `),n("span",{class:"token number"},"0.091950185596943"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.066512495279312"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.055933292955160"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token comment"},"// L21, irradiance, pre-scaled base"),a(`
  `),n("span",{class:"token number"},"0.051955129951239"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.036966290324926"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0.029668755829334"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token comment"},"// L22, irradiance, pre-scaled base"),a(`
`),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},")"),a(`

`),n("span",{class:"token comment"},"// create ibl light"),a(`
`),n("span",{class:"token keyword"},"const"),a(" ibl "),n("span",{class:"token operator"},"="),a(),n("span",{class:"token keyword"},"new"),a(),n("span",{class:"token class-name"},"Ibl"),n("span",{class:"token punctuation"},"("),a("iblTexture"),n("span",{class:"token punctuation"},","),a(" iblSh"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
ibl`),n("span",{class:"token punctuation"},"."),a("iblFormat "),n("span",{class:"token operator"},"="),a(),n("span",{class:"token string"},"'OCTA'"),n("span",{class:"token punctuation"},";"),a(`
ibl`),n("span",{class:"token punctuation"},"."),a("shFormat "),n("span",{class:"token operator"},"="),a(),n("span",{class:"token string"},"'SH9'"),n("span",{class:"token punctuation"},";"),a(`
ibl`),n("span",{class:"token punctuation"},"."),a("hdrEncoding "),n("span",{class:"token operator"},"="),a(),n("span",{class:"token string"},"'RGBM'"),n("span",{class:"token punctuation"},";"),a(`

`),n("span",{class:"token comment"},"// setup the image for the ibl texture"),a(`
`),n("span",{class:"token keyword"},"const"),a(" iblImg "),n("span",{class:"token operator"},"="),a(),n("span",{class:"token keyword"},"new"),a(),n("span",{class:"token class-name"},"Image"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
iblImg`),n("span",{class:"token punctuation"},"."),a("src "),n("span",{class:"token operator"},"="),a(" iblSrc"),n("span",{class:"token punctuation"},";"),a(`
`),n("span",{class:"token comment"},"// set texture data from image on load"),a(`
iblImg`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function-variable function"},"onload"),a(),n("span",{class:"token operator"},"="),a(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),a(),n("span",{class:"token operator"},"=>"),a(),n("span",{class:"token punctuation"},"{"),a(`
  iblTexture`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"fromImage"),n("span",{class:"token punctuation"},"("),a("iblImg"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
`),n("span",{class:"token punctuation"},"}"),a(`

`),n("span",{class:"token comment"},"// add ibl to light setup"),a(`
lightSetup`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"add"),n("span",{class:"token punctuation"},"("),a("ibl"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`

`),n("span",{class:"token comment"},"// --GLTF--"),a(`

`),n("span",{class:"token keyword"},"let"),a(" gltf "),n("span",{class:"token operator"},"="),a(),n("span",{class:"token keyword"},"null"),n("span",{class:"token punctuation"},";"),a(`

`),n("span",{class:"token comment"},"// load gltf from url"),a(`
GltfIO`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"loadGltf"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"../models/suzanne/Suzanne.gltf"'),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"then"),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"async"),a(),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},"loadedGltf"),n("span",{class:"token punctuation"},")"),a(),n("span",{class:"token operator"},"=>"),a(),n("span",{class:"token punctuation"},"{"),a(`
  gltf `),n("span",{class:"token operator"},"="),a(" loadedGltf"),n("span",{class:"token punctuation"},";"),a(`

  `),n("span",{class:"token comment"},"// link gltf to gl context"),a(`
  `),n("span",{class:"token keyword"},"await"),a(" gltf"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"allocate"),n("span",{class:"token punctuation"},"("),a("gl"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`

  `),n("span",{class:"token comment"},"// set gltf material light setup"),a(`
  `),n("span",{class:"token keyword"},"for"),a(),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"const"),a(" material "),n("span",{class:"token keyword"},"of"),a(" gltf"),n("span",{class:"token punctuation"},"."),a("materials"),n("span",{class:"token punctuation"},")"),a(),n("span",{class:"token punctuation"},"{"),a(`
    material`),n("span",{class:"token punctuation"},"."),a("materialPass"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"setLightSetup"),n("span",{class:"token punctuation"},"("),a("lightSetup"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
  `),n("span",{class:"token punctuation"},"}"),a(`

  `),n("span",{class:"token comment"},"// render only when the gltf is loaded and allocated"),a(`
  `),n("span",{class:"token function"},"render"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`

`),n("span",{class:"token comment"},"// --ANIMATION--"),a(`

`),n("span",{class:"token keyword"},"const"),a(),n("span",{class:"token function-variable function"},"animate"),a(),n("span",{class:"token operator"},"="),a(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),a(),n("span",{class:"token operator"},"=>"),a(),n("span",{class:"token punctuation"},"{"),a(`
  `),n("span",{class:"token comment"},"// get gltf root node"),a(`
  `),n("span",{class:"token keyword"},"const"),a(" node "),n("span",{class:"token operator"},"="),a(" gltf"),n("span",{class:"token punctuation"},"."),a("root"),n("span",{class:"token punctuation"},";"),a(`
  `),n("span",{class:"token comment"},"// rotate around X axis a little bit at each frame"),a(`
  node`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"rotateY"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"0.01"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
  `),n("span",{class:"token comment"},"// update world matrix"),a(`
  node`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"updateWorldMatrix"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
`),n("span",{class:"token punctuation"},"}"),a(`

`),n("span",{class:"token comment"},"// --RENDER--"),a(`

`),n("span",{class:"token keyword"},"const"),a(),n("span",{class:"token function-variable function"},"render"),a(),n("span",{class:"token operator"},"="),a(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),a(),n("span",{class:"token operator"},"=>"),a(),n("span",{class:"token punctuation"},"{"),a(`
  `),n("span",{class:"token function"},"animate"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`

  `),n("span",{class:"token comment"},"// setup viewport"),a(`
  gl`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"viewport"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),a(" size"),n("span",{class:"token punctuation"},"."),a("width"),n("span",{class:"token punctuation"},","),a(" size"),n("span",{class:"token punctuation"},"."),a("height"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
  gl`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"clearColor"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
  gl`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"clear"),n("span",{class:"token punctuation"},"("),a("gl"),n("span",{class:"token punctuation"},"."),n("span",{class:"token constant"},"COLOR_BUFFER_BIT"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
  
  `),n("span",{class:"token comment"},"// update camera matrices"),a(`
  camera`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"updateWorldMatrix"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
  camera`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"updateViewProjectionMatrix"),n("span",{class:"token punctuation"},"("),a("size"),n("span",{class:"token punctuation"},"."),a("width"),n("span",{class:"token punctuation"},","),a(" size"),n("span",{class:"token punctuation"},"."),a("height"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`

  `),n("span",{class:"token comment"},"// prepare light setup"),a(`
  lightSetup`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"prepare"),n("span",{class:"token punctuation"},"("),a("gl"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
  
  `),n("span",{class:"token comment"},"// render all gltf renderables (MeshRenderer)"),a(`
  `),n("span",{class:"token keyword"},"for"),a(),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"const"),a(" renderable "),n("span",{class:"token keyword"},"of"),a(" gltf"),n("span",{class:"token punctuation"},"."),a("renderables"),n("span",{class:"token punctuation"},")"),a(),n("span",{class:"token punctuation"},"{"),a(`
    `),n("span",{class:"token comment"},"// render each renderable by passing the gl context, the camera, the mask id (1 is Opaque), and the pass id ('color' by default)"),a(`
    renderable`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"render"),n("span",{class:"token punctuation"},"("),a("gl"),n("span",{class:"token punctuation"},","),a(" camera"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),a(),n("span",{class:"token string"},"'color'"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
  `),n("span",{class:"token punctuation"},"}"),a(`

  `),n("span",{class:"token function"},"requestAnimationFrame"),n("span",{class:"token punctuation"},"("),a("render"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),a(`
`),n("span",{class:"token punctuation"},"}"),a(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"js"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1706542918781-78472"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`import Camera from "nanogl-camera";
import PerspectiveLens from "nanogl-camera/perspective-lens";
import GltfIO from "nanogl-gltf/lib/io/web";
import LightSetup from "nanogl-pbr/lighting/LightSetup";
import Texture2D from "nanogl/texture-2d";
import Ibl from "nanogl-pbr/lighting/Ibl";
import iblSrc from "@assets/images/ibl.rgbm.png";

// --CANVAS & CONTEXT--

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const gl = canvas.getContext("webgl");

// --SIZING--

const size = {
  width: 1,
  height: 1
};
const pixelRatio = window.devicePixelRatio;

const handleResize = (entries) => {
  // get canvas width & height
  const {
    width: canvasWidth,
    height: canvasHeight
  } = entries[0].contentRect;

  // set canvas size to display size multiplied by pixel ratio
  canvas.width = Math.round(canvasWidth * pixelRatio);
  canvas.height = Math.round(canvasHeight * pixelRatio);

  // set size variable to actual size of the current drawing buffer
  size.width = gl.drawingBufferWidth;
  size.height = gl.drawingBufferHeight;
}

const resizeObserver = new ResizeObserver(handleResize);
resizeObserver.observe(canvas);

// --CAMERA--

const camera = new Camera(new PerspectiveLens());
camera.lens.setAutoFov(35.0 * (Math.PI / 180.0)); // fov is in radians
camera.lens.near = .01;
camera.lens.far = 50;
camera.position.set([0, 0, 5]); // set camera back on z axis
camera.lookAt([0, 0, 0]); // look at origin point

// --LIGHTING--

// create light setup
const lightSetup = new LightSetup();
lightSetup.bounds.fromMinMax([-1,-1,-1],[1,1,1]);

// create iblTexture
const iblTexture = new Texture2D(gl, gl.RGBA);
iblTexture.clamp();

// create ibl spherical harmonics data
const iblSh = new Float32Array([
  0.224084854125977, 0.213043749332428, 0.283314585685730, // L00, irradiance, pre-scaled base
  0.100831791758537, 0.124612621963024, 0.204235553741455, // L1-1, irradiance, pre-scaled base
  0.107245393097401, 0.083322264254093, 0.076212428510189, // L10, irradiance, pre-scaled base
  0.144294798374176, 0.106082014739513, 0.089959740638733, // L11, irradiance, pre-scaled base
  0.053996223956347, 0.044765342026949, 0.044178668409586, // L2-2, irradiance, pre-scaled base
  0.025597579777241, 0.024105755612254, 0.027786524966359, // L2-1, irradiance, pre-scaled base
  0.004080550745130, 0.002261536428705, -0.000168046550243, // L20, irradiance, pre-scaled base
  0.091950185596943, 0.066512495279312, 0.055933292955160, // L21, irradiance, pre-scaled base
  0.051955129951239, 0.036966290324926, 0.029668755829334, // L22, irradiance, pre-scaled base
])

// create ibl light
const ibl = new Ibl(iblTexture, iblSh);
ibl.iblFormat = 'OCTA';
ibl.shFormat = 'SH9';
ibl.hdrEncoding = 'RGBM';

// setup the image for the ibl texture
const iblImg = new Image();
iblImg.src = iblSrc;
// set texture data from image on load
iblImg.onload = () => {
  iblTexture.fromImage(iblImg);
}

// add ibl to light setup
lightSetup.add(ibl);

// --GLTF--

let gltf = null;

// load gltf from url
GltfIO.loadGltf("../models/suzanne/Suzanne.gltf").then(async (loadedGltf) => {
  gltf = loadedGltf;

  // link gltf to gl context
  await gltf.allocate(gl);

  // set gltf material light setup
  for (const material of gltf.materials) {
    material.materialPass.setLightSetup(lightSetup);
  }

  // render only when the gltf is loaded and allocated
  render();
});

// --ANIMATION--

const animate = () => {
  // get gltf root node
  const node = gltf.root;
  // rotate around X axis a little bit at each frame
  node.rotateY(0.01);
  // update world matrix
  node.updateWorldMatrix();
}

// --RENDER--

const render = () => {
  animate();

  // setup viewport
  gl.viewport(0, 0, size.width, size.height);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  
  // update camera matrices
  camera.updateWorldMatrix();
  camera.updateViewProjectionMatrix(size.width, size.height);

  // prepare light setup
  lightSetup.prepare(gl);
  
  // render all gltf renderables (MeshRenderer)
  for (const renderable of gltf.renderables) {
    // render each renderable by passing the gl context, the camera, the mask id (1 is Opaque), and the pass id ('color' by default)
    renderable.render(gl, camera, 1, 'color');
  }

  requestAnimationFrame(render);
}
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1706542918781-78472","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),$=l('<div class="toc-wrapper"><p><div class="toc"><h2 class="my-8 toc-header">Summary</h2><ul><li><a href="#loading-a-file">Loading a file</a></li><li><a href="#render-the-model">Render the model</a></li><li><a href="#add-lights">Add lights</a></li><li><a href="#add-some-movement">Add some movement</a></li><li><a href="#result">Result</a></li><li><a href="#final-code">Final code</a></li></ul></div></p></div>',1),D={class:"nav-wrapper"},H={__name:"load-gltf",setup(W,{expose:p}){return p({frontmatter:{}}),(U,q)=>{const i=r,e=u,o=m("RouterLink");return k(),d("div",g,[n("div",b,[h,f,t(i,{type:"info"},{default:s(()=>[y]),_:1}),w,x,v,_,C,I,t(e,{name:"load-gltf-model",folder:"guide"}),L,S,T,A,G,R,j,z,F,M,O,E,t(e,{name:"load-gltf-model-lights",folder:"guide"}),N,B,P]),$,n("div",D,[t(o,{to:"/guide/getting-started/add-movement",class:"prev"},{default:s(()=>[a("Add some movement")]),_:1}),t(o,{to:"/guide/getting-started/full-screen-shader",class:"next"},{default:s(()=>[a("Full-screen shader")]),_:1})])])}}};typeof c=="function"&&c(H);export{H as default};
