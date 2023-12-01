import{v as d,C as F,m as N,F as l,E as c,I as r,a as U,b as q,S as $,c as X,A as j}from"./ShaderPrecision-ccb03460.js";import{N as Z}from"./index-5809b7fb.js";var O;(function(e){e[e.UNKNOWN=0]="UNKNOWN",e[e.DIRECTIONAL=1]="DIRECTIONAL",e[e.SPOT=2]="SPOT",e[e.POINT=4]="POINT",e[e.IBL=5]="IBL"})(O||(O={}));const T=O;class K extends Z{constructor(){super()}}class Nn extends K{constructor(n,t){super(),this.env=n,this.sh=t,this._type=T.IBL,this.iblFormat="OCTA",this.hdrEncoding="RGBM",this.shFormat="SH9",this.mipLevels=5,this.enableRotation=!1,this.enableBoxProjection=!1,this.intensity=1,this.ambiantIntensity=1,this.specularIntensity=1,this.boxProjectionSize=d.fromValues(1,1,1),this.boxProjectionOffset=d.fromValues(0,0,0)}}const J=new Float32Array([Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE]),R=new Float32Array(6),a=d.create();class Q{constructor(){this._mmData=new Float32Array(6),this.min=new Float32Array(this._mmData.buffer,0,3),this.max=new Float32Array(this._mmData.buffer,12,3)}zero(){this.min.set([0,0,0]),this.max.set([0,0,0])}copyFrom(n){this.min.set(n.min),this.max.set(n.max)}fromMinMax(n,t){this.min.set(n),this.max.set(t)}static union(n,t,s){for(var i=0;i<3;i++)n.min[i]=Math.min(t.min[i],s.min[i]),n.max[i]=Math.max(t.max[i],s.max[i])}static transform(n,t,s){const i=R,o=t.min,h=t.max;i.set(J);for(var b=0;8>b;++b)a[0]=b&1?h[0]:o[0],a[1]=b&2?h[1]:o[1],a[2]=b&4?h[2]:o[2],d.transformMat4(a,a,s),i[0]=Math.min(i[0],a[0]),i[1]=Math.min(i[1],a[1]),i[2]=Math.min(i[2],a[2]),i[3]=Math.max(i[3],a[0]),i[4]=Math.max(i[4],a[1]),i[5]=Math.max(i[5],a[2]);n._mmData.set(R)}}const Y=["PCFNONE","PCF4x1","PCF4x4","PCF2x2"];var f=function(e){var n="";return n+="#define NUM_D_LIGHTS "+e.count+`

`,e.count>0&&(n+=`
uniform vec3 uLDirDirections [NUM_D_LIGHTS];
uniform vec4 uLDirColors     [NUM_D_LIGHTS]; // rgb + iblShadowing
`),n+=`

`,n};f.toString=f;var nn=f;f._hmrListeners=[];f.onHmr=function(e){this._hmrListeners.push(e)};f._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};var p=function(e){var n="";return n+="#define NUM_S_LIGHTS "+e.count+`

`,e.count>0&&(n+=`
uniform vec3 uLSpotPositions  [NUM_S_LIGHTS];
uniform vec3 uLSpotDirections [NUM_S_LIGHTS];
uniform vec4 uLSpotColors     [NUM_S_LIGHTS]; // rgb + iblShadowing
uniform vec4 uLSpotAttenuation[NUM_S_LIGHTS]; 
`),n+=`

`,n};p.toString=p;var en=p;p._hmrListeners=[];p.onHmr=function(e){this._hmrListeners.push(e)};p._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};var g=function(e){var n="";return n+="#define NUM_P_LIGHTS "+e.count+`

`,e.count>0&&(n+=`
uniform vec4 uLPointPositions  [NUM_P_LIGHTS]; //w is radius
uniform vec3 uLPointFalloff    [NUM_P_LIGHTS];
uniform vec3 uLPointColors     [NUM_P_LIGHTS]; // rgb
`),n+=`

`,n};g.toString=g;var tn=g;g._hmrListeners=[];g.onHmr=function(e){this._hmrListeners.push(e)};g._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};var m=function(e){var n="";return n+=`
{
  Light light;

  light.direction = uLDirDirections  [`+e.index+`]    ;
  light.color     = uLDirColors      [`+e.index+`].rgb;
  light.attenuation = 1.0;

  `,e.shadowIndex>-1?n+=`
    ShadowMapData shadowmapData = GET_SHADOWMAP_DATA( `+e.shadowIndex+` );
    light.shadowAttenuation = SampleShadowAttenuation(shadowmapData, tShadowMap`+e.shadowIndex+`, geometryData.worldPos, geometryData.worldNrm );
  `:n+=`
    light.shadowAttenuation = 1.0;
  `,n+=`

  LightingPhysicallyBased(brdfData,  geometryData, lightingData, light );
}`,n};m.toString=m;var sn=m;m._hmrListeners=[];m.onHmr=function(e){this._hmrListeners.push(e)};m._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};var v=function(e){var n="";return n+=`
{
  vec3 lightPositionWS                    = uLSpotPositions  [`+e.index+`]    ;
  mediump vec3 spotDirection              = uLSpotDirections [`+e.index+`]    ;
  mediump vec3 lightColor                 = uLSpotColors     [`+e.index+`].rgb;
  mediump vec4 distanceAndSpotAttenuation = uLSpotAttenuation[`+e.index+`]    ;

  vec3 lightVector = lightPositionWS - geometryData.worldPos;
  float distanceSqr = dot(lightVector, lightVector);

  mediump vec3 lightDirection = vec3(lightVector * inversesqrt(distanceSqr));

  mediump float attenuation = AngleAttenuation(spotDirection.xyz, lightDirection, distanceAndSpotAttenuation.zw);
  `,e.infinite?n+=`
    attenuation *= DistanceAttenuation(distanceSqr);
  `:n+=`
    attenuation *= DistanceAttenuationRange(distanceSqr, distanceAndSpotAttenuation.xy);
  `,n+=`


  Light light;
  light.direction = lightDirection;
  light.attenuation = attenuation;
  light.color = lightColor;

  `,e.shadowIndex>-1?n+=`
    ShadowMapData shadowmapData = GET_SHADOWMAP_DATA( `+e.shadowIndex+` );
    light.shadowAttenuation = SampleShadowAttenuation(shadowmapData, tShadowMap`+e.shadowIndex+`, geometryData.worldPos, geometryData.worldNrm );
  `:n+=`
    light.shadowAttenuation = 1.0;
  `,n+=`
  
  // TODO store ibl contrib in separate struct
  // #if iblShadowing
  //   float sDamp = uLSpotColors[`+e.index+`].a;
  //   specularColor *= mix( sDamp, 1.0, shOccl );
  // #endif

  
  // mediump vec3 attenuatedLightColor = light.color * (light.attenuation * light.shadowAttenuation);
  // LS_DIFFUSE  += LightingLambert(attenuatedLightColor, light.direction, geometryData.worldNrm);
  // LS_SPECULAR += LightingSpecular(attenuatedLightColor, light.direction, geometryData.worldNrm, geometryData.viewDir, specularGloss, smoothness);

  LightingPhysicallyBased(brdfData,  geometryData, lightingData, light );
}`,n};v.toString=v;var on=v;v._hmrListeners=[];v.onHmr=function(e){this._hmrListeners.push(e)};v._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};var _=function(e){var n="";return n+=`
{
  vec3 lightPositionWS                    = uLPointPositions [`+e.index+`].xyz;
  mediump vec3 lightColor                 = uLPointColors    [`+e.index+`].rgb;

  vec3 lightVector = lightPositionWS - geometryData.worldPos;
  float distanceSqr = dot(lightVector, lightVector);

  mediump vec3 lightDirection = vec3(lightVector * inversesqrt(distanceSqr));

  `,e.infinite?n+=`
    mediump float attenuation = DistanceAttenuation(distanceSqr);
  `:n+=`
    float oneOverRangeSquared = uLPointPositions[`+e.index+`].w;
    mediump float attenuation = DistanceAttenuationRange(distanceSqr, vec2(oneOverRangeSquared, 0.0));
  `,n+=`


  Light light;
  light.direction = lightDirection;
  light.attenuation = attenuation;
  light.color = lightColor;
  light.shadowAttenuation = 1.0;
  
  LightingPhysicallyBased(brdfData,  geometryData, lightingData, light );
}`,n};_.toString=_;var rn=_;_._hmrListeners=[];_.onHmr=function(e){this._hmrListeners.push(e)};_._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};var S=function(e){var n="";n+=`

#define SHADOW_COUNT `+e.shadowCount+`

#if __VERSION__ == 300
  precision lowp sampler2DShadow;

  #define DepthSampler sampler2DShadow
  
#else
  #define DepthSampler sampler2D
#endif


`;for(var t=0;t<e.shadowCount;t++)n+=`
  uniform DepthSampler tShadowMap`+t+`;
`;return n+=`




uniform highp vec2 uShadowKernelRotation;
uniform highp mat4 uShadowMatrices[SHADOW_COUNT];
uniform highp vec4 uShadowTexelBiasVector[SHADOW_COUNT];
uniform       vec2 uShadowMapSize[SHADOW_COUNT];


struct ShadowMapData {
  mat4 projection;
  vec4 texelBiasVector;
  vec2 size; // size , 1/size
};

#define GET_SHADOWMAP_DATA(i) ShadowMapData( uShadowMatrices[i], uShadowTexelBiasVector[i], uShadowMapSize[i])


// RGB depth decoding
// ------------------
highp float decodeDepthRGB(highp vec3 rgb){
  return(rgb.x+rgb.y*(1.0/255.0))+rgb.z*(1.0/65025.0);
}


#if __VERSION__ == 300
  
      
  float textureShadow( DepthSampler t, float ref, vec2 uvs ){
    return texture(t, vec3( uvs, ref ) );
  }

  vec2 textureShadow( DepthSampler t, float ref, vec4 uvs ){
    
    return vec2(
      texture(t, vec3( uvs.xy, ref ) ),
      texture(t, vec3( uvs.zw, ref ) )
    );

  }

  vec4 textureShadow( DepthSampler t, float ref, vec4 uvs0, vec4 uvs1 ){
    
    return vec4(
      texture(t, vec3( uvs0.xy, ref ) ),
      texture(t, vec3( uvs0.zw, ref ) ),
      texture(t, vec3( uvs1.xy, ref ) ),
      texture(t, vec3( uvs1.zw, ref ) )
    );

  }



#else



  #if depthFormat( D_RGB )
    float FETCH_DEPTH( DepthSampler t, vec2 uvs ){
      return decodeDepthRGB( texture2D(t,uvs).xyz );
    }
    //define FETCH_DEPTH(t,uvs) decodeDepthRGB( texture2D(t,uvs).xyz )
  #endif

  #if depthFormat( D_DEPTH )
    float FETCH_DEPTH( DepthSampler t, vec2 uvs ){
      return texture2D(t,uvs).x;
    }
    //define FETCH_DEPTH(t,uvs) texture2D(t,uvs).x
  #endif

  
  float textureShadow( DepthSampler t, float ref, vec2 uvs ){
    return step( ref, FETCH_DEPTH(t,uvs));
  }

  vec2 textureShadow( DepthSampler t, float ref, vec4 uvs ){
    
    vec2 occl = vec2(
      FETCH_DEPTH(t,uvs.xy),
      FETCH_DEPTH(t,uvs.zw)
    );

    return step( vec2(ref), occl );
  }

  vec4 textureShadow( DepthSampler t, float ref, vec4 uvs0, vec4 uvs1 ){
    
    vec4 occl = vec4(
      FETCH_DEPTH(t,uvs0.xy),
      FETCH_DEPTH(t,uvs0.zw),
      FETCH_DEPTH(t,uvs1.xy),
      FETCH_DEPTH(t,uvs1.zw)
    );

    return step( vec4(ref), occl );
  }

#endif







float resolveShadowNoFiltering(highp float fragZ, DepthSampler depth,highp vec2 uv ){
    return textureShadow( depth, fragZ, uv );
}


#if __VERSION__ == 300
  // Bilinear is natively supported in ES3
  // Shadowmap filtering must be set by sampler2DShadow filter parameter

  float resolveShadow2x1(highp float fragZ, DepthSampler depth,highp vec2 uv, vec2 mapSize ){
    return textureShadow( depth, fragZ, uv );
  }

  float resolveShadow2x2(highp float fragZ, DepthSampler depth,highp vec2 uv, vec2 mapSize ){
    return textureShadow( depth, fragZ, uv );
  }

#else

  float resolveShadow2x1(highp float fragZ, DepthSampler depth,highp vec2 uv, vec2 mapSize ){

    highp float coordsPx = uv.x*mapSize.x;
    highp float uvMin = floor( coordsPx ) * mapSize.y;
    highp float uvMax = ceil(  coordsPx ) * mapSize.y;

    vec2 occl = textureShadow( depth, fragZ, vec4(
      uvMin,uv.y,
      uvMax,uv.y
    ));

    highp float ratio = coordsPx - uvMin*mapSize.x;
    return ( ratio * occl.y + occl.x ) - ratio * occl.x;

  }

  float resolveShadow2x2(highp float fragZ, DepthSampler depth,highp vec2 uv, vec2 mapSize ){

    highp vec2 coordsPx = uv*mapSize.x;
    highp vec2 uvMin=floor( coordsPx ) *mapSize.y;
    highp vec2 uvMax=ceil(  coordsPx ) *mapSize.y;

    vec4 occl = textureShadow( depth, fragZ, 
      vec4(
        uvMin,
        vec2(uvMax.x,uvMin.y)
      ),
      vec4(
        vec2(uvMin.x,uvMax.y),
        uvMax
      )
    );

    highp vec2 ratio = coordsPx - uvMin*mapSize.x;
    vec2  t = ( ratio.y * occl.zw + occl.xy ) - ratio.y * occl.xy;

    return(ratio.x*t.y+t.x)-ratio.x*t.x;
  }

#endif


float calcLightOcclusions(DepthSampler depth, highp vec3 fragCoord, vec2 mapSize ){
  float s;

  highp vec2 kernelOffset = uShadowKernelRotation * mapSize.y;

  // NO FILTER
  #if shadowFilter( PCFNONE )

    s = resolveShadowNoFiltering( fragCoord.z, depth, fragCoord.xy );
  #endif

  // PCF4x1
  #if shadowFilter( PCF4x1 )

    s = resolveShadowNoFiltering( fragCoord.z, depth, fragCoord.xy + kernelOffset                    );
    s+= resolveShadowNoFiltering( fragCoord.z, depth, fragCoord.xy - kernelOffset                    );
    s+= resolveShadowNoFiltering( fragCoord.z, depth, fragCoord.xy + vec2(-kernelOffset.y,kernelOffset.x)  );
    s+= resolveShadowNoFiltering( fragCoord.z, depth, fragCoord.xy + vec2(kernelOffset.y,-kernelOffset.x)  );
    s /= 4.0;
  #endif

  // PCF4x4
  #if shadowFilter( PCF4x4 )

    s = resolveShadow2x2( fragCoord.z, depth, fragCoord.xy + kernelOffset                         , mapSize );
    s+= resolveShadow2x2( fragCoord.z, depth, fragCoord.xy - kernelOffset                         , mapSize );
    s+= resolveShadow2x2( fragCoord.z, depth, fragCoord.xy + vec2(-kernelOffset.y,kernelOffset.x) , mapSize );
    s+= resolveShadow2x2( fragCoord.z, depth, fragCoord.xy + vec2(kernelOffset.y,-kernelOffset.x) , mapSize );
    s /= 4.0;
  #endif

  // PCF2x2
  #if shadowFilter( PCF2x2 )

    s = resolveShadow2x1( fragCoord.z, depth, fragCoord.xy + kernelOffset , mapSize);
    s+= resolveShadow2x1( fragCoord.z, depth, fragCoord.xy - kernelOffset , mapSize);
    s /= 2.0;
  #endif


  if( any( greaterThan( abs( fragCoord - vec3(.5) ), vec3(.5) ) ) ){
    s = 1.0;
  }

  return s;

}

// float3 ApplyShadowBias(float3 positionWS, float3 normalWS, float3 lightDirection)
// {
//     float invNdotL = 1.0 - saturate(dot(lightDirection, normalWS));
//     float scale = invNdotL * _ShadowBias.y;

//     // normal bias is negative since we want to apply an inset normal offset
//     positionWS = lightDirection * _ShadowBias.xxx + positionWS;
//     positionWS = normalWS * scale.xxx + positionWS;
//     return positionWS;
// }

vec3 calcShadowPosition( vec4 texelBiasVector, mat4 shadowProjection, vec3 worldPos, vec3 worldNormal, float invMapSize )
{
  float WoP = dot( texelBiasVector, vec4( worldPos, 1.0 ) );

  WoP *= .0005+2.0*invMapSize;

  highp vec4 fragCoord = shadowProjection * vec4( worldPos + WoP * worldNormal, 1.0);
  return fragCoord.xyz / fragCoord.w;
}



vec3 calcShadowPosition( ShadowMapData shadowmap, vec3 worldPos, vec3 worldNormal )
{
  float WoP = dot( shadowmap.texelBiasVector, vec4( worldPos, 1.0 ) );

  WoP *= .005+2.0*shadowmap.size.y;

  highp vec4 fragCoord = shadowmap.projection * vec4( worldPos + WoP * worldNormal, 1.0);
  return fragCoord.xyz / fragCoord.w;
}


mediump float SampleShadowAttenuation( ShadowMapData shadowmap, DepthSampler texture, vec3 worldPos, vec3 worldNormal  ) {
  highp vec3 coords = calcShadowPosition( shadowmap, worldPos, worldNormal );
  return calcLightOcclusions( texture, coords, shadowmap.size );
}`,n};S.toString=S;var an=S;S._hmrListeners=[];S.onHmr=function(e){this._hmrListeners.push(e)};S._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};var w=function(e){var n="";return n+="",n};w.toString=w;var hn=w;w._hmrListeners=[];w.onHmr=function(e){this._hmrListeners.push(e)};w._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};var x=function(e){var n="";return n+=`
// post light setup
// todo: should not be
// specularColor += lSpecularColor * input.specularF0;`,n};x.toString=x;var ln=x;x._hmrListeners=[];x.onHmr=function(e){this._hmrListeners.push(e)};x._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};var L=function(e){var n="";return n+=`#ifndef _H_SPECULAR_IBL_
#define _H_SPECULAR_IBL_

`+require("../../includes/ibl-rotation.glsl")()+`
`+require("../../includes/ibl-box-projection.glsl")()+`


#if iblHdrEncoding( RGBM )
  `+require("../../includes/decode-rgbm.glsl")()+`
  #define DECODE_HDR( x ) decodeRGBM16( x )
#elif iblHdrEncoding( RGBE )
  `+require("../../includes/decode-rgbe.glsl")()+`
  #define DECODE_HDR( x ) decodeRGBE( x )
#elif iblHdrEncoding( RGBD )
  `+require("../../includes/decode-rgbd.glsl")()+`
  #define DECODE_HDR( x ) decodeRGBD( x )
#endif

`+require("./ibl-pre-sh.frag")()+`



vec3 ComputeIBLDiffuse( vec3 worldNormal ){
  // TODO: the model should set this varying in vertex shader
  #if perVertexIrrad
    return vIrradiance;
  #else
    return SampleSH(IblRotateDir(worldNormal), uSHCoeffs )*iblIntensities().x;
  #endif
}
#endif

/* =========================================================
  OCTA
========================================================= */
#if iblFormat( OCTA )
  

  #define OCTA_LEVELS iblNumMipLevel()
  #define OCTA_MAXLOD (OCTA_LEVELS-1.0)

  `+require("../../includes/octwrap-decode.glsl")()+`

  uniform sampler2D tEnv;

  #define SpecularIBL( skyDir, perceptualRoughness, wpos ) SampleIBL( skyDir, perceptualRoughness, wpos )*iblIntensities().y

  const vec2 _IBL_UVM = vec2(
    0.25*(254.0/256.0),
    0.125*0.5*(254.0/256.0)
  );

  vec3 SampleIBL( vec3 skyDir, float perceptualRoughness, vec3 wpos)
  {
    skyDir = IblBoxProjection(skyDir, wpos);
    skyDir = IblRotateDir(skyDir);
    vec2 uvA = octwrapDecode( skyDir );
    
    float lodLevel   = OCTA_MAXLOD*perceptualRoughness * (2.0 - perceptualRoughness);
    float frac = fract(lodLevel);

    uvA = uvA * _IBL_UVM + vec2(
      0.5,
      0.125*0.5 + 0.125 * ( lodLevel - frac )
    );

    #if glossNearest

      return DECODE_HDR( texture2D(tEnv,uvA) );

    #else

      vec2 uvB=uvA+vec2(0.0,0.125);
      return  mix(
        DECODE_HDR( texture2D(tEnv,uvA) ),
        DECODE_HDR( texture2D(tEnv,uvB) ),
        frac
      );

    #endif

  }


/* =========================================================
  PMREM
========================================================= */
#elif iblFormat( PMREM ) && __VERSION__ == 300

  // assume 256 to 16 mip levels
  #define PMREM_LEVELS iblNumMipLevel()
  #define PMREM_MAXLOD (PMREM_LEVELS-1.0)
  
  uniform samplerCube tEnv;

  #define SpecularIBL( skyDir, perceptualRoughness, wpos ) SampleIBLPMRem( skyDir, perceptualRoughness, wpos )*iblIntensities().y

  vec3 SampleIBLPMRem( vec3 skyDir, float perceptualRoughness, vec3 wpos)
  {
    skyDir = IblBoxProjection(skyDir, wpos);
    skyDir = IblRotateDir(skyDir);

    float lodLevel   = PMREM_MAXLOD*perceptualRoughness * (2.0 - perceptualRoughness);
    // float lodLevel   = PMREM_MAXLOD*perceptualRoughness;
    return DECODE_HDR( textureLod( tEnv, skyDir, lodLevel) );
  }


#endif



`,n};L.toString=L;var dn=L;L._hmrListeners=[];L.onHmr=function(e){this._hmrListeners.push(e)};L._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};var C=function(e){var n="";return n+="EnvironmentBRDF( brdfData, geometryData, lightingData, surface.occlusion );",n};C.toString=C;var cn=C;C._hmrListeners=[];C.onHmr=function(e){this._hmrListeners.push(e)};C._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};class I extends F{constructor(n,t){super(!0,!0),this.lights=[],this.shadowIndices=[],this.preCodeTemplate=t,this.codeTemplate=n}addLight(n){this.lights.indexOf(n)===-1&&(this.lights.push(n),this.shadowIndices.push(-1),this.invalidateCode())}removeLight(n){const t=this.lights.indexOf(n);t>-1&&(this.lights.splice(t,1),this.shadowIndices.splice(t,1),this.invalidateCode())}_genCode(n){if(this.lights.length==0)return;let t=this.preCodeTemplate({count:this.lights.length});n.add("pf",t),t="";for(var s=0;s<this.lights.length;s++)t+=this.genCodePerLights(this.lights[s],s,this.shadowIndices[s]);n.add("lightsf",t)}}class k extends I{setup(n){for(var t=0;t<this.shadowIndices.length;t++){var s=this.shadowIndices[t];if(s>-1){var i=this.lights[t].getShadowmap();n["tShadowMap"+s](i)}}}}class un extends k{constructor(n,t){super(n,t),this.type=T.DIRECTIONAL,this._directions=null,this._colors=null}genCodePerLights(n,t,s){var i={index:t,shadowIndex:s};return this.codeTemplate(i)}allocate(n){(this._colors===null||this._colors.length/4!==n)&&(this._directions=new Float32Array(n*3),this._colors=new Float32Array(n*4))}prepare(n,t){var s=this.lights;this.allocate(s.length);for(var i=0;i<s.length;i++){var o=s[i];if(this._directions.set(o._wdir,i*3),this._colors.set(o._color,i*4),this._colors[i*4+3]=o.iblShadowing,o.castShadows){o.initShadowmap(n);var h=t.shadowChunk.addLight(o);this.shadowIndices[i]!==h&&this.invalidateCode(),this.shadowIndices[i]=h}else this.shadowIndices[i]=-1}this._invalid=!0}setup(n){this.lights.length>0&&(super.setup(n),n.uLDirDirections(this._directions),n.uLDirColors(this._colors),this._invalid=!1)}}class fn extends k{constructor(n,t){super(n,t),this.type=T.SPOT,this._positions=null,this._directions=null,this._colors=null,this._attenuation=null}genCodePerLights(n,t,s){var i={index:t,shadowIndex:s,infinite:n.radius<=0};return this.codeTemplate(i)}allocate(n){(this._colors===null||this._colors.length/4!==n)&&(this._positions=new Float32Array(n*3),this._directions=new Float32Array(n*3),this._colors=new Float32Array(n*4),this._attenuation=new Float32Array(n*4))}prepare(n,t){const s=this.lights;this.allocate(s.length);for(var i=0;i<s.length;i++){var o=s[i];if(this._positions.set(o._wposition,i*3),this._directions.set(o._wdir,i*3),this._colors.set(o._color,i*4),this._attenuation.set(o._attenuationData,i*4),this._colors[i*4+3]=o.iblShadowing,o.castShadows){o.initShadowmap(n);var h=t.shadowChunk.addLight(o);this.shadowIndices[i]!==h&&this.invalidateCode(),this.shadowIndices[i]=h}else this.shadowIndices[i]=-1}this._invalid=!0}setup(n){this.lights.length>0&&(super.setup(n),n.uLSpotPositions(this._positions),n.uLSpotDirections(this._directions),n.uLSpotColors(this._colors),n.uLSpotAttenuation(this._attenuation),this._invalid=!1)}}class pn extends I{constructor(n,t){super(n,t),this.type=T.POINT,this._colors=null,this._positions=null}genCodePerLights(n,t,s){var i={index:t,shadowIndex:s,infinite:n.radius<=0};return this.codeTemplate(i)}allocate(n){(this._colors===null||this._colors.length/3!==n)&&(this._colors=new Float32Array(n*3),this._positions=new Float32Array(n*4))}prepare(n,t){const s=this.lights;this.allocate(s.length);for(var i=0;i<s.length;i++){var o=s[i];this._colors.set(o._color,i*3),this._positions.set(o._wposition,i*4),this._positions[i*4+3]=1/(o.radius*o.radius),this.shadowIndices[i]=-1}this._invalid=!0}setup(n){this.lights.length>0&&(super.setup(n),n.uLPointColors(this._colors),n.uLPointPositions(this._positions),this._invalid=!1)}}const E=N.create(),u=d.create(),gn=["OCTA","PMREM"],mn=["SH9","SH7"],vn=["RGBM","RGBD","RGBE"];class _n extends I{constructor(n,t){super(n,t),this.type=T.IBL,this.enableRotation=new l("enableRotation"),this.enableBoxProjection=new l("enableBoxProjection"),this.iblFormat=new c("iblFormat",gn),this.shFormat=new c("shFormat",mn),this.hdrEncoding=new c("iblHdrEncoding",vn),this.intensities=new r("iblIntensities",2),this.mipLevels=new r("iblNumMipLevel",1),this.mipLevelsValue=this.mipLevels.attachConstant(5),this.intensitiesValue=this.intensities.attachConstant([1,1]),this.addChild(this.enableRotation),this.addChild(this.enableBoxProjection),this.addChild(this.iblFormat),this.addChild(this.shFormat),this.addChild(this.hdrEncoding),this.addChild(this.mipLevels),this.addChild(this.intensities)}genCodePerLights(n,t,s){return this.codeTemplate(this)}prepare(n,t){const s=this.lights[0];s&&(this.enableRotation.set(s.enableRotation),this.enableBoxProjection.set(s.enableBoxProjection),this.iblFormat.set(s.iblFormat),this.shFormat.set(s.shFormat),this.hdrEncoding.set(s.hdrEncoding),this.mipLevelsValue.set(s.mipLevels),this.intensitiesValue.set([s.intensity*s.ambiantIntensity,s.intensity*s.specularIntensity]))}addLight(n){if(this.lights.length>0)throw new Error("IblModel support only one Ibl Light");super.addLight(n)}setup(n){if(this.lights.length>0){const t=this.lights[0];n.tEnv(t.env),n.uSHCoeffs(t.sh),t.enableRotation&&(N.fromMat4(E,t._wmatrix),N.invert(E,E),n.uEnvMatrix(E)),t.enableBoxProjection&&(d.scaleAndAdd(u,t._wposition,t.boxProjectionSize,-.5),n.uBoxProjMin(u),d.scaleAndAdd(u,t._wposition,t.boxProjectionSize,.5),n.uBoxProjMax(u),d.add(u,t._wposition,t.boxProjectionOffset),n.uBoxProjPos(u))}}}class Sn{constructor(){this.dirPreCode=nn,this.spotPreCode=en,this.pointPreCode=tn,this.dirLightCode=sn,this.spotLightCode=on,this.pointLightCode=rn,this.shadPreCode=an,this.preLightCode=hn,this.postLightCode=ln,this.iblPreCode=dn,this.iblCode=cn}}class wn{constructor(n){n===void 0&&(n=new Sn),this.modelCode=n,this._datas={},this._dataList=[],this._setup=null,this.preLightsChunk=new xn(this.modelCode.preLightCode),this.postLightsChunk=new Ln(this.modelCode.postLightCode),this.shadowChunk=new Cn(this),this.shadowFilter=new c("shadowFilter",Y),this.iblShadowing=new l("iblShadowing",!1),this.registerLightModel(new pn(n.pointLightCode,n.pointPreCode)),this.registerLightModel(new fn(n.spotLightCode,n.spotPreCode)),this.registerLightModel(new un(n.dirLightCode,n.dirPreCode)),this.registerLightModel(new _n(n.iblCode,n.iblPreCode))}registerLightModel(n){this._datas[n.type]=n,this._dataList.push(n)}getLightSetup(){if(this._setup===null)throw new Error("LightSetup is null");return this._setup}setLightSetup(n){this._setup=n}add(n){var t=this._datas[n._type];t.addLight(n)}remove(n){var t=this._datas[n._type];t.removeLight(n)}prepare(n){this.shadowChunk.shadowCount=0;for(var t=0;t<this._dataList.length;t++)this._dataList[t].prepare(n,this);this.shadowChunk.check()}getChunks(){const n=[this.iblShadowing,this.shadowFilter,this.shadowChunk,this.preLightsChunk];for(var t=0;t<this._dataList.length;t++)n.push(this._dataList[t]);return n.push(this.postLightsChunk),n}}class xn extends F{constructor(n){super(!0,!1),this.code=n}_genCode(n){n.add("lightsf",this.code(this))}}class Ln extends F{constructor(n){super(!0,!1),this.code=n}_genCode(n){n.add("lightsf",this.code(this))}}const H=4,z=Math.PI/4;class Cn extends F{constructor(n){super(!0,!0),this.lightModel=n,this.shadowCount=0,this.genCount=0,this._matrices=new Float32Array(H*16),this._texelBiasVector=new Float32Array(H*4),this._shadowmapSizes=new Float32Array(H*2),this._umatrices=null,this._utexelBiasVector=null,this._ushadowmapSizes=null}_genCode(n){this.shadowCount>0&&n.add("pf",this.lightModel.modelCode.shadPreCode(this))}addLight(n){const t=this.shadowCount,s=this.lightModel.getLightSetup();this.shadowCount++,this._matrices.set(n.getShadowProjection(s.bounds),t*16),this._texelBiasVector.set(n.getTexelBiasVector(),t*4);const i=n.shadowmapSize;if(this._shadowmapSizes[t*2+0]=i,this._shadowmapSizes[t*2+1]=1/i,t===0){var o=n.hasDepthShadowmap();s.depthFormat.set(o?"D_DEPTH":"D_RGB")}return t}check(){this.genCount!==this.shadowCount&&(this.genCount=this.shadowCount,this._umatrices=new Float32Array(this._matrices.buffer,0,this.shadowCount*16),this._utexelBiasVector=new Float32Array(this._texelBiasVector.buffer,0,this.shadowCount*4),this._ushadowmapSizes=new Float32Array(this._shadowmapSizes.buffer,0,this.shadowCount*2),this.invalidateCode()),this._invalid=!0}setup(n){this.shadowCount>0&&(n.uShadowMatrices(this._umatrices),n.uShadowTexelBiasVector(this._utexelBiasVector),n.uShadowMapSize(this._ushadowmapSizes),n.uShadowKernelRotation!==void 0&&n.uShadowKernelRotation(1*Math.cos(z),1*Math.sin(z)),this._invalid=!1)}}const Dn=["D_RGB","D_DEPTH"];class On{constructor(){this._lights=[],this._models=[],this._modelsMap={},this.depthFormat=new c("depthFormat",Dn),this.bounds=new Q,this.stdModel=new wn,this._registerModel("std",this.stdModel)}add(n){if(this._lights.indexOf(n)===-1){this._lights.push(n);for(var t=0;t<this._models.length;t++)this._models[t].add(n)}}remove(n){var t=this._lights.indexOf(n);if(t>-1)for(this._lights.splice(t,1),t=0;t<this._models.length;t++)this._models[t].remove(n)}prepare(n){for(var t=0;t<this._models.length;t++)this._models[t].prepare(n)}getChunks(n){n===void 0&&(n="std");var t=this._modelsMap[n].getChunks();return t.unshift(this.depthFormat),t}_registerModel(n,t){if(this._modelsMap[n]===void 0){this._modelsMap[n]=t,this._models.push(t),t.setLightSetup(this);for(var s=0;s<this._lights.length;s++)t.add(this._lights[s])}}}var D=function(e){var n="";return n+=`#pragma SLOT version

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
}`,n};D.toString=D;var Pn=D;D._hmrListeners=[];D.onHmr=function(e){this._hmrListeners.push(e)};D._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};var P=function(e){var n="";return n+=`#pragma SLOT version

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



}`,n};P.toString=P;var Mn=P;P._hmrListeners=[];P.onHmr=function(e){this._hmrListeners.push(e)};P._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};const An=["GAMMA_NONE","GAMMA_STD","GAMMA_2_2","GAMMA_TB"];var M=function(e){var n="";return n+=`
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

}`,n};M.toString=M;var bn=M;M._hmrListeners=[];M.onHmr=function(e){this._hmrListeners.push(e)};M._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};var A=function(e){var n="";return n+=`
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
  
}`,n};A.toString=A;var yn=A;A._hmrListeners=[];A.onHmr=function(e){this._hmrListeners.push(e)};A._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};var y;(function(e){e.NONE="NONE",e.METALNESS="METALNESS",e.SPECULAR="SPECULAR"})(y||(y={}));class W extends F{constructor(){super(!0,!1),this.type=y.NONE,this.pbrInputType=new c("pbrWorkflow",["SPECULAR","METALNESS"]),this.addChild(this.pbrInputType)}_genCode(n){n.add("pbrsurface","PbrSurface surface = DefaultPbrSurface;")}}class Fn extends W{constructor(){super(),this.type=y.METALNESS,this.pbrInputType.set(this.type),this.addChild(this.baseColor=new r("baseColor",3)),this.addChild(this.baseColorFactor=new r("baseColorFactor",3)),this.addChild(this.metalness=new r("metalness",1)),this.addChild(this.metalnessFactor=new r("metalnessFactor",1)),this.addChild(this.roughness=new r("roughness",1)),this.addChild(this.roughnessFactor=new r("roughnessFactor",1))}_genCode(n){n.add("pbrsurface",bn())}}class Tn extends W{constructor(){super(),this.type=y.SPECULAR,this.pbrInputType.set(this.type),this.addChild(this.baseColor=new r("diffuse",3)),this.addChild(this.baseColorFactor=new r("diffuseFactor",3)),this.addChild(this.specular=new r("specular",3)),this.addChild(this.specularFactor=new r("specularFactor",3)),this.addChild(this.glossiness=new r("glossiness",1)),this.addChild(this.glossinessFactor=new r("glossinessFactor",1))}_genCode(n){n.add("pbrsurface",yn())}}const B=U.create(),V="std";class G extends q{constructor(n="gltf-std-pass"){super({uid:V,vert:Pn(),frag:Mn()});const t=this.inputs;t.add(this.version=new $),t.add(this.precision=new X("highp")),t.add(this.shaderid=new l("id_"+V,!0)),t.add(this.alpha=new r("alpha",1)),t.add(this.alphaFactor=new r("alphaFactor",1)),t.add(this.alphaCutoff=new r("alphaCutoff",1)),t.add(this.emissive=new r("emissive",3)),t.add(this.emissiveFactor=new r("emissiveFactor",3)),t.add(this.normal=new r("normal",3)),t.add(this.normalScale=new r("normalScale",1)),t.add(this.occlusion=new r("occlusion",1)),t.add(this.occlusionStrength=new r("occlusionStrength",1)),t.add(this.iGamma=new r("gamma",1)),t.add(this.iExposure=new r("exposure",1)),t.add(this.alphaMode=new c("alphaMode",j)),t.add(this.gammaMode=new c("gammaMode",An)).set("GAMMA_2_2"),t.add(this.doubleSided=new l("doubleSided",!1)),t.add(this.perVertexIrrad=new l("perVertexIrrad",!1)),t.add(this.horizonFading=new l("horizonFading",!1)),t.add(this.glossNearest=new l("glossNearest",!1))}setSurface(n){this.surface&&this.inputs.remove(this.surface),this.surface=n,this.inputs.add(this.surface)}setLightSetup(n){this.inputs.addChunks(n.getChunks("std"))}prepare(n,t,s){n.uMVP&&(s.modelViewProjectionMatrix(B,t._wmatrix),n.uMVP(B)),n.uWorldMatrix&&n.uWorldMatrix(t._wmatrix),n.uVP&&n.uVP(s._viewProj),n.uCameraPosition&&n.uCameraPosition(s._wposition)}}class In extends G{constructor(n="gltf-std-pass"){super(n);var t=new Tn;this.setSurface(t)}}class Rn extends G{constructor(n="gltf-std-pass"){super(n);var t=new Fn;this.setSurface(t)}}export{Nn as I,On as L,Rn as S,In as a};
