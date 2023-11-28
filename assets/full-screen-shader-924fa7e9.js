import{A as c,P as d}from"./arraybuffer-442a5bef.js";import{useWebGL as m}from"./useWebGL-cc0b7991.js";const f=a=>{const{gl:e,size:t,start:i}=m(a),n=new Float32Array([-1,3,0,2,-1,-1,0,0,3,-1,2,0]),o=new c(e,n);o.attrib("aPosition",2,e.FLOAT),o.attrib("aTexCoord",2,e.FLOAT);const v=`
    attribute vec2 aPosition;
    attribute vec2 aTexCoord;

    varying vec2 vUv;

    void main(void){
      gl_Position = vec4(aPosition, 0.0, 1.0);
      vUv = aTexCoord;
    }
  `,s=`
    precision lowp float;

    uniform float uTime;

    varying vec2 vUv;

    void main(void){
      // we'll make the value oscillate between 0 and 1 over time
      float blue = cos(uTime) * 0.5 + 0.5;
      gl_FragColor = vec4(vUv, blue, 1.0);
    }
  `,r=new d(e,v,s);return i(({elapsedTime:l})=>{e.viewport(0,0,t.width,t.height),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),r.use(),r.uTime(l*.001),o.attribPointer(r),o.drawTriangles()},!1)};export{f as preview};
