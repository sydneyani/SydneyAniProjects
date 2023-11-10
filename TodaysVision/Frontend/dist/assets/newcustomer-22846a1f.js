import{a as b}from"./axios-21b846bc.js";import{_ as T,o as p,c as h,a as e,w as a,v as m,F as V,r as U,b as x,e as f,f as k,g as v,h as r,i as d,t as B,p as P,d as N,j as g}from"./index-36df86d9.js";const S={data(){return{customer:{id:null,name:null,phoneNumber:null,email:null,birthday:null},products:[{description:null,price:null,quantity:null,type:[],glassesBrand:null,contactsBrand:null,accessoryType:[],subType:null}]}},mounted(){this.$route.params.id&&this.fetchData(this.$route.params.id)},methods:{addProduct(){this.products.push({description:null,price:null,quantity:null,type:[],glassesBrand:null,contactsBrand:null,accessoryType:[]})},removeProduct(l){this.products.splice(l,1)},shouldShowRemoveButton(l){return this.products.length>1&&l!==0},getDate(l){if(!l)return"";const s=new Date(l),y=s.getFullYear(),_=(s.getMonth()+1).toString().padStart(2,"0"),n=s.getDate().toString().padStart(2,"0");return`${y}-${_}-${n}`},fetchData(l){b.get("https://todays-vision-e4hm.onrender.com/customers/"+l).then(s=>{this.customer={...s.data,birthday:this.getDate(s.data.birthday)},this.products=s.data.products}).catch(s=>{console.error("Error fetching data from API:",s)})},async createData(){const{id:l,name:s,phoneNumber:y,email:_,birthday:n}=this.customer;let i=localStorage.getItem("user");i=i&&typeof i=="string"?JSON.parse(i):null;const o={name:s,email:_,phoneNumber:y,birthday:n,employee_id:i.id,products:this.products};try{const u=await b.post("https://todays-vision-e4hm.onrender.com/customers",o);u!=null&&u.data&&this.$router.push("/returningcustomers")}catch(u){console.log(u.message)}},handleSubmit(){this.$route.params.id?this.updateData(this.$route.params.id):this.createData()},async updateData(l){const{name:s,phoneNumber:y,email:_,birthday:n}=this.customer,i={name:s,email:_,phoneNumber:y,birthday:n,products:this.products};try{const o=await b.put(`https://todays-vision-e4hm.onrender.com/customers/${l}`,i);o!=null&&o.data&&this.$router.push("/returningcustomers")}catch(o){console.log(o.message)}}},computed:{totalPrice(){return this.products.reduce((l,s)=>l+parseFloat(s.price||0),0)}}},c=l=>(P("data-v-d545652f"),l=l(),N(),l),C={class:"container"},R=c(()=>e("h2",{class:"header"},"New Customer Information",-1)),A={class:"form-row"},D={class:"form-group col-md-6"},G=c(()=>e("label",{for:"name"},"Name",-1)),w={class:"form-group col-md-6"},F=c(()=>e("label",{for:"phoneNumber"},"Phone Number",-1)),O={class:"form-group col-md-6"},L=c(()=>e("label",{for:"email"},"Email",-1)),I={class:"form-group col-md-6"},M=c(()=>e("label",{for:"birthdate"},"Birthdate",-1)),q=c(()=>e("h2",{class:"header"},"Product Information",-1)),Y={id:"checks",class:"form-group"},E=c(()=>e("label",{for:"checks"},"Type",-1)),H={class:"form-check"},j=["onUpdate:modelValue"],J=c(()=>e("label",{class:"form-check-label",for:"checkboxGlasses"}," Glasses ",-1)),Q={class:"form-check"},z=["onUpdate:modelValue"],K=c(()=>e("label",{class:"form-check-label",for:"checkboxContacts"}," Contacts ",-1)),W={class:"form-check"},X=["onUpdate:modelValue"],Z=c(()=>e("label",{class:"form-check-label",for:"checkboxAccessories"}," Accessories ",-1)),$={key:0,class:"form-group col-md-6"},ee=c(()=>e("label",{for:"glassesBrand"},"Glasses Brand",-1)),oe=["onUpdate:modelValue"],te=g('<option value="Generic" data-v-d545652f>Generic</option><option value="TomFord" data-v-d545652f>Tom Ford</option><option value="Gucci" data-v-d545652f>Gucci</option><option value="Burberry" data-v-d545652f>Burberry</option><option value="Versace" data-v-d545652f>Versace</option><option value="Oakley" data-v-d545652f>Oakley</option><option value="Ferragamo" data-v-d545652f>Ferragamo</option><option value="LilyFrames" data-v-d545652f>Lily Frames</option><option value="DavidBeckham" data-v-d545652f>David Beckham</option><option value="Polo" data-v-d545652f>Polo</option><option value="Other" data-v-d545652f>Other</option>',11),se=[te],ae={key:1,class:"form-group col-md-6"},ce=c(()=>e("label",{for:"contactsBrand"},"Contacts",-1)),le=["onUpdate:modelValue"],ne=g('<option value="Generic" data-v-d545652f>Scleral</option><option value="RGP" data-v-d545652f>RGP</option><option value="Hybrid" data-v-d545652f>Hybrid</option><option value="Orthokeratology" data-v-d545652f>Orthokeratology</option><option value="Other2" data-v-d545652f>Other</option>',5),ie=[ne],re={key:2,class:"form-group"},de=c(()=>e("label",{for:"contactsBrand"},"Select SubType ",-1)),ue={class:"form-check"},pe=["onUpdate:modelValue","onChange"],he=c(()=>e("label",{class:"form-check-label",for:"checkboxGlasses"}," Reflective ",-1)),me={class:"form-check"},ye=["onUpdate:modelValue","onChange"],_e=c(()=>e("label",{class:"form-check-label",for:"Accessories"}," Non Reflective ",-1)),ve={key:0},fe=c(()=>e("label",{for:"accessoryType"},"Accessory Type",-1)),be={class:"form-check"},ke=["onUpdate:modelValue"],ge={class:"form-check"},Te=["onUpdate:modelValue"],Ve={class:"form-check"},Ue=["onUpdate:modelValue"],xe={class:"form-check"},Be=["onUpdate:modelValue"],Pe={class:"form-check"},Ne=["onUpdate:modelValue"],Se={class:"form-check"},Ce=["onUpdate:modelValue"],Re={class:"form-check"},Ae=["onUpdate:modelValue"],De={class:"form-check"},Ge=["onUpdate:modelValue"],we={class:"form-check"},Fe=["onUpdate:modelValue"],Oe={key:1},Le=c(()=>e("label",{for:"accessoryType"},"Accessory Type",-1)),Ie={class:"form-check"},Me=["onUpdate:modelValue"],qe={class:"form-group col-md-3"},Ye=c(()=>e("label",{for:"price"},"Price",-1)),Ee=["onUpdate:modelValue"],He={class:"form-group col-md-2"},je=c(()=>e("label",{for:"quantity"},"Quantity",-1)),Je=["onUpdate:modelValue"],Qe={class:"form-group col-md-6"},ze=c(()=>e("label",{for:"description"},"Description (Optional)",-1)),Ke=["onUpdate:modelValue"],We=["onClick"],Xe={class:"form-group"},Ze=c(()=>e("div",{class:"form-group"},[e("input",{type:"submit",class:"btn btn-primary submitButton"})],-1));function $e(l,s,y,_,n,i){return p(),h("div",C,[e("form",{class:"col-md-8",onSubmit:s[5]||(s[5]=x((...o)=>i.handleSubmit&&i.handleSubmit(...o),["prevent"]))},[e("div",null,[R,e("div",A,[e("div",D,[G,a(e("input",{"onUpdate:modelValue":s[0]||(s[0]=o=>n.customer.name=o),type:"text",class:"form-control",id:"name",placeholder:"First Name"},null,512),[[m,n.customer.name]])])]),e("div",w,[F,a(e("input",{"onUpdate:modelValue":s[1]||(s[1]=o=>n.customer.phoneNumber=o),type:"tel",class:"form-control",id:"phoneNumber",placeholder:"Phone Number"},null,512),[[m,n.customer.phoneNumber]])]),e("div",O,[L,a(e("input",{"onUpdate:modelValue":s[2]||(s[2]=o=>n.customer.email=o),type:"email",class:"form-control",id:"email",placeholder:"Email"},null,512),[[m,n.customer.email]])]),e("div",I,[M,a(e("input",{"onUpdate:modelValue":s[3]||(s[3]=o=>n.customer.birthday=o),type:"date",class:"form-control",id:"birthdate",placeholder:"MM/DD/YYYY"},null,512),[[m,n.customer.birthday]])])]),e("div",null,[q,(p(!0),h(V,null,U(n.products,(o,u)=>(p(),h("div",{key:u},[e("div",Y,[E,e("div",H,[a(e("input",{"onUpdate:modelValue":t=>o.type=t,class:"form-check-input",type:"radio",value:"Glasses",id:"checkboxGlasses"},null,8,j),[[f,o.type]]),J]),e("div",Q,[a(e("input",{"onUpdate:modelValue":t=>o.type=t,class:"form-check-input",type:"radio",value:"Contacts",id:"checkboxContacts"},null,8,z),[[f,o.type]]),K]),e("div",W,[a(e("input",{"onUpdate:modelValue":t=>o.type=t,class:"form-check-input",type:"radio",value:"Accessories",id:"checkboxAccessories"},null,8,X),[[f,o.type]]),Z]),o.type.includes("Glasses")?(p(),h("div",$,[ee,a(e("select",{class:"form-control",id:"glassesBrand","onUpdate:modelValue":t=>o.glassesBrand=t},se,8,oe),[[k,o.glassesBrand]])])):v("",!0),o.type.includes("Contacts")?(p(),h("div",ae,[ce,a(e("select",{class:"form-control",id:"contactsBrand","onUpdate:modelValue":t=>o.contactsBrand=t},ie,8,le),[[k,o.contactsBrand]])])):v("",!0),o.type.includes("Accessories")?(p(),h("div",re,[de,e("div",ue,[a(e("input",{"onUpdate:modelValue":t=>o.subType=t,onChange:()=>{o.accessoryType=[]},class:"form-check-input",type:"radio",value:"Reflective"},null,40,pe),[[f,o.subType]]),he]),e("div",me,[a(e("input",{"onUpdate:modelValue":t=>o.subType=t,class:"form-check-input",onChange:()=>{o.accessoryType=[]},type:"radio",value:"Non-Reflective"},null,40,ye),[[f,o.subType]]),_e]),o.subType==="Reflective"?(p(),h("div",ve,[fe,e("div",be,[a(e("input",{id:"accessoryType","onUpdate:modelValue":t=>o.accessoryType=t,class:"form-check-input",type:"checkbox",value:"lvl2AR"},null,8,ke),[[r,o.accessoryType]]),d("Level 2 AR ")]),e("div",ge,[a(e("input",{id:"accessoryType","onUpdate:modelValue":t=>o.accessoryType=t,class:"form-check-input",type:"checkbox",value:"lvl3AR"},null,8,Te),[[r,o.accessoryType]]),d("Level 3 AR ")]),e("div",Ve,[a(e("input",{id:"accessoryType","onUpdate:modelValue":t=>o.accessoryType=t,class:"form-check-input",type:"checkbox",value:"premiumAR"},null,8,Ue),[[r,o.accessoryType]]),d("Premium AR ")]),e("div",xe,[a(e("input",{id:"accessoryType","onUpdate:modelValue":t=>o.accessoryType=t,class:"form-check-input",type:"checkbox",value:"transitions"},null,8,Be),[[r,o.accessoryType]]),d("Transitions ")]),e("div",Pe,[a(e("input",{id:"accessoryType","onUpdate:modelValue":t=>o.accessoryType=t,class:"form-check-input",type:"checkbox",value:"progressivelvl1"},null,8,Ne),[[r,o.accessoryType]]),d("Progressive Level 1 ")]),e("div",Se,[a(e("input",{id:"accessoryType","onUpdate:modelValue":t=>o.accessoryType=t,class:"form-check-input",type:"checkbox",value:"progressivelvl2"},null,8,Ce),[[r,o.accessoryType]]),d("Progressive Level 2 ")]),e("div",Re,[a(e("input",{id:"accessoryType","onUpdate:modelValue":t=>o.accessoryType=t,class:"form-check-input",type:"checkbox",value:"progressivelvl3"},null,8,Ae),[[r,o.accessoryType]]),d("Progressive Level 3 ")]),e("div",De,[a(e("input",{id:"accessoryType","onUpdate:modelValue":t=>o.accessoryType=t,class:"form-check-input",type:"checkbox",value:"progressivelvl4"},null,8,Ge),[[r,o.accessoryType]]),d("Progressive Level 4 ")]),e("div",we,[a(e("input",{id:"accessoryType","onUpdate:modelValue":t=>o.accessoryType=t,class:"form-check-input",type:"checkbox",value:"Other3"},null,8,Fe),[[r,o.accessoryType]]),d("Other ")])])):v("",!0),o.subType==="Non-Reflective"?(p(),h("div",Oe,[Le,e("div",Ie,[a(e("input",{id:"accessoryType","onUpdate:modelValue":t=>o.accessoryType=t,class:"form-check-input",type:"checkbox",value:"antiCoating"},null,8,Me),[[r,o.accessoryType]]),d("Anti-reflective Coating Standard ")])])):v("",!0)])):v("",!0)]),e("div",qe,[Ye,a(e("input",{"onUpdate:modelValue":t=>o.price=t,type:"number",min:"0.01",step:"0.01",class:"form-control",id:"itemPrice"},null,8,Ee),[[m,o.price]])]),e("div",He,[je,a(e("input",{"onUpdate:modelValue":t=>o.quantity=t,type:"number",min:"0",class:"form-control",id:"quantity"},null,8,Je),[[m,o.quantity]])]),e("div",Qe,[ze,a(e("textarea",{"onUpdate:modelValue":t=>o.description=t,type:"textarea",class:"form-control",id:"description"},null,8,Ke),[[m,o.description]])]),i.shouldShowRemoveButton(u)?(p(),h("input",{key:0,type:"button",onClick:t=>i.removeProduct(u),class:"btn btn-danger form-group",value:"Remove Product"},null,8,We)):v("",!0),e("input",{type:"button",onClick:s[4]||(s[4]=(...t)=>i.addProduct&&i.addProduct(...t)),class:"btn btn-success form-group",value:"Add Product"}),e("div",Xe,[e("p",null,"Total Price: $"+B(i.totalPrice.toFixed(2)),1)])]))),128))]),Ze],32)])}const to=T(S,[["render",$e],["__scopeId","data-v-d545652f"]]);export{to as default};
