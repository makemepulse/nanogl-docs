import{A as u}from"./common-a066d304.js";function a(){var n=new u(3);return u!=Float32Array&&(n[0]=0,n[1]=0,n[2]=0),n}function A(n,t,r){var i=t[0],c=t[1],f=t[2],v=r[3]*i+r[7]*c+r[11]*f+r[15];return v=v||1,n[0]=(r[0]*i+r[4]*c+r[8]*f+r[12])/v,n[1]=(r[1]*i+r[5]*c+r[9]*f+r[13])/v,n[2]=(r[2]*i+r[6]*c+r[10]*f+r[14])/v,n}(function(){var n=a();return function(t,r,i,c,f,v){var e,l;for(r||(r=3),i||(i=0),c?l=Math.min(c*r+i,t.length):l=t.length,e=i;e<l;e+=r)n[0]=t[e],n[1]=t[e+1],n[2]=t[e+2],f(n,n,v),t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2];return t}})();export{a as c,A as t};
