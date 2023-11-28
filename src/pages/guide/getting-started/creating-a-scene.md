<route lang="yaml">
meta:
  menuGuide: true
  menuName: Creating a scene
  menuOrder: 2
</route>

<div class="content-wrapper">

# Creating a scene

Let's begin by creating a simple scene, rendering a triangle.

<UICallout type="info">

**Note :** You will need to install some libraries for this guide. All the imports are specified in the code samples, so please install the packages when you see an import for a lib that you do not already have installed.

</UICallout>

## Setup the canvas & context {#setup-canvas-context}

<UICallout type="important">

**Important :** This part is necessary for every article in the *Getting Started* guide. The code will be used as the base for all the other articles.

</UICallout>

We can start by setting up the canvas & context. This is not specific to nanogl, you can do this as you would in your usual WebGL project.

First, in a Javascript file, we need to create the canvas in which we will render our WebGL project, and get the WebGL rendering context.

```js
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

const gl = canvas.getContext("webgl");
```

In our CSS, we can make our canvas full-screen.

```css
canvas {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
}
```

Then, we need to handle the canvas sizing.

```js
// ...

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
```

## Create the camera

Now we can create the [Camera](/api/nanogl-camera/classes/Camera). We will use a [PerspectiveLens](/api/nanogl-camera/classes/PerspectiveLens), but you can also choose an [OrthographicLens](/api/nanogl-camera/classes/OrthographicLens).

We'll set some parameters too : the FOV, the near & far planes, the position & the rotation.

```js
import Camera from "nanogl-camera";
import PerspectiveLens from "nanogl-camera/perspective-lens";

// ...

const camera = new Camera(new PerspectiveLens());
camera.lens.setAutoFov(35.0 * (Math.PI / 180.0)); // fov is in radians
camera.lens.near = .01;
camera.lens.far = 50;
camera.position.set([0, 0, 5]); // set camera back on z axis
camera.lookAt([0, 0, 0]); // look at origin point
```

## Create the shape

Next, we can create the shape we want to render. To keep things simple, we'll create a triangle.

Let's create an [ArrayBuffer](/api/nanogl/classes/ArrayBuffer), with the information we need for each vertice of our triangle. For this example, we only need the position attribute. In other cases, we might need the uvs too, for example.

```js
// ...

import ArrayBuffer from "nanogl/arraybuffer";

// ...

// simple triangle with vec2 position
const shapeVertices = new Float32Array([1, 0, 0, 0, 0, 1]);
const shape = new ArrayBuffer(gl, shapeVertices);

// declare aPosition attribute as vec2
shape.attrib('aPosition', 2, gl.FLOAT);
```

Based on this example, you could create any shape you want by providing the wanted shape's vertices data & the indices data if needed (with an [IndexBuffer](/api/nanogl/classes/IndexBuffer)).

## Create the program

Now, we need to create the [Program](/api/nanogl/classes/Program), with the shader we want to use to render our shape.

Let's start with the shader.

### Vertex shader

Our vertex shader is simple. We only need to calculate the vertex position with the position attribute and the model view projection.

```glsl
attribute vec2 aPosition;

uniform mat4 uMVP;

void main(void){
  vec4 pos = vec4(aPosition, 0.0, 1.0);
  gl_Position = uMVP * pos;
}
```

### Fragment shader

We only want to draw the triangle with one color, so let's set the frag color to red.

```glsl
precision lowp float;
void main(void){
  vec3 red = vec3(1.0, 0.0, 0.0);
  gl_FragColor = vec4(red, 1.0);
}
```

### Program

If your project is setup to do that, you can import your glsl files as strings and use them to create the program.

```js
// ...

import Program from "nanogl/program";

import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

// ...

const prg = new Program(gl, vertexShader, fragmentShader);
```

If not, you can directly put the shader code as string literals.

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

## Draw the shape

Finally, let's create a render function and call it.

- First, we need to set the viewport size & clear the viewport.
- Then we'll update the camera world matrix & view projection matrix.
- Then we'll update the program uniforms.
- And finally we can link the shape buffer to the program, and draw the triangle.

```js
// ...

import { mat4 } from 'gl-matrix'

// ...

const render = () => {
  // set viewport size
  gl.viewport(0, 0, size.width, size.height);
  // clear viewport
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // update camera matrices
  camera.updateWorldMatrix();
  camera.updateViewProjectionMatrix(size.width, size.height);

  // bind program
  prg.use();
  // update program uniforms
  prg.uMVP(camera._viewProj);

  // link the shape buffer to the program, and draw
  shape.attribPointer(prg);
  shape.drawTriangles();
}

render();
```

Let's also call the render function when the canvas is resized, to adapt the render to the new size.

<UICallout type="info">

**Note :** We will only call a render on resize here because the render is static. When the render is updated on each frame, it is not useful.

</UICallout>

```js
// ...

const handleResize = (entries) => {
  // ...

  // the render is static,
  // so let's update it on resize
  render();
}

// ...
```

## Result

And now we can see a red triangle in the middle of the canvas !

<GLPreview name="creating-a-scene" folder="guide"/>

## Final code

Here is the complete code for the js file :

```js
import Node from "nanogl-node";
import Camera from "nanogl-camera";
import Program from "nanogl/program";
import ArrayBuffer from "nanogl/arraybuffer";
import PerspectiveLens from "nanogl-camera/perspective-lens";
import { mat4 } from "gl-matrix";

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

  // as we are not updating the render,
  // let's render when the canvas is resized
  render();
}

const resizeObserver = new ResizeObserver(handleResize);
resizeObserver.observe(canvas);

// --CAMERA--

const camera = new Camera(new PerspectiveLens());
camera.lens.setAutoFov(35.0 * (Math.PI / 180.0)); // fov is in radians
camera.lens.near = .01;
camera.lens.far = 50;
camera.position.set([0, 0, 5]); // set camera back on z axis
camera.lookAt([0, 0, 0]); // look at origin point

// --BUFFER--

// simple triangle with vec2 position
const shapeVertices = new Float32Array([1, 0, 0, 0, 0, 1]);
const shape = new ArrayBuffer(gl, shapeVertices);

// declare aPosition attribute as vec2
shape.attrib('aPosition', 2, gl.FLOAT);

// --PROGRAM--

const vertexShader = `
  attribute vec2 aPosition;

  uniform mat4 uMVP;

  void main(void){
    vec4 pos = vec4(aPosition, 0.0, 1.0);
    gl_Position = uMVP * pos;
  }
`
const fragmentShader = `
  precision lowp float;
  void main(void){
    vec3 red = vec3(1.0, 0.0, 0.0);
    gl_FragColor = vec4(red, 1.0);
  }
`

const prg = new Program(gl, vertexShader, fragmentShader);

// --RENDER--

const render = () => {
  // set viewport size
  gl.viewport(0, 0, size.width, size.height);
  // clear viewport
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // update camera matrices
  camera.updateWorldMatrix();
  camera.updateViewProjectionMatrix(size.width, size.height);

  // bind program
  prg.use();
  // update program uniforms
  prg.uMVP(camera._viewProj);

  // link the shape buffer to the program, and draw
  shape.attribPointer(prg);
  shape.drawTriangles();
}

render();
```

Of course, in a bigger project, it would be preferable to create functions and/or classes to better organize the code, but that is entirely up to you.

</div>

<div class="toc-wrapper">

[[toc]]

</div>