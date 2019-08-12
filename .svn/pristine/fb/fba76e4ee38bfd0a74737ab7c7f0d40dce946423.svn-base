<!--
 * @Descripttion: 应用资源管理
 * @version:
 * @Author: yangxq
 * @Date: 2019-07-08 15:22:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-07-31 16:39:09
 -->

<template>
  <div>
    <div class="Crumbs">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>工具平台</el-breadcrumb-item>
        <el-breadcrumb-item>权限平台</el-breadcrumb-item>
        <el-breadcrumb-item>应用资源管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main-wrap">
      <div class="admin_manage_aside">
        <el-tabs v-model="activeName" @tab-click="changeSys">
          <el-tab-pane
            v-for="(item,i) in menu"
            :key="i"
            :index="changeIndex(i)"
            :label="item.sysName"
            :name="'sys'+i"
          ></el-tab-pane>
        </el-tabs>
        <!-- <el-menu default-active="0" class="el-menu-vertical-demo el-menu-origanizeUl">
          <el-menu-item
            class="organizeSelect"
            v-for="(item,i) in menu"
            :key="i"
            :index="changeIndex(i)"
            @click="changeSys(item)"
          >
            <span slot="title">{{item.sysName}}</span>
          </el-menu-item>
        </el-menu>-->
      </div>
      <el-row class="location">
        <el-col :span="12">
          <h3>&nbsp;&nbsp;&nbsp;&nbsp;</h3>
        </el-col>
        <el-col :span="12" class="add-btn-style">
          <el-button type="primary" icon="el-icon-plus" @click="addResources">新增资源</el-button>
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
import { mapState } from "vuex";
import tableList from "~/components/resourceManage/tableList";
import msgBox from "~/components/resourceManage/msgbox";
//import addResources from "~/components/resourceManage/addResources";
import { columns } from "~/components/resourceManage/treeToArray";
import Pagination from "~/components/Pagination";

export default {
  data() {
    return {
      activeName: "sys0",
      //权限复制禁用
      copyPower_disable: true,
      default_active: "",
      systemList: [],
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
      sysCode: "",
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
      let that = this;
      that.loading = true;

      that.getSystemList().then(() => {
        that.getListData();
      });
    }
  },
  mounted() {
    const that = this;
    this.$bus.on("refresh", this.getListData);
    that.currentBtns = that._Storage.getObj("currentBtnArr", "currentBtnArr");
    that.isBtnShow();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
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
    getSystemList() {
      let that = this;
      return that.$axios
        .$GET({
          api_name: "getSystemListNoPage"
        })
        .then(res => {
          console.log(res, "that.res");
          if (res.data && res.data.code == "success") {
            this.menu = res.data.data;
            this.sysCode = res.data.data[0].sysCode;
          }
        });
    },
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
            this.widgetInfo.pageNo = data.pageNo;
            this.widgetInfo.total = data.total;
            this.widgetInfo.pageSize = data.pageSize;
            this.loading = false;
          }
          this.loading = false;
        });
    },

    changeSys(tab, event) {
      this.sysCode = this.menu[tab.index].sysCode;
    },
    changeIndex(i) {
      return i + "";
    },
    addResources() {
      console.log(132);
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
      height: calc(100vh - 90px - 64px - 20px - 65px - 76px - 100px);
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
        height: calc(100vh - 90px - 64px - 20px - 65px - 76px - 70px);
        overflow-y: auto;
      }
    }
  }
}

.admin_manage_aside {
  text-align: left;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 9;
  padding: 0 20px;
  .el-menu-origanizeUl {
    overflow: auto;
  }
  /deep/.el-tabs {
    .el-tabs__header {
      margin: 0;
    }
    .el-tabs__item {
      height: 60px;
      text-align: center;
      line-height: 60px;
      font-size: 16px;
    }
    .el-tabs__nav-next,
    .el-tabs__nav-prev {
      line-height: 60px;
      font-size: 22px;
    }
    .el-tabs__nav-next {
      margin-right: -5px;
    }
    .el-tabs__nav-prev {
      margin-left: -5px;
    }
  }
}
</style>
