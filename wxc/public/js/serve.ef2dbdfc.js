(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["serve"],{"123b":function(t,e,s){t.exports=s.p+"public/img/finish.8486f80a.png"},"17ee":function(t,e,s){"use strict";var a=s("e1da"),l=s.n(a);l.a},"70dd":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"serve"},[a("div",{staticClass:"viewMain"},[a("h2",{staticClass:"col-32373C"},[t._v("车主服务")]),a("div",{staticClass:"whiteBlock"},[a("el-form",{ref:"form",staticClass:"elForm",attrs:{model:t.form,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"VIN码"}},[a("el-input",{attrs:{placeholder:"请输入17位VIN码"}},[a("el-button",{staticStyle:{width:"100px"},attrs:{slot:"append"},slot:"append"},[t._v("查找")])],1)],1)],1),a("div",{staticClass:"infoCard"},[t._m(0),a("div",{staticClass:"infoPic"},[a("span",{staticClass:"picSpan col-64696E"},[t._v("照片")]),t._l(6,function(e){return a("div",{staticClass:"proImgBox"},[a("img",{staticClass:"proImg",attrs:{src:s("123b"),alt:""}}),a("span",{staticClass:"col-64696e"},[t._v("产品1")])])})],2)]),a("el-form",{ref:"form",staticClass:"elForm",attrs:{model:t.form,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"手机号"}},[a("el-input",{attrs:{placeholder:"输入用户确认码",disabled:"true"}},[a("el-button",{attrs:{slot:"append"},slot:"append"},[t._v("发送验证码")])],1)],1),a("el-form-item",{attrs:{label:"验证码"}},[a("el-input",{attrs:{placeholder:"输入手机验证码"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),a("el-form-item",{staticStyle:{"margin-bottom":"0"},attrs:{label:"产品编码"}},[t._l(t.proCodeList,function(e,s){return a("el-input",{staticStyle:{"margin-bottom":"10px"},attrs:{placeholder:"输入产品编码",index:s},model:{value:t.proCodeList[s],callback:function(e){t.$set(t.proCodeList,s,e)},expression:"proCodeList[index]"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-delete"},on:{click:function(e){t.deleteCode(s)}},slot:"append"})],1)}),a("el-input",{attrs:{placeholder:"输入产品编码"},model:{value:t.currentCode,callback:function(e){t.currentCode=e},expression:"currentCode"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-plus"},on:{click:t.addCode},slot:"append"})],1)],2),a("el-form-item",{attrs:{label:""}},[a("span",{staticClass:"col-FF2828"},[t._v("包括产品及工时费，请实际填写")])]),a("el-form-item",[a("el-button",{staticClass:"submit",attrs:{type:"primary"}},[t._v("提交")])],1)],1)],1)]),a("el-dialog",{attrs:{visible:t.dialogVisible,width:"1000px","before-close":t.handleClose},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("div",{staticClass:"serveDialog"},[a("span",{staticClass:"col-32373C"},[t._v("本次服务已完成")]),a("el-button",{attrs:{type:"primary"}},[t._v("好的")])],1)])],1)},l=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("table",{staticClass:"infoTable"},[s("tr",[s("td",[t._v("车型：")]),s("td",[t._v("北京奔驰-C级")]),s("td",[t._v("物料名称：")]),s("td",[t._v("机油")])]),s("tr",[s("td",[t._v("用户名：")]),s("td",[t._v("XXXXXX")]),s("td",[t._v("物料型号：")]),s("td",[t._v("SM半合成(邦保养1号)")])]),s("tr",[s("td",[t._v("联系方式：")]),s("td",[t._v("18000000000")]),s("td",[t._v("使用数量：")]),s("td",[t._v("1.5L")])]),s("tr",[s("td",[t._v("建议保养周期：")]),s("td",[t._v("6个月")]),s("td",[t._v("滤芯补贴：")]),s("td",[t._v("10元")])]),s("tr",[s("td",[t._v("建议保养里程：")]),s("td",[t._v("10000公里")]),s("td",[t._v("工时费：")]),s("td",[t._v("20元")])])])}],o={name:"serve",data:function(){return{form:{name:""},proCodeList:[],currentCode:"",dialogVisible:!1}},computed:{},methods:{search:function(){},deleteCode:function(t){this.proCodeList.splice(t,1)},addCode:function(){this.proCodeList.push(this.currentCode),this.currentCode=""}}},i=o,r=(s("e340"),s("17ee"),s("2877")),n=Object(r["a"])(i,a,l,!1,null,"65812645",null);n.options.__file="serve.vue";e["default"]=n.exports},"8bb1":function(t,e,s){},e1da:function(t,e,s){},e340:function(t,e,s){"use strict";var a=s("8bb1"),l=s.n(a);l.a}}]);
//# sourceMappingURL=serve.ef2dbdfc.js.map