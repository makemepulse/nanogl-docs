import{C as m,P,A as f,a as M}from"./arraybuffer-aead3aa0.js";import{c as R}from"./vec3-e4726a20.js";import"./common-a066d304.js";const C=d=>{const i=d||document.getElementById("canvas"),e=i.getContext("webgl"),o={width:1,height:1},s=window.devicePixelRatio,h=([c])=>{const p=c.contentRect.width,u=c.contentRect.height;i.width=Math.round(p*s),i.height=Math.round(u*s),o.width=e.drawingBufferWidth,o.height=e.drawingBufferHeight,l()},a=new ResizeObserver(h);a.observe(i);const t=new m(new P);t.lens.setAutoFov(35*(Math.PI/180)),t.lens.near=.01,t.lens.far=50,t.position.set([0,0,5]),t.lookAt(R());const v=new Float32Array([1,0,0,0,0,1]),r=new f(e,v);r.attrib("aPosition",2,e.FLOAT);const w=`
    attribute vec2 aPosition;

    uniform mat4 uMVP;

    void main(void){
      vec4 pos = vec4(aPosition, 0.0, 1.0);
      gl_Position = uMVP * pos;
    }
  `,g=`
    precision lowp float;
    void main(void){
      vec3 red = vec3(1.0, 0.0, 0.0);
      gl_FragColor = vec4(red, 1.0);
    }
  `,n=new M(e,w,g),l=()=>{e.viewport(0,0,o.width,o.height),e.clearColor(.5,.5,.5,1),e.clear(e.COLOR_BUFFER_BIT),t.updateWorldMatrix(),t.updateViewProjectionMatrix(o.width,o.height),n.use(),n.uMVP(t._viewProj),r.attribPointer(n),r.drawTriangles()};return()=>{a.disconnect()}};export{C as preview};
