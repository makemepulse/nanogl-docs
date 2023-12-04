import{C as P,P as f}from"./index-099e42fb.js";import{A as R,P as M}from"./arraybuffer-7f1df196.js";import{c as b}from"./vec3-33249e24.js";import"./common-a066d304.js";const O=h=>{let s=!0;const i=h||document.getElementById("canvas"),e=i.getContext("webgl"),o={width:1,height:1},a=window.devicePixelRatio,v=([d])=>{const u=d.contentRect.width,m=d.contentRect.height;i.width=Math.round(u*a),i.height=Math.round(m*a),o.width=e.drawingBufferWidth,o.height=e.drawingBufferHeight,g()},c=new ResizeObserver(v);c.observe(i);const t=new P(new f);t.lens.setAutoFov(35*(Math.PI/180)),t.lens.near=.01,t.lens.far=50,t.position.set([0,0,5]),t.lookAt(b());const l=new Float32Array([1,0,0,0,0,1]),n=new R(e,l);n.attrib("aPosition",2,e.FLOAT);const w=`
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
  `,r=new M(e,w,p),g=()=>{s&&(e.viewport(0,0,o.width,o.height),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),t.updateWorldMatrix(),t.updateViewProjectionMatrix(o.width,o.height),r.use(),r.uMVP(t._viewProj),n.attribPointer(r),n.drawTriangles())};return()=>{s=!1,c.disconnect(),r.dispose()}};export{O as preview};
