import{A as b,P as A}from"./arraybuffer-442a5bef.js";import{C,P as R}from"./index-7870482b.js";import{P as T}from"./tweakpane-24b35bd6.js";import{c as B}from"./vec3-e4726a20.js";import"./common-a066d304.js";const n=new Float32Array(50);n[12]=n[22]=1;n[33]=n[23]=1;n[4]=n[14]=n[24]=n[34]=n[44]=1;class P extends b{constructor(r,o=-1,i=-1,d=2,h=2,a=.1){super(r);var e=n,t=i+h,s=o+d;e[0]=e[30]=e[40]=o,e[1]=e[11]=e[41]=i,e[5]=e[45]=e[35]=o+a,e[6]=e[46]=e[16]=i+a,e[10]=e[20]=s,e[21]=e[31]=t,e[15]=e[25]=s-a,e[26]=e[36]=t-a;var v=a/d,g=a/h;e[7]=e[47]=e[37]=v,e[17]=e[27]=1-v,e[8]=e[48]=e[18]=g,e[38]=e[28]=1-g,this.data(e),this.attrib("aPosition",2,r.FLOAT),this.attrib("aTexCoord",2,r.FLOAT),this.attrib("aSide",1,r.FLOAT)}render(){this.drawTriangleStrip()}}const S=w=>{const r=w||document.getElementById("canvas"),o=r.getContext("webgl"),i={width:1,height:1},d=window.devicePixelRatio,h=([u])=>{const x=u.contentRect.width,f=u.contentRect.height;r.width=Math.round(x*d),r.height=Math.round(f*d),i.width=o.drawingBufferWidth,i.height=o.drawingBufferHeight,l()},a=new ResizeObserver(h);a.observe(r);const e=new C(new R);e.lens.setAutoFov(35*(Math.PI/180)),e.lens.near=.01,e.lens.far=50,e.position.set([0,0,5]),e.lookAt(B());const t={position:{x:-.5,y:-.5},width:1,height:1,thickness:.1};let s=new P(o,t.position.x,t.position.y,t.width,t.height,t.thickness);const v=`
    attribute vec2 aPosition;
    attribute vec2 aTexCoord;

    uniform mat4 uMVP;

    varying vec2 vTexCoord;

    void main(void){
      vec4 pos = vec4(aPosition, 0.0, 1.0);
      gl_Position = uMVP * pos;
      vTexCoord = aTexCoord;
    }
  `,g=`
    precision lowp float;

    varying vec2 vTexCoord;

    void main(void){
      vec3 color = vec3(1., 1., 0.);
      gl_FragColor = vec4(color, 1.0);
    }
  `,m=new A(o,v,g),l=()=>{o.viewport(0,0,i.width,i.height),o.clearColor(0,0,0,0),o.clear(o.COLOR_BUFFER_BIT),e.updateWorldMatrix(),e.updateViewProjectionMatrix(i.width,i.height),m.use(),m.uMVP(e._viewProj),s.attribPointer(m),s.render()},c=new T({container:document.getElementById("debug")}),p=()=>{s.dispose(),s=null,s=new P(o,t.position.x,t.position.y,t.width,t.height,t.thickness),l()};return c.addBinding(t,"position",{min:-1.5,max:.5}).on("change",p),c.addBinding(t,"width",{min:.1,max:2}).on("change",p),c.addBinding(t,"height",{min:.1,max:2}).on("change",p),c.addBinding(t,"thickness",{min:0,max:1}).on("change",p),()=>{a.disconnect(),c.dispose()}};export{S as preview};
