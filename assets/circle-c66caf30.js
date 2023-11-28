import{A as M,P as x}from"./arraybuffer-442a5bef.js";import{C as b,P as A}from"./index-7870482b.js";import{P as B}from"./tweakpane-24b35bd6.js";import{c as R}from"./vec3-e4726a20.js";import"./common-a066d304.js";class p extends M{constructor(a,e=1,o=32){super(a);const n=new Float32Array(o+2<<2),c=Math.PI*2/o;n[2]=n[3]=.5;for(var s=0;s<=o+1;s++){var t=Math.cos(s*c),i=-Math.sin(s*c),r=s+1<<2;n[r+0]=e*t,n[r+1]=e*i,n[r+2]=t*.5+.5,n[r+3]=i*.5+.5}this.data(n),this.attrib("aPosition",2,a.FLOAT),this.attrib("aTexCoord",2,a.FLOAT)}render(){this.drawTriangleFan()}}const z=m=>{const a=m||document.getElementById("canvas"),e=a.getContext("webgl"),o={width:1,height:1},n=window.devicePixelRatio,c=([g])=>{const P=g.contentRect.width,f=g.contentRect.height;a.width=Math.round(P*n),a.height=Math.round(f*n),o.width=e.drawingBufferWidth,o.height=e.drawingBufferHeight,l()},s=new ResizeObserver(c);s.observe(a);const t=new b(new A);t.lens.setAutoFov(35*(Math.PI/180)),t.lens.near=.01,t.lens.far=50,t.position.set([0,0,5]),t.lookAt(R());const i={radius:.5,segments:32};let r=new p(e,i.radius,i.segments);const w=`
    attribute vec2 aPosition;

    uniform mat4 uMVP;

    void main(void){
      vec4 pos = vec4(aPosition, 0.0, 1.0);
      gl_Position = uMVP * pos;
    }
  `,u=`
    precision lowp float;

    void main(void){
      vec3 color = vec3(0.5, 0.0, 0.5);
      gl_FragColor = vec4(color, 1.0);
    }
  `,d=new x(e,w,u),l=()=>{e.viewport(0,0,o.width,o.height),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),t.updateWorldMatrix(),t.updateViewProjectionMatrix(o.width,o.height),d.use(),d.uMVP(t._viewProj),r.attribPointer(d),r.render()},h=new B({container:document.getElementById("debug")}),v=()=>{r.dispose(),r=null,r=new p(e,i.radius,i.segments),l()};return h.addBinding(i,"radius",{min:.1,max:1}).on("change",v),h.addBinding(i,"segments",{min:1,max:50,step:1}).on("change",v),()=>{s.disconnect(),h.dispose()}};export{z as preview};
