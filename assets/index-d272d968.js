import{o as t,c as n,d as l,e as c,t as u,F as r,j as a,i as o,a as y,h,_ as k}from"./index-183210ed.js";const f=["id"],C={key:0},g={key:0},v={key:1},$={key:1},x={key:2},F=["href"],q={key:0},j={key:0},V={key:1},b={__name:"Method",props:{method:{type:Object,required:!0},isConstructor:{type:Boolean,required:!1,default:!1}},setup(e){return(m,_)=>{var i;return t(),n("div",{id:`method-${e.method.name}`},[l("h4",null,[c(u(e.method.name)+"(",1),e.method.params?(t(),n("span",C,[(t(!0),n(r,null,a(e.method.params,(s,d)=>(t(),n("span",null,[c(u(s.name),1),s.optional?(t(),n("span",g,"?")):o("",!0),c(": "+u(s.type),1),d+1<e.method.params.length?(t(),n("span",v,", ")):o("",!0)]))),256))])):o("",!0),c(") "),e.method.type&&!e.isConstructor?(t(),n("span",$," : "+u(e.method.type),1)):o("",!0),(i=e.method.source)!=null&&i.length?(t(),n("span",x,[c(" - "),l("a",{href:e.method.source,target:"_blank"},"source",8,F)])):o("",!0)]),l("p",null,u(e.method.comment),1),e.method.params?(t(),n("i",q,[(t(!0),n(r,null,a(e.method.params,s=>(t(),n("p",null,[c(u(s.name),1),s.optional?(t(),n("span",j," (optional) ")):o("",!0),s.type?(t(),n("span",V," : "+u(s.type),1)):o("",!0),c(" - "+u(s.comment),1)]))),256))])):o("",!0)],8,f)}}},B=["id"],N={__name:"Function",props:{libFunction:{type:Object,required:!0}},setup(e){return(m,_)=>{const i=b;return t(),n("div",{id:`function-${e.libFunction.name}`},[y(i,{method:e.libFunction},null,8,["method"])],8,B)}}},O=["id"],T={key:0},I={key:0},M=["href"],L={key:1},S=l("hr",null,null,-1),D=l("h2",null,"Constructor",-1),A={class:"space-y-32"},E={key:2},G=l("hr",null,null,-1),P=l("h2",null,"Properties",-1),w={class:"space-y-32"},z={key:0},H={key:1},J=["href"],K={key:0},Q={key:3},R=l("hr",null,null,-1),U=l("h2",null,"Accessors",-1),W={class:"space-y-32"},X={key:0},Y=["href"],Z={class:"space-y-16"},p={key:0},ee=l("h4",null,"Setter :",-1),te={key:1},ne=l("h4",null,"Getter :",-1),se={key:4},le=l("hr",null,null,-1),oe=l("h2",null,"Methods",-1),ue={class:"space-y-32"},ce={__name:"Class",props:{libClass:{type:Object,required:!0}},setup(e){return(m,_)=>{const i=b;return t(),n("div",{id:`class-${e.libClass.name}`,class:"py-32"},[e.libClass.extends?(t(),n("p",T,u(e.libClass.extends)+" →",1)):o("",!0),l("h1",null,[c(u(e.libClass.name),1),e.libClass.source.length?(t(),n("span",I,[c(" - "),l("a",{href:e.libClass.source,target:"_blank"},"source",8,M)])):o("",!0)]),l("p",null,u(e.libClass.comment),1),e.libClass.constructors.length?(t(),n("div",L,[S,D,l("div",A,[(t(!0),n(r,null,a(e.libClass.constructors,s=>(t(),h(i,{method:s,isConstructor:!0},null,8,["method"]))),256))])])):o("",!0),e.libClass.properties.length?(t(),n("div",E,[G,P,l("div",w,[(t(!0),n(r,null,a(e.libClass.properties,s=>{var d;return t(),n("div",null,[l("h4",null,[c(u(s.name),1),s.type?(t(),n("span",z," : "+u(s.type),1)):o("",!0),(d=s.source)!=null&&d.length?(t(),n("span",H,[c(" - "),l("a",{href:s.source,target:"_blank"},"source",8,J)])):o("",!0)]),l("p",null,u(s.comment),1),s.defaultValue?(t(),n("p",K,[l("i",null,"Default value : "+u(s.defaultValue),1)])):o("",!0)])}),256))])])):o("",!0),e.libClass.accessors.length?(t(),n("div",Q,[R,U,l("div",W,[(t(!0),n(r,null,a(e.libClass.accessors,s=>{var d;return t(),n("div",null,[l("h4",null,[c(u(s.name),1),(d=s.source)!=null&&d.length?(t(),n("span",X,[c(" - "),l("a",{href:s.source,target:"_blank"},"source",8,Y)])):o("",!0)]),l("p",null,u(s.comment),1),l("div",Z,[s.setter?(t(),n("div",p,[ee,y(i,{method:s.setter},null,8,["method"])])):o("",!0),s.getter?(t(),n("div",te,[ne,y(i,{method:s.getter},null,8,["method"])])):o("",!0)])])}),256))])])):o("",!0),e.libClass.methods.length?(t(),n("div",se,[le,oe,l("div",ue,[(t(!0),n(r,null,a(e.libClass.methods,s=>(t(),h(i,{method:s},null,8,["method"]))),256))])])):o("",!0)],8,O)}}},ie={key:1},re={__name:"index",props:{currentLib:{type:Object,required:!1},currentType:{type:String,required:!1},currentItem:{type:Object,required:!1}},setup(e){return(m,_)=>{const i=k,s=ce,d=N;return!e.currentLib||!e.currentType||!e.currentItem?(t(),h(i,{key:0})):(t(),n("div",ie,[e.currentType==="classes"?(t(),h(s,{key:0,"lib-class":e.currentItem},null,8,["lib-class"])):e.currentType==="functions"?(t(),h(d,{key:1,"lib-function":e.currentItem},null,8,["lib-function"])):o("",!0)]))}}};export{re as default};