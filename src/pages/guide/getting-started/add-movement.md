<route lang="yaml">
meta:
  menuGuide: true
  menuName: Add some movement
  menuOrder: 3
</route>

<div class="content-wrapper">

# Add some movement

At the end of the last article, we had a static render of a triangle. But usually, we don't want a static render, but an animated one. So let's add some movmement.

We'll start out with the code we created in the [last article](creating-a-scene#final-code).

## Setup render loop

To have an animated scene, we need to setup a render loop. This is not specific to nanogl, you can do this as you would in your usual WebGL project.

Let's take our render function, and add ```requestAnimationFrame(render)```{language=js} inside.

```js
// ...

const render = () => {
  // ...

  requestAnimationFrame(render);
}

render();

```

This will call the ```render```{language=js} function on every screen refresh.

You can also remove the render call from the ```handleResize```{language=js} function now.

## Create the node

To add some movement, we'd like to be able to choose a specific position, rotation and scale. To setup these transform values, we can use a [Node](/api/nanogl-node/classes/Node).

The Node will provide us some helpers to set these values, and get the corresponding world matrix.

```js
// ...

import Node from "nanogl-node";

// ...

const node = new Node();

// you can set position
node.position.set([1, 0, 0]);
// you can set scale
node.setScale(1.5);
// and you can rotate along any axis
node.rotateZ(90 * (Math.PI / 180.0)); // rotation is in radians
```

Then, in our render function we can get the model view projection matrix and update the ```uMVP```{language=js} uniform with it.

```js
// ...

const M4 = mat4.create();

const render = () => {
  // ...

  camera.updateWorldMatrix();
  camera.updateViewProjectionMatrix(size.width, size.height);

  // after updating the camera view projection matrix
  // get the model view projection matrix from camera with node world matrix
  camera.modelViewProjectionMatrix(M4, node._wmatrix);

  prg.use();
  // update uMVP with calculated model view projection matrix
  prg.uMVP(M4);

  // ...
}

render();
```

## Play with the transform values {#play-transform}

Now we can animate the transform values.

Bafore starting, we need to remove the transform values we set right after creating the node. We'll set these values in the render function now.

### Setup a function

Let's start by creating an ```animate```{language=js} function, and calling it at each frame.

The ```requestAnimationFrame```{language=js} function provides the callback with a ```time```{language=js} argument : it is a timestamp of the end time of the previous frame's rendering. Let's pass this value from the ```render```{language=js} function to the ```animate```{language=js} function, as it will be useful for our animations.

```js
// ...

const animate = (time) => {
  // animations
}

const render = (time) => {
  animate(time);

  // ...
}

render();
```

### Position & scale

For the position and the scale, we want the value to oscillate. The time value increases at each render, so we can use it with ```Math.cos```{language=js} or ```Math.sin```{language=js} to get an oscillation over time.

```js
const animate = (time) => {
  // times is in ms, we need to slow down the progress
  const progress = time * 0.001;

  // make y position vary between -1 and 1
  node.position[1] = Math.cos(progress);

  // make scale vary between 1 and 2
  node.setScale(Math.sin(progress) * 0.5 + 1.5);
}
```

### Rotation

The rotation is a bit different, as we can use the ```rotateZ```{language=js} function to rotate along the z axis relatively to its current rotation. So we can simply call the ```rotateZ```{language=js} function each frame to rotate continuously.

```js
const animate = (time) => {
  // ...

  // rotate by 0.5deg on z axis on each frame
  node.rotateZ(0.5 * (Math.PI / 180.0)); // rotation is in radians
}
```

### World matrix

Now we need to update the node world matrix to reflect these changes.

<UICallout type="important">

**Important :** Make sure you update the node world matrix *after* the transforms and *before* computing the model view projection matrix.

</UICallout>


```js
const animate = (time) => {
  // ...

  // update world matrix after the changes
  node.invalidate();
  node.updateWorldMatrix();
}
```

## Result

That's it, now the triangle's position, scale and rotation are evolving over time.

<GLPreview name="add-movement" folder="guide"/>

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

// --NODE--

const node = new Node();

// --RENDER--

const M4 = mat4.create();

const animate = (time) => {
  // times is in ms, we need to slow down the progress
  const progress = time * 0.001;

  // make y position vary between -1 and 1
  node.position[1] = Math.cos(progress);
  // make scale vary between 1 and 2
  node.setScale(Math.sin(progress) * 0.5 + 1.5);
  // rotate by 0.5deg on z axis on each frame
  node.rotateZ(0.5 * (Math.PI / 180.0)); // rotation is in radians

  // update world matrix after the changes
  node.invalidate();
  node.updateWorldMatrix();
}

const render = (time) => {
  animate(time);

  // set viewport size
  gl.viewport(0, 0, size.width, size.height);
  // clear viewport
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // update camera matrices
  camera.updateWorldMatrix();
  camera.updateViewProjectionMatrix(size.width, size.height);

  // get model view projection matrix from camera with node world matrix
  camera.modelViewProjectionMatrix(M4, node._wmatrix);

  // bind program
  prg.use();
  // update program uniforms
  prg.uMVP(M4);

  // link the shape buffer to the program, and draw
  shape.attribPointer(prg);
  shape.drawTriangles();

  requestAnimationFrame(render);
}

render();
```

</div>

<div class="toc-wrapper">

[[toc]]

</div>

<div class="nav-wrapper">
  <a class="prev" href="/guide/getting-started/creating-a-scene">Creating a scene</a>
  <a class="next" href="/guide/getting-started/load-gltf">Load a GLTF model</a>
</div>