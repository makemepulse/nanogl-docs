import{_ as u}from"./GLPreview.vue_vue_type_script_setup_true_lang-cb40796a.js";import{_ as l}from"./UICallout.vue_vue_type_script_setup_true_lang-9ed50965.js";import{b as t}from"./route-block-83d24a4e.js";import{A as i,C as k,E as n,O as p,I as r,P as s,J as a}from"./runtime-core.esm-bundler-b2e16801.js";import"./index-c251adfe.js";const m={class:"markdown-body"},d={class:"content-wrapper"},h=s(`<h1 id="add-some-movement" tabindex="-1">Add some movement</h1><p>At the end of the last article, we had a static render of a triangle. But usually, we don’t want a static render, but an animated one. So let’s add some movmement.</p><p>We’ll start out with the code we created in the <a href="creating-a-scene#final-code">last article</a>.</p><h2 id="setup-render-loop" tabindex="-1">Setup render loop</h2><p>To have an animated scene, we need to setup a render loop. This is not specific to nanogl, you can do this as you would in your usual WebGL project.</p><p>Let’s take our render function, and add <code class="language-js"><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>render<span class="token punctuation">)</span></code> inside.</p><pre class="language-js"><code class="language-js"><span class="token comment">// ...</span>

<span class="token keyword">const</span> <span class="token function-variable function">render</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>

  <span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>render<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><p>This will call the <code class="language-js">render</code> function on every screen refresh.</p><p>You can also remove the render call from the <code class="language-js">handleResize</code> function now.</p><h2 id="create-the-node" tabindex="-1">Create the node</h2><p>To add some movement, we’d like to be able to choose a specific position, rotation and scale. To setup these transform values, we can use a <a href="/nanogl-docs/api/nanogl-node/classes/Node">Node</a>.</p><p>The Node will provide us some helpers to set these values, and get the corresponding world matrix.</p><pre class="language-js"><code class="language-js"><span class="token comment">// ...</span>

<span class="token keyword">import</span> Node <span class="token keyword">from</span> <span class="token string">&quot;nanogl-node&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// ...</span>

<span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// you can set position</span>
node<span class="token punctuation">.</span>position<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// you can set scale</span>
node<span class="token punctuation">.</span><span class="token function">setScale</span><span class="token punctuation">(</span><span class="token number">1.5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// and you can rotate along any axis</span>
node<span class="token punctuation">.</span><span class="token function">rotateZ</span><span class="token punctuation">(</span><span class="token number">90</span> <span class="token operator">*</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">/</span> <span class="token number">180.0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// rotation is in radians</span>
</code></pre><p>Then, in our render function we can get the model view projection matrix and update the <code class="language-js">uMVP</code> uniform with it.</p><pre class="language-js"><code class="language-js"><span class="token comment">// ...</span>

<span class="token keyword">const</span> <span class="token constant">M4</span> <span class="token operator">=</span> mat4<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">render</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>

  camera<span class="token punctuation">.</span><span class="token function">updateWorldMatrix</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  camera<span class="token punctuation">.</span><span class="token function">updateViewProjectionMatrix</span><span class="token punctuation">(</span>size<span class="token punctuation">.</span>width<span class="token punctuation">,</span> size<span class="token punctuation">.</span>height<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// after updating the camera view projection matrix</span>
  <span class="token comment">// get the model view projection matrix from camera with node world matrix</span>
  camera<span class="token punctuation">.</span><span class="token function">modelViewProjectionMatrix</span><span class="token punctuation">(</span><span class="token constant">M4</span><span class="token punctuation">,</span> node<span class="token punctuation">.</span>_wmatrix<span class="token punctuation">)</span><span class="token punctuation">;</span>

  prg<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// update uMVP with calculated model view projection matrix</span>
  prg<span class="token punctuation">.</span><span class="token function">uMVP</span><span class="token punctuation">(</span><span class="token constant">M4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><h2 id="play-transform" tabindex="-1">Play with the transform values</h2><p>Now we can animate the transform values.</p><p>Bafore starting, we need to remove the transform values we set right after creating the node. We’ll set these values in the render function now.</p><h3 id="setup-a-function" tabindex="-1">Setup a function</h3><p>Let’s start by creating an <code class="language-js">animate</code> function, and calling it at each frame.</p><p>The <code class="language-js">requestAnimationFrame</code> function provides the callback with a <code class="language-js">time</code> argument : it is a timestamp of the end time of the previous frame’s rendering. Let’s pass this value from the <code class="language-js">render</code> function to the <code class="language-js">animate</code> function, as it will be useful for our animations.</p><pre class="language-js"><code class="language-js"><span class="token comment">// ...</span>

<span class="token keyword">const</span> <span class="token function-variable function">animate</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">time</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// animations</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">render</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">time</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">animate</span><span class="token punctuation">(</span>time<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><h3 id="position-%26-scale" tabindex="-1">Position &amp; scale</h3><p>For the position and the scale, we want the value to oscillate. The time value increases at each render, so we can use it with <code class="language-js">Math<span class="token punctuation">.</span>cos</code> or <code class="language-js">Math<span class="token punctuation">.</span>sin</code> to get an oscillation over time.</p><pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">animate</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">time</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// times is in ms, we need to slow down the progress</span>
  <span class="token keyword">const</span> progress <span class="token operator">=</span> time <span class="token operator">*</span> <span class="token number">0.001</span><span class="token punctuation">;</span>

  <span class="token comment">// make y position vary between -1 and 1</span>
  node<span class="token punctuation">.</span>position<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">cos</span><span class="token punctuation">(</span>progress<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// make scale vary between 1 and 2</span>
  node<span class="token punctuation">.</span><span class="token function">setScale</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">sin</span><span class="token punctuation">(</span>progress<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">0.5</span> <span class="token operator">+</span> <span class="token number">1.5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><h3 id="rotation" tabindex="-1">Rotation</h3><p>The rotation is a bit different, as we can use the <code class="language-js">rotateZ</code> function to rotate along the z axis relatively to its current rotation. So we can simply call the <code class="language-js">rotateZ</code> function each frame to rotate continuously.</p><pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">animate</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">time</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>

  <span class="token comment">// rotate by 0.5deg on z axis on each frame</span>
  node<span class="token punctuation">.</span><span class="token function">rotateZ</span><span class="token punctuation">(</span><span class="token number">0.5</span> <span class="token operator">*</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">/</span> <span class="token number">180.0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// rotation is in radians</span>
<span class="token punctuation">}</span>
</code></pre><h3 id="world-matrix" tabindex="-1">World matrix</h3><p>Now we need to update the node world matrix to reflect these changes.</p>`,30),f=n("p",null,[n("strong",null,"Important :"),a(" Make sure you update the node world matrix "),n("em",null,"after"),a(" the transforms and "),n("em",null,"before"),a(" computing the model view projection matrix.")],-1),g=s(`<pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">animate</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">time</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>

  <span class="token comment">// update world matrix after the changes</span>
  node<span class="token punctuation">.</span><span class="token function">invalidate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  node<span class="token punctuation">.</span><span class="token function">updateWorldMatrix</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><h2 id="result" tabindex="-1">Result</h2><p>That’s it, now the triangle’s position, scale and rotation are evolving over time.</p>`,3),w=s(`<h2 id="final-code" tabindex="-1">Final code</h2><p>Here is the complete code for the js file :</p><pre class="language-js"><code class="language-js"><span class="token keyword">import</span> Node <span class="token keyword">from</span> <span class="token string">&quot;nanogl-node&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> Camera <span class="token keyword">from</span> <span class="token string">&quot;nanogl-camera&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> Program <span class="token keyword">from</span> <span class="token string">&quot;nanogl/program&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> ArrayBuffer <span class="token keyword">from</span> <span class="token string">&quot;nanogl/arraybuffer&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> PerspectiveLens <span class="token keyword">from</span> <span class="token string">&quot;nanogl-camera/perspective-lens&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> mat4 <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;gl-matrix&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// --CANVAS &amp; CONTEXT--</span>

<span class="token keyword">const</span> canvas <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;canvas&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>canvas<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> gl <span class="token operator">=</span> canvas<span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token string">&quot;webgl&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// --SIZING--</span>

<span class="token keyword">const</span> size <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> pixelRatio <span class="token operator">=</span> window<span class="token punctuation">.</span>devicePixelRatio<span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">handleResize</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">entries</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// get canvas width &amp; height</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">width</span><span class="token operator">:</span> canvasWidth<span class="token punctuation">,</span>
    <span class="token literal-property property">height</span><span class="token operator">:</span> canvasHeight
  <span class="token punctuation">}</span> <span class="token operator">=</span> entries<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>contentRect<span class="token punctuation">;</span>

  <span class="token comment">// set canvas size to display size multiplied by pixel ratio</span>
  canvas<span class="token punctuation">.</span>width <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">round</span><span class="token punctuation">(</span>canvasWidth <span class="token operator">*</span> pixelRatio<span class="token punctuation">)</span><span class="token punctuation">;</span>
  canvas<span class="token punctuation">.</span>height <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">round</span><span class="token punctuation">(</span>canvasHeight <span class="token operator">*</span> pixelRatio<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// set size variable to actual size of the current drawing buffer</span>
  size<span class="token punctuation">.</span>width <span class="token operator">=</span> gl<span class="token punctuation">.</span>drawingBufferWidth<span class="token punctuation">;</span>
  size<span class="token punctuation">.</span>height <span class="token operator">=</span> gl<span class="token punctuation">.</span>drawingBufferHeight<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> resizeObserver <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ResizeObserver</span><span class="token punctuation">(</span>handleResize<span class="token punctuation">)</span><span class="token punctuation">;</span>
resizeObserver<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span>canvas<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// --CAMERA--</span>

<span class="token keyword">const</span> camera <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Camera</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">PerspectiveLens</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
camera<span class="token punctuation">.</span>lens<span class="token punctuation">.</span><span class="token function">setAutoFov</span><span class="token punctuation">(</span><span class="token number">35.0</span> <span class="token operator">*</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">/</span> <span class="token number">180.0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// fov is in radians</span>
camera<span class="token punctuation">.</span>lens<span class="token punctuation">.</span>near <span class="token operator">=</span> <span class="token number">.01</span><span class="token punctuation">;</span>
camera<span class="token punctuation">.</span>lens<span class="token punctuation">.</span>far <span class="token operator">=</span> <span class="token number">50</span><span class="token punctuation">;</span>
camera<span class="token punctuation">.</span>position<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// set camera back on z axis</span>
camera<span class="token punctuation">.</span><span class="token function">lookAt</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// look at origin point</span>

<span class="token comment">// --BUFFER--</span>

<span class="token comment">// simple triangle with vec2 position</span>
<span class="token keyword">const</span> shapeVertices <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Float32Array</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> shape <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayBuffer</span><span class="token punctuation">(</span>gl<span class="token punctuation">,</span> shapeVertices<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// declare aPosition attribute as vec2</span>
shape<span class="token punctuation">.</span><span class="token function">attrib</span><span class="token punctuation">(</span><span class="token string">&#39;aPosition&#39;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> gl<span class="token punctuation">.</span><span class="token constant">FLOAT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// --PROGRAM--</span>

<span class="token keyword">const</span> vertexShader <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  attribute vec2 aPosition;

  uniform mat4 uMVP;

  void main(void){
    vec4 pos = vec4(aPosition, 0.0, 1.0);
    gl_Position = uMVP * pos;
  }
</span><span class="token template-punctuation string">\`</span></span>
<span class="token keyword">const</span> fragmentShader <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  precision lowp float;
  void main(void){
    vec3 red = vec3(1.0, 0.0, 0.0);
    gl_FragColor = vec4(red, 1.0);
  }
</span><span class="token template-punctuation string">\`</span></span>

<span class="token keyword">const</span> prg <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Program</span><span class="token punctuation">(</span>gl<span class="token punctuation">,</span> vertexShader<span class="token punctuation">,</span> fragmentShader<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// --NODE--</span>

<span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// --RENDER--</span>

<span class="token keyword">const</span> <span class="token constant">M4</span> <span class="token operator">=</span> mat4<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">animate</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">time</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// times is in ms, we need to slow down the progress</span>
  <span class="token keyword">const</span> progress <span class="token operator">=</span> time <span class="token operator">*</span> <span class="token number">0.001</span><span class="token punctuation">;</span>

  <span class="token comment">// make y position vary between -1 and 1</span>
  node<span class="token punctuation">.</span>position<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">cos</span><span class="token punctuation">(</span>progress<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// make scale vary between 1 and 2</span>
  node<span class="token punctuation">.</span><span class="token function">setScale</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">sin</span><span class="token punctuation">(</span>progress<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">0.5</span> <span class="token operator">+</span> <span class="token number">1.5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// rotate by 0.5deg on z axis on each frame</span>
  node<span class="token punctuation">.</span><span class="token function">rotateZ</span><span class="token punctuation">(</span><span class="token number">0.5</span> <span class="token operator">*</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">/</span> <span class="token number">180.0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// rotation is in radians</span>

  <span class="token comment">// update world matrix after the changes</span>
  node<span class="token punctuation">.</span><span class="token function">invalidate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  node<span class="token punctuation">.</span><span class="token function">updateWorldMatrix</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">render</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">time</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">animate</span><span class="token punctuation">(</span>time<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// set viewport size</span>
  gl<span class="token punctuation">.</span><span class="token function">viewport</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> size<span class="token punctuation">.</span>width<span class="token punctuation">,</span> size<span class="token punctuation">.</span>height<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// clear viewport</span>
  gl<span class="token punctuation">.</span><span class="token function">clearColor</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  gl<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span>gl<span class="token punctuation">.</span><span class="token constant">COLOR_BUFFER_BIT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// update camera matrices</span>
  camera<span class="token punctuation">.</span><span class="token function">updateWorldMatrix</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  camera<span class="token punctuation">.</span><span class="token function">updateViewProjectionMatrix</span><span class="token punctuation">(</span>size<span class="token punctuation">.</span>width<span class="token punctuation">,</span> size<span class="token punctuation">.</span>height<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// get model view projection matrix from camera with node world matrix</span>
  camera<span class="token punctuation">.</span><span class="token function">modelViewProjectionMatrix</span><span class="token punctuation">(</span><span class="token constant">M4</span><span class="token punctuation">,</span> node<span class="token punctuation">.</span>_wmatrix<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// bind program</span>
  prg<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// update program uniforms</span>
  prg<span class="token punctuation">.</span><span class="token function">uMVP</span><span class="token punctuation">(</span><span class="token constant">M4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// link the shape buffer to the program, and draw</span>
  shape<span class="token punctuation">.</span><span class="token function">attribPointer</span><span class="token punctuation">(</span>prg<span class="token punctuation">)</span><span class="token punctuation">;</span>
  shape<span class="token punctuation">.</span><span class="token function">drawTriangles</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>render<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>`,3),b=s('<div class="toc-wrapper"><p><div class="toc"><h2 class="my-8">Summary</h2><ul><li><a href="#setup-render-loop">Setup render loop</a></li><li><a href="#create-the-node">Create the node</a></li><li><a href="#play-transform">Play with the transform values</a><ul><li><a href="#setup-a-function">Setup a function</a></li><li><a href="#position-%26-scale">Position &amp; scale</a></li><li><a href="#rotation">Rotation</a></li><li><a href="#world-matrix">World matrix</a></li></ul></li><li><a href="#result">Result</a></li><li><a href="#final-code">Final code</a></li></ul></div></p></div>',1),v={__name:"add-movement",setup(y,{expose:o}){return o({frontmatter:{}}),(j,_)=>{const e=l,c=u;return i(),k("div",m,[n("div",d,[h,p(e,{type:"important"},{default:r(()=>[f]),_:1}),g,p(c,{name:"add-movement",folder:"guide"}),w]),b])}}};typeof t=="function"&&t(v);export{v as default};
