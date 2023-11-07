<route lang="yaml">
meta:
  menuGuide: true
  menuName: ArrayBuffer
  menuOrder: 3
</route>

[[toc]]

# ArrayBuffer

The ArrayBuffer class provides helpers for `ARRAY_BUFFER`{language=js} type buffers :
  - populating with data
  - handling attributes
  - drawing commands

## Create an arraybuffer {#create}

You can create an arraybuffer with the `ArrayBuffer`{language=js} class, providing options or not.

```js
import ArrayBuffer from "nanogl/arraybuffer";

const buffer = new ArrayBuffer(gl);

// you can provide initial data
const data = new Float32Array([1, 0, 0, 0, 0, 1]);
const bufferData = new ArrayBuffer(gl, data);

// you can specify a usage hint for the buffer
const bufferHint = new ArrayBuffer(gl, data, gl.DYNAMIC_DRAW);
```

## Populate buffer {#populate}

You can set the arraybuffer data from a TypedArray with the `data`{language=js} function. You can also pass a uint to allocate the buffer size instead.

```js
// allocate buffer with TypedArray
const data = new Float32Array([1, 0, 0, 0, 0, 1]);
buffer.data(data);

// allocate buffer size
buffer.data(1024);
```

You can also set a part of the arraybuffer data from a TypedArray with the `subData`{language=js} function. You need to provide the offset in byte where the data will be written.

```js
// update buffer data, starting at third float
const partData = new Float32Array([0, 0, 1]);
buffer.subData(partData, 12);
```

## Attributes

You can add attribute declaration for this buffer with the `attrib`{language=js} function. You need to specify the name & size of the attribute, as well as the type of the data.

```js
// create 4 vertices (vec3 position + vec2 uvs)
const data = new float32Array([
  -1, -1, 0, 0, 0,
   1, -1, 0, 1, 0,
  -1,  1, 0, 0, 1,
   1,  1, 0, 1, 1
]);

const buffer = new ArrayBuffer(gl, data);

// aPosition is a vec3
buffer.attrib('aPosition', 3, gl.FLOAT);

// you can also specify if the data must be normalized
buffer.attrib('aTexCoord', 2, gl.FLOAT, true);
```

You can then link the buffer to the given program attributes with the `attribPointer`{language=js} function.

<UICallout type="important">

**Important :** The attribute must be declared before using the attribPointer function.

</UICallout>

```js
// setup vertex attribute pointer of a given program
buffer.attribPointer(program);
```

## Drawing commands

ArrayBuffer provides `gl.drawArrays`{language=js} shortcuts.

You can provide options, in order :
- the number of vertices to draw
- the position (in bytes) of the first vertex to draw

```js
const count = 2;
const offset = 12;

// GL_POINTS
buffer.drawPoints(count, offset)
// GL_LINE_STRIP
buffer.drawLineStrip(count, offset)
// GL_LINE_LOOP
buffer.drawLineLoop(count, offset)
// GL_LINES
buffer.drawLines(count, offset)
// GL_TRIANGLE_STRIP
buffer.drawTriangleStrip(count, offset)
// GL_TRIANGLE_FAN
buffer.drawTriangleFan(count, offset)
// GL_TRIANGLES
buffer.drawTriangles(count, offset)
```

You can also use the `draw`{language=js} function, choosing the type of primitive to draw.

```js
// draw GL_TRIANGLES type
buffer.draw(gl.TRIANGLES, count, offset)
```

## Delete the arraybuffer {#delete}

You can delete the webgl buffer with the `dispose`{language=js} function.

```js
buffer.dispose();
```