<route lang="yaml">
meta:
  menuGuide: true
  menuName: Load a GLTF model
  menuOrder: 4
</route>

<div class="content-wrapper">

# Load a GLTF model

Often, using 2D primitives won't be enough, or building your own buffers will be far too complicated, and you'll need to load [glTF files](https://fr.wikipedia.org/wiki/GlTF).

We'll start with the canvas & context setup from the [Add some movement](/guide/getting-started/add-movement) article.

## Loading a file

Using the nanogl-gltf loader made for web [GltfIO](/api/nanogl-gltf/classes/GltfIO), you can directly load a model from its URL (relative path or external web URL).

Then you have to allocate the gl context to the loaded glTF, so every textures, buffers, etc. can be linked to the GL context, ready to be rendered.

Don't forget to call the render function only when the model is ready.

```js
import GltfIO from "nanogl-gltf/lib/io/web";

// ...

let gltf = null;

// load gltf from url
GltfIO.loadGltf("/models/suzanne/Suzanne.gltf").then(async (loadedGltf) => {
  gltf = loadedGltf;

  // link gltf to gl context
  await gltf.allocate(gl);

  // render only when the gltf is loaded and allocated
  render();
});
```

<UICallout type="info">

**Note :** This is the most basic way of loading a model with nanogl-gltf, but some more complete and detailed implementations may be better suited to your project (light management, animations, adding extensions support, ...). You can see one on the [starter](https://github.com/makemepulse/nanogl-starter).

</UICallout>

## Render the model

Then, to render the model, you just have to call the render function on each gltf's renderable (they all are [MeshRenderer](/api/nanogl-gltf/classes/MeshRenderer)).

You have to pass the GL context, the current camera, the [mask ID](/api/nanogl-gltf/interfaces/IRenderConfig) (1 is the OPAQUE mask, the default one), and the pass ID (COLOR, DEPTH, custom other passes...).

```js
const render = () => {
  // ...

  // render all gltf renderables (MeshRenderer)
  for (const renderable of gltf.renderables) {
    // pass the gl context, camera, mask id, and pass id
    renderable.render(gl, camera, 1, 'color');
  }

  requestAnimationFrame(render);
}
```

## Add lights

We still have an issue : the model appears, but totally black. And it makes sense, because we didn't setup any lights in our scene.

<GLPreview name="load-gltf-model" folder="guide"/>

To do so, we'll have to create a [LightSetup](/api/nanogl-pbr/classes/LightSetup) to encapsulate all our lights, and then add an [Ibl](/api/nanogl-pbr/classes/Ibl) to it.

The Ibl is created using an envMap texture and an array of Spherical Harmonics (it's a simplified representation of how much light comes from each direction).

```js
import LightSetup from "nanogl-pbr/lighting/LightSetup";
import Texture2D from "nanogl/texture-2d";
import Ibl from "nanogl-pbr/lighting/Ibl";
import iblSrc from "@assets/images/ibl.rgbm.png";

// ...

// create light setup
const lightSetup = new LightSetup();
lightSetup.bounds.fromMinMax([-1,-1,-1],[1,1,1]);

// create iblTexture
const iblTexture = new Texture2D(gl, gl.RGBA);
iblTexture.clamp();

// create ibl spherical harmonics data
const iblSh = new Float32Array([
  0.224084854125977, 0.213043749332428, 0.283314585685730, // L00, irradiance, pre-scaled base
  0.100831791758537, 0.124612621963024, 0.204235553741455, // L1-1, irradiance, pre-scaled base
  0.107245393097401, 0.083322264254093, 0.076212428510189, // L10, irradiance, pre-scaled base
  0.144294798374176, 0.106082014739513, 0.089959740638733, // L11, irradiance, pre-scaled base
  0.053996223956347, 0.044765342026949, 0.044178668409586, // L2-2, irradiance, pre-scaled base
  0.025597579777241, 0.024105755612254, 0.027786524966359, // L2-1, irradiance, pre-scaled base
  0.004080550745130, 0.002261536428705, -0.000168046550243, // L20, irradiance, pre-scaled base
  0.091950185596943, 0.066512495279312, 0.055933292955160, // L21, irradiance, pre-scaled base
  0.051955129951239, 0.036966290324926, 0.029668755829334, // L22, irradiance, pre-scaled base
])

// create ibl light
const ibl = new Ibl(iblTexture, iblSh);
ibl.iblFormat = 'OCTA';
ibl.shFormat = 'SH9';
ibl.hdrEncoding = 'RGBM';

// setup the image for the ibl texture
const iblImg = new Image();
iblImg.src = iblSrc;
// set texture data from image on load
iblImg.onload = () => {
  iblTexture.fromImage(iblImg);
}

// add ibl to light setup
lightSetup.add(ibl);
```

Then we need to apply this LightSetup to every material of the gltf model.

```js
// load gltf from url
GltfIO.loadGltf("/models/suzanne/Suzanne.gltf").then(async (loadedGltf) => {
  // ...

  await gltf.allocate(gl);

  // apply LightSetup on every material
  for (const material of gltf.materials) {
    material.materialPass.setLightSetup(lightSetup);
  }
  
  // ...
});
```

And finally we just need to update the LightSetup before rendering the model (to apply potential position/color/intensity/... changes in lights).

```js
const render = () => {
  // ...

  // prepare light setup, before calling renderable.render()
  lightSetup.prepare(gl);

  // ...
}
```

## Add some movement

Let's rotate our Suzanne model a little bit at each frame, so we can see all sides and check our lighting setup.

```js
const animate = () => {
  // get gltf root node
  const node = gltf.root;
  // rotate around X axis a little bit at each frame
  node.rotateY(0.01);
  // update world matrix
  node.updateWorldMatrix();
}

const render = () => {
  animate();

  // ...
}
```

## Result

And now you have a beautiful Suzanne !

<GLPreview name="load-gltf-model-lights" folder="guide"/>

## Final code

Here is the complete code for the js file :

```js
import Camera from "nanogl-camera";
import PerspectiveLens from "nanogl-camera/perspective-lens";
import GltfIO from "nanogl-gltf/lib/io/web";
import LightSetup from "nanogl-pbr/lighting/LightSetup";
import Texture2D from "nanogl/texture-2d";
import Ibl from "nanogl-pbr/lighting/Ibl";
import iblSrc from "@assets/images/ibl.rgbm.png";

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

// --LIGHTING--

// create light setup
const lightSetup = new LightSetup();
lightSetup.bounds.fromMinMax([-1,-1,-1],[1,1,1]);

// create iblTexture
const iblTexture = new Texture2D(gl, gl.RGBA);
iblTexture.clamp();

// create ibl spherical harmonics data
const iblSh = new Float32Array([
  0.224084854125977, 0.213043749332428, 0.283314585685730, // L00, irradiance, pre-scaled base
  0.100831791758537, 0.124612621963024, 0.204235553741455, // L1-1, irradiance, pre-scaled base
  0.107245393097401, 0.083322264254093, 0.076212428510189, // L10, irradiance, pre-scaled base
  0.144294798374176, 0.106082014739513, 0.089959740638733, // L11, irradiance, pre-scaled base
  0.053996223956347, 0.044765342026949, 0.044178668409586, // L2-2, irradiance, pre-scaled base
  0.025597579777241, 0.024105755612254, 0.027786524966359, // L2-1, irradiance, pre-scaled base
  0.004080550745130, 0.002261536428705, -0.000168046550243, // L20, irradiance, pre-scaled base
  0.091950185596943, 0.066512495279312, 0.055933292955160, // L21, irradiance, pre-scaled base
  0.051955129951239, 0.036966290324926, 0.029668755829334, // L22, irradiance, pre-scaled base
])

// create ibl light
const ibl = new Ibl(iblTexture, iblSh);
ibl.iblFormat = 'OCTA';
ibl.shFormat = 'SH9';
ibl.hdrEncoding = 'RGBM';

// setup the image for the ibl texture
const iblImg = new Image();
iblImg.src = iblSrc;
// set texture data from image on load
iblImg.onload = () => {
  iblTexture.fromImage(iblImg);
}

// add ibl to light setup
lightSetup.add(ibl);

// --GLTF--

let gltf = null;

// load gltf from url
GltfIO.loadGltf("/models/suzanne/Suzanne.gltf").then(async (loadedGltf) => {
  gltf = loadedGltf;

  // link gltf to gl context
  await gltf.allocate(gl);

  // set gltf material light setup
  for (const material of gltf.materials) {
    material.materialPass.setLightSetup(lightSetup);
  }

  // render only when the gltf is loaded and allocated
  render();
});

// --ANIMATION--

const animate = () => {
  // get gltf root node
  const node = gltf.root;
  // rotate around X axis a little bit at each frame
  node.rotateY(0.01);
  // update world matrix
  node.updateWorldMatrix();
}

// --RENDER--

const render = () => {
  animate();

  // setup viewport
  gl.viewport(0, 0, size.width, size.height);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  
  // update camera matrices
  camera.updateWorldMatrix();
  camera.updateViewProjectionMatrix(size.width, size.height);

  // prepare light setup
  lightSetup.prepare(gl);
  
  // render all gltf renderables (MeshRenderer)
  for (const renderable of gltf.renderables) {
    // render each renderable by passing the gl context, the camera, the mask id (1 is Opaque), and the pass id ('color' by default)
    renderable.render(gl, camera, 1, 'color');
  }

  requestAnimationFrame(render);
}
```

</div>

<div class="toc-wrapper">

[[toc]]

</div>

<div class="nav-wrapper">
  <a class="prev" href="/guide/getting-started/add-movement">Add some movement</a>
  <a class="next" href="/guide/getting-started/full-screen-shader">Full-screen shader</a>
</div>