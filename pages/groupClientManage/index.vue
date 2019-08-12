<template>
  <div>
    <div class="Crumbs">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>企业管理</el-breadcrumb-item>
        <el-breadcrumb-item>集团客户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main-wrap">
      <el-row class="location">
        <el-col :span="12">
          <h3>集团客户管理</h3>
        </el-col>
      </el-row>
      <div class="main-container">
        <!-- 查询 -->
        <el-form :inline="true" :model="formData" ref="formData" class="hardware-form">
          <el-form-item label="所属集团:">
            <el-input placeholder="请输入所属集团" v-model="formData.groupName"></el-input>
          </el-form-item>
          <el-form-item label=" ">
            <el-button type="primary" size="small" @click="getHardwareTypePage('search')">查询</el-button>
            <el-button size="small" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 列表 -->
        <div class="list-wrap">
          <el-table v-loading.lock="isLoading" :data="tableData" stripe show-overflow-tooltip>
            <el-table-column label="集团名称" prop="groupName" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column label="签入运营中心" prop="typeName" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column label="服务周期" prop="serviceDateRange" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column label="集团单位数目（个）" prop="groupTotalCount" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column label="集团单位已分派（个）" prop="groupYesCount" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column label="集团单位未分派（个）" prop="groupNoCount" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column label="操作" show-overflow-tooltip align="center">
              <template slot-scope="scope">
                <el-link type="primary" v-if="scope.row.groupNoCount === '0'" style="color:#999">分派</el-link>
                <el-link type="primary" v-else style="color:#009cff" @click=assignClick(scope.row) >分派</el-link>
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
      //查询的formData
      tableData: [], //table查询结果
      loading: true,
      widgetInfo: {
        pageSize: 10,
        pageNo: 1,
        total: 0
      },
    };
  },
  mounted() {
    const that = this;
  },
  computed: {},
  methods: {
    /**
     *
     * @param pagenoFlag
     */
    getHardwareTypePage(pagenoFlag) {
      const that = this;
      that.isLoading = true;
      if(pagenoFlag=='search'){
        that.widgetInfo.pageNo = 1;
      }
      that.$axios
        .$POST_NEW({
          api_name: "queryGroupUnitList",
          params: {
            groupName: that.formData.groupName,
            subCenterCode:"340100FWZX201805230001",
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
    /**
     * 分派
     */
    assignClick(row){
        const assignObj = {
            "groupId": row.groupId,
            "handleType": "1",
            "groupName": row.groupName
        };
        this._Storage.setObj("assignObj","obj",assignObj);
        this.$router.push({
            name:"groupClientManage-assignManage",
            params: {

            }
        });
    },
      /**
     * 查询重置
     */
    reset() {
      this.formData = {};
      this.getHardwareTypePage('search');
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
