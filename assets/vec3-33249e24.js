import{A as s}from"./common-a066d304.js";function u(){var r=new s(3);return s!=Float32Array&&(r[0]=0,r[1]=0,r[2]=0),r}function A(r,e,n){var c=new s(3);return c[0]=r,c[1]=e,c[2]=n,c}function h(r,e){return r[0]=e[0],r[1]=e[1],r[2]=e[2],r}function p(r,e,n){return r[0]=e[0]-n[0],r[1]=e[1]-n[1],r[2]=e[2]-n[2],r}function w(r,e,n){return r[0]=e[0]*n,r[1]=e[1]*n,r[2]=e[2]*n,r}function y(r,e,n){var c=e[0],f=e[1],a=e[2],t=n[3]*c+n[7]*f+n[11]*a+n[15];return t=t||1,r[0]=(n[0]*c+n[4]*f+n[8]*a+n[12])/t,r[1]=(n[1]*c+n[5]*f+n[9]*a+n[13])/t,r[2]=(n[2]*c+n[6]*f+n[10]*a+n[14])/t,r}(function(){var r=u();return function(e,n,c,f,a,t){var i,l;for(n||(n=3),c||(c=0),f?l=Math.min(f*n+c,e.length):l=e.length,i=c;i<l;i+=n)r[0]=e[i],r[1]=e[i+1],r[2]=e[i+2],a(r,r,t),e[i]=r[0],e[i+1]=r[1],e[i+2]=r[2];return e}})();export{p as a,h as b,u as c,A as f,w as s,y as t};