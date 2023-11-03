<route lang="yaml">
meta:
  menuGuide: true
  menuSection: Getting started
  menuName: Installation
  menuOrder: 0
</route>

# Installation

You can use nanogl in any Javascript project.

## Setup nanogl in your project

### Install with a package manager

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

### Use the source files

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
  - [nanogl-glft](https://github.com/plepers/nanogl-gltf) : Handle .gltf files
  - [nanogl-pbr](https://github.com/plepers/nanogl-pbr) : Physically based rendering materials for nanogl
  - [nanogl-pf](https://github.com/plepers/nanogl-pf) : Provide pixel format related capabilities
  - [nanogl-post](https://github.com/plepers/nanogl-post) : Post-processing for nanogl
  - [nanogl-state](https://github.com/plepers/nanogl-state) : Efficient webgl state management
  - [nanogl-sync](https://github.com/plepers/nanogl-sync) : WebGLSync for nanogl
  - [nanogl-vao](https://github.com/plepers/nanogl-vao) : OES_vertex_array_object extension support for nanogl

### Other libraries

The [gl-matrix](https://glmatrix.net/) package is also useful for vector & matrix math.