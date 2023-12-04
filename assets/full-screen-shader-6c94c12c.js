import{A as b,P as p}from"./arraybuffer-7f1df196.js";const x=l=>{let r=!0;const t=l||document.getElementById("canvas"),e=t.getContext("webgl"),o={width:1,height:1},s=window.devicePixelRatio,h=([a])=>{const m=a.contentRect.width,f=a.contentRect.height;t.width=Math.round(m*s),t.height=Math.round(f*s),o.width=e.drawingBufferWidth,o.height=e.drawingBufferHeight},c=new ResizeObserver(h);c.observe(t);const u=new Float32Array([-1,3,0,2,-1,-1,0,0,3,-1,2,0]),i=new b(e,u);i.attrib("aPosition",2,e.FLOAT),i.attrib("aTexCoord",2,e.FLOAT);const w=`
    attribute vec2 aPosition;
    attribute vec2 aTexCoord;

    varying vec2 vUv;

    void main(void){
      gl_Position = vec4(aPosition, 0.0, 1.0);
      vUv = aTexCoord;
    }
  `,g=`
    precision lowp float;

    uniform float uTime;

    varying vec2 vUv;

    void main(void){
      // oscillate between 0 and 1 over time
      float blue = cos(uTime) * 0.5 + 0.5;
      gl_FragColor = vec4(vUv, blue, 1.0);
    }
  `,n=new p(e,w,g);let d=null;const v=(a=0)=>{r&&(e.viewport(0,0,o.width,o.height),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),n.use(),n.uTime(a*.001),i.attribPointer(n),i.drawTriangles(),d=window.requestAnimationFrame(v))};return setTimeout(v,0),()=>{r=!1,window.cancelAnimationFrame(d),c.disconnect(),n.dispose()}};export{x as preview};
