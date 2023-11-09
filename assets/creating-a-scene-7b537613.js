import{_ as l}from"./UICallout.vue_vue_type_script_setup_true_lang-bdd39519.js";import{b as t}from"./route-block-83d24a4e.js";import{A as u,C as i,E as n,O as p,I as o,P as e,J as s}from"./runtime-core.esm-bundler-010fdffb.js";const k={class:"markdown-body"},r={class:"content-wrapper"},m=n("h1",{id:"creating-a-scene",tabindex:"-1"},"Creating a scene",-1),d=n("p",null,"Let’s begin by creating a simple scene, rendering a triangle.",-1),h=n("p",null,[n("strong",null,"Note :"),s(" You will need to install some libraries for this guide. All the imports are specified in the code samples, so please install the packages when you see an import for a lib that you do not already have installed.")],-1),g=n("h2",{id:"setup-canvas-context",tabindex:"-1"},"Setup the canvas & context",-1),w=n("p",null,[n("strong",null,"Important :"),s(" This part is necessary for every article in the "),n("em",null,"Getting Started"),s(" guide. The code will be used as the base for all the other articles.")],-1),f=e(`<p>We can start by setting up the canvas &amp; context. This is not specific to nanogl, you can do this as you would your usual WebGL project.</p><p>First, in a Javascript file, we need to create the canvas in which we will render our WebGL project, and get the WebGL rendering context.</p><pre class="language-js"><code class="language-js"><span class="token keyword">const</span> canvas <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;canvas&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>canvas<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> gl <span class="token operator">=</span> canvas<span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token string">&quot;webgl&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><p>In our CSS, we can make our canvas full-screen.</p><pre class="language-css"><code class="language-css"><span class="token selector">canvas</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100vw<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100vh<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p>Then, we need to handle the canvas sizing.</p><pre class="language-js"><code class="language-js"><span class="token comment">// ...</span>

<span class="token keyword">const</span> size <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> pixelRatio <span class="token operator">=</span> window<span class="token punctuation">.</span>devicePixelRatio<span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">handleResize</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// get window width &amp; height (since our canvas is full-screen)</span>
  <span class="token keyword">const</span> canvasWidth <span class="token operator">=</span> window<span class="token punctuation">.</span>innerWidth<span class="token punctuation">;</span>
  <span class="token keyword">const</span> canvasHeight <span class="token operator">=</span> window<span class="token punctuation">.</span>innerHeight<span class="token punctuation">;</span>

  <span class="token comment">// set canvas size to display size multiplied by pixel ratio</span>
  canvas<span class="token punctuation">.</span>width <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">round</span><span class="token punctuation">(</span>canvasWidth <span class="token operator">*</span> pixelRatio<span class="token punctuation">)</span><span class="token punctuation">;</span>
  canvas<span class="token punctuation">.</span>height <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">round</span><span class="token punctuation">(</span>canvasHeight <span class="token operator">*</span> pixelRatio<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// set size variable to actual size of the current drawing buffer</span>
  size<span class="token punctuation">.</span>width <span class="token operator">=</span> gl<span class="token punctuation">.</span>drawingBufferWidth<span class="token punctuation">;</span>
  size<span class="token punctuation">.</span>height <span class="token operator">=</span> gl<span class="token punctuation">.</span>drawingBufferHeight<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;resize&#39;</span><span class="token punctuation">,</span> handleResize<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">handleResize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><h2 id="create-the-camera" tabindex="-1">Create the camera</h2><p>Now we can create the <a href="../../api/nanogl-camera/classes/Camera">Camera</a>. We will use a <a href="../../api/nanogl-camera/classes/PerspectiveLens">PerspectiveLens</a>, but you can also choose an <a href="../../api/nanogl-camera/classes/OrthographicLens">OrthographicLens</a>.</p><p>We’ll set some parameters too : the FOV, the near &amp; far planes, the position &amp; the rotation.</p><pre class="language-js"><code class="language-js"><span class="token keyword">import</span> Camera <span class="token keyword">from</span> <span class="token string">&quot;nanogl-camera&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> PerspectiveLens <span class="token keyword">from</span> <span class="token string">&quot;nanogl-camera/perspective-lens&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// ...</span>

<span class="token keyword">const</span> camera <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Camera</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">PerspectiveLens</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
camera<span class="token punctuation">.</span>lens<span class="token punctuation">.</span><span class="token function">setAutoFov</span><span class="token punctuation">(</span><span class="token number">35.0</span> <span class="token operator">*</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">/</span> <span class="token number">180.0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// fov is in radians</span>
camera<span class="token punctuation">.</span>lens<span class="token punctuation">.</span>near <span class="token operator">=</span> <span class="token number">.01</span><span class="token punctuation">;</span>
camera<span class="token punctuation">.</span>lens<span class="token punctuation">.</span>far <span class="token operator">=</span> <span class="token number">50</span><span class="token punctuation">;</span>
camera<span class="token punctuation">.</span>position<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// set camera back on z axis</span>
camera<span class="token punctuation">.</span><span class="token function">lookAt</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// look at origin point</span>
</code></pre><h2 id="create-the-shape" tabindex="-1">Create the shape</h2><p>Next, we can create the shape we want to render. To keep things simple, we’ll create a triangle.</p><p>Let’s create an <a href="../../api/nanogl/classes/ArrayBuffer">ArrayBuffer</a>, with the information we need for each vertice of our triangle. For this example, we only need the position attribute. In other cases, we might need the uvs too, for example.</p><pre class="language-js"><code class="language-js"><span class="token comment">// ...</span>

<span class="token keyword">import</span> ArrayBuffer <span class="token keyword">from</span> <span class="token string">&quot;nanogl/arraybuffer&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// ...</span>

<span class="token comment">// simple triangle with vec2 position</span>
<span class="token keyword">const</span> shapeVertices <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Float32Array</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> shape <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayBuffer</span><span class="token punctuation">(</span>gl<span class="token punctuation">,</span> shapeVertices<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// declare aPosition attribute as vec2</span>
shape<span class="token punctuation">.</span><span class="token function">attrib</span><span class="token punctuation">(</span><span class="token string">&#39;aPosition&#39;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> gl<span class="token punctuation">.</span><span class="token constant">FLOAT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><p>Based on this example, you could create any shape you want by providing the wanted shape’s vertices data &amp; the indices data if needed (with an <a href="../../api/nanogl/classes/IndexBuffer">IndexBuffer</a>).</p><h2 id="create-the-program" tabindex="-1">Create the program</h2><p>Now, we need to create the <a href="../../api/nanogl/classes/Program">Program</a>, with the shader we want to use to render our shape.</p><p>Let’s start with the shader.</p><h3 id="vertex-shader" tabindex="-1">Vertex shader</h3><p>Our vertex shader is simple. We only need to calculate the vertex position with the position attribute and the model view projection.</p><pre class="language-glsl"><code class="language-glsl"><span class="token keyword">attribute</span> <span class="token keyword">vec2</span> aPosition<span class="token punctuation">;</span>

<span class="token keyword">uniform</span> <span class="token keyword">mat4</span> uMVP<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">vec4</span> pos <span class="token operator">=</span> <span class="token keyword">vec4</span><span class="token punctuation">(</span>aPosition<span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">,</span> <span class="token number">1.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  gl_Position <span class="token operator">=</span> uMVP <span class="token operator">*</span> pos<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><h3 id="fragment-shader" tabindex="-1">Fragment shader</h3><p>We only want to draw the triangle with one color, so let’s set the frag color to red.</p><pre class="language-glsl"><code class="language-glsl"><span class="token keyword">precision</span> <span class="token keyword">lowp</span> <span class="token keyword">float</span><span class="token punctuation">;</span>
<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">vec3</span> red <span class="token operator">=</span> <span class="token keyword">vec3</span><span class="token punctuation">(</span><span class="token number">1.0</span><span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  gl_FragColor <span class="token operator">=</span> <span class="token keyword">vec4</span><span class="token punctuation">(</span>red<span class="token punctuation">,</span> <span class="token number">1.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><h3 id="program" tabindex="-1">Program</h3><p>If your project is setup to do that, you can import your glsl files as strings and use them to create the program.</p><pre class="language-js"><code class="language-js"><span class="token comment">// ...</span>

<span class="token keyword">import</span> Program <span class="token keyword">from</span> <span class="token string">&quot;nanogl/program&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> vertexShader <span class="token keyword">from</span> <span class="token string">&#39;./shader.vert&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> fragmentShader <span class="token keyword">from</span> <span class="token string">&#39;./shader.frag&#39;</span><span class="token punctuation">;</span>

<span class="token comment">// ...</span>

<span class="token keyword">const</span> prg <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Program</span><span class="token punctuation">(</span>gl<span class="token punctuation">,</span> vertexShader<span class="token punctuation">,</span> fragmentShader<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><p>If not, you can directly put the shader code as string literals.</p><pre class="language-js"><code class="language-js"><span class="token comment">// ...</span>

<span class="token keyword">import</span> Program <span class="token keyword">from</span> <span class="token string">&quot;nanogl/program&quot;</span>

<span class="token comment">// ...</span>

<span class="token keyword">const</span> vertexShader <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  // vertex shader code
</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
<span class="token keyword">const</span> fragmentShader <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  // fragment shader code
</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>

<span class="token keyword">const</span> prg <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Program</span><span class="token punctuation">(</span>gl<span class="token punctuation">,</span> vertexShader<span class="token punctuation">,</span> fragmentShader<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><h2 id="create-the-node" tabindex="-1">Create the node</h2><p>Before we draw the shape, maybe we’d like for it to have a specific position, rotation or scale. To setup these transform values, we can use a <a href="../../api/nanogl/classes/Node">Node</a>.</p><p>This Node will provide us some helpers to set these values, and will allow us to get the corresponding matrix.</p><pre class="language-js"><code class="language-js"><span class="token comment">// ...</span>

<span class="token keyword">import</span> Node <span class="token keyword">from</span> <span class="token string">&quot;nanogl-node&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// ...</span>

<span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// set position with x = 1 &amp; y = -1</span>
node<span class="token punctuation">.</span>position<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// set the scale to 2</span>
node<span class="token punctuation">.</span><span class="token function">setScale</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// rotate by 45deg on the x axis</span>
node<span class="token punctuation">.</span><span class="token function">rotateX</span><span class="token punctuation">(</span><span class="token number">45</span> <span class="token operator">*</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">/</span> <span class="token number">180.0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// rotation is in radians</span>
<span class="token comment">// update world matrix after the changes</span>
node<span class="token punctuation">.</span><span class="token function">updateWorldMatrix</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><h2 id="draw-the-shape" tabindex="-1">Draw the shape</h2><p>Finally, let’s create a render function and call it.</p><ul><li>First, we need to set the viewport size &amp; clear the viewport.</li><li>Then we’ll update the camera world matrix &amp; view projection matrix.</li><li>Then we can get the model view projection matrix.</li><li>Then we’ll update the program uniforms.</li><li>And finally we can link the shape buffer to the program, and draw the triangle.</li></ul><pre class="language-js"><code class="language-js"><span class="token comment">// ...</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> mat4 <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;gl-matrix&#39;</span>

<span class="token comment">// ...</span>

<span class="token keyword">const</span> <span class="token constant">M4</span> <span class="token operator">=</span> mat4<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">render</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
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
  prg<span class="token punctuation">.</span>program<span class="token punctuation">.</span><span class="token function">uMVP</span><span class="token punctuation">(</span><span class="token constant">M4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// link the shape buffer to the program, and draw</span>
  shape<span class="token punctuation">.</span><span class="token function">attribPointer</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>prg<span class="token punctuation">)</span><span class="token punctuation">;</span>
  shape<span class="token punctuation">.</span><span class="token function">drawTriangles</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><h2 id="final-code" tabindex="-1">Final code</h2><p>Here is the complete code for the js file :</p><pre class="language-js"><code class="language-js"><span class="token keyword">import</span> Node <span class="token keyword">from</span> <span class="token string">&quot;nanogl-node&quot;</span><span class="token punctuation">;</span>
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

<span class="token keyword">const</span> <span class="token function-variable function">handleResize</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// get window width &amp; height (since our canvas is full-screen)</span>
  <span class="token keyword">const</span> canvasWidth <span class="token operator">=</span> window<span class="token punctuation">.</span>innerWidth<span class="token punctuation">;</span>
  <span class="token keyword">const</span> canvasHeight <span class="token operator">=</span> window<span class="token punctuation">.</span>innerHeight<span class="token punctuation">;</span>

  <span class="token comment">// set canvas size to display size multiplied by pixel ratio</span>
  canvas<span class="token punctuation">.</span>width <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">round</span><span class="token punctuation">(</span>canvasWidth <span class="token operator">*</span> pixelRatio<span class="token punctuation">)</span><span class="token punctuation">;</span>
  canvas<span class="token punctuation">.</span>height <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">round</span><span class="token punctuation">(</span>canvasHeight <span class="token operator">*</span> pixelRatio<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// set size to actual size of the current drawing buffer</span>
  size<span class="token punctuation">.</span>width <span class="token operator">=</span> gl<span class="token punctuation">.</span>drawingBufferWidth<span class="token punctuation">;</span>
  size<span class="token punctuation">.</span>height <span class="token operator">=</span> gl<span class="token punctuation">.</span>drawingBufferHeight<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;resize&#39;</span><span class="token punctuation">,</span> handleResize<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">handleResize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

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
<span class="token comment">// set position with x = 1 &amp; y = -1</span>
node<span class="token punctuation">.</span>position<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// set the scale to 2</span>
node<span class="token punctuation">.</span><span class="token function">setScale</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// rotate by 45deg on the x axis</span>
node<span class="token punctuation">.</span><span class="token function">rotateX</span><span class="token punctuation">(</span><span class="token number">45</span> <span class="token operator">*</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">/</span> <span class="token number">180.0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// rotation is in radians</span>
<span class="token comment">// update world matrix after the changes</span>
node<span class="token punctuation">.</span><span class="token function">updateWorldMatrix</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// --RENDER--</span>

<span class="token keyword">const</span> <span class="token constant">M4</span> <span class="token operator">=</span> mat4<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">render</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
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
  prg<span class="token punctuation">.</span>program<span class="token punctuation">.</span><span class="token function">uMVP</span><span class="token punctuation">(</span><span class="token constant">M4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// link the shape buffer to the program, and draw</span>
  shape<span class="token punctuation">.</span><span class="token function">attribPointer</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>prg<span class="token punctuation">)</span><span class="token punctuation">;</span>
  shape<span class="token punctuation">.</span><span class="token function">drawTriangles</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><p>Of course, in a bigger project, it would be preferable to create functions and/or classes to better organize the code, but that is entirely up to you.</p>`,42),y=e('<div class="toc-wrapper"><p><div class="toc"><h2 class="my-8">Summary</h2><ul><li><a href="#setup-canvas-context">Setup the canvas &amp; context</a></li><li><a href="#create-the-camera">Create the camera</a></li><li><a href="#create-the-shape">Create the shape</a></li><li><a href="#create-the-program">Create the program</a><ul><li><a href="#vertex-shader">Vertex shader</a></li><li><a href="#fragment-shader">Fragment shader</a></li><li><a href="#program">Program</a></li></ul></li><li><a href="#create-the-node">Create the node</a></li><li><a href="#draw-the-shape">Draw the shape</a></li><li><a href="#final-code">Final code</a></li></ul></div></p></div>',1),b={__name:"creating-a-scene",setup(v,{expose:c}){return c({frontmatter:{}}),(P,_)=>{const a=l;return u(),i("div",k,[n("div",r,[m,d,p(a,{type:"info"},{default:o(()=>[h]),_:1}),g,p(a,{type:"important"},{default:o(()=>[w]),_:1}),f]),y])}}};typeof t=="function"&&t(b);export{b as default};