import{c as r}from"./index-6ace8b64.js";import{p as c,G as i,A as s,B as u,M as m,H as t,C as o,J as n,K as f,N as d,I as x}from"./runtime-core.esm-bundler-6b582627.js";const h={key:0,class:"text-14"},B=c({__name:"UIBlockLink",props:{url:null,text:null,description:null,fullHeight:{type:Boolean,default:!1}},setup(e){return(g,k)=>{const a=r,l=i("RouterLink");return s(),u(l,{to:e.url,class:"custom-link bg-grey-50 hover:bg-grey rounded-md transition-colors"},{default:m(()=>[t("div",{class:o({"flex items-center justify-between gap-16":!0,"h-full":e.fullHeight})},[t("div",{class:o({"flex flex-col gap-4":!0,"h-full":e.fullHeight})},[t("span",{class:o(e.description?"font-bold text-18":"text-16")},n(e.text),3),e.description?(s(),f("span",h,n(e.description),1)):d("",!0)],2),x(a,{name:"arrow-right",class:"text-primary w-16 h-auto flex-shrink-0",stroke:""})],2)]),_:1},8,["to"])}}});export{B as _};