import{e as ne,f as D,L as F,u as ie,d as ue}from"./index-1ad00a32.js";import{p as k,t as E,u as c,A as t,C as s,H as d,I as x,J as L,G as o,N,L as a,E as n,K as I,F as r,Q as W,D as C,O as y,z as se}from"./runtime-core.esm-bundler-b2e16801.js";import{_ as de}from"./UIButton.vue_vue_type_script_setup_true_lang-8553c8f6.js";const re=["innerHTML"],P=k({__name:"Comment",props:{comment:null,inline:{type:Boolean,default:!1},title:null,headingComponent:{default:"h4"}},setup(e){const i=e,{md:u}=ne(),l=E(()=>i.inline?u.value.renderInline(i.comment):u.value.render(i.comment));return(m,f)=>c(l)?(t(),s(r,{key:0},[e.title?(t(),d(N(e.headingComponent),{key:0},{default:x(()=>[L(o(e.title),1)]),_:1})):a("",!0),n("div",{innerHTML:c(l),class:I({inline:e.inline})},null,10,re)],64)):a("",!0)}}),H=k({__name:"UIPill",props:{big:{type:Boolean}},setup(e){return(i,u)=>(t(),s("div",{class:I(["px-8 py-2 rounded-full",e.big?"text-14":"text-12"])},[W(i.$slots,"default")],2))}}),me=k({__name:"Tag",props:{tag:null,big:{type:Boolean}},setup(e){return(i,u)=>{const l=H;return t(),d(l,{class:I({"bg-purple-25":e.tag===c(D).ABSTRACT,"bg-blue-25":e.tag===c(D).STATIC,"bg-green-25":e.tag===c(D).READONLY,"bg-yellow-25":e.tag===c(D).OPTIONAL,"bg-orange-25":e.tag===c(D).PROTECTED,"bg-red-25":e.tag===c(D).PRIVATE}),big:e.big},{default:x(()=>[L(o(e.tag),1)]),_:1},8,["class","big"])}}}),ye={class:"flex gap-4"},j=k({__name:"Tags",props:{tags:null,big:{type:Boolean}},setup(e){return(i,u)=>{const l=me;return t(),s("div",ye,[(t(!0),s(r,null,C(e.tags,m=>(t(),d(l,{tag:m,big:e.big},null,8,["tag","big"]))),256))])}}}),he=n("span",{class:"token punctuation"},o("<"),-1),_e={key:0,class:"token punctuation"},pe=n("span",{class:"token punctuation"},o(">"),-1),fe=k({__name:"TypeArguments",props:{args:null},setup(e){return(i,u)=>{const l=S;return t(),s(r,null,[he,(t(!0),s(r,null,C(e.args,(m,f)=>(t(),s(r,null,[y(l,{data:m,"is-code":""},null,8,["data"]),f<e.args.length-1?(t(),s("span",_e,o(", "))):a("",!0)],64))),256)),pe],64)}}}),ge={key:0,class:"token keyword"},$e={key:1,class:"token keyword"},ke={key:2,class:"token keyword"},be={key:3,class:"token keyword"},Te=n("span",{class:"token punctuation"},o("["),-1),ve={key:0},Ce=n("span",{class:"token punctuation"},o("]"),-1),xe=n("span",{class:"token keyword"},o(" extends "),-1),Ie=n("span",{class:"token operator"},o(" ? "),-1),Ee=n("span",{class:"token operator"},o(" : "),-1),Fe=n("span",{class:"token keyword"},o(" is "),-1),ae=k({__name:"TypeWrapper",props:{typeData:null},setup(e){const i=e,u=E(()=>{if(!i.typeData.hasOwnProperty("list"))return i.typeData});return(l,m)=>{var p,g,v,b,h,T,$,w,A,B,Y,G,z,Q,J,K,q,X,Z,ee,te;const f=fe,_=S;return t(),s(r,null,[(g=(p=c(u))==null?void 0:p.data)!=null&&g.useAsserts?(t(),s("span",ge,o("asserts "))):a("",!0),e.typeData.isQuery?(t(),s("span",$e,o("typeof "))):a("",!0),(v=e.typeData.data)!=null&&v.operator?(t(),s("span",ke,o(`${(b=e.typeData.data)==null?void 0:b.operator} `),1)):a("",!0),(h=c(u))!=null&&h.isInferred?(t(),s("span",be,o("infer "))):a("",!0),W(l.$slots,"default"),($=(T=c(u))==null?void 0:T.data)!=null&&$.arguments?(t(),d(f,{key:4,args:(A=(w=c(u))==null?void 0:w.data)==null?void 0:A.arguments},null,8,["args"])):a("",!0),e.typeData.isArray||e.typeData.isIndexed?(t(),s(r,{key:5},[Te,(B=e.typeData.data)!=null&&B.indexType?(t(),s("span",ve,[y(_,{data:(Y=e.typeData.data)==null?void 0:Y.indexType,"is-code":""},null,8,["data"])])):a("",!0),Ce],64)):a("",!0),(G=e.typeData.data)!=null&&G.extendsType?(t(),s(r,{key:6},[xe,y(_,{data:(z=e.typeData.data)==null?void 0:z.extendsType,"is-code":""},null,8,["data"])],64)):a("",!0),((J=(Q=e.typeData.data)==null?void 0:Q.conditionalTypes)==null?void 0:J.length)>1?(t(),s(r,{key:7},[Ie,y(_,{data:(K=e.typeData.data)==null?void 0:K.conditionalTypes[0],"is-code":""},null,8,["data"]),Ee,y(_,{data:(q=e.typeData.data)==null?void 0:q.conditionalTypes[1],"is-code":""},null,8,["data"])],64)):a("",!0),(Z=(X=c(u))==null?void 0:X.data)!=null&&Z.targetType?(t(),s(r,{key:8},[Fe,y(_,{data:(te=(ee=c(u))==null?void 0:ee.data)==null?void 0:te.targetType,"is-code":""},null,8,["data"])],64)):a("",!0)],64)}}}),we=n("span",{class:"token punctuation"},o("{ "),-1),Le={class:"token property"},Ae=n("span",{class:"token punctuation"},o(": "),-1),Pe={key:0,class:"token punctuation"},Se=n("span",{class:"token punctuation"},o(" }"),-1),De=k({__name:"TypeObject",props:{properties:null},setup(e){return(i,u)=>{const l=S;return t(),s(r,null,[we,(t(!0),s(r,null,C(e.properties,(m,f)=>(t(),s(r,null,[n("span",Le,o(m.name),1),Ae,y(l,{data:m.type,"is-code":""},null,8,["data"]),f<e.properties.length-1?(t(),s("span",Pe,o(", "))):a("",!0)],64))),256)),Se],64)}}}),Ve={class:"token punctuation"},Be={class:"token param"},Ne={key:0,class:"token boolean"},Me=n("span",{class:"token punctuation"},o(": "),-1),Oe={key:2,class:"token punctuation"},We=n("span",{class:"token punctuation"},o(")"),-1),Ue=n("span",{class:"token operator"},o(" => "),-1),Re={key:1,class:"token punctuation"},He=k({__name:"TypeFunction",props:{func:null},setup(e){return(i,u)=>{const l=S;return t(),s(r,null,[n("span",Ve,o("("),1),(t(!0),s(r,null,C(e.func.params,(m,f)=>(t(),s(r,null,[n("span",Be,o(m.name),1),m.optional?(t(),s("span",Ne,"?")):a("",!0),m.type?(t(),s(r,{key:1},[Me,y(l,{data:m.type,"is-code":""},null,8,["data"])],64)):a("",!0),f+1<e.func.params.length?(t(),s("span",Oe,o(", "))):a("",!0)],64))),256)),We,Ue,e.func.type?(t(),d(l,{key:0,data:e.func.type,"is-code":""},null,8,["data"])):(t(),s("span",Re,o("{}")))],64)}}}),je=e=>e==="Class"?F.CLASS:e==="Function"?F.FUNCTION:e==="Interface"?F.INTERFACE:e==="Type alias"?F.TYPE:e==="Enumeration"?F.ENUM:null,Ye=["href"],U=k({__name:"SingleType",props:{type:null,isCode:{type:Boolean}},setup(e){const i=e,u=E(()=>i.type.parent?i.type.parent:i.type),l=E(()=>{if(i.type.lib&&u.value.name&&u.value.kind){const _=je(u.value.kind);if(_)return{path:`/api/${i.type.lib}/${_}/${u.value.name}`,isInternal:!0}}return i.type.source?{path:i.type.source,isInternal:!1}:null}),m=E(()=>i.type.parent?`.${i.type.name}`:null),f=E(()=>{var _,p,g;return!((_=i.type.data)!=null&&_.literalType)||((p=i.type.data)==null?void 0:p.literalType)==="null"?"type":(g=i.type.data)==null?void 0:g.literalType});return(_,p)=>{var T,$,w,A,B;const g=He,v=De,b=se("RouterLink"),h=ae;return(T=e.type.data)!=null&&T.function?(t(),d(g,{key:0,func:($=e.type.data)==null?void 0:$.function},null,8,["func"])):(A=(w=e.type.data)==null?void 0:w.properties)!=null&&A.length?(t(),d(v,{key:1,properties:(B=e.type.data)==null?void 0:B.properties},null,8,["properties"])):(t(),d(h,{key:2,"type-data":e.type},{default:x(()=>[c(l)&&c(l).isInternal?(t(),d(b,{key:0,class:I({"code-link":e.isCode}),to:c(l).path},{default:x(()=>[n("span",{class:I(`token ${c(f)}`)},o(c(u).name),3)]),_:1},8,["class","to"])):c(l)&&!c(l).isInternal?(t(),s("a",{key:1,class:I({"code-link":e.isCode}),href:c(l).path,target:"_blank"},[n("span",{class:I(`token ${c(f)}`)},o(c(u).name),3)],10,Ye)):a("",!0),!c(l)||c(m)?(t(),s("span",{key:2,class:I(`token ${c(f)}`)},o(c(l)?c(m):e.type.name),3)):a("",!0)]),_:1},8,["type-data"]))}}}),Ge={key:0,class:"token punctuation"},ze={key:0,class:"token operator"},Qe={key:1,class:"token operator"},Je={key:2,class:"token punctuation"},Ke={key:1,class:"token punctuation"},S=k({__name:"Type",props:{data:null,isCode:{type:Boolean}},setup(e){const i=e,u=E(()=>{if(!(!i.data.hasOwnProperty("list")||!i.data.hasOwnProperty("listType")))return i.data}),l=E(()=>i.data?u.value?u.value.list:[i.data]:[]);return(m,f)=>{const _=se("Type",!0),p=ae,g=U;return c(l).length?(t(),s(r,{key:0},[c(u)&&c(l).length>1?(t(),d(p,{key:0,"type-data":c(u)},{default:x(()=>[c(u).listType==="tuple"?(t(),s("span",Ge,o("["))):a("",!0),(t(!0),s(r,null,C(c(l),(v,b)=>(t(),s(r,null,[y(_,{data:v,isCode:e.isCode},null,8,["data","isCode"]),b<c(l).length-1?(t(),s(r,{key:0},[c(u).listType==="union"?(t(),s("span",ze,o(" | "))):a("",!0),c(u).listType==="intersection"?(t(),s("span",Qe,o(" & "))):a("",!0),c(u).listType==="tuple"?(t(),s("span",Je,o(", "))):a("",!0)],64)):a("",!0)],64))),256)),c(u).listType==="tuple"?(t(),s("span",Ke,o("]"))):a("",!0)]),_:1},8,["type-data"])):(t(),d(g,{key:1,type:c(l)[0],isCode:e.isCode},null,8,["type","isCode"]))],64)):a("",!0)}}}),qe=k({__name:"Fragment",props:{class:null},setup(e){return(i,u)=>W(i.$slots,"default")}}),V=k({__name:"CodeWrapper",props:{lang:{default:"ts"},isInline:{type:Boolean}},setup(e){const i=e,u=E(()=>i.isInline?qe:"pre");return(l,m)=>(t(),d(N(c(u)),{class:I(!e.isInline&&`language-${e.lang} flex`)},{default:x(()=>[n("code",{class:I(`language-${e.lang} collapse-space`)},[W(l.$slots,"default")],2)]),_:3},8,["class"]))}}),Xe=["id"],Ze={class:"inline-block"},et={key:0},tt={key:2,class:"inline-block my-4 ml-8"},nt={key:0},st={key:1},at=n("span",null,"Default : ",-1),ct=["innerHTML"],lt={key:0,class:"token null"},M=k({__name:"Variable",props:{id:null,name:null,type:null,tags:null,comment:null,defaultValue:null,defaultType:null},setup(e){const i=e,{md:u}=ne(),l=E(()=>{if(!(!i.defaultValue||i.defaultValue==="null"))return u.value.renderInline(`\`${i.defaultValue}\``)});return(m,f)=>{var b;const _=V,p=S,g=j,v=P;return t(),s("div",{id:`item-${e.id}`,class:"flex flex-col gap-4 scroll-mt-72"},[n("div",Ze,[y(_,{"is-inline":""},{default:x(()=>[L(o(e.name),1)]),_:1}),e.type||e.comment||e.defaultValue?(t(),s("span",et," : ")):a("",!0),e.type?(t(),d(_,{key:1,"is-inline":""},{default:x(()=>[y(p,{data:e.type,"is-code":""},null,8,["data"])]),_:1})):a("",!0),(b=e.tags)!=null&&b.length?(t(),s("div",tt,[y(g,{tags:e.tags},null,8,["tags"])])):a("",!0)]),e.comment?(t(),s("div",nt,[y(v,{comment:e.comment,inline:""},null,8,["comment"])])):a("",!0),e.defaultValue||e.defaultType?(t(),s("div",st,[at,c(l)?(t(),s("span",{key:0,innerHTML:c(l)},null,8,ct)):(t(),d(_,{key:1,lang:"ts","is-inline":""},{default:x(()=>[e.defaultValue==="null"?(t(),s("span",lt,"null")):(t(),d(p,{key:1,data:e.defaultType,"is-code":""},null,8,["data"]))]),_:1}))])):a("",!0)],8,Xe)}}}),ot=n("span",{class:"token punctuation"},o("<"),-1),it={key:0,class:"token punctuation"},ut=n("span",{class:"token punctuation"},o(">"),-1),ce=k({__name:"TypeParams",props:{params:null},setup(e){return(i,u)=>(t(),s(r,null,[ot,(t(!0),s(r,null,C(e.params,(l,m)=>(t(),s(r,null,[n("span",null,o(l.name),1),m<e.params.length-1?(t(),s("span",it,o(", "))):a("",!0)],64))),256)),ut],64))}}),dt={class:"flex items-center justify-between"},rt={class:"flex gap-8 items-baseline"},mt={class:"no-margin"},O=k({__name:"Title",props:{name:null,tags:null,source:null},setup(e){return(i,u)=>{const l=j,m=de;return t(),s("div",dt,[n("div",rt,[n("h1",mt,o(e.name),1),e.tags.length?(t(),d(l,{key:0,tags:e.tags,big:""},null,8,["tags"])):a("",!0)]),e.source.length?(t(),d(m,{key:0,href:e.source,text:"Source",icon:"code","icon-stroke":"",small:""},null,8,["href"])):a("",!0)])}}}),yt=["id"],ht={id:"introduction",class:"h1-container"},_t=n("span",{class:"token keyword"},o("type "),-1),pt={class:""},ft=n("span",{class:"token punctuation"},o(" = "),-1),gt={key:2,class:"my-16"},$t=n("h3",{id:"type-params"}," Type parameters ",-1),kt={class:"space-y-24"},bt={class:"toc-wrapper"},Tt={class:"toc"},vt=n("h2",null,"Summary",-1),Ct=n("li",null,[n("a",{href:"#introduction"},"Introduction")],-1),xt={key:0},It=n("a",{href:"#type-params"},"Type parameters",-1),Et=[It],Ft=k({__name:"LibType",props:{libType:null},setup(e){return(i,u)=>{var v,b;const l=O,m=ce,f=S,_=V,p=P,g=M;return t(),s(r,null,[n("div",{class:"content-wrapper",id:`lib-type-${e.libType.name}`},[n("div",ht,[y(l,{name:e.libType.name,tags:e.libType.tags,source:e.libType.source},null,8,["name","tags","source"])]),y(_,null,{default:x(()=>{var h;return[_t,n("span",pt,o(e.libType.name),1),(h=e.libType.params)!=null&&h.length?(t(),d(m,{key:0,params:e.libType.params},null,8,["params"])):a("",!0),ft,y(f,{data:e.libType.type,"is-code":""},null,8,["data"])]}),_:1}),e.libType.comment?(t(),d(p,{key:0,comment:e.libType.comment},null,8,["comment"])):a("",!0),e.libType.example?(t(),d(p,{key:1,title:"Example",comment:e.libType.example},null,8,["comment"])):a("",!0),(v=e.libType.params)!=null&&v.length?(t(),s("div",gt,[$t,n("div",kt,[(t(!0),s(r,null,C(e.libType.params,h=>(t(),d(g,{id:h.id,name:h.name,type:h.type,comment:h.comment,tags:h.tags,"default-type":h.default},null,8,["id","name","type","comment","tags","default-type"]))),256))])])):a("",!0)],8,yt),n("div",bt,[n("div",Tt,[vt,n("ul",null,[Ct,(b=e.libType.params)!=null&&b.length?(t(),s("li",xt,Et)):a("",!0)])])])],64)}}}),wt=["id"],Lt={id:"introduction",class:"h1-container"},At=n("span",{class:"token keyword"},o("enum "),-1),Pt={class:""},St={key:2,class:"mb-48"},Dt=n("h2",{id:"members"},"Members",-1),Vt={class:"space-y-24"},Bt=n("div",{class:"toc-wrapper"},[n("div",{class:"toc"},[n("h2",null,"Summary"),n("ul",null,[n("li",null,[n("a",{href:"#introduction"},"Introduction")])])])],-1),Nt=k({__name:"Enum",props:{libEnum:null},setup(e){return(i,u)=>{const l=O,m=V,f=P,_=M;return t(),s(r,null,[n("div",{class:"content-wrapper",id:`enum-${e.libEnum.name}`},[n("div",Lt,[y(l,{name:e.libEnum.name,tags:e.libEnum.tags,source:e.libEnum.source},null,8,["name","tags","source"])]),y(m,null,{default:x(()=>[At,n("span",Pt,o(e.libEnum.name),1)]),_:1}),e.libEnum.comment?(t(),d(f,{key:0,comment:e.libEnum.comment},null,8,["comment"])):a("",!0),e.libEnum.example?(t(),d(f,{key:1,title:"Example",comment:e.libEnum.example},null,8,["comment"])):a("",!0),e.libEnum.members.length?(t(),s("div",St,[Dt,n("div",Vt,[(t(!0),s(r,null,C(e.libEnum.members,p=>(t(),d(_,{id:p.id,name:p.name,type:p.type,comment:p.comment,tags:p.tags},null,8,["id","name","type","comment","tags"]))),256))])])):a("",!0)],8,wt),Bt],64)}}}),Mt={class:"token function"},Ot={class:"token punctuation"},Wt={class:"token param"},Ut={key:0,class:"token boolean"},Rt=n("span",{class:"token punctuation"},o(": "),-1),Ht={key:2,class:"token punctuation"},jt=n("span",{class:"token punctuation"},o(")"),-1),Yt=n("span",{class:"token punctuation"},o(" : "),-1),Gt={key:0,class:"my-16"},zt={key:1,class:"my-16"},Qt={class:"space-y-24"},Jt={key:2,class:"my-16"},Kt={class:"space-y-24"},qt={key:3,class:"my-16"},R=k({__name:"Function",props:{func:null,isConstructor:{type:Boolean,default:!1},isFullPage:{type:Boolean,default:!1},showSource:{type:Boolean,default:!1},customName:null,headingComponent:{default:"h4"}},setup(e){const i=e,u=E(()=>i.customName||i.func.name),l=E(()=>i.isFullPage?"h2":i.isConstructor?"h3":"h4");return(m,f)=>{var T;const _=j,p=ce,g=S,v=V,b=P,h=M;return t(),s(r,null,[!e.isConstructor&&!e.isFullPage?(t(),s("div",{key:0,class:I(`${e.headingComponent}-container flex gap-8 items-baseline`)},[(t(),d(N(e.headingComponent),{id:e.func.id?`item-${e.func.id}`:"",class:"no-margin"},{default:x(()=>[L(o(c(u)),1)]),_:1},8,["id"])),e.func.tags.length?(t(),d(_,{key:0,tags:e.func.tags},null,8,["tags"])):a("",!0)],2)):a("",!0),n("div",{class:I({"pl-24":!e.isConstructor&&!e.isFullPage})},[y(v,null,{default:x(()=>{var $;return[n("span",Mt,o(e.func.name),1),($=e.func.typeParams)!=null&&$.length?(t(),d(p,{key:0,params:e.func.typeParams},null,8,["params"])):a("",!0),n("span",Ot,o("("),1),(t(!0),s(r,null,C(e.func.params,(w,A)=>(t(),s(r,null,[n("span",Wt,o(w.name),1),w.optional?(t(),s("span",Ut,o("?"))):a("",!0),w.type?(t(),s(r,{key:1},[Rt,y(g,{data:w.type,"is-code":""},null,8,["data"])],64)):a("",!0),A+1<e.func.params.length?(t(),s("span",Ht,o(", "))):a("",!0)],64))),256)),jt,e.func.type&&!e.isConstructor?(t(),s(r,{key:1},[Yt,y(g,{data:e.func.type,"is-code":""},null,8,["data"])],64)):a("",!0)]}),_:1}),e.func.comment?(t(),s("div",Gt,[y(b,{comment:e.func.comment},null,8,["comment"])])):a("",!0),(T=e.func.typeParams)!=null&&T.length?(t(),s("div",zt,[(t(),d(N(c(l)),{id:e.isFullPage?`${e.func.name}-type-params`:""},{default:x(()=>[L(" Type parameters ")]),_:1},8,["id"])),n("div",Qt,[(t(!0),s(r,null,C(e.func.typeParams,$=>(t(),d(h,{id:$.id,name:$.name,type:$.type,comment:$.comment,tags:$.tags,"default-type":$.default},null,8,["id","name","type","comment","tags","default-type"]))),256))])])):a("",!0),e.func.params?(t(),s("div",Jt,[(t(),d(N(c(l)),{id:e.isFullPage?`${e.func.name}-params`:""},{default:x(()=>[L(" Parameters ")]),_:1},8,["id"])),n("div",Kt,[(t(!0),s(r,null,C(e.func.params,$=>(t(),d(h,{id:$.id,name:$.name,type:$.type,comment:$.comment,tags:$.tags,"default-value":$.defaultValue},null,8,["id","name","type","comment","tags","default-value"]))),256))])])):a("",!0),e.func.example?(t(),s("div",qt,[y(b,{title:"Example",comment:e.func.example,"heading-component":c(l)},null,8,["comment","heading-component"])])):a("",!0)],2)],64)}}}),Xt=["id"],Zt={class:"pl-24"},en={class:"space-y-16"},tn={key:0},nn={key:1},le=k({__name:"Accessor",props:{accessor:null},setup(e){return(i,u)=>{const l=V,m=P,f=R;return t(),s("div",null,[n("h3",{id:`item-${e.accessor.id}`},[y(l,{"is-inline":""},{default:x(()=>[L(o(e.accessor.name),1)]),_:1})],8,Xt),n("div",Zt,[e.accessor.comment?(t(),d(m,{key:0,comment:e.accessor.comment},null,8,["comment"])):a("",!0),n("div",en,[e.accessor.getter?(t(),s("div",tn,[y(f,{func:e.accessor.getter,"custom-name":"Getter","heading-component":"h4"},null,8,["func"])])):a("",!0),e.accessor.setter?(t(),s("div",nn,[y(f,{func:e.accessor.setter,"custom-name":"Setter","heading-component":"h4"},null,8,["func"])])):a("",!0)])])])}}}),sn={key:0,class:"flex flex-row-reverse justify-end flex-wrap gap-x-8"},an=n("span",null," →",-1),oe=k({__name:"Extends",props:{extendsList:null},setup(e){return(i,u)=>{const l=U;return e.extendsList&&e.extendsList.length?(t(),s("div",sn,[(t(!0),s(r,null,C(e.extendsList,m=>(t(),s("p",null,[y(l,{type:m},null,8,["type"]),an]))),256))])):a("",!0)}}}),cn=["id"],ln={id:"introduction",class:"h1-container flex flex-col"},on=n("span",null,"implemented by ",-1),un={key:0},dn={key:0,class:"token keyword"},rn={key:1,class:"token keyword"},mn={key:2,class:"mb-48"},yn=n("h2",{id:"properties"},"Properties",-1),hn={class:"space-y-24"},_n={key:3,class:"mb-48"},pn=n("h2",{id:"accessors"},"Accessors",-1),fn={class:"space-y-32"},gn={key:4,class:"mb-48"},$n=n("h2",{id:"methods"},"Methods",-1),kn={class:"space-y-32"},bn={class:"toc-wrapper"},Tn={class:"toc"},vn=n("h2",null,"Summary",-1),Cn=n("li",null,[n("a",{href:"#introduction"},"Introduction")],-1),xn={key:0},In=n("a",{href:"#properties"},"Properties",-1),En=[In],Fn={key:1},wn=n("a",{href:"#accessors"},"Accessors",-1),Ln=[wn],An={key:2},Pn=n("a",{href:"#methods"},"Methods",-1),Sn=[Pn],Dn=k({__name:"Interface",props:{libInterface:null,isType:{type:Boolean}},setup(e){return(i,u)=>{const l=oe,m=O,f=U,_=H,p=V,g=P,v=M,b=le,h=R;return t(),s(r,null,[n("div",{class:"content-wrapper",id:`class-${e.libInterface.name}`},[y(l,{extendsList:e.libInterface.extends},null,8,["extendsList"]),n("div",ln,[y(m,{name:e.libInterface.name,tags:e.libInterface.tags,source:e.libInterface.source},null,8,["name","tags","source"]),e.libInterface.implemented?(t(),d(_,{key:0,class:"self-start bg-grey",big:""},{default:x(()=>[on,(t(!0),s(r,null,C(e.libInterface.implemented,(T,$)=>(t(),s("span",null,[y(f,{type:T},null,8,["type"]),$<e.libInterface.implemented.length-1?(t(),s("span",un,o(", "))):a("",!0)]))),256))]),_:1})):a("",!0)]),y(p,null,{default:x(()=>[e.isType?(t(),s("span",rn,"type ")):(t(),s("span",dn,"interface ")),n("span",null,o(e.libInterface.name),1)]),_:1}),e.libInterface.comment?(t(),d(g,{key:0,comment:e.libInterface.comment},null,8,["comment"])):a("",!0),e.libInterface.example?(t(),d(g,{key:1,title:"Example",comment:e.libInterface.example},null,8,["comment"])):a("",!0),e.libInterface.properties.length?(t(),s("div",mn,[yn,n("div",hn,[(t(!0),s(r,null,C(e.libInterface.properties,T=>(t(),d(v,{id:T.id,name:T.name,type:T.type,comment:T.comment,tags:T.tags,"default-value":T.defaultValue},null,8,["id","name","type","comment","tags","default-value"]))),256))])])):a("",!0),e.libInterface.accessors.length?(t(),s("div",_n,[pn,n("div",fn,[(t(!0),s(r,null,C(e.libInterface.accessors,T=>(t(),d(b,{accessor:T},null,8,["accessor"]))),256))])])):a("",!0),e.libInterface.methods.length?(t(),s("div",gn,[$n,n("div",kn,[(t(!0),s(r,null,C(e.libInterface.methods,T=>(t(),s("div",null,[y(h,{func:T,"heading-component":"h3"},null,8,["func"])]))),256))])])):a("",!0)],8,cn),n("div",bn,[n("div",Tn,[vn,n("ul",null,[Cn,e.libInterface.properties.length?(t(),s("li",xn,En)):a("",!0),e.libInterface.accessors.length?(t(),s("li",Fn,Ln)):a("",!0),e.libInterface.methods.length?(t(),s("li",An,Sn)):a("",!0)])])])],64)}}}),Vn=["id"],Bn={id:"introduction",class:"h1-container"},Nn={class:"toc-wrapper"},Mn={class:"toc"},On=n("h2",null,"Summary",-1),Wn=n("li",null,[n("a",{href:"#introduction"},"Introduction")],-1),Un={key:0},Rn=["href"],Hn=k({__name:"LibFunction",props:{libFunction:null},setup(e){return(i,u)=>{const l=O,m=R;return t(),s(r,null,[n("div",{class:"content-wrapper",id:`function-${e.libFunction.name}`},[n("div",Bn,[y(l,{name:e.libFunction.name,tags:e.libFunction.tags,source:e.libFunction.source},null,8,["name","tags","source"])]),y(m,{func:e.libFunction,"is-full-page":""},null,8,["func"])],8,Vn),n("div",Nn,[n("div",Mn,[On,n("ul",null,[Wn,e.libFunction.params?(t(),s("li",Un,[n("a",{href:`#${e.libFunction.name}-params`},"Parameters",8,Rn)])):a("",!0)])])])],64)}}}),jn=["id"],Yn={id:"introduction",class:"h1-container flex flex-col"},Gn={key:2,class:"mb-48"},zn=n("h2",{id:"constructor"},"Constructor",-1),Qn={class:"space-y-24"},Jn={key:3,class:"mb-48"},Kn=n("h2",{id:"properties"},"Properties",-1),qn={class:"space-y-24"},Xn={key:4,class:"mb-48"},Zn=n("h2",{id:"accessors"},"Accessors",-1),es={class:"space-y-32"},ts={key:5,class:"mb-48"},ns=n("h2",{id:"methods"},"Methods",-1),ss={class:"space-y-32"},as={class:"toc-wrapper"},cs={class:"toc"},ls=n("h2",null,"Summary",-1),os=n("li",null,[n("a",{href:"#introduction"},"Introduction")],-1),is={key:0},us=n("a",{href:"#constructor"},"Constructor",-1),ds=[us],rs={key:1},ms=n("a",{href:"#properties"},"Properties",-1),ys=[ms],hs={key:2},_s=n("a",{href:"#accessors"},"Accessors",-1),ps=[_s],fs={key:3},gs=n("a",{href:"#methods"},"Methods",-1),$s=[gs],ks=k({__name:"Class",props:{libClass:null},setup(e){return(i,u)=>{const l=oe,m=O,f=U,_=H,p=P,g=R,v=M,b=le;return t(),s(r,null,[n("div",{class:"content-wrapper",id:`class-${e.libClass.name}`},[y(l,{extendsList:e.libClass.extends},null,8,["extendsList"]),n("div",Yn,[y(m,{name:e.libClass.name,tags:e.libClass.tags,source:e.libClass.source},null,8,["name","tags","source"]),e.libClass.implements?(t(),d(_,{key:0,class:"self-start bg-grey",big:""},{default:x(()=>[n("span",null,[L("implements "),y(f,{type:e.libClass.implements},null,8,["type"])])]),_:1})):a("",!0)]),e.libClass.comment?(t(),d(p,{key:0,comment:e.libClass.comment},null,8,["comment"])):a("",!0),e.libClass.example?(t(),d(p,{key:1,title:"Example",comment:e.libClass.example},null,8,["comment"])):a("",!0),e.libClass.constructors.length?(t(),s("div",Gn,[zn,n("div",Qn,[(t(!0),s(r,null,C(e.libClass.constructors,h=>(t(),d(g,{func:h,isConstructor:!0},null,8,["func"]))),256))])])):a("",!0),e.libClass.properties.length?(t(),s("div",Jn,[Kn,n("div",qn,[(t(!0),s(r,null,C(e.libClass.properties,h=>(t(),d(v,{id:h.id,name:h.name,type:h.type,comment:h.comment,tags:h.tags,"default-value":h.defaultValue},null,8,["id","name","type","comment","tags","default-value"]))),256))])])):a("",!0),e.libClass.accessors.length?(t(),s("div",Xn,[Zn,n("div",es,[(t(!0),s(r,null,C(e.libClass.accessors,h=>(t(),d(b,{accessor:h},null,8,["accessor"]))),256))])])):a("",!0),e.libClass.methods.length?(t(),s("div",ts,[ns,n("div",ss,[(t(!0),s(r,null,C(e.libClass.methods,h=>(t(),s("div",null,[y(g,{func:h,"heading-component":"h3"},null,8,["func"])]))),256))])])):a("",!0)],8,jn),n("div",as,[n("div",cs,[ls,n("ul",null,[os,e.libClass.constructors.length?(t(),s("li",is,ds)):a("",!0),e.libClass.properties.length?(t(),s("li",rs,ys)):a("",!0),e.libClass.accessors.length?(t(),s("li",hs,ps)):a("",!0),e.libClass.methods.length?(t(),s("li",fs,$s)):a("",!0)])])])],64)}}}),bs={key:1,class:"page-body-toc"},xs=k({__name:"index",setup(e){const{currentLib:i,currentType:u,currentItem:l}=ie();return(m,f)=>{const _=ue,p=ks,g=Hn,v=Dn,b=Nt,h=Ft;return!c(i)||!c(u)||!c(l)?(t(),d(_,{key:0})):(t(),s("div",bs,[c(u)===c(F).CLASS?(t(),d(p,{key:0,"lib-class":c(l)},null,8,["lib-class"])):c(u)===c(F).FUNCTION?(t(),d(g,{key:1,"lib-function":c(l)},null,8,["lib-function"])):c(u)===c(F).INTERFACE?(t(),d(v,{key:2,"lib-interface":c(l)},null,8,["lib-interface"])):c(u)===c(F).ENUM?(t(),d(b,{key:3,"lib-enum":c(l)},null,8,["lib-enum"])):c(u)===c(F).TYPE&&c(l).useInterface?(t(),d(v,{key:4,"lib-interface":c(l),"is-type":""},null,8,["lib-interface"])):c(u)===c(F).TYPE?(t(),d(h,{key:5,"lib-type":c(l)},null,8,["lib-type"])):a("",!0)]))}}});export{xs as default};
