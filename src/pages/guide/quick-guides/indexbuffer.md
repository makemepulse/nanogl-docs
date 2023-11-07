<route lang="yaml">
meta:
  menuGuide: true
  menuName: IndexBuffer
  menuOrder: 4
</route>

[[toc]]

# IndexBuffer

The IndexBuffer class provides helpers for `ELEMENT_ARRAY_BUFFER`{language=js} type buffers :
  - populating with data
  - changing type
  - drawing commands

## Create an indexbuffer {#create}

You can create an indexbuffer with the `IndexBuffer`{language=js} class, providing options or not.


```js
import IndexBuffer from "nanogl/indexbuffer";

const buffer = new IndexBuffer(gl);

// you can specify initial datatype
const bufferDataType = new IndexBuffer(gl, gl.UNSIGNED_BYTE);

// you can provide initial data
const data = new Uint8Array([
  0, 1, 2,
  1, 3, 2
]);
const bufferData = new IndexBuffer(gl, gl.UNSIGNED_BYTE, data);

// you can specify a usage hint for the buffer
const bufferHint = new IndexBuffer(gl, gl.UNSIGNED_BYTE, data, gl.DYNAMIC_DRAW);
```

## Set data type {#set-type}

Change the type of the indexbuffer data with the `setType`{language=js} function.

```js
// set type to GL_UNSIGNED_INT
buffer.setType(gl.UNSIGNED_INT);
```

## Populate Buffer {#populate}

You can set the indexbuffer data from a TypedArray with the `data`{language=js} function. You can also pass a uint to allocate the buffer size instead.

```js
// allocate buffer with TypedArray
const data = new Uint32Array([
  0, 1, 2,
  1, 3, 2
]);
buffer.data(data);

// allocate buffer size
buffer.data(1024);
```

You can also set a part of the arraybuffer data from a TypedArray with the `subData`{language=js} function. You need to provide the offset in byte where the data will be written.

```js
// update buffer data, starting at third float
const partData = new Uint8Array([ 1, 2, 3 ] );
buffer.subData(partData, 12);
```

## Drawing commands

IndexBuffer provides `gl.drawElements`{language=js} shortcuts.

You can provide options, in order :
- the number of indices to draw
- the position (in bytes) of the first index to draw

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

## Delete the indexbuffer {#delete}

You can delete the webgl buffer with the `dispose`{language=js} function.

```js
buffer.dispose();
```