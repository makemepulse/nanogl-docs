import{c as D,d as P,v as a,F as M,E as w,I as A}from"./ShaderVersion-8538814c.js";import{D as F,B as b}from"./Bounds-f9785a14.js";import{N as O}from"./index-099e42fb.js";const R=["PCFNONE","PCF4x1","PCF4x4","PCF2x2"];var h=function(e){var t="";return t+="#define NUM_D_LIGHTS "+e.count+`

`,e.count>0&&(t+=`
uniform vec3 uLDirDirections [NUM_D_LIGHTS];
uniform vec4 uLDirColors     [NUM_D_LIGHTS]; // rgb + iblShadowing
`),t+=`

`,t};h.toString=h;var T=h;h._hmrListeners=[];h.onHmr=function(e){this._hmrListeners.push(e)};h._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};var l=function(e){var t="";return t+="#define NUM_S_LIGHTS "+e.count+`

`,e.count>0&&(t+=`
uniform vec3 uLSpotPositions  [NUM_S_LIGHTS];
uniform vec3 uLSpotDirections [NUM_S_LIGHTS];
uniform vec4 uLSpotColors     [NUM_S_LIGHTS]; // rgb + iblShadowing
uniform vec4 uLSpotAttenuation[NUM_S_LIGHTS]; 
`),t+=`

`,t};l.toString=l;var B=l;l._hmrListeners=[];l.onHmr=function(e){this._hmrListeners.push(e)};l._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};var d=function(e){var t="";return t+="#define NUM_P_LIGHTS "+e.count+`

`,e.count>0&&(t+=`
uniform vec4 uLPointPositions  [NUM_P_LIGHTS]; //w is radius
uniform vec3 uLPointFalloff    [NUM_P_LIGHTS];
uniform vec3 uLPointColors     [NUM_P_LIGHTS]; // rgb
`),t+=`

`,t};d.toString=d;var z=d;d._hmrListeners=[];d.onHmr=function(e){this._hmrListeners.push(e)};d._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};var u=function(e){var t="";return t+=`
{
  Light light;

  light.direction = uLDirDirections  [`+e.index+`]    ;
  light.color     = uLDirColors      [`+e.index+`].rgb;
  light.attenuation = 1.0;

  `,e.shadowIndex>-1?t+=`
    ShadowMapData shadowmapData = GET_SHADOWMAP_DATA( `+e.shadowIndex+` );
    light.shadowAttenuation = SampleShadowAttenuation(shadowmapData, tShadowMap`+e.shadowIndex+`, geometryData.worldPos, geometryData.worldNrm );
  `:t+=`
    light.shadowAttenuation = 1.0;
  `,t+=`

  LightingPhysicallyBased(brdfData,  geometryData, lightingData, light );
}`,t};u.toString=u;var N=u;u._hmrListeners=[];u.onHmr=function(e){this._hmrListeners.push(e)};u._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};var c=function(e){var t="";return t+=`
{
  vec3 lightPositionWS                    = uLSpotPositions  [`+e.index+`]    ;
  mediump vec3 spotDirection              = uLSpotDirections [`+e.index+`]    ;
  mediump vec3 lightColor                 = uLSpotColors     [`+e.index+`].rgb;
  mediump vec4 distanceAndSpotAttenuation = uLSpotAttenuation[`+e.index+`]    ;

  vec3 lightVector = lightPositionWS - geometryData.worldPos;
  float distanceSqr = dot(lightVector, lightVector);

  mediump vec3 lightDirection = vec3(lightVector * inversesqrt(distanceSqr));

  mediump float attenuation = AngleAttenuation(spotDirection.xyz, lightDirection, distanceAndSpotAttenuation.zw);
  `,e.infinite?t+=`
    attenuation *= DistanceAttenuation(distanceSqr);
  `:t+=`
    attenuation *= DistanceAttenuationRange(distanceSqr, distanceAndSpotAttenuation.xy);
  `,t+=`


  Light light;
  light.direction = lightDirection;
  light.attenuation = attenuation;
  light.color = lightColor;

  `,e.shadowIndex>-1?t+=`
    ShadowMapData shadowmapData = GET_SHADOWMAP_DATA( `+e.shadowIndex+` );
    light.shadowAttenuation = SampleShadowAttenuation(shadowmapData, tShadowMap`+e.shadowIndex+`, geometryData.worldPos, geometryData.worldNrm );
  `:t+=`
    light.shadowAttenuation = 1.0;
  `,t+=`
  
  // TODO store ibl contrib in separate struct
  // #if iblShadowing
  //   float sDamp = uLSpotColors[`+e.index+`].a;
  //   specularColor *= mix( sDamp, 1.0, shOccl );
  // #endif

  
  // mediump vec3 attenuatedLightColor = light.color * (light.attenuation * light.shadowAttenuation);
  // LS_DIFFUSE  += LightingLambert(attenuatedLightColor, light.direction, geometryData.worldNrm);
  // LS_SPECULAR += LightingSpecular(attenuatedLightColor, light.direction, geometryData.worldNrm, geometryData.viewDir, specularGloss, smoothness);

  LightingPhysicallyBased(brdfData,  geometryData, lightingData, light );
}`,t};c.toString=c;var k=c;c._hmrListeners=[];c.onHmr=function(e){this._hmrListeners.push(e)};c._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};var p=function(e){var t="";return t+=`
{
  vec3 lightPositionWS                    = uLPointPositions [`+e.index+`].xyz;
  mediump vec3 lightColor                 = uLPointColors    [`+e.index+`].rgb;

  vec3 lightVector = lightPositionWS - geometryData.worldPos;
  float distanceSqr = dot(lightVector, lightVector);

  mediump vec3 lightDirection = vec3(lightVector * inversesqrt(distanceSqr));

  `,e.infinite?t+=`
    mediump float attenuation = DistanceAttenuation(distanceSqr);
  `:t+=`
    float oneOverRangeSquared = uLPointPositions[`+e.index+`].w;
    mediump float attenuation = DistanceAttenuationRange(distanceSqr, vec2(oneOverRangeSquared, 0.0));
  `,t+=`


  Light light;
  light.direction = lightDirection;
  light.attenuation = attenuation;
  light.color = lightColor;
  light.shadowAttenuation = 1.0;
  
  LightingPhysicallyBased(brdfData,  geometryData, lightingData, light );
}`,t};p.toString=p;var V=p;p._hmrListeners=[];p.onHmr=function(e){this._hmrListeners.push(e)};p._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};var f=function(e){var t="";t+=`

#define SHADOW_COUNT `+e.shadowCount+`

#if __VERSION__ == 300
  precision lowp sampler2DShadow;

  #define DepthSampler sampler2DShadow
  
#else
  #define DepthSampler sampler2D
#endif


`;for(var n=0;n<e.shadowCount;n++)t+=`
  uniform DepthSampler tShadowMap`+n+`;
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
}`,t};f.toString=f;var G=f;f._hmrListeners=[];f.onHmr=function(e){this._hmrListeners.push(e)};f._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};var g=function(e){var t="";return t+="",t};g.toString=g;var W=g;g._hmrListeners=[];g.onHmr=function(e){this._hmrListeners.push(e)};g._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};var v=function(e){var t="";return t+=`
// post light setup
// todo: should not be
// specularColor += lSpecularColor * input.specularF0;`,t};v.toString=v;var U=v;v._hmrListeners=[];v.onHmr=function(e){this._hmrListeners.push(e)};v._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};var _=function(e){var t="";return t+=`#ifndef _H_SPECULAR_IBL_
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



`,t};_.toString=_;var q=_;_._hmrListeners=[];_.onHmr=function(e){this._hmrListeners.push(e)};_._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};var m=function(e){var t="";return t+="EnvironmentBRDF( brdfData, geometryData, lightingData, surface.occlusion );",t};m.toString=m;var $=m;m._hmrListeners=[];m.onHmr=function(e){this._hmrListeners.push(e)};m._triggerHmr=function(){for(const e of this._hmrListeners)e(this)};var y;(function(e){e[e.UNKNOWN=0]="UNKNOWN",e[e.DIRECTIONAL=1]="DIRECTIONAL",e[e.SPOT=2]="SPOT",e[e.POINT=4]="POINT",e[e.IBL=5]="IBL"})(y||(y={}));const x=y;class E extends D{constructor(t,n){super(!0,!0),this.lights=[],this.shadowIndices=[],this.preCodeTemplate=n,this.codeTemplate=t}addLight(t){this.lights.indexOf(t)===-1&&(this.lights.push(t),this.shadowIndices.push(-1),this.invalidateCode())}removeLight(t){const n=this.lights.indexOf(t);n>-1&&(this.lights.splice(n,1),this.shadowIndices.splice(n,1),this.invalidateCode())}_genCode(t){if(this.lights.length==0)return;let n=this.preCodeTemplate({count:this.lights.length});t.add("pf",n),n="";for(var i=0;i<this.lights.length;i++)n+=this.genCodePerLights(this.lights[i],i,this.shadowIndices[i]);t.add("lightsf",n)}}class I extends E{setup(t){for(var n=0;n<this.shadowIndices.length;n++){var i=this.shadowIndices[n];if(i>-1){var o=this.lights[n].getShadowmap();t["tShadowMap"+i](o)}}}}class Z extends I{constructor(t,n){super(t,n),this.type=x.DIRECTIONAL,this._directions=null,this._colors=null}genCodePerLights(t,n,i){var o={index:n,shadowIndex:i};return this.codeTemplate(o)}allocate(t){(this._colors===null||this._colors.length/4!==t)&&(this._directions=new Float32Array(t*3),this._colors=new Float32Array(t*4))}prepare(t,n){var i=this.lights;this.allocate(i.length);for(var o=0;o<i.length;o++){var s=i[o];if(this._directions.set(s._wdir,o*3),this._colors.set(s._color,o*4),this._colors[o*4+3]=s.iblShadowing,s.castShadows){s.initShadowmap(t);var S=n.shadowChunk.addLight(s);this.shadowIndices[o]!==S&&this.invalidateCode(),this.shadowIndices[o]=S}else this.shadowIndices[o]=-1}this._invalid=!0}setup(t){this.lights.length>0&&(super.setup(t),t.uLDirDirections(this._directions),t.uLDirColors(this._colors),this._invalid=!1)}}class j extends I{constructor(t,n){super(t,n),this.type=x.SPOT,this._positions=null,this._directions=null,this._colors=null,this._attenuation=null}genCodePerLights(t,n,i){var o={index:n,shadowIndex:i,infinite:t.radius<=0};return this.codeTemplate(o)}allocate(t){(this._colors===null||this._colors.length/4!==t)&&(this._positions=new Float32Array(t*3),this._directions=new Float32Array(t*3),this._colors=new Float32Array(t*4),this._attenuation=new Float32Array(t*4))}prepare(t,n){const i=this.lights;this.allocate(i.length);for(var o=0;o<i.length;o++){var s=i[o];if(this._positions.set(s._wposition,o*3),this._directions.set(s._wdir,o*3),this._colors.set(s._color,o*4),this._attenuation.set(s._attenuationData,o*4),this._colors[o*4+3]=s.iblShadowing,s.castShadows){s.initShadowmap(t);var S=n.shadowChunk.addLight(s);this.shadowIndices[o]!==S&&this.invalidateCode(),this.shadowIndices[o]=S}else this.shadowIndices[o]=-1}this._invalid=!0}setup(t){this.lights.length>0&&(super.setup(t),t.uLSpotPositions(this._positions),t.uLSpotDirections(this._directions),t.uLSpotColors(this._colors),t.uLSpotAttenuation(this._attenuation),this._invalid=!1)}}class K extends E{constructor(t,n){super(t,n),this.type=x.POINT,this._colors=null,this._positions=null}genCodePerLights(t,n,i){var o={index:n,shadowIndex:i,infinite:t.radius<=0};return this.codeTemplate(o)}allocate(t){(this._colors===null||this._colors.length/3!==t)&&(this._colors=new Float32Array(t*3),this._positions=new Float32Array(t*4))}prepare(t,n){const i=this.lights;this.allocate(i.length);for(var o=0;o<i.length;o++){var s=i[o];this._colors.set(s._color,o*3),this._positions.set(s._wposition,o*4),this._positions[o*4+3]=1/(s.radius*s.radius),this.shadowIndices[o]=-1}this._invalid=!0}setup(t){this.lights.length>0&&(super.setup(t),t.uLPointColors(this._colors),t.uLPointPositions(this._positions),this._invalid=!1)}}const L=P.create(),r=a.create(),X=["OCTA","PMREM"],J=["SH9","SH7"],Q=["RGBM","RGBD","RGBE"];class Y extends E{constructor(t,n){super(t,n),this.type=x.IBL,this.enableRotation=new M("enableRotation"),this.enableBoxProjection=new M("enableBoxProjection"),this.iblFormat=new w("iblFormat",X),this.shFormat=new w("shFormat",J),this.hdrEncoding=new w("iblHdrEncoding",Q),this.intensities=new A("iblIntensities",2),this.mipLevels=new A("iblNumMipLevel",1),this.mipLevelsValue=this.mipLevels.attachConstant(5),this.intensitiesValue=this.intensities.attachConstant([1,1]),this.addChild(this.enableRotation),this.addChild(this.enableBoxProjection),this.addChild(this.iblFormat),this.addChild(this.shFormat),this.addChild(this.hdrEncoding),this.addChild(this.mipLevels),this.addChild(this.intensities)}genCodePerLights(t,n,i){return this.codeTemplate(this)}prepare(t,n){const i=this.lights[0];i&&(this.enableRotation.set(i.enableRotation),this.enableBoxProjection.set(i.enableBoxProjection),this.iblFormat.set(i.iblFormat),this.shFormat.set(i.shFormat),this.hdrEncoding.set(i.hdrEncoding),this.mipLevelsValue.set(i.mipLevels),this.intensitiesValue.set([i.intensity*i.ambiantIntensity,i.intensity*i.specularIntensity]))}addLight(t){if(this.lights.length>0)throw new Error("IblModel support only one Ibl Light");super.addLight(t)}setup(t){if(this.lights.length>0){const n=this.lights[0];t.tEnv(n.env),t.uSHCoeffs(n.sh),n.enableRotation&&(P.fromMat4(L,n._wmatrix),P.invert(L,L),t.uEnvMatrix(L)),n.enableBoxProjection&&(a.scaleAndAdd(r,n._wposition,n.boxProjectionSize,-.5),t.uBoxProjMin(r),a.scaleAndAdd(r,n._wposition,n.boxProjectionSize,.5),t.uBoxProjMax(r),a.add(r,n._wposition,n.boxProjectionOffset),t.uBoxProjPos(r))}}}class tt{constructor(){this.dirPreCode=T,this.spotPreCode=B,this.pointPreCode=z,this.dirLightCode=N,this.spotLightCode=k,this.pointLightCode=V,this.shadPreCode=G,this.preLightCode=W,this.postLightCode=U,this.iblPreCode=q,this.iblCode=$}}class et{constructor(t){t===void 0&&(t=new tt),this.modelCode=t,this._datas={},this._dataList=[],this._setup=null,this.preLightsChunk=new nt(this.modelCode.preLightCode),this.postLightsChunk=new it(this.modelCode.postLightCode),this.shadowChunk=new ot(this),this.shadowFilter=new w("shadowFilter",R),this.iblShadowing=new M("iblShadowing",!1),this.registerLightModel(new K(t.pointLightCode,t.pointPreCode)),this.registerLightModel(new j(t.spotLightCode,t.spotPreCode)),this.registerLightModel(new Z(t.dirLightCode,t.dirPreCode)),this.registerLightModel(new Y(t.iblCode,t.iblPreCode))}registerLightModel(t){this._datas[t.type]=t,this._dataList.push(t)}getLightSetup(){if(this._setup===null)throw new Error("LightSetup is null");return this._setup}setLightSetup(t){this._setup=t}add(t){var n=this._datas[t._type];n.addLight(t)}remove(t){var n=this._datas[t._type];n.removeLight(t)}prepare(t){this.shadowChunk.shadowCount=0;for(var n=0;n<this._dataList.length;n++)this._dataList[n].prepare(t,this);this.shadowChunk.check()}getChunks(){const t=[this.iblShadowing,this.shadowFilter,this.shadowChunk,this.preLightsChunk];for(var n=0;n<this._dataList.length;n++)t.push(this._dataList[n]);return t.push(this.postLightsChunk),t}}class nt extends D{constructor(t){super(!0,!1),this.code=t}_genCode(t){t.add("lightsf",this.code(this))}}class it extends D{constructor(t){super(!0,!1),this.code=t}_genCode(t){t.add("lightsf",this.code(this))}}const C=4,H=Math.PI/4;class ot extends D{constructor(t){super(!0,!0),this.lightModel=t,this.shadowCount=0,this.genCount=0,this._matrices=new Float32Array(C*16),this._texelBiasVector=new Float32Array(C*4),this._shadowmapSizes=new Float32Array(C*2),this._umatrices=null,this._utexelBiasVector=null,this._ushadowmapSizes=null}_genCode(t){this.shadowCount>0&&t.add("pf",this.lightModel.modelCode.shadPreCode(this))}addLight(t){const n=this.shadowCount,i=this.lightModel.getLightSetup();this.shadowCount++,this._matrices.set(t.getShadowProjection(i.bounds),n*16),this._texelBiasVector.set(t.getTexelBiasVector(),n*4);const o=t.shadowmapSize;if(this._shadowmapSizes[n*2+0]=o,this._shadowmapSizes[n*2+1]=1/o,n===0){var s=t.hasDepthShadowmap();i.depthFormat.set(s?"D_DEPTH":"D_RGB")}return n}check(){this.genCount!==this.shadowCount&&(this.genCount=this.shadowCount,this._umatrices=new Float32Array(this._matrices.buffer,0,this.shadowCount*16),this._utexelBiasVector=new Float32Array(this._texelBiasVector.buffer,0,this.shadowCount*4),this._ushadowmapSizes=new Float32Array(this._shadowmapSizes.buffer,0,this.shadowCount*2),this.invalidateCode()),this._invalid=!0}setup(t){this.shadowCount>0&&(t.uShadowMatrices(this._umatrices),t.uShadowTexelBiasVector(this._utexelBiasVector),t.uShadowMapSize(this._ushadowmapSizes),t.uShadowKernelRotation!==void 0&&t.uShadowKernelRotation(1*Math.cos(H),1*Math.sin(H)),this._invalid=!1)}}class lt{constructor(){this._lights=[],this._models=[],this._modelsMap={},this.depthFormat=new w("depthFormat",F),this.bounds=new b,this.stdModel=new et,this._registerModel("std",this.stdModel)}add(t){if(this._lights.indexOf(t)===-1){this._lights.push(t);for(var n=0;n<this._models.length;n++)this._models[n].add(t)}}remove(t){var n=this._lights.indexOf(t);if(n>-1)for(this._lights.splice(n,1),n=0;n<this._models.length;n++)this._models[n].remove(t)}prepare(t){for(var n=0;n<this._models.length;n++)this._models[n].prepare(t)}getChunks(t){t===void 0&&(t="std");var n=this._modelsMap[t].getChunks();return n.unshift(this.depthFormat),n}_registerModel(t,n){if(this._modelsMap[t]===void 0){this._modelsMap[t]=n,this._models.push(n),n.setLightSetup(this);for(var i=0;i<this._lights.length;i++)n.add(this._lights[i])}}}class st extends O{constructor(){super()}}class dt extends st{constructor(t,n){super(),this.env=t,this.sh=n,this._type=x.IBL,this.iblFormat="OCTA",this.hdrEncoding="RGBM",this.shFormat="SH9",this.mipLevels=5,this.enableRotation=!1,this.enableBoxProjection=!1,this.intensity=1,this.ambiantIntensity=1,this.specularIntensity=1,this.boxProjectionSize=a.fromValues(1,1,1),this.boxProjectionOffset=a.fromValues(0,0,0)}}export{dt as I,lt as L};
