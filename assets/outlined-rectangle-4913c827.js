import{A as P,C as m,P as f,a as x}from"./arraybuffer-aead3aa0.js";import{c as C}from"./vec3-e4726a20.js";import"./common-a066d304.js";const r=new Float32Array(50);r[12]=r[22]=1;r[33]=r[23]=1;r[4]=r[14]=r[24]=r[34]=r[44]=1;class T extends P{constructor(i,t=-1,o=-1,s=2,d=2,a=.1){super(i);var e=r,c=o+d,v=t+s;e[0]=e[30]=e[40]=t,e[1]=e[11]=e[41]=o,e[5]=e[45]=e[35]=t+a,e[6]=e[46]=e[16]=o+a,e[10]=e[20]=v,e[21]=e[31]=c,e[15]=e[25]=v-a,e[26]=e[36]=c-a;var h=a/s,n=a/d;e[7]=e[47]=e[37]=h,e[17]=e[27]=1-h,e[8]=e[48]=e[18]=n,e[38]=e[28]=1-n,this.data(e),this.attrib("aPosition",2,i.FLOAT),this.attrib("aTexCoord",2,i.FLOAT),this.attrib("aSide",1,i.FLOAT)}render(){this.drawTriangleStrip()}}const F=l=>{const i=l||document.getElementById("canvas"),t=i.getContext("webgl"),o={width:1,height:1},s=window.devicePixelRatio,d=([w])=>{const g=w.contentRect.width,p=w.contentRect.height;i.width=Math.round(g*s),i.height=Math.round(p*s),o.width=t.drawingBufferWidth,o.height=t.drawingBufferHeight,u()},a=new ResizeObserver(d);a.observe(i);const e=new m(new f);e.lens.setAutoFov(35*(Math.PI/180)),e.lens.near=.01,e.lens.far=50,e.position.set([0,0,5]),e.lookAt(C());const c=new T(t,-.5,-.5,1,1),v=`
    attribute vec2 aPosition;
    attribute vec2 aTexCoord;

    uniform mat4 uMVP;

    varying vec2 vTexCoord;

    void main(void){
      vec4 pos = vec4(aPosition, 0.0, 1.0);
      gl_Position = uMVP * pos;
      vTexCoord = aTexCoord;
    }
  `,h=`
    precision lowp float;
    
    varying vec2 vTexCoord;

    void main(void){
      vec3 color = vec3(1., 1., 0.);
      gl_FragColor = vec4(color, 1.0);
    }
  `,n=new x(t,v,h),u=()=>{t.viewport(0,0,o.width,o.height),t.clearColor(.5,.5,.5,1),t.clear(t.COLOR_BUFFER_BIT),e.updateWorldMatrix(),e.updateViewProjectionMatrix(o.width,o.height),n.use(),n.uMVP(e._viewProj),c.attribPointer(n),c.render()};return()=>{a.disconnect()}};export{F as preview};
