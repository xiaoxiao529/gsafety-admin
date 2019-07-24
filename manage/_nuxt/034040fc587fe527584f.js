(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{1170:function(e,t,o){"use strict";o.r(t);o(2),o(3),o(4),o(5);var l={components:{Pagination:o(478).a},data:function(){return{dialogVisible:!1,dialogDelVisible:!1,optTitle:null,labelPosition:"top",isLoading:!1,hardwareTypeId:null,optMode:null,formData:{id:null,typeCode:null,typeName:null},tableData:[],parentTypeNameList:[],loading:!0,plan:{},widgetInfo:{pageSize:10,pageNo:1,total:0},rules:{parentCode:[{required:!0,message:"请选择父类型",trigger:"change"}],typeName:[{required:!0,message:"硬件类型不能为空",trigger:"blur"},{min:1,max:32,message:"长度在 1 到 32 个字符",trigger:"blur"}],code:[{required:!0,message:"硬件code不能为空",trigger:"blur"},{pattern:/^[0-9]*$/,message:"长度在 1 到 16 个数字"}]}}},mounted:function(){},computed:{},methods:{addOrEditDiglog:function(e,t){var o=this;o.optMode=e,o.dialogVisible=!0,o.getAllParentTypeInfo(),"add"==e?(o.optTitle="新增",o.$nextTick(function(){o.plan={},o.$refs.plan.resetFields()})):(o.optTitle="编辑",o.plan=JSON.parse(JSON.stringify(t)))},saveOrUpdateForm:function(e){var t=this;"add"==t.optMode?t.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;t.$axios.$POST({api_name:"addHardwareType",params:{id:"",typeName:t.plan.typeName,description:t.plan.description,code:t.plan.code,parentCode:t.plan.parentCode,deleted:0}}).then(function(e){"success"==e.data.code?(t.isLoading=!1,t.dialogVisible=!1,t.$message.success({message:e.data.rspMsg,type:"success"}),t.getHardwareTypePage("search")):(t.isLoading=!1,t.$message.error(e.data.message))}).catch(function(e){t.$message.error("新增异常")})}):"edit"==t.optMode&&t.$refs[e].validate(function(e){if(!e)return console.log("验证失败"),!1;t.$axios.$POST({api_name:"updateHardwareType",params:{id:t.plan.id,typeName:t.plan.typeName,description:t.plan.description,code:t.plan.code,parentCode:t.plan.parentCode,deleted:0}}).then(function(e){"success"==e.data.code?(t.isLoading=!1,t.dialogVisible=!1,t.$message.success({message:e.data.rspMsg,type:"success"}),t.getHardwareTypePage("load")):(t.isLoading=!1,t.$message.error(e.data.rspMsg))}).catch(function(){t.$message.error("编辑硬件类型异常")})})},getHardwareTypePage:function(e){var t=this;t.isLoading=!0,"search"==e&&(t.widgetInfo.pageNo=1),t.$axios.$POST({api_name:"getHardwareTypePage",params:{id:t.formData.id,typeName:t.formData.typeName,typeCode:t.formData.typeCode,pageNo:t.widgetInfo.pageNo,pageSize:t.widgetInfo.pageSize}}).then(function(e){if(t.isLoading=!1,"success"==e.data.code){var o=e.data.data;t.tableData=o.rows,t.widgetInfo.total=null===o.total?0:o.total}else t.tableData=[],t.widgetInfo.list=data.rows,t.widgetInfo.total=0,console.log("没有数值。。。。。")})},getAllParentTypeInfo:function(){var e=this;e.isLoading=!0,e.$axios.$GET({api_name:"getAllParentTypeInfo"}).then(function(t){if(e.isLoading=!1,"success"==t.data.code){var o=t.data.data;e.parentTypeNameList=o}else e.parentTypeNameList=[],e.$message.error(t.data.rspMsg)}).catch(function(){e.$message.error("父类型下拉异常")})},deleteHardwareType:function(e,t){this.dialogDelVisible=!0,this.hardwareTypeId=t.id},sureHandle:function(){var e=this,t=this;t.isLoading=!0,t.$axios.$POST({api_name:"deleteHardwareType",params:{hardwareTypeId:t.hardwareTypeId}}).then(function(e){t.isLoading=!1,"success"==e.data.code?(t.isLoading=!1,t.dialogDelVisible=!1,t.$message({message:e.data.rspMsg,type:"success"}),t.getHardwareTypePage("load")):(t.isLoading=!1,t.$message.error(e.data.rspMsg))}).catch(function(){e.$message({message:"这里是异常",type:"warning"})})},cancalHandle:function(){this.dialogDelVisible=!1,this.$message("取消删除操作")},handleClose:function(){var e=this;e.dialogVisible=!1,e.$nextTick(function(){e.plan={},e.$refs.plan.resetFields()})},sonHandleCurrentChange:function(e){this.widgetInfo.pageSize=e.pageSize?parseInt(e.pageSize):this.widgetInfo.pageSize,this.widgetInfo.pageNo=e.pageNo?parseInt(e.pageNo):this.widgetInfo.pageNo,this.getHardwareTypePage("load")},reset:function(){this.formData={},this.getHardwareTypePage("search")}}},n=(o(772),o(17)),component=Object(n.a)(l,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("div",{staticClass:"Crumbs"},[o("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[o("el-breadcrumb-item",[e._v("运营中心")]),e._v(" "),o("el-breadcrumb-item",[e._v("检测区域设置")])],1)],1),e._v(" "),o("div",{staticClass:"main-wrap"},[o("el-row",{staticClass:"location"},[o("el-col",{attrs:{span:12}},[o("h3",[e._v("硬件类型")])])],1),e._v(" "),o("div",{staticClass:"main-container"},[o("el-form",{ref:"formData",staticClass:"hardware-form",attrs:{inline:!0,model:e.formData}},[o("el-form-item",{attrs:{label:"ID:","label-width":"30px"}},[o("el-input",{attrs:{placeholder:"请输入"},model:{value:e.formData.id,callback:function(t){e.$set(e.formData,"id",t)},expression:"formData.id"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"硬件类型:",prop:"unitName","label-width":"95px"}},[o("el-input",{attrs:{placeholder:"请输入"},model:{value:e.formData.typeName,callback:function(t){e.$set(e.formData,"typeName",t)},expression:"formData.typeName"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"类型编号:",prop:"unitName","label-width":"95px"}},[o("el-input",{attrs:{placeholder:"请输入"},model:{value:e.formData.typeCode,callback:function(t){e.$set(e.formData,"typeCode",t)},expression:"formData.typeCode"}})],1),e._v(" "),o("el-form-item",{attrs:{label:" "}},[o("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){return e.getHardwareTypePage("search")}}},[e._v("查询")]),e._v(" "),o("el-button",{attrs:{size:"small"},on:{click:e.reset}},[e._v("重置")])],1)],1),e._v(" "),o("div",{staticClass:"list-wrap"},[o("el-table",{directives:[{name:"loading",rawName:"v-loading.lock",value:e.isLoading,expression:"isLoading",modifiers:{lock:!0}}],attrs:{data:e.tableData,stripe:"","show-overflow-tooltip":""}},[o("el-table-column",{attrs:{label:"ID",prop:"id","show-overflow-tooltip":"","min-width":"8%"}}),e._v(" "),o("el-table-column",{attrs:{label:"硬件类型",prop:"typeName","show-overflow-tooltip":"","min-width":"8%"}}),e._v(" "),o("el-table-column",{attrs:{label:"类型编号",prop:"code","show-overflow-tooltip":"","min-width":"8%"}}),e._v(" "),o("el-table-column",{attrs:{label:"父类型",prop:"parentTypeName","show-overflow-tooltip":"","min-width":"8%"}}),e._v(" "),o("el-table-column",{attrs:{label:"描述",prop:"description","show-overflow-tooltip":"","min-width":"20%"}})],1),e._v(" "),o("Pagination",{attrs:{widgetInfo:e.widgetInfo},on:{sonHandleCurrentChange:e.sonHandleCurrentChange}})],1)],1)],1),e._v(" "),o("el-dialog",{attrs:{title:e.optTitle,visible:e.dialogVisible,width:"630px"},on:{"update:visible":function(t){e.dialogVisible=t}}},[o("div",{staticClass:"dialog-body-diy-wrapper"},[o("el-form",{ref:"plan",staticClass:"dialog-form-style",attrs:{"label-position":e.labelPosition,"label-width":"120px",rules:e.rules,model:e.plan}},[o("el-row",[o("el-col",{attrs:{span:8}},[o("el-form-item",{attrs:{label:"父类",prop:"parentCode"}},[o("el-select",{attrs:{placeholder:"请选择"},model:{value:e.plan.parentCode,callback:function(t){e.$set(e.plan,"parentCode",t)},expression:"plan.parentCode"}},e._l(e.parentTypeNameList,function(e){return o("el-option",{key:e.id,attrs:{label:e.typeName,value:e.code}})}),1)],1)],1),e._v(" "),o("el-col",{attrs:{span:8}},[o("el-form-item",{attrs:{label:"硬件类型",prop:"typeName"}},[o("el-input",{attrs:{maxlength:"32"},model:{value:e.plan.typeName,callback:function(t){e.$set(e.plan,"typeName","string"==typeof t?t.trim():t)},expression:"plan.typeName"}})],1)],1),e._v(" "),o("el-col",{attrs:{span:8}},[o("el-form-item",{attrs:{label:"硬件编号",prop:"code"}},[o("el-input",{attrs:{maxlength:"16"},model:{value:e.plan.code,callback:function(t){e.$set(e.plan,"code",t)},expression:"plan.code"}})],1)],1)],1),e._v(" "),o("el-row",[o("el-form-item",{attrs:{label:"描述"}},[o("el-input",{attrs:{type:"textarea",rows:4,maxlength:"100","show-word-limit":""},model:{value:e.plan.description,callback:function(t){e.$set(e.plan,"description","string"==typeof t?t.trim():t)},expression:"plan.description"}})],1)],1)],1)],1),e._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:e.handleClose}},[e._v("取 消")]),e._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.saveOrUpdateForm("plan")}}},[e._v("确 定")])],1)]),e._v(" "),o("el-dialog",{attrs:{"custom-class":"del-dialog-wrap",visible:e.dialogDelVisible,width:"280px"},on:{"update:visible":function(t){e.dialogDelVisible=t}}},[o("div",{staticClass:"del-dialog-main"},[o("div",{staticClass:"icon-wrap"},[o("i",{staticClass:"el-icon-s-opportunity"})]),e._v(" "),o("div",{staticClass:"p-wrap"},[o("p",{staticClass:"title-p"},[e._v("是否确定删除？")]),e._v(" "),o("p",{staticClass:"tips-p"},[e._v("删除后将不可恢复")])])]),e._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{type:"primary"},on:{click:e.sureHandle}},[e._v("确 定")]),e._v(" "),o("el-button",{on:{click:e.cancalHandle}},[e._v("取 消")])],1)])],1)},[],!1,null,"784a2596",null);t.default=component.exports},478:function(e,t,o){"use strict";o(2),o(3),o(4),o(5);var l={props:{widgetInfo:Object},data:function(){return{}},methods:{handleSizeChange:function(e){this.pageSize=e,this.$emit("sonHandleCurrentChange",{pageSize:this.pageSize})},handleCurrentChange:function(e){this.$emit("sonHandleCurrentChange",{pageNo:e})}},mounted:function(){this.$emit("sonHandleCurrentChange",{pageSize:10,pageNo:1})}},n=o(17),component=Object(n.a)(l,function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("el-pagination",{attrs:{"current-page":this.widgetInfo.pageNo,"page-sizes":[10,15,20,25],"page-size":this.widgetInfo.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:this.widgetInfo.total},on:{"size-change":this.handleSizeChange,"current-change":this.handleCurrentChange}})],1)},[],!1,null,null,null);t.a=component.exports},590:function(e,t,o){var content=o(773);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(14).default)("15b86133",content,!0,{sourceMap:!1})},772:function(e,t,o){"use strict";var l=o(590);o.n(l).a},773:function(e,t,o){(e.exports=o(13)(!1)).push([e.i,".add-btn-style[data-v-784a2596]{text-align:right;padding-right:25px;box-sizing:border-box}.hardware-form[data-v-784a2596]{padding:20px 25px 0}.list-wrap[data-v-784a2596]{height:calc(100vh - 315px);overflow:hidden}.list-wrap[data-v-784a2596] .el-table{padding:0;overflow:hidden}.list-wrap[data-v-784a2596] .el-table th{background:#f0f3f7}.list-wrap[data-v-784a2596] .el-table .el-table__body-wrapper{height:calc(100vh - 448px);overflow-y:auto}@media screen and (max-width:1680px){.list-wrap[data-v-784a2596]{height:calc(100vh - 285px);overflow:hidden}.list-wrap[data-v-784a2596] .el-table{padding:0;overflow:hidden}.list-wrap[data-v-784a2596] .el-table th{background:#f0f3f7}.list-wrap[data-v-784a2596] .el-table .el-table__body-wrapper{height:calc(100vh - 418px);overflow-y:auto}}",""])}}]);