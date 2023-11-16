import{e as O,f as p,L as w,u as R,d as U}from"./index-ddc5c6fb.js";import{p as $,t as F,u as i,A as t,C as s,K as x,L as l,Q as j,H as d,I as T,J as o,G as g,F as h,D as k,z as H,O as y,E as n,N as S}from"./runtime-core.esm-bundler-b2e16801.js";import{_ as A}from"./UIButton.vue_vue_type_script_setup_true_lang-3c2fd41d.js";const G=["innerHTML"],V=$({__name:"Comment",props:{comment:null,inline:{type:Boolean,default:!1}},setup(e){const a=e,{md:r}=O(),c=F(()=>a.inline?r.value.renderInline(a.comment):r.value.render(a.comment));return(_,b)=>i(c)?(t(),s("div",{key:0,innerHTML:i(c),class:x({inline:e.inline})},null,10,G)):l("",!0)}}),L=$({__name:"UIPill",props:{big:{type:Boolean}},setup(e){return(a,r)=>(t(),s("div",{class:x(["px-8 py-2 rounded-full",e.big?"text-14":"text-12"])},[j(a.$slots,"default")],2))}}),z=$({__name:"Tag",props:{tag:null,big:{type:Boolean}},setup(e){return(a,r)=>{const c=L;return t(),d(c,{class:x({"bg-purple-25":e.tag===i(p).ABSTRACT,"bg-blue-25":e.tag===i(p).STATIC,"bg-green-25":e.tag===i(p).READONLY,"bg-yellow-25":e.tag===i(p).OPTIONAL,"bg-orange-25":e.tag===i(p).PROTECTED,"bg-red-25":e.tag===i(p).PRIVATE}),big:e.big},{default:T(()=>[o(g(e.tag),1)]),_:1},8,["class","big"])}}}),Y={class:"flex gap-4"},B=$({__name:"Tags",props:{tags:null,big:{type:Boolean}},setup(e){return(a,r)=>{const c=z;return t(),s("div",Y,[(t(!0),s(h,null,k(e.tags,_=>(t(),d(c,{tag:_,big:e.big},null,8,["tag","big"]))),256))])}}}),J=["href"],K={key:2},Q={key:3},N=$({__name:"SingleType",props:{type:null,isCode:{type:Boolean}},setup(e){const a=e,r=F(()=>a.type.kind==="Class"?w.CLASS:a.type.kind==="Function"?w.FUNCTION:null),c=F(()=>a.type.lib&&a.type.name&&r.value?{path:`/api/${a.type.lib}/${r.value}/${a.type.name}`,isInternal:!0}:a.type.source?{path:a.type.source,isInternal:!1}:null);return(_,b)=>{const f=H("RouterLink");return t(),s("span",null,[i(c)&&i(c).isInternal?(t(),d(f,{key:0,class:x({"code-link":e.isCode}),to:i(c).path,target:"_blank"},{default:T(()=>[o(g(e.type.name),1)]),_:1},8,["class","to"])):i(c)&&!i(c).isInternal?(t(),s("a",{key:1,class:x({"code-link":e.isCode}),href:i(c).path,target:"_blank"},g(e.type.name),11,J)):(t(),s("span",K,g(e.type.name),1)),e.type.isArray?(t(),s("span",Q,"[]")):l("",!0)])}}}),q={key:0},M=$({__name:"Type",props:{data:null,isCode:{type:Boolean}},setup(e){const a=e,r=F(()=>Array.isArray(a.data)?a.data:[a.data]);return(c,_)=>{const b=N;return t(!0),s(h,null,k(i(r),(f,C)=>(t(),s(h,null,[y(b,{type:f,isCode:e.isCode},null,8,["type","isCode"]),C<i(r).length-1?(t(),s("span",q," | ")):l("",!0)],64))),256)}}}),W=["id"],X={class:"inline-block"},Z={class:"language-ts inline-block"},ee={key:0},te={key:1,class:"language-ts inline-block"},ne={key:2,class:"inline-block my-4 ml-8"},se={key:0},le={key:1},oe=n("span",null,"Default : ",-1),ae={class:"language-js inline-block"},ce={key:0},E=$({__name:"Variable",props:{id:null,name:null,type:null,tags:null,comment:null,defaultValue:null,defaultType:null},setup(e){return(a,r)=>{var f;const c=M,_=B,b=V;return t(),s("div",{id:`item-${e.id}`,class:"flex flex-col gap-4 scroll-mt-72"},[n("div",X,[n("code",Z,g(e.name),1),e.type||e.comment||e.defaultValue?(t(),s("span",ee," : ")):l("",!0),e.type?(t(),s("code",te,[y(c,{data:e.type,"is-code":""},null,8,["data"])])):l("",!0),(f=e.tags)!=null&&f.length?(t(),s("div",ne,[y(_,{tags:e.tags},null,8,["tags"])])):l("",!0)]),e.comment?(t(),s("div",se,[y(b,{comment:e.comment,inline:""},null,8,["comment"])])):l("",!0),e.defaultValue||e.defaultType?(t(),s("div",le,[oe,n("code",ae,[e.defaultValue?(t(),s("span",ce,g(e.defaultValue),1)):(t(),d(c,{key:1,data:e.defaultType,"is-code":""},null,8,["data"]))])])):l("",!0)],8,W)}}}),ie={class:"language-ts flex"},ue={class:"language-ts flex flex-wrap"},de={class:"token function"},me=n("span",{class:"token punctuation"},"<",-1),re={class:"token type inline-flex"},he=n("span",{class:"token punctuation"},">",-1),ye=n("span",{class:"token punctuation"},"(",-1),ge={class:"token param"},_e={key:0,class:"token boolean"},fe={key:1,class:"flex w-fit"},be=n("span",{class:"token punctuation"},": ",-1),ke={class:"token type inline-flex"},$e={key:2,class:"token punctuation"},Ce=n("span",{class:"token punctuation"},")",-1),ve={key:1,class:"flex"},xe=n("span",{class:"token punctuation"}," : ",-1),pe={class:"token type inline-flex"},Te={key:2,class:"my-16"},Fe={class:"space-y-16"},Ie={key:3,class:"my-16"},Be={class:"space-y-16"},D=$({__name:"Method",props:{method:null,isConstructor:{type:Boolean,default:!1},isFullPage:{type:Boolean,default:!1},showSource:{type:Boolean,default:!1},customName:null,headingComponent:{default:"h4"}},setup(e){const a=e,r=F(()=>a.customName||a.method.name),c=F(()=>a.isFullPage?"h2":a.isConstructor?"h3":"h4");return(_,b)=>{var u;const f=B,C=M,v=V,I=E;return t(),s(h,null,[!e.isConstructor&&!e.isFullPage?(t(),s("div",{key:0,class:x(`${e.headingComponent}-container flex gap-8 items-baseline`)},[(t(),d(S(e.headingComponent),{id:e.method.id?`item-${e.method.id}`:"",class:"no-margin"},{default:T(()=>[o(g(i(r)),1)]),_:1},8,["id"])),e.method.tags.length?(t(),d(f,{key:0,tags:e.method.tags},null,8,["tags"])):l("",!0)],2)):l("",!0),n("div",{class:x({"pl-24":!e.isConstructor&&!e.isFullPage})},[n("pre",ie,[o("      "),n("code",ue,[o(`
        `),n("span",de,g(e.method.name),1),o(`
        `),(u=e.method.typeParams)!=null&&u.length?(t(),s(h,{key:0},[o(`
          `),me,o(`
          `),(t(!0),s(h,null,k(e.method.typeParams,(m,P)=>(t(),s("span",re,[o(`
            `),n("span",null,g(m.name+(P<e.method.typeParams.length-1?", ":"")),1),o(`
          `)]))),256)),o(`
          `),he,o(`
        `)],64)):l("",!0),o(`
        `),ye,o(`
        `),(t(!0),s(h,null,k(e.method.params,(m,P)=>(t(),s(h,null,[o(`
          `),n("span",ge,g(m.name),1),o(`
          `),m.optional?(t(),s("span",_e,"?")):l("",!0),o(`
          `),m.type?(t(),s("span",fe,[o(`
            `),be,o(`
            `),n("span",ke,[o(`
              `),y(C,{data:m.type,"is-code":""},null,8,["data"]),o(`
            `)]),o(`
          `)])):l("",!0),o(`
          `),P+1<e.method.params.length?(t(),s("span",$e,", ")):l("",!0),o(`
        `)],64))),256)),o(`
        `),Ce,o(`
        `),e.method.type&&!e.isConstructor?(t(),s("span",ve,[o(`
          `),xe,o(`
          `),n("span",pe,[o(`
            `),y(C,{data:e.method.type,"is-code":""},null,8,["data"]),o(`
          `)]),o(`
        `)])):l("",!0),o(`
      `)]),o(`
    `)]),e.method.comment?(t(),d(v,{key:0,comment:e.method.comment,class:"my-16"},null,8,["comment"])):l("",!0),e.method.example?(t(),d(v,{key:1,comment:e.method.example,class:"my-16"},null,8,["comment"])):l("",!0),e.method.typeParams?(t(),s("div",Te,[(t(),d(S(i(c)),{id:e.isFullPage?`${e.method.name}-type-params`:""},{default:T(()=>[o(" Type parameters ")]),_:1},8,["id"])),n("div",Fe,[(t(!0),s(h,null,k(e.method.typeParams,m=>(t(),d(I,{id:m.id,name:m.name,type:m.type,comment:m.comment,tags:m.tags,"default-type":m.default},null,8,["id","name","type","comment","tags","default-type"]))),256))])])):l("",!0),e.method.params?(t(),s("div",Ie,[(t(),d(S(i(c)),{id:e.isFullPage?`${e.method.name}-params`:""},{default:T(()=>[o(" Parameters ")]),_:1},8,["id"])),n("div",Be,[(t(!0),s(h,null,k(e.method.params,m=>(t(),d(I,{id:m.id,name:m.name,type:m.type,optional:m.optional,comment:m.comment,tags:m.tags,"default-value":m.defaultValue},null,8,["id","name","type","optional","comment","tags","default-value"]))),256))])])):l("",!0)],2)],64)}}}),Pe=["id"],Se={id:"introduction",class:"h1-container flex items-center justify-between"},Ve={class:"flex gap-8 items-baseline"},we={class:"no-margin"},Ae={class:"toc-wrapper"},Le={class:"toc"},Ne=n("h2",null,"Summary",-1),Me=n("li",null,[n("a",{href:"#introduction"},"Introduction")],-1),Ee={key:0},De=["href"],Oe=$({__name:"Function",props:{libFunction:null},setup(e){return(a,r)=>{const c=B,_=A,b=D;return t(),s(h,null,[n("div",{class:"content-wrapper",id:`function-${e.libFunction.name}`},[n("div",Se,[n("div",Ve,[n("h1",we,g(e.libFunction.name),1),y(c,{tags:e.libFunction.tags,big:""},null,8,["tags"])]),e.libFunction.source.length?(t(),d(_,{key:0,href:e.libFunction.source,text:"Source",icon:"code","icon-stroke":"",small:""},null,8,["href"])):l("",!0)]),y(b,{method:e.libFunction,"is-full-page":""},null,8,["method"])],8,Pe),n("div",Ae,[n("div",Le,[Ne,n("ul",null,[Me,e.libFunction.params?(t(),s("li",Ee,[n("a",{href:`#${e.libFunction.name}-params`},"Parameters",8,De)])):l("",!0)])])])],64)}}}),Re=["id"],Ue={key:0,class:"flex flex-row-reverse justify-end flex-wrap gap-x-8"},je=n("span",null," →",-1),He={id:"introduction",class:"h1-container flex flex-col"},Ge={class:"flex items-center justify-between"},ze={class:"flex gap-8 items-baseline"},Ye={class:"no-margin"},Je={key:3,class:"mb-48"},Ke=n("h2",{id:"constructor"},"Constructor",-1),Qe={class:"space-y-16"},qe={key:4,class:"mb-48"},We=n("h2",{id:"properties"},"Properties",-1),Xe={class:"space-y-16"},Ze={key:5,class:"mb-48"},et=n("h2",{id:"accessors"},"Accessors",-1),tt={class:"space-y-32"},nt=["id"],st={class:"language-ts inline-block"},lt={class:"pl-24"},ot={class:"space-y-16"},at={key:0},ct={key:1},it={key:6,class:"mb-48"},ut=n("h2",{id:"methods"},"Methods",-1),dt={class:"space-y-32"},mt={class:"toc-wrapper"},rt={class:"toc"},ht=n("h2",null,"Summary",-1),yt=n("li",null,[n("a",{href:"#introduction"},"Introduction")],-1),gt={key:0},_t=n("a",{href:"#constructor"},"Constructor",-1),ft=[_t],bt={key:1},kt=n("a",{href:"#properties"},"Properties",-1),$t=[kt],Ct={key:2},vt=n("a",{href:"#accessors"},"Accessors",-1),xt=[vt],pt={key:3},Tt=n("a",{href:"#methods"},"Methods",-1),Ft=[Tt],It=$({__name:"Class",props:{libClass:null},setup(e){return(a,r)=>{const c=N,_=B,b=A,f=L,C=V,v=D,I=E;return t(),s(h,null,[n("div",{class:"content-wrapper",id:`class-${e.libClass.name}`},[e.libClass.extends&&e.libClass.extends.length?(t(),s("div",Ue,[(t(!0),s(h,null,k(e.libClass.extends,u=>(t(),s("p",null,[y(c,{type:u},null,8,["type"]),je]))),256))])):l("",!0),n("div",He,[n("div",Ge,[n("div",ze,[n("h1",Ye,g(e.libClass.name),1),e.libClass.tags.length?(t(),d(_,{key:0,tags:e.libClass.tags,big:""},null,8,["tags"])):l("",!0)]),e.libClass.source.length?(t(),d(b,{key:0,href:e.libClass.source,text:"Source",icon:"code","icon-stroke":"",small:""},null,8,["href"])):l("",!0)]),e.libClass.implements?(t(),d(f,{key:0,class:"self-start bg-grey",big:""},{default:T(()=>[n("span",null,[o("implements "),y(c,{type:e.libClass.implements},null,8,["type"])])]),_:1})):l("",!0)]),e.libClass.comment?(t(),d(C,{key:1,comment:e.libClass.comment},null,8,["comment"])):l("",!0),e.libClass.example?(t(),d(C,{key:2,comment:e.libClass.example},null,8,["comment"])):l("",!0),e.libClass.constructors.length?(t(),s("div",Je,[Ke,n("div",Qe,[(t(!0),s(h,null,k(e.libClass.constructors,u=>(t(),d(v,{method:u,isConstructor:!0},null,8,["method"]))),256))])])):l("",!0),e.libClass.properties.length?(t(),s("div",qe,[We,n("div",Xe,[(t(!0),s(h,null,k(e.libClass.properties,u=>(t(),d(I,{id:u.id,name:u.name,type:u.type,optional:u.optional,comment:u.comment,tags:u.tags,"default-value":u.defaultValue},null,8,["id","name","type","optional","comment","tags","default-value"]))),256))])])):l("",!0),e.libClass.accessors.length?(t(),s("div",Ze,[et,n("div",tt,[(t(!0),s(h,null,k(e.libClass.accessors,u=>(t(),s("div",null,[n("h3",{id:`item-${u.id}`},[n("code",st,g(u.name),1)],8,nt),n("div",lt,[u.comment?(t(),d(C,{key:0,comment:u.comment},null,8,["comment"])):l("",!0),n("div",ot,[u.getter?(t(),s("div",at,[y(v,{method:u.getter,"custom-name":"Getter","heading-component":"h4"},null,8,["method"])])):l("",!0),u.setter?(t(),s("div",ct,[y(v,{method:u.setter,"custom-name":"Setter","heading-component":"h4"},null,8,["method"])])):l("",!0)])])]))),256))])])):l("",!0),e.libClass.methods.length?(t(),s("div",it,[ut,n("div",dt,[(t(!0),s(h,null,k(e.libClass.methods,u=>(t(),s("div",null,[y(v,{method:u,"heading-component":"h3"},null,8,["method"])]))),256))])])):l("",!0)],8,Re),n("div",mt,[n("div",rt,[ht,n("ul",null,[yt,e.libClass.constructors.length?(t(),s("li",gt,ft)):l("",!0),e.libClass.properties.length?(t(),s("li",bt,$t)):l("",!0),e.libClass.accessors.length?(t(),s("li",Ct,xt)):l("",!0),e.libClass.methods.length?(t(),s("li",pt,Ft)):l("",!0)])])])],64)}}}),Bt={key:1,class:"page-body-toc"},wt=$({__name:"index",setup(e){const{currentLib:a,currentType:r,currentItem:c}=R();return(_,b)=>{const f=U,C=It,v=Oe;return!i(a)||!i(r)||!i(c)?(t(),d(f,{key:0})):(t(),s("div",Bt,[i(r)==="classes"?(t(),d(C,{key:0,"lib-class":i(c)},null,8,["lib-class"])):i(r)==="functions"?(t(),d(v,{key:1,"lib-function":i(c)},null,8,["lib-function"])):l("",!0)]))}}});export{wt as default};