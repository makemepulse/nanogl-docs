import{L as g,u as T,d as V}from"./index-eb7d30b6.js";import{p as k,t as $,z as I,u as d,A as s,H as p,I as B,J as a,G as r,K as C,C as n,D as f,F as _,O as y,L as l,E as t}from"./runtime-core.esm-bundler-b2e16801.js";const w=["href"],A={key:2},v=k({__name:"SingleType",props:{type:{type:Object,required:!0},isCode:{type:Boolean,required:!1}},setup(e){const i=e,h=$(()=>i.type.kind==="Class"?g.CLASS:i.type.kind==="Function"?g.FUNCTION:null),c=$(()=>i.type.lib&&i.type.name&&h.value?{path:`/api/${i.type.lib}/${h.value}/${i.type.name}`,isInternal:!0}:i.type.source?{path:i.type.source,isInternal:!1}:null);return(m,u)=>{const o=I("RouterLink");return d(c)&&d(c).isInternal?(s(),p(o,{key:0,class:C({"code-link":e.isCode}),to:d(c).path,target:"_blank"},{default:B(()=>[a(r(e.type.name),1)]),_:1},8,["class","to"])):d(c)&&!d(c).isInternal?(s(),n("a",{key:1,class:C({"code-link":e.isCode}),href:d(c).path,target:"_blank"},r(e.type.name),11,w)):(s(),n("span",A,r(e.type.name),1))}}}),L={key:0},x=k({__name:"Type",props:{data:{type:Object||Array,required:!0},isCode:{type:Boolean,required:!1}},setup(e){const i=e,h=$(()=>Array.isArray(i.data)?i.data:[i.data]);return(c,m)=>{const u=v;return s(!0),n(_,null,f(d(h),(o,b)=>(s(),n(_,null,[y(u,{type:o,isCode:e.isCode},null,8,["type","isCode"]),b<d(h).length-1?(s(),n("span",L," | ")):l("",!0)],64))),256)}}}),O={class:"flex flex-col gap-4"},P={class:"inline-block"},j={class:"language-ts inline-block"},N={key:0},M={key:1,class:"language-ts inline-block"},E={key:0},D={key:1},z={key:0},G=t("span",null,"Default : ",-1),F=k({__name:"Variable",props:{name:{type:String,required:!0},type:{type:Object||Array,required:!1},optional:{type:Boolean,required:!1},comment:{type:String,required:!1},defaultValue:{type:String,required:!1}},setup(e){return(i,h)=>{const c=x;return s(),n("div",O,[t("div",P,[t("code",j,r(e.name),1),e.type||e.optional||e.comment||e.defaultValue?(s(),n("span",N," : ")):l("",!0),e.type?(s(),n("code",M,[y(c,{data:e.type,"is-code":""},null,8,["data"])])):l("",!0)]),t("div",null,[e.optional?(s(),n("span",E,"(optional) ")):l("",!0),e.comment?(s(),n("span",D,r(e.comment),1)):l("",!0)]),e.defaultValue?(s(),n("div",z,[G,t("span",null,r(e.defaultValue),1)])):l("",!0)])}}}),R=["id"],H={class:"language-ts flex"},J={class:"language-ts flex flex-wrap"},K={class:"token function"},U=t("span",{class:"token punctuation"},"(",-1),Y={class:"token param"},Q={key:0,class:"token boolean"},W={key:1,class:"flex w-fit"},X=t("span",{class:"token punctuation"},": ",-1),Z={class:"token type inline-flex"},ee={key:2,class:"token punctuation"},te=t("span",{class:"token punctuation"},")",-1),se={key:0,class:"flex"},ne=t("span",{class:"token punctuation"}," : ",-1),oe={class:"token type inline-flex"},le={key:0,class:"my-16"},ae={key:1,class:"my-16"},ce=["id"],ie={key:1},ue={class:"space-y-16"},q=k({__name:"Method",props:{method:{type:Object,required:!0},isConstructor:{type:Boolean,required:!1,default:!1},isFullPage:{type:Boolean,required:!1,default:!1}},setup(e){return(i,h)=>{const c=x,m=F;return s(),n("div",{id:`method-${e.method.name}`},[t("pre",H,[a("      "),t("code",J,[a(`
        `),t("span",K,r(e.method.name),1),a(`
        `),U,a(`
        `),(s(!0),n(_,null,f(e.method.params,(u,o)=>(s(),n(_,null,[a(`
          `),t("span",Y,r(u.name),1),a(`
          `),u.optional?(s(),n("span",Q,"?")):l("",!0),a(`
          `),u.type?(s(),n("span",W,[a(`
            `),X,a(`
            `),t("span",Z,[a(`
              `),y(c,{data:u.type,"is-code":""},null,8,["data"]),a(`
            `)]),a(`
          `)])):l("",!0),a(`
          `),o+1<e.method.params.length?(s(),n("span",ee,", ")):l("",!0),a(`
        `)],64))),256)),a(`
        `),te,a(`
        `),e.method.type&&!e.isConstructor?(s(),n("span",se,[a(`
          `),ne,a(`
          `),t("span",oe,[a(`
            `),y(c,{data:e.method.type,"is-code":""},null,8,["data"]),a(`
          `)]),a(`
        `)])):l("",!0),a(`
      `)]),a(`
    `)]),e.method.comment?(s(),n("p",le,r(e.method.comment),1)):l("",!0),e.method.params?(s(),n("div",ae,[e.isFullPage?(s(),n("h2",{key:0,id:`method-${e.method.name}-params`},"Parameters",8,ce)):(s(),n("h4",ie,"Parameters")),t("div",ue,[(s(!0),n(_,null,f(e.method.params,u=>(s(),p(m,{name:u.name,type:u.type,optional:u.optional,comment:u.comment},null,8,["name","type","optional","comment"]))),256))])])):l("",!0)],8,R)}}}),de=["id"],re={id:"introduction",class:"flex gap-8 items-baseline"},he={key:0,class:"text-16"},_e=["href"],me={class:"toc-wrapper"},ye={class:"toc"},fe=t("h2",null,"Summary",-1),pe=t("li",null,[t("a",{href:"#introduction"},"Introduction")],-1),ke={key:0},be=["href"],$e=k({__name:"Function",props:{libFunction:{type:Object,required:!0}},setup(e){return(i,h)=>{const c=q;return s(),n(_,null,[t("div",{class:"content-wrapper",id:`function-${e.libFunction.name}`},[t("h1",re,[t("span",null,r(e.libFunction.name),1),e.libFunction.source.length?(s(),n("span",he,[t("a",{href:e.libFunction.source,target:"_blank"},"source",8,_e)])):l("",!0)]),y(c,{method:e.libFunction,"is-full-page":""},null,8,["method"])],8,de),t("div",me,[t("div",ye,[fe,t("ul",null,[pe,e.libFunction.params?(s(),n("li",ke,[t("a",{href:`#method-${e.libFunction.name}-params`},"Parameters",8,be)])):l("",!0)])])])],64)}}}),ge=["id"],Ce={key:0,class:"flex flex-row-reverse justify-end flex-wrap gap-x-8"},ve=t("span",null," →",-1),xe={id:"introduction",class:"flex gap-8 items-baseline"},Fe={key:0,class:"text-16"},qe=["href"],Se={key:1},Te={key:2,class:"mb-48"},Ve=t("h2",{id:"constructor"},"Constructor",-1),Ie={class:"space-y-16"},Be={key:3,class:"mb-48"},we=t("h2",{id:"properties"},"Properties",-1),Ae={class:"space-y-16"},Le={key:4,class:"mb-48"},Oe=t("h2",{id:"accessors"},"Accessors",-1),Pe={class:"space-y-32"},je={class:"language-ts inline-block"},Ne={class:"pl-24"},Me={key:0},Ee={class:"space-y-16"},De={key:0},ze=t("h4",null,"Getter",-1),Ge={class:"pl-24"},Re={key:1},He=t("h4",null,"Setter",-1),Je={class:"pl-24"},Ke={key:5,class:"mb-48"},Ue=t("h2",{id:"methods"},"Methods",-1),Ye={class:"space-y-32"},Qe={class:"toc-wrapper"},We={class:"toc"},Xe=t("h2",null,"Summary",-1),Ze=t("li",null,[t("a",{href:"#introduction"},"Introduction")],-1),et={key:0},tt=t("a",{href:"#constructor"},"Constructor",-1),st=[tt],nt={key:1},ot=t("a",{href:"#properties"},"Properties",-1),lt=[ot],at={key:2},ct=t("a",{href:"#accessors"},"Accessors",-1),it=[ct],ut={key:3},dt=t("a",{href:"#methods"},"Methods",-1),rt=[dt],ht=k({__name:"Class",props:{libClass:{type:Object,required:!0}},setup(e){return(i,h)=>{const c=v,m=q,u=F;return s(),n(_,null,[t("div",{class:"content-wrapper",id:`class-${e.libClass.name}`},[e.libClass.extends&&e.libClass.extends.length?(s(),n("div",Ce,[(s(!0),n(_,null,f(e.libClass.extends,o=>(s(),n("p",null,[y(c,{type:o},null,8,["type"]),ve]))),256))])):l("",!0),t("h1",xe,[t("span",null,r(e.libClass.name),1),e.libClass.source.length?(s(),n("span",Fe,[t("a",{href:e.libClass.source,target:"_blank"},"source",8,qe)])):l("",!0)]),e.libClass.comment?(s(),n("p",Se,r(e.libClass.comment),1)):l("",!0),e.libClass.constructors.length?(s(),n("div",Te,[Ve,t("div",Ie,[(s(!0),n(_,null,f(e.libClass.constructors,o=>(s(),p(m,{method:o,isConstructor:!0},null,8,["method"]))),256))])])):l("",!0),e.libClass.properties.length?(s(),n("div",Be,[we,t("div",Ae,[(s(!0),n(_,null,f(e.libClass.properties,o=>(s(),p(u,{name:o.name,type:o.type,optional:o.optional,comment:o.comment,source:o.source,"default-value":o.defaultValue},null,8,["name","type","optional","comment","source","default-value"]))),256))])])):l("",!0),e.libClass.accessors.length?(s(),n("div",Le,[Oe,t("div",Pe,[(s(!0),n(_,null,f(e.libClass.accessors,o=>(s(),n("div",null,[t("h3",null,[t("code",je,r(o.name),1)]),t("div",Ne,[o.comment?(s(),n("p",Me,r(o.comment),1)):l("",!0),t("div",Ee,[o.getter?(s(),n("div",De,[ze,t("div",Ge,[y(m,{method:o.getter},null,8,["method"])])])):l("",!0),o.setter?(s(),n("div",Re,[He,t("div",Je,[y(m,{method:o.setter},null,8,["method"])])])):l("",!0)])])]))),256))])])):l("",!0),e.libClass.methods.length?(s(),n("div",Ke,[Ue,t("div",Ye,[(s(!0),n(_,null,f(e.libClass.methods,o=>(s(),n("div",null,[t("h3",null,r(o.name),1),y(m,{method:o,class:"pl-24"},null,8,["method"])]))),256))])])):l("",!0)],8,ge),t("div",Qe,[t("div",We,[Xe,t("ul",null,[Ze,e.libClass.constructors.length?(s(),n("li",et,st)):l("",!0),e.libClass.properties.length?(s(),n("li",nt,lt)):l("",!0),e.libClass.accessors.length?(s(),n("li",at,it)):l("",!0),e.libClass.methods.length?(s(),n("li",ut,rt)):l("",!0)])])])],64)}}}),_t={key:1,class:"page-body-toc"},ft=k({__name:"index",setup(e){const{currentLib:i,currentType:h,currentItem:c}=T();return(m,u)=>{const o=V,b=ht,S=$e;return!d(i)||!d(h)||!d(c)?(s(),p(o,{key:0})):(s(),n("div",_t,[d(h)==="classes"?(s(),p(b,{key:0,"lib-class":d(c)},null,8,["lib-class"])):d(h)==="functions"?(s(),p(S,{key:1,"lib-function":d(c)},null,8,["lib-function"])):l("",!0)]))}}});export{ft as default};
