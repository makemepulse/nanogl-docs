import{b as a}from"./route-block-83d24a4e.js";import{c as r,o as t,b as o}from"./index-2d8dba22.js";const n={class:"markdown-body"},f=o(`<h1>ArrayBuffer</h1><p>Manage ARRAY_BUFFER type Arraybuffers.</p><p>##exemples</p><h5>ArrayBuffer creation</h5><pre class="language-JavaScript"><code class="language-JavaScript">// create empty Arraybuffer
var buffer = new ArrayBuffer( gl );

// you can also provide initial data and optional usage hint
var data = new Float32Array([ 1, 0, 0, 0, 0, 1 ] );
var buffer = new ArrayBuffer( gl, data, gl.DYNAMIC_DRAW );
</code></pre><h5>Populate Buffer</h5><p>Set buffer data</p><pre class="language-JavaScript"><code class="language-JavaScript">var buffer = new ArrayBuffer( gl );

// allocate buffer with TypedArray
var data = new Float32Array([ 1, 0, 0, 0, 0, 1 ] );
buffer.data( data );

// update buffer data, starting at third float
var part = new Float32Array([ 0, 0, 1 ] );
buffer.subData( part, 12 );
</code></pre><h5>declare attributes</h5><pre class="language-JavaScript"><code class="language-JavaScript">// create 4 vertices ( vec3 position + vec2 uvs)

var data = new float32Array([
  -1, -1, 0, 0, 0,
   1, -1, 0, 1, 0,
  -1,  1, 0, 0, 1,
   1,  1, 0, 1, 1
]);

var buffer = new ArrayBuffer( gl, data );
buffer.attrib( &#39;aPosition&#39;, 3, gl.FLOAT );
buffer.attrib( &#39;aTexCoord&#39;, 2, gl.FLOAT );

// setup vertex attribute pointer of a given program
buffer.attribPointer( program );

</code></pre><h5>Drawing commands</h5><p>ArrayBuffer provide gl.drawArrays shortcuts, with optional count/offset.</p><ul><li><code>drawPoints(count, offset)</code></li><li><code>drawLineStrip(count, offset)</code></li><li><code>drawLineLoop(count, offset)</code></li><li><code>drawLines(count, offset)</code></li><li><code>drawTriangleStrip(count, offset)</code></li><li><code>drawTriangleFan(count, offset)</code></li><li><code>drawTriangles(count, offset)</code></li></ul><p><code>count</code> in elements and <code>offset</code> in bytes If count/ offset is missing, the full buffer is drawn.</p>`,14),c=[f],i={__name:"arraybuffer",setup(s,{expose:e}){return e({frontmatter:{}}),(d,u)=>(t(),r("div",n,c))}};typeof a=="function"&&a(i);export{i as default};
