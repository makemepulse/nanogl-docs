import Node from "nanogl-node";
import Camera from "nanogl-camera";
import Program from "nanogl/program";
import GLState from "nanogl-state/GLState";
import GLConfig from "nanogl-state/GLConfig";
import ArrayBuffer from "nanogl/arraybuffer";
import IndexBuffer from "nanogl/indexbuffer";
import PerspectiveLens from "nanogl-camera/perspective-lens";
import { vec3, mat4 } from "gl-matrix";

import { cubePosUvs, cubeIndices } from "../utils/cubeGeometry";

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

  // --GL CONFIG--

  const glState = GLState.get(gl);

  // enable depth test and cull face
  const cfg = new GLConfig()
    .enableDepthTest()
    .enableCullface()
    .cullFace(gl.BACK);

  // push config to gl state
  glState.push(cfg);

  // --CAMERA--

  const ORIGIN = vec3.create();

  const camera = new Camera(new PerspectiveLens());
  camera.lens.setAutoFov(35.0 * (Math.PI / 180.0)); // fov is in radians
  camera.lens.near = 0.01;
  camera.lens.far = 50;
  camera.position.set([0, 5, 10]); // set camera back on z axis
  camera.lookAt(ORIGIN); // look at origin point

  // --CUBE--

  // simple cube with vec3 position, vec2 uvs and indices
  const cubeVBuffer = new ArrayBuffer(gl, new Float32Array(cubePosUvs));
  const cubeIBuffer = new IndexBuffer(gl, gl.UNSIGNED_SHORT, new Uint16Array(cubeIndices));

  // declare aPosition attribute as vec3
  cubeVBuffer.attrib("aPosition", 3, gl.FLOAT);
  // declare aTexCoord attribute as vec2
  cubeVBuffer.attrib("aTexCoord", 2, gl.FLOAT);

  // --PROGRAM--

  const vertexShader = `
    attribute vec3 aPosition;
    attribute vec2 aTexCoord;

    uniform mat4 uMVP;

    varying vec2 vTexCoord;

    void main(void){
      vec4 pos = vec4(aPosition, 1.0);
      gl_Position = uMVP * pos;
      vTexCoord = aTexCoord;
    }
  `;
  const fragmentShader = `
    precision highp float;

    varying vec2 vTexCoord;

    void main(void){
      vec3 color = vec3(vec2(0.5) + vTexCoord * vec2(0.5), 0.75);
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const prg = new Program(gl, vertexShader, fragmentShader);

  // --NODES--

  // function to create children to given node
  const createNodeChildren = (parentNode, childrenCount, radius, isVertical = false) => {
    for (let i = 0; i < childrenCount; i++) {
      const child = new Node();

      // position children nodes in a circle of given radius
      // around the parent
      const angle = (i / childrenCount) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      // if vertical, position children in circle around z axis
      // else position children in circle around y axis
      if (isVertical) {
        child.position.set([x, y, 0]);
      } else {
        child.position.set([x, 0, y]);
      }

      // children nodes are half the size of the parent
      child.setScale(0.5);
      // children nodes look at the origin
      child.lookAt(ORIGIN);

      parentNode.add(child);
    }
  }

  // create parent node at the origin with 0.5 scale
  const node = new Node();
  node.position.set(ORIGIN);
  node.setScale(0.5);

  // create parent node children
  // -> 5 children, circle radius 5, horizontal axis
  createNodeChildren(node, 5, 5);

  // create children nodes children
  // -> 3 children, circle radius 4, vertical axis
  node._children.forEach((childNode) => {
    createNodeChildren(childNode, 3, 4, true);
  });

  // --NODE ANIMATION--

  // recursive function to rotate all nodes
  // first parent rotates on y axis, all children rotate on z axis
  const rotateNodes = (currentNode, isZAxis = false) => {
    if (!isZAxis) {
      // rotate on y axis
      currentNode.rotateY(-0.008);
    } else {
      // rotate on z axis
      currentNode.rotateZ(0.008);
    }

    // rotate children nodes
    currentNode._children.forEach((childNode, i) => {
      rotateNodes(childNode, true);
    });
  }

  // animate the nodes
  const animateNodes = () => {
    // rotate all nodes
    rotateNodes(node);

    // invalidate & update node matrix
    // this will also update the children matrices
    node.invalidate();
    node.updateWorldMatrix();
  }

  // --RENDER--

  let rafID = null;
  const M4 = mat4.create();

  // recursive function to render all cubes
  const renderCubes = (currentNode) => {
    // get model view projection matrix from camera with cube node world matrix
    camera.modelViewProjectionMatrix(M4, currentNode._wmatrix);

    // bind program
    prg.use();
    // update program uniforms
    prg.uMVP(M4);

    // link the cube vertex buffer to the program,
    // bind the cube index buffer, and draw
    cubeVBuffer.attribPointer(prg);
    cubeIBuffer.bind();
    cubeIBuffer.drawTriangles();

    // render children cubes
    currentNode._children.forEach((childNode) => {
      renderCubes(childNode);
    });
  }

  const render = (time = 0) => {
    if (!canRender) return;

    // set viewport size
    gl.viewport(0, 0, size.width, size.height);
    // clear buffers
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // apply current gl config
    glState.apply();

    // animate the nodes
    animateNodes();

    // update camera matrices
    camera.updateWorldMatrix();
    camera.updateViewProjectionMatrix(size.width, size.height);

    // render all cubes
    renderCubes(node);

    // request animation frame
    rafID = window.requestAnimationFrame(render);
  };

  setTimeout(render, 0);

  // dont forget to disconnect, discard, dispose, delete things at the end, to prevent memory leaks
  const dispose = () => {
    canRender = false;
    window.cancelAnimationFrame(rafID);
    resizeObserver.disconnect();
    prg.dispose();
    cubeIBuffer.dispose();
    glState.pop();
    glState.apply();
  }

  return dispose;
};

export { preview };