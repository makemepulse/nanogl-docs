import{C as P,P as h,A as f,a as M,N as g}from"./arraybuffer-aead3aa0.js";import{useWebGL as A}from"./useWebGL-cc0b7991.js";import{A as l}from"./common-a066d304.js";function x(){var e=new l(16);return l!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0),e[0]=1,e[5]=1,e[10]=1,e[15]=1,e}const T=e=>{const{gl:o,size:a,start:p}=A(e),t=new P(new h);t.lens.setAutoFov(35*(Math.PI/180)),t.lens.near=.01,t.lens.far=50,t.position.set([0,0,5]),t.lookAt([0,0,0]);const m=new Float32Array([1,0,0,0,0,1]),i=new f(o,m);i.attrib("aPosition",2,o.FLOAT);const v=`
    attribute vec2 aPosition;

    uniform mat4 uMVP;

    void main(void){
      vec4 pos = vec4(aPosition, 0.0, 1.0);
      gl_Position = uMVP * pos;
    }
  `,u=`
    precision lowp float;
    void main(void){
      vec3 red = vec3(1.0, 0.0, 0.0);
      gl_FragColor = vec4(red, 1.0);
    }
  `,n=new M(o,v,u),r=new g,c=x(),w=s=>{const d=s*.001;r.position[1]=Math.cos(d),r.setScale(Math.sin(d)*.5+1.5),r.rotateZ(.5*(Math.PI/180)),r.invalidate(),r.updateWorldMatrix()};return p(({elapsedTime:s})=>{w(s),o.viewport(0,0,a.width,a.height),o.clearColor(0,0,0,0),o.clear(o.COLOR_BUFFER_BIT),t.updateWorldMatrix(),t.updateViewProjectionMatrix(a.width,a.height),t.modelViewProjectionMatrix(c,r._wmatrix),n.use(),n.uMVP(c),i.attribPointer(n),i.drawTriangles()},!1)};export{T as preview};
