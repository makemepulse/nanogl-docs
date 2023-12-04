import{A as C,P as R}from"./arraybuffer-7f1df196.js";import{C as T,P as A}from"./index-099e42fb.js";import{P as b}from"./tweakpane-24b35bd6.js";import{c as B}from"./vec3-33249e24.js";import"./common-a066d304.js";const M=new Float32Array([-1,-1,0,0,-1,1,0,1,1,-1,1,0,1,1,1,1]);class m extends C{constructor(a,r=-1,e=-1,i=2,c=2){super(a);const t=M;t[0]=t[4]=r,t[1]=t[9]=e,t[8]=t[12]=r+i,t[5]=t[13]=e+c,this.data(t),this.attrib("aPosition",2,a.FLOAT),this.attrib("aTexCoord",2,a.FLOAT)}render(){this.drawTriangleStrip()}}const L=v=>{let a=!0;const r=v||document.getElementById("canvas"),e=r.getContext("webgl"),i={width:1,height:1},c=window.devicePixelRatio,t=([l])=>{const P=l.contentRect.width,f=l.contentRect.height;r.width=Math.round(P*c),r.height=Math.round(f*c),i.width=e.drawingBufferWidth,i.height=e.drawingBufferHeight,w()},p=new ResizeObserver(t);p.observe(r);const n=new T(new A);n.lens.setAutoFov(35*(Math.PI/180)),n.lens.near=.01,n.lens.far=50,n.position.set([0,0,5]),n.lookAt(B());const o={position:{x:-.5,y:-.5},width:1,height:1};let s=new m(e,o.position.x,o.position.y,o.width,o.height);const u=`
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
      vec3 color = vec3(vTexCoord, 0.0);
      gl_FragColor = vec4(color, 1.0);
    }
  `,d=new R(e,u,x),w=()=>{a&&(e.viewport(0,0,i.width,i.height),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),n.updateWorldMatrix(),n.updateViewProjectionMatrix(i.width,i.height),d.use(),d.uMVP(n._viewProj),s.attribPointer(d),s.render())},h=new b({container:document.getElementById("debug")}),g=()=>{s.dispose(),s=null,s=new m(e,o.position.x,o.position.y,o.width,o.height),w()};return h.addBinding(o,"position",{min:-1.5,max:.5}).on("change",g),h.addBinding(o,"width",{min:.1,max:2}).on("change",g),h.addBinding(o,"height",{min:.1,max:2}).on("change",g),()=>{a=!1,p.disconnect(),h.dispose(),d.dispose()}};export{L as preview};
