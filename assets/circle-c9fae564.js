import{A as u,C as P,P as m,a as f}from"./arraybuffer-aead3aa0.js";import{c as M}from"./vec3-e4726a20.js";import"./common-a066d304.js";class b extends u{constructor(a,e=1,o=32){super(a);const r=new Float32Array(o+2<<2),c=Math.PI*2/o;r[2]=r[3]=.5;for(var i=0;i<=o+1;i++){var t=Math.cos(i*c),s=-Math.sin(i*c),n=i+1<<2;r[n+0]=e*t,r[n+1]=e*s,r[n+2]=t*.5+.5,r[n+3]=s*.5+.5}this.data(r),this.attrib("aPosition",2,a.FLOAT),this.attrib("aTexCoord",2,a.FLOAT)}render(){this.drawTriangleFan()}}const A=h=>{const a=h||document.getElementById("canvas"),e=a.getContext("webgl"),o={width:1,height:1},r=window.devicePixelRatio,c=([v])=>{const p=v.contentRect.width,g=v.contentRect.height;a.width=Math.round(p*r),a.height=Math.round(g*r),o.width=e.drawingBufferWidth,o.height=e.drawingBufferHeight,w()},i=new ResizeObserver(c);i.observe(a);const t=new P(new m);t.lens.setAutoFov(35*(Math.PI/180)),t.lens.near=.01,t.lens.far=50,t.position.set([0,0,5]),t.lookAt(M());const s=new b(e,.5),n=`
    attribute vec2 aPosition;

    uniform mat4 uMVP;

    void main(void){
      vec4 pos = vec4(aPosition, 0.0, 1.0);
      gl_Position = uMVP * pos;
    }
  `,l=`
    precision lowp float;

    void main(void){
      vec3 color = vec3(0.5, 0.0, 0.5);
      gl_FragColor = vec4(color, 1.0);
    }
  `,d=new f(e,n,l),w=()=>{e.viewport(0,0,o.width,o.height),e.clearColor(.5,.5,.5,1),e.clear(e.COLOR_BUFFER_BIT),t.updateWorldMatrix(),t.updateViewProjectionMatrix(o.width,o.height),d.use(),d.uMVP(t._viewProj),s.attribPointer(d),s.render()};return()=>{i.disconnect()}};export{A as preview};
