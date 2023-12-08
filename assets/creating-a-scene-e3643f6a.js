import{_ as l}from"./GLPreview.vue_vue_type_script_setup_true_lang-9efed6ac.js";import{_ as r}from"./UICallout.vue_vue_type_script_setup_true_lang-751fca1f.js";import{b as c}from"./route-block-83d24a4e.js";import{A as u,K as d,H as n,I as a,M as s,P as t,Q as k,G as m}from"./runtime-core.esm-bundler-6b582627.js";import"./index-0232750d.js";const h={class:"markdown-body"},y={class:"content-wrapper"},g=n("h1",{id:"creating-a-scene",tabindex:"-1"},"Creating a scene",-1),f=n("p",null,"Let’s begin by creating a simple scene, rendering a triangle.",-1),w=n("p",null,[n("strong",null,"Note :"),t(" You will need to install some libraries for this guide. All the imports are specified in the code samples, so please install the packages when you see an import for a lib that you do not already have installed.")],-1),v=n("h2",{id:"setup-canvas-context",tabindex:"-1"},"Setup the canvas & context",-1),b=n("p",null,[n("strong",null,"Important :"),t(" This part is necessary for every article in the "),n("em",null,"Getting Started"),t(" guide. The code will be used as the base for all the other articles.")],-1),_=n("p",null,"We can start by setting up the canvas & context. This is not specific to nanogl, you can do this as you would in your usual WebGL project.",-1),C=n("p",null,"First, in a Javascript file, we need to create the canvas in which we will render our WebGL project, and get the WebGL rendering context.",-1),x=n("pre",{class:"language-js"},[n("code",{class:"language-js"},[n("span",{class:"token keyword"},"const"),t(" canvas "),n("span",{class:"token operator"},"="),t(" document"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"createElement"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},"'canvas'"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
document`),n("span",{class:"token punctuation"},"."),t("body"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"appendChild"),n("span",{class:"token punctuation"},"("),t("canvas"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token keyword"},"const"),t(" gl "),n("span",{class:"token operator"},"="),t(" canvas"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"getContext"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"webgl"'),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"js"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1702057368220-13999"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

const gl = canvas.getContext("webgl");
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1702057368220-13999","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),P=n("p",null,"In our CSS, we can make our canvas full-screen.",-1),z=n("pre",{class:"language-css"},[n("code",{class:"language-css"},[n("span",{class:"token selector"},"canvas"),t(),n("span",{class:"token punctuation"},"{"),t(`
  `),n("span",{class:"token property"},"width"),n("span",{class:"token punctuation"},":"),t(" 100vw"),n("span",{class:"token punctuation"},";"),t(`
  `),n("span",{class:"token property"},"height"),n("span",{class:"token punctuation"},":"),t(" 100vh"),n("span",{class:"token punctuation"},";"),t(`
  `),n("span",{class:"token property"},"position"),n("span",{class:"token punctuation"},":"),t(" absolute"),n("span",{class:"token punctuation"},";"),t(`
  `),n("span",{class:"token property"},"top"),n("span",{class:"token punctuation"},":"),t(" 0"),n("span",{class:"token punctuation"},";"),t(`
  `),n("span",{class:"token property"},"left"),n("span",{class:"token punctuation"},":"),t(" 0"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token punctuation"},"}"),t(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"css"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1702057368221-45887"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`canvas {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
}
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1702057368221-45887","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),j=n("p",null,"Then, we need to handle the canvas sizing.",-1),R=n("pre",{class:"language-js"},[n("code",{class:"language-js"},[n("span",{class:"token comment"},"// ..."),t(`

`),n("span",{class:"token keyword"},"const"),t(" size "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token punctuation"},"{"),t(`
  `),n("span",{class:"token literal-property property"},"width"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),t(`
  `),n("span",{class:"token literal-property property"},"height"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token number"},"1"),t(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token keyword"},"const"),t(" pixelRatio "),n("span",{class:"token operator"},"="),t(" window"),n("span",{class:"token punctuation"},"."),t("devicePixelRatio"),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token keyword"},"const"),t(),n("span",{class:"token function-variable function"},"handleResize"),t(),n("span",{class:"token operator"},"="),t(),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},"entries"),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token operator"},"=>"),t(),n("span",{class:"token punctuation"},"{"),t(`
  `),n("span",{class:"token comment"},"// get canvas width & height"),t(`
  `),n("span",{class:"token keyword"},"const"),t(),n("span",{class:"token punctuation"},"{"),t(`
    `),n("span",{class:"token literal-property property"},"width"),n("span",{class:"token operator"},":"),t(" canvasWidth"),n("span",{class:"token punctuation"},","),t(`
    `),n("span",{class:"token literal-property property"},"height"),n("span",{class:"token operator"},":"),t(` canvasHeight
  `),n("span",{class:"token punctuation"},"}"),t(),n("span",{class:"token operator"},"="),t(" entries"),n("span",{class:"token punctuation"},"["),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},"."),t("contentRect"),n("span",{class:"token punctuation"},";"),t(`

  `),n("span",{class:"token comment"},"// set canvas size to display size multiplied by pixel ratio"),t(`
  canvas`),n("span",{class:"token punctuation"},"."),t("width "),n("span",{class:"token operator"},"="),t(" Math"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"round"),n("span",{class:"token punctuation"},"("),t("canvasWidth "),n("span",{class:"token operator"},"*"),t(" pixelRatio"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  canvas`),n("span",{class:"token punctuation"},"."),t("height "),n("span",{class:"token operator"},"="),t(" Math"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"round"),n("span",{class:"token punctuation"},"("),t("canvasHeight "),n("span",{class:"token operator"},"*"),t(" pixelRatio"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

  `),n("span",{class:"token comment"},"// set size variable to actual size of the current drawing buffer"),t(`
  size`),n("span",{class:"token punctuation"},"."),t("width "),n("span",{class:"token operator"},"="),t(" gl"),n("span",{class:"token punctuation"},"."),t("drawingBufferWidth"),n("span",{class:"token punctuation"},";"),t(`
  size`),n("span",{class:"token punctuation"},"."),t("height "),n("span",{class:"token operator"},"="),t(" gl"),n("span",{class:"token punctuation"},"."),t("drawingBufferHeight"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token punctuation"},"}"),t(`

`),n("span",{class:"token keyword"},"const"),t(" resizeObserver "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token keyword"},"new"),t(),n("span",{class:"token class-name"},"ResizeObserver"),n("span",{class:"token punctuation"},"("),t("handleResize"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
resizeObserver`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"observe"),n("span",{class:"token punctuation"},"("),t("canvas"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"js"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1702057368222-51346"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`// ...

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
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1702057368222-51346","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),A=n("h2",{id:"create-the-camera",tabindex:"-1"},"Create the camera",-1),F=n("p",null,[t("Now we can create the "),n("a",{href:"/api/nanogl-camera/classes/Camera"},"Camera"),t(". We will use a "),n("a",{href:"/api/nanogl-camera/classes/PerspectiveLens"},"PerspectiveLens"),t(", but you can also choose an "),n("a",{href:"/api/nanogl-camera/classes/OrthographicLens"},"OrthographicLens"),t(".")],-1),T=n("p",null,"We’ll set some parameters too : the FOV, the near & far planes, the position & the rotation.",-1),B=n("pre",{class:"language-js"},[n("code",{class:"language-js"},[n("span",{class:"token keyword"},"import"),t(" Camera "),n("span",{class:"token keyword"},"from"),t(),n("span",{class:"token string"},'"nanogl-camera"'),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token keyword"},"import"),t(" PerspectiveLens "),n("span",{class:"token keyword"},"from"),t(),n("span",{class:"token string"},'"nanogl-camera/perspective-lens"'),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token comment"},"// ..."),t(`

`),n("span",{class:"token keyword"},"const"),t(" camera "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token keyword"},"new"),t(),n("span",{class:"token class-name"},"Camera"),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"new"),t(),n("span",{class:"token class-name"},"PerspectiveLens"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
camera`),n("span",{class:"token punctuation"},"."),t("lens"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"setAutoFov"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"35.0"),t(),n("span",{class:"token operator"},"*"),t(),n("span",{class:"token punctuation"},"("),t("Math"),n("span",{class:"token punctuation"},"."),n("span",{class:"token constant"},"PI"),t(),n("span",{class:"token operator"},"/"),t(),n("span",{class:"token number"},"180.0"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(),n("span",{class:"token comment"},"// fov is in radians"),t(`
camera`),n("span",{class:"token punctuation"},"."),t("lens"),n("span",{class:"token punctuation"},"."),t("near "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token number"},".01"),n("span",{class:"token punctuation"},";"),t(`
camera`),n("span",{class:"token punctuation"},"."),t("lens"),n("span",{class:"token punctuation"},"."),t("far "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token number"},"50"),n("span",{class:"token punctuation"},";"),t(`
camera`),n("span",{class:"token punctuation"},"."),t("position"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"set"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"["),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"5"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(),n("span",{class:"token comment"},"// set camera back on z axis"),t(`
camera`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"lookAt"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"["),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(),n("span",{class:"token comment"},"// look at origin point"),t(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"js"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1702057368223-6974"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`import Camera from "nanogl-camera";
import PerspectiveLens from "nanogl-camera/perspective-lens";

// ...

const camera = new Camera(new PerspectiveLens());
camera.lens.setAutoFov(35.0 * (Math.PI / 180.0)); // fov is in radians
camera.lens.near = .01;
camera.lens.far = 50;
camera.position.set([0, 0, 5]); // set camera back on z axis
camera.lookAt([0, 0, 0]); // look at origin point
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1702057368223-6974","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),I=n("h2",{id:"create-the-shape",tabindex:"-1"},"Create the shape",-1),E=n("p",null,"Next, we can create the shape we want to render. To keep things simple, we’ll create a triangle.",-1),N=n("p",null,[t("Let’s create an "),n("a",{href:"/api/nanogl/classes/ArrayBuffer"},"ArrayBuffer"),t(", with the information we need for each vertice of our triangle. For this example, we only need the position attribute. In other cases, we might need the uvs too, for example.")],-1),$=n("pre",{class:"language-js"},[n("code",{class:"language-js"},[n("span",{class:"token comment"},"// ..."),t(`

`),n("span",{class:"token keyword"},"import"),t(" ArrayBuffer "),n("span",{class:"token keyword"},"from"),t(),n("span",{class:"token string"},'"nanogl/arraybuffer"'),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token comment"},"// ..."),t(`

`),n("span",{class:"token comment"},"// simple triangle with vec2 position"),t(`
`),n("span",{class:"token keyword"},"const"),t(" shapeVertices "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token keyword"},"new"),t(),n("span",{class:"token class-name"},"Float32Array"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"["),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token keyword"},"const"),t(" shape "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token keyword"},"new"),t(),n("span",{class:"token class-name"},"ArrayBuffer"),n("span",{class:"token punctuation"},"("),t("gl"),n("span",{class:"token punctuation"},","),t(" shapeVertices"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token comment"},"// declare aPosition attribute as vec2"),t(`
shape`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"attrib"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},"'aPosition'"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"2"),n("span",{class:"token punctuation"},","),t(" gl"),n("span",{class:"token punctuation"},"."),n("span",{class:"token constant"},"FLOAT"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"js"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1702057368223-31496"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`// ...

import ArrayBuffer from "nanogl/arraybuffer";

// ...

// simple triangle with vec2 position
const shapeVertices = new Float32Array([1, 0, 0, 0, 0, 1]);
const shape = new ArrayBuffer(gl, shapeVertices);

// declare aPosition attribute as vec2
shape.attrib('aPosition', 2, gl.FLOAT);
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1702057368223-31496","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),M=n("p",null,[t("Based on this example, you could create any shape you want by providing the wanted shape’s vertices data & the indices data if needed (with an "),n("a",{href:"/api/nanogl/classes/IndexBuffer"},"IndexBuffer"),t(").")],-1),S=n("h2",{id:"create-the-program",tabindex:"-1"},"Create the program",-1),O=n("p",null,[t("Now, we need to create the "),n("a",{href:"/api/nanogl/classes/Program"},"Program"),t(", with the shader we want to use to render our shape.")],-1),V=n("p",null,"Let’s start with the shader.",-1),L=n("h3",{id:"vertex-shader",tabindex:"-1"},"Vertex shader",-1),W=n("p",null,"Our vertex shader is simple. We only need to calculate the vertex position with the position attribute and the model view projection.",-1),D=n("pre",{class:"language-glsl"},[n("code",{class:"language-glsl"},[n("span",{class:"token keyword"},"attribute"),t(),n("span",{class:"token keyword"},"vec2"),t(" aPosition"),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token keyword"},"uniform"),t(),n("span",{class:"token keyword"},"mat4"),t(" uMVP"),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token keyword"},"void"),t(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"void"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"{"),t(`
  `),n("span",{class:"token keyword"},"vec4"),t(" pos "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token keyword"},"vec4"),n("span",{class:"token punctuation"},"("),t("aPosition"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0.0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"1.0"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  gl_Position `),n("span",{class:"token operator"},"="),t(" uMVP "),n("span",{class:"token operator"},"*"),t(" pos"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token punctuation"},"}"),t(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"glsl"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1702057368223-29671"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`attribute vec2 aPosition;

uniform mat4 uMVP;

void main(void){
  vec4 pos = vec4(aPosition, 0.0, 1.0);
  gl_Position = uMVP * pos;
}
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1702057368223-29671","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),H=n("h3",{id:"fragment-shader",tabindex:"-1"},"Fragment shader",-1),G=n("p",null,"We only want to draw the triangle with one color, so let’s set the frag color to red.",-1),U=n("pre",{class:"language-glsl"},[n("code",{class:"language-glsl"},[n("span",{class:"token keyword"},"precision"),t(),n("span",{class:"token keyword"},"lowp"),t(),n("span",{class:"token keyword"},"float"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token keyword"},"void"),t(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"void"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"{"),t(`
  `),n("span",{class:"token keyword"},"vec3"),t(" red "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token keyword"},"vec3"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"1.0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0.0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0.0"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  gl_FragColor `),n("span",{class:"token operator"},"="),t(),n("span",{class:"token keyword"},"vec4"),n("span",{class:"token punctuation"},"("),t("red"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"1.0"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token punctuation"},"}"),t(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"glsl"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1702057368223-11982"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`precision lowp float;
void main(void){
  vec3 red = vec3(1.0, 0.0, 0.0);
  gl_FragColor = vec4(red, 1.0);
}
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1702057368223-11982","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),X=n("h3",{id:"program",tabindex:"-1"},"Program",-1),Z=n("p",null,"If your project is setup to do that, you can import your glsl files as strings and use them to create the program.",-1),J=n("pre",{class:"language-js"},[n("code",{class:"language-js"},[n("span",{class:"token comment"},"// ..."),t(`

`),n("span",{class:"token keyword"},"import"),t(" Program "),n("span",{class:"token keyword"},"from"),t(),n("span",{class:"token string"},'"nanogl/program"'),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token keyword"},"import"),t(" vertexShader "),n("span",{class:"token keyword"},"from"),t(),n("span",{class:"token string"},"'./shader.vert'"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token keyword"},"import"),t(" fragmentShader "),n("span",{class:"token keyword"},"from"),t(),n("span",{class:"token string"},"'./shader.frag'"),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token comment"},"// ..."),t(`

`),n("span",{class:"token keyword"},"const"),t(" prg "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token keyword"},"new"),t(),n("span",{class:"token class-name"},"Program"),n("span",{class:"token punctuation"},"("),t("gl"),n("span",{class:"token punctuation"},","),t(" vertexShader"),n("span",{class:"token punctuation"},","),t(" fragmentShader"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"js"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1702057368223-9376"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`// ...

import Program from "nanogl/program";

import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

// ...

const prg = new Program(gl, vertexShader, fragmentShader);
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1702057368223-9376","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),K=n("p",null,"If not, you can directly put the shader code as string literals.",-1),Q=n("pre",{class:"language-js"},[n("code",{class:"language-js"},[n("span",{class:"token comment"},"// ..."),t(`

`),n("span",{class:"token keyword"},"import"),t(" Program "),n("span",{class:"token keyword"},"from"),t(),n("span",{class:"token string"},'"nanogl/program"'),t(`

`),n("span",{class:"token comment"},"// ..."),t(`

`),n("span",{class:"token keyword"},"const"),t(" vertexShader "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token template-string"},[n("span",{class:"token template-punctuation string"},"`"),n("span",{class:"token string"},`
  // vertex shader code
`),n("span",{class:"token template-punctuation string"},"`")]),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token keyword"},"const"),t(" fragmentShader "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token template-string"},[n("span",{class:"token template-punctuation string"},"`"),n("span",{class:"token string"},`
  // fragment shader code
`),n("span",{class:"token template-punctuation string"},"`")]),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token keyword"},"const"),t(" prg "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token keyword"},"new"),t(),n("span",{class:"token class-name"},"Program"),n("span",{class:"token punctuation"},"("),t("gl"),n("span",{class:"token punctuation"},","),t(" vertexShader"),n("span",{class:"token punctuation"},","),t(" fragmentShader"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"js"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1702057368223-75253"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`// ...

import Program from "nanogl/program"

// ...

const vertexShader = \`
  // vertex shader code
\`;
const fragmentShader = \`
  // fragment shader code
\`;

const prg = new Program(gl, vertexShader, fragmentShader);
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1702057368223-75253","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),Y=n("h2",{id:"draw-the-shape",tabindex:"-1"},"Draw the shape",-1),q=n("p",null,"Finally, let’s create a render function and call it.",-1),nn=n("ul",null,[n("li",null,"First, we need to set the viewport size & clear the viewport."),n("li",null,"Then we’ll update the camera world matrix & view projection matrix."),n("li",null,"Then we’ll update the program uniforms."),n("li",null,"And finally we can link the shape buffer to the program, and draw the triangle.")],-1),tn=n("pre",{class:"language-js"},[n("code",{class:"language-js"},[n("span",{class:"token comment"},"// ..."),t(`

`),n("span",{class:"token keyword"},"import"),t(),n("span",{class:"token punctuation"},"{"),t(" mat4 "),n("span",{class:"token punctuation"},"}"),t(),n("span",{class:"token keyword"},"from"),t(),n("span",{class:"token string"},"'gl-matrix'"),t(`

`),n("span",{class:"token comment"},"// ..."),t(`

`),n("span",{class:"token keyword"},"const"),t(),n("span",{class:"token function-variable function"},"render"),t(),n("span",{class:"token operator"},"="),t(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token operator"},"=>"),t(),n("span",{class:"token punctuation"},"{"),t(`
  `),n("span",{class:"token comment"},"// set viewport size"),t(`
  gl`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"viewport"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(" size"),n("span",{class:"token punctuation"},"."),t("width"),n("span",{class:"token punctuation"},","),t(" size"),n("span",{class:"token punctuation"},"."),t("height"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  `),n("span",{class:"token comment"},"// clear viewport"),t(`
  gl`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"clearColor"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  gl`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"clear"),n("span",{class:"token punctuation"},"("),t("gl"),n("span",{class:"token punctuation"},"."),n("span",{class:"token constant"},"COLOR_BUFFER_BIT"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

  `),n("span",{class:"token comment"},"// update camera matrices"),t(`
  camera`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"updateWorldMatrix"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  camera`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"updateViewProjectionMatrix"),n("span",{class:"token punctuation"},"("),t("size"),n("span",{class:"token punctuation"},"."),t("width"),n("span",{class:"token punctuation"},","),t(" size"),n("span",{class:"token punctuation"},"."),t("height"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

  `),n("span",{class:"token comment"},"// bind program"),t(`
  prg`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"use"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  `),n("span",{class:"token comment"},"// update program uniforms"),t(`
  prg`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"uMVP"),n("span",{class:"token punctuation"},"("),t("camera"),n("span",{class:"token punctuation"},"."),t("_viewProj"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

  `),n("span",{class:"token comment"},"// link the shape buffer to the program, and draw"),t(`
  shape`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"attribPointer"),n("span",{class:"token punctuation"},"("),t("prg"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  shape`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"drawTriangles"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token punctuation"},"}"),t(`

`),n("span",{class:"token function"},"render"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"js"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1702057368223-59350"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`// ...

import { mat4 } from 'gl-matrix'

// ...

const render = () => {
  // set viewport size
  gl.viewport(0, 0, size.width, size.height);
  // clear viewport
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // update camera matrices
  camera.updateWorldMatrix();
  camera.updateViewProjectionMatrix(size.width, size.height);

  // bind program
  prg.use();
  // update program uniforms
  prg.uMVP(camera._viewProj);

  // link the shape buffer to the program, and draw
  shape.attribPointer(prg);
  shape.drawTriangles();
}

render();
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1702057368223-59350","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),an=n("p",null,"Let’s also call the render function when the canvas is resized, to adapt the render to the new size.",-1),sn=n("p",null,[n("strong",null,"Note :"),t(" We will only call a render on resize here because the render is static. When the render is updated on each frame, it is not useful.")],-1),en=n("pre",{class:"language-js"},[n("code",{class:"language-js"},[n("span",{class:"token comment"},"// ..."),t(`

`),n("span",{class:"token keyword"},"const"),t(),n("span",{class:"token function-variable function"},"handleResize"),t(),n("span",{class:"token operator"},"="),t(),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},"entries"),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token operator"},"=>"),t(),n("span",{class:"token punctuation"},"{"),t(`
  `),n("span",{class:"token comment"},"// ..."),t(`

  `),n("span",{class:"token comment"},"// the render is static,"),t(`
  `),n("span",{class:"token comment"},"// so let's update it on resize"),t(`
  `),n("span",{class:"token function"},"render"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token punctuation"},"}"),t(`

`),n("span",{class:"token comment"},"// ..."),t(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"js"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1702057368224-93859"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`// ...

const handleResize = (entries) => {
  // ...

  // the render is static,
  // so let's update it on resize
  render();
}

// ...
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1702057368224-93859","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),on=n("h2",{id:"result",tabindex:"-1"},"Result",-1),cn=n("p",null,"And now we can see a red triangle in the middle of the canvas !",-1),pn=n("h2",{id:"final-code",tabindex:"-1"},"Final code",-1),ln=n("p",null,"Here is the complete code for the js file :",-1),rn=n("pre",{class:"language-js"},[n("code",{class:"language-js"},[n("span",{class:"token keyword"},"import"),t(" Node "),n("span",{class:"token keyword"},"from"),t(),n("span",{class:"token string"},'"nanogl-node"'),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token keyword"},"import"),t(" Camera "),n("span",{class:"token keyword"},"from"),t(),n("span",{class:"token string"},'"nanogl-camera"'),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token keyword"},"import"),t(" Program "),n("span",{class:"token keyword"},"from"),t(),n("span",{class:"token string"},'"nanogl/program"'),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token keyword"},"import"),t(" ArrayBuffer "),n("span",{class:"token keyword"},"from"),t(),n("span",{class:"token string"},'"nanogl/arraybuffer"'),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token keyword"},"import"),t(" PerspectiveLens "),n("span",{class:"token keyword"},"from"),t(),n("span",{class:"token string"},'"nanogl-camera/perspective-lens"'),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token keyword"},"import"),t(),n("span",{class:"token punctuation"},"{"),t(" mat4 "),n("span",{class:"token punctuation"},"}"),t(),n("span",{class:"token keyword"},"from"),t(),n("span",{class:"token string"},'"gl-matrix"'),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token comment"},"// --CANVAS & CONTEXT--"),t(`

`),n("span",{class:"token keyword"},"const"),t(" canvas "),n("span",{class:"token operator"},"="),t(" document"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"createElement"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},"'canvas'"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
document`),n("span",{class:"token punctuation"},"."),t("body"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"appendChild"),n("span",{class:"token punctuation"},"("),t("canvas"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token keyword"},"const"),t(" gl "),n("span",{class:"token operator"},"="),t(" canvas"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"getContext"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"webgl"'),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token comment"},"// --SIZING--"),t(`

`),n("span",{class:"token keyword"},"const"),t(" size "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token punctuation"},"{"),t(`
  `),n("span",{class:"token literal-property property"},"width"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),t(`
  `),n("span",{class:"token literal-property property"},"height"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token number"},"1"),t(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token keyword"},"const"),t(" pixelRatio "),n("span",{class:"token operator"},"="),t(" window"),n("span",{class:"token punctuation"},"."),t("devicePixelRatio"),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token keyword"},"const"),t(),n("span",{class:"token function-variable function"},"handleResize"),t(),n("span",{class:"token operator"},"="),t(),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},"entries"),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token operator"},"=>"),t(),n("span",{class:"token punctuation"},"{"),t(`
  `),n("span",{class:"token comment"},"// get canvas width & height"),t(`
  `),n("span",{class:"token keyword"},"const"),t(),n("span",{class:"token punctuation"},"{"),t(`
    `),n("span",{class:"token literal-property property"},"width"),n("span",{class:"token operator"},":"),t(" canvasWidth"),n("span",{class:"token punctuation"},","),t(`
    `),n("span",{class:"token literal-property property"},"height"),n("span",{class:"token operator"},":"),t(` canvasHeight
  `),n("span",{class:"token punctuation"},"}"),t(),n("span",{class:"token operator"},"="),t(" entries"),n("span",{class:"token punctuation"},"["),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},"."),t("contentRect"),n("span",{class:"token punctuation"},";"),t(`

  `),n("span",{class:"token comment"},"// set canvas size to display size multiplied by pixel ratio"),t(`
  canvas`),n("span",{class:"token punctuation"},"."),t("width "),n("span",{class:"token operator"},"="),t(" Math"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"round"),n("span",{class:"token punctuation"},"("),t("canvasWidth "),n("span",{class:"token operator"},"*"),t(" pixelRatio"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  canvas`),n("span",{class:"token punctuation"},"."),t("height "),n("span",{class:"token operator"},"="),t(" Math"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"round"),n("span",{class:"token punctuation"},"("),t("canvasHeight "),n("span",{class:"token operator"},"*"),t(" pixelRatio"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

  `),n("span",{class:"token comment"},"// set size variable to actual size of the current drawing buffer"),t(`
  size`),n("span",{class:"token punctuation"},"."),t("width "),n("span",{class:"token operator"},"="),t(" gl"),n("span",{class:"token punctuation"},"."),t("drawingBufferWidth"),n("span",{class:"token punctuation"},";"),t(`
  size`),n("span",{class:"token punctuation"},"."),t("height "),n("span",{class:"token operator"},"="),t(" gl"),n("span",{class:"token punctuation"},"."),t("drawingBufferHeight"),n("span",{class:"token punctuation"},";"),t(`

  `),n("span",{class:"token comment"},"// as we are not updating the render,"),t(`
  `),n("span",{class:"token comment"},"// let's render when the canvas is resized"),t(`
  `),n("span",{class:"token function"},"render"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token punctuation"},"}"),t(`

`),n("span",{class:"token keyword"},"const"),t(" resizeObserver "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token keyword"},"new"),t(),n("span",{class:"token class-name"},"ResizeObserver"),n("span",{class:"token punctuation"},"("),t("handleResize"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
resizeObserver`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"observe"),n("span",{class:"token punctuation"},"("),t("canvas"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token comment"},"// --CAMERA--"),t(`

`),n("span",{class:"token keyword"},"const"),t(" camera "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token keyword"},"new"),t(),n("span",{class:"token class-name"},"Camera"),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"new"),t(),n("span",{class:"token class-name"},"PerspectiveLens"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
camera`),n("span",{class:"token punctuation"},"."),t("lens"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"setAutoFov"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"35.0"),t(),n("span",{class:"token operator"},"*"),t(),n("span",{class:"token punctuation"},"("),t("Math"),n("span",{class:"token punctuation"},"."),n("span",{class:"token constant"},"PI"),t(),n("span",{class:"token operator"},"/"),t(),n("span",{class:"token number"},"180.0"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(),n("span",{class:"token comment"},"// fov is in radians"),t(`
camera`),n("span",{class:"token punctuation"},"."),t("lens"),n("span",{class:"token punctuation"},"."),t("near "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token number"},".01"),n("span",{class:"token punctuation"},";"),t(`
camera`),n("span",{class:"token punctuation"},"."),t("lens"),n("span",{class:"token punctuation"},"."),t("far "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token number"},"50"),n("span",{class:"token punctuation"},";"),t(`
camera`),n("span",{class:"token punctuation"},"."),t("position"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"set"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"["),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"5"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(),n("span",{class:"token comment"},"// set camera back on z axis"),t(`
camera`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"lookAt"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"["),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(),n("span",{class:"token comment"},"// look at origin point"),t(`

`),n("span",{class:"token comment"},"// --BUFFER--"),t(`

`),n("span",{class:"token comment"},"// simple triangle with vec2 position"),t(`
`),n("span",{class:"token keyword"},"const"),t(" shapeVertices "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token keyword"},"new"),t(),n("span",{class:"token class-name"},"Float32Array"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"["),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token keyword"},"const"),t(" shape "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token keyword"},"new"),t(),n("span",{class:"token class-name"},"ArrayBuffer"),n("span",{class:"token punctuation"},"("),t("gl"),n("span",{class:"token punctuation"},","),t(" shapeVertices"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token comment"},"// declare aPosition attribute as vec2"),t(`
shape`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"attrib"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},"'aPosition'"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"2"),n("span",{class:"token punctuation"},","),t(" gl"),n("span",{class:"token punctuation"},"."),n("span",{class:"token constant"},"FLOAT"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token comment"},"// --PROGRAM--"),t(`

`),n("span",{class:"token keyword"},"const"),t(" vertexShader "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token template-string"},[n("span",{class:"token template-punctuation string"},"`"),n("span",{class:"token string"},`
  attribute vec2 aPosition;

  uniform mat4 uMVP;

  void main(void){
    vec4 pos = vec4(aPosition, 0.0, 1.0);
    gl_Position = uMVP * pos;
  }
`),n("span",{class:"token template-punctuation string"},"`")]),t(`
`),n("span",{class:"token keyword"},"const"),t(" fragmentShader "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token template-string"},[n("span",{class:"token template-punctuation string"},"`"),n("span",{class:"token string"},`
  precision lowp float;
  void main(void){
    vec3 red = vec3(1.0, 0.0, 0.0);
    gl_FragColor = vec4(red, 1.0);
  }
`),n("span",{class:"token template-punctuation string"},"`")]),t(`

`),n("span",{class:"token keyword"},"const"),t(" prg "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token keyword"},"new"),t(),n("span",{class:"token class-name"},"Program"),n("span",{class:"token punctuation"},"("),t("gl"),n("span",{class:"token punctuation"},","),t(" vertexShader"),n("span",{class:"token punctuation"},","),t(" fragmentShader"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token comment"},"// --RENDER--"),t(`

`),n("span",{class:"token keyword"},"const"),t(),n("span",{class:"token function-variable function"},"render"),t(),n("span",{class:"token operator"},"="),t(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token operator"},"=>"),t(),n("span",{class:"token punctuation"},"{"),t(`
  `),n("span",{class:"token comment"},"// set viewport size"),t(`
  gl`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"viewport"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(" size"),n("span",{class:"token punctuation"},"."),t("width"),n("span",{class:"token punctuation"},","),t(" size"),n("span",{class:"token punctuation"},"."),t("height"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  `),n("span",{class:"token comment"},"// clear viewport"),t(`
  gl`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"clearColor"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  gl`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"clear"),n("span",{class:"token punctuation"},"("),t("gl"),n("span",{class:"token punctuation"},"."),n("span",{class:"token constant"},"COLOR_BUFFER_BIT"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

  `),n("span",{class:"token comment"},"// update camera matrices"),t(`
  camera`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"updateWorldMatrix"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  camera`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"updateViewProjectionMatrix"),n("span",{class:"token punctuation"},"("),t("size"),n("span",{class:"token punctuation"},"."),t("width"),n("span",{class:"token punctuation"},","),t(" size"),n("span",{class:"token punctuation"},"."),t("height"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

  `),n("span",{class:"token comment"},"// bind program"),t(`
  prg`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"use"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  `),n("span",{class:"token comment"},"// update program uniforms"),t(`
  prg`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"uMVP"),n("span",{class:"token punctuation"},"("),t("camera"),n("span",{class:"token punctuation"},"."),t("_viewProj"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

  `),n("span",{class:"token comment"},"// link the shape buffer to the program, and draw"),t(`
  shape`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"attribPointer"),n("span",{class:"token punctuation"},"("),t("prg"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  shape`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"drawTriangles"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token punctuation"},"}"),t(`

`),n("span",{class:"token function"},"render"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"js"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1702057368224-12759"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`import Node from "nanogl-node";
import Camera from "nanogl-camera";
import Program from "nanogl/program";
import ArrayBuffer from "nanogl/arraybuffer";
import PerspectiveLens from "nanogl-camera/perspective-lens";
import { mat4 } from "gl-matrix";

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

  // as we are not updating the render,
  // let's render when the canvas is resized
  render();
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

// --BUFFER--

// simple triangle with vec2 position
const shapeVertices = new Float32Array([1, 0, 0, 0, 0, 1]);
const shape = new ArrayBuffer(gl, shapeVertices);

// declare aPosition attribute as vec2
shape.attrib('aPosition', 2, gl.FLOAT);

// --PROGRAM--

const vertexShader = \`
  attribute vec2 aPosition;

  uniform mat4 uMVP;

  void main(void){
    vec4 pos = vec4(aPosition, 0.0, 1.0);
    gl_Position = uMVP * pos;
  }
\`
const fragmentShader = \`
  precision lowp float;
  void main(void){
    vec3 red = vec3(1.0, 0.0, 0.0);
    gl_FragColor = vec4(red, 1.0);
  }
\`

const prg = new Program(gl, vertexShader, fragmentShader);

// --RENDER--

const render = () => {
  // set viewport size
  gl.viewport(0, 0, size.width, size.height);
  // clear viewport
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // update camera matrices
  camera.updateWorldMatrix();
  camera.updateViewProjectionMatrix(size.width, size.height);

  // bind program
  prg.use();
  // update program uniforms
  prg.uMVP(camera._viewProj);

  // link the shape buffer to the program, and draw
  shape.attribPointer(prg);
  shape.drawTriangles();
}

render();
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1702057368224-12759","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),un=n("p",null,"Of course, in a bigger project, it would be preferable to create functions and/or classes to better organize the code, but that is entirely up to you.",-1),dn=k('<div class="toc-wrapper"><p><div class="toc"><h2 class="my-8 toc-header">Summary</h2><ul><li><a href="#setup-canvas-context">Setup the canvas &amp; context</a></li><li><a href="#create-the-camera">Create the camera</a></li><li><a href="#create-the-shape">Create the shape</a></li><li><a href="#create-the-program">Create the program</a><ul><li><a href="#vertex-shader">Vertex shader</a></li><li><a href="#fragment-shader">Fragment shader</a></li><li><a href="#program">Program</a></li></ul></li><li><a href="#draw-the-shape">Draw the shape</a></li><li><a href="#result">Result</a></li><li><a href="#final-code">Final code</a></li></ul></div></p></div>',1),kn={class:"nav-wrapper"},mn={__name:"creating-a-scene",setup(hn,{expose:p}){return p({frontmatter:{}}),(gn,fn)=>{const e=r,i=l,o=m("RouterLink");return u(),d("div",h,[n("div",y,[g,f,a(e,{type:"info"},{default:s(()=>[w]),_:1}),v,a(e,{type:"important"},{default:s(()=>[b]),_:1}),_,C,x,P,z,j,R,A,F,T,B,I,E,N,$,M,S,O,V,L,W,D,H,G,U,X,Z,J,K,Q,Y,q,nn,tn,an,a(e,{type:"info"},{default:s(()=>[sn]),_:1}),en,on,cn,a(i,{name:"creating-a-scene",folder:"guide"}),pn,ln,rn,un]),dn,n("div",kn,[a(o,{to:"/guide/getting-started/installation",class:"prev"},{default:s(()=>[t("Installation")]),_:1}),a(o,{to:"/guide/getting-started/add-movement",class:"next"},{default:s(()=>[t("Add some movement")]),_:1})])])}}};typeof c=="function"&&c(mn);export{mn as default};
