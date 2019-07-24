<template>
  <div>
    <div class="main-wrap main-wrap-other">
      <div class="main-container">
        <!-- 查询 -->
        <el-form :inline="true" :model="formData" ref="formData" class="hardware-form" >
          <el-form-item label="手机号:" label-width="70px">
            <el-input placeholder="请输入手机号" v-model="formData.tel" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="姓名:" label-width="95px">
            <el-input placeholder="请输入姓名" v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label=" ">
            <el-button type="primary" size="small" @click="actualUsersPage('search')">查询</el-button>
            <el-button size="small" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 列表-->
        <div class="list-wrap">
          <el-table v-loading.lock="isLoading" :data="tableData" stripe show-overflow-tooltip>
            <el-table-column label="姓名" prop="userName" show-overflow-tooltip min-width="8%"></el-table-column>
            <el-table-column label="用户名" prop="loginName" show-overflow-tooltip min-width="8%"></el-table-column>
            <el-table-column label="手机号" prop="userTelphone" show-overflow-tooltip min-width="8%"></el-table-column>
            <el-table-column label="创建时间" prop="createTime" show-overflow-tooltip min-width="8%"></el-table-column>
            <el-table-column label="操作" show-overflow-tooltip align="center" min-width="10%">
              <template slot-scope="scope">
                <el-link type="primary" @click="setupInfo(scope.$index,scope.row)">关联应用</el-link>
              </template>
            </el-table-column>
          </el-table>
          <Pagination
            :widgetInfo="widgetInfo"
            v-on:sonHandleCurrentChange="sonHandleCurrentChange"
          />
        </div>
      </div>
    </div>
    <!--    关联应用-->
    <application-app ref="stepInfo"></application-app>
  </div>
</template>
<script>
  /**
   * @Description:运营中心--实际用户
   * @author liuxin
   * @date 2019-07-18
   */
  import Pagination from "~/components/Pagination";
  import ApplicationApp from "~/pages/userInfoManage/actualUsers/applicationApp";
  export default {
    components: {
      Pagination,
      ApplicationApp
    },
    data() {
      return {
        isLoading: false,
        formData: {//查询的formData
          tel:null,
          name:null
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
      actualUsersPage(pagenoFlag) {
        const that = this;
        that.isLoading = true;
        if(pagenoFlag=='search'){
          that.widgetInfo.pageNo = 1;
        }
        that.$axios
          .$POST_NEW({
            api_name: "findActualUserList",
            params: {
              cellphone: that.formData.tel,
              username: that.formData.name,
              pageNo: that.widgetInfo.pageNo,
              pageSize: that.widgetInfo.pageSize
            }
          })
          .then(res => {
            that.isLoading = false;
            if (res.data.code == "success") {
              let data = res.data.data;
              that.tableData = data.rows;
              that.widgetInfo.total = data.total === null ? 0 : data.total;
            } else {
              that.tableData = [];
              that.widgetInfo.list = data.rows;
              that.widgetInfo.total = 0;
              console.log("没有数值。。。。。");
            }
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
        this.actualUsersPage('load');
      },
      /**
       * @Description:查询重置
       */
      reset() {
        this.formData = {};
        this.actualUsersPage('search');
      },
      /**
       * @Description:关联应用
       * @param index
       * @param row
       */
      setupInfo(index,row){
        const that = this;
        that.$refs.stepInfo.initStupInfo(row.id);
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
