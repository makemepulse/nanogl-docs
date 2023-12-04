import{C as b,P as A}from"./index-099e42fb.js";import{A as C,P as T}from"./arraybuffer-7f1df196.js";import{P as B}from"./tweakpane-24b35bd6.js";import{c as M}from"./vec3-33249e24.js";import"./common-a066d304.js";const n=new Float32Array(50);n[12]=n[22]=1;n[33]=n[23]=1;n[4]=n[14]=n[24]=n[34]=n[44]=1;class P extends C{constructor(c,a=-1,o=-1,r=2,h=2,s=.1){super(c);var e=n,i=o+h,t=a+r;e[0]=e[30]=e[40]=a,e[1]=e[11]=e[41]=o,e[5]=e[45]=e[35]=a+s,e[6]=e[46]=e[16]=o+s,e[10]=e[20]=t,e[21]=e[31]=i,e[15]=e[25]=t-s,e[26]=e[36]=i-s;var d=s/r,g=s/h;e[7]=e[47]=e[37]=d,e[17]=e[27]=1-d,e[8]=e[48]=e[18]=g,e[38]=e[28]=1-g,this.data(e),this.attrib("aPosition",2,c.FLOAT),this.attrib("aTexCoord",2,c.FLOAT),this.attrib("aSide",1,c.FLOAT)}render(){this.drawTriangleStrip()}}const z=l=>{let c=!0;const a=l||document.getElementById("canvas"),o=a.getContext("webgl"),r={width:1,height:1},h=window.devicePixelRatio,s=([u])=>{const f=u.contentRect.width,R=u.contentRect.height;a.width=Math.round(f*h),a.height=Math.round(R*h),r.width=o.drawingBufferWidth,r.height=o.drawingBufferHeight,w()},e=new ResizeObserver(s);e.observe(a);const i=new b(new A);i.lens.setAutoFov(35*(Math.PI/180)),i.lens.near=.01,i.lens.far=50,i.position.set([0,0,5]),i.lookAt(M());const t={position:{x:-.5,y:-.5},width:1,height:1,thickness:.1};let d=new P(o,t.position.x,t.position.y,t.width,t.height,t.thickness);const g=`
    attribute vec2 aPosition;
    attribute vec2 aTexCoord;

    uniform mat4 uMVP;

    varying vec2 vTexCoord;

    void main(void){
      vec4 pos = vec4(aPosition, 0.0, 1.0);
      gl_Position = uMVP * pos;
      vTexCoord = aTexCoord;
    }
  `,x=`
    precision lowp float;

    varying vec2 vTexCoord;

    void main(void){
      vec3 color = vec3(1., 1., 0.);
      gl_FragColor = vec4(color, 1.0);
    }
  `,p=new T(o,g,x),w=()=>{c&&(o.viewport(0,0,r.width,r.height),o.clearColor(0,0,0,0),o.clear(o.COLOR_BUFFER_BIT),i.updateWorldMatrix(),i.updateViewProjectionMatrix(r.width,r.height),p.use(),p.uMVP(i._viewProj),d.attribPointer(p),d.render())},v=new B({container:document.getElementById("debug")}),m=()=>{d.dispose(),d=null,d=new P(o,t.position.x,t.position.y,t.width,t.height,t.thickness),w()};return v.addBinding(t,"position",{min:-1.5,max:.5}).on("change",m),v.addBinding(t,"width",{min:.1,max:2}).on("change",m),v.addBinding(t,"height",{min:.1,max:2}).on("change",m),v.addBinding(t,"thickness",{min:0,max:1}).on("change",m),()=>{c=!1,e.disconnect(),v.dispose(),p.dispose()}};export{z as preview};
