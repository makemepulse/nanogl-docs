import{A as f,P as C}from"./arraybuffer-442a5bef.js";import{C as R,P as T}from"./index-7870482b.js";import{P as A}from"./tweakpane-24b35bd6.js";import{c as b}from"./vec3-e4726a20.js";import"./common-a066d304.js";const B=new Float32Array([-1,-1,0,0,-1,1,0,1,1,-1,1,0,1,1,1,1]);class m extends f{constructor(n,e=-1,i=-1,s=2,d=2){super(n);const t=B;t[0]=t[4]=e,t[1]=t[9]=i,t[8]=t[12]=e+s,t[5]=t[13]=i+d,this.data(t),this.attrib("aPosition",2,n.FLOAT),this.attrib("aTexCoord",2,n.FLOAT)}render(){this.drawTriangleStrip()}}const I=v=>{const n=v||document.getElementById("canvas"),e=n.getContext("webgl"),i={width:1,height:1},s=window.devicePixelRatio,d=([w])=>{const x=w.contentRect.width,P=w.contentRect.height;n.width=Math.round(x*s),n.height=Math.round(P*s),i.width=e.drawingBufferWidth,i.height=e.drawingBufferHeight,p()},t=new ResizeObserver(d);t.observe(n);const r=new R(new T);r.lens.setAutoFov(35*(Math.PI/180)),r.lens.near=.01,r.lens.far=50,r.position.set([0,0,5]),r.lookAt(b());const o={position:{x:-.5,y:-.5},width:1,height:1};let a=new m(e,o.position.x,o.position.y,o.width,o.height);const l=`
    attribute vec2 aPosition;
    attribute vec2 aTexCoord;

    uniform mat4 uMVP;

    varying vec2 vTexCoord;

    void main(void){
      vec4 pos = vec4(aPosition, 0.0, 1.0);
      gl_Position = uMVP * pos;
      vTexCoord = aTexCoord;
    }
  `,u=`
    precision lowp float;

    varying vec2 vTexCoord;

    void main(void){
      vec3 color = vec3(vTexCoord, 0.0);
      gl_FragColor = vec4(color, 1.0);
    }
  `,h=new C(e,l,u),p=()=>{e.viewport(0,0,i.width,i.height),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),r.updateWorldMatrix(),r.updateViewProjectionMatrix(i.width,i.height),h.use(),h.uMVP(r._viewProj),a.attribPointer(h),a.render()},c=new A({container:document.getElementById("debug")}),g=()=>{a.dispose(),a=null,a=new m(e,o.position.x,o.position.y,o.width,o.height),p()};return c.addBinding(o,"position",{min:-1.5,max:.5}).on("change",g),c.addBinding(o,"width",{min:.1,max:2}).on("change",g),c.addBinding(o,"height",{min:.1,max:2}).on("change",g),()=>{t.disconnect(),c.dispose()}};export{I as preview};
