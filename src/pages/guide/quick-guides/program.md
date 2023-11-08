<route lang="yaml">
meta:
  menuGuide: true
  menuName: Program
  menuOrder: 1
</route>

<div class="content-wrapper">

# Program

The Program class provides **shader compilation** and **gl program linking** functionality.

It also give you convenient access to **active uniforms and attributes**.

## Create a program {#create}

You can create a program with the `Program`{language=js} class, providing its code as strings. The program will be compiled on its creation.

```js
import Program from "nanogl/program";

// create a new Program with a given gl context,
// the vertex shader code & the fragment shader code
const prg = new Program(gl, vertexCode, fragmentCode);
```

You can also create the program, then compile it with the code.

```js
import Program from "nanogl/program";

// create a new Program with a given gl context
const prg = new Program(gl);

// compile program with code strings
prg.compile(vertexCode, fragmentCode);
```

## Bind program

You can bind the program with the `use`{language=js} function.

```js
prg.use();
```

## Uniforms
Once compiled, the Program object lists **all used uniforms** and provides a **setter function** for each one.

<UICallout>

**Example :** if we write `uniform vec3 uDirection;`{language=glsl} in our shader, once compiled, we can use `program.uDirection(1, 0, 0);`{language=js}

</UICallout>

A uniform setter function supports :
- providing values as Array or TypedArray arguments (`uniformNfv`{language=glsl})
- providing values as arguments directly (except for matrices) (`uniformNf`{language=glsl})

<UICallout type="important">

**Important :** The program must be bound before using uniform setters.

</UICallout>

```js
prg.use();

// set a mat4 uniform with a Float32Array or array
prg.uModelViewProjection(mvpMatrix);

// set a vec3 with separate arguments
prg.uColor(1.0, 1.0, 1.0);

// set a vec3 with a (Typed)Array
prg.uColor([1.0, 0.0, 1.0]);
```

A setter function returns the uniform location, so it can also be used like getter when invoked with no arguments.

```js
// call the setter without arguments to get the uniform location
// and set the uniform values manually
gl.uniform3f(prg.uColor(), 1.0, 1.0, 1.0);
```

## Samplers

Textures/samplers work like the other uniforms, but the setter function also supports providing a nanogl <router-link to="/guide/quick-guides/texture-2d">Texture2D</router-link> argument.

<UICallout type="important">

**Important :** The program must be bound before using sampler/texture setters.

</UICallout>

```js
prg.use();

// link GL_TEXTURE1 unit to uTexture
prg.uTexture(1);

// or directly provide a Texture instance
// in this case, the texture is bound, and assigned to the predefined unit for this sampler
prg.uTexture(myNanoglTexture);

// as before, you can also get the uniform location
// and set the uniform values manually
gl.uniform1i(prg.uTexture(), 1);
```

## Attributes

Once compiled, the Program object also provides a **getter function** for each attribute, which returns the attribute location.

<UICallout>

**Example :** if we write `attribute vec3 aPosition;`{language=glsl} in our shader, once compiled, we can use `program.aPosition();`{language=js}

</UICallout>

<UICallout type="important">

**Important :** The program must be bound before using call related gl methods.

</UICallout>


```js
prg.use();

// set the attribute data using the attribute location
gl.vertexAttribPointer(prg.aPosition(), 3, gl.FLOAT, ...);
```

</div>

<div class="toc-wrapper">

[[toc]]

</div>