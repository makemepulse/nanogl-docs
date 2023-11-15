import{e as L,f as x,L as F,u as P,d as M}from"./index-5b59f019.js";import{p as k,t as p,u,A as t,C as s,E as n,K as C,L as o,G as b,F as f,D as $,H as r,z as E,I as N,J as i,O as y}from"./runtime-core.esm-bundler-b2e16801.js";import{_ as I}from"./UIButton.vue_vue_type_script_setup_true_lang-8e6133a1.js";const D=["innerHTML"],B=k({__name:"Comment",props:{comment:null,inline:{type:Boolean,default:!1}},setup(e){const l=e,{md:m}=L(),a=p(()=>l.inline?m.value.renderInline(l.comment):m.value.render(l.comment));return(h,g)=>u(a)?(t(),s("div",{key:0,class:C({inline:e.inline})},[n("div",{innerHTML:u(a),class:C({inline:e.inline})},null,10,D)],2)):o("",!0)}}),O=k({__name:"Tag",props:{tag:null,big:{type:Boolean}},setup(e){return(l,m)=>(t(),s("div",{class:C({"px-8 py-2 rounded-full ":!0,"text-14":e.big,"text-12":!e.big,"bg-purple-25":e.tag===u(x).ABSTRACT,"bg-green-25":e.tag===u(x).READONLY,"bg-yellow-25":e.tag===u(x).OPTIONAL,"bg-orange-25":e.tag===u(x).PROTECTED,"bg-red-25":e.tag===u(x).PRIVATE})},b(e.tag),3))}}),R={class:"flex gap-4"},T=k({__name:"Tags",props:{tags:null,big:{type:Boolean}},setup(e){return(l,m)=>{const a=O;return t(),s("div",R,[(t(!0),s(f,null,$(e.tags,h=>(t(),r(a,{tag:h,big:e.big},null,8,["tag","big"]))),256))])}}}),j=["href"],G={key:2},H={key:3},S=k({__name:"SingleType",props:{type:null,isCode:{type:Boolean}},setup(e){const l=e,m=p(()=>l.type.kind==="Class"?F.CLASS:l.type.kind==="Function"?F.FUNCTION:null),a=p(()=>l.type.lib&&l.type.name&&m.value?{path:`/api/${l.type.lib}/${m.value}/${l.type.name}`,isInternal:!0}:l.type.source?{path:l.type.source,isInternal:!1}:null);return(h,g)=>{const _=E("RouterLink");return t(),s("span",null,[u(a)&&u(a).isInternal?(t(),r(_,{key:0,class:C({"code-link":e.isCode}),to:u(a).path,target:"_blank"},{default:N(()=>[i(b(e.type.name),1)]),_:1},8,["class","to"])):u(a)&&!u(a).isInternal?(t(),s("a",{key:1,class:C({"code-link":e.isCode}),href:u(a).path,target:"_blank"},b(e.type.name),11,j)):(t(),s("span",G,b(e.type.name),1)),e.type.isArray?(t(),s("span",H,"[]")):o("",!0)])}}}),U={key:0},w=k({__name:"Type",props:{data:null,isCode:{type:Boolean}},setup(e){const l=e,m=p(()=>Array.isArray(l.data)?l.data:[l.data]);return(a,h)=>{const g=S;return t(!0),s(f,null,$(u(m),(_,d)=>(t(),s(f,null,[y(g,{type:_,isCode:e.isCode},null,8,["type","isCode"]),d<u(m).length-1?(t(),s("span",U," | ")):o("",!0)],64))),256)}}}),z=["id"],Y={class:"inline-block"},J={class:"language-ts inline-block"},K={key:0},q={key:1,class:"language-ts inline-block"},Q={key:2,class:"inline-block my-4 ml-8"},W={key:0},X={key:1},Z=n("span",null,"Default : ",-1),ee={class:"language-js inline-block"},V=k({__name:"Variable",props:{id:null,name:null,type:null,tags:null,comment:null,defaultValue:null},setup(e){return(l,m)=>{var _;const a=w,h=T,g=B;return t(),s("div",{id:`item-${e.id}`,class:"flex flex-col gap-4 scroll-mt-72"},[n("div",Y,[n("code",J,b(e.name),1),e.type||e.comment||e.defaultValue?(t(),s("span",K," : ")):o("",!0),e.type?(t(),s("code",q,[y(a,{data:e.type,"is-code":""},null,8,["data"])])):o("",!0),(_=e.tags)!=null&&_.length?(t(),s("div",Q,[y(h,{tags:e.tags},null,8,["tags"])])):o("",!0)]),e.comment?(t(),s("div",W,[y(g,{comment:e.comment,inline:""},null,8,["comment"])])):o("",!0),e.defaultValue?(t(),s("div",X,[Z,n("code",ee,b(e.defaultValue),1)])):o("",!0)],8,z)}}}),te=["id"],ne={class:"language-ts flex"},se={class:"language-ts flex flex-wrap"},oe={class:"token function"},le=n("span",{class:"token punctuation"},"(",-1),ae={class:"token param"},ce={key:0,class:"token boolean"},ie={key:1,class:"flex w-fit"},ue=n("span",{class:"token punctuation"},": ",-1),de={class:"token type inline-flex"},me={key:2,class:"token punctuation"},re=n("span",{class:"token punctuation"},")",-1),he={key:0,class:"flex"},_e=n("span",{class:"token punctuation"}," : ",-1),ye={class:"token type inline-flex"},ge={key:2,class:"my-16"},fe=["id"],be={key:1},ke={key:2},$e={class:"space-y-16"},A=k({__name:"Method",props:{method:null,isConstructor:{type:Boolean,default:!1},isFullPage:{type:Boolean,default:!1},hasTitle:{type:Boolean,default:!1},showSource:{type:Boolean,default:!1}},setup(e){return(l,m)=>{const a=T,h=w,g=B,_=V;return t(),s("div",{id:e.hasTitle?"":`item-${e.method.id}`,class:C({"scroll-mt-72 ":!e.hasTitle})},[y(a,{tags:e.method.tags},null,8,["tags"]),n("pre",ne,[i("      "),n("code",se,[i(`
        `),n("span",oe,b(e.method.name),1),i(`
        `),le,i(`
        `),(t(!0),s(f,null,$(e.method.params,(d,v)=>(t(),s(f,null,[i(`
          `),n("span",ae,b(d.name),1),i(`
          `),d.optional?(t(),s("span",ce,"?")):o("",!0),i(`
          `),d.type?(t(),s("span",ie,[i(`
            `),ue,i(`
            `),n("span",de,[i(`
              `),y(h,{data:d.type,"is-code":""},null,8,["data"]),i(`
            `)]),i(`
          `)])):o("",!0),i(`
          `),v+1<e.method.params.length?(t(),s("span",me,", ")):o("",!0),i(`
        `)],64))),256)),i(`
        `),re,i(`
        `),e.method.type&&!e.isConstructor?(t(),s("span",he,[i(`
          `),_e,i(`
          `),n("span",ye,[i(`
            `),y(h,{data:e.method.type,"is-code":""},null,8,["data"]),i(`
          `)]),i(`
        `)])):o("",!0),i(`
      `)]),i(`
    `)]),e.method.comment?(t(),r(g,{key:0,comment:e.method.comment,class:"my-16"},null,8,["comment"])):o("",!0),e.method.example?(t(),r(g,{key:1,comment:e.method.example,class:"my-16"},null,8,["comment"])):o("",!0),e.method.params?(t(),s("div",ge,[e.isFullPage?(t(),s("h2",{key:0,id:`${e.method.name}-params`},"Parameters",8,fe)):e.isConstructor?(t(),s("h3",be,"Parameters")):(t(),s("h4",ke,"Parameters")),n("div",$e,[(t(!0),s(f,null,$(e.method.params,d=>(t(),r(_,{id:d.id,name:d.name,type:d.type,optional:d.optional,comment:d.comment,tags:d.tags,"default-value":d.defaultValue},null,8,["id","name","type","optional","comment","tags","default-value"]))),256))])])):o("",!0)],10,te)}}}),Ce=["id"],ve={id:"introduction",class:"h1-container flex items-center justify-between"},xe={class:"flex gap-8 items-baseline"},pe={class:"no-margin"},Te={class:"toc-wrapper"},Be={class:"toc"},Fe=n("h2",null,"Summary",-1),Ie=n("li",null,[n("a",{href:"#introduction"},"Introduction")],-1),Se={key:0},we=["href"],Ve=k({__name:"Function",props:{libFunction:null},setup(e){return(l,m)=>{const a=T,h=I,g=A;return t(),s(f,null,[n("div",{class:"content-wrapper",id:`function-${e.libFunction.name}`},[n("div",ve,[n("div",xe,[n("h1",pe,b(e.libFunction.name),1),y(a,{tags:e.libFunction.tags,big:""},null,8,["tags"])]),e.libFunction.source.length?(t(),r(h,{key:0,href:e.libFunction.source,text:"Source",icon:"code","icon-stroke":"",small:""},null,8,["href"])):o("",!0)]),y(g,{method:e.libFunction,"is-full-page":""},null,8,["method"])],8,Ce),n("div",Te,[n("div",Be,[Fe,n("ul",null,[Ie,e.libFunction.params?(t(),s("li",Se,[n("a",{href:`#${e.libFunction.name}-params`},"Parameters",8,we)])):o("",!0)])])])],64)}}}),Ae=["id"],Le={key:0,class:"flex flex-row-reverse justify-end flex-wrap gap-x-8"},Pe=n("span",null," →",-1),Me={id:"introduction",class:"h1-container flex items-center justify-between"},Ee={class:"flex gap-8 items-baseline"},Ne={class:"no-margin"},De={key:3,class:"mb-48"},Oe=n("h2",{id:"constructor"},"Constructor",-1),Re={class:"space-y-16"},je={key:4,class:"mb-48"},Ge=n("h2",{id:"properties"},"Properties",-1),He={class:"space-y-16"},Ue={key:5,class:"mb-48"},ze=n("h2",{id:"accessors"},"Accessors",-1),Ye={class:"space-y-32"},Je=["id"],Ke={class:"language-ts inline-block"},qe={class:"pl-24"},Qe={class:"space-y-16"},We={key:0},Xe=n("h4",null,"Getter",-1),Ze={class:"pl-24"},et={key:1},tt=n("h4",null,"Setter",-1),nt={class:"pl-24"},st={key:6,class:"mb-48"},ot=n("h2",{id:"methods"},"Methods",-1),lt={class:"space-y-32"},at=["id"],ct={class:"toc-wrapper"},it={class:"toc"},ut=n("h2",null,"Summary",-1),dt=n("li",null,[n("a",{href:"#introduction"},"Introduction")],-1),mt={key:0},rt=n("a",{href:"#constructor"},"Constructor",-1),ht=[rt],_t={key:1},yt=n("a",{href:"#properties"},"Properties",-1),gt=[yt],ft={key:2},bt=n("a",{href:"#accessors"},"Accessors",-1),kt=[bt],$t={key:3},Ct=n("a",{href:"#methods"},"Methods",-1),vt=[Ct],xt=k({__name:"Class",props:{libClass:null},setup(e){return(l,m)=>{const a=S,h=T,g=I,_=B,d=A,v=V;return t(),s(f,null,[n("div",{class:"content-wrapper",id:`class-${e.libClass.name}`},[e.libClass.extends&&e.libClass.extends.length?(t(),s("div",Le,[(t(!0),s(f,null,$(e.libClass.extends,c=>(t(),s("p",null,[y(a,{type:c},null,8,["type"]),Pe]))),256))])):o("",!0),n("div",Me,[n("div",Ee,[n("h1",Ne,b(e.libClass.name),1),y(h,{tags:e.libClass.tags,big:""},null,8,["tags"])]),e.libClass.source.length?(t(),r(g,{key:0,href:e.libClass.source,text:"Source",icon:"code","icon-stroke":"",small:""},null,8,["href"])):o("",!0)]),e.libClass.comment?(t(),r(_,{key:1,comment:e.libClass.comment},null,8,["comment"])):o("",!0),e.libClass.example?(t(),r(_,{key:2,comment:e.libClass.example},null,8,["comment"])):o("",!0),e.libClass.constructors.length?(t(),s("div",De,[Oe,n("div",Re,[(t(!0),s(f,null,$(e.libClass.constructors,c=>(t(),r(d,{method:c,isConstructor:!0},null,8,["method"]))),256))])])):o("",!0),e.libClass.properties.length?(t(),s("div",je,[Ge,n("div",He,[(t(!0),s(f,null,$(e.libClass.properties,c=>(t(),r(v,{id:c.id,name:c.name,type:c.type,optional:c.optional,comment:c.comment,tags:c.tags,"default-value":c.defaultValue},null,8,["id","name","type","optional","comment","tags","default-value"]))),256))])])):o("",!0),e.libClass.accessors.length?(t(),s("div",Ue,[ze,n("div",Ye,[(t(!0),s(f,null,$(e.libClass.accessors,c=>(t(),s("div",null,[n("h3",{id:`item-${c.id}`},[n("code",Ke,b(c.name),1)],8,Je),n("div",qe,[c.comment?(t(),r(_,{key:0,comment:c.comment},null,8,["comment"])):o("",!0),n("div",Qe,[c.getter?(t(),s("div",We,[Xe,n("div",Ze,[y(d,{method:c.getter},null,8,["method"])])])):o("",!0),c.setter?(t(),s("div",et,[tt,n("div",nt,[y(d,{method:c.setter},null,8,["method"])])])):o("",!0)])])]))),256))])])):o("",!0),e.libClass.methods.length?(t(),s("div",st,[ot,n("div",lt,[(t(!0),s(f,null,$(e.libClass.methods,c=>(t(),s("div",null,[n("h3",{id:`item-${c.id}`},b(c.name),9,at),y(d,{method:c,class:"pl-24","has-title":""},null,8,["method"])]))),256))])])):o("",!0)],8,Ae),n("div",ct,[n("div",it,[ut,n("ul",null,[dt,e.libClass.constructors.length?(t(),s("li",mt,ht)):o("",!0),e.libClass.properties.length?(t(),s("li",_t,gt)):o("",!0),e.libClass.accessors.length?(t(),s("li",ft,kt)):o("",!0),e.libClass.methods.length?(t(),s("li",$t,vt)):o("",!0)])])])],64)}}}),pt={key:1,class:"page-body-toc"},It=k({__name:"index",setup(e){const{currentLib:l,currentType:m,currentItem:a}=P();return(h,g)=>{const _=M,d=xt,v=Ve;return!u(l)||!u(m)||!u(a)?(t(),r(_,{key:0})):(t(),s("div",pt,[u(m)==="classes"?(t(),r(d,{key:0,"lib-class":u(a)},null,8,["lib-class"])):u(m)==="functions"?(t(),r(v,{key:1,"lib-function":u(a)},null,8,["lib-function"])):o("",!0)]))}}});export{It as default};