import{C as l,P as p,A as v,a as P}from"./arraybuffer-aead3aa0.js";import{useWebGL as u}from"./useWebGL-cc0b7991.js";const g=i=>{const{gl:r,size:t,start:s}=u(i),e=new l(new p);e.lens.setAutoFov(35*(Math.PI/180)),e.lens.near=.01,e.lens.far=50,e.position.set([0,0,5]),e.lookAt([0,0,0]);const n=new Float32Array([1,0,0,0,0,1]),o=new v(r,n);o.attrib("aPosition",2,r.FLOAT);const c=`
    attribute vec2 aPosition;

    uniform mat4 uMVP;

    void main(void){
      vec4 pos = vec4(aPosition, 0.0, 1.0);
      gl_Position = uMVP * pos;
    }
  `,d=`
    precision lowp float;
    void main(void){
      vec3 red = vec3(1.0, 0.0, 0.0);
      gl_FragColor = vec4(red, 1.0);
    }
  `,a=new P(r,c,d);return s(()=>{r.viewport(0,0,t.width,t.height),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),e.updateWorldMatrix(),e.updateViewProjectionMatrix(t.width,t.height),a.use(),a.uMVP(e._viewProj),o.attribPointer(a),o.drawTriangles()},!0)};export{g as preview};
