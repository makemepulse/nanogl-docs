import{A as M,C as b,P as S,a as A}from"./arraybuffer-aead3aa0.js";import{P as B}from"./tweakpane-24b35bd6.js";import{c as x}from"./vec3-e4726a20.js";import"./common-a066d304.js";class w extends M{constructor(s,e=1,r=32,v=.1){super(s);const n=new Float32Array((r+1)*10),c=e-v,o=c/e*.5,i=Math.PI*2/r;for(var a=0;a<=r+1;a++){var d=Math.cos(a*i),h=-Math.sin(a*i),t=a*10;n[t+0]=e*d,n[t+1]=e*h,n[t+2]=d*.5+.5,n[t+3]=h*.5+.5,n[t+5]=c*d,n[t+6]=c*h,n[t+7]=d*o+.5,n[t+8]=h*o+.5,n[t+4]=1,n[t+9]=0}this.data(n),this.attrib("aPosition",2,s.FLOAT),this.attrib("aTexCoord",2,s.FLOAT),this.attrib("aSide",1,s.FLOAT)}render(){this.drawTriangleStrip()}}const k=m=>{const s=m||document.getElementById("canvas"),e=s.getContext("webgl"),r={width:1,height:1},v=window.devicePixelRatio,n=([u])=>{const P=u.contentRect.width,f=u.contentRect.height;s.width=Math.round(P*v),s.height=Math.round(f*v),r.width=e.drawingBufferWidth,r.height=e.drawingBufferHeight,p()},c=new ResizeObserver(n);c.observe(s);const o=new b(new S);o.lens.setAutoFov(35*(Math.PI/180)),o.lens.near=.01,o.lens.far=50,o.position.set([0,0,5]),o.lookAt(x());const i={radius:.5,segments:32,thickness:.2};let a=new w(e,i.radius,i.segments,i.thickness);const d=`
    attribute vec2 aPosition;
    attribute float aSide;

    uniform mat4 uMVP;

    varying float vSide;

    void main(void){
      vec4 pos = vec4(aPosition, 0.0, 1.0);
      gl_Position = uMVP * pos;
      vSide = aSide;
    }
  `,h=`
    precision lowp float;

    varying float vSide;

    void main(void){
      vec3 color = vec3(0.0, vSide, 0.0);
      gl_FragColor = vec4(color, 1.0);
    }
  `,t=new A(e,d,h),p=()=>{e.viewport(0,0,r.width,r.height),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),o.updateWorldMatrix(),o.updateViewProjectionMatrix(r.width,r.height),t.use(),t.uMVP(o._viewProj),a.attribPointer(t),a.render()},l=new B({container:document.getElementById("debug")}),g=()=>{a.dispose(),a=null,a=new w(e,i.radius,i.segments,i.thickness),p()};return l.addBinding(i,"radius",{min:.1,max:1}).on("change",g),l.addBinding(i,"segments",{min:1,max:50,step:1}).on("change",g),l.addBinding(i,"thickness",{min:0,max:1}).on("change",g),()=>{c.disconnect(),l.dispose()}};export{k as preview};
