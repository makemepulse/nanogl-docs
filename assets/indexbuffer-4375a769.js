import{b as e}from"./route-block-83d24a4e.js";import{c as n,o as t,b as o}from"./index-9c36e8e9.js";const r={class:"markdown-body"},c=o(`<h1>IndexBuffer</h1><p>Manage ELEMENT_ARRAY_BUFFER type IndexBuffers.</p><p>##exemples</p><h5>IndexBuffer creation</h5><pre class="language-JavaScript"><code class="language-JavaScript">// create empty IndexBuffer
// initialized as UNSIGNED_SHORT / DYNAMIC_DRAW
var buffer = new IndexBuffer( gl );

// you can also provide initial datatype, data and optional usage hint
var data = new Uint8Array([
  0, 1, 2,
  1, 3, 2
]);
var buffer = new IndexBuffer( gl, gl.UNSIGNED_BYTE, data, gl.DYNAMIC_DRAW );
</code></pre><h5>Populate Buffer</h5><pre class="language-JavaScript"><code class="language-JavaScript">var buffer = new IndexBuffer( gl, gl.UNSIGNED_INT );

// allocate buffer with TypedArray
var data = new Uint32Array([
  0, 1, 2,
  1, 3, 2
]);
buffer.data( data );

// update the second triangle
var part = new Uint8Array([ 1, 2, 3 ] );
buffer.subData( part, 12 );
</code></pre><h5>Drawing commands</h5><p>IndexBuffer provide gl.drawElements shortcuts, with optional count/offset.</p><ul><li><code>drawPoints(count, offset)</code></li><li><code>drawLineStrip(count, offset)</code></li><li><code>drawLineLoop(count, offset)</code></li><li><code>drawLines(count, offset)</code></li><li><code>drawTriangleStrip(count, offset)</code></li><li><code>drawTriangleFan(count, offset)</code></li><li><code>drawTriangles(count, offset)</code></li></ul><p><code>count</code> in elements and <code>offset</code> in bytes If count/ offset is missing, the full buffer is drawn.</p>`,11),f=[c],d={__name:"indexbuffer",setup(i,{expose:a}){return a({frontmatter:{}}),(l,u)=>(t(),n("div",r,f))}};typeof e=="function"&&e(d);export{d as default};
