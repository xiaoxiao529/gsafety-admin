<!--
 * @Descripttion: 应用资源管理
 * @version:
 * @Author: yangxq
 * @Date: 2019-07-08 15:22:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-08-01 11:41:51
 -->

<template>
  <div>
    <div class="Crumbs">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>系统配置</el-breadcrumb-item>
        <el-breadcrumb-item>资源管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main-wrap">
      <el-row class="location">
        <el-col :span="12">
          <h3>资源管理</h3>
        </el-col>
        <el-col :span="12" class="add-btn-style">
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="addResources"
            v-show="btns[0].isShow"
          >新增资源</el-button>
        </el-col>
      </el-row>
      <div class="main-container">
        <!-- 查询 -->

        <!-- 列表 -->
        <div class="list-wrap">
          <table-list :data="test" :columns="columns"></table-list>
        </div>
        <Pagination :widgetInfo="widgetInfo" v-on:sonHandleCurrentChange="sonHandleCurrentChange" />
      </div>
    </div>
    <msg-box></msg-box>
  </div>
</template>



<script>
import tableList from "~/components/resourceManage/tableList";
import msgBox from "~/components/resourceManage/msgbox";
//import addResources from "~/components/resourceManage/addResources";
import { columns } from "~/components/resourceManage/treeToArray";
import Pagination from "~/components/Pagination";

export default {
  data() {
    return {
      currentBtns: [],
      btns: [
        {
          name: "新增",
          isShow: false
        }
      ],
      test: [],
      num: 0,
      columns: columns,
      info: {},
      menu: [],
      sysCode: "manager",
      loading: false,
      widgetInfo: {
        total: null,
        pageSize: 6,
        pageNo: 1
      }
    };
  },
  created() {
    if (process.client) {
      this.getListData();
    }
  },
  mounted() {
    const that = this;
    that.$bus.on("refresh", that.getListData);
    that.currentBtns = that._Storage.getObj("currentBtnArr", "currentBtnArr");
    that.isBtnShow();
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange(index) {
      this.getListData(index);
    },
    sonHandleCurrentChange(widgetInfo) {
      this.widgetInfo.pageSize = widgetInfo.pageSize
        ? parseInt(widgetInfo.pageSize)
        : this.widgetInfo.pageSize;
      this.widgetInfo.pageNo = widgetInfo.pageNo
        ? parseInt(widgetInfo.pageNo)
        : this.widgetInfo.pageNo;
      this.getListData();
    },
    // getSystemList(){//api.forent_url.system_url+'/getSystemListNoPage'
    // return  api.get(api.forent_url.system_url+'/getSystemListNoPage')
    //   .then((res)=>{
    //     if(res && res.code === "success"){
    //     this.menu=res.data
    //     this.sysCode=res.data[0].sysCode
    //     }
    //   })
    // },
    getListData(num) {
      this.loading = true; //api.forent_url.res_url+'/findAllResourceBySysCode'

      //获取全部资源列表信息
      this.$axios
        .$POST({
          api_name: "findAllResourceBySysCode", //查询列表
          params: {
            sysCode: this.sysCode,
            pageNo: this.widgetInfo.pageNo,
            pageSize: this.widgetInfo.pageSize
          }
        })
        .then(res => {
          if (res && res.data.code == "success") {
            let data = res.data.data;
            this.test = data.rows;
            console.log("this.test", this.test);
            this.widgetInfo.pageNo = data.pageNo;
            this.widgetInfo.total = data.total;
            this.widgetInfo.pageSize = data.pageSize;
            this.loading = false;
          }
          this.loading = false;
        });
    },
    changeData(item, num) {
      num += 1;
      item.forEach((item, index) => {
        item.num = num;
        if (item.children) {
          this.changeData(item.children, num);
        }
      });
    },
    addResources() {
      this.$bus.emit("showMsg", "add", this.sysCode);
    },
    //按钮权限
    isBtnShow() {
      const that = this;
      let arr = that.currentBtns;
      that.$nextTick(() => {
        that.btns.forEach(element => {
          arr.forEach(item => {
            if (item.name === element.name) {
              element.isShow = item.isShow;
            }
          });
        });
      });
    }
  },
  watch: {
    sysCode() {
      this.getListData();
    }
  },
  components: {
    msgBox,
    tableList,
    //addResources,
    Pagination
  }
};
</script>

<style lang="scss" scoped="scoped">
@import "~/assets/css/list.scss";
.list-wrap {
  /deep/.el-table {
    .el-table__body-wrapper {
      //导航90px 面包屑64px 距离底部20px 面板标题65px 查询form表单76 分页85 头部高度48px
      height: calc(100vh - 90px - 64px - 20px - 65px - 76px - 38px);
      overflow-y: auto;
    }
  }
}
.add-btn-style {
  text-align: right;
  padding-right: 25px;
  box-sizing: border-box;
}
@media screen and (max-width: 1680px) {
  .list-wrap {
    /deep/.el-table {
      .el-table__body-wrapper {
        //导航90px 面包屑64px 距离底部20px 面板标题65px 查询form表单76 分页85 头部高度48px
        height: calc(100vh - 90px - 64px - 20px - 65px - 76px - 10px);
        overflow-y: auto;
      }
    }
  }
}
</style>
