import{b as e}from"./route-block-83d24a4e.js";import{c as n,o,b as r}from"./index-9c36e8e9.js";const t={class:"markdown-body"},l=r(`<h1>Fbo</h1><p>Fbo manage framebuffers creation</p><ul><li>support any kind of pixel formats (RGB, RGBA, LUMINANCE etc)</li><li>support any kind of pixel type (UNSIGNED_BYTE, FLOAT, half float, etc)</li><li>optional depth and/or stencil</li><li>resize</li><li>binding helpers</li></ul><p>##exemples</p><h5>Fbo creation</h5><p>Basic FBO</p><pre class="language-JavaScript"><code class="language-JavaScript">var Fbo = require( &#39;nanogl/fbo&#39; );

// create a default FBO :
//  - RGB
//  - UNSIGNED_BYTE
//  - no depth
//  - no stencil

var fbo = new Fbo( 128,128 );
</code></pre><p>A more complete example</p><pre class="language-JavaScript"><code class="language-JavaScript">
//  - RGBA
//  - FLOAT or UNSIGNED_BYTE if float not available
//  - depth and stencil enabled

var fbo = new Fbo( 128, 128, {
  depth:    true,
  stencil:  true,
  type : [gl.FLOAT, gl.UNSIGNED_BYTE ],
  format : gl.RGBA
})

// check the resolved available type. (gl.FLOAT or gl.UNSIGNED_BYTE)
var actualType = fbo.getActualType();

</code></pre><h5>Resize</h5><pre class="language-JavaScript"><code class="language-JavaScript">var fbo = new Fbo( 128,128 );
// ...
fbo.resize( 64,64 );

</code></pre><h5>Binding</h5><pre class="language-JavaScript"><code class="language-JavaScript">
// bind the framebuffer
// and set the viewport to the Fbo dimensions
fbo.bind();

// bind the underlying color texture to a program&#39;s sampler2D uniform in unit 1
fbo.bindColor( program.uTexture(), 1 );


</code></pre><h5>Clear</h5><p>Clear all buffer color + stencil and depth if fbo have one</p><pre class="language-JavaScript"><code class="language-JavaScript">// be sure fbo is bound before call clear()
fbo.bind();

fbo.clear();
</code></pre>`,16),c=[l],i={__name:"fbo",setup(p,{expose:a}){return a({frontmatter:{}}),(d,f)=>(o(),n("div",t,c))}};typeof e=="function"&&e(i);export{i as default};
