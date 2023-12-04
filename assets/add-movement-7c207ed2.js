import{C as w,P as h,N as u}from"./index-099e42fb.js";import{A as M,P as f}from"./arraybuffer-7f1df196.js";import{useWebGL as g}from"./useWebGL-cc0b7991.js";import{c as x}from"./mat4-2d297a36.js";import"./common-a066d304.js";const L=d=>{const{gl:t,size:r,start:p}=g(d),e=new w(new h);e.lens.setAutoFov(35*(Math.PI/180)),e.lens.near=.01,e.lens.far=50,e.position.set([0,0,5]),e.lookAt([0,0,0]);const l=new Float32Array([1,0,0,0,0,1]),a=new M(t,l);a.attrib("aPosition",2,t.FLOAT);const m=`
    attribute vec2 aPosition;

    uniform mat4 uMVP;

    void main(void){
      vec4 pos = vec4(aPosition, 0.0, 1.0);
      gl_Position = uMVP * pos;
    }
  `,v=`
    precision lowp float;
    void main(void){
      vec3 red = vec3(1.0, 0.0, 0.0);
      gl_FragColor = vec4(red, 1.0);
    }
  `,i=new f(t,m,v),o=new u,n=x(),P=s=>{const c=s*.001;o.position[1]=Math.cos(c),o.setScale(Math.sin(c)*.5+1.5),o.rotateZ(.5*(Math.PI/180)),o.invalidate(),o.updateWorldMatrix()};return p(({elapsedTime:s})=>{P(s),t.viewport(0,0,r.width,r.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),e.updateWorldMatrix(),e.updateViewProjectionMatrix(r.width,r.height),e.modelViewProjectionMatrix(n,o._wmatrix),i.use(),i.uMVP(n),a.attribPointer(i),a.drawTriangles()},!1)};export{L as preview};
