<route lang="yaml">
meta:
  menuGuide: true
  menuName: Installation
  menuOrder: 1
</route>

<div class="content-wrapper">

# Installation

You can use nanogl in any Javascript project.

## Setup nanogl in your project {#setup}

### Install with a package manager {#package-manager}

The easiest way to install nanogl is with a package manager.
You will need to install [Node.js](https://nodejs.org/en) or [Yarn](https://yarnpkg.com/), then you can run the corresponding line :

```bash
npm i nanogl
```
or
```bash
yarn add nanogl
```

You can then import what you need like this :

```js
import Program from "nanogl/program"
```

### Use the nanogl starter {#starter}

You can also use the [nanogl starter](https://github.com/makemepulse/nanogl-starter) to start a new project,
ready to use nanogl, and with some useful features (see [here](https://sample.nanogl.com/) some samples showcasing those features).

<UICallout>

**Note :** The nanogl starter is opinionated, it uses specific
frameworks and structures.

</UICallout>

### Use the source files {#source-files}

<!-- TODO : vérifier si on garde ça + s'il y a d'autres méthodes -->

You can download the zipped repository [here](https://github.com/plepers/nanogl/archive/refs/heads/develop.zip). Add the folder to your project, keeping the desired files.
You can then import what you need like this :

```js
import Program from "path/to/folder/program.js"
```

## Additional libraries

There are other packages you can install to use with nanogl.

### nanogl libraries

You can also install some nanogl libraries for useful features :
  - [nanogl-camera](https://github.com/plepers/nanogl-camera) : Cameras for nanogl
  - [nanogl-node](https://github.com/plepers/nanogl-node) : Handle nested objects transform in 3D space
  - [nanogl-primitives-2d](https://github.com/plepers/nanogl-primitives-2d) : Basic 2D primitives for nanogl
  - [nanogl-gltf](https://github.com/plepers/nanogl-gltf) : Handle .gltf files
  - [nanogl-pbr](https://github.com/plepers/nanogl-pbr) : Physically based rendering materials for nanogl
  - [nanogl-pf](https://github.com/plepers/nanogl-pf) : Provide pixel format related capabilities
  - [nanogl-post](https://github.com/plepers/nanogl-post) : Post-processing for nanogl
  - [nanogl-state](https://github.com/plepers/nanogl-state) : Efficient webgl state management
  - [nanogl-sync](https://github.com/plepers/nanogl-sync) : WebGLSync for nanogl
  - [nanogl-vao](https://github.com/plepers/nanogl-vao) : OES_vertex_array_object extension support for nanogl

### Other libraries

The [gl-matrix](https://glmatrix.net/) package is also useful for vector & matrix math.

</div>

<div class="toc-wrapper">

[[toc]]

</div>

<div class="nav-wrapper">
  <RouterLink to="/guide/getting-started/introduction" class="prev">Introduction</RouterLink>
  <RouterLink to="/guide/getting-started/creating-a-scene" class="next">Creating a scene</RouterLink>
</div>