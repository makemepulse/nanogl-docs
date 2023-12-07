import{I as r,d as C,E as A,g as F,a as H,m as y,M as R,f as P,S as O,F as _,A as E,v as T}from"./ShaderVersion-75aae7d1.js";const Y=["D_RGB","D_DEPTH"];var i=function(e){var n="";return n+=`
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

}`,n};i.toString=i;var I=i;i._hmrListeners=[];i.onHmr=function(e){this._hmrListeners.push(e)};i._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};var l=function(e){var n="";return n+=`
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
  
}`,n};l.toString=l;var z=l;l._hmrListeners=[];l.onHmr=function(e){this._hmrListeners.push(e)};l._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};var S;(function(e){e.NONE="NONE",e.METALNESS="METALNESS",e.SPECULAR="SPECULAR"})(S||(S={}));class w extends C{constructor(){super(!0,!1),this.type=S.NONE,this.pbrInputType=new A("pbrWorkflow",["SPECULAR","METALNESS"]),this.addChild(this.pbrInputType)}_genCode(n){n.add("pbrsurface","PbrSurface surface = DefaultPbrSurface;")}}class W extends w{constructor(){super(),this.type=S.METALNESS,this.pbrInputType.set(this.type),this.addChild(this.baseColor=new r("baseColor",3)),this.addChild(this.baseColorFactor=new r("baseColorFactor",3)),this.addChild(this.metalness=new r("metalness",1)),this.addChild(this.metalnessFactor=new r("metalnessFactor",1)),this.addChild(this.roughness=new r("roughness",1)),this.addChild(this.roughnessFactor=new r("roughnessFactor",1))}_genCode(n){n.add("pbrsurface",I())}}class B extends w{constructor(){super(),this.type=S.SPECULAR,this.pbrInputType.set(this.type),this.addChild(this.baseColor=new r("diffuse",3)),this.addChild(this.baseColorFactor=new r("diffuseFactor",3)),this.addChild(this.specular=new r("specular",3)),this.addChild(this.specularFactor=new r("specularFactor",3)),this.addChild(this.glossiness=new r("glossiness",1)),this.addChild(this.glossinessFactor=new r("glossinessFactor",1))}_genCode(n){n.add("pbrsurface",z())}}var c=function(e){var n="";return n+=`#pragma SLOT version

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

`+F()+`

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
}`,n};c.toString=c;var V=c;c._hmrListeners=[];c.onHmr=function(e){this._hmrListeners.push(e)};c._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};var d=function(e){var n="";return n+=`
struct Light
{
  mediump vec3   direction;
  mediump vec3   color;
  mediump float  attenuation;
  mediump float  shadowAttenuation;
};




struct BRDFData
{
  mediump vec3 diffuse;
  mediump vec3 specular;
  mediump float perceptualRoughness;
  mediump float roughness;
  mediump float roughness2;
  mediump float grazingTerm;

    // We save some light invariant BRDF terms so we don't have to recompute
    // them in the light loop. Take a look at DirectBRDF function for detailed explaination.
  mediump float normalizationTerm;     // roughness * 4.0 + 2.0
  mediump float roughness2MinusOne;    // roughness^2 - 1.0
};



float DistanceAttenuation(float distanceSqr)
{
  return 1.0/distanceSqr;
}

float DistanceAttenuationRange(float distanceSqr, vec2 distanceAttenuation)
{
  float factor = distanceSqr * distanceAttenuation.x; // x = 1/range squared
  float smoothFactor = saturate(1.0 - factor * factor);
  smoothFactor = smoothFactor * smoothFactor;

  float lightAtten = 1.0/distanceSqr;
  return lightAtten * smoothFactor;
}


mediump float AngleAttenuation(vec3 spotDirection, vec3 lightDirection, vec2 spotAttenuation)
{
  mediump float SdotL = dot(spotDirection, lightDirection);
  mediump float atten = saturate(SdotL * spotAttenuation.x + spotAttenuation.y);
  return atten * atten;
}




mediump float ReflectivitySpecular(mediump vec3 specular)
{
  #ifdef QUALITY_HI
    return max(max(specular.r, specular.g), specular.b);
  #else
    return specular.r;
  #endif
}

#define PerceptualSmoothnessToPerceptualRoughness(perceptualSmoothness) (1.0 - perceptualSmoothness)
#define PerceptualRoughnessToRoughness(perceptualRoughness) (perceptualRoughness * perceptualRoughness)



// "Optimizing PBR for Mobile" from Siggraph 2015 moving mobile graphics course
// https://community.arm.com/events/1155
mediump vec3 GGXZiomaBDRF(BRDFData brdfData, mediump vec3 normalWS, mediump vec3 wLightDir, mediump vec3 wViewDir)
{
  vec3 halfDir = normalize(wLightDir + wViewDir);
  float NoH = sdot(normalWS, halfDir);
  mediump float LoH = sdot(wLightDir, halfDir);
  float d = NoH * NoH * brdfData.roughness2MinusOne + 1.00001;
  mediump float LoH2 = LoH * LoH;
  mediump float specularTerm = brdfData.roughness2 / ((d * d) * max(0.1, LoH2) * brdfData.normalizationTerm);
  mediump vec3 color = specularTerm * brdfData.specular + brdfData.diffuse;
  return color;
}



void LightingPhysicallyBased(BRDFData brdfData, GeometryData geometryData, inout LightingData lightingData, Light light )
{
  mediump float NdotL = sdot(geometryData.worldNrm, light.direction);
  mediump vec3 inputLight = light.color * (light.attenuation * light.shadowAttenuation * NdotL);
  lightingData.lightingColor += GGXZiomaBDRF(brdfData, geometryData.worldNrm, light.direction, geometryData.viewDir) * inputLight;
}


#ifdef SpecularIBL

void EnvironmentBRDF(BRDFData brdfData, GeometryData geometryData, inout LightingData lightingData, float occlusion )
{

  vec3 indirectDiffuse  = ComputeIBLDiffuse( geometryData.worldNrm );
  vec3 indirectSpecular = SpecularIBL( geometryData.worldReflect, brdfData.perceptualRoughness, geometryData.worldPos );

  float NoV = sdot( geometryData.viewDir, geometryData.worldNrm );
  float fresnelTerm = pow( 1.0-NoV, 5.0 );

  float surfaceReduction = 1.0 / (brdfData.roughness2 + 1.0);
  vec3 specularTerm = vec3(surfaceReduction * mix(brdfData.specular, vec3(brdfData.grazingTerm), fresnelTerm));

  lightingData.lightingColor += occlusion * (indirectDiffuse * brdfData.diffuse + indirectSpecular*specularTerm );
}

#endif

// Schlick approx
// [Schlick 1994, "An Inexpensive BRDF Model for Physically-Based Rendering"]
// https://github.com/EpicGames/UnrealEngine/blob/dff3c48be101bb9f84633a733ef79c91c38d9542/Engine/Shaders/BRDF.usf#L168
vec3 F_Schlick( float VoH,vec3 spec,float glo )
{
  float factor = glo*glo * pow( 1.0-VoH, 5.0 );
  return( 1.0 - factor )*spec + factor;
}


mediump vec3 LightingLambert(mediump vec3 lightColor, mediump vec3 lightDir, mediump vec3 normal)
{
    mediump float NoL = sdot(normal, lightDir);
    return lightColor * NoL;
}

mediump vec3 LightingSpecular(mediump vec3 lightColor, vec3 lightDir, mediump vec3 normal, vec3 viewDir, mediump vec4 specular, mediump float smoothness)
{
    vec3 halfVec = normalize(lightDir + viewDir);
    mediump float NoH = sdot(normal, halfVec);
    mediump float modifier = pow(NoH, smoothness);
    mediump vec3 specularReflection = specular.rgb * modifier;
    return lightColor * specularReflection;
}
`,n};d.toString=d;var G=d;d._hmrListeners=[];d.onHmr=function(e){this._hmrListeners.push(e)};d._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};var m=function(e){var n="";return n+=`

#ifndef _H_TONEMAP_
#define _H_TONEMAP_


  // Exposure
  // ===========


  #if HAS_exposure
    #define EXPOSURE(color) color *= vec3( exposure() );
  #else
    #define EXPOSURE(color)
  #endif


  // Gamma correction
  // ===========

  #if gammaMode( GAMMA_STD ) && HAS_gamma
    #define GAMMA_CORRECTION(color) color = pow( color, vec3( gamma() ) );


  #elif gammaMode( GAMMA_2_2 )
    #define GAMMA_CORRECTION(color) color = pow( color, vec3( 1.0/2.2 ) );


  #elif gammaMode( GAMMA_TB )

    void ToneMapTB( inout vec3 color ) {
      vec3 c = color;
      vec3 sqrtc = sqrt( c );
      color = (sqrtc-sqrtc*c) + c*(0.4672*c+vec3(0.5328));
    }

    #define GAMMA_CORRECTION(color) ToneMapTB( color );

  #else
    #define GAMMA_CORRECTION(color)

  #endif



#endif`,n};m.toString=m;var U=m;m._hmrListeners=[];m.onHmr=function(e){this._hmrListeners.push(e)};m._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};var f=function(e){var n="";return n+=`



#if HAS_normal

  vec3 GetScaledNormal( vec3 normalMap, float scale ){
    vec3 nrm = normalMap = normalMap*vec3(2.0) - vec3(1.0);
    return normalize( nrm * vec3(scale, scale, 1.0 ) );
  }

  #if HAS_normalScale
    #define NormalMap(k) GetScaledNormal( normal(), normalScale() )
  #else
    #define NormalMap(k) normal()*vec3(2.0)-vec3(1.0)
  #endif

#endif


#if HAS_normal
  
  mat3 computeTangentSpaceMatrix( vec2 nrmTexCoords ){

  #if hasTangents
    return mat3( vWorldTangent, vWorldBitangent, vWorldNormal );
  #else

      vec3 pos_dx = dFdx(vWorldPosition);
      vec3 pos_dy = dFdy(vWorldPosition);
      vec2 tex_dx = dFdx(nrmTexCoords);
      vec2 tex_dy = dFdy(nrmTexCoords);

      vec3 tangent = (tex_dy.y * pos_dx - tex_dx.y * pos_dy) / (tex_dx.x * tex_dy.y - tex_dy.x * tex_dx.y);

      #if hasNormals 
        vec3 worldNormal = normalize( vWorldNormal );
      #else
        vec3 worldNormal = normalize( cross(pos_dx, pos_dy) );
      #endif
      

      tangent = normalize(tangent - worldNormal * dot(worldNormal, tangent));
      vec3 binormal = normalize(cross(worldNormal, tangent));
      return mat3(tangent, binormal, worldNormal);
  #endif
  }

  #define COMPUTE_NORMAL(k) ComputeWorldNormal( NormalMap(), normal_texCoord() )
  vec3 ComputeWorldNormal( vec3 nrmTex, vec2 nrmTexCoords ){
    mat3 tbn = computeTangentSpaceMatrix( nrmTexCoords );
    vec3 nrm = tbn*nrmTex;
    return gl_FrontFacing ? nrm : -nrm;
  }

#else
  #define COMPUTE_NORMAL(k) ComputeWorldNormal( )
  vec3 ComputeWorldNormal(){
    #if hasNormals 
      return normalize( gl_FrontFacing ? vWorldNormal : -vWorldNormal );
    #else
      vec3 pos_dx = dFdx(vWorldPosition);
      vec3 pos_dy = dFdy(vWorldPosition);
      return normalize( cross(pos_dx, pos_dy) );
    #endif
  }
#endif





`,n};f.toString=f;var j=f;f._hmrListeners=[];f.onHmr=function(e){this._hmrListeners.push(e)};f._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};var u=function(e){var n="";return n+=`#ifndef COLOR_INCLUDE
#define COLOR_INCLUDE 1

vec3 FastSRGBToLinear(vec3 c){
  return c * (c * (c * 0.305306011 + 0.682171111) + 0.012522878);
}

float FastSRGBToLinear(float c){
  return c * (c * (c * 0.305306011 + 0.682171111) + 0.012522878);
}

#endif
`,n};u.toString=u;var k=u;u._hmrListeners=[];u.onHmr=function(e){this._hmrListeners.push(e)};u._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};var h=function(e){var n="";return n+=`#ifndef MATH_INCLUDE
#define MATH_INCLUDE 1


#define saturate(x) clamp( x, 0.0, 1.0 )
#define sdot( a, b ) saturate( dot(a,b) )

#endif`,n};h.toString=h;var X=h;h._hmrListeners=[];h.onHmr=function(e){this._hmrListeners.push(e)};h._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};var p=function(e){var n="";return n+=`

struct SurfaceData
{
  vec3 albedo;
  vec3 specular;
  vec3 emission;
  float smoothness;
  float occlusion;
  float alpha;
};
`,n};p.toString=p;var $=p;p._hmrListeners=[];p.onHmr=function(e){this._hmrListeners.push(e)};p._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};var g=function(e){var n="";return n+=`#pragma SLOT version

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

`+H()+`
`+$()+`

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



`+X()+`
`+k()+`
`+j()+`
`+U()+`
`+G()+`





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



}`,n};g.toString=g;var q=g;g._hmrListeners=[];g.onHmr=function(e){this._hmrListeners.push(e)};g._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};const K=["GAMMA_NONE","GAMMA_STD","GAMMA_2_2","GAMMA_TB"],L=y.create(),b="std";class N extends R{constructor(n="gltf-std-pass"){super({uid:b,vert:V(),frag:q()});const a=this.inputs;a.add(this.version=new P),a.add(this.precision=new O("highp")),a.add(this.shaderid=new _("id_"+b,!0)),a.add(this.alpha=new r("alpha",1)),a.add(this.alphaFactor=new r("alphaFactor",1)),a.add(this.alphaCutoff=new r("alphaCutoff",1)),a.add(this.emissive=new r("emissive",3)),a.add(this.emissiveFactor=new r("emissiveFactor",3)),a.add(this.normal=new r("normal",3)),a.add(this.normalScale=new r("normalScale",1)),a.add(this.occlusion=new r("occlusion",1)),a.add(this.occlusionStrength=new r("occlusionStrength",1)),a.add(this.iGamma=new r("gamma",1)),a.add(this.iExposure=new r("exposure",1)),a.add(this.alphaMode=new A("alphaMode",E)),a.add(this.gammaMode=new A("gammaMode",K)).set("GAMMA_2_2"),a.add(this.doubleSided=new _("doubleSided",!1)),a.add(this.perVertexIrrad=new _("perVertexIrrad",!1)),a.add(this.horizonFading=new _("horizonFading",!1)),a.add(this.glossNearest=new _("glossNearest",!1))}setSurface(n){this.surface&&this.inputs.remove(this.surface),this.surface=n,this.inputs.add(this.surface)}setLightSetup(n){this.inputs.addChunks(n.getChunks("std"))}prepare(n,a,s){n.uMVP&&(s.modelViewProjectionMatrix(L,a._wmatrix),n.uMVP(L)),n.uWorldMatrix&&n.uWorldMatrix(a._wmatrix),n.uVP&&n.uVP(s._viewProj),n.uCameraPosition&&n.uCameraPosition(s._wposition)}}class J extends N{constructor(n="gltf-std-pass"){super(n);var a=new B;this.setSurface(a)}}class nn extends N{constructor(n="gltf-std-pass"){super(n);var a=new W;this.setSurface(a)}}const Z=new Float32Array([Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE]),M=new Float32Array(6),o=T.create();class en{constructor(){this._mmData=new Float32Array(6),this.min=new Float32Array(this._mmData.buffer,0,3),this.max=new Float32Array(this._mmData.buffer,12,3)}zero(){this.min.set([0,0,0]),this.max.set([0,0,0])}copyFrom(n){this.min.set(n.min),this.max.set(n.max)}fromMinMax(n,a){this.min.set(n),this.max.set(a)}static union(n,a,s){for(var t=0;t<3;t++)n.min[t]=Math.min(a.min[t],s.min[t]),n.max[t]=Math.max(a.max[t],s.max[t])}static transform(n,a,s){const t=M,D=a.min,x=a.max;t.set(Z);for(var v=0;8>v;++v)o[0]=v&1?x[0]:D[0],o[1]=v&2?x[1]:D[1],o[2]=v&4?x[2]:D[2],T.transformMat4(o,o,s),t[0]=Math.min(t[0],o[0]),t[1]=Math.min(t[1],o[1]),t[2]=Math.min(t[2],o[2]),t[3]=Math.max(t[3],o[0]),t[4]=Math.max(t[4],o[1]),t[5]=Math.max(t[5],o[2]);n._mmData.set(M)}}export{en as B,Y as D,W as M,N as S,nn as a,J as b};
