import{C as b,P as S}from"./index-099e42fb.js";import{A,P as B}from"./arraybuffer-7f1df196.js";import{P as R}from"./tweakpane-24b35bd6.js";import{c as x}from"./vec3-33249e24.js";import"./common-a066d304.js";class f extends A{constructor(c,a=1,n=32,s=.1){super(c);const t=new Float32Array((n+1)*10),h=a-s,l=h/a*.5,o=Math.PI*2/n;for(var e=0;e<=n+1;e++){var r=Math.cos(e*o),d=-Math.sin(e*o),i=e*10;t[i+0]=a*r,t[i+1]=a*d,t[i+2]=r*.5+.5,t[i+3]=d*.5+.5,t[i+5]=h*r,t[i+6]=h*d,t[i+7]=r*l+.5,t[i+8]=d*l+.5,t[i+4]=1,t[i+9]=0}this.data(t),this.attrib("aPosition",2,c.FLOAT),this.attrib("aTexCoord",2,c.FLOAT),this.attrib("aSide",1,c.FLOAT)}render(){this.drawTriangleStrip()}}const L=p=>{let c=!0;const a=p||document.getElementById("canvas"),n=a.getContext("webgl"),s={width:1,height:1},t=window.devicePixelRatio,h=([w])=>{const P=w.contentRect.width,M=w.contentRect.height;a.width=Math.round(P*t),a.height=Math.round(M*t),s.width=n.drawingBufferWidth,s.height=n.drawingBufferHeight,u()},l=new ResizeObserver(h);l.observe(a);const o=new b(new S);o.lens.setAutoFov(35*(Math.PI/180)),o.lens.near=.01,o.lens.far=50,o.position.set([0,0,5]),o.lookAt(x());const e={radius:.5,segments:32,thickness:.2};let r=new f(n,e.radius,e.segments,e.thickness);const d=`
    attribute vec2 aPosition;
    attribute float aSide;

    uniform mat4 uMVP;

    varying float vSide;

    void main(void){
      vec4 pos = vec4(aPosition, 0.0, 1.0);
      gl_Position = uMVP * pos;
      vSide = aSide;
    }
  `,i=`
    precision lowp float;

    varying float vSide;

    void main(void){
      vec3 color = vec3(0.0, vSide, 0.0);
      gl_FragColor = vec4(color, 1.0);
    }
  `,v=new B(n,d,i),u=()=>{c&&(n.viewport(0,0,s.width,s.height),n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT),o.updateWorldMatrix(),o.updateViewProjectionMatrix(s.width,s.height),v.use(),v.uMVP(o._viewProj),r.attribPointer(v),r.render())},m=new R({container:document.getElementById("debug")}),g=()=>{r.dispose(),r=null,r=new f(n,e.radius,e.segments,e.thickness),u()};return m.addBinding(e,"radius",{min:.1,max:1}).on("change",g),m.addBinding(e,"segments",{min:1,max:50,step:1}).on("change",g),m.addBinding(e,"thickness",{min:0,max:1}).on("change",g),()=>{c=!1,l.disconnect(),m.dispose(),v.dispose()}};export{L as preview};
