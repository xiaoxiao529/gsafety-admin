(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{1182:function(t,e,l){"use strict";l.r(e);l(33),l(2),l(3),l(4),l(5);var r={data:function(){return{organizationalStructureData:[],companyName:"",defaultProps:{children:"listChildren",label:"name"},tableData5:[{id:"12987122",name:"好滋好味鸡蛋仔",category:"江浙小吃、小吃零食",desc:"荷兰优质淡奶，奶香浓而不腻",address:"上海市普陀区真北路",shop:"王小虎夫妻店",shopId:"10333"}]}},methods:{handleNodeClick:function(data){console.log(data)},getOrganizationalStructureData:function(){var t=this;this.$axios.$GET({api_name:"getCompanyDepartmentTree",params:{}}).then(function(e){if(console.log(e,"res"),"success"==e.data.code){var data=e.data.data[0].listChildren;t.companyName=e.data.data[0].name,t.organizationalStructureData=e.data.data[0].listChildren,t.tableData5=e.data.data[0].listChildren,console.log(data,"this.organizationalStructureData")}else console.log("没有数值。。。。。")})}},mounted:function(){this.getOrganizationalStructureData()}},o=(l(797),l(799),l(17)),component=Object(o.a)(r,function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",[l("div",{staticClass:"Crumbs"},[l("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[l("el-breadcrumb-item",[t._v("硬件平台")]),t._v(" "),l("el-breadcrumb-item",[t._v("组织架构")])],1)],1),t._v(" "),l("div",{staticClass:"main-wrap"},[l("el-row",{staticClass:"location"},[l("el-col",{attrs:{span:12}},[l("h3",[t._v("组织架构")])])],1),t._v(" "),l("div",{staticClass:"main-container"},[l("p",[t._v(t._s(t.companyName))]),t._v(" "),l("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData5}},[l("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData}},[l("el-table-column",{attrs:{prop:"date",label:"日期",width:"180"}}),t._v(" "),l("el-table-column",{attrs:{prop:"name",label:"姓名",width:"180"}}),t._v(" "),l("el-table-column",{attrs:{prop:"address",label:"地址"}})],1)]}}])}),t._v(" "),l("el-table-column",{attrs:{label:"部门/人员",prop:"name"}}),t._v(" "),l("el-table-column",{attrs:{label:"UID",prop:""}}),t._v(" "),l("el-table-column",{attrs:{label:"人员状态",prop:""}}),t._v(" "),l("el-table-column",{attrs:{label:"岗位",prop:""}}),t._v(" "),l("el-table-column",{attrs:{label:"手机",prop:""}})],1)],1)],1)])},[],!1,null,"332bb3ec",null);e.default=component.exports},601:function(t,e,l){var content=l(798);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,l(14).default)("44c6af45",content,!0,{sourceMap:!1})},602:function(t,e,l){var content=l(800);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,l(14).default)("b381518a",content,!0,{sourceMap:!1})},797:function(t,e,l){"use strict";var r=l(601);l.n(r).a},798:function(t,e,l){(t.exports=l(13)(!1)).push([t.i,".list-wrap[data-v-332bb3ec]{overflow:hidden}.list-wrap[data-v-332bb3ec] .el-table{padding:0;overflow:hidden}.list-wrap[data-v-332bb3ec] .el-table th{background:#f0f3f7}.list-wrap[data-v-332bb3ec] .el-table .el-table__body-wrapper{height:calc(100vh - 448px);overflow-y:auto}.demo-table-expand[data-v-332bb3ec]{font-size:0}.demo-table-expand label[data-v-332bb3ec]{width:90px;color:#99a9bf}.demo-table-expand .el-form-item[data-v-332bb3ec]{margin-right:0;margin-bottom:0;width:50%}.hardware-form .el-form-item[data-v-332bb3ec]{width:24%;display:-webkit-inline-box;display:inline-flex;margin-right:0}.hardware-form .el-form-item[data-v-332bb3ec]:nth-of-type(3){width:33%}.hardware-form .el-form-item[data-v-332bb3ec]:last-of-type{width:15%}.hardware-form[data-v-332bb3ec]{padding-left:25px}@media screen and (max-width:1680px){.list-wrap[data-v-332bb3ec] .el-table .el-table__body-wrapper{height:calc(100vh - 415px)}}",""])},799:function(t,e,l){"use strict";var r=l(602);l.n(r).a},800:function(t,e,l){(t.exports=l(13)(!1)).push([t.i,".el-scrollbar__wrap{overflow-x:hidden}",""])}}]);