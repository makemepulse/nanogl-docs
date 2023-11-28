import{C as d,P as l}from"./index-7870482b.js";import{A as v,P}from"./arraybuffer-442a5bef.js";import{useWebGL as m}from"./useWebGL-cc0b7991.js";const f=a=>{const{gl:r,size:o,start:s}=m(a),e=new d(new l);e.lens.setAutoFov(35*(Math.PI/180)),e.lens.near=.01,e.lens.far=50,e.position.set([0,0,5]),e.lookAt([0,0,0]);const n=new Float32Array([1,0,0,0,0,1]),t=new v(r,n);t.attrib("aPosition",2,r.FLOAT);const c=`
    attribute vec2 aPosition;

    uniform mat4 uMVP;

    void main(void){
      vec4 pos = vec4(aPosition, 0.0, 1.0);
      gl_Position = uMVP * pos;
    }
  `,p=`
    precision lowp float;
    void main(void){
      vec3 red = vec3(1.0, 0.0, 0.0);
      gl_FragColor = vec4(red, 1.0);
    }
  `,i=new P(r,c,p);return s(()=>{r.viewport(0,0,o.width,o.height),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),e.updateWorldMatrix(),e.updateViewProjectionMatrix(o.width,o.height),i.use(),i.uMVP(e._viewProj),t.attribPointer(i),t.drawTriangles()},!0)};export{f as preview};
