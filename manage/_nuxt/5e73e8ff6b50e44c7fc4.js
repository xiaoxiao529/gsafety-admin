(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{531:function(e,t,n){var content=n(639);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(10).default)("31e0f0e9",content,!0,{sourceMap:!1})},638:function(e,t,n){"use strict";var c=n(531);n.n(c).a},639:function(e,t,n){(e.exports=n(9)(!1)).push([e.i,".main-body[data-v-5bb9813c]{height:calc(100vh - 239px)}.main-body .el-main[data-v-5bb9813c]{padding:0 15px 10px}.main-body .el-main .el-checkbox[data-v-5bb9813c]{margin-bottom:10px}.main-body .el-main .card-body[data-v-5bb9813c]{padding-top:15px}.main-body .aside-wrap[data-v-5bb9813c]{border-right:1px solid #dcdcdc}.main-body .aside-wrap .aside-main-header[data-v-5bb9813c]{font-size:16px;padding:15px 20px;border-bottom:1px solid #dcdcdc;line-height:30px;font-weight:700}.main-body .aside-wrap .type-item[data-v-5bb9813c]{padding:10px 20px;height:24px;line-height:24px;font-size:14px;display:block;border-left:3px solid #fff;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer}.main-body .aside-wrap .type-item.active[data-v-5bb9813c]{border-left:3px solid #1970ed;background:#f9f9f9}",""])},773:function(e,t,n){"use strict";n.r(t);n(2),n(3),n(4),n(5);var c={components:{},data:function(){return{isLoading:!1,tabPosition:"left",userType:[],gjApp:[],gjWeb:[],currentCode:"01",checkAllApp:!1,checkAllWeb:!1,checkedIds:[],checkedIdsArry:[],isIndeterminate:!1,sysCode:[{name:"消防管家Web",id:"10"},{name:"消防管家App",id:"11"}]}},mounted:function(){this.userTypeTree(),this.checkboxList(),this.querySaveUserTypeConInfo()},computed:{},methods:{handleCheckedIdsChange:function(e,t){for(var i=0;i<this.checkedIdsArry.length;i++)if(this.checkedIdsArry[i].roleId==t)return void this.checkedIdsArry.splice(i,1);this.checkedIdsArry.push({sysCode:e,roleId:t})},userTypeTree:function(){var e=this;e.$axios.$POST_NEW({api_name:"queryUserType"}).then(function(t){if(e.isLoading=!1,"success"==t.data.code){var data=t.data.data;e.userType=data.userType}else e.userType=[],console.log("没有数值。。。。。")})},changeHandel:function(data){this.currentCode=data.typeCode,this.querySaveUserTypeConInfo()},querySaveUserTypeConInfo:function(){var e=this,t=this;t.$axios.$POST_NEW({api_name:"querySaveUserTypeConInfo",params:{modelType:"1",userType:t.currentCode}}).then(function(e){if(t.isLoading=!1,"success"==e.data.code){var data=e.data.data,n=JSON.parse(data.roleInfo);t.checkedIds=[],t.checkedIdsArry=[];for(var i=0;i<n.length;i++)t.checkedIds.push(n[i].roleId),t.checkedIdsArry.push(n[i])}else t.checkedIds=[]}).catch(function(){e.$message.error("查询已保存用户类型配置异常")})},saveUserTypeConInfo:function(){var e=this,t=this;0!=t.checkedIdsArry.length?t.$axios.$POST_NEW({api_name:"saveUserTypeConInfo",params:{modelType:"1",userType:t.currentCode,roleInfo:JSON.stringify(t.checkedIdsArry)}}).then(function(e){t.isLoading=!1,"success"==e.data.code?t.$message.success("保存用户类型成功"):t.$message.error(e.data.message)}).catch(function(){e.$message.error("保存用户类型配置异常")}):t.$message.warning("未选中角色!")},checkboxList:function(){var e=this;e.$axios.$POST_NEW({api_name:"queryRole"}).then(function(t){if(e.isLoading=!1,"success"==t.data.code){var data=t.data.data;e.gjApp=data.gjApp,e.gjWeb=data.gjWeb}else e.gjApp=[],e.gjWeb=[],e.$message({message:"右侧checkbox获取失败",type:"error"})}).catch(function(){e.$message({message:"右侧checkbox获取异常",type:"warning"})})}}},d=(n(638),n(18)),component=Object(d.a)(c,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"main-wrap"},[n("el-container",{staticClass:"main-body"},[n("el-aside",{staticClass:"aside-wrap",attrs:{width:"220px"}},[n("div",{staticClass:"aside-main-header"},[e._v("\n          用户类型\n        ")]),e._v(" "),n("ul",{staticClass:"aside-main-panel"},e._l(e.userType,function(t){return n("li",{key:t.id,class:t.typeCode==e.currentCode?"type-item active":"type-item",on:{click:function(n){return e.changeHandel(t)}}},[n("span",[e._v(e._s(t.typeName))])])}),0)]),e._v(" "),n("el-container",[n("el-header",{staticStyle:{"text-align":"right",padding:"10px 15px"},attrs:{height:"60px"}},[n("el-button",{attrs:{type:"primary"},on:{click:e.saveUserTypeConInfo}},[e._v("保存")])],1),e._v(" "),n("el-main",[n("el-card",{staticClass:"box-card",staticStyle:{"margin-bottom":"20px"}},[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("span",[e._v(e._s(e.sysCode[0].name))])]),e._v(" "),n("div",{staticClass:"card-body"},[n("el-checkbox-group",{model:{value:e.checkedIds,callback:function(t){e.checkedIds=t},expression:"checkedIds"}},e._l(e.gjWeb,function(t){return n("el-checkbox",{key:t.id,attrs:{label:t.id},on:{change:function(n){return e.handleCheckedIdsChange(e.sysCode[0].id,t.id)}}},[e._v(e._s(t.roleName))])}),1)],1)]),e._v(" "),n("el-card",{staticClass:"box-card",staticStyle:{"margin-bottom":"20px"}},[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("span",[e._v(e._s(e.sysCode[1].name))])]),e._v(" "),n("div",{staticClass:"card-body"},[n("el-checkbox-group",{model:{value:e.checkedIds,callback:function(t){e.checkedIds=t},expression:"checkedIds"}},e._l(e.gjApp,function(t){return n("el-checkbox",{key:t.id,attrs:{label:t.id},on:{change:function(n){return e.handleCheckedIdsChange(e.sysCode[1].id,t.id)}}},[e._v(e._s(t.roleName))])}),1)],1)])],1)],1)],1)],1)])},[],!1,null,"5bb9813c",null);t.default=component.exports}}]);