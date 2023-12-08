import{_ as u}from"./GLPreview.vue_vue_type_script_setup_true_lang-aa4f9ac4.js";import{_ as r}from"./UICallout.vue_vue_type_script_setup_true_lang-c207cbfa.js";import{b as c}from"./route-block-83d24a4e.js";import{A as d,F as k,I as n,P as a,K as e,Q as s,L as t,E as m}from"./runtime-core.esm-bundler-67b81d84.js";import"./index-a9d118c0.js";const y={class:"markdown-body"},h={class:"content-wrapper"},f=s('<h1 id="add-some-movement" tabindex="-1">Add some movement</h1><p>At the end of the last article, we had a static render of a triangle. But usually, we don’t want a static render, but an animated one. So let’s add some movmement.</p><p>We’ll start out with the code we created in the <a href="creating-a-scene#final-code">last article</a>.</p><h2 id="setup-render-loop" tabindex="-1">Setup render loop</h2><p>To have an animated scene, we need to setup a render loop. This is not specific to nanogl, you can do this as you would in your usual WebGL project.</p><p>Let’s take our render function, and add <code class="language-js"><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>render<span class="token punctuation">)</span></code> inside.</p>',6),g=n("pre",{class:"language-js"},[n("code",{class:"language-js"},[n("span",{class:"token comment"},"// ..."),t(`

`),n("span",{class:"token keyword"},"const"),t(),n("span",{class:"token function-variable function"},"render"),t(),n("span",{class:"token operator"},"="),t(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token operator"},"=>"),t(),n("span",{class:"token punctuation"},"{"),t(`
  `),n("span",{class:"token comment"},"// ..."),t(`

  `),n("span",{class:"token function"},"requestAnimationFrame"),n("span",{class:"token punctuation"},"("),t("render"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token punctuation"},"}"),t(`

`),n("span",{class:"token function"},"render"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"js"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1702043582329-43865"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`// ...

const render = () => {
  // ...

  requestAnimationFrame(render);
}

render();

`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1702043582329-43865","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),w=n("p",null,[t("This will call the "),n("code",{class:"language-js"},"render"),t(" function on every screen refresh.")],-1),b=n("p",null,[t("You can also remove the render call from the "),n("code",{class:"language-js"},"handleResize"),t(" function now.")],-1),v=n("h2",{id:"create-the-node",tabindex:"-1"},"Create the node",-1),x=n("p",null,[t("To add some movement, we’d like to be able to choose a specific position, rotation and scale. To setup these transform values, we can use a "),n("a",{href:"/api/nanogl-node/classes/Node"},"Node"),t(".")],-1),_=n("p",null,"The Node will provide us some helpers to set these values, and get the corresponding world matrix.",-1),C=n("pre",{class:"language-js"},[n("code",{class:"language-js"},[n("span",{class:"token comment"},"// ..."),t(`

`),n("span",{class:"token keyword"},"import"),t(" Node "),n("span",{class:"token keyword"},"from"),t(),n("span",{class:"token string"},'"nanogl-node"'),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token comment"},"// ..."),t(`

`),n("span",{class:"token keyword"},"const"),t(" node "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token keyword"},"new"),t(),n("span",{class:"token class-name"},"Node"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token comment"},"// you can set position"),t(`
node`),n("span",{class:"token punctuation"},"."),t("position"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"set"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"["),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token comment"},"// you can set scale"),t(`
node`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"setScale"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"1.5"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token comment"},"// and you can rotate along any axis"),t(`
node`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"rotateZ"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"90"),t(),n("span",{class:"token operator"},"*"),t(),n("span",{class:"token punctuation"},"("),t("Math"),n("span",{class:"token punctuation"},"."),n("span",{class:"token constant"},"PI"),t(),n("span",{class:"token operator"},"/"),t(),n("span",{class:"token number"},"180.0"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(),n("span",{class:"token comment"},"// rotation is in radians"),t(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"js"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1702043582330-21536"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`// ...

import Node from "nanogl-node";

// ...

const node = new Node();

// you can set position
node.position.set([1, 0, 0]);
// you can set scale
node.setScale(1.5);
// and you can rotate along any axis
node.rotateZ(90 * (Math.PI / 180.0)); // rotation is in radians
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1702043582330-21536","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),j=n("p",null,[t("Then, in our render function we can get the model view projection matrix and update the "),n("code",{class:"language-js"},"uMVP"),t(" uniform with it.")],-1),M=n("pre",{class:"language-js"},[n("code",{class:"language-js"},[n("span",{class:"token comment"},"// ..."),t(`

`),n("span",{class:"token keyword"},"const"),t(),n("span",{class:"token constant"},"M4"),t(),n("span",{class:"token operator"},"="),t(" mat4"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"create"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token keyword"},"const"),t(),n("span",{class:"token function-variable function"},"render"),t(),n("span",{class:"token operator"},"="),t(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token operator"},"=>"),t(),n("span",{class:"token punctuation"},"{"),t(`
  `),n("span",{class:"token comment"},"// ..."),t(`

  camera`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"updateWorldMatrix"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  camera`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"updateViewProjectionMatrix"),n("span",{class:"token punctuation"},"("),t("size"),n("span",{class:"token punctuation"},"."),t("width"),n("span",{class:"token punctuation"},","),t(" size"),n("span",{class:"token punctuation"},"."),t("height"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

  `),n("span",{class:"token comment"},"// after updating the camera view projection matrix"),t(`
  `),n("span",{class:"token comment"},"// get the model view projection matrix from camera with node world matrix"),t(`
  camera`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"modelViewProjectionMatrix"),n("span",{class:"token punctuation"},"("),n("span",{class:"token constant"},"M4"),n("span",{class:"token punctuation"},","),t(" node"),n("span",{class:"token punctuation"},"."),t("_wmatrix"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

  prg`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"use"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  `),n("span",{class:"token comment"},"// update uMVP with calculated model view projection matrix"),t(`
  prg`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"uMVP"),n("span",{class:"token punctuation"},"("),n("span",{class:"token constant"},"M4"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

  `),n("span",{class:"token comment"},"// ..."),t(`
`),n("span",{class:"token punctuation"},"}"),t(`

`),n("span",{class:"token function"},"render"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"js"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1702043582330-10279"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`// ...

const M4 = mat4.create();

const render = () => {
  // ...

  camera.updateWorldMatrix();
  camera.updateViewProjectionMatrix(size.width, size.height);

  // after updating the camera view projection matrix
  // get the model view projection matrix from camera with node world matrix
  camera.modelViewProjectionMatrix(M4, node._wmatrix);

  prg.use();
  // update uMVP with calculated model view projection matrix
  prg.uMVP(M4);

  // ...
}

render();
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1702043582330-10279","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),P=s('<h2 id="play-transform" tabindex="-1">Play with the transform values</h2><p>Now we can animate the transform values.</p><p>Bafore starting, we need to remove the transform values we set right after creating the node. We’ll set these values in the render function now.</p><h3 id="setup-a-function" tabindex="-1">Setup a function</h3><p>Let’s start by creating an <code class="language-js">animate</code> function, and calling it at each frame.</p><p>The <code class="language-js">requestAnimationFrame</code> function provides the callback with a <code class="language-js">time</code> argument : it is a timestamp of the end time of the previous frame’s rendering. Let’s pass this value from the <code class="language-js">render</code> function to the <code class="language-js">animate</code> function, as it will be useful for our animations.</p>',6),z=n("pre",{class:"language-js"},[n("code",{class:"language-js"},[n("span",{class:"token comment"},"// ..."),t(`

`),n("span",{class:"token keyword"},"const"),t(),n("span",{class:"token function-variable function"},"animate"),t(),n("span",{class:"token operator"},"="),t(),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},"time"),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token operator"},"=>"),t(),n("span",{class:"token punctuation"},"{"),t(`
  `),n("span",{class:"token comment"},"// animations"),t(`
`),n("span",{class:"token punctuation"},"}"),t(`

`),n("span",{class:"token keyword"},"const"),t(),n("span",{class:"token function-variable function"},"render"),t(),n("span",{class:"token operator"},"="),t(),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},"time"),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token operator"},"=>"),t(),n("span",{class:"token punctuation"},"{"),t(`
  `),n("span",{class:"token function"},"animate"),n("span",{class:"token punctuation"},"("),t("time"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

  `),n("span",{class:"token comment"},"// ..."),t(`
`),n("span",{class:"token punctuation"},"}"),t(`

`),n("span",{class:"token function"},"render"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"js"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1702043582330-84444"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`// ...

const animate = (time) => {
  // animations
}

const render = (time) => {
  animate(time);

  // ...
}

render();
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1702043582330-84444","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),N=s('<h3 id="position-%26-scale" tabindex="-1">Position &amp; scale</h3><p>For the position and the scale, we want the value to oscillate. The time value increases at each render, so we can use it with <code class="language-js">Math<span class="token punctuation">.</span>cos</code> or <code class="language-js">Math<span class="token punctuation">.</span>sin</code> to get an oscillation over time.</p>',2),A=n("pre",{class:"language-js"},[n("code",{class:"language-js"},[n("span",{class:"token keyword"},"const"),t(),n("span",{class:"token function-variable function"},"animate"),t(),n("span",{class:"token operator"},"="),t(),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},"time"),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token operator"},"=>"),t(),n("span",{class:"token punctuation"},"{"),t(`
  `),n("span",{class:"token comment"},"// times is in ms, we need to slow down the progress"),t(`
  `),n("span",{class:"token keyword"},"const"),t(" progress "),n("span",{class:"token operator"},"="),t(" time "),n("span",{class:"token operator"},"*"),t(),n("span",{class:"token number"},"0.001"),n("span",{class:"token punctuation"},";"),t(`

  `),n("span",{class:"token comment"},"// make y position vary between -1 and 1"),t(`
  node`),n("span",{class:"token punctuation"},"."),t("position"),n("span",{class:"token punctuation"},"["),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},"]"),t(),n("span",{class:"token operator"},"="),t(" Math"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"cos"),n("span",{class:"token punctuation"},"("),t("progress"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

  `),n("span",{class:"token comment"},"// make scale vary between 1 and 2"),t(`
  node`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"setScale"),n("span",{class:"token punctuation"},"("),t("Math"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"sin"),n("span",{class:"token punctuation"},"("),t("progress"),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token operator"},"*"),t(),n("span",{class:"token number"},"0.5"),t(),n("span",{class:"token operator"},"+"),t(),n("span",{class:"token number"},"1.5"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token punctuation"},"}"),t(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"js"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1702043582330-80368"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`const animate = (time) => {
  // times is in ms, we need to slow down the progress
  const progress = time * 0.001;

  // make y position vary between -1 and 1
  node.position[1] = Math.cos(progress);

  // make scale vary between 1 and 2
  node.setScale(Math.sin(progress) * 0.5 + 1.5);
}
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1702043582330-80368","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),R=n("h3",{id:"rotation",tabindex:"-1"},"Rotation",-1),T=n("p",null,[t("The rotation is a bit different, as we can use the "),n("code",{class:"language-js"},"rotateZ"),t(" function to rotate along the z axis relatively to its current rotation. So we can simply call the "),n("code",{class:"language-js"},"rotateZ"),t(" function each frame to rotate continuously.")],-1),F=n("pre",{class:"language-js"},[n("code",{class:"language-js"},[n("span",{class:"token keyword"},"const"),t(),n("span",{class:"token function-variable function"},"animate"),t(),n("span",{class:"token operator"},"="),t(),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},"time"),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token operator"},"=>"),t(),n("span",{class:"token punctuation"},"{"),t(`
  `),n("span",{class:"token comment"},"// ..."),t(`

  `),n("span",{class:"token comment"},"// rotate by 0.5deg on z axis on each frame"),t(`
  node`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"rotateZ"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"0.5"),t(),n("span",{class:"token operator"},"*"),t(),n("span",{class:"token punctuation"},"("),t("Math"),n("span",{class:"token punctuation"},"."),n("span",{class:"token constant"},"PI"),t(),n("span",{class:"token operator"},"/"),t(),n("span",{class:"token number"},"180.0"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(),n("span",{class:"token comment"},"// rotation is in radians"),t(`
`),n("span",{class:"token punctuation"},"}"),t(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"js"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1702043582330-57171"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`const animate = (time) => {
  // ...

  // rotate by 0.5deg on z axis on each frame
  node.rotateZ(0.5 * (Math.PI / 180.0)); // rotation is in radians
}
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1702043582330-57171","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),E=n("h3",{id:"world-matrix",tabindex:"-1"},"World matrix",-1),I=n("p",null,"Now we need to update the node world matrix to reflect these changes.",-1),V=n("p",null,[n("strong",null,"Important :"),t(" Make sure you update the node world matrix "),n("em",null,"after"),t(" the transforms and "),n("em",null,"before"),t(" computing the model view projection matrix.")],-1),B=n("pre",{class:"language-js"},[n("code",{class:"language-js"},[n("span",{class:"token keyword"},"const"),t(),n("span",{class:"token function-variable function"},"animate"),t(),n("span",{class:"token operator"},"="),t(),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},"time"),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token operator"},"=>"),t(),n("span",{class:"token punctuation"},"{"),t(`
  `),n("span",{class:"token comment"},"// ..."),t(`

  `),n("span",{class:"token comment"},"// update world matrix after the changes"),t(`
  node`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"invalidate"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  node`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"updateWorldMatrix"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token punctuation"},"}"),t(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"js"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1702043582330-28572"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`const animate = (time) => {
  // ...

  // update world matrix after the changes
  node.invalidate();
  node.updateWorldMatrix();
}
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1702043582330-28572","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),S=n("h2",{id:"result",tabindex:"-1"},"Result",-1),$=n("p",null,"That’s it, now the triangle’s position, scale and rotation are evolving over time.",-1),W=n("h2",{id:"final-code",tabindex:"-1"},"Final code",-1),L=n("p",null,"Here is the complete code for the js file :",-1),O=n("pre",{class:"language-js"},[n("code",{class:"language-js"},[n("span",{class:"token keyword"},"import"),t(" Node "),n("span",{class:"token keyword"},"from"),t(),n("span",{class:"token string"},'"nanogl-node"'),n("span",{class:"token punctuation"},";"),t(`
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

`),n("span",{class:"token comment"},"// --NODE--"),t(`

`),n("span",{class:"token keyword"},"const"),t(" node "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token keyword"},"new"),t(),n("span",{class:"token class-name"},"Node"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token comment"},"// --RENDER--"),t(`

`),n("span",{class:"token keyword"},"const"),t(),n("span",{class:"token constant"},"M4"),t(),n("span",{class:"token operator"},"="),t(" mat4"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"create"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

`),n("span",{class:"token keyword"},"const"),t(),n("span",{class:"token function-variable function"},"animate"),t(),n("span",{class:"token operator"},"="),t(),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},"time"),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token operator"},"=>"),t(),n("span",{class:"token punctuation"},"{"),t(`
  `),n("span",{class:"token comment"},"// times is in ms, we need to slow down the progress"),t(`
  `),n("span",{class:"token keyword"},"const"),t(" progress "),n("span",{class:"token operator"},"="),t(" time "),n("span",{class:"token operator"},"*"),t(),n("span",{class:"token number"},"0.001"),n("span",{class:"token punctuation"},";"),t(`

  `),n("span",{class:"token comment"},"// make y position vary between -1 and 1"),t(`
  node`),n("span",{class:"token punctuation"},"."),t("position"),n("span",{class:"token punctuation"},"["),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},"]"),t(),n("span",{class:"token operator"},"="),t(" Math"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"cos"),n("span",{class:"token punctuation"},"("),t("progress"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  `),n("span",{class:"token comment"},"// make scale vary between 1 and 2"),t(`
  node`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"setScale"),n("span",{class:"token punctuation"},"("),t("Math"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"sin"),n("span",{class:"token punctuation"},"("),t("progress"),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token operator"},"*"),t(),n("span",{class:"token number"},"0.5"),t(),n("span",{class:"token operator"},"+"),t(),n("span",{class:"token number"},"1.5"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  `),n("span",{class:"token comment"},"// rotate by 0.5deg on z axis on each frame"),t(`
  node`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"rotateZ"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"0.5"),t(),n("span",{class:"token operator"},"*"),t(),n("span",{class:"token punctuation"},"("),t("Math"),n("span",{class:"token punctuation"},"."),n("span",{class:"token constant"},"PI"),t(),n("span",{class:"token operator"},"/"),t(),n("span",{class:"token number"},"180.0"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(),n("span",{class:"token comment"},"// rotation is in radians"),t(`

  `),n("span",{class:"token comment"},"// update world matrix after the changes"),t(`
  node`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"invalidate"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  node`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"updateWorldMatrix"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token punctuation"},"}"),t(`

`),n("span",{class:"token keyword"},"const"),t(),n("span",{class:"token function-variable function"},"render"),t(),n("span",{class:"token operator"},"="),t(),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},"time"),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token operator"},"=>"),t(),n("span",{class:"token punctuation"},"{"),t(`
  `),n("span",{class:"token function"},"animate"),n("span",{class:"token punctuation"},"("),t("time"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

  `),n("span",{class:"token comment"},"// set viewport size"),t(`
  gl`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"viewport"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(" size"),n("span",{class:"token punctuation"},"."),t("width"),n("span",{class:"token punctuation"},","),t(" size"),n("span",{class:"token punctuation"},"."),t("height"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  `),n("span",{class:"token comment"},"// clear viewport"),t(`
  gl`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"clearColor"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  gl`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"clear"),n("span",{class:"token punctuation"},"("),t("gl"),n("span",{class:"token punctuation"},"."),n("span",{class:"token constant"},"COLOR_BUFFER_BIT"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

  `),n("span",{class:"token comment"},"// update camera matrices"),t(`
  camera`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"updateWorldMatrix"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  camera`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"updateViewProjectionMatrix"),n("span",{class:"token punctuation"},"("),t("size"),n("span",{class:"token punctuation"},"."),t("width"),n("span",{class:"token punctuation"},","),t(" size"),n("span",{class:"token punctuation"},"."),t("height"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

  `),n("span",{class:"token comment"},"// get model view projection matrix from camera with node world matrix"),t(`
  camera`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"modelViewProjectionMatrix"),n("span",{class:"token punctuation"},"("),n("span",{class:"token constant"},"M4"),n("span",{class:"token punctuation"},","),t(" node"),n("span",{class:"token punctuation"},"."),t("_wmatrix"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

  `),n("span",{class:"token comment"},"// bind program"),t(`
  prg`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"use"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  `),n("span",{class:"token comment"},"// update program uniforms"),t(`
  prg`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"uMVP"),n("span",{class:"token punctuation"},"("),n("span",{class:"token constant"},"M4"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

  `),n("span",{class:"token comment"},"// link the shape buffer to the program, and draw"),t(`
  shape`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"attribPointer"),n("span",{class:"token punctuation"},"("),t("prg"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  shape`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"drawTriangles"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`

  `),n("span",{class:"token function"},"requestAnimationFrame"),n("span",{class:"token punctuation"},"("),t("render"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token punctuation"},"}"),t(`

`),n("span",{class:"token function"},"render"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`)]),n("div",{class:"m-mdic-copy-wrapper"},[n("span",{class:"u-mdic-copy-code_lang"},"js"),n("div",{class:"u-mdic-copy-notify",id:"j-notify-1702043582330-79812"},"copied!"),n("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`import Node from "nanogl-node";
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

// --NODE--

const node = new Node();

// --RENDER--

const M4 = mat4.create();

const animate = (time) => {
  // times is in ms, we need to slow down the progress
  const progress = time * 0.001;

  // make y position vary between -1 and 1
  node.position[1] = Math.cos(progress);
  // make scale vary between 1 and 2
  node.setScale(Math.sin(progress) * 0.5 + 1.5);
  // rotate by 0.5deg on z axis on each frame
  node.rotateZ(0.5 * (Math.PI / 180.0)); // rotation is in radians

  // update world matrix after the changes
  node.invalidate();
  node.updateWorldMatrix();
}

const render = (time) => {
  animate(time);

  // set viewport size
  gl.viewport(0, 0, size.width, size.height);
  // clear viewport
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // update camera matrices
  camera.updateWorldMatrix();
  camera.updateViewProjectionMatrix(size.width, size.height);

  // get model view projection matrix from camera with node world matrix
  camera.modelViewProjectionMatrix(M4, node._wmatrix);

  // bind program
  prg.use();
  // update program uniforms
  prg.uMVP(M4);

  // link the shape buffer to the program, and draw
  shape.attribPointer(prg);
  shape.drawTriangles();

  requestAnimationFrame(render);
}

render();
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1702043582330-79812","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),D=s('<div class="toc-wrapper"><p><div class="toc"><h2 class="my-8 toc-header">Summary</h2><ul><li><a href="#setup-render-loop">Setup render loop</a></li><li><a href="#create-the-node">Create the node</a></li><li><a href="#play-transform">Play with the transform values</a><ul><li><a href="#setup-a-function">Setup a function</a></li><li><a href="#position-%26-scale">Position &amp; scale</a></li><li><a href="#rotation">Rotation</a></li><li><a href="#world-matrix">World matrix</a></li></ul></li><li><a href="#result">Result</a></li><li><a href="#final-code">Final code</a></li></ul></div></p></div>',1),Z={class:"nav-wrapper"},G={__name:"add-movement",setup(H,{expose:p}){return p({frontmatter:{}}),(U,X)=>{const i=r,l=u,o=m("RouterLink");return d(),k("div",y,[n("div",h,[f,g,w,b,v,x,_,C,j,M,P,z,N,A,R,T,F,E,I,a(i,{type:"important"},{default:e(()=>[V]),_:1}),B,S,$,a(l,{name:"add-movement",folder:"guide"}),W,L,O]),D,n("div",Z,[a(o,{to:"/guide/getting-started/creating-a-scene",class:"prev"},{default:e(()=>[t("Creating a scene")]),_:1}),a(o,{to:"/guide/getting-started/load-gltf",class:"next"},{default:e(()=>[t("Load a GLTF model")]),_:1})])])}}};typeof c=="function"&&c(G);export{G as default};
