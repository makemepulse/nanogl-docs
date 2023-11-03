<route lang="yaml">
meta:
  menuGuide: true
  menuName: Texture2D
  menuOrder: 0
</route>

# Texture2D

The Texture2D class provides helpers for `TEXTURE_2D`{language=js} textures :
  - loading from an image, canvas, video, or data
  - filtering and wrapping

It supports any kind of pixel formats (`RGB`{language=js}, `RGBA`{language=js}, `LUMINANCE`{language=js}, etc.) and any kind of pixel type (`UNSIGNED_BYTE`{language=js}, `FLOAT`{language=js}, etc.).

## Texture creation

You can create a texture with the `Texture2D`{language=js} class, providing options or not.

```js
import Texture2D from "nanogl/texture-2d"

const texture = new Texture2D(gl);

// you can specify a pixel format (default is gl.RGB)
const textureRGBA = new Texture2D(gl, gl.RGBA);

// you can specify a pixel type (default is gl.UNSIGNED_BYTE)
const textureFloat = new Texture2D(gl, gl.RGB, gl.FLOAT);

// you can specify a pixel internal format (default is 'format' parameter value)
const textureInternalFloat = new Texture2D(gl, gl.RGB, gl.UNSIGNED_BYTE, gl.RGBA);
```


## Load from image, canvas or video

You can set the texture data from an HTML source with the `fromImage`{language=js} function.

```js
// you must ensure your image is loaded before send it to texture
img.onload = function () {
  texture.fromImage(img)
}

```

## Allocate empty texture

You can allocate an empty texture with the `fromData`{language=js} function.

```js
// allocate empty 128x128 texture
texture.fromData(128, 128);
```

## Load from TypedArray

You can also set texture data from a TypedArray with the `fromData`{language=js} function.

```js
// create texture from TypedArray (4x2 8bpp)
var texture = new Texture(gl, gl.LUMINANCE);
var data = new Uint8Array([
  0, 10, 20, 30
  20, 30, 40, 50
]);
texture.fromData(4, 2, data);
```

## Bind texture

You can bind the texture with the `bind`{language=js} function, providing a texture unit or not.

```js
// by default, the texture is bound to the current active texture
texture.bind();

// to bind the texture to specific unit :
texture.bind(3);
```

## Play with sampler options

### Filtering parameters

Set `MIN_FILTER`{language=js} and `MAG_FILTER`{language=js} in a single call with the `setFilter`{language=js} function. (Texture2D ensures MIPMAP isn't used for MAG_FILTER)

You can choose, in order :
- to use linear filtering or not
- to enable mipmaping or not
- to use linear mipmapping or not

```js
// texture must be explicitely bound before using following methods
texture.bind();

// sample LINEAR (default)
texture.setFilter(true)

// sample NEAREST
texture.setFilter(false)

// sample LINEAR_MIPMAP_NEAREST
texture.setFilter(true, true)

// sample LINEAR_MIPMAP_LINEAR
texture.setFilter(true, true, true)
```

### Wrapping parameters

Set `WRAP_S`{language=js} and `WRAP_T`{language=js} with the `repeat`{language=js}, `clamp`{language=js}, `mirror`{language=js} & `wrap`{language=js} functions.

```js
// texture must be explicitely bound before using following methods
texture.bind();

// wrap REPEAT
texture.repeat()

// wrap CLAMP_TO_EDGE
texture.clamp()

// wrap MIRRORED_REPEAT
texture.mirror()

// or manual wrap
texture.wrap(gl.REPEAT)
```

## Delete the texture

You can delete the webgl texture with the `dispose`{language=js} function.

```js
texture.dispose();
```
