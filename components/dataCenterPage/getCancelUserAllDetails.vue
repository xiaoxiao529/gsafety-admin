<template>
    <div class="main-wrap main-wrap-other">
      <div class="main-container">
        <el-form :inline="true" :model="formData" ref="formData" class="hardware-form" >
        </el-form>
        <!-- 列表-->
        <div class="list-wrap">
          <el-table v-loading.lock="isLoading" :data="tableData" stripe show-overflow-tooltip>
            <el-table-column label="序号" prop="" align="center" show-overflow-tooltip min-width="4%">
              <template scope="scope">
                <span>{{(widgetInfo.pageNo - 1) * widgetInfo.pageSize + scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column label="企业侧" prop="product" align="center" show-overflow-tooltip min-width="12%"></el-table-column>
            <el-table-column label="用户名称" prop="name" align="center" show-overflow-tooltip min-width="12%"></el-table-column>
            <el-table-column label="登录名" prop="loginName" align="center" show-overflow-tooltip min-width="8%"></el-table-column>
            <el-table-column label="用户类型" prop="orgUserType" align="center" show-overflow-tooltip min-width="8%"></el-table-column>
            <el-table-column label="业主单位服务模式" prop="enterpriseUnitServiceModel" align="center" show-overflow-tooltip min-width="8%"></el-table-column>
          </el-table>
          <Pagination
            :widgetInfo="widgetInfo"
            v-on:sonHandleCurrentChange="sonHandleCurrentChange"
          />
        </div>
      </div>
    </div>
</template>
<script>
  import Pagination from "~/components/Pagination";
  import ApiConfig from "@/config/api";
  export default {
    components: {
      Pagination,
      ApiConfig,
    },
    data() {
      return {
        isLoading: false,
        formData:{
            tel:"",
            name:""
        },

        tableData:[],
        loading: true,
        widgetInfo: {
          pageSize: 10,
          pageNo: 1,
          total: 0
        }
      };
    },
    mounted() {
      const that = this;

    },
    computed: {},
    methods: {
      /**
       * @Description:实际用户的列表
       * @param pagenoFlag
       */
      actualUsersPage() {
        const that = this;
        that.isLoading = true;
        that.$axios
          .$POST_CENTER({
            api_name: "getCancelUserAllDetails",
            params: {
              page: that.widgetInfo.pageNo,
              pageSize: that.widgetInfo.pageSize
            }
          })
          .then(res => {
            that.isLoading = false;
            // debugger
            if (res.data.rspCode == "0") {
              let data = res.data.data;
              that.tableData = data;
              // that.widgetInfo.total = data.total === null ? 0 : data.total;
            } else {
              that.tableData = [];
              // that.widgetInfo.list = res.data.rows;
              // that.widgetInfo.total = 0;
              that.$message.error(res.data.rspMsg);
              console.log("没有数值。。。。。");
            }
          });
      },

        getExcelUrl(){
            let url = "/center/" + ApiConfig.api["getCancelUserAllDetails"]+"Excel";
            this.$confirm("确认批量导出excel？")
                .then(_ => {
                    window.open(url);
                })
                .catch(_ => {

                });
        },

      /**
       * @Description:分页
       * @param widgetInfo
       */
      sonHandleCurrentChange(widgetInfo) {
        this.widgetInfo.pageSize = widgetInfo.pageSize
          ? parseInt(widgetInfo.pageSize)
          : this.widgetInfo.pageSize;
        this.widgetInfo.pageNo = widgetInfo.pageNo
          ? parseInt(widgetInfo.pageNo)
          : this.widgetInfo.pageNo;
        this.actualUsersPage();
      },
    }
  };
</script>
<style lang="scss" scoped="scoped">
  .main-wrap-other{
    border: none;
  }
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
