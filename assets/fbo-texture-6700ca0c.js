import{F as D}from"./fbo-645f2652.js";import{C,P as F}from"./index-099e42fb.js";import{A as L,P}from"./arraybuffer-7f1df196.js";import{G as k,a as H,I as j}from"./indexbuffer-5b89fc58.js";import{P as W}from"./tweakpane-24b35bd6.js";import{cubePosUvs as N,cubeIndices as X}from"./cubeGeometry-a8671df7.js";import{c as Y}from"./vec3-33249e24.js";import"./texture-2d-53b1df66.js";import"./common-a066d304.js";const ae=B=>{let h=!0;const d=B||document.getElementById("canvas"),e=d.getContext("webgl"),i={width:1,height:1},w=window.devicePixelRatio,R=([o])=>{const G=o.contentRect.width,z=o.contentRect.height;d.width=Math.round(G*w),d.height=Math.round(z*w),i.width=e.drawingBufferWidth,i.height=e.drawingBufferHeight},x=new ResizeObserver(R);x.observe(d);const l=k.get(e),M=new H().enableDepthTest().enableCullface().cullFace(e.BACK);l.push(M);const v={width:512,height:512},a={wrap:"repeat",uvFactorX:1,uvFactorY:1},n=new D(e);n.attachColor();const f=n.getColorTexture();f.bind(),f.setFormat(e.RGBA),f.repeat(),n.resize(v.width,v.height);const u=Y(),t=new C(new F);t.lens.setAutoFov(35*(Math.PI/180)),t.lens.near=.01,t.lens.far=50,t.position.set([0,0,10]),t.lookAt(u);const r=new C(new F);r.lens.setAutoFov(35*(Math.PI/180)),r.lens.near=.01,r.lens.far=50,r.position.set([0,4,10]),r.lookAt(u);const p=new L(e,new Float32Array(N)),s=new j(e,e.UNSIGNED_SHORT,new Uint16Array(X));p.attrib("aPosition",3,e.FLOAT),p.attrib("aTexCoord",2,e.FLOAT);const A=`
    attribute vec3 aPosition;
    attribute vec2 aTexCoord;

    uniform mat4 uMVP;

    varying vec2 vTexCoord;

    void main(void){
      vec4 pos = vec4(aPosition, 1.0);
      gl_Position = uMVP * pos;
      vTexCoord = aTexCoord;
    }
  `,I=`
    precision lowp float;

    varying vec2 vTexCoord;

    void main(void){
      float gradient = vTexCoord.x * 0.5 + vTexCoord.y * 0.5;
      vec3 color = vec3(0.65, 0.38, 0.80);
      vec3 gradientColor = clamp(color - vec3(gradient * 0.3), vec3(0.), vec3(1.));
      gl_FragColor = vec4(gradientColor, 1.0);
    }
  `,m=new P(e,A,I),_=`
    attribute vec3 aPosition;
    attribute vec2 aTexCoord;

    uniform mat4 uMVP;

    varying vec2 vTexCoord;

    void main(void){
      vec4 pos = vec4(aPosition, 1.0);
      gl_Position = uMVP * pos;
      vTexCoord = aTexCoord;
    }
  `,V=`
    precision highp float;

    uniform sampler2D tTex;
    uniform vec2 uUVFactor;

    varying vec2 vTexCoord;

    void main(void){
      vec2 uvGradient = vTexCoord * 0.3;
      vec4 background = vec4(0.7 + uvGradient.x, 0.7 + uvGradient.y, 1., 1.0);
      vec4 foreground = texture2D(tTex, vTexCoord * uUVFactor);
      gl_FragColor = mix(background, foreground, foreground.a);
    }
  `,c=new P(e,_,V),y=o=>{t.x=Math.sin(o*-8e-4)*10,t.y=Math.cos(o*-8e-4)*10,t.lookAt(u),t.invalidate()},E=o=>{r.x=Math.sin(o*5e-4)*10,r.z=Math.cos(o*5e-4)*10,r.lookAt(u),r.invalidate()};let b=null;const U=o=>{n.bind(),n.defaultViewport(),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),y(o),t.updateWorldMatrix(),t.updateViewProjectionMatrix(v.width,v.height),m.use(),m.uMVP(t._viewProj),p.attribPointer(m),s.bind(),s.drawTriangles()},O=o=>{e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,i.width,i.height),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),E(o),r.updateWorldMatrix(),r.updateViewProjectionMatrix(i.width,i.height),c.use(),c.uMVP(r._viewProj),c.tTex(n.getColorTexture()),c.uUVFactor([a.uvFactorX,a.uvFactorY]),p.attribPointer(c),s.bind(),s.drawTriangles()},T=(o=0)=>{h&&(l.apply(),U(o),O(o),b=window.requestAnimationFrame(T))};setTimeout(T,0);const g=new W({container:document.getElementById("debug")}),S=()=>{const o=n.getColorTexture();o.bind(),a.wrap==="repeat"?o.repeat():a.wrap==="clamp"?o.clamp():a.wrap==="mirror"&&o.mirror()};return g.addBinding(a,"wrap",{options:{repeat:"repeat",clamp:"clamp",mirror:"mirror"}}).on("change",S),g.addBinding(a,"uvFactorX",{min:1,max:3}),g.addBinding(a,"uvFactorY",{min:1,max:3}),()=>{h=!1,window.cancelAnimationFrame(b),x.disconnect(),g.dispose(),c.dispose(),m.dispose(),n.dispose(),s.dispose(),l.pop(),l.apply()}};export{ae as preview};
