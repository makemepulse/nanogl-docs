import{p as b,A as t,C as s,G as _,F as h,D as p,H as y,t as $,z as V,u as d,I as A,J as a,K as g,O as k,L as l,E as n}from"./runtime-core.esm-bundler-b2e16801.js";import{L as v,u as B,d as I}from"./index-d94cd73c.js";const w=["href"],N={key:1},L=b({__name:"SingleComment",props:{text:{type:String,required:!0},target:{type:Number,required:!1}},setup(e){return(i,r)=>e.target?(t(),s("a",{key:0,href:`#item-${e.target}`},_(e.text),9,w)):(t(),s("span",N,_(e.text),1))}}),C=b({__name:"Comment",props:{comment:{type:Array,required:!0}},setup(e){return(i,r)=>{const c=L;return t(),s("p",null,[(t(!0),s(h,null,p(e.comment,m=>(t(),y(c,{text:m.text,target:m.target},null,8,["text","target"]))),256))])}}}),O=["href"],P={key:2},x=b({__name:"SingleType",props:{type:{type:Object,required:!0},isCode:{type:Boolean,required:!1}},setup(e){const i=e,r=$(()=>i.type.kind==="Class"?v.CLASS:i.type.kind==="Function"?v.FUNCTION:null),c=$(()=>i.type.lib&&i.type.name&&r.value?{path:`/api/${i.type.lib}/${r.value}/${i.type.name}`,isInternal:!0}:i.type.source?{path:i.type.source,isInternal:!1}:null),m=$(()=>i.type.isArray?`${i.type.name}[]`:i.type.name);return(f,u)=>{const o=V("RouterLink");return d(c)&&d(c).isInternal?(t(),y(o,{key:0,class:g({"code-link":e.isCode}),to:d(c).path,target:"_blank"},{default:A(()=>[a(_(d(m)),1)]),_:1},8,["class","to"])):d(c)&&!d(c).isInternal?(t(),s("a",{key:1,class:g({"code-link":e.isCode}),href:d(c).path,target:"_blank"},_(d(m)),11,O)):(t(),s("span",P,_(d(m)),1))}}}),j={key:0},q=b({__name:"Type",props:{data:{type:Object||Array,required:!0},isCode:{type:Boolean,required:!1}},setup(e){const i=e,r=$(()=>Array.isArray(i.data)?i.data:[i.data]);return(c,m)=>{const f=x;return t(!0),s(h,null,p(d(r),(u,o)=>(t(),s(h,null,[k(f,{type:u,isCode:e.isCode},null,8,["type","isCode"]),o<d(r).length-1?(t(),s("span",j," | ")):l("",!0)],64))),256)}}}),M=["id"],E={class:"inline-block"},z={class:"language-ts inline-block"},D={key:0},G={key:1,class:"language-ts inline-block"},R={key:0},H={key:0},J=n("span",null,"Default : ",-1),F=b({__name:"Variable",props:{id:{type:Number,required:!0},name:{type:String,required:!0},type:{type:Object||Array,required:!1},optional:{type:Boolean,required:!1},comment:{type:Array,required:!1},defaultValue:{type:String,required:!1}},setup(e){return(i,r)=>{const c=q,m=C;return t(),s("div",{id:`item-${e.id}`,class:"flex flex-col gap-4 scroll-mt-72"},[n("div",E,[n("code",z,_(e.name),1),e.type||e.optional||e.comment||e.defaultValue?(t(),s("span",D," : ")):l("",!0),e.type?(t(),s("code",G,[k(c,{data:e.type,"is-code":""},null,8,["data"])])):l("",!0)]),n("div",null,[e.optional?(t(),s("span",R,"(optional) ")):l("",!0),e.comment?(t(),y(m,{key:1,comment:e.comment,class:"inline"},null,8,["comment"])):l("",!0)]),e.defaultValue?(t(),s("div",H,[J,n("span",null,_(e.defaultValue),1)])):l("",!0)],8,M)}}}),K=["id"],U={class:"language-ts flex"},Y={class:"language-ts flex flex-wrap"},Q={class:"token function"},W=n("span",{class:"token punctuation"},"(",-1),X={class:"token param"},Z={key:0,class:"token boolean"},ee={key:1,class:"flex w-fit"},te=n("span",{class:"token punctuation"},": ",-1),ne={class:"token type inline-flex"},se={key:2,class:"token punctuation"},oe=n("span",{class:"token punctuation"},")",-1),le={key:0,class:"flex"},ae=n("span",{class:"token punctuation"}," : ",-1),ie={class:"token type inline-flex"},ce={key:1,class:"my-16"},ue=["id"],de={key:1},re={class:"space-y-16"},S=b({__name:"Method",props:{method:{type:Object,required:!0},isConstructor:{type:Boolean,required:!1,default:!1},isFullPage:{type:Boolean,required:!1,default:!1},hasTitle:{type:Boolean,required:!1}},setup(e){return(i,r)=>{const c=q,m=C,f=F;return t(),s("div",{id:e.hasTitle?"":`item-${e.method.id}`,class:g({"scroll-mt-72 ":!e.hasTitle})},[n("pre",U,[a("      "),n("code",Y,[a(`
        `),n("span",Q,_(e.method.name),1),a(`
        `),W,a(`
        `),(t(!0),s(h,null,p(e.method.params,(u,o)=>(t(),s(h,null,[a(`
          `),n("span",X,_(u.name),1),a(`
          `),u.optional?(t(),s("span",Z,"?")):l("",!0),a(`
          `),u.type?(t(),s("span",ee,[a(`
            `),te,a(`
            `),n("span",ne,[a(`
              `),k(c,{data:u.type,"is-code":""},null,8,["data"]),a(`
            `)]),a(`
          `)])):l("",!0),a(`
          `),o+1<e.method.params.length?(t(),s("span",se,", ")):l("",!0),a(`
        `)],64))),256)),a(`
        `),oe,a(`
        `),e.method.type&&!e.isConstructor?(t(),s("span",le,[a(`
          `),ae,a(`
          `),n("span",ie,[a(`
            `),k(c,{data:e.method.type,"is-code":""},null,8,["data"]),a(`
          `)]),a(`
        `)])):l("",!0),a(`
      `)]),a(`
    `)]),e.method.comment?(t(),y(m,{key:0,comment:e.method.comment,class:"my-16"},null,8,["comment"])):l("",!0),e.method.params?(t(),s("div",ce,[e.isFullPage?(t(),s("h2",{key:0,id:`${e.method.name}-params`},"Parameters",8,ue)):(t(),s("h4",de,"Parameters")),n("div",re,[(t(!0),s(h,null,p(e.method.params,u=>(t(),y(f,{id:u.id,name:u.name,type:u.type,optional:u.optional,comment:u.comment,"default-value":u.defaultValue},null,8,["id","name","type","optional","comment","default-value"]))),256))])])):l("",!0)],10,K)}}}),me=["id"],he={id:"introduction",class:"flex gap-8 items-baseline"},_e={key:0,class:"text-16"},ye=["href"],fe={class:"toc-wrapper"},pe={class:"toc"},ke=n("h2",null,"Summary",-1),be=n("li",null,[n("a",{href:"#introduction"},"Introduction")],-1),$e={key:0},ge=["href"],Ce=b({__name:"Function",props:{libFunction:{type:Object,required:!0}},setup(e){return(i,r)=>{const c=S;return t(),s(h,null,[n("div",{class:"content-wrapper",id:`function-${e.libFunction.name}`},[n("h1",he,[n("span",null,_(e.libFunction.name),1),e.libFunction.source.length?(t(),s("span",_e,[n("a",{href:e.libFunction.source,target:"_blank"},"source",8,ye)])):l("",!0)]),k(c,{method:e.libFunction,"is-full-page":""},null,8,["method"])],8,me),n("div",fe,[n("div",pe,[ke,n("ul",null,[be,e.libFunction.params?(t(),s("li",$e,[n("a",{href:`#${e.libFunction.name}-params`},"Parameters",8,ge)])):l("",!0)])])])],64)}}}),ve=["id"],xe={key:0,class:"flex flex-row-reverse justify-end flex-wrap gap-x-8"},qe=n("span",null," →",-1),Fe={id:"introduction",class:"flex gap-8 items-baseline"},Se={key:0,class:"text-16"},Te=["href"],Ve={key:2,class:"mb-48"},Ae=n("h2",{id:"constructor"},"Constructor",-1),Be={class:"space-y-16"},Ie={key:3,class:"mb-48"},we=n("h2",{id:"properties"},"Properties",-1),Ne={class:"space-y-16"},Le={key:4,class:"mb-48"},Oe=n("h2",{id:"accessors"},"Accessors",-1),Pe={class:"space-y-32"},je=["id"],Me={class:"language-ts inline-block"},Ee={class:"pl-24"},ze={class:"space-y-16"},De={key:0},Ge=n("h4",null,"Getter",-1),Re={class:"pl-24"},He={key:1},Je=n("h4",null,"Setter",-1),Ke={class:"pl-24"},Ue={key:5,class:"mb-48"},Ye=n("h2",{id:"methods"},"Methods",-1),Qe={class:"space-y-32"},We=["id"],Xe={class:"toc-wrapper"},Ze={class:"toc"},et=n("h2",null,"Summary",-1),tt=n("li",null,[n("a",{href:"#introduction"},"Introduction")],-1),nt={key:0},st=n("a",{href:"#constructor"},"Constructor",-1),ot=[st],lt={key:1},at=n("a",{href:"#properties"},"Properties",-1),it=[at],ct={key:2},ut=n("a",{href:"#accessors"},"Accessors",-1),dt=[ut],rt={key:3},mt=n("a",{href:"#methods"},"Methods",-1),ht=[mt],_t=b({__name:"Class",props:{libClass:{type:Object,required:!0}},setup(e){return(i,r)=>{const c=x,m=C,f=S,u=F;return t(),s(h,null,[n("div",{class:"content-wrapper",id:`class-${e.libClass.name}`},[e.libClass.extends&&e.libClass.extends.length?(t(),s("div",xe,[(t(!0),s(h,null,p(e.libClass.extends,o=>(t(),s("p",null,[k(c,{type:o},null,8,["type"]),qe]))),256))])):l("",!0),n("h1",Fe,[n("span",null,_(e.libClass.name),1),e.libClass.source.length?(t(),s("span",Se,[n("a",{href:e.libClass.source,target:"_blank"},"source",8,Te)])):l("",!0)]),e.libClass.comment?(t(),y(m,{key:1,comment:e.libClass.comment},null,8,["comment"])):l("",!0),e.libClass.constructors.length?(t(),s("div",Ve,[Ae,n("div",Be,[(t(!0),s(h,null,p(e.libClass.constructors,o=>(t(),y(f,{method:o,isConstructor:!0},null,8,["method"]))),256))])])):l("",!0),e.libClass.properties.length?(t(),s("div",Ie,[we,n("div",Ne,[(t(!0),s(h,null,p(e.libClass.properties,o=>(t(),y(u,{id:o.id,name:o.name,type:o.type,optional:o.optional,comment:o.comment,"default-value":o.defaultValue},null,8,["id","name","type","optional","comment","default-value"]))),256))])])):l("",!0),e.libClass.accessors.length?(t(),s("div",Le,[Oe,n("div",Pe,[(t(!0),s(h,null,p(e.libClass.accessors,o=>(t(),s("div",null,[n("h3",{id:`item-${o.id}`},[n("code",Me,_(o.name),1)],8,je),n("div",Ee,[o.comment?(t(),y(m,{key:0,comment:o.comment},null,8,["comment"])):l("",!0),n("div",ze,[o.getter?(t(),s("div",De,[Ge,n("div",Re,[k(f,{method:o.getter},null,8,["method"])])])):l("",!0),o.setter?(t(),s("div",He,[Je,n("div",Ke,[k(f,{method:o.setter},null,8,["method"])])])):l("",!0)])])]))),256))])])):l("",!0),e.libClass.methods.length?(t(),s("div",Ue,[Ye,n("div",Qe,[(t(!0),s(h,null,p(e.libClass.methods,o=>(t(),s("div",null,[n("h3",{id:`item-${o.id}`},_(o.name),9,We),k(f,{method:o,class:"pl-24","has-title":""},null,8,["method"])]))),256))])])):l("",!0)],8,ve),n("div",Xe,[n("div",Ze,[et,n("ul",null,[tt,e.libClass.constructors.length?(t(),s("li",nt,ot)):l("",!0),e.libClass.properties.length?(t(),s("li",lt,it)):l("",!0),e.libClass.accessors.length?(t(),s("li",ct,dt)):l("",!0),e.libClass.methods.length?(t(),s("li",rt,ht)):l("",!0)])])])],64)}}}),yt={key:1,class:"page-body-toc"},kt=b({__name:"index",setup(e){const{currentLib:i,currentType:r,currentItem:c}=B();return(m,f)=>{const u=I,o=_t,T=Ce;return!d(i)||!d(r)||!d(c)?(t(),y(u,{key:0})):(t(),s("div",yt,[d(r)==="classes"?(t(),y(o,{key:0,"lib-class":d(c)},null,8,["lib-class"])):d(r)==="functions"?(t(),y(T,{key:1,"lib-function":d(c)},null,8,["lib-function"])):l("",!0)]))}}});export{kt as default};
