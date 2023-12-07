import{d as I,e as z,v as a,F as A,E,I as N}from"./ShaderVersion-75aae7d1.js";import{D as V,B as W}from"./Bounds-c261caf0.js";import{N as G}from"./index-099e42fb.js";const j=["PCFNONE","PCF4x1","PCF4x4","PCF2x2"];var h=function(n){var t="";return t+="#define NUM_D_LIGHTS "+n.count+`

`,n.count>0&&(t+=`
uniform vec3 uLDirDirections [NUM_D_LIGHTS];
uniform vec4 uLDirColors     [NUM_D_LIGHTS]; // rgb + iblShadowing
`),t+=`

`,t};h.toString=h;var U=h;h._hmrListeners=[];h.onHmr=function(n){this._hmrListeners.push(n)};h._triggerHmr=function(){for(const n of this._hmrListeners)n(this)};var l=function(n){var t="";return t+="#define NUM_S_LIGHTS "+n.count+`

`,n.count>0&&(t+=`
uniform vec3 uLSpotPositions  [NUM_S_LIGHTS];
uniform vec3 uLSpotDirections [NUM_S_LIGHTS];
uniform vec4 uLSpotColors     [NUM_S_LIGHTS]; // rgb + iblShadowing
uniform vec4 uLSpotAttenuation[NUM_S_LIGHTS]; 
`),t+=`

`,t};l.toString=l;var X=l;l._hmrListeners=[];l.onHmr=function(n){this._hmrListeners.push(n)};l._triggerHmr=function(){for(const n of this._hmrListeners)n(this)};var d=function(n){var t="";return t+="#define NUM_P_LIGHTS "+n.count+`

`,n.count>0&&(t+=`
uniform vec4 uLPointPositions  [NUM_P_LIGHTS]; //w is radius
uniform vec3 uLPointFalloff    [NUM_P_LIGHTS];
uniform vec3 uLPointColors     [NUM_P_LIGHTS]; // rgb
`),t+=`

`,t};d.toString=d;var $=d;d._hmrListeners=[];d.onHmr=function(n){this._hmrListeners.push(n)};d._triggerHmr=function(){for(const n of this._hmrListeners)n(this)};var c=function(n){var t="";return t+=`
{
  Light light;

  light.direction = uLDirDirections  [`+n.index+`]    ;
  light.color     = uLDirColors      [`+n.index+`].rgb;
  light.attenuation = 1.0;

  `,n.shadowIndex>-1?t+=`
    ShadowMapData shadowmapData = GET_SHADOWMAP_DATA( `+n.shadowIndex+` );
    light.shadowAttenuation = SampleShadowAttenuation(shadowmapData, tShadowMap`+n.shadowIndex+`, geometryData.worldPos, geometryData.worldNrm );
  `:t+=`
    light.shadowAttenuation = 1.0;
  `,t+=`

  LightingPhysicallyBased(brdfData,  geometryData, lightingData, light );
}`,t};c.toString=c;var q=c;c._hmrListeners=[];c.onHmr=function(n){this._hmrListeners.push(n)};c._triggerHmr=function(){for(const n of this._hmrListeners)n(this)};var u=function(n){var t="";return t+=`
{
  vec3 lightPositionWS                    = uLSpotPositions  [`+n.index+`]    ;
  mediump vec3 spotDirection              = uLSpotDirections [`+n.index+`]    ;
  mediump vec3 lightColor                 = uLSpotColors     [`+n.index+`].rgb;
  mediump vec4 distanceAndSpotAttenuation = uLSpotAttenuation[`+n.index+`]    ;

  vec3 lightVector = lightPositionWS - geometryData.worldPos;
  float distanceSqr = dot(lightVector, lightVector);

  mediump vec3 lightDirection = vec3(lightVector * inversesqrt(distanceSqr));

  mediump float attenuation = AngleAttenuation(spotDirection.xyz, lightDirection, distanceAndSpotAttenuation.zw);
  `,n.infinite?t+=`
    attenuation *= DistanceAttenuation(distanceSqr);
  `:t+=`
    attenuation *= DistanceAttenuationRange(distanceSqr, distanceAndSpotAttenuation.xy);
  `,t+=`


  Light light;
  light.direction = lightDirection;
  light.attenuation = attenuation;
  light.color = lightColor;

  `,n.shadowIndex>-1?t+=`
    ShadowMapData shadowmapData = GET_SHADOWMAP_DATA( `+n.shadowIndex+` );
    light.shadowAttenuation = SampleShadowAttenuation(shadowmapData, tShadowMap`+n.shadowIndex+`, geometryData.worldPos, geometryData.worldNrm );
  `:t+=`
    light.shadowAttenuation = 1.0;
  `,t+=`
  
  // TODO store ibl contrib in separate struct
  // #if iblShadowing
  //   float sDamp = uLSpotColors[`+n.index+`].a;
  //   specularColor *= mix( sDamp, 1.0, shOccl );
  // #endif

  
  // mediump vec3 attenuatedLightColor = light.color * (light.attenuation * light.shadowAttenuation);
  // LS_DIFFUSE  += LightingLambert(attenuatedLightColor, light.direction, geometryData.worldNrm);
  // LS_SPECULAR += LightingSpecular(attenuatedLightColor, light.direction, geometryData.worldNrm, geometryData.viewDir, specularGloss, smoothness);

  LightingPhysicallyBased(brdfData,  geometryData, lightingData, light );
}`,t};u.toString=u;var Z=u;u._hmrListeners=[];u.onHmr=function(n){this._hmrListeners.push(n)};u._triggerHmr=function(){for(const n of this._hmrListeners)n(this)};var f=function(n){var t="";return t+=`
{
  vec3 lightPositionWS                    = uLPointPositions [`+n.index+`].xyz;
  mediump vec3 lightColor                 = uLPointColors    [`+n.index+`].rgb;

  vec3 lightVector = lightPositionWS - geometryData.worldPos;
  float distanceSqr = dot(lightVector, lightVector);

  mediump vec3 lightDirection = vec3(lightVector * inversesqrt(distanceSqr));

  `,n.infinite?t+=`
    mediump float attenuation = DistanceAttenuation(distanceSqr);
  `:t+=`
    float oneOverRangeSquared = uLPointPositions[`+n.index+`].w;
    mediump float attenuation = DistanceAttenuationRange(distanceSqr, vec2(oneOverRangeSquared, 0.0));
  `,t+=`


  Light light;
  light.direction = lightDirection;
  light.attenuation = attenuation;
  light.color = lightColor;
  light.shadowAttenuation = 1.0;
  
  LightingPhysicallyBased(brdfData,  geometryData, lightingData, light );
}`,t};f.toString=f;var K=f;f._hmrListeners=[];f.onHmr=function(n){this._hmrListeners.push(n)};f._triggerHmr=function(){for(const n of this._hmrListeners)n(this)};var p=function(n){var t="";t+=`

#define SHADOW_COUNT `+n.shadowCount+`

#if __VERSION__ == 300
  precision lowp sampler2DShadow;

  #define DepthSampler sampler2DShadow
  
#else
  #define DepthSampler sampler2D
#endif


`;for(var e=0;e<n.shadowCount;e++)t+=`
  uniform DepthSampler tShadowMap`+e+`;
`;return t+=`




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
}`,t};p.toString=p;var J=p;p._hmrListeners=[];p.onHmr=function(n){this._hmrListeners.push(n)};p._triggerHmr=function(){for(const n of this._hmrListeners)n(this)};var _=function(n){var t="";return t+="",t};_.toString=_;var Q=_;_._hmrListeners=[];_.onHmr=function(n){this._hmrListeners.push(n)};_._triggerHmr=function(){for(const n of this._hmrListeners)n(this)};var g=function(n){var t="";return t+=`
// post light setup
// todo: should not be
// specularColor += lSpecularColor * input.specularF0;`,t};g.toString=g;var Y=g;g._hmrListeners=[];g.onHmr=function(n){this._hmrListeners.push(n)};g._triggerHmr=function(){for(const n of this._hmrListeners)n(this)};var v=function(n){var t="";return t+=`
#ifndef _H_OCTWRAP_DECODE_
#define _H_OCTWRAP_DECODE_

vec2 octwrapDecode( vec3 v ) {
  // Project the sphere onto the octahedron, and then onto the xy plan
  vec2 p = v.xy / dot(  abs( v ) , vec3(1.0) );
  p = vec2( p.x+p.y-1.0, p.x-p.y );

  if( v.z < 0.0 )
    p.x *= -1.0;

  // p.x *= sign( v.z );
  return p;
}

#endif`,t};v.toString=v;var tt=v;v._hmrListeners=[];v.onHmr=function(n){this._hmrListeners.push(n)};v._triggerHmr=function(){for(const n of this._hmrListeners)n(this)};var m=function(n){var t="";return t+=`#ifndef _H_SAMPLE_SH_
#define _H_SAMPLE_SH_

// ================================
// compute Spherical Harmonics
// ================================
//
// 5.3.4.1
// Diffuse BRDF integration
// https://google.github.io/filament/Filament.md.html#lighting/imagebasedlights/distantlightprobes
vec3 SampleSH9( vec3 Normal, vec3 shCoeffs[9] )
{

  vec3 n = Normal;
  vec3 value = 
        shCoeffs[0]
      + shCoeffs[1] * (n.y)
      + shCoeffs[2] * (n.z)
      + shCoeffs[3] * (n.x)
      + shCoeffs[4] * (n.y * n.x)
      + shCoeffs[5] * (n.y * n.z)
      + shCoeffs[6] * (3.0 * n.z * n.z - 1.0)
      + shCoeffs[7] * (n.z * n.x)
      + shCoeffs[8] * (n.x * n.x - n.y * n.y);

  return max(vec3(0.0), value);

}


#endif
`,t};m.toString=m;var nt=m;m._hmrListeners=[];m.onHmr=function(n){this._hmrListeners.push(n)};m._triggerHmr=function(){for(const n of this._hmrListeners)n(this)};var S=function(n){var t="";return t+=`#ifndef _H_SAMPLE_SH_
#define _H_SAMPLE_SH_

// ================================
// compute Spherical Harmonics
// ================================
//
// "Stupid Spherical Harmonics (SH) Tricks"
// http://www.ppsloan.org/publications/StupidSH36.pdf
//
//
vec3 SampleSH7( vec3 Normal, vec4 shCoefs[7] )
{
  Normal.xz = Normal.zx;
  vec4 NormalVector = vec4(Normal, 1.0);

  // todo transpose coeffs directly
  // NormalVector.xyz = NormalVector.zyx;

  vec3 X0, X1, X2;
  X0.x = dot( shCoefs[0].xyz, Normal) + shCoefs[0].w;
  X0.y = dot( shCoefs[1].xyz, Normal) + shCoefs[1].w;
  X0.z = dot( shCoefs[2].xyz, Normal) + shCoefs[2].w;

  vec4 vB = NormalVector.zyxx * NormalVector.yxxz;
  X1.x = dot( shCoefs[3].xyz, vB.xyz) + (shCoefs[3].w * vB.w);
  X1.y = dot( shCoefs[4].xyz, vB.xyz) + (shCoefs[4].w * vB.w);
  X1.z = dot( shCoefs[5].xyz, vB.xyz) + (shCoefs[5].w * vB.w);

  float vC = NormalVector.z * NormalVector.z - NormalVector.y * NormalVector.y;
  X2 =  shCoefs[6].xyz * vC;

  return ( X0 + X1 + X2 );
//  return max( vec3(0.0) , X0 + X1 + X2 );
}

#endif
`,t};S.toString=S;var et=S;S._hmrListeners=[];S.onHmr=function(n){this._hmrListeners.push(n)};S._triggerHmr=function(){for(const n of this._hmrListeners)n(this)};var w=function(n){var t="";return t+=`#ifndef _H_IBL_PRE_F_SH_
#define _H_IBL_PRE_F_SH_

  #if perVertexIrrad
    IN vec3 vIrradiance;
  #else
  
    #if shFormat( SH7 )
      uniform vec4 uSHCoeffs[7];
      `+et()+`
      #define SampleSH(dir, coeffs) SampleSH7(dir, coeffs)
    #endif
    
    #if shFormat( SH9 )
      uniform vec3 uSHCoeffs[9];
      `+nt()+`
      #define SampleSH(dir, coeffs) SampleSH9(dir, coeffs)
    #endif

  #endif

#endif
`,t};w.toString=w;var it=w;w._hmrListeners=[];w.onHmr=function(n){this._hmrListeners.push(n)};w._triggerHmr=function(){for(const n of this._hmrListeners)n(this)};var x=function(n){var t="";return t+=`
#ifndef _H_DECODE_RGBD_
#define _H_DECODE_RGBD_

vec3 decodeRGBD(vec4 rgbd)
{
  return rgbd.rgb / rgbd.a;
}

#endif`,t};x.toString=x;var ot=x;x._hmrListeners=[];x.onHmr=function(n){this._hmrListeners.push(n)};x._triggerHmr=function(){for(const n of this._hmrListeners)n(this)};var L=function(n){var t="";return t+=`
#ifndef _H_DECODE_RGBE_
#define _H_DECODE_RGBE_

vec3 decodeRGBE( vec4 hdr ){
  return hdr.rgb * exp2( (hdr.a*255.0)-128.0 );
  // return hdr.rgb * pow( 2.0, (hdr.a*255.0)-128.0 );
}

#endif`,t};L.toString=L;var st=L;L._hmrListeners=[];L.onHmr=function(n){this._hmrListeners.push(n)};L._triggerHmr=function(){for(const n of this._hmrListeners)n(this)};var C=function(n){var t="";return t+=`
#ifndef _H_DECODE_RGBM_
#define _H_DECODE_RGBM_

vec3 decodeRGBM16( vec4 rgbm ){
  vec3 c = ( rgbm.rgb * 16.0 * rgbm.a );
  return c*c;
}

#endif`,t};C.toString=C;var rt=C;C._hmrListeners=[];C.onHmr=function(n){this._hmrListeners.push(n)};C._triggerHmr=function(){for(const n of this._hmrListeners)n(this)};var D=function(n){var t="";return t+=`#ifndef _H_IBLBOXPROJECTION_
#define _H_IBLBOXPROJECTION_


#if enableBoxProjection
  uniform vec3 uBoxProjMin;
  uniform vec3 uBoxProjMax;
  uniform vec3 uBoxProjPos;

  vec3 _iblBoxProj( vec3 reflectionWS, vec3 positionWS ) {

    vec3 boxMinMax = vec3(
      (reflectionWS.x > 0.0) ? uBoxProjMax.x : uBoxProjMin.x,
      (reflectionWS.y > 0.0) ? uBoxProjMax.y : uBoxProjMin.y,
      (reflectionWS.z > 0.0) ? uBoxProjMax.z : uBoxProjMin.z
    );

    vec3 rbMinMax = (boxMinMax - positionWS) / reflectionWS;

    float fa = min(min(rbMinMax.x, rbMinMax.y), rbMinMax.z);

    vec3 worldPos = positionWS - uBoxProjPos;

    vec3 result = worldPos + reflectionWS * fa;
    return result;
  }

#endif

vec3 IblBoxProjection(vec3 reflectionWS, vec3 positionWS ){
  #if enableBoxProjection
  return _iblBoxProj( reflectionWS, positionWS );
  #else
  return reflectionWS;
  #endif
}

#endif`,t};D.toString=D;var at=D;D._hmrListeners=[];D.onHmr=function(n){this._hmrListeners.push(n)};D._triggerHmr=function(){for(const n of this._hmrListeners)n(this)};var P=function(n){var t="";return t+=`#ifndef _H_IBLROTATION_
#define _H_IBLROTATION_


#if enableRotation
  uniform mat3 uEnvMatrix;
#endif

vec3 IblRotateDir(vec3 dir){
  #if enableRotation
  return uEnvMatrix * dir;
  #else
  return dir;
  #endif
}

#endif`,t};P.toString=P;var ht=P;P._hmrListeners=[];P.onHmr=function(n){this._hmrListeners.push(n)};P._triggerHmr=function(){for(const n of this._hmrListeners)n(this)};var H=function(n){var t="";return t+=`#ifndef _H_SPECULAR_IBL_
#define _H_SPECULAR_IBL_

`+ht()+`
`+at()+`


#if iblHdrEncoding( RGBM )
  `+rt()+`
  #define DECODE_HDR( x ) decodeRGBM16( x )
#elif iblHdrEncoding( RGBE )
  `+st()+`
  #define DECODE_HDR( x ) decodeRGBE( x )
#elif iblHdrEncoding( RGBD )
  `+ot()+`
  #define DECODE_HDR( x ) decodeRGBD( x )
#endif

`+it()+`



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

  `+tt()+`

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



`,t};H.toString=H;var lt=H;H._hmrListeners=[];H.onHmr=function(n){this._hmrListeners.push(n)};H._triggerHmr=function(){for(const n of this._hmrListeners)n(this)};var y=function(n){var t="";return t+="EnvironmentBRDF( brdfData, geometryData, lightingData, surface.occlusion );",t};y.toString=y;var dt=y;y._hmrListeners=[];y.onHmr=function(n){this._hmrListeners.push(n)};y._triggerHmr=function(){for(const n of this._hmrListeners)n(this)};var R;(function(n){n[n.UNKNOWN=0]="UNKNOWN",n[n.DIRECTIONAL=1]="DIRECTIONAL",n[n.SPOT=2]="SPOT",n[n.POINT=4]="POINT",n[n.IBL=5]="IBL"})(R||(R={}));const b=R;class F extends I{constructor(t,e){super(!0,!0),this.lights=[],this.shadowIndices=[],this.preCodeTemplate=e,this.codeTemplate=t}addLight(t){this.lights.indexOf(t)===-1&&(this.lights.push(t),this.shadowIndices.push(-1),this.invalidateCode())}removeLight(t){const e=this.lights.indexOf(t);e>-1&&(this.lights.splice(e,1),this.shadowIndices.splice(e,1),this.invalidateCode())}_genCode(t){if(this.lights.length==0)return;let e=this.preCodeTemplate({count:this.lights.length});t.add("pf",e),e="";for(var i=0;i<this.lights.length;i++)e+=this.genCodePerLights(this.lights[i],i,this.shadowIndices[i]);t.add("lightsf",e)}}class k extends F{setup(t){for(var e=0;e<this.shadowIndices.length;e++){var i=this.shadowIndices[e];if(i>-1){var o=this.lights[e].getShadowmap();t["tShadowMap"+i](o)}}}}class ct extends k{constructor(t,e){super(t,e),this.type=b.DIRECTIONAL,this._directions=null,this._colors=null}genCodePerLights(t,e,i){var o={index:e,shadowIndex:i};return this.codeTemplate(o)}allocate(t){(this._colors===null||this._colors.length/4!==t)&&(this._directions=new Float32Array(t*3),this._colors=new Float32Array(t*4))}prepare(t,e){var i=this.lights;this.allocate(i.length);for(var o=0;o<i.length;o++){var s=i[o];if(this._directions.set(s._wdir,o*3),this._colors.set(s._color,o*4),this._colors[o*4+3]=s.iblShadowing,s.castShadows){s.initShadowmap(t);var M=e.shadowChunk.addLight(s);this.shadowIndices[o]!==M&&this.invalidateCode(),this.shadowIndices[o]=M}else this.shadowIndices[o]=-1}this._invalid=!0}setup(t){this.lights.length>0&&(super.setup(t),t.uLDirDirections(this._directions),t.uLDirColors(this._colors),this._invalid=!1)}}class ut extends k{constructor(t,e){super(t,e),this.type=b.SPOT,this._positions=null,this._directions=null,this._colors=null,this._attenuation=null}genCodePerLights(t,e,i){var o={index:e,shadowIndex:i,infinite:t.radius<=0};return this.codeTemplate(o)}allocate(t){(this._colors===null||this._colors.length/4!==t)&&(this._positions=new Float32Array(t*3),this._directions=new Float32Array(t*3),this._colors=new Float32Array(t*4),this._attenuation=new Float32Array(t*4))}prepare(t,e){const i=this.lights;this.allocate(i.length);for(var o=0;o<i.length;o++){var s=i[o];if(this._positions.set(s._wposition,o*3),this._directions.set(s._wdir,o*3),this._colors.set(s._color,o*4),this._attenuation.set(s._attenuationData,o*4),this._colors[o*4+3]=s.iblShadowing,s.castShadows){s.initShadowmap(t);var M=e.shadowChunk.addLight(s);this.shadowIndices[o]!==M&&this.invalidateCode(),this.shadowIndices[o]=M}else this.shadowIndices[o]=-1}this._invalid=!0}setup(t){this.lights.length>0&&(super.setup(t),t.uLSpotPositions(this._positions),t.uLSpotDirections(this._directions),t.uLSpotColors(this._colors),t.uLSpotAttenuation(this._attenuation),this._invalid=!1)}}class ft extends F{constructor(t,e){super(t,e),this.type=b.POINT,this._colors=null,this._positions=null}genCodePerLights(t,e,i){var o={index:e,shadowIndex:i,infinite:t.radius<=0};return this.codeTemplate(o)}allocate(t){(this._colors===null||this._colors.length/3!==t)&&(this._colors=new Float32Array(t*3),this._positions=new Float32Array(t*4))}prepare(t,e){const i=this.lights;this.allocate(i.length);for(var o=0;o<i.length;o++){var s=i[o];this._colors.set(s._color,o*3),this._positions.set(s._wposition,o*4),this._positions[o*4+3]=1/(s.radius*s.radius),this.shadowIndices[o]=-1}this._invalid=!0}setup(t){this.lights.length>0&&(super.setup(t),t.uLPointColors(this._colors),t.uLPointPositions(this._positions),this._invalid=!1)}}const B=z.create(),r=a.create(),pt=["OCTA","PMREM"],_t=["SH9","SH7"],gt=["RGBM","RGBD","RGBE"];class vt extends F{constructor(t,e){super(t,e),this.type=b.IBL,this.enableRotation=new A("enableRotation"),this.enableBoxProjection=new A("enableBoxProjection"),this.iblFormat=new E("iblFormat",pt),this.shFormat=new E("shFormat",_t),this.hdrEncoding=new E("iblHdrEncoding",gt),this.intensities=new N("iblIntensities",2),this.mipLevels=new N("iblNumMipLevel",1),this.mipLevelsValue=this.mipLevels.attachConstant(5),this.intensitiesValue=this.intensities.attachConstant([1,1]),this.addChild(this.enableRotation),this.addChild(this.enableBoxProjection),this.addChild(this.iblFormat),this.addChild(this.shFormat),this.addChild(this.hdrEncoding),this.addChild(this.mipLevels),this.addChild(this.intensities)}genCodePerLights(t,e,i){return this.codeTemplate(this)}prepare(t,e){const i=this.lights[0];i&&(this.enableRotation.set(i.enableRotation),this.enableBoxProjection.set(i.enableBoxProjection),this.iblFormat.set(i.iblFormat),this.shFormat.set(i.shFormat),this.hdrEncoding.set(i.hdrEncoding),this.mipLevelsValue.set(i.mipLevels),this.intensitiesValue.set([i.intensity*i.ambiantIntensity,i.intensity*i.specularIntensity]))}addLight(t){if(this.lights.length>0)throw new Error("IblModel support only one Ibl Light");super.addLight(t)}setup(t){if(this.lights.length>0){const e=this.lights[0];t.tEnv(e.env),t.uSHCoeffs(e.sh),e.enableRotation&&(z.fromMat4(B,e._wmatrix),z.invert(B,B),t.uEnvMatrix(B)),e.enableBoxProjection&&(a.scaleAndAdd(r,e._wposition,e.boxProjectionSize,-.5),t.uBoxProjMin(r),a.scaleAndAdd(r,e._wposition,e.boxProjectionSize,.5),t.uBoxProjMax(r),a.add(r,e._wposition,e.boxProjectionOffset),t.uBoxProjPos(r))}}}class mt{constructor(){this.dirPreCode=U,this.spotPreCode=X,this.pointPreCode=$,this.dirLightCode=q,this.spotLightCode=Z,this.pointLightCode=K,this.shadPreCode=J,this.preLightCode=Q,this.postLightCode=Y,this.iblPreCode=lt,this.iblCode=dt}}class St{constructor(t){t===void 0&&(t=new mt),this.modelCode=t,this._datas={},this._dataList=[],this._setup=null,this.preLightsChunk=new wt(this.modelCode.preLightCode),this.postLightsChunk=new xt(this.modelCode.postLightCode),this.shadowChunk=new Lt(this),this.shadowFilter=new E("shadowFilter",j),this.iblShadowing=new A("iblShadowing",!1),this.registerLightModel(new ft(t.pointLightCode,t.pointPreCode)),this.registerLightModel(new ut(t.spotLightCode,t.spotPreCode)),this.registerLightModel(new ct(t.dirLightCode,t.dirPreCode)),this.registerLightModel(new vt(t.iblCode,t.iblPreCode))}registerLightModel(t){this._datas[t.type]=t,this._dataList.push(t)}getLightSetup(){if(this._setup===null)throw new Error("LightSetup is null");return this._setup}setLightSetup(t){this._setup=t}add(t){var e=this._datas[t._type];e.addLight(t)}remove(t){var e=this._datas[t._type];e.removeLight(t)}prepare(t){this.shadowChunk.shadowCount=0;for(var e=0;e<this._dataList.length;e++)this._dataList[e].prepare(t,this);this.shadowChunk.check()}getChunks(){const t=[this.iblShadowing,this.shadowFilter,this.shadowChunk,this.preLightsChunk];for(var e=0;e<this._dataList.length;e++)t.push(this._dataList[e]);return t.push(this.postLightsChunk),t}}class wt extends I{constructor(t){super(!0,!1),this.code=t}_genCode(t){t.add("lightsf",this.code(this))}}class xt extends I{constructor(t){super(!0,!1),this.code=t}_genCode(t){t.add("lightsf",this.code(this))}}const O=4,T=Math.PI/4;class Lt extends I{constructor(t){super(!0,!0),this.lightModel=t,this.shadowCount=0,this.genCount=0,this._matrices=new Float32Array(O*16),this._texelBiasVector=new Float32Array(O*4),this._shadowmapSizes=new Float32Array(O*2),this._umatrices=null,this._utexelBiasVector=null,this._ushadowmapSizes=null}_genCode(t){this.shadowCount>0&&t.add("pf",this.lightModel.modelCode.shadPreCode(this))}addLight(t){const e=this.shadowCount,i=this.lightModel.getLightSetup();this.shadowCount++,this._matrices.set(t.getShadowProjection(i.bounds),e*16),this._texelBiasVector.set(t.getTexelBiasVector(),e*4);const o=t.shadowmapSize;if(this._shadowmapSizes[e*2+0]=o,this._shadowmapSizes[e*2+1]=1/o,e===0){var s=t.hasDepthShadowmap();i.depthFormat.set(s?"D_DEPTH":"D_RGB")}return e}check(){this.genCount!==this.shadowCount&&(this.genCount=this.shadowCount,this._umatrices=new Float32Array(this._matrices.buffer,0,this.shadowCount*16),this._utexelBiasVector=new Float32Array(this._texelBiasVector.buffer,0,this.shadowCount*4),this._ushadowmapSizes=new Float32Array(this._shadowmapSizes.buffer,0,this.shadowCount*2),this.invalidateCode()),this._invalid=!0}setup(t){this.shadowCount>0&&(t.uShadowMatrices(this._umatrices),t.uShadowTexelBiasVector(this._utexelBiasVector),t.uShadowMapSize(this._ushadowmapSizes),t.uShadowKernelRotation!==void 0&&t.uShadowKernelRotation(1*Math.cos(T),1*Math.sin(T)),this._invalid=!1)}}class yt{constructor(){this._lights=[],this._models=[],this._modelsMap={},this.depthFormat=new E("depthFormat",V),this.bounds=new W,this.stdModel=new St,this._registerModel("std",this.stdModel)}add(t){if(this._lights.indexOf(t)===-1){this._lights.push(t);for(var e=0;e<this._models.length;e++)this._models[e].add(t)}}remove(t){var e=this._lights.indexOf(t);if(e>-1)for(this._lights.splice(e,1),e=0;e<this._models.length;e++)this._models[e].remove(t)}prepare(t){for(var e=0;e<this._models.length;e++)this._models[e].prepare(t)}getChunks(t){t===void 0&&(t="std");var e=this._modelsMap[t].getChunks();return e.unshift(this.depthFormat),e}_registerModel(t,e){if(this._modelsMap[t]===void 0){this._modelsMap[t]=e,this._models.push(e),e.setLightSetup(this);for(var i=0;i<this._lights.length;i++)e.add(this._lights[i])}}}class Ct extends G{constructor(){super()}}class Mt extends Ct{constructor(t,e){super(),this.env=t,this.sh=e,this._type=b.IBL,this.iblFormat="OCTA",this.hdrEncoding="RGBM",this.shFormat="SH9",this.mipLevels=5,this.enableRotation=!1,this.enableBoxProjection=!1,this.intensity=1,this.ambiantIntensity=1,this.specularIntensity=1,this.boxProjectionSize=a.fromValues(1,1,1),this.boxProjectionOffset=a.fromValues(0,0,0)}}export{Mt as I,yt as L};
