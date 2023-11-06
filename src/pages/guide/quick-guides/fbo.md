<route lang="yaml">
meta:
  menuGuide: true
  menuName: Fbo
  menuOrder: 2
</route>

# Fbo

The Fbo class manages **framebuffers creation** with :
  - color
  - optional depth and/or stencil
  - resizing
  - binding helpers

It supports any kind of pixel formats (`RGB`{language=js}, `RGBA`{language=js}, `LUMINANCE`{language=js}, etc.) and any kind of pixel type (`UNSIGNED_BYTE`{language=js}, `FLOAT`{language=js}, etc.).

## Create an FBO

You can create an FBO with the `Fbo`{language=js} class, providing the gl context.

```js
import Fbo from "nanogl/fbo";

const fbo = new Fbo(gl);
```

## Bind FBO

The FBO is bound on its creation. You can later bind it using the `bind`{language=js} function.

<UICallout>

**Note :** If you use a function that requires the FBO to be bound, directly after its creation, there is no need to call the bind function.

</UICallout>

```js
fbo.bind();
```


## Resizing

By default, your FBO will be 0x0. You can change its size with the `resize`{language=js} function.

```js
// set FBO size to 128x128
fbo.resize(128,128);
```

## Attach color

You can attach a texture to the color attachment 0 with the `attachColor`{language=js} function.

<UICallout type="important">

**Important :** The FBO must be bound before using attach functions.

</UICallout>

```js
fbo.bind();

fbo.attachColor();

// you can specify a pixel format (default is gl.RGB)
fbo.attachColor(gl.RGBA);

// you can specify a pixel type (default is gl.UNSIGNED_BYTE)
fbo.attachColor(gl.RGB, gl.FLOAT);

// you can specify a pixel internal format (default is 'format' parameter value)
fbo.attachColor(gl.RGB, gl.UNSIGNED_BYTE, gl.RGBA);
```

## Attach depth/stencil

You can attach a renderbuffer or texture for depth and/or stencil to this FBO with the `attachDepth`{language=js} function.

You can choose, in order :
- to add a depth component or not
- to add a stencil component or not
- to use a texture or a renderbuffer

<UICallout type="important">

**Important :** The FBO must be bound before using attach functions.

</UICallout>

```js
fbo.bind();

// without any arguments, the depth component will be added,
// the stencil component will not
// and a renderbuffer will be used
fbo.attachDepth();

// add only stencil & use renderbuffer
fbo.attachDepth(false, true);

// add depth, stencil & use renderbuffer
fbo.attachDepth(true, true);

// add depth & use texture
fbo.attachDepth(true, false, true);

// add depth, stencil & use texture
fbo.attachDepth(true, true, true);
```

## Get color texture

You can get the color texture of the FBO (if it exists) with the `getColorTexture`{language=js} function.

You can then use it as you would a normal <router-link to="/guide/quick-guides/texture-2d">Texture2D</router-link>.

```js
// get the fbo color texture
const colorTexture = fbo.getColorTexture();

// use sampler options
colorTexture.bind();
colorTexture.repeat();

// set program texture with fbo color texture
prg.uTexture(colorTexture);
```

## Get depth/stencil data

You can get the depth/stencil texture or renderbuffer of the FBO (if it exists) with the `getDepth`{language=js} function.

You can then use it as you would a normal RenderBuffer or <router-link to="/guide/quick-guides/texture-2d">Texture2D</router-link>.

```js
// fbo1 has depth component & uses renderbuffer
const fbo1 = new Fbo();
fbo1.attachDepth(true, false, false);

// returns RenderBuffer with depth data
const fbo1Depth = fbo1.getDepth();

// fbo2 has depth component & stencil component
// & uses texture
const fbo2 = new Fbo();
fbo2.attachDepth(true, true, true);

// returns Texture2D with depth & stencil data
const fbo2Depth = fbo2.getDepth();
```

## Viewport

You can set the gl viewport to the size of the FBO with the `defaultViewport`{language=js} function.

```js
// set FBO size to 128x128
fbo.resize(128,128);

// set gl viewport with x = 0 ; y = 0
// width = 128 & height = 128
fbo.defaultViewport();
```

## Clear

You can clear all buffers (color, stencil and depth) of the FBO with the `clear`{language=js} function.

<UICallout type="important">

**Important :** The FBO must be bound before using clear function.

</UICallout>

```js
fbo.bind();

fbo.defaultViewport();
// clear all buffers
fbo.clear();
```

## Delete the FBO

You can delete the webgl objects related to this FBO with the `dispose`{language=js} function.

```js
fbo.dispose();
```