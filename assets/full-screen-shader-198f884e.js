import{_ as u}from"./GLPreview.vue_vue_type_script_setup_true_lang-5a8930e9.js";import{_ as r}from"./UICallout.vue_vue_type_script_setup_true_lang-751fca1f.js";import{b as e}from"./route-block-83d24a4e.js";import{A as d,K as k,H as n,I as a,M as o,Q as s,P as t,G as m}from"./runtime-core.esm-bundler-6b582627.js";import"./index-1575a750.js";const y={class:"markdown-body"},h={class:"content-wrapper"},g=s('<h1 id="full-screen-shader" tabindex="-1">Full-screen shader</h1><p>We might want to simply render a full-screen shader with nanogl. Let’s see how to do that.</p><p>We’ll start with the canvas &amp; context setup from the <a href="/guide/getting-started/add-movement">Add some movement</a> article.</p><h2 id="create-a-quad" tabindex="-1">Create a quad</h2><p>First, we need to create a quad. We don’t want any projection, so we don’t need to setup a camera.</p><p>Let’s create an <a href="/api/nanogl/classes/ArrayBuffer">ArrayBuffer</a>, with the position &amp; uvs datas we need for each vertice.</p><p>We need 2 triangles, with positions from -1 to 1 on both axes, and uvs going from 0 to 1 on both axes, to cover the screen.</p>',7),f=n("pre",{class:"language-js"},[n("code",{class:"language-js"},[n("span",{class:"token comment"},"// ..."),t(`

`),n("span",{class:"token keyword"},"import"),t(" ArrayBuffer "),n("span",{class:"token keyword"},"from"),t(),n("span",{class:"token string"},'"nanogl/arraybuffer"'),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token comment"},"// ..."),t(`

`),n("span",{class:"token comment"},"// simple rectangle with vec2 position and vec2 uvs"),t(`
`),n("span",{class:"token comment"},"// each vertice will have 2 numbers for position and 2 numbers for uvs"),t(`
`),n("span",{class:"token keyword"},"const"),t(" quadData "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token keyword"},"new"),t(),n("span",{class:"token class-name"},"Float32Array"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"["),t(`
  `),n("span",{class:"token comment"},"// 1st triangle"),t(`
  `),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),t(`
  `),n("span",{class:"token operator"},"-"),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token operator"},"-"),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token comment"},"// position = vec2(-1, -1) / uvs = vec2(0, 0)"),t(`
  `),n("span",{class:"token operator"},"-"),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),t(`
  `),n("span",{class:"token comment"},"// 2nd triangle"),t(`
  `),n("span",{class:"token operator"},"-"),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token operator"},"-"),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(`
  `),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token operator"},"-"),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(`
  `),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),t(`
`),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token keyword"},"const"),t(" quad "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token keyword"},"new"),t(),n("span",{class:"token class-name"},"ArrayBuffer"),n("span",{class:"token punctuation"},"("),t("gl"),n("span",{class:"token punctuation"},","),t(" quadData"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token comment"},"// declare aPosition attribute as vec2"),t(`
quad`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"attrib"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},"'aPosition'"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"2"),n("span",{class:"token punctuation"},","),t(" gl"),n("span",{class:"token punctuation"},"."),n("span",{class:"token constant"},"FLOAT"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token comment"},"// declare aTexCoord attribute as vec2"),t(`
quad`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"attrib"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},"'aTexCoord'"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"2"),n("span",{class:"token punctuation"},","),t(" gl"),n("span",{class:"token punctuation"},"."),n("span",{class:"token constant"},"FLOAT"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"js"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1702228147604-2611"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`// ...

import ArrayBuffer from "nanogl/arraybuffer";

// ...

// simple rectangle with vec2 position and vec2 uvs
// each vertice will have 2 numbers for position and 2 numbers for uvs
const quadData = new Float32Array([
  // 1st triangle
  1, 1, 1, 1,
  -1, -1, 0, 0, // position = vec2(-1, -1) / uvs = vec2(0, 0)
  -1, 1, 0, 1,
  // 2nd triangle
  -1, -1, 0, 0,
  1, -1, 1, 0,
  1, 1, 1, 1,
]);
const quad = new ArrayBuffer(gl, quadData);

// declare aPosition attribute as vec2
quad.attrib('aPosition', 2, gl.FLOAT);
// declare aTexCoord attribute as vec2
quad.attrib('aTexCoord', 2, gl.FLOAT);
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1702228147604-2611","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),v=n("p",null,[n("strong",null,"Note :"),t(" To make things easier, we could use a "),n("a",{href:"/api/nanogl-primitives-2d/classes/Rect"},"Rect"),t(" to create a quad buffer like this. For this example, we will create our own buffers.")],-1),b=n("h2",{id:"create-the-program",tabindex:"-1"},"Create the program",-1),w=n("p",null,[t("Now, we need to create the "),n("a",{href:"/api/nanogl/classes/Program"},"Program"),t(". Let’s start with the shader.")],-1),C=n("h3",{id:"vertex-shader",tabindex:"-1"},"Vertex shader",-1),_=n("p",null,"In our vertex shader, we only need to set the position, without any projection, and to pass our uvs datas to the fragment shader.",-1),x=n("pre",{class:"language-glsl"},[n("code",{class:"language-glsl"},[n("span",{class:"token keyword"},"attribute"),t(),n("span",{class:"token keyword"},"vec2"),t(" aPosition"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token keyword"},"attribute"),t(),n("span",{class:"token keyword"},"vec2"),t(" aTexCoord"),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token keyword"},"varying"),t(),n("span",{class:"token keyword"},"vec2"),t(" vUv"),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token keyword"},"void"),t(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"void"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"{"),t(`
  gl_Position `),n("span",{class:"token operator"},"="),t(),n("span",{class:"token keyword"},"vec4"),n("span",{class:"token punctuation"},"("),t("aPosition"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0.0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"1.0"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  vUv `),n("span",{class:"token operator"},"="),t(" aTexCoord"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token punctuation"},"}"),t(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"glsl"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1702228147605-46642"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`attribute vec2 aPosition;
attribute vec2 aTexCoord;

varying vec2 vUv;

void main(void){
  gl_Position = vec4(aPosition, 0.0, 1.0);
  vUv = aTexCoord;
}
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1702228147605-46642","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),T=n("h3",{id:"fragment-shader",tabindex:"-1"},"Fragment shader",-1),F=n("p",null,"Now, let’s simply use our uvs for the color.",-1),j=n("pre",{class:"language-glsl"},[n("code",{class:"language-glsl"},[n("span",{class:"token keyword"},"precision"),t(),n("span",{class:"token keyword"},"lowp"),t(),n("span",{class:"token keyword"},"float"),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token keyword"},"varying"),t(),n("span",{class:"token keyword"},"vec2"),t(" vUv"),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token keyword"},"void"),t(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"void"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"{"),t(`
  gl_FragColor `),n("span",{class:"token operator"},"="),t(),n("span",{class:"token keyword"},"vec4"),n("span",{class:"token punctuation"},"("),t("vUv"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0."),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"1.0"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token punctuation"},"}"),t(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"glsl"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1702228147605-82096"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`precision lowp float;

varying vec2 vUv;

void main(void){
  gl_FragColor = vec4(vUv, 0., 1.0);
}
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1702228147605-82096","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),A=n("h3",{id:"program",tabindex:"-1"},"Program",-1),q=n("p",null,"And finally, let’s create our program with our shader code.",-1),P=n("pre",{class:"language-js"},[n("code",{class:"language-js"},[n("span",{class:"token comment"},"// ..."),t(`

`),n("span",{class:"token keyword"},"import"),t(" Program "),n("span",{class:"token keyword"},"from"),t(),n("span",{class:"token string"},'"nanogl/program"'),t(`

`),n("span",{class:"token comment"},"// ..."),t(`

`),n("span",{class:"token keyword"},"const"),t(" vertexShader "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token template-string"},[n("span",{class:"token template-punctuation string"},"`"),n("span",{class:"token string"},`
  // vertex shader code
`),n("span",{class:"token template-punctuation string"},"`")]),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token keyword"},"const"),t(" fragmentShader "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token template-string"},[n("span",{class:"token template-punctuation string"},"`"),n("span",{class:"token string"},`
  // fragment shader code
`),n("span",{class:"token template-punctuation string"},"`")]),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token keyword"},"const"),t(" prg "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token keyword"},"new"),t(),n("span",{class:"token class-name"},"Program"),n("span",{class:"token punctuation"},"("),t("gl"),n("span",{class:"token punctuation"},","),t(" vertexShader"),n("span",{class:"token punctuation"},","),t(" fragmentShader"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"js"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1702228147605-83041"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`// ...

import Program from "nanogl/program"

// ...

const vertexShader = \`
  // vertex shader code
\`;
const fragmentShader = \`
  // fragment shader code
\`;

const prg = new Program(gl, vertexShader, fragmentShader);
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1702228147605-83041","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),R=n("h2",{id:"draw-the-quad",tabindex:"-1"},"Draw the quad",-1),z=n("p",null,"We can now create our render function.",-1),B=n("p",null,"We can keep it simple for now, just binding the program and drawing the quad.",-1),E=n("pre",{class:"language-js"},[n("code",{class:"language-js"},[n("span",{class:"token comment"},"// ..."),t(`

`),n("span",{class:"token keyword"},"const"),t(),n("span",{class:"token function-variable function"},"render"),t(),n("span",{class:"token operator"},"="),t(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token operator"},"=>"),t(),n("span",{class:"token punctuation"},"{"),t(`
  `),n("span",{class:"token comment"},"// setup viewport"),t(`
  gl`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"viewport"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(" size"),n("span",{class:"token punctuation"},"."),t("width"),n("span",{class:"token punctuation"},","),t(" size"),n("span",{class:"token punctuation"},"."),t("height"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  gl`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"clearColor"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  gl`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"clear"),n("span",{class:"token punctuation"},"("),t("gl"),n("span",{class:"token punctuation"},"."),n("span",{class:"token constant"},"COLOR_BUFFER_BIT"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

  `),n("span",{class:"token comment"},"// bind program"),t(`
  prg`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"use"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

  `),n("span",{class:"token comment"},"// link the quad buffer to the program, and draw"),t(`
  quad`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"attribPointer"),n("span",{class:"token punctuation"},"("),t("prg"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  quad`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"drawTriangles"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

  `),n("span",{class:"token function"},"requestAnimationFrame"),n("span",{class:"token punctuation"},"("),t("render"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token punctuation"},"}"),t(`

`),n("span",{class:"token function"},"render"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"js"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1702228147606-18900"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`// ...

const render = () => {
  // setup viewport
  gl.viewport(0, 0, size.width, size.height);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // bind program
  prg.use();

  // link the quad buffer to the program, and draw
  quad.attribPointer(prg);
  quad.drawTriangles();

  requestAnimationFrame(render);
}

render();
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1702228147606-18900","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),N=n("h2",{id:"add-some-movement",tabindex:"-1"},"Add some movement",-1),I=n("p",null,"Let’s add some movement to our shader. We will change the blue value of the color over time.",-1),$=n("p",null,[t("As seen in the "),n("a",{href:"/guide/getting-started/add-movement"},"Add some movement"),t(" article, we can pass a timestamp to the render function.")],-1),O=n("p",null,"Let’s use it to set a time uniform in our shader.",-1),U=n("pre",{class:"language-js"},[n("code",{class:"language-js"},[n("span",{class:"token comment"},"// ..."),t(`

`),n("span",{class:"token keyword"},"const"),t(),n("span",{class:"token function-variable function"},"render"),t(),n("span",{class:"token operator"},"="),t(),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},"time"),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token operator"},"=>"),t(),n("span",{class:"token punctuation"},"{"),t(`
  `),n("span",{class:"token comment"},"// ..."),t(`

  `),n("span",{class:"token comment"},"// bind program"),t(`
  prg`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"use"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  `),n("span",{class:"token comment"},"// setup program uniforms"),t(`
  prg`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"uTime"),n("span",{class:"token punctuation"},"("),t("time "),n("span",{class:"token operator"},"*"),t(),n("span",{class:"token number"},"0.001"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

  `),n("span",{class:"token comment"},"// ..."),t(`
`),n("span",{class:"token punctuation"},"}"),t(`

`),n("span",{class:"token function"},"render"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"js"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1702228147606-79243"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`// ...

const render = (time) => {
  // ...

  // bind program
  prg.use();
  // setup program uniforms
  prg.uTime(time * 0.001);

  // ...
}

render(0);
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1702228147606-79243","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),D=n("p",null,"And in our fragment shader, we can set our blue value according to the time value.",-1),S=n("pre",{class:"language-glsl"},[n("code",{class:"language-glsl"},[n("span",{class:"token keyword"},"precision"),t(),n("span",{class:"token keyword"},"lowp"),t(),n("span",{class:"token keyword"},"float"),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token keyword"},"uniform"),t(),n("span",{class:"token keyword"},"float"),t(" uTime"),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token keyword"},"varying"),t(),n("span",{class:"token keyword"},"vec2"),t(" vUv"),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token keyword"},"void"),t(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"void"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"{"),t(`
  `),n("span",{class:"token comment"},"// we'll make the value oscillate between 0 and 1 over time"),t(`
  `),n("span",{class:"token keyword"},"float"),t(" blue "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token function"},"cos"),n("span",{class:"token punctuation"},"("),t("uTime"),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token operator"},"*"),t(),n("span",{class:"token number"},"0.5"),t(),n("span",{class:"token operator"},"+"),t(),n("span",{class:"token number"},"0.5"),n("span",{class:"token punctuation"},";"),t(`
  gl_FragColor `),n("span",{class:"token operator"},"="),t(),n("span",{class:"token keyword"},"vec4"),n("span",{class:"token punctuation"},"("),t("vUv"),n("span",{class:"token punctuation"},","),t(" blue"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"1.0"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token punctuation"},"}"),t(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"glsl"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1702228147606-79741"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`precision lowp float;

uniform float uTime;

varying vec2 vUv;

void main(void){
  // we'll make the value oscillate between 0 and 1 over time
  float blue = cos(uTime) * 0.5 + 0.5;
  gl_FragColor = vec4(vUv, blue, 1.0);
}
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1702228147606-79741","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),L=s('<h2 id="optimization" tabindex="-1">Optimization</h2><p>There is a way to optimize our full-screen shader. We can draw a single triangle covering the whole screen, instead of drawing 2.</p><p>To do so, we need to create a triangle with its bottom left corner being at <code class="language-js"><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span></code>, and its hypotenuse going through the top right corner of the screen. So the other vertices of the triangle need to be at <code class="language-js"><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span></code> and <code class="language-js"><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span></code>.</p><p>We also need to adapt the uvs data to make sure the visible part of the triangle, being our quad, has uvs going from 0 to 1 on both axes. So our triangle’s uvs need to go from 0 to 2.</p><p>To do so, we only need to modify our quadData array buffer.</p>',5),W=n("pre",{class:"language-js"},[n("code",{class:"language-js"},[n("span",{class:"token comment"},"// ..."),t(`

`),n("span",{class:"token comment"},"// full-screen triangle with vec2 position and vec2 uvs"),t(`
`),n("span",{class:"token keyword"},"const"),t(" quadData "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token keyword"},"new"),t(),n("span",{class:"token class-name"},"Float32Array"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"["),t(`
  `),n("span",{class:"token operator"},"-"),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"3"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"2"),n("span",{class:"token punctuation"},","),t(`
  `),n("span",{class:"token operator"},"-"),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token operator"},"-"),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(`
  `),n("span",{class:"token number"},"3"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token operator"},"-"),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"2"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(`
`),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token comment"},"// ..."),t(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"js"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1702228147607-99222"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`// ...

// full-screen triangle with vec2 position and vec2 uvs
const quadData = new Float32Array([
  -1, 3, 0, 2,
  -1, -1, 0, 0,
  3, -1, 2, 0,
]);

// ...
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1702228147607-99222","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),H=n("h2",{id:"result",tabindex:"-1"},"Result",-1),V=n("p",null,"And now you have a full-screen shader !",-1),G=n("h2",{id:"final-code",tabindex:"-1"},"Final code",-1),M=n("p",null,"Here is the complete code for the js file :",-1),X=n("pre",{class:"language-js"},[n("code",{class:"language-js"},[n("span",{class:"token keyword"},"import"),t(" Program "),n("span",{class:"token keyword"},"from"),t(),n("span",{class:"token string"},'"nanogl/program"'),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token keyword"},"import"),t(" ArrayBuffer "),n("span",{class:"token keyword"},"from"),t(),n("span",{class:"token string"},'"nanogl/arraybuffer"'),n("span",{class:"token punctuation"},";"),t(`

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
`),n("span",{class:"token punctuation"},"}"),t(`

`),n("span",{class:"token keyword"},"const"),t(" resizeObserver "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token keyword"},"new"),t(),n("span",{class:"token class-name"},"ResizeObserver"),n("span",{class:"token punctuation"},"("),t("handleResize"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
resizeObserver`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"observe"),n("span",{class:"token punctuation"},"("),t("canvas"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token comment"},"// --BUFFER--"),t(`

`),n("span",{class:"token comment"},"// full-screen triangle with vec2 position and vec2 uvs"),t(`
`),n("span",{class:"token keyword"},"const"),t(" quadData "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token keyword"},"new"),t(),n("span",{class:"token class-name"},"Float32Array"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"["),t(`
  `),n("span",{class:"token operator"},"-"),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"3"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"2"),n("span",{class:"token punctuation"},","),t(`
  `),n("span",{class:"token operator"},"-"),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token operator"},"-"),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(`
  `),n("span",{class:"token number"},"3"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token operator"},"-"),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"2"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(`
`),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token keyword"},"const"),t(" quad "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token keyword"},"new"),t(),n("span",{class:"token class-name"},"ArrayBuffer"),n("span",{class:"token punctuation"},"("),t("gl"),n("span",{class:"token punctuation"},","),t(" quadData"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token comment"},"// declare aPosition attribute as vec2"),t(`
quad`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"attrib"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},"'aPosition'"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"2"),n("span",{class:"token punctuation"},","),t(" gl"),n("span",{class:"token punctuation"},"."),n("span",{class:"token constant"},"FLOAT"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
quad`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"attrib"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},"'aTexCoord'"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"2"),n("span",{class:"token punctuation"},","),t(" gl"),n("span",{class:"token punctuation"},"."),n("span",{class:"token constant"},"FLOAT"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token comment"},"// --PROGRAM--"),t(`

`),n("span",{class:"token keyword"},"const"),t(" vertexShader "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token template-string"},[n("span",{class:"token template-punctuation string"},"`"),n("span",{class:"token string"},`
  attribute vec2 aPosition;
  attribute vec2 aTexCoord;

  varying vec2 vUv;

  void main(void){
    gl_Position = vec4(aPosition, 0.0, 1.0);
    vUv = aTexCoord;
  }
`),n("span",{class:"token template-punctuation string"},"`")]),t(`
`),n("span",{class:"token keyword"},"const"),t(" fragmentShader "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token template-string"},[n("span",{class:"token template-punctuation string"},"`"),n("span",{class:"token string"},`
  precision lowp float;

  uniform float uTime;

  varying vec2 vUv;

  void main(void){
    // we'll make the value oscillate between 0 and 1 over time
    float blue = cos(uTime) * 0.5 + 0.5;
    gl_FragColor = vec4(vUv, blue, 1.0);
  }
`),n("span",{class:"token template-punctuation string"},"`")]),t(`

`),n("span",{class:"token keyword"},"const"),t(" prg "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token keyword"},"new"),t(),n("span",{class:"token class-name"},"Program"),n("span",{class:"token punctuation"},"("),t("gl"),n("span",{class:"token punctuation"},","),t(" vertexShader"),n("span",{class:"token punctuation"},","),t(" fragmentShader"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token comment"},"// --RENDER--"),t(`

`),n("span",{class:"token keyword"},"const"),t(),n("span",{class:"token function-variable function"},"render"),t(),n("span",{class:"token operator"},"="),t(),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},"time"),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token operator"},"=>"),t(),n("span",{class:"token punctuation"},"{"),t(`
  `),n("span",{class:"token comment"},"// setup viewport"),t(`
  gl`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"viewport"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(" size"),n("span",{class:"token punctuation"},"."),t("width"),n("span",{class:"token punctuation"},","),t(" size"),n("span",{class:"token punctuation"},"."),t("height"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  gl`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"clearColor"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  gl`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"clear"),n("span",{class:"token punctuation"},"("),t("gl"),n("span",{class:"token punctuation"},"."),n("span",{class:"token constant"},"COLOR_BUFFER_BIT"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

  `),n("span",{class:"token comment"},"// bind program"),t(`
  prg`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"use"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  prg`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"uTime"),n("span",{class:"token punctuation"},"("),t("time "),n("span",{class:"token operator"},"*"),t(),n("span",{class:"token number"},"0.001"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

  `),n("span",{class:"token comment"},"// link the quad buffer to the program, and draw"),t(`
  quad`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"attribPointer"),n("span",{class:"token punctuation"},"("),t("prg"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  quad`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"drawTriangles"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

  `),n("span",{class:"token function"},"requestAnimationFrame"),n("span",{class:"token punctuation"},"("),t("render"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token punctuation"},"}"),t(`

`),n("span",{class:"token function"},"render"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"js"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1702228147607-84322"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`import Program from "nanogl/program";
import ArrayBuffer from "nanogl/arraybuffer";

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

// --BUFFER--

// full-screen triangle with vec2 position and vec2 uvs
const quadData = new Float32Array([
  -1, 3, 0, 2,
  -1, -1, 0, 0,
  3, -1, 2, 0,
]);
const quad = new ArrayBuffer(gl, quadData);

// declare aPosition attribute as vec2
quad.attrib('aPosition', 2, gl.FLOAT);
quad.attrib('aTexCoord', 2, gl.FLOAT);

// --PROGRAM--

const vertexShader = \`
  attribute vec2 aPosition;
  attribute vec2 aTexCoord;

  varying vec2 vUv;

  void main(void){
    gl_Position = vec4(aPosition, 0.0, 1.0);
    vUv = aTexCoord;
  }
\`
const fragmentShader = \`
  precision lowp float;

  uniform float uTime;

  varying vec2 vUv;

  void main(void){
    // we'll make the value oscillate between 0 and 1 over time
    float blue = cos(uTime) * 0.5 + 0.5;
    gl_FragColor = vec4(vUv, blue, 1.0);
  }
\`

const prg = new Program(gl, vertexShader, fragmentShader);

// --RENDER--

const render = (time) => {
  // setup viewport
  gl.viewport(0, 0, size.width, size.height);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // bind program
  prg.use();
  prg.uTime(time * 0.001);

  // link the quad buffer to the program, and draw
  quad.attribPointer(prg);
  quad.drawTriangles();

  requestAnimationFrame(render);
}

render(0);
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1702228147607-84322","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),Z=s('<div class="toc-wrapper"><p><div class="toc"><h2 class="my-8 toc-header">Summary</h2><ul><li><a href="#create-a-quad">Create a quad</a></li><li><a href="#create-the-program">Create the program</a><ul><li><a href="#vertex-shader">Vertex shader</a></li><li><a href="#fragment-shader">Fragment shader</a></li><li><a href="#program">Program</a></li></ul></li><li><a href="#draw-the-quad">Draw the quad</a></li><li><a href="#add-some-movement">Add some movement</a></li><li><a href="#optimization">Optimization</a></li><li><a href="#result">Result</a></li><li><a href="#final-code">Final code</a></li></ul></div></p></div>',1),K={class:"nav-wrapper"},Q={__name:"full-screen-shader",setup(J,{expose:c}){return c({frontmatter:{}}),(nn,tn)=>{const p=r,i=u,l=m("RouterLink");return d(),k("div",y,[n("div",h,[g,f,a(p,null,{default:o(()=>[v]),_:1}),b,w,C,_,x,T,F,j,A,q,P,R,z,B,E,N,I,$,O,U,D,S,L,W,H,V,a(i,{name:"full-screen-shader",folder:"guide"}),G,M,X]),Z,n("div",K,[a(l,{to:"/guide/getting-started/load-gltf",class:"prev"},{default:o(()=>[t("Load a GLTF model")]),_:1})])])}}};typeof e=="function"&&e(Q);export{Q as default};
