(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Repair_information"],{4608:function(t,e,i){},"4d63":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"Repair_information"},[t._m(0),i("div",{staticClass:"form"},[i("p",{staticStyle:{margin:"20px 0"}},[i("el-radio",{attrs:{label:"1"},model:{value:t.radio,callback:function(e){t.radio=e},expression:"radio"}},[t._v("智能连锁店")]),i("el-radio",{attrs:{label:"2"},model:{value:t.radio,callback:function(e){t.radio=e},expression:"radio"}},[t._v("售后服务站")])],1),1==t.shop_type?i("el-form",{staticClass:"inform"},[i("p",[t._v(t._s(t.coded.Tips))]),i("table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{height:"150px",width:"150px"},attrs:{"element-loading-text":"二维码加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)",hidden:!t.loading}}),i("img",{staticStyle:{height:"150px",width:"150px"},attrs:{id:"codeimg",src:t.coded.QR,alt:"",hidden:t.loading}}),i("p",[t._v(t._s(t.coded.money))]),i("p",[t._v(t._s(t.coded.msg))])]):t._e(),2==t.shop_type?i("el-form",{staticClass:"inform"},[i("p",[t._v(t._s(t.coded.Tips))])]):t._e()],1),i("div",{staticClass:"next-step"},[i("div",[i("el-button",{staticClass:"next",attrs:{type:"primary",disabled:t.nextVisible},on:{click:t.NextStep}},[t._v("下一步")])],1)])])},s=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"step"},[i("ul",[i("li",[i("a",{attrs:{href:"javascript:;"}},[t._v("1.登录信息")])]),i("li",[t._v("2.支付费用")]),i("li",{staticClass:"col-919"},[t._v("3.基本信息")])])])}],r=(i("96cf"),i("1da1")),n=i("4362"),o={name:"RepairInformation",data:function(){return{sid:this.$route.query.sid,coded:{Tips:"",money:"",count:"",QR:"",title:""},loading:!0,radio:"1"}},computed:{nextVisible:function(){var t=!1;return t},shop_type:function(){return window.localStorage.getItem("shop_type")}},watch:{radio:function(){this.QR_code()}},methods:{NextStep:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(){var e,i;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(2!=this.shop_type){t.next=3;break}return this.$router.push({path:"/register/Putforward_information",query:{sid:this.sid,shop_type:this.shop_type}}),t.abrupt("return");case 3:if(1!=this.shop_type||2!=this.radio){t.next=6;break}return this.$router.push({path:"/register/Putforward_information",query:{sid:this.sid,shop_type:this.shop_type}}),t.abrupt("return");case 6:return t.next=8,Object(n["g"])(this.$route.query.sid);case 8:e=t.sent,console.log(e),1==e.code&&(1==e.data.status?(i=this,this.$message({message:e.data.detail,type:"success",onClose:function(){i.$router.push({path:"/register/Putforward_information",query:{sid:i.sid,shop_type:i.shop_type}})}})):this.$message.error(e.data.detail));case 11:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),QR_code:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(){var e,i=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(n["f"])(this.$route.query.sid,this.shop_type,this.radio);case 2:e=t.sent,console.log(e),1==this.shop_type?1==e.code&&(this.coded={Tips:e.data.bottom,count:e.data.count,money:e.data.detail,QR:e.data.src,msg:e.data.msg,title:e.data.title},document.getElementById("codeimg").onload=function(){i.loading=!1}):2==this.shop_type&&1==e.code&&(this.coded={Tips:e.data});case 5:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},mounted:function(){this.QR_code()}},d=o,c=(i("7a7e"),i("2877")),p=Object(c["a"])(d,a,s,!1,null,"1b2f1ec4",null);p.options.__file="Repair_information.vue";e["default"]=p.exports},"7a7e":function(t,e,i){"use strict";var a=i("4608"),s=i.n(a);s.a}}]);
//# sourceMappingURL=Repair_information.7108eb0b.js.map