import{I as s,c as b,E as g,m as M,M as T,e as C,S as F,F as u,A as L,v as A}from"./ShaderVersion-8538814c.js";const z=["D_RGB","D_DEPTH"];var o=function(a){var n="";return n+=`
{
  
  vec3 _baseColor = vec3(1.0);
  #if HAS_baseColor
    _baseColor *= baseColor();
    // _baseColor *= baseColor()*baseColor();
  #endif
  #if HAS_baseColorFactor
    _baseColor *= baseColorFactor();
  #endif

  
  surface.alpha = 1.0;
  #if HAS_alpha
    surface.alpha *= alpha();
  #endif
  #if HAS_alphaFactor
    surface.alpha *= alphaFactor();
  #endif


  float _metalness = 1.0;
  #if HAS_metalness
    _metalness *= metalness();
  #endif
  #if HAS_metalnessFactor
    _metalness *= metalnessFactor();
  #endif


  float _roughness = 1.0;
  #if HAS_roughness
    _roughness *= roughness();
  #endif
  #if HAS_roughnessFactor
    _roughness *= roughnessFactor();
  #endif


  #if HAS_occlusion
    float _occlusion = occlusion();
    #if HAS_occlusionStrength
      _occlusion = 1.0 - occlusionStrength() + _occlusion*occlusionStrength();
    #endif
    surface.occlusion = _occlusion;
  #else
  surface.occlusion = 1.0;
  #endif


  surface.emission = vec3(0.0);
  #if HAS_emissive 
    surface.emission += emissive();
    #if HAS_emissiveFactor
        surface.emission *= emissiveFactor();
    #endif
  #elif HAS_emissiveFactor
    surface.emission = emissiveFactor();
  #endif

  surface.albedo    = (_baseColor * vec3(1.0-0.04) ) * (1.0-_metalness);
  surface.specular = mix( vec3(0.04), _baseColor, _metalness );
  surface.smoothness  = 1.0-_roughness;

}`,n};o.toString=o;var N=o;o._hmrListeners=[];o.onHmr=function(a){this._hmrListeners.push(a)};o._triggerHmr=function(){for(const a of this._hmrListeners)a(this)};var l=function(a){var n="";return n+=`
// specular

{
  surface.albedo = vec3(1.0);
  #if HAS_diffuse
    surface.albedo *= diffuse();
    // surface.albedo *= diffuse()*diffuse();
  #endif
  #if HAS_diffuseFactor
    surface.albedo *= diffuseFactor();
  #endif


  surface.alpha = 1.0;
  #if HAS_alpha
    surface.alpha *= alpha();
  #endif
  #if HAS_alphaFactor
    surface.alpha *= alphaFactor();
  #endif


  surface.specular = vec3(1.0);
  #if HAS_specular
    surface.specular *= specular();
    // surface.specular *= specular()*specular();
    // surface.specular *= specular();
  #endif
  #if HAS_specularFactor
    surface.specular *= specularFactor();
  #endif


  surface.smoothness = 1.0;
  #if HAS_glossiness
    surface.smoothness *= glossiness();
  #endif
  #if HAS_glossinessFactor
    surface.smoothness *= glossinessFactor();
  #endif


  #if HAS_occlusion
    float _occlusion = occlusion();
    #if HAS_occlusionStrength
      _occlusion = 1.0 - occlusionStrength() + _occlusion*occlusionStrength();
    #endif
    surface.occlusion = _occlusion;
  #else
  surface.occlusion = 1.0;
  #endif



  surface.emission = vec3(0.0);
  #if HAS_emissive 
    surface.emission += emissive();
    #if HAS_emissiveFactor
        surface.emission *= emissiveFactor();
    #endif
  #elif HAS_emissiveFactor
    surface.emission = emissiveFactor();
  #endif
  
}`,n};l.toString=l;var D=l;l._hmrListeners=[];l.onHmr=function(a){this._hmrListeners.push(a)};l._triggerHmr=function(){for(const a of this._hmrListeners)a(this)};var h;(function(a){a.NONE="NONE",a.METALNESS="METALNESS",a.SPECULAR="SPECULAR"})(h||(h={}));class x extends b{constructor(){super(!0,!1),this.type=h.NONE,this.pbrInputType=new g("pbrWorkflow",["SPECULAR","METALNESS"]),this.addChild(this.pbrInputType)}_genCode(n){n.add("pbrsurface","PbrSurface surface = DefaultPbrSurface;")}}class P extends x{constructor(){super(),this.type=h.METALNESS,this.pbrInputType.set(this.type),this.addChild(this.baseColor=new s("baseColor",3)),this.addChild(this.baseColorFactor=new s("baseColorFactor",3)),this.addChild(this.metalness=new s("metalness",1)),this.addChild(this.metalnessFactor=new s("metalnessFactor",1)),this.addChild(this.roughness=new s("roughness",1)),this.addChild(this.roughnessFactor=new s("roughnessFactor",1))}_genCode(n){n.add("pbrsurface",N())}}class H extends x{constructor(){super(),this.type=h.SPECULAR,this.pbrInputType.set(this.type),this.addChild(this.baseColor=new s("diffuse",3)),this.addChild(this.baseColorFactor=new s("diffuseFactor",3)),this.addChild(this.specular=new s("specular",3)),this.addChild(this.specularFactor=new s("specularFactor",3)),this.addChild(this.glossiness=new s("glossiness",1)),this.addChild(this.glossinessFactor=new s("glossinessFactor",1))}_genCode(n){n.add("pbrsurface",D())}}var c=function(a){var n="";return n+=`#pragma SLOT version

#pragma SLOT definitions


#ifndef hasNormals
  #define hasNormals 1
#endif 
#ifndef hasTangents
  #define hasTangents hasNormals
#endif 

#if hasTangents && !hasNormals 
  #pragma error tan but no nrm
  error
#endif

#pragma SLOT precision

`+require("./includes/glsl-compat.vert")()+`

#pragma SLOT pv


IN vec3 aPosition;

#if hasNormals
IN vec3 aNormal;
OUT mediump vec3 vWorldNormal;
#endif

// has normal map and tangent attribute
#if hasTangents
IN vec4 aTangent;
#endif

#if HAS_normal && hasTangents
OUT mediump vec3 vWorldTangent;
OUT mediump vec3 vWorldBitangent;
#endif


// uniform mat4 uMVP;
uniform mat4 uWorldMatrix;
uniform mat4 uVP;

OUT vec3 vWorldPosition;


vec3 rotate( mat4 m, vec3 v )
{
  return m[0].xyz*v.x + m[1].xyz*v.y + m[2].xyz*v.z;
}


struct VertexData {
  highp vec3 position;
  highp vec3 worldPos;
  #if hasNormals
    vec3 normal;
  #endif
  #if hasTangents
    vec3 tangent;
  #endif
  mat4 worldMatrix;
};


void InitVertexData( out VertexData vertex ){

  vertex.position = aPosition;
  #if hasNormals
    vertex.normal = aNormal;
  #endif
  #if hasTangents
    vertex.tangent = aTangent.xyz;
  #endif

  vertex.worldMatrix = uWorldMatrix;
   
}


void main( void ){

  #pragma SLOT v

  VertexData vertex;
  InitVertexData( vertex );

  #pragma SLOT vertex_warp

  vec4 worldPos = vertex.worldMatrix * vec4( vertex.position, 1.0 );
  vertex.worldPos.xyz = worldPos.xyz / worldPos.w;

  #pragma SLOT vertex_warp_world

  gl_Position     = uVP * vec4( vertex.worldPos, 1.0 );
  vWorldPosition  = vertex.worldPos;
  
  #if hasNormals
  vWorldNormal    = normalize( rotate( vertex.worldMatrix, vertex.normal ) );
  #endif

  #if HAS_normal && hasTangents
    vWorldTangent   = normalize( rotate( vertex.worldMatrix, vertex.tangent.xyz ) );
    vWorldBitangent = normalize( cross( vWorldNormal, vWorldTangent ) * aTangent.w );
  #endif

  // IBL lighting may sample SH here if per vertex irrad enabled

  #pragma SLOT postv
  // vDebugColor = vec4( -position, 1.0 );
}`,n};c.toString=c;var y=c;c._hmrListeners=[];c.onHmr=function(a){this._hmrListeners.push(a)};c._triggerHmr=function(){for(const a of this._hmrListeners)a(this)};var d=function(a){var n="";return n+=`#pragma SLOT version

#pragma SLOT definitions


#ifndef hasNormals
  #define hasNormals 1
#endif 
#ifndef hasTangents
  #define hasTangents hasNormals
#endif 

#if hasTangents && !hasNormals 
  #pragma error tan but no nrm
  error
#endif


#if !hasTangents && __VERSION__ != 300
  #extension GL_OES_standard_derivatives : enable
#endif 

#pragma SLOT precision

`+require("./includes/glsl-compat.frag")()+`
`+require("./includes/pbr-inputs-decl.glsl")()+`

#pragma SLOT pf


uniform vec3 uCameraPosition;
IN vec3 vWorldPosition;

#if hasNormals
IN mediump vec3 vWorldNormal;
#endif 

#if HAS_normal && hasTangents
IN mediump vec3 vWorldTangent;
IN mediump vec3 vWorldBitangent;
#endif 




struct GeometryData
{
    vec3  worldPos;
    mediump vec3   worldNrm;
    mediump vec3   viewDir;
    mediump vec3   worldReflect;
};


struct LightingData
{
  lowp vec3 lightingColor;
};



`+require("./includes/math.glsl")()+`
`+require("./includes/color.glsl")()+`
`+require("./includes/normals.glsl")()+`
`+require("./includes/tonemap.glsl")()+`
`+require("./includes/lighting.glsl")()+`





void InitializeLightingData(out LightingData lightingData)
{
  lightingData.lightingColor = vec3(0.0);
}




void InitializeBRDF(SurfaceData surface, out BRDFData brdf)
{
  mediump float reflectivity = ReflectivitySpecular(surface.specular);
  mediump float oneMinusReflectivity = 1.0 - reflectivity;

  brdf.diffuse = surface.albedo * (vec3(1.0, 1.0, 1.0) - surface.specular);
  brdf.specular = surface.specular;

  brdf.grazingTerm = saturate(surface.smoothness + reflectivity);
  brdf.perceptualRoughness = PerceptualSmoothnessToPerceptualRoughness(surface.smoothness);
  brdf.roughness = max(PerceptualRoughnessToRoughness(brdf.perceptualRoughness), 0.001);
  brdf.roughness2 = brdf.roughness * brdf.roughness;

  brdf.normalizationTerm = brdf.roughness * 4.0 + 2.0;
  brdf.roughness2MinusOne = brdf.roughness2 - 1.0;
}

//                MAIN
// ===================

void main( void ){

  #pragma SLOT f


  SurfaceData surface;
  #pragma SLOT pbrsurface

  #if alphaMode( MASK )
    if( surface.alpha < alphaCutoff() ) discard;
  #endif

  //
  #ifdef HAS_vertexColor
  #if HAS_vertexColor
    surface.albedo *= vertexColor();
  #endif
  #endif


  // -----------

  GeometryData geometryData;
  geometryData.worldPos = vWorldPosition;
  geometryData.viewDir  = normalize( uCameraPosition - vWorldPosition ); // safe normalize?
  geometryData.worldNrm = normalize(COMPUTE_NORMAL());
  geometryData.worldReflect = reflect( -geometryData.viewDir, geometryData.worldNrm );


  BRDFData brdfData;
  InitializeBRDF( surface, brdfData );

  LightingData lightingData;
  InitializeLightingData( lightingData );




  #pragma SLOT prelightsf
  #pragma SLOT lightsf
  #pragma SLOT postlightsf

  lightingData.lightingColor += surface.emission;


  #if alphaMode( MASK )
    FragColor.a = 1.0;
  #elif alphaMode( BLEND )
    FragColor.a = surface.alpha;
  #else
    FragColor.a = 1.0;
  #endif



  FragColor.rgb = lightingData.lightingColor;

  #pragma SLOT postf_linear

  EXPOSURE(FragColor.rgb);
  GAMMA_CORRECTION(FragColor.rgb);

  #pragma SLOT postf



}`,n};d.toString=d;var O=d;d._hmrListeners=[];d.onHmr=function(a){this._hmrListeners.push(a)};d._triggerHmr=function(){for(const a of this._hmrListeners)a(this)};const E=["GAMMA_NONE","GAMMA_STD","GAMMA_2_2","GAMMA_TB"],v=M.create(),_="std";class w extends T{constructor(n="gltf-std-pass"){super({uid:_,vert:y(),frag:O()});const e=this.inputs;e.add(this.version=new C),e.add(this.precision=new F("highp")),e.add(this.shaderid=new u("id_"+_,!0)),e.add(this.alpha=new s("alpha",1)),e.add(this.alphaFactor=new s("alphaFactor",1)),e.add(this.alphaCutoff=new s("alphaCutoff",1)),e.add(this.emissive=new s("emissive",3)),e.add(this.emissiveFactor=new s("emissiveFactor",3)),e.add(this.normal=new s("normal",3)),e.add(this.normalScale=new s("normalScale",1)),e.add(this.occlusion=new s("occlusion",1)),e.add(this.occlusionStrength=new s("occlusionStrength",1)),e.add(this.iGamma=new s("gamma",1)),e.add(this.iExposure=new s("exposure",1)),e.add(this.alphaMode=new g("alphaMode",L)),e.add(this.gammaMode=new g("gammaMode",E)).set("GAMMA_2_2"),e.add(this.doubleSided=new u("doubleSided",!1)),e.add(this.perVertexIrrad=new u("perVertexIrrad",!1)),e.add(this.horizonFading=new u("horizonFading",!1)),e.add(this.glossNearest=new u("glossNearest",!1))}setSurface(n){this.surface&&this.inputs.remove(this.surface),this.surface=n,this.inputs.add(this.surface)}setLightSetup(n){this.inputs.addChunks(n.getChunks("std"))}prepare(n,e,i){n.uMVP&&(i.modelViewProjectionMatrix(v,e._wmatrix),n.uMVP(v)),n.uWorldMatrix&&n.uWorldMatrix(e._wmatrix),n.uVP&&n.uVP(i._viewProj),n.uCameraPosition&&n.uCameraPosition(i._wposition)}}class R extends w{constructor(n="gltf-std-pass"){super(n);var e=new H;this.setSurface(e)}}class W extends w{constructor(n="gltf-std-pass"){super(n);var e=new P;this.setSurface(e)}}const I=new Float32Array([Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE]),S=new Float32Array(6),t=A.create();class U{constructor(){this._mmData=new Float32Array(6),this.min=new Float32Array(this._mmData.buffer,0,3),this.max=new Float32Array(this._mmData.buffer,12,3)}zero(){this.min.set([0,0,0]),this.max.set([0,0,0])}copyFrom(n){this.min.set(n.min),this.max.set(n.max)}fromMinMax(n,e){this.min.set(n),this.max.set(e)}static union(n,e,i){for(var r=0;r<3;r++)n.min[r]=Math.min(e.min[r],i.min[r]),n.max[r]=Math.max(e.max[r],i.max[r])}static transform(n,e,i){const r=S,m=e.min,p=e.max;r.set(I);for(var f=0;8>f;++f)t[0]=f&1?p[0]:m[0],t[1]=f&2?p[1]:m[1],t[2]=f&4?p[2]:m[2],A.transformMat4(t,t,i),r[0]=Math.min(r[0],t[0]),r[1]=Math.min(r[1],t[1]),r[2]=Math.min(r[2],t[2]),r[3]=Math.max(r[3],t[0]),r[4]=Math.max(r[4],t[1]),r[5]=Math.max(r[5],t[2]);n._mmData.set(S)}}export{U as B,z as D,P as M,w as S,W as a,R as b};
