import{_ as l}from"./GLPreview.vue_vue_type_script_setup_true_lang-7cd20279.js";import{_ as u}from"./UICallout.vue_vue_type_script_setup_true_lang-9ed50965.js";import{b as p}from"./route-block-83d24a4e.js";import{A as i,C as k,E as s,O as a,I as r,P as n,J as o}from"./runtime-core.esm-bundler-b2e16801.js";import"./index-17deebe5.js";const m={class:"markdown-body"},d={class:"content-wrapper"},g=n(`<h1 id="load-a-gltf-model" tabindex="-1">Load a GLTF model</h1><p>Often, using 2D primitives won’t be enough, or building your own buffers will be far too complicated, and you’ll need to load <a href="https://fr.wikipedia.org/wiki/GlTF" target="_blank" rel="noopener">glTF files</a>.</p><p>We’ll start with the canvas &amp; context setup from the <a href="/nanogl-docs/guide/getting-started/add-movement">Add some movement</a> article.</p><h2 id="loading-a-file" tabindex="-1">Loading a file</h2><p>Using the nanogl-gltf loader made for web <a href="/nanogl-docs/api/nanogl-gltf/classes/GltfIO">GltfIO</a>, you can directly load a model from its URL (relative path or external web URL).</p><p>Then you have to allocate the gl context to the loaded glTF, so every textures, buffers, etc. can be linked to the GL context, ready to be rendered.</p><p>Don’t forget to call the render function only when the model is ready.</p><pre class="language-js"><code class="language-js"><span class="token keyword">import</span> GltfIO <span class="token keyword">from</span> <span class="token string">&quot;nanogl-gltf/lib/io/web&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// ...</span>

<span class="token keyword">let</span> gltf <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

<span class="token comment">// load gltf from url</span>
GltfIO<span class="token punctuation">.</span><span class="token function">loadGltf</span><span class="token punctuation">(</span><span class="token string">&quot;/src/assets/webgl/models/suzanne/Suzanne.gltf&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">loadedGltf</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  gltf <span class="token operator">=</span> loadedGltf<span class="token punctuation">;</span>

  <span class="token comment">// link gltf to gl context</span>
  <span class="token keyword">await</span> gltf<span class="token punctuation">.</span><span class="token function">allocate</span><span class="token punctuation">(</span>gl<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// render only when the gltf is loaded and allocated</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>`,8),b=s("p",null,[s("strong",null,"Note :"),o(" This is the most basic way of loading a model with nanogl-gltf, but some more complete and detailed implementations may be better suited to your project (light management, animations, adding extensions support, …). You can see one on the "),s("a",{href:"https://github.com/makemepulse/nanogl-starter",target:"_blank",rel:"noopener"},"starter"),o(".")],-1),f=n(`<h2 id="render-the-model" tabindex="-1">Render the model</h2><p>Then, to render the model, you just have to call the render function on each gltf’s renderable (they all are <a href="/nanogl-docs/api/nanogl-gltf/classes/MeshRenderer">MeshRenderer</a>).</p><p>You have to pass the GL context, the current camera, the <a href="/nanogl-docs/api/nanogl-gltf/interfaces/IRenderConfig">mask ID</a> (1 is the OPAQUE mask, the default one), and the pass ID (COLOR, DEPTH, custom other passes…).</p><pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">render</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>

  <span class="token comment">// render all gltf renderables (MeshRenderer)</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> renderable <span class="token keyword">of</span> gltf<span class="token punctuation">.</span>renderables<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// pass the gl context, camera, mask id, and pass id</span>
    renderable<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>gl<span class="token punctuation">,</span> camera<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&#39;color&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>render<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><h2 id="add-lights" tabindex="-1">Add lights</h2><p>We still have an issue : the model appears, but totally black. And it makes sense, because we didn’t setup any lights in our scene.</p>`,6),h=n(`<p>To do so, we’ll have to create a <a href="/nanogl-docs/api/nanogl-pbr/classes/LightSetup">LightSetup</a> to encapsulate all our lights, and then add an <a href="/nanogl-docs/api/nanogl-pbr/classes/Ibl">Ibl</a> to it.</p><p>The Ibl is created using an envMap texture and an array of Spherical Harmonics (it’s a simplified representation of how much light comes from each direction).</p><pre class="language-js"><code class="language-js"><span class="token keyword">import</span> LightSetup <span class="token keyword">from</span> <span class="token string">&quot;nanogl-pbr/lighting/LightSetup&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> Texture2D <span class="token keyword">from</span> <span class="token string">&quot;nanogl/texture-2d&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> Ibl <span class="token keyword">from</span> <span class="token string">&quot;nanogl-pbr/lighting/Ibl&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> iblSrc <span class="token keyword">from</span> <span class="token string">&quot;@assets/images/ibl.rgbm.png&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// ...</span>

<span class="token comment">// create light setup</span>
<span class="token keyword">const</span> lightSetup <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LightSetup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
lightSetup<span class="token punctuation">.</span>bounds<span class="token punctuation">.</span><span class="token function">fromMinMax</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// create iblTexture</span>
<span class="token keyword">const</span> iblTexture <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Texture2D</span><span class="token punctuation">(</span>gl<span class="token punctuation">,</span> gl<span class="token punctuation">.</span><span class="token constant">RGBA</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
iblTexture<span class="token punctuation">.</span><span class="token function">clamp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// create ibl spherical harmonics data</span>
<span class="token keyword">const</span> iblSh <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Float32Array</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
  <span class="token number">0.224084854125977</span><span class="token punctuation">,</span> <span class="token number">0.213043749332428</span><span class="token punctuation">,</span> <span class="token number">0.283314585685730</span><span class="token punctuation">,</span> <span class="token comment">// L00, irradiance, pre-scaled base</span>
  <span class="token number">0.100831791758537</span><span class="token punctuation">,</span> <span class="token number">0.124612621963024</span><span class="token punctuation">,</span> <span class="token number">0.204235553741455</span><span class="token punctuation">,</span> <span class="token comment">// L1-1, irradiance, pre-scaled base</span>
  <span class="token number">0.107245393097401</span><span class="token punctuation">,</span> <span class="token number">0.083322264254093</span><span class="token punctuation">,</span> <span class="token number">0.076212428510189</span><span class="token punctuation">,</span> <span class="token comment">// L10, irradiance, pre-scaled base</span>
  <span class="token number">0.144294798374176</span><span class="token punctuation">,</span> <span class="token number">0.106082014739513</span><span class="token punctuation">,</span> <span class="token number">0.089959740638733</span><span class="token punctuation">,</span> <span class="token comment">// L11, irradiance, pre-scaled base</span>
  <span class="token number">0.053996223956347</span><span class="token punctuation">,</span> <span class="token number">0.044765342026949</span><span class="token punctuation">,</span> <span class="token number">0.044178668409586</span><span class="token punctuation">,</span> <span class="token comment">// L2-2, irradiance, pre-scaled base</span>
  <span class="token number">0.025597579777241</span><span class="token punctuation">,</span> <span class="token number">0.024105755612254</span><span class="token punctuation">,</span> <span class="token number">0.027786524966359</span><span class="token punctuation">,</span> <span class="token comment">// L2-1, irradiance, pre-scaled base</span>
  <span class="token number">0.004080550745130</span><span class="token punctuation">,</span> <span class="token number">0.002261536428705</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">0.000168046550243</span><span class="token punctuation">,</span> <span class="token comment">// L20, irradiance, pre-scaled base</span>
  <span class="token number">0.091950185596943</span><span class="token punctuation">,</span> <span class="token number">0.066512495279312</span><span class="token punctuation">,</span> <span class="token number">0.055933292955160</span><span class="token punctuation">,</span> <span class="token comment">// L21, irradiance, pre-scaled base</span>
  <span class="token number">0.051955129951239</span><span class="token punctuation">,</span> <span class="token number">0.036966290324926</span><span class="token punctuation">,</span> <span class="token number">0.029668755829334</span><span class="token punctuation">,</span> <span class="token comment">// L22, irradiance, pre-scaled base</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token comment">// create ibl light</span>
<span class="token keyword">const</span> ibl <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Ibl</span><span class="token punctuation">(</span>iblTexture<span class="token punctuation">,</span> iblSh<span class="token punctuation">)</span><span class="token punctuation">;</span>
ibl<span class="token punctuation">.</span>iblFormat <span class="token operator">=</span> <span class="token string">&#39;OCTA&#39;</span><span class="token punctuation">;</span>
ibl<span class="token punctuation">.</span>shFormat <span class="token operator">=</span> <span class="token string">&#39;SH9&#39;</span><span class="token punctuation">;</span>
ibl<span class="token punctuation">.</span>hdrEncoding <span class="token operator">=</span> <span class="token string">&#39;RGBM&#39;</span><span class="token punctuation">;</span>

<span class="token comment">// setup the image for the ibl texture</span>
<span class="token keyword">const</span> iblImg <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
iblImg<span class="token punctuation">.</span>src <span class="token operator">=</span> iblSrc<span class="token punctuation">;</span>
<span class="token comment">// set texture data from image on load</span>
iblImg<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  iblTexture<span class="token punctuation">.</span><span class="token function">fromImage</span><span class="token punctuation">(</span>iblImg<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// add ibl to light setup</span>
lightSetup<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>ibl<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><p>Then we need to apply this LightSetup to every material of the gltf model.</p><pre class="language-js"><code class="language-js"><span class="token comment">// load gltf from url</span>
GltfIO<span class="token punctuation">.</span><span class="token function">loadGltf</span><span class="token punctuation">(</span><span class="token string">&quot;/src/assets/webgl/models/suzanne/Suzanne.gltf&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">loadedGltf</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>

  <span class="token keyword">await</span> gltf<span class="token punctuation">.</span><span class="token function">allocate</span><span class="token punctuation">(</span>gl<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// apply LightSetup on every material</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> material <span class="token keyword">of</span> gltf<span class="token punctuation">.</span>materials<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    material<span class="token punctuation">.</span>materialPass<span class="token punctuation">.</span><span class="token function">setLightSetup</span><span class="token punctuation">(</span>lightSetup<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><p>And finally we just need to update the LightSetup before rendering the model (to apply potential position/color/intensity/… changes in lights).</p><pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">render</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>

  <span class="token comment">// prepare light setup, before calling renderable.render()</span>
  lightSetup<span class="token punctuation">.</span><span class="token function">prepare</span><span class="token punctuation">(</span>gl<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><h2 id="add-some-movement" tabindex="-1">Add some movement</h2><p>Let’s rotate our Suzanne model a little bit at each frame, so we can see all sides and check our lighting setup.</p><pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">animate</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// get gltf root node</span>
  <span class="token keyword">const</span> node <span class="token operator">=</span> gltf<span class="token punctuation">.</span>root<span class="token punctuation">;</span>
  <span class="token comment">// rotate around X axis a little bit at each frame</span>
  node<span class="token punctuation">.</span><span class="token function">rotateY</span><span class="token punctuation">(</span><span class="token number">0.01</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// update world matrix</span>
  node<span class="token punctuation">.</span><span class="token function">updateWorldMatrix</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">render</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">animate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><h2 id="result" tabindex="-1">Result</h2><p>And now you have a beautiful Suzanne !</p>`,12),w=n(`<h2 id="final-code" tabindex="-1">Final code</h2><p>Here is the complete code for the js file :</p><pre class="language-js"><code class="language-js"><span class="token keyword">import</span> Camera <span class="token keyword">from</span> <span class="token string">&quot;nanogl-camera&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> PerspectiveLens <span class="token keyword">from</span> <span class="token string">&quot;nanogl-camera/perspective-lens&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> GltfIO <span class="token keyword">from</span> <span class="token string">&quot;nanogl-gltf/lib/io/web&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> LightSetup <span class="token keyword">from</span> <span class="token string">&quot;nanogl-pbr/lighting/LightSetup&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> Texture2D <span class="token keyword">from</span> <span class="token string">&quot;nanogl/texture-2d&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> Ibl <span class="token keyword">from</span> <span class="token string">&quot;nanogl-pbr/lighting/Ibl&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> iblSrc <span class="token keyword">from</span> <span class="token string">&quot;@assets/images/ibl.rgbm.png&quot;</span><span class="token punctuation">;</span>

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

<span class="token comment">// --LIGHTING--</span>

<span class="token comment">// create light setup</span>
<span class="token keyword">const</span> lightSetup <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LightSetup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
lightSetup<span class="token punctuation">.</span>bounds<span class="token punctuation">.</span><span class="token function">fromMinMax</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// create iblTexture</span>
<span class="token keyword">const</span> iblTexture <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Texture2D</span><span class="token punctuation">(</span>gl<span class="token punctuation">,</span> gl<span class="token punctuation">.</span><span class="token constant">RGBA</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
iblTexture<span class="token punctuation">.</span><span class="token function">clamp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// create ibl spherical harmonics data</span>
<span class="token keyword">const</span> iblSh <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Float32Array</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
  <span class="token number">0.224084854125977</span><span class="token punctuation">,</span> <span class="token number">0.213043749332428</span><span class="token punctuation">,</span> <span class="token number">0.283314585685730</span><span class="token punctuation">,</span> <span class="token comment">// L00, irradiance, pre-scaled base</span>
  <span class="token number">0.100831791758537</span><span class="token punctuation">,</span> <span class="token number">0.124612621963024</span><span class="token punctuation">,</span> <span class="token number">0.204235553741455</span><span class="token punctuation">,</span> <span class="token comment">// L1-1, irradiance, pre-scaled base</span>
  <span class="token number">0.107245393097401</span><span class="token punctuation">,</span> <span class="token number">0.083322264254093</span><span class="token punctuation">,</span> <span class="token number">0.076212428510189</span><span class="token punctuation">,</span> <span class="token comment">// L10, irradiance, pre-scaled base</span>
  <span class="token number">0.144294798374176</span><span class="token punctuation">,</span> <span class="token number">0.106082014739513</span><span class="token punctuation">,</span> <span class="token number">0.089959740638733</span><span class="token punctuation">,</span> <span class="token comment">// L11, irradiance, pre-scaled base</span>
  <span class="token number">0.053996223956347</span><span class="token punctuation">,</span> <span class="token number">0.044765342026949</span><span class="token punctuation">,</span> <span class="token number">0.044178668409586</span><span class="token punctuation">,</span> <span class="token comment">// L2-2, irradiance, pre-scaled base</span>
  <span class="token number">0.025597579777241</span><span class="token punctuation">,</span> <span class="token number">0.024105755612254</span><span class="token punctuation">,</span> <span class="token number">0.027786524966359</span><span class="token punctuation">,</span> <span class="token comment">// L2-1, irradiance, pre-scaled base</span>
  <span class="token number">0.004080550745130</span><span class="token punctuation">,</span> <span class="token number">0.002261536428705</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">0.000168046550243</span><span class="token punctuation">,</span> <span class="token comment">// L20, irradiance, pre-scaled base</span>
  <span class="token number">0.091950185596943</span><span class="token punctuation">,</span> <span class="token number">0.066512495279312</span><span class="token punctuation">,</span> <span class="token number">0.055933292955160</span><span class="token punctuation">,</span> <span class="token comment">// L21, irradiance, pre-scaled base</span>
  <span class="token number">0.051955129951239</span><span class="token punctuation">,</span> <span class="token number">0.036966290324926</span><span class="token punctuation">,</span> <span class="token number">0.029668755829334</span><span class="token punctuation">,</span> <span class="token comment">// L22, irradiance, pre-scaled base</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token comment">// create ibl light</span>
<span class="token keyword">const</span> ibl <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Ibl</span><span class="token punctuation">(</span>iblTexture<span class="token punctuation">,</span> iblSh<span class="token punctuation">)</span><span class="token punctuation">;</span>
ibl<span class="token punctuation">.</span>iblFormat <span class="token operator">=</span> <span class="token string">&#39;OCTA&#39;</span><span class="token punctuation">;</span>
ibl<span class="token punctuation">.</span>shFormat <span class="token operator">=</span> <span class="token string">&#39;SH9&#39;</span><span class="token punctuation">;</span>
ibl<span class="token punctuation">.</span>hdrEncoding <span class="token operator">=</span> <span class="token string">&#39;RGBM&#39;</span><span class="token punctuation">;</span>

<span class="token comment">// setup the image for the ibl texture</span>
<span class="token keyword">const</span> iblImg <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
iblImg<span class="token punctuation">.</span>src <span class="token operator">=</span> iblSrc<span class="token punctuation">;</span>
<span class="token comment">// set texture data from image on load</span>
iblImg<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  iblTexture<span class="token punctuation">.</span><span class="token function">fromImage</span><span class="token punctuation">(</span>iblImg<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// add ibl to light setup</span>
lightSetup<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>ibl<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// --GLTF--</span>

<span class="token keyword">let</span> gltf <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

<span class="token comment">// load gltf from url</span>
GltfIO<span class="token punctuation">.</span><span class="token function">loadGltf</span><span class="token punctuation">(</span><span class="token string">&quot;/src/assets/webgl/models/suzanne/Suzanne.gltf&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">loadedGltf</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  gltf <span class="token operator">=</span> loadedGltf<span class="token punctuation">;</span>

  <span class="token comment">// link gltf to gl context</span>
  <span class="token keyword">await</span> gltf<span class="token punctuation">.</span><span class="token function">allocate</span><span class="token punctuation">(</span>gl<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// set gltf material light setup</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> material <span class="token keyword">of</span> gltf<span class="token punctuation">.</span>materials<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    material<span class="token punctuation">.</span>materialPass<span class="token punctuation">.</span><span class="token function">setLightSetup</span><span class="token punctuation">(</span>lightSetup<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// render only when the gltf is loaded and allocated</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// --ANIMATION--</span>

<span class="token keyword">const</span> <span class="token function-variable function">animate</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// get gltf root node</span>
  <span class="token keyword">const</span> node <span class="token operator">=</span> gltf<span class="token punctuation">.</span>root<span class="token punctuation">;</span>
  <span class="token comment">// rotate around X axis a little bit at each frame</span>
  node<span class="token punctuation">.</span><span class="token function">rotateY</span><span class="token punctuation">(</span><span class="token number">0.01</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// update world matrix</span>
  node<span class="token punctuation">.</span><span class="token function">updateWorldMatrix</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// --RENDER--</span>

<span class="token keyword">const</span> <span class="token function-variable function">render</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">animate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// setup viewport</span>
  gl<span class="token punctuation">.</span><span class="token function">viewport</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> size<span class="token punctuation">.</span>width<span class="token punctuation">,</span> size<span class="token punctuation">.</span>height<span class="token punctuation">)</span><span class="token punctuation">;</span>
  gl<span class="token punctuation">.</span><span class="token function">clearColor</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  gl<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span>gl<span class="token punctuation">.</span><span class="token constant">COLOR_BUFFER_BIT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  
  <span class="token comment">// update camera matrices</span>
  camera<span class="token punctuation">.</span><span class="token function">updateWorldMatrix</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  camera<span class="token punctuation">.</span><span class="token function">updateViewProjectionMatrix</span><span class="token punctuation">(</span>size<span class="token punctuation">.</span>width<span class="token punctuation">,</span> size<span class="token punctuation">.</span>height<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// prepare light setup</span>
  lightSetup<span class="token punctuation">.</span><span class="token function">prepare</span><span class="token punctuation">(</span>gl<span class="token punctuation">)</span><span class="token punctuation">;</span>
  
  <span class="token comment">// render all gltf renderables (MeshRenderer)</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> renderable <span class="token keyword">of</span> gltf<span class="token punctuation">.</span>renderables<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// render each renderable by passing the gl context, the camera, the mask id (1 is Opaque), and the pass id (&#39;color&#39; by default)</span>
    renderable<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>gl<span class="token punctuation">,</span> camera<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&#39;color&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>render<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>`,3),y=n('<div class="toc-wrapper"><p><div class="toc"><h2 class="my-8">Summary</h2><ul><li><a href="#loading-a-file">Loading a file</a></li><li><a href="#render-the-model">Render the model</a></li><li><a href="#add-lights">Add lights</a></li><li><a href="#add-some-movement">Add some movement</a></li><li><a href="#result">Result</a></li><li><a href="#final-code">Final code</a></li></ul></div></p></div><div class="nav-wrapper"><a class="prev" href="/guide/getting-started/add-movement">Add some movement</a><a class="next" href="/guide/getting-started/full-screen-shader">Full-screen shader</a></div>',2),v={__name:"load-gltf",setup(x,{expose:e}){return e({frontmatter:{}}),(S,I)=>{const c=u,t=l;return i(),k("div",m,[s("div",d,[g,a(c,{type:"info"},{default:r(()=>[b]),_:1}),f,a(t,{name:"load-gltf-model",folder:"guide"}),h,a(t,{name:"load-gltf-model-lights",folder:"guide"}),w]),y])}}};typeof p=="function"&&p(v);export{v as default};
