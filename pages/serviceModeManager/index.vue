<template>
  <div>
    <div class="Crumbs">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>数据中心</el-breadcrumb-item>
        <el-breadcrumb-item>企业/用户分析</el-breadcrumb-item>
        <el-breadcrumb-item>服务模式分布</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

      <div class="new-main-wrap">
        <div class="echarts-item-wrapper">
          <el-row class="location">
            <el-col :span="12">
              <h3>服务模式分布</h3>
            </el-col>
          </el-row>
          <div class="main-container">
            <!-- 查询 -->
            <el-form :inline="true" :model="formData" ref="formData" class="hardware-form">
              <el-form-item class="el_form_item"  label=" " prop="orgName" :label-width="labelWidth">
                <el-select placeholder="运营中心名称" filterable clearable v-model.trim="formData.orgCode">
                  <el-option
                    v-for="item in orgList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="" class="serch-btn">
                <el-button type="primary" size="small" @click="lookFor()">查询</el-button>
                <el-button size="small" @click="reset()">重置</el-button>
              </el-form-item>
            </el-form>
            <pie-echarts-view @userDistributionDropDown="userDistributionDropDown" ref="pieEcharts"></pie-echarts-view>
          </div>
        </div>

        <div class="echarts-item-wrapper">
          <el-row class="location export">
            <el-col :span="12">
              <h3>数据报表</h3>
            </el-col>
            <el-col :span="12" class="add-btn-style">
              <el-button type="primary" @click="exportExcel()">导出Excel</el-button>
            </el-col>
          </el-row>
          <div class="list-wrap">
            <el-table v-loading.lock="isLoading" :data="tableData" stripe show-overflow-tooltip>
              <el-table-column label="运营中心" prop="orgName" show-overflow-tooltip align="center"></el-table-column>
              <el-table-column label="业主单位" prop="unitName" show-overflow-tooltip align="center"></el-table-column>
              <el-table-column label="服务模式" prop="serviceModelName" show-overflow-tooltip align="center"></el-table-column>
              <el-table-column label="web用户" prop="webAmount" show-overflow-tooltip align="center"></el-table-column>
              <el-table-column label="App用户" prop="appAmount" show-overflow-tooltip align="center"></el-table-column>
              <el-table-column label="全渠道用户" prop="totalAmount" show-overflow-tooltip align="center"></el-table-column>
            </el-table>
            <Pagination :widgetInfo="widgetInfo" v-on:sonHandleCurrentChange="sonHandleCurrentChange"></Pagination>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
    import Pagination from "~/components/Pagination";
    import pieEchartsView from "../../components/echarts/pieEchartsView";
    import $ from 'jquery'
    import ApiConfig from "@/config/api";
    export default {
        components: {
            Pagination,
            pieEchartsView
        },
        data() {
            return {
                value1: "",//选择时间
                flag: false,
                isLoading: false,
                labelWidth: "10px",
                orgList: [
                    {
                        value: " ",
                        label: "全部"
                    }
                ],
                formData: {},
                tableData: [],
                loading: true,

                pageNo: 1,
                pageSize: 10,
                total: 0,

                widgetInfo: {
                    pageSize: 10,
                    pageNo: 1,
                    total: 0
                },

                rules: {
                    orgName: [],
                },
                userType:'10,11'
            };
        },
        created() {
            if (process.client) {
                this.findOperationOrgList();
                this.findEchartsData();
            }
        },
        mounted() {

        },
        computed: {

        },
        methods: {

            //获取数据
            findMonitorDeviceStateDownList() {
                this.isLoading = true;
                this.$axios
                    .$GET_ENTER({
                        api_name: "findServiceModelTable",
                        params: {
                            orgCode: this.formData.orgCode,
                            userType: "10,11",
                            pageNo: this.widgetInfo.pageNo,
                            pageSize: this.widgetInfo.pageSize
                        }
                    })
                    .then(res => {
                        this.isLoading = false;
                        if (res.data.code === "success") {
                            let data = res.data.data;
                            this.tableData = data.content;
                            this.widgetInfo.total = data.totalSize === null ? 0 : data.totalSize;
                        } else {
                            this.tableData = [];
                            this.widgetInfo.total = 0;
                            this.$message.error("获取数据失败");
                        }
                    });
            },

            //获取echarts数据
            findEchartsData() {
                const that = this;
                this.isLoading = true;
                let data = [
                    //新增企业Echart
                    this.$axios.$GET_ENTER({api_name: "findServiceModelEchart",params:{
                            orgCode: this.formData.orgCode,
                            pieType: "company",
                        }}),
                    //用户分布情况Echart
                    this.$axios.$GET_ENTER({api_name: "findServiceModelEchart",params:{
                            orgCode: this.formData.orgCode,
                            pieType: "user",
                            userType: this.userType//用户类型web或者app,web传10，app传11,全部渠道 传 10,11
                        }})
                ];
                this.$axios.$AllRequst({
                    data:data,
                    callback:function (args) {
                        let obj = {};
                        if (args[0].data.code === "success"){
                            obj.enterpriseData = args[0].data.data;
                        }
                        if (args[1].data.code === "success"){
                            obj.userData = args[1].data.data;
                        }
                        that.isLoading = false;
                        // debugger
                        that.getNewAddCompanyData(obj);
                    }
                });
            },

            //分页
            sonHandleCurrentChange(widgetInfo) {
                this.widgetInfo.pageSize = widgetInfo.pageSize
                    ? parseInt(widgetInfo.pageSize)
                    : this.widgetInfo.pageSize;
                this.widgetInfo.pageNo = widgetInfo.pageNo
                    ? parseInt(widgetInfo.pageNo)
                    : this.widgetInfo.pageNo;
                this.findMonitorDeviceStateDownList();
            },

            //获取运营中心数据
            findOperationOrgList() {
                const that = this;
                that.isLoading = true;
                that.$axios
                    .$POST_NEW({
                        api_name: "queryOperationOrgList",
                        params: {
                            pageNo: 1,
                            pageSize: 99999
                        }
                    })
                    .then(res => {
                        if (res.data.code === "success") {
                            that.isLoading = false;
                            let data = res.data.data.rows;
                            for (let key in data) {
                                let obj = {};
                                obj.label = data[key].orgName;
                                obj.value = data[key].orgCode;
                                that.orgList.push(obj);
                            }
                        }
                    });
            },
            //重置
            reset() {
                this.formData = {};
                this.widgetInfo.pageNo = 1;
                this.userType = "10,11";
                this.findEchartsData();
                this.findMonitorDeviceStateDownList();
            },
            //查询
            lookFor() {
                this.widgetInfo.pageNo = 1;
                this.findEchartsData();
                this.findMonitorDeviceStateDownList();
            },

            getNewAddCompanyData(data) {
                this.$refs.pieEcharts.initEcharts(data);
            },

            exportExcel() {
                let defaults;
                if (process.env.NODE_ENV === "development") {
                    defaults = "/enterprisedata";
                } else {
                    defaults = ApiConfig.apiHost;
                }
                let url = defaults + ApiConfig.api["downloadServiceModelExcel"]+
                    "?orgCode="+(this.formData.orgCode===undefined?"":this.formData.orgCode)+
                    "&userType=10,11";
                this.$confirm("确认批量导出excel？")
                    .then(_ => {
                        window.open(url);
                    })
                    .catch(_ => {

                    });
            },
            userDistributionDropDown(userType){
              this.userType = userType;
              this.findEchartsData();
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import "~/assets/css/list.scss";
  /deep/.el-table {
    .el-table__body-wrapper {
      //导航90px 面包屑64px 距离底部20px 面板标题65px 查询form表单76 分页85 头部高度48px
      height: auto !important;
      max-height: 500px !important;
    }
  }
  .new-main-wrap{

  }
  .my_button {
    background-color: #ffffff;
    color: #1C77FF;
    border: 1px solid rgba(28, 119, 255, 1) !important;
  }

  .my_button_active {
    background-color: #1C77FF;
    color: #ffffff;
    border: 1px solid rgba(28, 119, 255, 1) !important;
  }

  .timeTools {
    border-bottom: 0 solid #e1e5eb;
    height: 48px !important;
    line-height: 48px;
  }

  .add-btn-style {
    text-align: right;
    padding-right: 25px;
    box-sizing: border-box;
  }

  .hardware-form {
    padding: 20px 25px 0 25px;
  }

  .export {
  }

  .list-wrap {
    //导航90px 面包屑64px 距离底部20px 面板标题65px 查询form表单76
    height: auto;
    overflow: hidden;

    /deep/ .el-table {
      padding: 0;
      overflow: hidden;

      th {
        background: rgba(240, 243, 247, 1);
      }

      .el-table__body-wrapper {
        //导航90px 面包屑64px 距离底部20px 面板标题65px 查询form表单76 分页85 头部高度48px
        height: calc(100vh - 90px - 64px - 20px - 65px - 76px - 85px - 48px - 300px);
        overflow-y: auto;
      }

    }
  }
  /deep/.el-pagination{
    padding-bottom: 20px;
    padding-right: 15px;
  }
</style>
