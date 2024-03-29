import Ibl from "nanogl-pbr/lighting/Ibl";
import Node from "nanogl-node";
import Camera from "nanogl-camera";
import GLState from "nanogl-state/GLState";
import GLConfig from "nanogl-state/GLConfig";
import Material from "nanogl-pbr/Material"
import TexCoord from "nanogl-pbr/TexCoord"
import Texture2D from "nanogl/texture-2d";
import LightSetup from "nanogl-pbr/lighting/LightSetup";
import ArrayBuffer from "nanogl/arraybuffer";
import IndexBuffer from "nanogl/indexbuffer";
import PerspectiveLens from "nanogl-camera/perspective-lens";
import { vec3 } from "gl-matrix";
import { Pane } from 'tweakpane';
import { StandardMetalness } from "nanogl-pbr/StandardPass"

import textureSrc from "@assets/images/square-texture.jpg";
import { iblPath, iblSh } from "../utils/iblData";
import { cubePosUvsNormals, cubeIndices } from "../utils/cubeGeometry";

const preview = (canvasEl) => {
  let canRender = true;

  // --CANVAS & CONTEXT--

  const canvas = canvasEl || document.getElementById("canvas");
  const gl = canvas.getContext("webgl");

  // --SIZING--

  const size = {
    width: 1,
    height: 1,
  };
  const pixelRatio = window.devicePixelRatio;

  const handleResize = ([entry]) => {
    // get canvas current width & height
    const canvasWidth = entry.contentRect.width;
    const canvasHeight = entry.contentRect.height;

    // set canvas size to display size multiplied by pixel ratio
    canvas.width = Math.round(canvasWidth * pixelRatio);
    canvas.height = Math.round(canvasHeight * pixelRatio);

    // set size to actual size of the current drawing buffer
    size.width = gl.drawingBufferWidth;
    size.height = gl.drawingBufferHeight;
  };

  // use ResizeObserver to handle canvas resize
  const resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(canvas);

  // --GL STATE--

  const glState = GLState.get(gl);

  // --CAMERA--

  const ORIGIN = vec3.create();

  const camera = new Camera(new PerspectiveLens());
  camera.lens.setAutoFov(35.0 * (Math.PI / 180.0)); // fov is in radians
  camera.lens.near = 0.01;
  camera.lens.far = 50;
  camera.position.set([0, 4, 10]); // set camera back on z axis and up on y axis
  camera.lookAt(ORIGIN); // look at origin point

  // --CUBE--

  // simple cube with vec3 position, vec2 uvs and indices
  const cubeVBuffer = new ArrayBuffer(gl, new Float32Array(cubePosUvsNormals));
  const cubeIBuffer = new IndexBuffer(gl, gl.UNSIGNED_SHORT, new Uint16Array(cubeIndices));

  // declare aPosition attribute as vec3
  cubeVBuffer.attrib("aPosition", 3, gl.FLOAT);
  // declare aTexCoord attribute as vec2
  cubeVBuffer.attrib("aTexCoord", 2, gl.FLOAT);
  // declare aNormal attribute as vec3
  cubeVBuffer.attrib("aNormal", 3, gl.FLOAT);

  // --NODE--

  // create a node for the cube
  const node = new Node();

  // --TEXTURE--

  // setup the texture
  const texture = new Texture2D(gl);
  texture.clamp();

  // setup the image
  const img = new Image();
  img.src = textureSrc;
  // set texture data from image on load
  img.onload = () => {
    texture.fromImage(img);
  }

  // --LIGHTING--

  // create light setup
  const lightSetup = new LightSetup();
  lightSetup.bounds.fromMinMax([-1,-1,-1],[1,1,1]);

  // create iblTexture
  const iblTexture = new Texture2D(gl, gl.RGBA);
  iblTexture.clamp();

  // create ibl light
  const ibl = new Ibl(iblTexture, iblSh);
  ibl.iblFormat = 'OCTA';
  ibl.shFormat = 'SH9';
  ibl.hdrEncoding = 'RGBM';

  // setup the image for the ibl texture
  const iblImg = new Image();
  iblImg.src = iblPath;
  // set texture data from image on load
  iblImg.onload = () => {
    iblTexture.fromImage(iblImg);
  }

  // add ibl to light setup
  lightSetup.add(ibl);

  // --MATERIAL--

  const PARAMS = {
    useTexture: false,
    baseColor: { r: 0.5, g: 0, b: 0.5 },
    metalness: 0.8,
    roughness: 0.2,
    emissiveColor: { r: 0, g: 0, b: 0 },
    alpha: 1,
    isTransparent: false,
  }

  // create material
  const material = new Material(gl);
  // setup material gl config
  material.glconfig
    .enableDepthTest()
    .enableCullface()
    .cullFace(gl.BACK)
    .enableBlend()
    .blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  // create metalness pass and add it to material
  const metalnessPass = new StandardMetalness();
  material.addPass(metalnessPass);

  // setup light setup for metalness pass
  metalnessPass.setLightSetup(lightSetup);
  // setup metalness amount
  metalnessPass.surface.metalness.attachUniform('metalness', 1)
    .set(PARAMS.metalness);
  // setup roughness amount
  metalnessPass.surface.roughness.attachUniform('roughness', 1)
    .set(PARAMS.roughness);
  // setup emissive
  metalnessPass.emissive.attachUniform('emissive', 3)
    .set(PARAMS.emissiveColor.r, PARAMS.emissiveColor.g, PARAMS.emissiveColor.b);
  // setup alpha
  metalnessPass.alpha.attachUniform('alpha', 1)
    .set(PARAMS.alpha);
  // setup alpha mode
  metalnessPass.alphaMode
    .set('OPAQUE');

  // function to use color for base color
  const setupColor = () => {
    // attach uniform to base color and set current color
    metalnessPass.surface.baseColor
      .attachUniform('color', 3)
      .set(PARAMS.baseColor.r, PARAMS.baseColor.g, PARAMS.baseColor.b);
  }

  // function to use texture for base color
  const setupTexture = () => {
    // attach sampler to base color and set texture
    metalnessPass.surface.baseColor
      .attachSampler('color', TexCoord.create('aTexCoord'))
      .set(texture);
  }

  // use color by default
  setupColor();

  // --NODE ANIMATION--

  const animateNode = () => {
    // rotate node
    node.rotateY(-0.005);
    node.rotateX(0.005);
    // invalidate & update node matrix
    node.invalidate();
    node.updateWorldMatrix();
  }

  // --RENDER--

  let rafID = null;

  const render = (time = 0) => {
    if (!canRender) return;

    // set viewport size
    gl.viewport(0, 0, size.width, size.height);
    // clear buffers
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // push material gl config
    if (material.glconfig) glState.push(material.glconfig);
    // apply current gl config
    glState.apply();

    // animate the cube
    animateNode();

    // update camera matrices
    camera.updateWorldMatrix();
    camera.updateViewProjectionMatrix(size.width, size.height);

    // prepare light setup
    lightSetup.prepare(gl);

    // prepare material passes
    material.getAllPasses().forEach((pass) => {
      pass.prepare(node, camera);
    })

    // link the cube vertex buffer to the material color program,
    // bind the cube index buffer, and draw
    const prg = material.getProgram('color');
    cubeVBuffer.attribPointer(prg);
    cubeIBuffer.bind();
    cubeIBuffer.drawTriangles();

    // pop material gl config
    if (material.glconfig) glState.pop();

    // request animation frame
    rafID = window.requestAnimationFrame(render);
  };

  setTimeout(render, 0);

  // --DEBUG--

  const pane = new Pane({
    container: document.getElementById('debug')
  });

  const metalness = pane.addFolder({
    title: 'Metalness'
  })
  const standard = pane.addFolder({
    title: 'Standard'
  })

  const changeColor = (inputParam, val) => {
    inputParam.set(val.r, val.g, val.b);
  }

  metalness.addBinding(PARAMS, 'useTexture')
    .on('change', () => {
      if (PARAMS.useTexture) {
        setupTexture();
      } else {
        setupColor();
      }
    });
  metalness.addBinding(PARAMS, 'baseColor', {
    color: { type: 'float' }
  }).on('change', () => {
    // do not set color if texture is used
    if (PARAMS.useTexture) return;
    changeColor(metalnessPass.surface.baseColor.param, PARAMS.baseColor);
  });
  metalness.addBinding(PARAMS, 'metalness', {
    min: 0,
    max: 1,
    step: 0.1
  }).on('change', () => metalnessPass.surface.metalness.param.set(PARAMS.metalness));
  metalness.addBinding(PARAMS, 'roughness', {
    min: 0,
    max: 1,
    step: 0.1
  }).on('change', () => metalnessPass.surface.roughness.param.set(PARAMS.roughness));

  standard.addBinding(PARAMS, 'emissiveColor', {
    color: { type: 'float' }
  }).on('change', () => changeColor(metalnessPass.emissive.param, PARAMS.emissiveColor));
  standard.addBinding(PARAMS, 'isTransparent').on('change', () => {
    metalnessPass.alphaMode.set(PARAMS.isTransparent ? 'BLEND' : 'OPAQUE');
  });
  standard.addBinding(PARAMS, 'alpha', {
    min: 0,
    max: 1,
    step: 0.1
  }).on('change', () => metalnessPass.alpha.param.set(PARAMS.alpha));

  // dont forget to disconnect, discard, dispose, delete things at the end, to prevent memory leaks
  const dispose = () => {
    canRender = false;
    window.cancelAnimationFrame(rafID);
    resizeObserver.disconnect();
    pane.dispose();
    texture.dispose();
    cubeIBuffer.dispose();
    iblTexture.dispose();
    glState.pop();
    glState.apply();
  }

  return dispose;
};

export { preview };