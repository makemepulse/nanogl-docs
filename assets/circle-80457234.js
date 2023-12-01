import{C as x,P as R}from"./index-5809b7fb.js";import{A as b,P as A}from"./arraybuffer-1b6e50fc.js";import{P as B}from"./tweakpane-24b35bd6.js";import{c as C}from"./vec3-a79e08f1.js";import"./common-a066d304.js";class u extends b{constructor(a,r=1,t=32){super(a);const e=new Float32Array(t+2<<2),s=Math.PI*2/t;e[2]=e[3]=.5;for(var i=0;i<=t+1;i++){var c=Math.cos(i*s),o=-Math.sin(i*s),n=i+1<<2;e[n+0]=r*c,e[n+1]=r*o,e[n+2]=c*.5+.5,e[n+3]=o*.5+.5}this.data(e),this.attrib("aPosition",2,a.FLOAT),this.attrib("aTexCoord",2,a.FLOAT)}render(){this.drawTriangleFan()}}const L=m=>{let a=!0;const r=m||document.getElementById("canvas"),t=r.getContext("webgl"),e={width:1,height:1},s=window.devicePixelRatio,i=([p])=>{const f=p.contentRect.width,M=p.contentRect.height;r.width=Math.round(f*s),r.height=Math.round(M*s),e.width=t.drawingBufferWidth,e.height=t.drawingBufferHeight,v()},c=new ResizeObserver(i);c.observe(r);const o=new x(new R);o.lens.setAutoFov(35*(Math.PI/180)),o.lens.near=.01,o.lens.far=50,o.position.set([0,0,5]),o.lookAt(C());const n={radius:.5,segments:32};let d=new u(t,n.radius,n.segments);const w=`
    attribute vec2 aPosition;

    uniform mat4 uMVP;

    void main(void){
      vec4 pos = vec4(aPosition, 0.0, 1.0);
      gl_Position = uMVP * pos;
    }
  `,P=`
    precision lowp float;

    void main(void){
      vec3 color = vec3(0.5, 0.0, 0.5);
      gl_FragColor = vec4(color, 1.0);
    }
  `,h=new A(t,w,P),v=()=>{a&&(t.viewport(0,0,e.width,e.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),o.updateWorldMatrix(),o.updateViewProjectionMatrix(e.width,e.height),h.use(),h.uMVP(o._viewProj),d.attribPointer(h),d.render())},l=new B({container:document.getElementById("debug")}),g=()=>{d.dispose(),d=null,d=new u(t,n.radius,n.segments),v()};return l.addBinding(n,"radius",{min:.1,max:1}).on("change",g),l.addBinding(n,"segments",{min:1,max:50,step:1}).on("change",g),()=>{a=!1,c.disconnect(),l.dispose(),h.dispose()}};export{L as preview};
