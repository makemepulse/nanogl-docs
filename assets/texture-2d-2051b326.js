import{_ as p}from"./UICallout.vue_vue_type_script_setup_true_lang-bdd39519.js";import{b as s}from"./route-block-83d24a4e.js";import{A as o,C as c,E as n,O as l,I as u,P as a,J as i}from"./runtime-core.esm-bundler-010fdffb.js";const r={class:"markdown-body"},k={class:"content-wrapper"},d=a(`<h1 id="texture2d" tabindex="-1">Texture2D</h1><p>The Texture2D class provides helpers for <code class="language-js"><span class="token constant">TEXTURE_2D</span></code> textures :</p><ul><li>loading from an image, canvas, video, or data</li><li>filtering and wrapping</li></ul><p>It supports any kind of pixel formats (<code class="language-js"><span class="token constant">RGB</span></code>, <code class="language-js"><span class="token constant">RGBA</span></code>, <code class="language-js"><span class="token constant">LUMINANCE</span></code>, etc.) and any kind of pixel type (<code class="language-js"><span class="token constant">UNSIGNED_BYTE</span></code>, <code class="language-js"><span class="token constant">FLOAT</span></code>, etc.).</p><h2 id="create" tabindex="-1">Create a texture</h2><p>You can create a texture with the <code class="language-js">Texture2D</code> class, providing options or not.</p><pre class="language-js"><code class="language-js"><span class="token keyword">import</span> Texture2D <span class="token keyword">from</span> <span class="token string">&quot;nanogl/texture-2d&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> texture <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Texture2D</span><span class="token punctuation">(</span>gl<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// you can specify a pixel format (default is gl.RGB)</span>
<span class="token keyword">const</span> textureRGBA <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Texture2D</span><span class="token punctuation">(</span>gl<span class="token punctuation">,</span> gl<span class="token punctuation">.</span><span class="token constant">RGBA</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// you can specify a pixel type (default is gl.UNSIGNED_BYTE)</span>
<span class="token keyword">const</span> textureFloat <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Texture2D</span><span class="token punctuation">(</span>gl<span class="token punctuation">,</span> gl<span class="token punctuation">.</span><span class="token constant">RGB</span><span class="token punctuation">,</span> gl<span class="token punctuation">.</span><span class="token constant">FLOAT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// you can specify a pixel internal format (default is &#39;format&#39; parameter value)</span>
<span class="token keyword">const</span> textureInternalFloat <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Texture2D</span><span class="token punctuation">(</span>gl<span class="token punctuation">,</span> gl<span class="token punctuation">.</span><span class="token constant">RGB</span><span class="token punctuation">,</span> gl<span class="token punctuation">.</span><span class="token constant">UNSIGNED_BYTE</span><span class="token punctuation">,</span> gl<span class="token punctuation">.</span><span class="token constant">RGBA</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><h2 id="load-from-html" tabindex="-1">Load from image, canvas or video</h2><p>You can set the texture data from an HTML source with the <code class="language-js">fromImage</code> function.</p><pre class="language-js"><code class="language-js"><span class="token comment">// you must ensure your image is loaded before send it to texture</span>
img<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  texture<span class="token punctuation">.</span><span class="token function">fromImage</span><span class="token punctuation">(</span>img<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><h2 id="allocate-empty-texture" tabindex="-1">Allocate empty texture</h2><p>You can allocate an empty texture with the <code class="language-js">fromData</code> function.</p><pre class="language-js"><code class="language-js"><span class="token comment">// allocate empty 128x128 texture</span>
texture<span class="token punctuation">.</span><span class="token function">fromData</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">,</span> <span class="token number">128</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><h2 id="load-from-typedarray" tabindex="-1">Load from TypedArray</h2><p>You can also set texture data from a TypedArray with the <code class="language-js">fromData</code> function.</p><pre class="language-js"><code class="language-js"><span class="token comment">// create texture from TypedArray (4x2 8bpp)</span>
<span class="token keyword">const</span> texture <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Texture</span><span class="token punctuation">(</span>gl<span class="token punctuation">,</span> gl<span class="token punctuation">.</span><span class="token constant">LUMINANCE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Uint8Array</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
  <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">30</span>
  <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">40</span><span class="token punctuation">,</span> <span class="token number">50</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
texture<span class="token punctuation">.</span><span class="token function">fromData</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> data<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><h2 id="bind-texture" tabindex="-1">Bind texture</h2><p>You can bind the texture with the <code class="language-js">bind</code> function, providing a texture unit or not.</p><pre class="language-js"><code class="language-js"><span class="token comment">// by default, the texture is bound to the current active texture</span>
<span class="token function">texture</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// to bind the texture to specific unit :</span>
<span class="token function">texture</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><h2 id="sampler-options" tabindex="-1">Use sampler options</h2>`,20),m=n("p",null,[n("strong",null,"Important :"),i(" The texture must be bound before using the filtering & wrapping methods.")],-1),g=a(`<h3 id="filtering-parameters" tabindex="-1">Filtering parameters</h3><p>Set <code class="language-js"><span class="token constant">MIN_FILTER</span></code> and <code class="language-js"><span class="token constant">MAG_FILTER</span></code> in a single call with the <code class="language-js">setFilter</code> function. (Texture2D ensures MIPMAP isn’t used for MAG_FILTER)</p><p>You can choose, in order :</p><ul><li>to use linear filtering or not</li><li>to enable mipmaping or not</li><li>to use linear mipmapping or not</li></ul><pre class="language-js"><code class="language-js"><span class="token comment">// texture must be bound before using these methods</span>
<span class="token function">texture</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// sample LINEAR (default)</span>
texture<span class="token punctuation">.</span><span class="token function">setFilter</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// sample NEAREST</span>
texture<span class="token punctuation">.</span><span class="token function">setFilter</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// sample LINEAR_MIPMAP_NEAREST</span>
texture<span class="token punctuation">.</span><span class="token function">setFilter</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// sample LINEAR_MIPMAP_LINEAR</span>
texture<span class="token punctuation">.</span><span class="token function">setFilter</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><h3 id="wrapping-parameters" tabindex="-1">Wrapping parameters</h3><p>Set <code class="language-js"><span class="token constant">WRAP_S</span></code> and <code class="language-js"><span class="token constant">WRAP_T</span></code> with the <code class="language-js">repeat</code>, <code class="language-js">clamp</code>, <code class="language-js">mirror</code> &amp; <code class="language-js">wrap</code> functions.</p><pre class="language-js"><code class="language-js"><span class="token comment">// texture must be bound before using these methods</span>
<span class="token function">texture</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// wrap REPEAT</span>
texture<span class="token punctuation">.</span><span class="token function">repeat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// wrap CLAMP_TO_EDGE</span>
texture<span class="token punctuation">.</span><span class="token function">clamp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// wrap MIRRORED_REPEAT</span>
texture<span class="token punctuation">.</span><span class="token function">mirror</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// or manual wrap</span>
texture<span class="token punctuation">.</span><span class="token function">wrap</span><span class="token punctuation">(</span>gl<span class="token punctuation">.</span><span class="token constant">REPEAT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><h2 id="delete" tabindex="-1">Delete the texture</h2><p>You can delete the webgl texture with the <code class="language-js">dispose</code> function.</p><pre class="language-js"><code class="language-js">texture<span class="token punctuation">.</span><span class="token function">dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>`,11),f=a('<div class="toc-wrapper"><p><div class="toc"><h2 class="my-8">Summary</h2><ul><li><a href="#create">Create a texture</a></li><li><a href="#load-from-html">Load from image, canvas or video</a></li><li><a href="#allocate-empty-texture">Allocate empty texture</a></li><li><a href="#load-from-typedarray">Load from TypedArray</a></li><li><a href="#bind-texture">Bind texture</a></li><li><a href="#sampler-options">Use sampler options</a><ul><li><a href="#filtering-parameters">Filtering parameters</a></li><li><a href="#wrapping-parameters">Wrapping parameters</a></li></ul></li><li><a href="#delete">Delete the texture</a></li></ul></div></p></div>',1),x={__name:"texture-2d",setup(h,{expose:t}){return t({frontmatter:{}}),(y,w)=>{const e=p;return o(),c("div",r,[n("div",k,[d,l(e,{type:"important"},{default:u(()=>[m]),_:1}),g]),f])}}};typeof s=="function"&&s(x);export{x as default};