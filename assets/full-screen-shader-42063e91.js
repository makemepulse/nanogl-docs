import{_ as r}from"./GLPreview.vue_vue_type_script_setup_true_lang-0fa5b2e8.js";import{_ as i}from"./UICallout.vue_vue_type_script_setup_true_lang-9ed50965.js";import{b as p}from"./route-block-83d24a4e.js";import{A as k,C as d,E as n,O as a,I as o,P as s,z as m,J as t}from"./runtime-core.esm-bundler-b2e16801.js";import"./index-399247c5.js";const g={class:"markdown-body"},h={class:"content-wrapper"},f=s(`<h1 id="full-screen-shader" tabindex="-1">Full-screen shader</h1><p>We might want to simply render a full-screen shader with nanogl. Let’s see how to do that.</p><p>We’ll start with the canvas &amp; context setup from the <a href="/nanogl-docs/guide/getting-started/add-movement">Add some movement</a> article.</p><h2 id="create-a-quad" tabindex="-1">Create a quad</h2><p>First, we need to create a quad. We don’t want any projection, so we don’t need to setup a camera.</p><p>Let’s create an <a href="/nanogl-docs/api/nanogl/classes/ArrayBuffer">ArrayBuffer</a>, with the position &amp; uvs datas we need for each vertice.</p><p>We need 2 triangles, with positions from -1 to 1 on both axes, and uvs going from 0 to 1 on both axes, to cover the screen.</p><pre class="language-js"><code class="language-js"><span class="token comment">// ...</span>

<span class="token keyword">import</span> ArrayBuffer <span class="token keyword">from</span> <span class="token string">&quot;nanogl/arraybuffer&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// ...</span>

<span class="token comment">// simple rectangle with vec2 position and vec2 uvs</span>
<span class="token comment">// each vertice will have 2 numbers for position and 2 numbers for uvs</span>
<span class="token keyword">const</span> quadData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Float32Array</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
  <span class="token comment">// 1st triangle</span>
  <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">// position = vec2(-1, -1) / uvs = vec2(0, 0)</span>
  <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token comment">// 2nd triangle</span>
  <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> quad <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayBuffer</span><span class="token punctuation">(</span>gl<span class="token punctuation">,</span> quadData<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// declare aPosition attribute as vec2</span>
quad<span class="token punctuation">.</span><span class="token function">attrib</span><span class="token punctuation">(</span><span class="token string">&#39;aPosition&#39;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> gl<span class="token punctuation">.</span><span class="token constant">FLOAT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// declare aTexCoord attribute as vec2</span>
quad<span class="token punctuation">.</span><span class="token function">attrib</span><span class="token punctuation">(</span><span class="token string">&#39;aTexCoord&#39;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> gl<span class="token punctuation">.</span><span class="token constant">FLOAT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>`,8),b=n("p",null,[n("strong",null,"Note :"),t(" To make things easier, we could use a "),n("a",{href:"/nanogl-docs/api/nanogl-primitives-2d/classes/Rect"},"Rect"),t(" to create a quad buffer like this. For this example, we will create our own buffers.")],-1),w=s(`<h2 id="create-the-program" tabindex="-1">Create the program</h2><p>Now, we need to create the <a href="/nanogl-docs/api/nanogl/classes/Program">Program</a>. Let’s start with the shader.</p><h3 id="vertex-shader" tabindex="-1">Vertex shader</h3><p>In our vertex shader, we only need to set the position, without any projection, and to pass our uvs datas to the fragment shader.</p><pre class="language-glsl"><code class="language-glsl"><span class="token keyword">attribute</span> <span class="token keyword">vec2</span> aPosition<span class="token punctuation">;</span>
<span class="token keyword">attribute</span> <span class="token keyword">vec2</span> aTexCoord<span class="token punctuation">;</span>

<span class="token keyword">varying</span> <span class="token keyword">vec2</span> vUv<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  gl_Position <span class="token operator">=</span> <span class="token keyword">vec4</span><span class="token punctuation">(</span>aPosition<span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">,</span> <span class="token number">1.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  vUv <span class="token operator">=</span> aTexCoord<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><h3 id="fragment-shader" tabindex="-1">Fragment shader</h3><p>Now, let’s simply use our uvs for the color.</p><pre class="language-glsl"><code class="language-glsl"><span class="token keyword">precision</span> <span class="token keyword">lowp</span> <span class="token keyword">float</span><span class="token punctuation">;</span>

<span class="token keyword">varying</span> <span class="token keyword">vec2</span> vUv<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  gl_FragColor <span class="token operator">=</span> <span class="token keyword">vec4</span><span class="token punctuation">(</span>vUv<span class="token punctuation">,</span> <span class="token number">0.</span><span class="token punctuation">,</span> <span class="token number">1.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><h3 id="program" tabindex="-1">Program</h3><p>And finally, let’s create our program with our shader code.</p><pre class="language-js"><code class="language-js"><span class="token comment">// ...</span>

<span class="token keyword">import</span> Program <span class="token keyword">from</span> <span class="token string">&quot;nanogl/program&quot;</span>

<span class="token comment">// ...</span>

<span class="token keyword">const</span> vertexShader <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  // vertex shader code
</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
<span class="token keyword">const</span> fragmentShader <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  // fragment shader code
</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>

<span class="token keyword">const</span> prg <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Program</span><span class="token punctuation">(</span>gl<span class="token punctuation">,</span> vertexShader<span class="token punctuation">,</span> fragmentShader<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><h2 id="draw-the-quad" tabindex="-1">Draw the quad</h2><p>We can now create our render function.</p><p>We can keep it simple for now, just binding the program and drawing the quad.</p><pre class="language-js"><code class="language-js"><span class="token comment">// ...</span>

<span class="token keyword">const</span> <span class="token function-variable function">render</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// setup viewport</span>
  gl<span class="token punctuation">.</span><span class="token function">viewport</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> size<span class="token punctuation">.</span>width<span class="token punctuation">,</span> size<span class="token punctuation">.</span>height<span class="token punctuation">)</span><span class="token punctuation">;</span>
  gl<span class="token punctuation">.</span><span class="token function">clearColor</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  gl<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span>gl<span class="token punctuation">.</span><span class="token constant">COLOR_BUFFER_BIT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// bind program</span>
  prg<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// link the quad buffer to the program, and draw</span>
  quad<span class="token punctuation">.</span><span class="token function">attribPointer</span><span class="token punctuation">(</span>prg<span class="token punctuation">)</span><span class="token punctuation">;</span>
  quad<span class="token punctuation">.</span><span class="token function">drawTriangles</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>render<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><h2 id="add-some-movement" tabindex="-1">Add some movement</h2><p>Let’s add some movement to our shader. We will change the blue value of the color over time.</p><p>As seen in the <a href="/nanogl-docs/guide/getting-started/add-movement">Add some movement</a> article, we can pass a timestamp to the render function.</p><p>Let’s use it to set a time uniform in our shader.</p><pre class="language-js"><code class="language-js"><span class="token comment">// ...</span>

<span class="token keyword">const</span> <span class="token function-variable function">render</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">time</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>

  <span class="token comment">// bind program</span>
  prg<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// setup program uniforms</span>
  prg<span class="token punctuation">.</span><span class="token function">uTime</span><span class="token punctuation">(</span>time <span class="token operator">*</span> <span class="token number">0.001</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token function">render</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><p>And in our fragment shader, we can set our blue value according to the time value.</p><pre class="language-glsl"><code class="language-glsl"><span class="token keyword">precision</span> <span class="token keyword">lowp</span> <span class="token keyword">float</span><span class="token punctuation">;</span>

<span class="token keyword">uniform</span> <span class="token keyword">float</span> uTime<span class="token punctuation">;</span>

<span class="token keyword">varying</span> <span class="token keyword">vec2</span> vUv<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// we&#39;ll make the value oscillate between 0 and 1 over time</span>
  <span class="token keyword">float</span> blue <span class="token operator">=</span> <span class="token function">cos</span><span class="token punctuation">(</span>uTime<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">0.5</span> <span class="token operator">+</span> <span class="token number">0.5</span><span class="token punctuation">;</span>
  gl_FragColor <span class="token operator">=</span> <span class="token keyword">vec4</span><span class="token punctuation">(</span>vUv<span class="token punctuation">,</span> blue<span class="token punctuation">,</span> <span class="token number">1.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><h2 id="optimization" tabindex="-1">Optimization</h2><p>There is a way to optimize our full-screen shader. We can draw a single triangle covering the whole screen, instead of drawing 2.</p><p>To do so, we need to create a triangle with its bottom left corner being at <code class="language-js"><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span></code>, and its hypotenuse going through the top right corner of the screen. So the other vertices of the triangle need to be at <code class="language-js"><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span></code> and <code class="language-js"><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span></code>.</p><p>We also need to adapt the uvs data to make sure the visible part of the triangle, being our quad, has uvs going from 0 to 1 on both axes. So our triangle’s uvs need to go from 0 to 2.</p><p>To do so, we only need to modify our quadData array buffer.</p><pre class="language-js"><code class="language-js">
<span class="token comment">// ...</span>

<span class="token comment">// full-screen triangle with vec2 position and vec2 uvs</span>
<span class="token keyword">const</span> quadData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Float32Array</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
  <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">3</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// ...</span>
</code></pre><h2 id="result" tabindex="-1">Result</h2><p>And now you have a full-screen shader !</p>`,30),v=s(`<h2 id="final-code" tabindex="-1">Final code</h2><p>Here is the complete code for the js file :</p><pre class="language-js"><code class="language-js"><span class="token keyword">import</span> Program <span class="token keyword">from</span> <span class="token string">&quot;nanogl/program&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> ArrayBuffer <span class="token keyword">from</span> <span class="token string">&quot;nanogl/arraybuffer&quot;</span><span class="token punctuation">;</span>

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

<span class="token comment">// --BUFFER--</span>

<span class="token comment">// full-screen triangle with vec2 position and vec2 uvs</span>
<span class="token keyword">const</span> quadData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Float32Array</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
  <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">3</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> quad <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayBuffer</span><span class="token punctuation">(</span>gl<span class="token punctuation">,</span> quadData<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// declare aPosition attribute as vec2</span>
quad<span class="token punctuation">.</span><span class="token function">attrib</span><span class="token punctuation">(</span><span class="token string">&#39;aPosition&#39;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> gl<span class="token punctuation">.</span><span class="token constant">FLOAT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
quad<span class="token punctuation">.</span><span class="token function">attrib</span><span class="token punctuation">(</span><span class="token string">&#39;aTexCoord&#39;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> gl<span class="token punctuation">.</span><span class="token constant">FLOAT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// --PROGRAM--</span>

<span class="token keyword">const</span> vertexShader <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  attribute vec2 aPosition;
  attribute vec2 aTexCoord;

  varying vec2 vUv;

  void main(void){
    gl_Position = vec4(aPosition, 0.0, 1.0);
    vUv = aTexCoord;
  }
</span><span class="token template-punctuation string">\`</span></span>
<span class="token keyword">const</span> fragmentShader <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  precision lowp float;

  uniform float uTime;

  varying vec2 vUv;

  void main(void){
    // we&#39;ll make the value oscillate between 0 and 1 over time
    float blue = cos(uTime) * 0.5 + 0.5;
    gl_FragColor = vec4(vUv, blue, 1.0);
  }
</span><span class="token template-punctuation string">\`</span></span>

<span class="token keyword">const</span> prg <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Program</span><span class="token punctuation">(</span>gl<span class="token punctuation">,</span> vertexShader<span class="token punctuation">,</span> fragmentShader<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// --RENDER--</span>

<span class="token keyword">const</span> <span class="token function-variable function">render</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">time</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// setup viewport</span>
  gl<span class="token punctuation">.</span><span class="token function">viewport</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> size<span class="token punctuation">.</span>width<span class="token punctuation">,</span> size<span class="token punctuation">.</span>height<span class="token punctuation">)</span><span class="token punctuation">;</span>
  gl<span class="token punctuation">.</span><span class="token function">clearColor</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  gl<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span>gl<span class="token punctuation">.</span><span class="token constant">COLOR_BUFFER_BIT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// bind program</span>
  prg<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  prg<span class="token punctuation">.</span><span class="token function">uTime</span><span class="token punctuation">(</span>time <span class="token operator">*</span> <span class="token number">0.001</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// link the quad buffer to the program, and draw</span>
  quad<span class="token punctuation">.</span><span class="token function">attribPointer</span><span class="token punctuation">(</span>prg<span class="token punctuation">)</span><span class="token punctuation">;</span>
  quad<span class="token punctuation">.</span><span class="token function">drawTriangles</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>render<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">render</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>`,3),y=s('<div class="toc-wrapper"><p><div class="toc"><h2 class="my-8">Summary</h2><ul><li><a href="#create-a-quad">Create a quad</a></li><li><a href="#create-the-program">Create the program</a><ul><li><a href="#vertex-shader">Vertex shader</a></li><li><a href="#fragment-shader">Fragment shader</a></li><li><a href="#program">Program</a></li></ul></li><li><a href="#draw-the-quad">Draw the quad</a></li><li><a href="#add-some-movement">Add some movement</a></li><li><a href="#optimization">Optimization</a></li><li><a href="#result">Result</a></li><li><a href="#final-code">Final code</a></li></ul></div></p></div>',1),_={class:"nav-wrapper"},x={__name:"full-screen-shader",setup(q,{expose:e}){return e({frontmatter:{}}),(A,C)=>{const c=i,u=r,l=m("RouterLink");return k(),d("div",g,[n("div",h,[f,a(c,null,{default:o(()=>[b]),_:1}),w,a(u,{name:"full-screen-shader",folder:"guide"}),v]),y,n("div",_,[a(l,{to:"/guide/getting-started/load-gltf",class:"prev"},{default:o(()=>[t("Load a GLTF model")]),_:1})])])}}};typeof p=="function"&&p(x);export{x as default};
