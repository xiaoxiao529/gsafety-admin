(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{1181:function(e,t,l){"use strict";l.r(t);l(2),l(3),l(4),l(5);var n={components:{Pagination:l(478).a},data:function(){return{flag:!1,isLoading:!1,labelWidth:"100px",formData:{},tableData:[],loading:!0,pageNo:1,pageSize:6,total:0,widgetInfo:{pageSize:6,pageNo:1,total:0},indexNum:0,userId:null,parentTypeNameList:[],plan:{},dialogVisible:!1,labelPosition:"top",optTitle:null,optMode:null,rules:{parentCode:[{required:!0,message:"不能为空",trigger:"blur"}]},center_type:[{value:"0",label:"直营"},{value:"1",label:"加盟"}],serviceArea:[],onlineStates:[],value:[],value1:[],cooperationModelData:[{value:"",label:"全部"},{value:"0",label:"签约型"},{value:"1",label:"非签约型"}],serviceStateData:[{value:"",label:"全部"},{value:"9",label:"待启用"},{value:"0",label:"已启用"},{value:"1",label:"已停用"}],opCenterData:[{value:"",label:"全部"}]}},created:function(){this.findAllSubCenterCode()},computed:{},methods:{findAllSubCenterCode:function(){var e=this;this.isLoading=!0,this.$axios.$POST_NEW({api_name:"findAllSubCenterCode"}).then(function(t){if("success"==t.data.code){e.isLoading=!1;var l;for(var n in l=t.data.data){var o={};o.value=l[n].value,o.label=l[n].label,e.opCenterData.push(o)}}else e.opCenterData=[{value:"",label:"全部"}]})},findMonitorDeviceStateDownList:function(){var e=this;this.isLoading=!0,this.$axios.$POST_NEW({api_name:"queryOperationOrgList",params:{orgName:this.formData.orgName,province:this.formData.province,pageNo:this.widgetInfo.pageNo,pageSize:this.widgetInfo.pageSize}}).then(function(t){if("success"==t.data.code){e.isLoading=!1;var data=t.data.data;e.tableData=data.rows,e.widgetInfo.total=null===data.total?0:data.total}else e.tableData=[],e.widgetInfo.list=data.rows,e.widgetInfo.total=0})},sonHandleCurrentChange:function(e){this.widgetInfo.pageSize=e.pageSize?parseInt(e.pageSize):this.widgetInfo.pageSize,this.widgetInfo.pageNo=e.pageNo?parseInt(e.pageNo):this.widgetInfo.pageNo,this.findMonitorDeviceStateDownList()},editClick:function(e){var t=this;t.dialogVisible=!0,t.$nextTick(function(){t.plan={},t.$refs.plan.resetFields()}),t.optTitle="编辑",t.plan={},t.$axios.$POST_NEW({api_name:"queryOperationOrgByOrgCode",params:{orgCode:e},time:3e4}).then(function(e){"success"==e.data.code?(t.plan=JSON.parse(JSON.stringify(e.data.data)),console.log("======"+t.plan.monitorServiceStatus),0==t.serviceArea.length?t.findserviceArea():(t.value.push(t.plan.province),t.value.push(t.plan.city),t.value1.push(t.plan.province),t.value1.push(t.plan.city),t.value1.push(t.plan.contactCounty)),t.$refs.plan.resetFields()):t.$message.error("获取运营中心信息失败")})},changeState:function(e){var t=this,l=this,n=this._Storage.getObj("userObj","userObj").id;this.$confirm("确认启用运营中心服务?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.isLoading=!0,t.$axios.$POST_NEW({api_name:"updateOperationOrgServerStatusByOrgCode",params:{orgCode:e,updateUser:n}}).then(function(e){t.isLoading=!1,t.$message.success(e.data.message),"success"==e.data.code&&l.lookFor()})})},reset:function(){this.formData={},this.findMonitorDeviceStateDownList()},lookFor:function(){this.findMonitorDeviceStateDownList()},handleClose:function(){var e=this;e.dialogVisible=!1,e.$nextTick(function(){e.plan={},e.$refs.plan.resetFields()})},checkState:function(e){return"0"==e?e:null},handleChange:function(){console.log(JSON.stringify(this.value)),console.log(JSON.stringify(this.value1))},startClick:function(e){var t=this,l=this;this.$confirm("确认停用企业?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.isLoading=!0,t.$axios.$POST_NEW({api_name:"enableServiceUnit",params:{serviceUnitId:e.id,operateType:"1",serviceId:e.serviceUnitId,serviceUnitCode:e.serviceUnitId,orgCode:e.subCenterCode,serviceUnitName:e.serviceUnitName,subCenterName:e.subCenterName}}).then(function(e){t.isLoading=!1,t.$message.success(e.data.message),"success"==e.data.code&&l.lookFor()})})},stopClick:function(e){}}},o=(l(820),l(17)),component=Object(o.a)(n,function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[l("div",{staticClass:"Crumbs"},[l("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[l("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("企业管理")]),e._v(" "),l("el-breadcrumb-item",[e._v("服务机构管理")])],1)],1),e._v(" "),l("div",{staticClass:"main-wrap"},[l("el-row",{staticClass:"location"},[l("el-col",{attrs:{span:12}},[l("h3",[e._v("服务机构管理")])])],1),e._v(" "),l("div",{staticClass:"main-container"},[l("el-form",{ref:"formData",staticClass:"hardware-form",attrs:{inline:!0,model:e.formData}},[l("el-form-item",{attrs:{label:"企业名称:",prop:"orgName","label-width":e.labelWidth}},[l("el-input",{attrs:{placeholder:"请输入企业名称"},model:{value:e.formData.orgName,callback:function(t){e.$set(e.formData,"orgName","string"==typeof t?t.trim():t)},expression:"formData.orgName"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"合作模式:","label-width":e.labelWidth}},[l("el-select",{attrs:{placeholder:"请选择",filterable:""},model:{value:e.formData.province,callback:function(t){e.$set(e.formData,"province","string"==typeof t?t.trim():t)},expression:"formData.province"}},e._l(e.cooperationModelData,function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),l("el-form-item",{attrs:{label:"服务状态:","label-width":e.labelWidth}},[l("el-select",{attrs:{placeholder:"请选择",filterable:""},model:{value:e.formData.province,callback:function(t){e.$set(e.formData,"province","string"==typeof t?t.trim():t)},expression:"formData.province"}},e._l(e.serviceStateData,function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),l("el-form-item",{attrs:{label:"运营中心:","label-width":e.labelWidth}},[l("el-select",{attrs:{placeholder:"请选择",filterable:""},model:{value:e.formData.province,callback:function(t){e.$set(e.formData,"province","string"==typeof t?t.trim():t)},expression:"formData.province"}},e._l(e.opCenterData,function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),l("el-form-item",{staticClass:"serch-btn",attrs:{label:""}},[l("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){return e.lookFor()}}},[e._v("查询")]),e._v(" "),l("el-button",{attrs:{size:"small"},on:{click:function(t){return e.reset()}}},[e._v("重置")])],1)],1),e._v(" "),l("div",{staticClass:"list-wrap"},[l("el-table",{directives:[{name:"loading",rawName:"v-loading.lock",value:e.isLoading,expression:"isLoading",modifiers:{lock:!0}}],attrs:{data:e.tableData,stripe:"","show-overflow-tooltip":""}},[l("el-table-column",{attrs:{label:"企业名称",width:"290",prop:"serviceUnitName","show-overflow-tooltip":"",align:"center"}}),e._v(" "),l("el-table-column",{attrs:{label:"合作模式",prop:"serviceUnitJoinModelText","show-overflow-tooltip":"",align:"center"}}),e._v(" "),l("el-table-column",{attrs:{label:"所属运营中心",prop:"subCenterName","show-overflow-tooltip":"",align:"center"}}),e._v(" "),l("el-table-column",{attrs:{label:"服务状态",prop:"dataStatusText","show-overflow-tooltip":"",align:"center"}}),e._v(" "),l("el-table-column",{attrs:{label:"操作","show-overflow-tooltip":"",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.checkState(t.row.dataStatus)?l("el-link",{staticStyle:{color:"#999999"},attrs:{type:"primary"}},[e._v("启用")]):e._e(),e._v(" "),e.checkState(t.row.dataStatus)?e._e():l("el-link",{attrs:{type:"primary"},on:{click:function(l){return e.startClick(t.row)}}},[e._v("启用")]),e._v(" "),e.checkState(t.row.dataStatus)?e._e():l("el-link",{staticStyle:{color:"#999999"},attrs:{type:"primary"}},[e._v("停用")]),e._v(" "),e.checkState(t.row.dataStatus)?l("el-link",{attrs:{type:"primary"},on:{click:function(l){return e.stopClick(t.row)}}},[e._v("删除")]):e._e()]}}])})],1),e._v(" "),l("Pagination",{attrs:{widgetInfo:e.widgetInfo},on:{sonHandleCurrentChange:e.sonHandleCurrentChange}})],1)],1)],1)])},[],!1,null,"0f4b5f0d",null);t.default=component.exports},478:function(e,t,l){"use strict";l(2),l(3),l(4),l(5);var n={props:{widgetInfo:Object},data:function(){return{}},methods:{handleSizeChange:function(e){this.pageSize=e,this.$emit("sonHandleCurrentChange",{pageSize:this.pageSize})},handleCurrentChange:function(e){this.$emit("sonHandleCurrentChange",{pageNo:e})}},mounted:function(){this.$emit("sonHandleCurrentChange",{pageSize:10,pageNo:1})}},o=l(17),component=Object(o.a)(n,function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("el-pagination",{attrs:{"current-page":this.widgetInfo.pageNo,"page-sizes":[10,15,20,25],"page-size":this.widgetInfo.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:this.widgetInfo.total},on:{"size-change":this.handleSizeChange,"current-change":this.handleCurrentChange}})],1)},[],!1,null,null,null);t.a=component.exports},611:function(e,t,l){var content=l(821);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,l(14).default)("0d13c665",content,!0,{sourceMap:!1})},820:function(e,t,l){"use strict";var n=l(611);l.n(n).a},821:function(e,t,l){(e.exports=l(13)(!1)).push([e.i,".list-wrap[data-v-0f4b5f0d],.list-wrap[data-v-0f4b5f0d] .el-table{width:100%}.list-wrap[data-v-0f4b5f0d] .el-table .el-table__body-wrapper{height:calc(100vh - 430px)}.hardware-form[data-v-0f4b5f0d]{font-size:0;padding:20px 20px 0}.hardware-form .el-form-item[data-v-0f4b5f0d]{width:20%;display:-webkit-inline-box;display:inline-flex;margin-right:0}.hardware-form .el-form-item .el-select[data-v-0f4b5f0d]{width:100%}.hardware-form .serch-btn button[data-v-0f4b5f0d]:first-child{margin-left:10px}[data-v-0f4b5f0d] .el-pagination{margin:0;padding-top:20px}@media screen and (max-width:1680px){.list-wrap[data-v-0f4b5f0d] .el-table .el-table__body-wrapper{height:calc(100vh - 410px)}}.add-btn-style[data-v-0f4b5f0d]{text-align:right;padding-right:25px;box-sizing:border-box}.hardware-form[data-v-0f4b5f0d]{padding:20px 25px 0}.list-wrap[data-v-0f4b5f0d]{height:calc(100vh - 315px);overflow:hidden}.list-wrap[data-v-0f4b5f0d] .el-table{padding:0;overflow:hidden}.list-wrap[data-v-0f4b5f0d] .el-table th{background:#f0f3f7}.list-wrap[data-v-0f4b5f0d] .el-table .el-table__body-wrapper{height:calc(100vh - 448px);overflow-y:auto}",""])}}]);