(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Putforward_information"],{"4fc8":function(e,t,r){},"7db0":function(e,t,r){"use strict";var n=r("4fc8"),a=r.n(n);a.a},fc21:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"Putforward_information"},[r("div",{class:[2==e.shop_type?"ubistep step":"step"]},[r("ul",[e._m(0),1==e.shop_type?r("li",[r("a",{attrs:{href:"javascript:;"}},[e._v("2.支付费用")])]):e._e(),2==e.shop_type?r("li",[e._v("2.基本信息")]):e._e(),1==e.shop_type?r("li",[e._v("3.基本信息")]):e._e(),2==e.shop_type?r("li",[e._v("3.完成")]):e._e()])]),r("div",{staticClass:"form"},[r("div",[r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.company,expression:"form.company"}],attrs:{type:"text",placeholder:"请输入公司名称"},domProps:{value:e.form.company},on:{input:function(t){t.target.composing||e.$set(e.form,"company",t.target.value)}}})]),r("div",[r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.short_name,expression:"form.short_name"}],attrs:{type:"text",placeholder:"请输入公司简称"},domProps:{value:e.form.short_name},on:{input:function(t){t.target.composing||e.$set(e.form,"short_name",t.target.value)}}})]),r("div",[r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.leader,expression:"form.leader"}],attrs:{type:"text",placeholder:"负责人"},domProps:{value:e.form.leader},on:{input:function(t){t.target.composing||e.$set(e.form,"leader",t.target.value)}}})])]),r("div",{staticClass:"next-step"},[r("div",[r("el-button",{staticClass:"next",attrs:{type:"primary",disabled:e.nextVisible},on:{click:e.register}},[e._v("提交")])],1)])])},a=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("li",[r("a",{attrs:{href:"javascript:;"}},[e._v("1.登录信息")])])}],s=r("be94"),o=(r("96cf"),r("1da1")),i=r("4362"),c={name:"PutforwardInformation",data:function(){return{BankList:[],form:{company:"",short_name:"",leader:"",account_name:"",account:"",bank:"",branch:"",sid:this.$route.query.sid}}},computed:{nextVisible:function(){var e=!0,t=this.form,r=this.shop_type,n=t.company&&t.short_name&&t.leader;t.account_name&&t.account&&t.bank&&t.branch;return 1==r&&n?e=!1:2==r&&n&&(e=!1),e},shop_type:function(){return window.sessionStorage.getItem("shop_type")}},methods:{clear:function(){var e=Object(o["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(i["B"])();case 3:e.sent,this.$router.push({path:"Repair_information",query:{sid:this.$route.query.sid}}),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),console.log(e.t0);case 10:case"end":return e.stop()}},e,this,[[0,7]])}));return function(){return e.apply(this,arguments)}}(),getBank:function(){var e=Object(o["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(i["P"])();case 2:t=e.sent,this.BankList=t;case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),register:function(){var e=Object(o["a"])(regeneratorRuntime.mark(function e(){var t,r,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(i["Mb"])(Object(s["a"])({},this.form,{shop_type:this.shop_type}));case 2:if(t=e.sent,1!=t.data.code){e.next=12;break}return r=this,e.next=7,Object(i["z"])({sid:this.$route.query.sid});case 7:n=e.sent,1==n.code&&window.sessionStorage.setItem("token",n.data),this.$message({message:t.data.msg,type:"success",duration:"1000",onClose:function(){switch(r.$store.commit("CHANGE_SID",r.form.sid),r.shop_type){case"1":r.$router.push({path:"/perfect_information",query:{sid:r.form.sid}});break;case"2":r.$router.push({path:"/register/complate",query:{sid:r.form.sid}});break}}}),e.next=13;break;case 12:this.$message.error(t.data.msg);case 13:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},mounted:function(){this.getBank()}},u=c,p=(r("7db0"),r("2877")),m=Object(p["a"])(u,n,a,!1,null,"04125df6",null);m.options.__file="Putforward_information.vue";t["default"]=m.exports}}]);
//# sourceMappingURL=Putforward_information.9e2c3d5f.js.map