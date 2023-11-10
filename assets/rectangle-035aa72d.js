import{A as u,C as P,P as m,a as x}from"./arraybuffer-aead3aa0.js";import{c as C}from"./vec3-e4726a20.js";import"./common-a066d304.js";const f=new Float32Array([-1,-1,0,0,-1,1,0,1,1,-1,1,0,1,1,1,1]);class T extends u{constructor(r,t=-1,o=-1,n=2,a=2){super(r);const e=f;e[0]=e[4]=t,e[1]=e[9]=o,e[8]=e[12]=t+n,e[5]=e[13]=o+a,this.data(e),this.attrib("aPosition",2,r.FLOAT),this.attrib("aTexCoord",2,r.FLOAT)}render(){this.drawTriangleStrip()}}const F=c=>{const r=c||document.getElementById("canvas"),t=r.getContext("webgl"),o={width:1,height:1},n=window.devicePixelRatio,a=([v])=>{const g=v.contentRect.width,p=v.contentRect.height;r.width=Math.round(g*n),r.height=Math.round(p*n),o.width=t.drawingBufferWidth,o.height=t.drawingBufferHeight,l()},e=new ResizeObserver(a);e.observe(r);const i=new P(new m);i.lens.setAutoFov(35*(Math.PI/180)),i.lens.near=.01,i.lens.far=50,i.position.set([0,0,5]),i.lookAt(C());const d=new T(t,-.5,-.5,1,1),h=`
    attribute vec2 aPosition;
    attribute vec2 aTexCoord;

    uniform mat4 uMVP;

    varying vec2 vTexCoord;

    void main(void){
      vec4 pos = vec4(aPosition, 0.0, 1.0);
      gl_Position = uMVP * pos;
      vTexCoord = aTexCoord;
    }
  `,w=`
    precision lowp float;
    
    varying vec2 vTexCoord;

    void main(void){
      vec3 color = vec3(vTexCoord, 0.0);
      gl_FragColor = vec4(color, 1.0);
    }
  `,s=new x(t,h,w),l=()=>{t.viewport(0,0,o.width,o.height),t.clearColor(.5,.5,.5,1),t.clear(t.COLOR_BUFFER_BIT),i.updateWorldMatrix(),i.updateViewProjectionMatrix(o.width,o.height),s.use(),s.uMVP(i._viewProj),d.attribPointer(s),d.render()};return()=>{e.disconnect()}};export{F as preview};
