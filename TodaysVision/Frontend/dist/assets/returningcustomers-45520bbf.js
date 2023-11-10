import{a as b}from"./axios-3a76d256.js";import{_ as v,k as f,o as i,c as a,a as t,w as C,v as k,F as m,r as p,t as l,i as d,g as y,l as w,m as P,p as S,d as x}from"./index-458bac09.js";const T={data(){return{searchQuery:"",customers:[]}},computed:{filteredCustomers(){const s=this.searchQuery.toLowerCase();return this.customers.filter(o=>o.name.toLowerCase().includes(s)||o.email.toLowerCase().includes(s)||o.phonenumber.includes(s)||o.birthday.includes(s))}},methods:{getDate(s){if(!s)return"";const o=new Date(s),u=o.getUTCDate(),h=o.getUTCMonth()+1,_=o.getUTCFullYear();return`${h.toString().padStart(2,"0")}/${u.toString().padStart(2,"0")}/${_}`},search(){},toggleProducts(s){s.isProductsVisible=!s.isProductsVisible}},mounted(){b.get({}.VITE_ROOT_API+"/customers").then(s=>{this.customers=(s==null?void 0:s.data)||[]}).catch(s=>{console.error("Error fetching data from API:",s)})}},r=s=>(S("data-v-ffeeb418"),s=s(),x(),s),V={class:"container"},B=r(()=>t("h1",null,"Customer Search List",-1)),D={class:"input-group mb-3"},I={class:"input-group-append"},N={class:"table table-striped"},E=r(()=>t("thead",null,[t("tr",null,[t("th",null,"Name"),t("th",null,"Email"),t("th",null,"Phone Number"),t("th",null,"Birthdate"),t("th",null,"Products"),t("th")])],-1)),L=["onClick"],Q={key:0,class:"list-group product-list"},A={class:"product-details"},F={class:"row"},U={class:"col-md-6"},$=r(()=>t("strong",null,"Description:",-1)),q={class:"col-md-6"},M=r(()=>t("strong",null,"Type:",-1)),O={class:"row"},j={class:"col-md-6"},G=r(()=>t("strong",null,"Price:",-1)),H={class:"col-md-6"},R=r(()=>t("strong",null,"Quantity:",-1)),Y={key:0,class:"row"},z={class:"col-md-6"},J=r(()=>t("strong",null,"Brand:",-1)),K={key:1,class:"row"},W={class:"col-md-6"},X=r(()=>t("strong",null,"Contacts Brand:",-1)),Z={key:2,class:"row"},tt={class:"col-md-6"},st=r(()=>t("strong",null,"Accessory Type:",-1));function et(s,o,u,h,_,c){const g=f("router-link");return i(),a("div",V,[t("div",null,[B,t("div",D,[C(t("input",{"onUpdate:modelValue":o[0]||(o[0]=e=>_.searchQuery=e),type:"text",class:"form-control",placeholder:"Search by name, email, phone, or birthdate"},null,512),[[k,_.searchQuery]]),t("div",I,[t("button",{class:"btn btn-primary",onClick:o[1]||(o[1]=(...e)=>c.search&&c.search(...e))},"Search")])]),t("table",N,[E,t("tbody",null,[(i(!0),a(m,null,p(c.filteredCustomers,e=>(i(),a("tr",{key:e._id},[t("td",null,l(e.name),1),t("td",null,l(e.email),1),t("td",null,l(e.phoneNumber),1),t("td",null,l(c.getDate(e.birthday)),1),t("td",null,[t("button",{class:"btn btn-link",onClick:n=>c.toggleProducts(e)},l(e.isProductsVisible?"Hide Products":"Show Products"),9,L),e.isProductsVisible?(i(),a("ul",Q,[(i(!0),a(m,null,p(e.products,n=>(i(),a("li",{class:"list-group-item",key:n._id},[t("div",A,[t("div",F,[t("div",U,[$,d(" "+l(n.description),1)]),t("div",q,[M,d(" "+l(n.type),1)])]),t("div",O,[t("div",j,[G,d(" $"+l(n.price.toFixed(2)),1)]),t("div",H,[R,d(" "+l(n.quantity),1)])]),n.type.includes("Glasses")?(i(),a("div",Y,[t("div",z,[J,d(" "+l(n.glassesBrand),1)])])):n.type.includes("Contacts")?(i(),a("div",K,[t("div",W,[X,d(" "+l(n.contactsBrand),1)])])):n.type.includes("Accessories")?(i(),a("div",Z,[t("div",tt,[st,d(" "+l(n.accessoryType.join(", ")),1)])])):y("",!0)])]))),128))])):y("",!0)]),t("td",null,[w(g,{to:`/editcustomer/${e._id}`,class:"btn btn-primary"},{default:P(()=>[d(" Edit ")]),_:2},1032,["to"])])]))),128))])])])])}const lt=v(T,[["render",et],["__scopeId","data-v-ffeeb418"]]);export{lt as default};
