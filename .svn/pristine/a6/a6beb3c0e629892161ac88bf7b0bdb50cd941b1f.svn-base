<template>
  <div>
    <div class="Crumbs">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>企业管理</el-breadcrumb-item>
        <el-breadcrumb-item>集团客户管理</el-breadcrumb-item>
        <el-breadcrumb-item>分派运营中心</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main-wrap">
      <el-row class="location">
        <el-col :span="12">
          <h3>分派运营中心</h3>
        </el-col>
        <el-col :span="12" class="add-btn-style">
          <el-button type="primary" @click="closeView()">&lt;&lt; 返回</el-button>
        </el-col>
      </el-row>
      <div class="main-container">
        <!-- 查询 -->
        <el-form :inline="true" :model="formData" ref="formData" class="hardware-form">
          <el-form-item label="所属集团:">
            <span class="el-form-item__label">{{dispatch()}}</span>
          </el-form-item >
          <el-form-item label="地址:">
            <el-cascader style="width: 100%;" clearable
                         v-model="value"
                         :options="serviceArea"
                         :props="{ expandTrigger: 'hover' ,checkStrictly: true }"
                         @change="handleChange">
            </el-cascader>
          </el-form-item >
        </el-form>
        <!-- 列表 -->
        <div class="list-wrap">
          <el-table v-loading.lock="isLoading" :data="tableData" stripe show-overflow-tooltip>
            <el-table-column label="企业名称" prop="groupName" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column label="所属地市" prop="cityName" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column label="服务周期" prop="serviceDateRange" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column label="服务模式" prop="serviceModelName" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column label="分派状态" prop="assignStatus" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column label="分派到运营中心"  show-overflow-tooltip align="center">
              <template slot-scope="scope">
                <el-select placeholder="请选择" filterable v-model.trim="scope.row.subCenterCode">
                  <el-option
                    v-for="item of centerListData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="操作"  show-overflow-tooltip align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" :disabled="!scope.row.subCenterCode" @click="distribution(scope.row.id,scope.row.subCenterCode)">分派</el-button>
              </template>
            </el-table-column>
          </el-table>
          <Pagination :widgetInfo="widgetInfo" v-on:sonHandleCurrentChange="sonHandleCurrentChange" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Pagination from "~/components/Pagination";

export default {
  components: {
    Pagination
  },

  data() {
    return {
      isLoading: false,
      formData: {
        groupName:"",
      },
      subData:{
        subCenterCode:"",
      },
      //查询的formData
      tableData: [], //table查询结果
      loading: true,
      widgetInfo: {
        pageSize: 10,
        pageNo: 1,
        total: 0
      },
      labelPosition: "top",
      rules:{},

      centerListData:[],
      serviceArea:[],//地址
      value:[],
      province: "",
      city: "",
      county: "",
    };
  },

  created(){
      if (process.client) {
          this.findQueryGroupAllOrgNames();
          this.findserviceArea();
      }
  },
  mounted() {
    const that = this;

  },
  computed: {

  },
  methods: {
    /**
     * 硬件类别管理的列表
     * @param pagenoFlag
     */
    getHardwareTypePage(pagenoFlag) {
      const that = this;
      that.isLoading = true;
      if(pagenoFlag=='search'){
        that.widgetInfo.pageNo = 1;
      }
      that.$axios
        .$GET_NEW({
          api_name: "queryEnterpriseUnitsByGropId",
          params: {
            // groupId: that._Storage.getObj("assignObj", "obj").groupId,
            // operation :that._Storage.getObj("assignObj", "obj").handleType,
            province: that.province,
            city: that.city,
            county: that.county,
            pageNo: that.widgetInfo.pageNo,
            pageSize: that.widgetInfo.pageSize
          }
        })
        .then(res => {
          that.isLoading = false;
          if (res.data.code == "success") {
            let data = res.data.data;
            that.tableData = [];
            for (let key in data.rows){
                that.tableData.push(that.tableRowClassName(data.rows[key]));
            }
            that.widgetInfo.total = data.total === null ? 0 : data.total;
          } else {
            that.tableData = [];
            that.widgetInfo.list = res.data.rows;
            that.widgetInfo.total = 0;
            console.log("没有数值。。。。。");
          }
        });
    },
    /**
     * 分页
     * @param widgetInfo
     */
    sonHandleCurrentChange(widgetInfo) {
      this.widgetInfo.pageSize = widgetInfo.pageSize
        ? parseInt(widgetInfo.pageSize)
        : this.widgetInfo.pageSize;
      this.widgetInfo.pageNo = widgetInfo.pageNo
        ? parseInt(widgetInfo.pageNo)
        : this.widgetInfo.pageNo;
      this.getHardwareTypePage('load');
    },

    tableRowClassName(row) {
        // 服务模式
        if("0"==row.groupUnitServiceModel){
            row.serviceModelName = "免费模式";
        }else if("1"==row.groupUnitServiceModel){
            row.serviceModelName = "基础安全模式";
        }else if("2"==row.groupUnitServiceModel){
            row.serviceModelName = "高级安全模式";
        }else if("3"==row.groupUnitServiceModel){
            row.serviceModelName = "全托管模式";
        }
        // 分派状态
        // if(this._Storage.getObj("assignObj", "obj").handleType == '1'){
        //     row.assignStatus = '未分派';
        // }else{
        //     row.assignStatus = '已分派';
        // }
        // 服务周期
        if(row.groupUnitServiceStartDate&&row.groupUnitServiceEndDate){
            row.serviceDateRange = row.groupUnitServiceStartDate.split(" ")[0]+"至"+row.groupUnitServiceEndDate.split(" ")[0];
        }
        return row;
    },
    /**
     *
     */
    dispatch() {
        return;
      // return this._Storage.getObj("assignObj", "obj").groupName;
    },

    closeView(){
        this.$router.back(-1);
    },

    distribution(unitId,orgCode){
      const that = this;
      let _select_data = [];
      let _item = {};
      _item['id'] = unitId;
      _item['subCenterCode'] = orgCode;
      _select_data.push(_item);
      let _data = {
          'enterpriseUnits': _select_data
      };
      this.$confirm('确认分配运营中心？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          this.isLoading = true;
          this.$axios
              .$POST_NEW({
                  api_name: "updateEnterpriseUnitById",
                  params: {
                      jsonArr: JSON.stringify(_data)
                  }
              })
              .then(res => {
                  that.isLoading = false;
                  if (res.data.code == 'success') {
                    that.$message.success('分派成功');
                    that.getHardwareTypePage('search')
                  } else {
                      that.$message.warning(res.data.message);
                  }
              });
      });
    },
    // 查询全部运营中心
    findQueryGroupAllOrgNames(){
        const that = this;
      that.isLoading = true;
      that.$axios
            .$POST_NEW({
                api_name: "queryGroupAllOrgNames",
            })
            .then(res => {
                if (res.data.code == "success") {
                  that.isLoading = false;
                    let list = [];
                    list = res.data.data;
                    for (let key in list) {
                        var temp = {};
                        temp.value = key;
                        temp.label = list[key];
                        that.centerListData.push(temp);
                    }
                } else {
                    this.centerListData = [
                        {
                            value: '',
                            label: '请选择'
                        }
                    ];
                }
            });
    },

    //服务区域查询
    findserviceArea() {
        this.$axios
            .$POST_NEW({
                api_name: "queryDistrictCascode",
                params: {
                },
                time:12000,
            })
            .then(res => {
                if (res.data.code == "success") {
                    var list = [];
                    list = res.data.data;
                    for (var key in list) {
                        if (list[key].parentCode == '000000') {
                            var temp = {};
                            temp.value = list[key].distCode;
                            temp.parentCode = list[key].parentCode;
                            temp.children = [];
                            temp.shortSpelling = list[key].shortSpelling;
                            temp.latitude = list[key].latitude;
                            temp.fullSpelling = list[key].fullSpelling;
                            temp.label = list[key].distName;
                            temp.sortNum = list[key].sortNum;
                            temp.distShortName = list[key].distShortName;
                            temp.isLeaf = list[key].isLeaf;
                            temp.longitude = list[key].longitude;
                            temp.distNotes = list[key].distNotes;
                            this.serviceArea.push(temp);
                        } else {
                            if (this.serviceArea.length > 0) {
                                for (var key1 in this.serviceArea) {
                                    if (list[key].parentCode == this.serviceArea[key1].value) {
                                        var temp = {};
                                        temp.value = list[key].distCode;
                                        temp.parentCode = list[key].parentCode;
                                        temp.children = [];
                                        temp.shortSpelling = list[key].shortSpelling;
                                        temp.latitude = list[key].latitude;
                                        temp.fullSpelling = list[key].fullSpelling;
                                        temp.label = list[key].distName;
                                        temp.sortNum = list[key].sortNum;
                                        temp.distShortName = list[key].distShortName;
                                        temp.isLeaf = list[key].isLeaf;
                                        temp.longitude = list[key].longitude;
                                        temp.distNotes = list[key].distNotes;
                                        this.serviceArea[key1].children.push(temp);
                                    } else {
                                        var chlist = this.serviceArea[key1].children;
                                        if (chlist.length > 0) {
                                            for (var key2 in chlist) {
                                                if (list[key].parentCode == chlist[key2].value) {
                                                    var temp = {};
                                                    temp.value = list[key].distCode;
                                                    temp.parentCode = list[key].parentCode;
                                                    // temp.children = [];
                                                    temp.shortSpelling = list[key].shortSpelling;
                                                    temp.latitude = list[key].latitude;
                                                    temp.fullSpelling = list[key].fullSpelling;
                                                    temp.label = list[key].distName;
                                                    temp.sortNum = list[key].sortNum;
                                                    temp.distShortName = list[key].distShortName;
                                                    temp.isLeaf = list[key].isLeaf;
                                                    temp.longitude = list[key].longitude;
                                                    temp.distNotes = list[key].distNotes;
                                                    chlist[key2].children.push(temp);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    console.log("没有数值。。。。。");
                }
            });
    },

    handleChange() {
        this.province = this.value.length==0?"":this.value[0];
        this.city = this.value.length==0?"":this.value[1];
        this.county = this.value.length==0?"":this.value[2];
        this.getHardwareTypePage('load');
    },
  }
};
</script>
<style lang="scss" scoped="scoped">
.add-btn-style {
  text-align: right;
  padding-right: 25px;
  box-sizing: border-box;
}
.hardware-form{
  padding: 20px 25px 0 25px;
}
.list-wrap {
  //导航90px 面包屑64px 距离底部20px 面板标题65px 查询form表单76
  height: calc(100vh - 90px - 64px - 20px - 65px - 76px);
  overflow: hidden;
  /deep/.el-table {
    padding: 0;
    overflow: hidden;
    th {
      background: rgba(240, 243, 247, 1);
    }
    .el-table__body-wrapper {
      //导航90px 面包屑64px 距离底部20px 面板标题65px 查询form表单76 分页85 头部高度48px
      height: calc(100vh - 90px - 64px - 20px - 65px - 76px - 85px - 48px);
      overflow-y: auto;
    }
  }
}
@media screen and (max-width: 1680px) {
  .list-wrap {
    //导航60px 面包屑64px 距离底部20px 面板标题65px 查询form表单76
    height: calc(100vh - 60px - 64px - 20px - 65px - 76px);
    overflow: hidden;
    /deep/.el-table {
      padding: 0;
      overflow: hidden;
      th {
        background: rgba(240, 243, 247, 1);
      }
      .el-table__body-wrapper {
        //导航60px 面包屑64px 距离底部20px 面板标题65px 查询form表单76 分页85 头部高度48px
        height: calc(100vh - 60px - 64px - 20px - 65px - 76px - 85px - 48px);
        overflow-y: auto;
      }
    }
  }
}
</style>
