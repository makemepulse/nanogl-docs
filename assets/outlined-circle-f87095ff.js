import{A as u,C as f,P,a as m}from"./arraybuffer-aead3aa0.js";import{c as M}from"./vec3-e4726a20.js";import"./common-a066d304.js";class b extends u{constructor(a,t=1,r=32,v=.1){super(a);const e=new Float32Array((r+1)*10),c=t-v,i=c/t*.5,h=Math.PI*2/r;for(var s=0;s<=r+1;s++){var d=Math.cos(s*h),n=-Math.sin(s*h),o=s*10;e[o+0]=t*d,e[o+1]=t*n,e[o+2]=d*.5+.5,e[o+3]=n*.5+.5,e[o+5]=c*d,e[o+6]=c*n,e[o+7]=d*i+.5,e[o+8]=n*i+.5,e[o+4]=1,e[o+9]=0}this.data(e),this.attrib("aPosition",2,a.FLOAT),this.attrib("aTexCoord",2,a.FLOAT),this.attrib("aSide",1,a.FLOAT)}render(){this.drawTriangleStrip()}}const O=l=>{const a=l||document.getElementById("canvas"),t=a.getContext("webgl"),r={width:1,height:1},v=window.devicePixelRatio,e=([w])=>{const p=w.contentRect.width,g=w.contentRect.height;a.width=Math.round(p*v),a.height=Math.round(g*v),r.width=t.drawingBufferWidth,r.height=t.drawingBufferHeight,o()},c=new ResizeObserver(e);c.observe(a);const i=new f(new P);i.lens.setAutoFov(35*(Math.PI/180)),i.lens.near=.01,i.lens.far=50,i.position.set([0,0,5]),i.lookAt(M());const h=new b(t,.5,32,.2),s=`
    attribute vec2 aPosition;
    attribute float aSide;

    uniform mat4 uMVP;

    varying float vSide;

    void main(void){
      vec4 pos = vec4(aPosition, 0.0, 1.0);
      gl_Position = uMVP * pos;
      vSide = aSide;
    }
  `,d=`
    precision lowp float;

    varying float vSide;

    void main(void){
      vec3 color = vec3(0.0, vSide, 0.0);
      gl_FragColor = vec4(color, 1.0);
    }
  `,n=new m(t,s,d),o=()=>{t.viewport(0,0,r.width,r.height),t.clearColor(.5,.5,.5,1),t.clear(t.COLOR_BUFFER_BIT),i.updateWorldMatrix(),i.updateViewProjectionMatrix(r.width,r.height),n.use(),n.uMVP(i._viewProj),h.attribPointer(n),h.render()};return()=>{c.disconnect()}};export{O as preview};
