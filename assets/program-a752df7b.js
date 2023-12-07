import{_ as p}from"./UICallout.vue_vue_type_script_setup_true_lang-9ed50965.js";import{b as s}from"./route-block-83d24a4e.js";import{A as d,C as u,E as t,O as e,I as a,J as n,P as c,z as r}from"./runtime-core.esm-bundler-b2e16801.js";const m={class:"markdown-body"},y={class:"content-wrapper"},k=c('<h1 id="program" tabindex="-1">Program</h1><p>The Program class provides <strong>shader compilation</strong> and <strong>gl program linking</strong> functionality.</p><p>It also give you convenient access to <strong>active uniforms and attributes</strong>.</p><h2 id="create" tabindex="-1">Create a program</h2><p>You can create a program with the <code class="language-js">Program</code> class, providing its code as strings. The program will be compiled on its creation.</p>',5),g=t("pre",{class:"language-js"},[t("code",{class:"language-js"},[t("span",{class:"token keyword"},"import"),n(" Program "),t("span",{class:"token keyword"},"from"),n(),t("span",{class:"token string"},'"nanogl/program"'),t("span",{class:"token punctuation"},";"),n(`

`),t("span",{class:"token comment"},"// create a new Program with a given gl context,"),n(`
`),t("span",{class:"token comment"},"// the vertex shader code & the fragment shader code"),n(`
`),t("span",{class:"token keyword"},"const"),n(" prg "),t("span",{class:"token operator"},"="),n(),t("span",{class:"token keyword"},"new"),n(),t("span",{class:"token class-name"},"Program"),t("span",{class:"token punctuation"},"("),n("gl"),t("span",{class:"token punctuation"},","),n(" vertexCode"),t("span",{class:"token punctuation"},","),n(" fragmentCode"),t("span",{class:"token punctuation"},")"),t("span",{class:"token punctuation"},";"),n(`
`)]),t("div",{class:"m-mdic-copy-wrapper"},[t("span",{class:"u-mdic-copy-code_lang"},"js"),t("div",{class:"u-mdic-copy-notify",id:"j-notify-1701968268239-33798"},"copied!"),t("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`import Program from "nanogl/program";

// create a new Program with a given gl context,
// the vertex shader code & the fragment shader code
const prg = new Program(gl, vertexCode, fragmentCode);
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1701968268239-33798","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),h=t("p",null,"You can also create the program, then compile it with the code.",-1),f=t("pre",{class:"language-js"},[t("code",{class:"language-js"},[t("span",{class:"token keyword"},"import"),n(" Program "),t("span",{class:"token keyword"},"from"),n(),t("span",{class:"token string"},'"nanogl/program"'),t("span",{class:"token punctuation"},";"),n(`

`),t("span",{class:"token comment"},"// create a new Program with a given gl context"),n(`
`),t("span",{class:"token keyword"},"const"),n(" prg "),t("span",{class:"token operator"},"="),n(),t("span",{class:"token keyword"},"new"),n(),t("span",{class:"token class-name"},"Program"),t("span",{class:"token punctuation"},"("),n("gl"),t("span",{class:"token punctuation"},")"),t("span",{class:"token punctuation"},";"),n(`

`),t("span",{class:"token comment"},"// compile program with code strings"),n(`
prg`),t("span",{class:"token punctuation"},"."),t("span",{class:"token function"},"compile"),t("span",{class:"token punctuation"},"("),n("vertexCode"),t("span",{class:"token punctuation"},","),n(" fragmentCode"),t("span",{class:"token punctuation"},")"),t("span",{class:"token punctuation"},";"),n(`
`)]),t("div",{class:"m-mdic-copy-wrapper"},[t("span",{class:"u-mdic-copy-code_lang"},"js"),t("div",{class:"u-mdic-copy-notify",id:"j-notify-1701968268239-86992"},"copied!"),t("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`import Program from "nanogl/program";

// create a new Program with a given gl context
const prg = new Program(gl);

// compile program with code strings
prg.compile(vertexCode, fragmentCode);
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1701968268239-86992","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),b=t("h2",{id:"bind-program",tabindex:"-1"},"Bind program",-1),_=t("p",null,[n("You can bind the program with the "),t("code",{class:"language-js"},"use"),n(" function.")],-1),C=t("pre",{class:"language-js"},[t("code",{class:"language-js"},[n("prg"),t("span",{class:"token punctuation"},"."),t("span",{class:"token function"},"use"),t("span",{class:"token punctuation"},"("),t("span",{class:"token punctuation"},")"),t("span",{class:"token punctuation"},";"),n(`
`)]),t("div",{class:"m-mdic-copy-wrapper"},[t("span",{class:"u-mdic-copy-code_lang"},"js"),t("div",{class:"u-mdic-copy-notify",id:"j-notify-1701968268239-21920"},"copied!"),t("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`prg.use();
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1701968268239-21920","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),v=t("h2",{id:"uniforms",tabindex:"-1"},"Uniforms",-1),x=t("p",null,[n("Once compiled, the Program object lists "),t("strong",null,"all used uniforms"),n(" and provides a "),t("strong",null,"setter function"),n(" for each one.")],-1),w=t("p",null,[t("strong",null,"Example :"),n(" if we write "),t("code",{class:"language-glsl"},[t("span",{class:"token keyword"},"uniform"),n(),t("span",{class:"token keyword"},"vec3"),n(" uDirection"),t("span",{class:"token punctuation"},";")]),n(" in our shader, once compiled, we can use "),t("code",{class:"language-js"},[n("program"),t("span",{class:"token punctuation"},"."),t("span",{class:"token function"},"uDirection"),t("span",{class:"token punctuation"},"("),t("span",{class:"token number"},"1"),t("span",{class:"token punctuation"},","),n(),t("span",{class:"token number"},"0"),t("span",{class:"token punctuation"},","),n(),t("span",{class:"token number"},"0"),t("span",{class:"token punctuation"},")"),t("span",{class:"token punctuation"},";")])],-1),j=t("p",null,"A uniform setter function supports :",-1),T=t("ul",null,[t("li",null,[n("providing values as Array or TypedArray arguments ("),t("code",{class:"language-glsl"},"uniformNfv"),n(")")]),t("li",null,[n("providing values as arguments directly (except for matrices) ("),t("code",{class:"language-glsl"},"uniformNf"),n(")")])],-1),P=t("p",null,[t("strong",null,"Important :"),n(" The program must be bound before using uniform setters.")],-1),A=t("pre",{class:"language-js"},[t("code",{class:"language-js"},[n("prg"),t("span",{class:"token punctuation"},"."),t("span",{class:"token function"},"use"),t("span",{class:"token punctuation"},"("),t("span",{class:"token punctuation"},")"),t("span",{class:"token punctuation"},";"),n(`

`),t("span",{class:"token comment"},"// set a mat4 uniform with a Float32Array or array"),n(`
prg`),t("span",{class:"token punctuation"},"."),t("span",{class:"token function"},"uModelViewProjection"),t("span",{class:"token punctuation"},"("),n("mvpMatrix"),t("span",{class:"token punctuation"},")"),t("span",{class:"token punctuation"},";"),n(`

`),t("span",{class:"token comment"},"// set a vec3 with separate arguments"),n(`
prg`),t("span",{class:"token punctuation"},"."),t("span",{class:"token function"},"uColor"),t("span",{class:"token punctuation"},"("),t("span",{class:"token number"},"1.0"),t("span",{class:"token punctuation"},","),n(),t("span",{class:"token number"},"1.0"),t("span",{class:"token punctuation"},","),n(),t("span",{class:"token number"},"1.0"),t("span",{class:"token punctuation"},")"),t("span",{class:"token punctuation"},";"),n(`

`),t("span",{class:"token comment"},"// set a vec3 with a (Typed)Array"),n(`
prg`),t("span",{class:"token punctuation"},"."),t("span",{class:"token function"},"uColor"),t("span",{class:"token punctuation"},"("),t("span",{class:"token punctuation"},"["),t("span",{class:"token number"},"1.0"),t("span",{class:"token punctuation"},","),n(),t("span",{class:"token number"},"0.0"),t("span",{class:"token punctuation"},","),n(),t("span",{class:"token number"},"1.0"),t("span",{class:"token punctuation"},"]"),t("span",{class:"token punctuation"},")"),t("span",{class:"token punctuation"},";"),n(`
`)]),t("div",{class:"m-mdic-copy-wrapper"},[t("span",{class:"u-mdic-copy-code_lang"},"js"),t("div",{class:"u-mdic-copy-notify",id:"j-notify-1701968268244-43255"},"copied!"),t("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`prg.use();

// set a mat4 uniform with a Float32Array or array
prg.uModelViewProjection(mvpMatrix);

// set a vec3 with separate arguments
prg.uColor(1.0, 1.0, 1.0);

// set a vec3 with a (Typed)Array
prg.uColor([1.0, 0.0, 1.0]);
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1701968268244-43255","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),E=t("p",null,"A setter function returns the uniform location, so it can also be used like getter when invoked with no arguments.",-1),N=t("pre",{class:"language-js"},[t("code",{class:"language-js"},[t("span",{class:"token comment"},"// call the setter without arguments to get the uniform location"),n(`
`),t("span",{class:"token comment"},"// and set the uniform values manually"),n(`
gl`),t("span",{class:"token punctuation"},"."),t("span",{class:"token function"},"uniform3f"),t("span",{class:"token punctuation"},"("),n("prg"),t("span",{class:"token punctuation"},"."),t("span",{class:"token function"},"uColor"),t("span",{class:"token punctuation"},"("),t("span",{class:"token punctuation"},")"),t("span",{class:"token punctuation"},","),n(),t("span",{class:"token number"},"1.0"),t("span",{class:"token punctuation"},","),n(),t("span",{class:"token number"},"1.0"),t("span",{class:"token punctuation"},","),n(),t("span",{class:"token number"},"1.0"),t("span",{class:"token punctuation"},")"),t("span",{class:"token punctuation"},";"),n(`
`)]),t("div",{class:"m-mdic-copy-wrapper"},[t("span",{class:"u-mdic-copy-code_lang"},"js"),t("div",{class:"u-mdic-copy-notify",id:"j-notify-1701968268244-44337"},"copied!"),t("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`// call the setter without arguments to get the uniform location
// and set the uniform values manually
gl.uniform3f(prg.uColor(), 1.0, 1.0, 1.0);
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1701968268244-44337","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),$=t("h2",{id:"samplers",tabindex:"-1"},"Samplers",-1),I=t("p",null,[t("strong",null,"Important :"),n(" The program must be bound before using sampler/texture setters.")],-1),B=t("pre",{class:"language-js"},[t("code",{class:"language-js"},[n("prg"),t("span",{class:"token punctuation"},"."),t("span",{class:"token function"},"use"),t("span",{class:"token punctuation"},"("),t("span",{class:"token punctuation"},")"),t("span",{class:"token punctuation"},";"),n(`

`),t("span",{class:"token comment"},"// link GL_TEXTURE1 unit to uTexture"),n(`
prg`),t("span",{class:"token punctuation"},"."),t("span",{class:"token function"},"uTexture"),t("span",{class:"token punctuation"},"("),t("span",{class:"token number"},"1"),t("span",{class:"token punctuation"},")"),t("span",{class:"token punctuation"},";"),n(`

`),t("span",{class:"token comment"},"// or directly provide a Texture instance"),n(`
`),t("span",{class:"token comment"},"// in this case, the texture is bound, and assigned to the predefined unit for this sampler"),n(`
prg`),t("span",{class:"token punctuation"},"."),t("span",{class:"token function"},"uTexture"),t("span",{class:"token punctuation"},"("),n("myNanoglTexture"),t("span",{class:"token punctuation"},")"),t("span",{class:"token punctuation"},";"),n(`

`),t("span",{class:"token comment"},"// as before, you can also get the uniform location"),n(`
`),t("span",{class:"token comment"},"// and set the uniform values manually"),n(`
gl`),t("span",{class:"token punctuation"},"."),t("span",{class:"token function"},"uniform1i"),t("span",{class:"token punctuation"},"("),n("prg"),t("span",{class:"token punctuation"},"."),t("span",{class:"token function"},"uTexture"),t("span",{class:"token punctuation"},"("),t("span",{class:"token punctuation"},")"),t("span",{class:"token punctuation"},","),n(),t("span",{class:"token number"},"1"),t("span",{class:"token punctuation"},")"),t("span",{class:"token punctuation"},";"),n(`
`)]),t("div",{class:"m-mdic-copy-wrapper"},[t("span",{class:"u-mdic-copy-code_lang"},"js"),t("div",{class:"u-mdic-copy-notify",id:"j-notify-1701968268244-61554"},"copied!"),t("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`prg.use();

// link GL_TEXTURE1 unit to uTexture
prg.uTexture(1);

// or directly provide a Texture instance
// in this case, the texture is bound, and assigned to the predefined unit for this sampler
prg.uTexture(myNanoglTexture);

// as before, you can also get the uniform location
// and set the uniform values manually
gl.uniform1i(prg.uTexture(), 1);
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1701968268244-61554","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),F=t("h2",{id:"attributes",tabindex:"-1"},"Attributes",-1),D=t("p",null,[n("Once compiled, the Program object also provides a "),t("strong",null,"getter function"),n(" for each attribute, which returns the attribute location.")],-1),V=t("p",null,[t("strong",null,"Example :"),n(" if we write "),t("code",{class:"language-glsl"},[t("span",{class:"token keyword"},"attribute"),n(),t("span",{class:"token keyword"},"vec3"),n(" aPosition"),t("span",{class:"token punctuation"},";")]),n(" in our shader, once compiled, we can use "),t("code",{class:"language-js"},[n("program"),t("span",{class:"token punctuation"},"."),t("span",{class:"token function"},"aPosition"),t("span",{class:"token punctuation"},"("),t("span",{class:"token punctuation"},")"),t("span",{class:"token punctuation"},";")])],-1),O=t("p",null,[t("strong",null,"Important :"),n(" The program must be bound before using call related gl methods.")],-1),U=t("pre",{class:"language-js"},[t("code",{class:"language-js"},[n("prg"),t("span",{class:"token punctuation"},"."),t("span",{class:"token function"},"use"),t("span",{class:"token punctuation"},"("),t("span",{class:"token punctuation"},")"),t("span",{class:"token punctuation"},";"),n(`

`),t("span",{class:"token comment"},"// set the attribute data using the attribute location"),n(`
gl`),t("span",{class:"token punctuation"},"."),t("span",{class:"token function"},"vertexAttribPointer"),t("span",{class:"token punctuation"},"("),n("prg"),t("span",{class:"token punctuation"},"."),t("span",{class:"token function"},"aPosition"),t("span",{class:"token punctuation"},"("),t("span",{class:"token punctuation"},")"),t("span",{class:"token punctuation"},","),n(),t("span",{class:"token number"},"3"),t("span",{class:"token punctuation"},","),n(" gl"),t("span",{class:"token punctuation"},"."),t("span",{class:"token constant"},"FLOAT"),t("span",{class:"token punctuation"},","),n(),t("span",{class:"token operator"},"..."),t("span",{class:"token punctuation"},")"),t("span",{class:"token punctuation"},";"),n(`
`)]),t("div",{class:"m-mdic-copy-wrapper"},[t("span",{class:"u-mdic-copy-code_lang"},"js"),t("div",{class:"u-mdic-copy-notify",id:"j-notify-1701968268244-32797"},"copied!"),t("button",{class:"u-mdic-copy-btn j-mdic-copy-btn","data-mdic-content":`prg.use();

// set the attribute data using the attribute location
gl.vertexAttribPointer(prg.aPosition(), 3, gl.FLOAT, ...);
`,"data-mdic-attach-content":"","data-mdic-notify-id":"j-notify-1701968268244-32797","data-mdic-notify-delay":"2000","data-mdic-copy-fail-text":"failed",onclick:"!function(t){const e={copy:(t='',e='')=>new Promise((c,o)=>{const n=document.createElement('textarea'),d=e?`\\n\\n${e}`:e;n.value=`${t}${d}`,document.body.appendChild(n),n.select();try{const t=document.execCommand('copy');document.body.removeChild(n),t?c():o()}catch(t){document.body.removeChild(n),o()}}),btnClick(t){const c=t&&t.dataset?t.dataset:{},o=c.mdicNotifyId,n=document.getElementById(o),d=c.mdicNotifyDelay,i=c.mdicCopyFailText;e.copy(c.mdicContent,c.mdicAttachContent).then(()=>{n.style.display='block',setTimeout(()=>{n.style.display='none'},d)}).catch(()=>{alert(i)})}};e.btnClick(t)}(this);"},"copy")])],-1),L=c('<div class="toc-wrapper"><p><div class="toc"><h2 class="my-8">Summary</h2><ul><li><a href="#create">Create a program</a></li><li><a href="#bind-program">Bind program</a></li><li><a href="#uniforms">Uniforms</a></li><li><a href="#samplers">Samplers</a></li><li><a href="#attributes">Attributes</a></li></ul></div></p></div>',1),M={__name:"program",setup(S,{expose:i}){return i({frontmatter:{}}),(G,R)=>{const o=p,l=r("router-link");return d(),u("div",m,[t("div",y,[k,g,h,f,b,_,C,v,x,e(o,{type:"example"},{default:a(()=>[w]),_:1}),j,T,e(o,{type:"important"},{default:a(()=>[P]),_:1}),A,E,N,$,t("p",null,[n("Textures/samplers work like the other uniforms, but the setter function also supports providing a nanogl "),e(l,{to:"/guide/quick-guides/texture-2d"},{default:a(()=>[n("Texture2D")]),_:1}),n(" argument.")]),e(o,{type:"important"},{default:a(()=>[I]),_:1}),B,F,D,e(o,{type:"example"},{default:a(()=>[V]),_:1}),e(o,{type:"important"},{default:a(()=>[O]),_:1}),U]),L])}}};typeof s=="function"&&s(M);export{M as default};
