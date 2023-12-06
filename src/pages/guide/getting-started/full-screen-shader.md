<route lang="yaml">
meta:
  menuGuide: true
  menuName: Full-screen shader
  menuOrder: 5
</route>

<div class="content-wrapper">

# Full-screen shader

We might want to simply render a full-screen shader with nanogl. Let's see how to do that.

We'll start with the canvas & context setup from the [Add some movement](/guide/getting-started/add-movement) article.

## Create a quad

First, we need to create a quad.
We don't want any projection, so we don't need to setup a camera.

Let's create an [ArrayBuffer](/api/nanogl/classes/ArrayBuffer), with the position & uvs datas we need for each vertice.

We need 2 triangles, with positions from -1 to 1 on both axes, and uvs going from 0 to 1 on both axes, to cover the screen.

```js
// ...

import ArrayBuffer from "nanogl/arraybuffer";

// ...

// simple rectangle with vec2 position and vec2 uvs
// each vertice will have 2 numbers for position and 2 numbers for uvs
const quadData = new Float32Array([
  // 1st triangle
  1, 1, 1, 1,
  -1, -1, 0, 0, // position = vec2(-1, -1) / uvs = vec2(0, 0)
  -1, 1, 0, 1,
  // 2nd triangle
  -1, -1, 0, 0,
  1, -1, 1, 0,
  1, 1, 1, 1,
]);
const quad = new ArrayBuffer(gl, quadData);

// declare aPosition attribute as vec2
quad.attrib('aPosition', 2, gl.FLOAT);
// declare aTexCoord attribute as vec2
quad.attrib('aTexCoord', 2, gl.FLOAT);
```

<UICallout>

**Note :** To make things easier, we could use a [Rect](/api/nanogl-primitives-2d/classes/Rect) to create a quad buffer like this.
For this example, we will create our own buffers.

</UICallout>

## Create the program

Now, we need to create the [Program](/api/nanogl/classes/Program).
Let's start with the shader.

### Vertex shader

In our vertex shader, we only need to set the position, without any projection,
and to pass our uvs datas to the fragment shader.

```glsl
attribute vec2 aPosition;
attribute vec2 aTexCoord;

varying vec2 vUv;

void main(void){
  gl_Position = vec4(aPosition, 0.0, 1.0);
  vUv = aTexCoord;
}
```

### Fragment shader

Now, let's simply use our uvs for the color.

```glsl
precision lowp float;

varying vec2 vUv;

void main(void){
  gl_FragColor = vec4(vUv, 0., 1.0);
}
```

### Program

And finally, let's create our program with our shader code.

```js
// ...

import Program from "nanogl/program"

// ...

const vertexShader = `
  // vertex shader code
`;
const fragmentShader = `
  // fragment shader code
`;

const prg = new Program(gl, vertexShader, fragmentShader);
```

## Draw the quad

We can now create our render function.

We can keep it simple for now, just binding the program and drawing the quad.

```js
// ...

const render = () => {
  // setup viewport
  gl.viewport(0, 0, size.width, size.height);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // bind program
  prg.use();

  // link the quad buffer to the program, and draw
  quad.attribPointer(prg);
  quad.drawTriangles();

  requestAnimationFrame(render);
}

render();
```

## Add some movement

Let's add some movement to our shader. We will change the blue value of the color over time.

As seen in the [Add some movement](/guide/getting-started/add-movement) article, we can pass a timestamp to the render function.

Let's use it to set a time uniform in our shader.

```js
// ...

const render = (time) => {
  // ...

  // bind program
  prg.use();
  // setup program uniforms
  prg.uTime(time * 0.001);

  // ...
}

render(0);
```

And in our fragment shader, we can set our blue value according to the time value.

```glsl
precision lowp float;

uniform float uTime;

varying vec2 vUv;

void main(void){
  // we'll make the value oscillate between 0 and 1 over time
  float blue = cos(uTime) * 0.5 + 0.5;
  gl_FragColor = vec4(vUv, blue, 1.0);
}
```

## Optimization

There is a way to optimize our full-screen shader.
We can draw a single triangle covering the whole screen, instead of drawing 2.

To do so, we need to create a triangle with its bottom left corner being at `(-1, -1)`{language=js},
and its hypotenuse going through the top right corner of the screen. So the other
vertices of the triangle need to be at `(-1, 3)`{language=js} and `(3, -1)`{language=js}.

We also need to adapt the uvs data to make sure the visible part of the triangle,
being our quad, has uvs going from 0 to 1 on both axes. So our triangle's uvs
need to go from 0 to 2.

To do so, we only need to modify our quadData array buffer.

```js

// ...

// full-screen triangle with vec2 position and vec2 uvs
const quadData = new Float32Array([
  -1, 3, 0, 2,
  -1, -1, 0, 0,
  3, -1, 2, 0,
]);

// ...
```

## Result

And now you have a full-screen shader !

<GLPreview name="full-screen-shader" folder="guide"/>

## Final code

Here is the complete code for the js file :

```js
import Program from "nanogl/program";
import ArrayBuffer from "nanogl/arraybuffer";

// --CANVAS & CONTEXT--

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const gl = canvas.getContext("webgl");

// --SIZING--

const size = {
  width: 1,
  height: 1
};
const pixelRatio = window.devicePixelRatio;

const handleResize = (entries) => {
  // get canvas width & height
  const {
    width: canvasWidth,
    height: canvasHeight
  } = entries[0].contentRect;

  // set canvas size to display size multiplied by pixel ratio
  canvas.width = Math.round(canvasWidth * pixelRatio);
  canvas.height = Math.round(canvasHeight * pixelRatio);

  // set size variable to actual size of the current drawing buffer
  size.width = gl.drawingBufferWidth;
  size.height = gl.drawingBufferHeight;
}

const resizeObserver = new ResizeObserver(handleResize);
resizeObserver.observe(canvas);

// --BUFFER--

// full-screen triangle with vec2 position and vec2 uvs
const quadData = new Float32Array([
  -1, 3, 0, 2,
  -1, -1, 0, 0,
  3, -1, 2, 0,
]);
const quad = new ArrayBuffer(gl, quadData);

// declare aPosition attribute as vec2
quad.attrib('aPosition', 2, gl.FLOAT);
quad.attrib('aTexCoord', 2, gl.FLOAT);

// --PROGRAM--

const vertexShader = `
  attribute vec2 aPosition;
  attribute vec2 aTexCoord;

  varying vec2 vUv;

  void main(void){
    gl_Position = vec4(aPosition, 0.0, 1.0);
    vUv = aTexCoord;
  }
`
const fragmentShader = `
  precision lowp float;

  uniform float uTime;

  varying vec2 vUv;

  void main(void){
    // we'll make the value oscillate between 0 and 1 over time
    float blue = cos(uTime) * 0.5 + 0.5;
    gl_FragColor = vec4(vUv, blue, 1.0);
  }
`

const prg = new Program(gl, vertexShader, fragmentShader);

// --RENDER--

const render = (time) => {
  // setup viewport
  gl.viewport(0, 0, size.width, size.height);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // bind program
  prg.use();
  prg.uTime(time * 0.001);

  // link the quad buffer to the program, and draw
  quad.attribPointer(prg);
  quad.drawTriangles();

  requestAnimationFrame(render);
}

render(0);
```

</div>

<div class="toc-wrapper">

[[toc]]

</div>

<div class="nav-wrapper">
  <RouterLink to="/guide/getting-started/load-gltf" class="prev">Load a GLTF model</RouterLink>
</div>