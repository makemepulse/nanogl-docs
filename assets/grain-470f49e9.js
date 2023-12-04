import{B as R,a as D,F}from"./fetch-f973e09f.js";import{A as E}from"./texture-2d-53b1df66.js";import{C as H,P as z}from"./index-099e42fb.js";import{A as N,P as O}from"./arraybuffer-7f1df196.js";import{G as U,a as V,I as j}from"./indexbuffer-5b89fc58.js";import{P as W}from"./tweakpane-24b35bd6.js";import{cubePosUvs as k,cubeIndices as q}from"./cubeGeometry-a8671df7.js";import{c as K}from"./vec3-33249e24.js";import"./fbo-645f2652.js";import"./common-a066d304.js";var d=function(r){var e="";return e+=`uniform vec4 uGrainCoord;
uniform vec2 uGrainScaleBias;
uniform sampler2D tGrain;`,e};d.toString=d;var X=d;d._hmrListeners=[];d.onHmr=function(r){this._hmrListeners.push(r)};d._triggerHmr=function(){for(const r of this._hmrListeners)r(this)};var u=function(r){var e="";return e+=`
c += c * (uGrainScaleBias.x * texture2D(tGrain,texCoordVP*uGrainCoord.xy+uGrainCoord.zw).x+uGrainScaleBias.y);`,e};u.toString=u;var Z=u;u._hmrListeners=[];u.onHmr=function(r){this._hmrListeners.push(r)};u._triggerHmr=function(){for(const r of this._hmrListeners)r(this)};const h=3553;class $ extends E{constructor(e,n,t,i){super(e,n,t,i),this.textureType=3553,this._target=h,e.bindTexture(h,this.id),this.setFilter(!0)}fromImage(e){const n=this.gl;this.width=e.width,this.height=e.height,n.bindTexture(h,this.id),n.texImage2D(h,0,this.internal,this.format,this.type,e)}fromData(e,n,t=null){const i=this.gl;this.width=e,this.height=n,t=t||null,i.bindTexture(h,this.id),i.texImage2D(h,0,this.internal,e,n,0,this.format,this.type,t)}}const l=128;let x;function J(){if(x===void 0){var r=l*l;x=new Uint8Array(r);for(var e=0;r>e;e++)x[e]=128*(Math.random()+Math.random())}return x}class Q extends R{constructor(e,n){super(),this.amount=e,this.sharpness=n,this._noiseTex=null,this._preCode=X(),this._code=Z()}genCode(e,n){e.push(this._preCode),n.push(this._code)}init(){var e=this.post.gl;this._noiseTex=new $(e,e.LUMINANCE),this._noiseTex.fromData(l,l,J())}release(){this._noiseTex!==null&&this._noiseTex.dispose(),this._noiseTex=null}setupProgram(e){const n=this.amount,t=1/l,i=this.post.bufferWidth,m=this.post.bufferHeight,f=1-this.sharpness;e.uGrainCoord(t*i,t*m,.5*f*t,.5*f*t),e.uGrainScaleBias(2*n,-n),e.tGrain(this._noiseTex)}preRender(){}resize(e,n){}}const de=r=>{let e=!0;const n=r||document.getElementById("canvas"),t=n.getContext("webgl"),i={width:1,height:1},m=window.devicePixelRatio,f=([a])=>{const M=a.contentRect.width,L=a.contentRect.height;n.width=Math.round(M*m),n.height=Math.round(L*m),i.width=t.drawingBufferWidth,i.height=t.drawingBufferHeight},T=new ResizeObserver(f);T.observe(n);const p=U.get(t),S=new V().enableDepthTest().enableCullface().cullFace(t.BACK);p.push(S);const C=K(),s=new H(new z);s.lens.setAutoFov(35*(Math.PI/180)),s.lens.near=.01,s.lens.far=50,s.position.set([0,4,10]),s.lookAt(C);const w=new N(t,new Float32Array(k)),_=new j(t,t.UNSIGNED_SHORT,new Uint16Array(q));w.attrib("aPosition",3,t.FLOAT),w.attrib("aTexCoord",2,t.FLOAT);const B=`
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
    precision highp float;

    varying vec2 vTexCoord;

    void main(void){
      vec3 color = vec3(vec2(0.5) + vTexCoord * vec2(0.5), 0.75);
      gl_FragColor = vec4(color, 1.0);
    }
  `,g=new O(t,B,I),c={grainAmount:.1,grainSharpness:.7},o=new D(t,!1);o.enabled=!0;const A=new F;o.add(A);const v=new Q(c.grainAmount,c.grainSharpness);o.add(v);const y=a=>{s.x=Math.sin(a*5e-4)*10,s.z=Math.cos(a*5e-4)*10,s.lookAt(C),s.invalidate()};let P=null;const G=(a=0)=>{e&&(t.clearColor(.11,.11,.11,1),p.apply(),o.preRender(i.width,i.height),o.bindColor(),y(a),s.updateWorldMatrix(),s.updateViewProjectionMatrix(i.width,i.height),g.use(),g.uMVP(s._viewProj),w.attribPointer(g),_.bind(),_.drawTriangles(),o.render(),P=window.requestAnimationFrame(G))};setTimeout(G,0);const b=new W({container:document.getElementById("debug")});return b.addBinding(c,"grainAmount",{min:0,max:1}).on("change",()=>{v.amount=c.grainAmount}),b.addBinding(c,"grainSharpness",{min:0,max:1}).on("change",()=>{v.sharpness=c.grainSharpness}),()=>{e=!1,window.cancelAnimationFrame(P),T.disconnect(),b.dispose(),g.dispose(),_.dispose(),A.release(),v.release(),o.dispose(),p.pop(),p.apply()}};export{de as preview};
